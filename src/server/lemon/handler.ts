import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyLemonWebhookSignature, getLemonEventMeta } from "@/server/lemon/webhook";
import { mapVariantIdToPlan, mapVariantIdToAddon } from "@/config/lemon";
import {
  addPurchasedSeconds,
  type BillingStatus,
  findWorkspaceIdByLemonCustomerId,
  upsertBillingState,
} from "@/server/billing/helpers";

type JsonObject = Record<string, unknown>;

function getErrorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return "Unknown error";
}

function asIsoMaybe(value: unknown): string | null {
  if (!value) return null;
  const s = String(value);
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseSubscription(payload: unknown) {
  const p = (payload ?? {}) as JsonObject;
  const data = (p.data ?? {}) as JsonObject;
  const attrs = (data.attributes ?? {}) as JsonObject;
  const rel = (data.relationships ?? {}) as JsonObject;

  const subscriptionId = String(data.id ?? "");
  const customerRel = (rel.customer ?? {}) as JsonObject;
  const customerRelData = (customerRel.data ?? {}) as JsonObject;
  const customerId = String(customerRelData.id ?? attrs.customer_id ?? "");
  const variantRel = (rel.variant ?? {}) as JsonObject;
  const variantRelData = (variantRel.data ?? {}) as JsonObject;
  const variantId = String(variantRelData.id ?? attrs.variant_id ?? "");

  const status = String(attrs.status ?? "active");
  const trialEnd = asIsoMaybe(attrs["trial_ends_at"] ?? attrs["trial_end"]);
  const periodStart = asIsoMaybe(
    attrs["current_period_start"] ?? attrs["renews_at"]
  );
  const periodEnd = asIsoMaybe(
    attrs["current_period_end"] ?? attrs["ends_at"] ?? attrs["renews_at"]
  );
  const cancelAtPeriodEnd = Boolean(attrs["cancel_at_period_end"] ?? false);

  return {
    subscriptionId,
    customerId,
    variantId,
    status,
    trialEnd,
    periodStart,
    periodEnd,
    cancelAtPeriodEnd,
  };
}

function parseOrder(payload: unknown) {
  const p = (payload ?? {}) as JsonObject;
  const data = (p.data ?? {}) as JsonObject;
  const attrs = (data.attributes ?? {}) as JsonObject;
  const rel = (data.relationships ?? {}) as JsonObject;

  const orderId = String(data.id ?? "");
  const customerRel = (rel.customer ?? {}) as JsonObject;
  const customerRelData = (customerRel.data ?? {}) as JsonObject;
  const customerId = String(customerRelData.id ?? attrs.customer_id ?? "");
  const variantRel = (rel.variant ?? {}) as JsonObject;
  const variantRelData = (variantRel.data ?? {}) as JsonObject;
  const variantId = String(variantRelData.id ?? attrs.variant_id ?? "");

  return { orderId, customerId, variantId };
}

function normalizeBillingStatus(status: string) {
  const s = status.toLowerCase();
  if (s === "past_due") return "past_due";
  if (s === "cancelled" || s === "canceled") return "canceled";
  if (s === "paused") return "paused";
  if (s === "trialing") return "trialing";
  return "active";
}

function isUniqueViolation(error: unknown): boolean {
  const code =
    error && typeof error === "object" && "code" in error
      ? (error as { code?: unknown }).code
      : null;
  return String(code ?? "") === "23505";
}

export async function handleLemonWebhook(req: Request) {
  const rawBody = await req.text();
  const signatureHeader =
    req.headers.get("X-Signature") ?? req.headers.get("x-signature");

  const ok = verifyLemonWebhookSignature({ rawBody, signatureHeader });
  if (!ok) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as unknown;
  const { eventId, eventType, customData } = getLemonEventMeta(payload);

  if (!eventId || !eventType) {
    return NextResponse.json({ error: "Missing event meta." }, { status: 400 });
  }

  // Idempotency
  const { error: insertErr } = await supabaseAdmin.from("lemon_events").insert({
    event_id: eventId,
    event_type: eventType,
    payload,
  });

  if (insertErr) {
    if (isUniqueViolation(insertErr)) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    return NextResponse.json({ error: insertErr.message }, { status: 400 });
  }

  // Workspace resolution
  let workspaceId: string | null =
    (customData?.workspaceId as string) ||
    (customData?.workspace_id as string) ||
    null;

  try {
    if (eventType.startsWith("subscription_")) {
      const sub = parseSubscription(payload);
      if (!workspaceId && sub.customerId) {
        workspaceId = await findWorkspaceIdByLemonCustomerId(sub.customerId);
      }

      if (!workspaceId) {
        return NextResponse.json(
          { error: "workspaceId missing." },
          { status: 400 }
        );
      }

      const mapped = sub.variantId ? mapVariantIdToPlan(sub.variantId) : null;
      const planId = mapped?.planId ?? "starter";

      await upsertBillingState({
        workspaceId,
        patch: {
          plan_id: planId,
          status: normalizeBillingStatus(sub.status) as BillingStatus,
          trial_end: sub.trialEnd,
          current_period_start: sub.periodStart,
          current_period_end: sub.periodEnd,
          lemon_customer_id: sub.customerId || null,
          lemon_subscription_id: sub.subscriptionId || null,
          lemon_variant_id: sub.variantId || null,
          cancel_at_period_end: sub.cancelAtPeriodEnd,
        },
      });

      return NextResponse.json({ ok: true });
    }

    // Add-on purchases can arrive as order events
    if (
      eventType === "order_created" ||
      eventType === "order_paid" ||
      eventType === "invoice_paid"
    ) {
      const order = parseOrder(payload);

      if (!workspaceId && order.customerId) {
        workspaceId = await findWorkspaceIdByLemonCustomerId(order.customerId);
      }

      if (!workspaceId) {
        return NextResponse.json(
          { error: "workspaceId missing." },
          { status: 400 }
        );
      }

      const addon = order.variantId ? mapVariantIdToAddon(order.variantId) : null;
      if (!addon) {
        return NextResponse.json({ ok: true, ignored: true });
      }

      // Idempotency by external_order_id
      const { data: existing, error: selErr } = await supabaseAdmin
        .from("add_on_credits")
        .select("id")
        .eq("workspace_id", workspaceId)
        .eq("external_order_id", order.orderId)
        .maybeSingle();

      if (selErr) {
        return NextResponse.json({ error: selErr.message }, { status: 400 });
      }

      if (existing?.id) {
        return NextResponse.json({ ok: true, deduped: true });
      }

      const { error: insErr } = await supabaseAdmin.from("add_on_credits").insert({
        workspace_id: workspaceId,
        credit_type: "openai_active_speech_seconds",
        amount_seconds: addon.amountSeconds,
        source: "lemon",
        external_order_id: order.orderId,
      });

      if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 400 });
      }

      await addPurchasedSeconds({
        workspaceId,
        amountSeconds: addon.amountSeconds,
        externalOrderId: order.orderId,
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true, ignored: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) || "Webhook processing failed." },
      { status: 500 }
    );
  }
}

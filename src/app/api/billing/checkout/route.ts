export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createLemonCheckout } from "@/server/lemon/client";
import { getPlanVariantMapping, type BillingPlanId, type LemonBillingInterval } from "@/config/lemon";

function getBaseUrl(req: Request): string {
  const envBase = process.env.NEXT_PUBLIC_APP_URL;
  if (envBase) return envBase;
  const origin = req.headers.get("origin");
  if (origin) return origin;
  return "http://localhost:3000";
}

function normalizeInterval(value: unknown): LemonBillingInterval | null {
  const v = String(value ?? "").toLowerCase();
  if (v === "month" || v === "monthly") return "month";
  if (v === "year" || v === "yearly") return "year";
  return null;
}

function safeSameOriginUrl(params: { baseUrl: string; input: unknown; fallbackPath: string }): string {
  const base = new URL(params.baseUrl);
  const raw = String(params.input ?? "").trim();

  try {
    if (raw.startsWith("/")) {
      return new URL(raw, base).toString();
    }

    const u = new URL(raw);
    if (u.origin === base.origin) {
      return u.toString();
    }
  } catch {
    // ignore
  }

  return new URL(params.fallbackPath, base).toString();
}

function getErrorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return "Checkout failed.";
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const bodyUnknown = (await req.json().catch(() => null)) as unknown;
  if (!bodyUnknown || typeof bodyUnknown !== "object") {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const body = bodyUnknown as Record<string, unknown>;

  const planId = String(body.planId ?? "") as BillingPlanId;
  const interval = normalizeInterval(body.interval);

  if (!(planId === "starter" || planId === "creator" || planId === "pro" || planId === "studio" || planId === "scale")) {
    return NextResponse.json({ error: "Unsupported planId." }, { status: 400 });
  }
  if (!interval) {
    return NextResponse.json({ error: "interval must be month|year." }, { status: 400 });
  }

  const baseUrl = getBaseUrl(req);
  const successUrl = safeSameOriginUrl({ baseUrl, input: body["successUrl"], fallbackPath: "/app/billing/success" });
  const cancelUrl = safeSameOriginUrl({ baseUrl, input: body["cancelUrl"], fallbackPath: "/app/billing/cancel" });

  // Ensure billing_state exists.
  await supabaseAdmin
    .from("billing_state")
    .upsert({ workspace_id: workspaceId, plan_id: "starter", status: "trialing" });

  const { data: billingRow, error: billingErr } = await supabase
    .from("billing_state")
    .select("lemon_customer_id")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (billingErr) {
    return NextResponse.json({ error: billingErr.message }, { status: 400 });
  }

  const mapping = getPlanVariantMapping(planId, interval);

  const customData = {
    workspace_id: workspaceId,
    workspaceId,
    kind: "plan",
    planId,
    interval,
    user_id: user.id,
  };

  try {
    const checkout = await createLemonCheckout({
      variantId: mapping.variantId,
      successUrl,
      cancelUrl,
      customData,
      customerId: billingRow?.lemon_customer_id ?? null,
      email: user.email ?? null,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) },
      { status: 400 }
    );
  }
}

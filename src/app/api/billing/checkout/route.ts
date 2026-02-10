export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getStripe } from "@/server/stripe/client";
import { getStripeProductId, type StripeBillingInterval } from "@/config/stripe";
import {
  calcYearlyTotal,
  getPricingPlan,
  type PricingPlanId,
} from "@/config/pricingPlans";

function getBaseUrl(req: Request): string {
  const envBase = process.env.NEXT_PUBLIC_APP_URL;
  if (envBase) return envBase;
  const origin = req.headers.get("origin");
  if (origin) return origin;
  return "http://localhost:3000";
}

function normalizeInterval(value: unknown): StripeBillingInterval | null {
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

  const planId = String(body.planId ?? "") as PricingPlanId;
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
    .select("stripe_customer_id")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (billingErr) {
    return NextResponse.json({ error: billingErr.message }, { status: 400 });
  }

  const plan = getPricingPlan(planId);
  if (!plan.monthly_price_eur) {
    return NextResponse.json({ error: "Plan not purchasable." }, { status: 400 });
  }

  const productId = getStripeProductId(planId);
  if (!productId) {
    return NextResponse.json({ error: "Stripe product not configured." }, { status: 400 });
  }

  const monthlyPrice = plan.monthly_price_eur;
  const yearlyTotal = calcYearlyTotal(monthlyPrice);
  const unitAmountEur = interval === "year" ? yearlyTotal : monthlyPrice;
  const unitAmount = Math.round(unitAmountEur * 100);

  try {
    const stripe = getStripe();
    const customerId = billingRow?.stripe_customer_id ?? undefined;
    const customerEmail = customerId ? undefined : user.email ?? undefined;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer: customerId,
      customer_email: customerEmail,
      client_reference_id: workspaceId,
      metadata: {
        workspaceId,
        planId,
        interval,
        userId: user.id,
      },
      subscription_data: {
        trial_period_days: plan.entitlements?.trial_days ?? undefined,
        metadata: {
          workspaceId,
          planId,
          interval,
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: unitAmount,
            product: productId,
            recurring: {
              interval,
            },
          },
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout URL missing." }, { status: 400 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getStripeWebhookSecret } from "@/server/stripe/client";
import { mapStripeProductIdToPlan } from "@/config/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/server/email/resend";
import {
  findWorkspaceIdByStripeCustomerId,
  upsertBillingState,
  type BillingStatus,
} from "@/server/billing/helpers";

function normalizeBillingStatus(status: Stripe.Subscription.Status): BillingStatus {
  if (status === "trialing") return "trialing";
  if (status === "past_due" || status === "unpaid") return "past_due";
  if (status === "paused") return "paused";
  if (status === "canceled" || status === "incomplete_expired") return "canceled";
  return "active";
}

function asIsoFromUnix(seconds: number | null | undefined): string | null {
  if (!seconds || !Number.isFinite(seconds)) return null;
  return new Date(seconds * 1000).toISOString();
}

function resolvePlanId(subscription: Stripe.Subscription): string {
  const metaPlan = subscription.metadata?.planId;
  if (metaPlan && typeof metaPlan === "string") return metaPlan;

  const item = subscription.items.data[0];
  const productId =
    typeof item?.price?.product === "string" ? item.price.product : null;
  if (productId) {
    const mapped = mapStripeProductIdToPlan(productId);
    if (mapped) return mapped;
  }

  return "starter";
}

async function hasBillingEmailEvent(eventId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("billing_email_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data?.event_id);
}

async function recordBillingEmailEvent(params: {
  eventId: string;
  sessionId?: string | null;
  email?: string | null;
}) {
  const { error } = await supabaseAdmin.from("billing_email_events").insert({
    event_id: params.eventId,
    provider: "stripe",
    session_id: params.sessionId ?? null,
    email: params.email ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function applySubscriptionUpdate(subscription: Stripe.Subscription) {
  const workspaceId =
    subscription.metadata?.workspaceId ||
    subscription.metadata?.workspace_id ||
    (subscription.customer
      ? await findWorkspaceIdByStripeCustomerId(String(subscription.customer))
      : null);

  if (!workspaceId) {
    throw new Error("workspaceId missing in Stripe metadata.");
  }

  const planId = resolvePlanId(subscription);
  const item = subscription.items.data[0];
  const priceId = item?.price?.id ?? null;
  const productId =
    typeof item?.price?.product === "string" ? item.price.product : null;

  await upsertBillingState({
    workspaceId,
    patch: {
      plan_id: planId,
      status: normalizeBillingStatus(subscription.status),
      trial_end: asIsoFromUnix(subscription.trial_end),
      current_period_start: asIsoFromUnix(subscription.current_period_start),
      current_period_end: asIsoFromUnix(subscription.current_period_end),
      stripe_customer_id: String(subscription.customer ?? "") || null,
      stripe_subscription_id: subscription.id ?? null,
      stripe_price_id: priceId,
      stripe_product_id: productId,
      cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
    },
  });
}

export async function handleStripeWebhook(req: Request) {
  const stripe = getStripe();
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      getStripeWebhookSecret()
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          String(session.subscription)
        );
        await applySubscriptionUpdate(subscription);
      }

      const email =
        session.customer_details?.email ?? session.customer_email ?? null;
      const planId = session.metadata?.planId ?? "starter";
      const interval = session.metadata?.interval ?? "month";

      if (email) {
        const alreadySent = await hasBillingEmailEvent(event.id);
        if (!alreadySent) {
          await sendOrderConfirmationEmail({
            to: email,
            planId,
            interval,
          });
          await recordBillingEmailEvent({
            eventId: event.id,
            sessionId: session.id,
            email,
          });
        }
      }
      return NextResponse.json({ ok: true });
    }

    if (event.type === "customer.subscription.created") {
      const subscription = event.data.object as Stripe.Subscription;
      await applySubscriptionUpdate(subscription);
      return NextResponse.json({ ok: true });
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      await applySubscriptionUpdate(subscription);
      return NextResponse.json({ ok: true });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      await applySubscriptionUpdate({
        ...subscription,
        status: "canceled",
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true, ignored: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

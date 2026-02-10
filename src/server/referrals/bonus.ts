import type Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { addPurchasedSeconds } from "@/server/billing/helpers";

const referredBonusHours: Record<string, number> = {
  starter: 1,
  creator: 2,
  pro: 5,
  studio: 10,
  scale: 20,
};

const qualifyingPlans = new Set(["creator", "pro", "studio", "scale"]);

function normalizeCode(raw: string) {
  return raw.trim().toLowerCase();
}

async function insertNotification(params: {
  userId: string;
  workspaceId: string;
  type: string;
  title: string;
  body?: string | null;
  data?: Record<string, unknown>;
}) {
  const payload = {
    user_id: params.userId,
    workspace_id: params.workspaceId,
    type: params.type,
    title: params.title,
    body: params.body ?? null,
    data: params.data ?? {},
  };

  await supabaseAdmin.from("notifications").insert(payload);
}

export async function applyReferralBonusFromStripe(params: {
  eventId: string;
  session: Stripe.Checkout.Session;
}) {
  const rawCode =
    params.session.metadata?.promoCode ||
    params.session.metadata?.referralCode ||
    "";
  if (!rawCode) return;

  const userId = params.session.metadata?.userId ?? "";
  const workspaceId = params.session.metadata?.workspaceId ?? "";
  const planId = params.session.metadata?.planId ?? "starter";

  if (!userId || !workspaceId) return;

  const code = normalizeCode(rawCode);

  const { data: codeRow, error: codeErr } = await supabaseAdmin
    .from("promo_codes")
    .select("id, code, owner_user_id, owner_workspace_id, is_active")
    .ilike("code", code)
    .maybeSingle();

  if (codeErr || !codeRow || !codeRow.is_active) return;
  if (codeRow.owner_user_id === userId) return;

  const { data: existing } = await supabaseAdmin
    .from("referral_redemptions")
    .select("id")
    .eq("external_event_id", params.eventId)
    .maybeSingle();

  if (existing?.id) return;

  const bonusHours = referredBonusHours[planId] ?? 0;
  const bonusSeconds = Math.max(0, bonusHours * 3600);
  const isQualifying = qualifyingPlans.has(planId);

  const { error: redemptionErr } = await supabaseAdmin
    .from("referral_redemptions")
    .insert({
      code_id: codeRow.id,
      referrer_user_id: codeRow.owner_user_id,
      referrer_workspace_id: codeRow.owner_workspace_id,
      referred_user_id: userId,
      referred_workspace_id: workspaceId,
      plan_id: planId,
      is_qualifying: isQualifying,
      bonus_seconds: bonusSeconds,
      source: "stripe",
      external_event_id: params.eventId,
    });

  if (redemptionErr) return;

  if (bonusSeconds > 0) {
    const { data: existingCredit } = await supabaseAdmin
      .from("add_on_credits")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("external_order_id", params.eventId)
      .maybeSingle();

    if (!existingCredit?.id) {
      await supabaseAdmin.from("add_on_credits").insert({
        workspace_id: workspaceId,
        credit_type: "openai_active_speech_seconds",
        amount_seconds: bonusSeconds,
        source: "referral",
        external_order_id: params.eventId,
      });

      await addPurchasedSeconds({
        workspaceId,
        amountSeconds: bonusSeconds,
        externalOrderId: params.eventId,
      });
    }

    await insertNotification({
      userId,
      workspaceId,
      type: "referral_bonus_referred",
      title: "Bonus hours added",
      body: `You received ${bonusHours}h of Active Speech for using promo code ${codeRow.code}.`,
      data: { plan_id: planId, bonus_hours: bonusHours, code: codeRow.code },
    });
  }

  await insertNotification({
    userId: codeRow.owner_user_id,
    workspaceId: codeRow.owner_workspace_id,
    type: "referral_purchase",
    title: "Referral purchase confirmed",
    body: `A new subscription using your code ${codeRow.code} was confirmed (${planId}).`,
    data: { plan_id: planId, referred_user_id: userId, code: codeRow.code },
  });
}

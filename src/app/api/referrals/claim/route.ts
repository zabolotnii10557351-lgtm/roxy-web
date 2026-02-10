export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { addPurchasedSeconds } from "@/server/billing/helpers";

const CLAIM_BONUS_SECONDS = 4 * 3600;
const CLAIM_SIZE = 3;

export async function POST() {
  const { user, workspaceId } = await requireUserAndWorkspace();

  const { data: promo } = await supabaseAdmin
    .from("promo_codes")
    .select("id, code")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (!promo?.id) {
    return NextResponse.json({ error: "Promo code not found." }, { status: 404 });
  }

  const { data: eligible } = await supabaseAdmin
    .from("referral_redemptions")
    .select("id")
    .eq("code_id", promo.id)
    .eq("is_qualifying", true)
    .is("claimed_at", null)
    .order("created_at", { ascending: true })
    .limit(CLAIM_SIZE);

  if (!eligible || eligible.length < CLAIM_SIZE) {
    return NextResponse.json({ error: "Not enough qualifying referrals." }, { status: 400 });
  }

  const ids = eligible.map((row) => row.id);
  const nowIso = new Date().toISOString();

  const { error: updErr } = await supabaseAdmin
    .from("referral_redemptions")
    .update({ claimed_at: nowIso, claimed_by_user_id: user.id })
    .in("id", ids);

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 });
  }

  await supabaseAdmin.from("referral_claims").insert({
    code_id: promo.id,
    referrer_user_id: user.id,
    referrer_workspace_id: workspaceId,
    claimed_count: CLAIM_SIZE,
    bonus_seconds: CLAIM_BONUS_SECONDS,
  });

  await supabaseAdmin.from("add_on_credits").insert({
    workspace_id: workspaceId,
    credit_type: "openai_active_speech_seconds",
    amount_seconds: CLAIM_BONUS_SECONDS,
    source: "referral_bonus",
  });

  await addPurchasedSeconds({
    workspaceId,
    amountSeconds: CLAIM_BONUS_SECONDS,
  });

  await supabaseAdmin.from("notifications").insert({
    user_id: user.id,
    workspace_id: workspaceId,
    type: "referral_bonus_claimed",
    title: "Referral bonus unlocked",
    body: "You received 4h of Active Speech for 3 qualifying referrals.",
    data: { claim_size: CLAIM_SIZE, bonus_hours: 4, code: promo.code },
  });

  return NextResponse.json({ ok: true });
}

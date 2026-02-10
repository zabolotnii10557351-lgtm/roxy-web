export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/lib/site/url";

export async function GET() {
  const { user, workspaceId } = await requireUserAndWorkspace();

  const { data: promo } = await supabaseAdmin
    .from("promo_codes")
    .select("id, code, created_at")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (!promo?.id) {
    return NextResponse.json({ code: null });
  }

  const { data: signups } = await supabaseAdmin
    .from("referral_signups")
    .select("id, referred_user_id, created_at")
    .eq("code_id", promo.id)
    .order("created_at", { ascending: false });

  const { data: redemptions } = await supabaseAdmin
    .from("referral_redemptions")
    .select("id, referred_user_id, plan_id, is_qualifying, claimed_at, created_at")
    .eq("code_id", promo.id)
    .order("created_at", { ascending: false });

  const referredUserIds = Array.from(
    new Set([...(signups ?? []), ...(redemptions ?? [])].map((row) => row.referred_user_id))
  ).filter(Boolean);

  let referredProfiles: Record<string, string> = {};
  if (referredUserIds.length > 0) {
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, email")
      .in("id", referredUserIds);

    referredProfiles = (profiles ?? []).reduce<Record<string, string>>((acc, row) => {
      acc[row.id] = row.email ?? "";
      return acc;
    }, {});
  }

  const signupRows = (signups ?? []).map((row) => ({
    id: row.id,
    created_at: row.created_at,
    referred_user_id: row.referred_user_id,
    referred_email: referredProfiles[row.referred_user_id] ?? "",
  }));

  const redemptionRows = (redemptions ?? []).map((row) => ({
    id: row.id,
    created_at: row.created_at,
    plan_id: row.plan_id,
    is_qualifying: row.is_qualifying,
    claimed_at: row.claimed_at,
    referred_user_id: row.referred_user_id,
    referred_email: referredProfiles[row.referred_user_id] ?? "",
  }));

  const qualifyingUnclaimed = (redemptions ?? []).filter(
    (row) => row.is_qualifying && !row.claimed_at
  );

  return NextResponse.json({
    code: promo.code,
    referralLink: `${getSiteUrl()}/register?ref=${promo.code}`,
    signups: signupRows,
    redemptions: redemptionRows,
    totals: {
      signups: signupRows.length,
      purchases: redemptionRows.length,
      qualifying: (redemptions ?? []).filter((row) => row.is_qualifying).length,
      unclaimedQualifying: qualifyingUnclaimed.length,
      claimableBatches: Math.floor(qualifyingUnclaimed.length / 3),
    },
    workspaceId,
  });
}

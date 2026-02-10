import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPlanEntitlementsForPlanId } from "@/lib/pricing/server";
import type { PlanId } from "@/lib/plans";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const hours = Number(body.hours ?? 0);

  if (!Number.isFinite(hours) || hours <= 0) {
    return NextResponse.json(
      { error: "Invalid usage amount" },
      { status: 400 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_id, trial_ends_at, active_hours_used")
    .eq("id", user.id)
    .maybeSingle();

  const { data: settings } = await supabase
    .from("user_settings")
    .select("default_workspace_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const planId = (profile?.plan_id ?? "trial") as PlanId;
  const trialEndsAt = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at)
    : null;
  const activeHoursUsed = Number(profile?.active_hours_used ?? 0);
  const entitlements = await getPlanEntitlementsForPlanId(planId);
  const hoursLimit = entitlements?.included_active_speech_hours_openai ?? null;

  if (planId === "trial" && trialEndsAt && trialEndsAt < new Date()) {
    return NextResponse.json(
      { error: "Trial expired" },
      { status: 402 }
    );
  }

  const nextTotal = activeHoursUsed + hours;

  if (hoursLimit !== null && nextTotal > hoursLimit) {
    return NextResponse.json(
      { error: "Usage limit exceeded" },
      { status: 402 }
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update({ active_hours_used: nextTotal })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (hoursLimit !== null && settings?.default_workspace_id) {
    const ratios = [0.8, 0.95];
    const now = new Date();
    for (const ratio of ratios) {
      const threshold = hoursLimit * ratio;
      if (activeHoursUsed < threshold && nextTotal >= threshold) {
        const type = `usage_warning_${Math.round(ratio * 100)}`;
        const since = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString();
        const { data: existing } = await supabaseAdmin
          .from("notifications")
          .select("id")
          .eq("user_id", user.id)
          .eq("type", type)
          .gte("created_at", since)
          .maybeSingle();

        if (!existing?.id) {
          const remaining = Math.max(0, hoursLimit - nextTotal);
          await supabaseAdmin.from("notifications").insert({
            user_id: user.id,
            workspace_id: settings.default_workspace_id,
            type,
            title: "Active Speech is running low",
            body: `You have about ${remaining.toFixed(1)}h left. Consider adding more hours or upgrading your plan.`,
            data: { hours_limit: hoursLimit, hours_used: nextTotal },
          });
        }
      }
    }
  }

  return NextResponse.json({ ok: true });
}

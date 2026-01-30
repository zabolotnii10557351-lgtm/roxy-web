import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPlanHours, type PlanId } from "@/lib/plans";

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

  const planId = (profile?.plan_id ?? "trial") as PlanId;
  const trialEndsAt = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at)
    : null;
  const activeHoursUsed = Number(profile?.active_hours_used ?? 0);
  const hoursLimit = getPlanHours(planId);

  if (planId === "trial" && trialEndsAt && trialEndsAt < new Date()) {
    return NextResponse.json(
      { error: "Trial expired" },
      { status: 402 }
    );
  }

  if (hoursLimit !== null && activeHoursUsed + hours > hoursLimit) {
    return NextResponse.json(
      { error: "Usage limit exceeded" },
      { status: 402 }
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update({ active_hours_used: activeHoursUsed + hours })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

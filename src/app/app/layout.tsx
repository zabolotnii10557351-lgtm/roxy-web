import DashboardShell from "@/components/DashboardShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PlanId } from "@/lib/plans";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_id, trial_ends_at, plan_expires_at, active_hours_used")
    .eq("id", user.id)
    .maybeSingle();

  const planId = (profile?.plan_id ?? "trial") as PlanId;
  const trialEndsAt = profile?.trial_ends_at ?? null;
  const planExpiresAt = profile?.plan_expires_at ?? null;
  const activeHoursUsed = profile?.active_hours_used ?? 0;

  if (!trialEndsAt) {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await supabase
      .from("profiles")
      .update({ trial_ends_at: nextWeek.toISOString() })
      .eq("id", user.id);
  }

  return (
    <DashboardShell
      planProfile={{
        planId,
        trialEndsAt: trialEndsAt ?? undefined,
        planExpiresAt: planExpiresAt ?? undefined,
        activeHoursUsed,
      }}
    >
      {children}
    </DashboardShell>
  );
}

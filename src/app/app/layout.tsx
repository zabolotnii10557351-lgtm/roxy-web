import DashboardShell from "@/components/DashboardShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PlanId } from "@/lib/plans";
import { getAdminEmails } from "@/lib/auth";

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
    .select(
      "display_name, role, plan_id, trial_ends_at, plan_expires_at, active_hours_used",
    )
    .eq("id", user.id)
    .maybeSingle();

  const displayName = profile?.display_name ?? "User";

  const planId = (profile?.plan_id ?? "trial") as PlanId;
  const trialEndsAt = profile?.trial_ends_at ?? null;
  const planExpiresAt = profile?.plan_expires_at ?? null;
  const activeHoursUsed = profile?.active_hours_used ?? 0;

  const adminEmails = getAdminEmails();
  const isAdmin =
    (user.email ? adminEmails.includes(user.email.toLowerCase()) : false) ||
    profile?.role === "admin";

  if (!trialEndsAt) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    await supabase
      .from("profiles")
      .update({ trial_ends_at: nextWeek.toISOString() })
      .eq("id", user.id);
  }

  return (
    <DashboardShell
      displayName={displayName}
      isAdmin={isAdmin}
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

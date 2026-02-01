import StatCard from "@/components/StatCard";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { requireAdminUserOrNotFound } from "@/lib/auth";

export default async function AdminOverviewPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const { supabase, adminClient } = await requireAdminUserOrNotFound();
  const client = adminClient ?? supabase;

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: usersCount },
    { count: workspacesCount },
    { count: releasesCount },
    { count: activeSubsCount },
    { count: usageEvents24hCount },
  ] = await Promise.all([
    client.from("profiles").select("id", { count: "exact", head: true }),
    client.from("workspaces").select("id", { count: "exact", head: true }),
    client.from("releases").select("id", { count: "exact", head: true }),
    client
      .from("billing_state")
      .select("workspace_id", { count: "exact", head: true })
      .eq("status", "active"),
    client
      .from("usage_events")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.admin.label}
        </p>
        <h1 className="text-2xl font-semibold text-white">
          {t.admin.overviewTitle}
        </h1>
        <p className="mt-2 text-sm text-white/60">{t.admin.overviewSubtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard
          label={t.admin.totalUsers}
          value={String(usersCount ?? 0)}
          helper={t.admin.totalUsersHelp}
        />
        <StatCard
          label={t.admin.workspaces}
          value={String(workspacesCount ?? 0)}
          helper={t.admin.workspacesHelp}
        />
        <StatCard
          label={t.admin.activeSubscriptions}
          value={String(activeSubsCount ?? 0)}
          helper={t.admin.activeSubscriptionsHelp}
        />
        <StatCard
          label={t.admin.usageEvents24h}
          value={String(usageEvents24hCount ?? 0)}
          helper={t.admin.usageEvents24hHelp}
        />
        <StatCard
          label={t.admin.releasesCount}
          value={String(releasesCount ?? 0)}
          helper={t.admin.releasesCountHelp}
        />
      </div>
    </div>
  );
}

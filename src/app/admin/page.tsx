import StatCard from "@/components/StatCard";
import { requireAdminUserOrNotFound } from "@/lib/auth";

export default async function AdminOverviewPage() {
  const { supabase, adminClient } = await requireAdminUserOrNotFound();
  const client = adminClient ?? supabase;

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

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
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-white">
          Control center overview
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard
          label="Total users"
          value={String(usersCount ?? 0)}
          helper="Profiles created in Supabase."
        />
        <StatCard
          label="Workspaces"
          value={String(workspacesCount ?? 0)}
          helper="Total workspaces across all users."
        />
        <StatCard
          label="Active subscriptions"
          value={String(activeSubsCount ?? 0)}
          helper="billing_state rows with status=active."
        />
        <StatCard
          label="Usage events (24h)"
          value={String(usageEvents24hCount ?? 0)}
          helper="Events ingested during last 24 hours."
        />
        <StatCard
          label="Releases"
          value={String(releasesCount ?? 0)}
          helper="Desktop builds available for download."
        />
      </div>
    </div>
  );
}

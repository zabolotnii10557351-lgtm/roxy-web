import StatCard from "@/components/StatCard";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminOverviewPage() {
  const { supabase, adminClient } = await requireAdminUser();
  const client = adminClient ?? supabase;

  const [{ count: usersCount }, { count: releasesCount }] = await Promise.all([
    client.from("profiles").select("id", { count: "exact", head: true }),
    client.from("releases").select("id", { count: "exact", head: true }),
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
          label="Releases"
          value={String(releasesCount ?? 0)}
          helper="Desktop builds available for download."
        />
      </div>
    </div>
  );
}

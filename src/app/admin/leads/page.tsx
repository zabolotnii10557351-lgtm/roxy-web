import AdminLeadsClient from "@/app/admin/leads/leads-client";

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Leads</p>
        <h1 className="text-2xl font-semibold text-white">Waitlist & contact</h1>
        <p className="mt-2 text-sm text-white/60">
          View captured leads and export CSV.
        </p>
      </div>
      <AdminLeadsClient />
    </div>
  );
}

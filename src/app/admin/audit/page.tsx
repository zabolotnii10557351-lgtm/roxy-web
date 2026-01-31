import AdminAuditClient from "@/app/admin/audit/audit-client";

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Audit</p>
        <h1 className="text-2xl font-semibold text-white">Admin audit logs</h1>
        <p className="mt-2 text-sm text-white/60">
          Recent admin actions across users, pricing, content, and leads.
        </p>
      </div>
      <AdminAuditClient />
    </div>
  );
}

import AdminAuditClient from "@/app/admin/audit/audit-client";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function AdminAuditPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.admin.navAudit}
        </p>
        <h1 className="text-2xl font-semibold text-white">{t.admin.auditTitle}</h1>
        <p className="mt-2 text-sm text-white/60">{t.admin.auditSubtitle}</p>
      </div>
      <AdminAuditClient />
    </div>
  );
}

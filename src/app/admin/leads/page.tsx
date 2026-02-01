import AdminLeadsClient from "@/app/admin/leads/leads-client";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function AdminLeadsPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.admin.navLeads}
        </p>
        <h1 className="text-2xl font-semibold text-white">{t.admin.leadsTitle}</h1>
        <p className="mt-2 text-sm text-white/60">{t.admin.leadsSubtitle}</p>
      </div>
      <AdminLeadsClient />
    </div>
  );
}

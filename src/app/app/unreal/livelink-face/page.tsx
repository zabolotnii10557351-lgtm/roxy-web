import Button from "@/components/Button";
import DesktopOnlyGate from "@/components/DesktopOnlyGate";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function LiveLinkFacePage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  return (
    <DesktopOnlyGate title={t.app.unrealConnector}>
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.unrealLiveLinkFaceTitle}</h2>
        <p className="mt-2 text-sm text-white/60">
          {t.common.featureComingSoonDescription}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-3">
        <div className="pt-3 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/unreal">{t.app.unrealBackToHubButton}</Button>
          <Button variant="secondary" href="/docs/unreal">{t.app.unrealOpenDocsButton}</Button>
        </div>
      </div>
      </div>
    </DesktopOnlyGate>
  );
}

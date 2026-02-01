import Button from "@/components/Button";
import DesktopOnlyGate from "@/components/DesktopOnlyGate";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function UnrealHubPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  return (
    <DesktopOnlyGate title={t.app.unrealConnector}>
      <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.unrealConnector}</h2>
        <p className="mt-2 text-sm text-white/60">
          {t.app.unrealHubSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.unrealGettingStartedTitle}</h3>
          <p className="mt-2 text-sm text-white/70">
            {t.app.unrealGettingStartedDescription}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" href="/app/unreal/import-metahuman">{t.app.unrealImportMetahumanTitle}</Button>
            <Button variant="secondary" href="/app/unreal/livelink-face">{t.app.unrealLiveLinkFaceTitle}</Button>
            <Button variant="secondary" href="/app/unreal/manual-setup">{t.app.unrealManualSetupTitle}</Button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.unrealRuntimeConnectorTitle}</h3>
          <p className="mt-2 text-sm text-white/70">
            {t.common.featureComingSoonDescription}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" href="/app/unreal/runtime-connector" disabled>
              {t.app.unrealOpenRuntimeConnectorButton.replace("{comingSoon}", t.common.comingSoon)}
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">{t.app.unrealExportTitle}</h3>
        <p className="mt-2 text-sm text-white/70">
          {t.app.unrealExportDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/characters">{t.app.characters}</Button>
        </div>
      </div>
      </div>
    </DesktopOnlyGate>
  );
}

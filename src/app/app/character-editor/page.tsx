import Badge from "@/components/Badge";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function CharacterEditorPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const enabled = process.env.POLYPHORIA_ENABLED === "true";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.characterEditorTitle}</h2>
        <p className="mt-2 text-sm text-white/60">
          {enabled
            ? t.app.characterEditorEnabledNote
            : t.app.characterEditorComingSoonNote}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        {enabled ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{t.app.characterEditorSectionTitle}</h3>
              <Badge variant="outline">{t.common.preview}</Badge>
            </div>
            <p className="mt-3 text-sm text-white/70">
              {t.app.characterEditorEnabledDescription}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-white/70">
              {t.app.characterEditorWaitlistDescription}
            </p>
            <div className="mt-5">
              <NotifyMeForm tag="polyphoria" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

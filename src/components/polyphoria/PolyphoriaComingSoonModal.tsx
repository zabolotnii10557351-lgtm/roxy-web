"use client";

import Button from "@/components/Button";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";
import { useTranslations } from "@/i18n/client";

export default function PolyphoriaComingSoonModal(props: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  if (!props.open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
    >
      <div className="glass-card w-full max-w-lg rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">
          {t.app.characterEditorTitle} — {t.common.comingSoon}
        </h3>
        <p className="mt-2 text-sm text-white/70">
          {t.app.polyphoriaModalDescription}
        </p>

        <div className="mt-5">
          <NotifyMeForm tag="polyphoria" />
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" href="/app/unreal/import-metahuman" onClick={props.onClose}>
            {t.app.unrealImportMetahumanTitle}
          </Button>
          <Button variant="secondary" onClick={props.onClose}>
            {t.common.close}
          </Button>
        </div>
      </div>
    </div>
  );
}

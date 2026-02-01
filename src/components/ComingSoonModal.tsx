"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

export default function ComingSoonModal({
  open,
  onClose,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}) {
  const t = useTranslations();
  if (!open) return null;

  const resolvedTitle = title ?? t.common.comingSoon;
  const resolvedDescription = description ?? t.common.featureComingSoonDescription;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card w-full max-w-md rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">{resolvedTitle}</h3>
        <p className="mt-2 text-sm text-white/70">{resolvedDescription}</p>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            {t.common.close}
          </Button>
        </div>
      </div>
    </div>
  );
}

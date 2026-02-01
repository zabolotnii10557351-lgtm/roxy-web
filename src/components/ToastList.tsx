"use client";

import { useTranslations } from "@/i18n/client";

export default function ToastList() {
  const t = useTranslations();
  const toasts = [
    t.common.saved,
    t.common.draftUpdated,
    t.common.published,
    t.common.planUpgradeRequired,
    t.common.creditsLimitReached,
  ];

  return (
    <div className="space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast}
          className="glass-card flex items-center justify-between rounded-2xl px-4 py-3 text-xs text-white/80"
        >
          <span>{toast}</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/60">
            {t.common.now}
          </span>
        </div>
      ))}
    </div>
  );
}

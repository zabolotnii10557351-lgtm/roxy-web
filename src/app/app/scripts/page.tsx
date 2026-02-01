"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

export default function ScriptsPage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.scripts}</h2>
          <p className="text-sm text-white/60">
            {t.app.scriptsSubtitle}
          </p>
        </div>
        <Button disabled>
          New Script ({t.common.comingSoon})
        </Button>
      </div>

      <div className="glass-card rounded-3xl p-10 text-center">
        <p className="text-sm text-white/70">
          {t.common.preview}. Script presets will appear here once the editor + persistence is enabled.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" href="/docs/tutorials/first-stream">
            Open setup guide
          </Button>
        </div>
      </div>
    </div>
  );
}

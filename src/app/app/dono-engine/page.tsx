"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

export default function DonoEnginePage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.donoEngine}</h2>
          <p className="text-sm text-white/60">
            {t.app.donoEngineSubtitle}
          </p>
        </div>
        <Button disabled>
          Simulate Gift ({t.common.comingSoon})
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Rule editor</h3>
          <p className="mt-2 text-sm text-white/70">
            {t.common.preview}. Gift/donation rules will be editable here once the runtime connector is enabled.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" disabled>
              Create rule ({t.common.comingSoon})
            </Button>
            <Button variant="ghost" href="/docs/safety">
              Safety & limits
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Active rules</h3>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            No rules yet.
          </div>
        </div>
      </div>
    </div>
  );
}

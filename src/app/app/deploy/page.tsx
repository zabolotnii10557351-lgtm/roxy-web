"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

const steps = [
  "Choose OBS scene",
  "Add Browser Source",
  "Paste your overlay URL",
  "Start your session",
];

export default function DeployPage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.deploy}</h2>
        <p className="text-sm text-white/60">
          {t.app.deploySubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Deployment flow</h3>
          <ol className="mt-4 space-y-3 text-sm text-white/70">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button disabled>{t.app.generateShareLink} ({t.common.comingSoon})</Button>
            <Button variant="secondary" href="/docs/obs">
              {t.nav.docs}
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Session status</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Overlay URL: Not generated yet
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Status: {t.common.preview}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Last publish: —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

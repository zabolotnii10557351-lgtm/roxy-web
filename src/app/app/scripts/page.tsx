"use client";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useTranslations } from "@/i18n/client";

const scripts = [
  { name: "Intro", interval: "Every session", enabled: true },
  { name: "Engagement loop", interval: "Every 5 min", enabled: true },
  { name: "Mini-game", interval: "Every 20 min", enabled: false },
  { name: "Battle mode", interval: "Triggered by gift", enabled: true },
];

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
        <Button>New Script</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {scripts.map((script) => (
          <div key={script.name} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {script.name}
              </h3>
              <Badge>{script.enabled ? "Enabled" : "Paused"}</Badge>
            </div>
            <p className="mt-2 text-sm text-white/60">
              Interval: {script.interval}
            </p>
            <div className="mt-4 grid gap-3 text-xs text-white/70 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                Conditions: Gift streak ≥ 3
              </div>
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                Voice line: "Let's spin the wheel"
              </div>
            </div>
            <Button className="mt-4" variant="secondary">
              Edit preset
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

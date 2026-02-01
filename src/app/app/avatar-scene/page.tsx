"use client";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useTranslations } from "@/i18n/client";

export default function AvatarScenePage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.avatarScene}</h2>
          <p className="text-sm text-white/60">
            {t.app.avatarSceneSubtitle}
          </p>
        </div>
        <Button variant="secondary" disabled>
          Open Unreal Preview ({t.common.comingSoon})
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Scene control</h3>
            <Badge variant="outline">{t.common.preview}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            This section will manage avatar scene presets and Unreal templates once the runtime connector is enabled.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="ghost" href="/docs/unreal">
              Unreal docs
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Scene assets</h3>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            No assets uploaded yet.
          </div>
          <Button className="mt-4 w-full" disabled>
            Upload asset ({t.common.comingSoon})
          </Button>
        </div>
      </div>
    </div>
  );
}

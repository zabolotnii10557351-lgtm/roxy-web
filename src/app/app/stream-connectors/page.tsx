"use client";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import FeatureLock from "@/components/FeatureLock";
import { isPlanAtLeast } from "@/lib/plans";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";

export default function StreamConnectorsPage() {
  const { planId, isAccessBlocked } = usePlan();
  const t = useTranslations();
  const proUnlocked = isPlanAtLeast(planId, "pro") && !isAccessBlocked;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.connectors}</h2>
        <p className="text-sm text-white/60">
          {t.app.connectorsSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">TikTok Live</h3>
            <Badge variant="outline">{t.common.preview}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            {t.app.connectorsTiktokDescription}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="secondary" disabled>
              {t.app.connectorsConnectTiktok} ({t.common.comingSoon})
            </Button>
            <Button variant="ghost" href="/docs/tutorials/first-stream">
              {t.app.connectorsOpenSetupGuide}
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Twitch</h3>
            <Badge variant="outline">{t.common.comingSoon}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            {t.app.connectorsJoinWaitlist}
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">YouTube Live</h3>
            <Badge variant="outline">{t.common.comingSoon}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            {t.app.connectorsEarlyAccessNote}
          </p>
        </div>
      </div>

      <FeatureLock
        title={t.app.connectorsMultiAccountTitle}
        description={t.app.connectorsMultiAccountDescription}
        locked={!proUnlocked}
      >
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {t.app.connectorsMultiAccountTitle}
          </h3>
          <p className="text-sm text-white/70">
            {t.app.connectorsMultiAccountBody}
          </p>
          <div className="grid gap-3 text-xs text-white/70 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              {t.app.connectorsExampleRotationWindow}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              {t.app.connectorsExampleMaxSessionsPerDay}
            </div>
          </div>
        </div>
      </FeatureLock>
    </div>
  );
}

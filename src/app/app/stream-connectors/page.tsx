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
            Connectors are configured via the Desktop companion. This dashboard will show live status once the connector
            APIs are enabled.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="secondary" disabled>
              Connect TikTok ({t.common.comingSoon})
            </Button>
            <Button variant="ghost" href="/docs/tutorials/first-stream">
              Open setup guide
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Twitch</h3>
            <Badge variant="outline">{t.common.comingSoon}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Join the waitlist to get early access.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">YouTube Live</h3>
            <Badge variant="outline">{t.common.comingSoon}</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Early access rolling out to Pro and Studio first.
          </p>
        </div>
      </div>

      <FeatureLock
        title="Multi-account scheduler"
        description="Available in Pro+. Rotate multiple accounts with scheduling rules."
        locked={!proUnlocked}
      >
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Multi-account scheduler
          </h3>
          <p className="text-sm text-white/70">
            This module is a preview. Once enabled, you&apos;ll be able to rotate accounts by schedules and usage limits.
          </p>
          <div className="grid gap-3 text-xs text-white/70 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Example: Rotation window: every 4 hours
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Example: Max sessions per day: 3
            </div>
          </div>
        </div>
      </FeatureLock>
    </div>
  );
}

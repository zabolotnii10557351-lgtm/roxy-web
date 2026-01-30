"use client";

import Badge from "@/components/Badge";
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
            <Badge>Connected</Badge>
          </div>
          <p className="mt-3 text-sm text-white/70">
            1 account linked. Region: EU. Language: EN.
          </p>
          <div className="mt-6 text-xs text-white/50">
            Last sync: 2 minutes ago.
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
        description="Available in Pro+. Rotate multiple TikTok accounts with schedules."
        locked={!proUnlocked}
      >
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Multi-account scheduler
          </h3>
          <p className="text-sm text-white/70">
            Queue up to 5 accounts on Pro or 20 on Studio with rotation rules.
          </p>
          <div className="grid gap-3 text-xs text-white/70 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Primary account: @roxy_live
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Rotation: Every 4 hours
            </div>
          </div>
        </div>
      </FeatureLock>
    </div>
  );
}

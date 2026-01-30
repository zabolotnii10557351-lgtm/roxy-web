"use client";

import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import ToastList from "@/components/ToastList";
import Badge from "@/components/Badge";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";

export default function OverviewPage() {
  const {
    planId,
    isAccessBlocked,
    hoursRemaining,
    hoursLimit,
    isTrialExpired,
  } = usePlan();
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.overview}</h2>
          <p className="text-sm text-white/60">
            {t.app.overviewSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{planId.toUpperCase()} plan</Badge>
          <Button variant="secondary" disabled={isAccessBlocked}>
            {isTrialExpired ? t.app.upgradeRequired : t.app.startSession}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label={t.app.currentPlan}
          value={planId.toUpperCase()}
          helper="Plan billing cycle: monthly"
        />
        <StatCard label="Connected accounts" value="2" helper="TikTok live" />
        <StatCard
          label="Last session"
          value="Ended 18m ago"
          helper="Avg retention: 7m 20s"
        />
      </div>

      {hoursLimit !== null ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          {t.app.remainingHours}: {hoursRemaining?.toFixed(1)}h / {hoursLimit}h
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Quick actions</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Button variant="secondary" href="/app/characters/new" disabled={isAccessBlocked}>
              {t.app.createCharacter}
            </Button>
            <Button variant="secondary" href="/app/dono-engine" disabled={isAccessBlocked}>
              {t.app.setupDonoRules}
            </Button>
            <Button variant="secondary" href="/app/deploy" disabled={isAccessBlocked}>
              {t.app.deploy}
            </Button>
            <Button variant="secondary" href="/app/deploy" disabled={isAccessBlocked}>
              {t.app.generateShareLink}
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">System toasts</h3>
          <p className="mt-2 text-xs text-white/60">
            Recent updates from the workspace.
          </p>
          <div className="mt-4">
            <ToastList />
          </div>
        </div>
      </div>
    </div>
  );
}

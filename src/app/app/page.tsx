"use client";

import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import ToastList from "@/components/ToastList";
import Badge from "@/components/Badge";
import { usePlanStore } from "@/store/plan-store";

export default function OverviewPage() {
  const currentPlan = usePlanStore((state) => state.currentPlan);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          <p className="text-sm text-white/60">
            Live status, limits, and quick actions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{currentPlan.toUpperCase()} plan</Badge>
          <Button variant="secondary">Start Session</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Current plan"
          value={currentPlan.toUpperCase()}
          helper="Plan billing cycle: monthly"
        />
        <StatCard label="Connected accounts" value="2" helper="TikTok live" />
        <StatCard
          label="Last session"
          value="Ended 18m ago"
          helper="Avg retention: 7m 20s"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Quick actions</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Button variant="secondary">Create Character</Button>
            <Button variant="secondary">Setup Dono Rules</Button>
            <Button variant="secondary">Deploy</Button>
            <Button variant="secondary">Generate Share Link</Button>
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

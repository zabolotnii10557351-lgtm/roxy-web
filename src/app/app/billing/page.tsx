"use client";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { planCards } from "@/lib/roxy-data";
import { isPlanAtLeast, usePlanStore } from "@/store/plan-store";

const planHours: Record<string, number> = {
  trial: 1,
  basic: 0,
  pro: 10,
  studio: 40,
};

export default function BillingPage() {
  const currentPlan = usePlanStore((state) => state.currentPlan);
  const setPlan = usePlanStore((state) => state.setPlan);
  const hoursIncluded = planHours[currentPlan];
  const hoursUsed = currentPlan === "basic" ? 0 : Math.max(0.6, hoursIncluded * 0.35);
  const hoursRemaining = Math.max(0, hoursIncluded - hoursUsed);
  const showHours = currentPlan !== "basic";
  const canUseUnreal = isPlanAtLeast(currentPlan, "pro");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Billing</h2>
        <p className="text-sm text-white/60">
          Manage your plan, credits, and add-ons.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Current plan</h3>
              <p className="text-sm text-white/60">
                Switch plans to preview locked features.
              </p>
            </div>
            <Badge>{currentPlan.toUpperCase()}</Badge>
          </div>

          {showHours ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-white">
                <span>Remaining active speech hours</span>
                <span>
                  {hoursRemaining.toFixed(1)}h / {hoursIncluded}h
                </span>
              </div>
              <ProgressBar value={(hoursRemaining / hoursIncluded) * 100} className="mt-3" />
              <p className="mt-2 text-xs text-white/60">
                Active speech = minutes when Roxy generates and plays TTS.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Unlimited active speech hours (BYOK).
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {planCards.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setPlan(plan.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  currentPlan === plan.id
                    ? "border-violet-400 bg-violet-500/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{plan.name}</span>
                  <span className="text-xs text-white/60">{plan.price}</span>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  {plan.includedHours}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Buy extra hours</h3>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+10 hours</span>
                <span>€25</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+50 hours</span>
                <span>€99</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+200 hours</span>
                <span>€299</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Unreal Connector Pack
              </h3>
              <Badge>Add-on</Badge>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Unreal Live connector, lip-sync triggers, sample UE scenes, and
              action mapping for Dono Engine.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70">
              <span>Status</span>
              <span>{canUseUnreal ? "Available" : "Available in Pro+"}</span>
            </div>
            <Button className="mt-4 w-full" variant="secondary">
              {canUseUnreal ? "Enable add-on" : "Plan upgrade required"}
            </Button>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">Billing summary</h3>
        <div className="mt-4 grid gap-4 text-sm text-white/70 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            Next invoice: Feb 26, 2026
          </div>
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            Payment method: Visa •••• 8842
          </div>
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            Usage alerts: On
          </div>
        </div>
      </div>
    </div>
  );
}

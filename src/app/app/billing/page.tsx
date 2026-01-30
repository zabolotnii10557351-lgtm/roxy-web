"use client";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { getPlanCards } from "@/lib/roxy-data";
import { isPlanAtLeast } from "@/lib/plans";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";
import { useLocale } from "@/i18n/client";
import { getContent } from "@/i18n/content";

export default function BillingPage() {
  const {
    planId,
    hoursLimit,
    hoursRemaining,
    activeHoursUsed,
    isTrialExpired,
  } = usePlan();
  const t = useTranslations();
  const { locale } = useLocale();
  const planCards = getPlanCards(locale);
  const content = getContent(locale);
  const showHours = hoursLimit !== null;
  const canUseUnreal = isPlanAtLeast(planId, "pro");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.billing}</h2>
        <p className="text-sm text-white/60">
          {t.app.billingSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {t.app.currentPlan}
              </h3>
              <p className="text-sm text-white/60">
                {t.app.managePlan}
              </p>
            </div>
            <Badge>{planId.toUpperCase()}</Badge>
          </div>

          {showHours ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-white">
                <span>{t.app.remainingHours}</span>
                <span>
                  {hoursRemaining?.toFixed(1)}h / {hoursLimit}h
                </span>
              </div>
              <ProgressBar
                value={
                  hoursLimit
                    ? (Math.max(0, hoursLimit - activeHoursUsed) / hoursLimit) *
                      100
                    : 0
                }
                className="mt-3"
              />
              <p className="mt-2 text-xs text-white/60">
                Active speech = minutes when Roxy generates and plays TTS.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              {t.app.unlimitedHours}
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {planCards.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  planId === plan.id
                    ? "border-violet-400 bg-violet-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{plan.name}</span>
                  <span className="text-xs text-white/60">{plan.price}</span>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  {plan.includedHours}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/pricing">{t.app.comparePlans}</Button>
            <Button href="/contact" variant="secondary">
              {t.app.contactSales}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">
              {content.pricing.extraCreditsTitle}
            </h3>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              {content.pricing.extraCredits.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {content.pricing.addonTitle}
              </h3>
              <Badge>{content.pricing.addonBadge}</Badge>
            </div>
            <p className="mt-3 text-sm text-white/60">
              {content.pricing.addonDescription}
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
        <h3 className="text-lg font-semibold text-white">
          {t.app.billingSummary}
        </h3>
        <div className="mt-4 grid gap-4 text-sm text-white/70 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            {isTrialExpired ? t.app.trialEnded : t.app.nextInvoice}
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

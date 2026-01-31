"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import InfoTooltip from "@/components/InfoTooltip";
import { useRouter } from "next/navigation";
import {
  calcEstimatedStreamHours,
  type PricingInterval,
} from "@/config/pricing";
import { usePricingConfig } from "@/lib/pricing/usePricingConfig";

function formatEur(amount: number) {
  return `EUR ${amount.toFixed(2)}`;
}

function formatHours(amount: number) {
  const fixed = amount.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

export default function PricingPlans() {
  const router = useRouter();
  const [billing, setBilling] = useState<PricingInterval>("monthly");
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pricing = usePricingConfig();
  const discountPct = pricing.config?.yearly_discount_pct ?? 20;
  const tooltipText = pricing.config?.tooltip_text ?? "";
  const defaultTalkRatio = pricing.config?.default_talk_ratio ?? 0.2;

  const plans = useMemo(() => pricing.config?.plans ?? [], [pricing.config]);

  const calcYearlyTotal = (monthlyPrice: number) =>
    monthlyPrice * 12 * (1 - discountPct / 100);

  const calcYearlyMonthlyEquivalent = (monthlyPrice: number) =>
    calcYearlyTotal(monthlyPrice) / 12;

  const startCheckout = async (planId: string) => {
    setError(null);
    setLoadingPlanId(planId);

    const interval = billing === "yearly" ? "year" : "month";
    const successUrl = `${window.location.origin}/app/billing/success`;
    const cancelUrl = `${window.location.origin}/app/billing/cancel`;

    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, interval, successUrl, cancelUrl }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        router.push("/login");
        return;
      }

      const json = await response.json();
      if (!response.ok || !json?.url) {
        setError(json?.error ?? "Checkout failed");
        setLoadingPlanId(null);
        return;
      }

      window.location.assign(String(json.url));
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? (e as { message?: unknown }).message
          : null;
      setError(typeof msg === "string" ? msg : "Checkout failed");
      setLoadingPlanId(null);
    }
  };

  return (
    <>
      <div className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white/70">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 transition-colors ${
                billing === "monthly"
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-2 transition-colors ${
                billing === "yearly"
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Yearly (save {discountPct}%) - billed yearly
            </button>
          </div>
          <p className="text-xs text-white/60">Save {discountPct}%</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const includedActiveSpeech =
              plan.entitlements?.included_active_speech_hours_openai ?? null;

            const estimatedStreamHours =
              includedActiveSpeech === null
                ? null
                : calcEstimatedStreamHours(
                    includedActiveSpeech,
                    defaultTalkRatio
                  );

            const isStarter = plan.id === "starter";
            const isEnterprise = plan.id === "enterprise";

            const monthlyPrice = plan.monthly_price_eur;
            const yearlyMonthlyEquivalent =
              monthlyPrice === null
                ? null
                : calcYearlyMonthlyEquivalent(monthlyPrice);
            const yearlyTotal =
              monthlyPrice === null ? null : calcYearlyTotal(monthlyPrice);

            return (
              <div key={plan.id} className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  {isStarter ? <Badge>7-day free trial</Badge> : null}
                </div>

                <div className="mt-6">
                  {isEnterprise ? (
                    <p className="text-2xl font-semibold text-white">
                      Contact sales
                    </p>
                  ) : billing === "monthly" && monthlyPrice !== null ? (
                    <p className="text-2xl font-semibold text-white">
                      {formatEur(monthlyPrice)} / month
                    </p>
                  ) : yearlyMonthlyEquivalent !== null && yearlyTotal !== null ? (
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold text-white">
                        {formatEur(yearlyMonthlyEquivalent)} / month
                        <span className="ml-2 text-sm font-normal text-white/70">
                          billed yearly
                        </span>
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-white/60">
                          billed yearly {formatEur(yearlyTotal)}
                        </p>
                        <Badge>Save {discountPct}%</Badge>
                      </div>
                    </div>
                  ) : null}
                </div>

                {includedActiveSpeech !== null ? (
                  <div className="mt-5 space-y-2 text-sm text-white/70">
                    {estimatedStreamHours !== null ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2">
                            Estimated stream hours
                            <InfoTooltip text={tooltipText} />
                          </span>
                          <span className="font-semibold text-white">
                            {formatHours(estimatedStreamHours)}h
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-white/60">
                          Estimated {formatHours(estimatedStreamHours)}h stream at {Math.round(defaultTalkRatio * 100)}% talk ratio
                        </p>
                      </div>
                    ) : null}

                    <p className="text-xs text-white/60">
                      Includes {formatHours(includedActiveSpeech)}h active speech (OpenAI)
                    </p>
                  </div>
                ) : null}

                <div className="mt-6">
                  {isEnterprise ? (
                    <Button className="w-full" href="/contact">
                      Contact sales
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => startCheckout(plan.id)}
                      disabled={loadingPlanId === plan.id}
                    >
                      {loadingPlanId === plan.id ? "Redirecting..." : "Subscribe"}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {error ? (
          <p className="text-center text-sm text-rose-200">{error}</p>
        ) : null}
      </div>
    </>
  );
}

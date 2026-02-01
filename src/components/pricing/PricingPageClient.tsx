"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import TalkRatioControl from "@/components/pricing/TalkRatioControl";
import PricingComparisonTable from "@/components/pricing/PricingComparisonTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import {
  PRICING_DEFAULT_TALK_RATIO,
  PRICING_PLANS,
  PRICING_TOOLTIP_TEXT,
  PRICING_YEARLY_DISCOUNT_PCT,
  calcEstimatedStreamHours,
  calcYearlyMonthlyEquivalent,
  calcYearlyTotal,
  type PricingInterval,
  type PricingPlan,
} from "@/config/pricingPlans";
import { formatEur, formatHours } from "@/components/pricing/format";

function buildEnterprisePrefill() {
  const lines = [
    "Hi RoxStreamAI team,",
    "",
    "We're interested in Enterprise pricing.",
    "",
    "Context:",
    "- Plan: Enterprise",
    "- Expected characters: ",
    "- Expected concurrent streams: ",
    "- Provider preference (OpenAI included vs BYOK): ",
    "- Target launch date: ",
    "",
    "Thanks!",
  ];
  return lines.join("\n");
}

function formatPct(value: number) {
  return `${Math.round(value * 100)}%`;
}

function whatsIncluded(plan: PricingPlan, talkRatio: number): string[] {
  if (!plan.entitlements) {
    return [
      "Custom limits and onboarding",
      "Invoicing and procurement support",
      "Security and compliance review",
      "SLA options",
    ];
  }

  const includedActiveSpeech = plan.entitlements.included_active_speech_hours_openai;
  const est = calcEstimatedStreamHours(includedActiveSpeech, talkRatio);

  return [
    `${plan.entitlements.max_characters} character${plan.entitlements.max_characters === 1 ? "" : "s"}`,
    `${plan.entitlements.max_concurrent_streams} concurrent stream${plan.entitlements.max_concurrent_streams === 1 ? "" : "s"}`,
    `${plan.entitlements.max_accounts_linked} linked account${plan.entitlements.max_accounts_linked === 1 ? "" : "s"}`,
    `Includes ${formatHours(includedActiveSpeech)}h Active Speech (OpenAI)`,
    `≈ ${formatHours(est)}h stream at ${formatPct(talkRatio)} talk ratio`,
  ];
}

export default function PricingPageClient() {
  const router = useRouter();
  const [billing, setBilling] = useState<PricingInterval>("monthly");
  const [talkRatio, setTalkRatio] = useState<number>(PRICING_DEFAULT_TALK_RATIO);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plans = useMemo(() => PRICING_PLANS.slice(), []);

  const startCheckout = async (planId: string) => {
    setError(null);

    if (!planId) return;

    // If they aren't authenticated, the API will return 401 JSON.
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
      const isJson = contentType.includes("application/json");

      if (response.status === 401) {
        router.push(`/login?returnTo=${encodeURIComponent("/pricing")}`);
        return;
      }

      if (!isJson) {
        setError("Checkout failed");
        setLoadingPlanId(null);
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
            Yearly
          </button>
        </div>
        <p className="text-xs text-white/60">
          Billed yearly. Save up to {PRICING_YEARLY_DISCOUNT_PCT}%.
        </p>
      </div>

      <TalkRatioControl
        value={talkRatio}
        onChange={(v) => setTalkRatio(v)}
        tooltipText={PRICING_TOOLTIP_TEXT}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const isEnterprise = plan.id === "enterprise";
          const monthlyPrice = plan.monthly_price_eur;
          const yearlyMonthlyEquivalent =
            monthlyPrice === null ? null : calcYearlyMonthlyEquivalent(monthlyPrice);
          const yearlyTotal = monthlyPrice === null ? null : calcYearlyTotal(monthlyPrice);

          return (
            <div key={plan.id} className="glass-card rounded-3xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  {plan.marketing?.blurb ? (
                    <p className="mt-1 text-xs text-white/60">{plan.marketing.blurb}</p>
                  ) : null}
                </div>
                {plan.marketing?.badge ? <Badge>{plan.marketing.badge}</Badge> : null}
              </div>

              <div className="mt-6">
                {isEnterprise ? (
                  <p className="text-2xl font-semibold text-white">Contact sales</p>
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
                    <p className="text-xs text-white/60">
                      billed yearly {formatEur(yearlyTotal)}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  What’s included
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {whatsIncluded(plan, talkRatio).map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-white/50">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {isEnterprise ? (
                  <Button
                    className="w-full"
                    href={`/contact?topic=${encodeURIComponent("Sales")}&message=${encodeURIComponent(
                      buildEnterprisePrefill()
                    )}`}
                  >
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

      {error ? <p className="text-center text-sm text-rose-200">{error}</p> : null}

      <div className="space-y-4 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Compare plans</h2>
          <p className="mt-2 text-sm text-white/60">
            Stream hours are estimates. We always meter real usage by Active Speech.
          </p>
        </div>
        <PricingComparisonTable plans={plans} talkRatio={talkRatio} />
      </div>

      <div className="space-y-4 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Pricing FAQ</h2>
          <p className="mt-2 text-sm text-white/60">Common questions, answered.</p>
        </div>
        <PricingFAQ
          items={[
            {
              q: "What is Active Speech?",
              a: "Active Speech is the time the AI is actually speaking on stream. Silence and idle time don’t count.",
            },
            {
              q: "What’s the difference between included providers and BYOK?",
              a: "Included providers are covered up to your plan’s Active Speech quota. With BYOK, you bring your own provider keys and you pay that provider directly; RoxStreamAI still tracks Active Speech for your limits.",
            },
            {
              q: "Why do you show estimated stream hours?",
              a: "Stream hours depend on how talk-heavy your stream is. The talk ratio slider helps you translate Active Speech into a realistic stream-hour estimate.",
            },
            {
              q: "Can I change plans later?",
              a: "Yes. You can upgrade at any time. Downgrades take effect on the next billing cycle.",
            },
            {
              q: "Do you offer yearly billing?",
              a: `Yes. Yearly billing saves up to ${PRICING_YEARLY_DISCOUNT_PCT}% compared to monthly.`,
            },
            {
              q: "Need higher limits or invoicing?",
              a: "Choose Enterprise to get custom limits, onboarding, and invoicing support.",
            },
          ]}
        />
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-white">How usage works</h2>
        <p className="mt-3 text-sm text-white/70">
          Active Speech is the time the AI actually talks on stream. The dashboard converts your settings into estimated stream hours based on your talk ratio.
          If you use built-in providers, RoxStreamAI covers provider costs up to your plan quota. If you use BYOK, you pay the provider directly and RoxStreamAI tracks usage.
        </p>
      </div>
    </div>
  );
}

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
import { useLocale } from "@/i18n/client";
import { getPricingText, type PricingText } from "@/i18n/pricingText";
import type { Locale } from "@/i18n/locales";

function getPlanBlurb(planId: string, pt: PricingText): string | undefined {
  const map: Record<string, string> = {
    starter: pt.planStarterBlurb,
    creator: pt.planCreatorBlurb,
    pro: pt.planProBlurb,
    studio: pt.planStudioBlurb,
    scale: pt.planScaleBlurb,
    enterprise: pt.planEnterpriseBlurb,
  };
  return map[planId];
}

function getPlanBadge(planId: string, pt: PricingText): string | undefined {
  if (planId === "starter") return pt.trialBadge;
  if (planId === "pro") return pt.badgeBestValue;
  return undefined;
}

function buildEnterprisePrefill(isRu: boolean) {
  const lines = isRu
    ? [
        "Привет, команда RoxStreamAI,",
        "",
        "Интересует Enterprise тарификация.",
        "",
        "Контекст:",
        "- План: Enterprise",
        "- Сколько персонажей нужно: ",
        "- Сколько одновременных стримов: ",
        "- Провайдер (OpenAI included vs BYOK): ",
        "- Дата запуска: ",
        "",
        "Спасибо!",
      ]
    : [
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

function InfoTip(props: { text: string; label: string }) {
  return (
    <span
      className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold text-white/70"
      title={props.text}
      aria-label={props.label}
      role="img"
    >
      ?
    </span>
  );
}

function whatsIncluded(params: {
  plan: PricingPlan;
  talkRatio: number;
  pt: PricingText;
}): string[] {
  const { plan, talkRatio, pt } = params;
  if (!plan.entitlements) {
    return [
      pt.enterpriseCustomLimits,
      pt.enterpriseInvoicing,
      pt.enterpriseCompliance,
      pt.enterpriseSla,
    ];
  }

  const includedActiveSpeech = plan.entitlements.included_active_speech_hours_openai;
  const est = calcEstimatedStreamHours(includedActiveSpeech, talkRatio);

  const base = [
    pt.characterCount.replace("{0}", String(plan.entitlements.max_characters)),
    pt.concurrentStreamCount.replace("{0}", String(plan.entitlements.max_concurrent_streams)),
    pt.linkedAccountCount.replace("{0}", String(plan.entitlements.max_accounts_linked)),
    pt.includedSpeechHours.replace("{0}", formatHours(includedActiveSpeech)),
    pt.streamEstimate.replace("{0}", formatHours(est)).replace("{1}", String(Math.round(talkRatio * 100))),
  ];

  const extras = [
    pt.desktopApp,
    pt.tiktokIntegrations,
    pt.byokSupport,
  ];

  return [...base, ...extras];
}

export default function PricingPageClient(props: { locale?: string }) {
  const router = useRouter();
  const { locale: ctxLocale } = useLocale();
  const locale = (props.locale ?? ctxLocale) as Locale;
  const pt = getPricingText(locale);
  const isRu = locale === "ru";
  const [billing, setBilling] = useState<PricingInterval>("yearly");
  const [talkRatio, setTalkRatio] = useState<number>(PRICING_DEFAULT_TALK_RATIO);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plans = useMemo(() => PRICING_PLANS.slice(), []);

  const startCheckout = async (planId: string) => {
    setError(null);

    if (!planId) return;

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
        setError(pt.checkoutFailed);
        setLoadingPlanId(null);
        return;
      }

      const json = await response.json();
      if (!response.ok || !json?.url) {
        setError(json?.error ?? pt.checkoutFailed);
        setLoadingPlanId(null);
        return;
      }

      window.location.assign(String(json.url));
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? (e as { message?: unknown }).message
          : null;
      setError(typeof msg === "string" ? msg : pt.checkoutFailed);
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
            {pt.monthly}
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
            {pt.yearly}
          </button>
        </div>
        <p className="text-xs text-white/60">
          {pt.billedYearlySave.replace("{0}", String(PRICING_YEARLY_DISCOUNT_PCT))}
        </p>
      </div>

      <TalkRatioControl
        value={talkRatio}
        onChange={(v) => setTalkRatio(v)}
        tooltipText={PRICING_TOOLTIP_TEXT}
        labels={{
          talkRatio: pt.talkRatio,
          description: pt.talkRatioDescription,
          howWeEstimate: pt.howWeEstimate,
          current: pt.current,
          tip: pt.talkRatioTip,
        }}
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
                  {getPlanBlurb(plan.id, pt) ? (
                    <p className="mt-1 text-xs text-white/60">{getPlanBlurb(plan.id, pt)}</p>
                  ) : null}
                </div>
                {getPlanBadge(plan.id, pt) ? <Badge>{getPlanBadge(plan.id, pt)}</Badge> : null}
              </div>

              <div className="mt-6">
                {isEnterprise ? (
                  <p className="text-2xl font-semibold text-white">
                    {pt.contactSales}
                  </p>
                ) : billing === "monthly" && monthlyPrice !== null ? (
                  <p className="text-2xl font-semibold text-white">
                    {formatEur(monthlyPrice)} {pt.perMonth}
                  </p>
                ) : yearlyMonthlyEquivalent !== null && yearlyTotal !== null ? (
                  <div className="space-y-1">
                    <p className="text-2xl font-semibold text-white">
                      {formatEur(yearlyMonthlyEquivalent)} {pt.perMonth}
                      <span className="ml-2 text-sm font-normal text-white/70">
                        {pt.billedYearly}
                      </span>
                    </p>
                    <p className="text-xs text-white/60">
                      {pt.billedYearly} {formatEur(yearlyTotal)}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {pt.whatsIncluded}
                  <InfoTip
                    label={pt.activeSpeechLabel}
                    text={pt.activeSpeechDescription}
                  />
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {whatsIncluded({ plan, talkRatio, pt }).map((line) => (
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
                      buildEnterprisePrefill(isRu)
                    )}`}
                  >
                    {pt.contactSales}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => startCheckout(plan.id)}
                    disabled={loadingPlanId === plan.id}
                  >
                    {loadingPlanId === plan.id ? pt.redirecting : pt.subscribe}
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
          <h2 className="text-2xl font-semibold text-white">
            {pt.comparePlans}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {pt.comparePlansSubtitle}
          </p>
        </div>
        <PricingComparisonTable
          plans={plans}
          talkRatio={talkRatio}
          labels={{
            featureLabel: pt.featureLabel,
            usageGroup: pt.usageGroup,
            limitsGroup: pt.limitsGroup,
            automationGroup: pt.automationGroup,
            brandingGroup: pt.brandingGroup,
            activeSpeechIncluded: pt.activeSpeechIncluded,
            estimatedStreamHoursAtRatio: pt.estimatedStreamHoursAtRatio,
            byokElevenLabs: pt.byokElevenLabs,
            characters: pt.characters,
            concurrentStreams: pt.concurrentStreams,
            linkedAccounts: pt.linkedAccounts,
            scenes: pt.scenes,
            scheduler: pt.scheduler,
            donoRules: pt.donoRules,
            streamScripts: pt.streamScripts,
            removeWatermark: pt.removeWatermark,
            yes: pt.yes,
            no: pt.no,
            custom: pt.custom,
            show: pt.show,
            hide: pt.hide,
          }}
        />
      </div>

      <div className="space-y-4 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            {pt.faqTitle}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {pt.faqSubtitle}
          </p>
        </div>
        <PricingFAQ
          items={[
            { q: pt.faqActiveSpeechQ, a: pt.faqActiveSpeechA },
            { q: pt.faqByokQ, a: pt.faqByokA },
            { q: pt.faqEstimateQ, a: pt.faqEstimateA },
            { q: pt.faqChangePlanQ, a: pt.faqChangePlanA },
            {
              q: pt.faqYearlyQ,
              a: pt.faqYearlyA.replace("{0}", String(PRICING_YEARLY_DISCOUNT_PCT)),
            },
            { q: pt.faqHigherLimitsQ, a: pt.faqHigherLimitsA },
          ]}
        />
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-white">
          {pt.howUsageWorks}
        </h2>
        <p className="mt-3 text-sm text-white/70">
          {pt.howUsageWorksBody}
        </p>
      </div>
    </div>
  );
}

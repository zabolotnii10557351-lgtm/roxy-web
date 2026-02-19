"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import InfoTooltip from "@/components/InfoTooltip";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";
import {
  calcEstimatedStreamHours,
  type PricingPlanId,
} from "@/config/pricing";
import { usePricingConfig } from "@/lib/pricing/usePricingConfig";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function formatEur(amount: number) {
  return `EUR ${amount.toFixed(2)}`;
}

function formatHours(amount: number) {
  const fixed = amount.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

function calcYearlyTotalWithDiscount(monthlyPrice: number, discountPct: number) {
  return monthlyPrice * 12 * (1 - discountPct / 100);
}

function mapBackendPlanToPricingPlan(planId: string): PricingPlanId {
  if (planId === "trial") return "starter";
  if (planId === "basic") return "creator";
  if (planId === "pro") return "pro";
  if (planId === "studio") return "studio";
  return "starter";
}

const PLAN_ORDER: PricingPlanId[] = ["starter", "creator", "pro", "studio", "scale", "enterprise"];
function planRank(id: PricingPlanId) { return PLAN_ORDER.indexOf(id); }

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    planId,
    activeHoursUsed,
    isTrialExpired,
  } = usePlan();
  const t = useTranslations();

  const pricing = usePricingConfig();
  const pricingPlans = useMemo(() => pricing.config?.plans ?? [], [pricing.config]);
  const tooltipText = pricing.config?.tooltip_text ?? "";
  const minTalkRatio = pricing.config?.min_talk_ratio ?? 0.1;
  const maxTalkRatio = pricing.config?.max_talk_ratio ?? 0.5;
  const currentPricingPlanId = useMemo(
    () => mapBackendPlanToPricingPlan(planId),
    [planId]
  );
  const currentPricingPlan = useMemo(() => {
    return (
      pricingPlans.find((p) => p.id === currentPricingPlanId) ??
      pricingPlans[0] ??
      null
    );
  }, [pricingPlans, currentPricingPlanId]);

  const [selectedPlanId, setSelectedPlanId] = useState<PricingPlanId>(
    currentPricingPlanId
  );
  const selectedPlan = useMemo(() => {
    return (
      pricingPlans.find((p) => p.id === selectedPlanId) ??
      pricingPlans[0] ??
      null
    );
  }, [pricingPlans, selectedPlanId]);

  const [talkRatioPercent, setTalkRatioPercent] = useState(20);
  const talkRatio = talkRatioPercent / 100;
  const [billingInterval, setBillingInterval] = useState<"month" | "year">("month");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [acceptImmediate, setAcceptImmediate] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref") || searchParams.get("promo");
    if (ref && !promoCode) {
      setPromoCode(ref);
    }
  }, [promoCode, searchParams]);

  useEffect(() => {
    if (promoCode) return;
    let cancelled = false;

    (async () => {
      const res = await fetch("/api/referrals/active");
      if (!res.ok) return;
      const json = (await res.json().catch(() => null)) as
        | { code?: string | null }
        | null;
      if (!cancelled && json?.code) {
        setPromoCode(String(json.code));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [promoCode]);

  const includedActiveSpeech =
    selectedPlan?.entitlements?.included_active_speech_hours_openai ?? null;
  const estimatedStreamHours =
    includedActiveSpeech === null
      ? null
      : calcEstimatedStreamHours(includedActiveSpeech, talkRatio);

  const currentIncludedActiveSpeech =
    currentPricingPlan?.entitlements?.included_active_speech_hours_openai ?? null;
  const usageProgressPercent =
    currentIncludedActiveSpeech && currentIncludedActiveSpeech > 0
      ? Math.min(100, (activeHoursUsed / currentIncludedActiveSpeech) * 100)
      : 0;

  const yearlyDiscountPct = pricing.config?.yearly_discount_pct ?? 0;
  const selectedMonthlyPrice = selectedPlan?.monthly_price_eur ?? null;
  const yearlyTotal =
    selectedMonthlyPrice === null
      ? null
      : calcYearlyTotalWithDiscount(selectedMonthlyPrice, yearlyDiscountPct);
  const priceSummary =
    selectedMonthlyPrice === null
      ? "Contact sales / Skontaktuj się z nami"
      : billingInterval === "month"
        ? `${formatEur(selectedMonthlyPrice)} / month (incl. VAT) / miesiąc (z VAT)`
        : `${formatEur(yearlyTotal ?? selectedMonthlyPrice * 12)} / year (incl. VAT) / rok (z VAT)`;
  const minDurationLabel = billingInterval === "month" ? "1 month / 1 miesiąc" : "1 year / 1 rok";
  const summaryFeatures = selectedPlan?.entitlements
    ? [
        `Included active speech (OpenAI): ${formatHours(
          selectedPlan.entitlements.included_active_speech_hours_openai
        )}h`,
        `Max characters: ${selectedPlan.entitlements.max_characters}`,
        `Max concurrent streams: ${selectedPlan.entitlements.max_concurrent_streams}`,
        `Dono rules limit: ${selectedPlan.entitlements.dono_rules_limit}`,
        `Stream scripts limit: ${selectedPlan.entitlements.stream_scripts_limit}`,
        `Scenes limit: ${selectedPlan.entitlements.scenes_limit}`,
      ]
    : ["Custom limits and onboarding"]; 

  const startCheckout = async () => {
    setCheckoutError(null);
    setCheckoutLoading(true);

    const successUrl = `${window.location.origin}/app/billing/success`;
    const cancelUrl = `${window.location.origin}/app/billing/cancel`;

    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlanId,
          interval: billingInterval,
          successUrl,
          cancelUrl,
          promoCode: promoCode.trim(),
          consents: {
            acceptImmediate,
            acceptTerms,
            acceptMarketing,
          },
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        router.push("/login");
        return;
      }

      const json = await response.json();
      if (!response.ok || !json?.url) {
        setCheckoutError(json?.error ?? "Checkout failed");
        setCheckoutLoading(false);
        return;
      }

      window.location.assign(String(json.url));
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? (e as { message?: unknown }).message
          : null;
      setCheckoutError(typeof msg === "string" ? msg : "Checkout failed");
      setCheckoutLoading(false);
    }
  };

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
            <div className="flex items-center gap-2">
              {planId === "trial" ? <Badge>7-day free trial</Badge> : null}
              <Badge>{(currentPricingPlan?.name ?? "PLAN").toUpperCase()}</Badge>
            </div>
          </div>

          {currentIncludedActiveSpeech !== null ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm text-white">
                <span>
                  Included active speech (OpenAI): {formatHours(currentIncludedActiveSpeech)}h
                </span>
                <span>
                  Used: {formatHours(activeHoursUsed)}h
                </span>
              </div>
              <ProgressBar
                value={usageProgressPercent}
                className="mt-3"
              />
              <p className="mt-2 text-xs text-white/60">
                We meter real usage by active speech duration.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              {t.app.unlimitedHours}
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {pricingPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const monthly = plan.monthly_price_eur;
              const included =
                plan.entitlements?.included_active_speech_hours_openai ?? null;
              return (
              <div
                key={plan.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPlanId(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedPlanId(plan.id);
                  }
                }}
                className={`cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "border-violet-400 bg-violet-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">
                    {plan.name}
                  </span>
                  <span className="text-xs text-white/60">
                    {monthly === null ? "Contact sales" : `${formatEur(monthly)} / month`}
                  </span>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  {included === null
                    ? "Custom limits"
                    : `Includes ${formatHours(included)}h active speech (OpenAI)`}
                </p>
              </div>
            );
            })}
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
              Talk ratio calculator
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Stream hours are an estimate based on your talk ratio.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-white">
                  <span>Talk ratio</span>
                  <span className="text-white/70">{talkRatioPercent}%</span>
                </div>
                <input
                  type="range"
                  min={minTalkRatio * 100}
                  max={maxTalkRatio * 100}
                  step={1}
                  value={talkRatioPercent}
                  onChange={(e) => setTalkRatioPercent(Number(e.target.value))}
                  className="mt-3 w-full"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>Included active speech (OpenAI)</span>
                  <span className="font-semibold text-white">
                    {includedActiveSpeech === null
                      ? "—"
                      : `${formatHours(includedActiveSpeech)}h`}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    Estimated stream hours
                    <InfoTooltip text={tooltipText} />
                  </span>
                  <span className="font-semibold text-white">
                    {estimatedStreamHours === null
                      ? "—"
                      : `${formatHours(estimatedStreamHours)}h`}
                  </span>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  We meter real usage by active speech duration.
                </p>
              </div>

              {selectedPlanId === "enterprise" ? (
                <Button className="w-full" href="/contact">
                  Contact sales
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    <h4 className="text-sm font-semibold text-white">Order summary</h4>
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-white/60">Produkt / Product:</span> {selectedPlan?.name ?? "Plan"} subscription
                      </div>
                      <div>
                        <span className="text-white/60">Główne cechy / Main features:</span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
                          {summaryFeatures.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-white/60">Łączna cena (z podatkami) / Total price (incl. VAT):</span> {priceSummary}
                      </div>
                      <div>
                        <span className="text-white/60">Prawo odstąpienia / Right to withdraw:</span> Brak prawa do
                        odstąpienia po pełnym wykonaniu usługi. Żądając natychmiastowego wykonania, potwierdzasz
                        utratę tego prawa. / No right of withdrawal after the service is fully performed. By requesting
                        immediate performance, you acknowledge this.
                      </div>
                      <div>
                        <span className="text-white/60">Czas trwania umowy / Contract duration:</span> Nieoznaczony,
                        automatycznie odnawiany co okres rozliczeniowy. Wypowiedzenie w panelu. / Indefinite, auto-renews
                        each billing period. Cancellation available in the dashboard.
                      </div>
                      <div>
                        <span className="text-white/60">Minimalny czas zobowiązań / Minimum duration:</span> {minDurationLabel}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {t.app.promoCodeLabel}
                    </label>
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={t.app.promoCodePlaceholder}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                    />
                    <p className="mt-2 text-xs text-white/60">
                      {t.app.promoCodeHelp}
                    </p>
                  </div>

                  <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={acceptImmediate}
                        onChange={(e) => setAcceptImmediate(e.target.checked)}
                      />
                      <span>
                        Chcę, aby usługa została zrealizowana niezwłocznie i przyjmuję do wiadomości, że z chwilą
                        spełnienia świadczenia przez Fundację Rozwoju Przedsiębiorczości "Twój StartUp", utracę prawo do
                        odstąpienia od umowy. / I want the service to be provided immediately and I acknowledge that once
                        the service is performed, I will lose the right to withdraw from the contract.
                      </span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                      <span>
                        Akceptuję <Link className="underline" href="/terms">regulamin</Link> serwisu prowadzonego przez
                        Fundację Rozwoju Przedsiębiorczości "Twój StartUp" z siedzibą w Warszawie. / I accept the
                        <Link className="underline" href="/terms">Terms and Conditions</Link>.
                      </span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={acceptMarketing}
                        onChange={(e) => setAcceptMarketing(e.target.checked)}
                      />
                      <span>
                        Chcę otrzymywać informacje handlowe i marketingowe. / I want to receive commercial and marketing
                        content.
                      </span>
                    </label>
                  </div>

                  <div className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-1 text-xs text-white/70">
                    <button
                      type="button"
                      onClick={() => setBillingInterval("month")}
                      className={`flex-1 rounded-2xl px-3 py-2 transition-colors ${
                        billingInterval === "month"
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingInterval("year")}
                      className={`flex-1 rounded-2xl px-3 py-2 transition-colors ${
                        billingInterval === "year"
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                  {(() => {
                    const isTrial = planId === "trial";
                    const isSamePlan = !isTrial && selectedPlanId === currentPricingPlanId;
                    const isUpgrade = !isTrial && planRank(selectedPlanId) > planRank(currentPricingPlanId);
                    const isDowngrade = !isTrial && planRank(selectedPlanId) < planRank(currentPricingPlanId);

                    if (isSamePlan) {
                      return (
                        <Button className="w-full" disabled>
                          {t.app.billingCurrentPlanCheck}
                        </Button>
                      );
                    }

                    let label = t.app.billingSubscribe;
                    let note: string | null = null;
                    if (isUpgrade) { label = t.app.billingUpgrade; note = t.app.billingUpgradeNote; }
                    if (isDowngrade) { label = t.app.billingDowngrade; note = t.app.billingDowngradeNote; }

                    return (
                      <>
                        <Button
                          className="w-full"
                          onClick={startCheckout}
                          disabled={checkoutLoading || !acceptImmediate || !acceptTerms}
                        >
                          {checkoutLoading ? "Redirecting..." : label}
                        </Button>
                        {note ? <p className="text-xs text-white/60">{note}</p> : null}
                      </>
                    );
                  })()}
                  {checkoutError ? (
                    <p className="text-xs text-rose-200">{checkoutError}</p>
                  ) : null}
                  <p className="text-[11px] text-white/60">
                    Administratorem danych wprowadzonych do formularza jest Fundacja Rozwoju Przedsiębiorczości
                    "Twój StartUp". Dane będą przetwarzane w celu zrealizowania usługi oraz w celach marketingowych –
                    w przypadku wyrażenia zgody. Informujemy o możliwości wycofania zgody. Pełne informacje o
                    przetwarzaniu danych i przysługujących prawach znajdują się w
                    {" "}
                    <Link className="underline" href="/privacy">polityce prywatności</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

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
  isRu: boolean;
}): string[] {
  const { plan, talkRatio, isRu } = params;
  if (!plan.entitlements) {
    return isRu
      ? [
          "Кастомные лимиты и онбординг",
          "Инвойсинг и поддержка закупок",
          "Security/compliance review",
          "SLA опции",
        ]
      : [
          "Custom limits and onboarding",
          "Invoicing and procurement support",
          "Security and compliance review",
          "SLA options",
        ];
  }

  const includedActiveSpeech = plan.entitlements.included_active_speech_hours_openai;
  const est = calcEstimatedStreamHours(includedActiveSpeech, talkRatio);

  const base = isRu
    ? [
        `${plan.entitlements.max_characters} персонаж(а)`,
        `${plan.entitlements.max_concurrent_streams} одновременный(х) стрим(а)`,
        `${plan.entitlements.max_accounts_linked} подключённый(х) аккаунт(а)`,
        `Включено ${formatHours(includedActiveSpeech)}ч Active Speech (OpenAI)`,
        `≈ ${formatHours(est)}ч стрима при ${formatPct(talkRatio)} talk ratio`,
      ]
    : [
        `${plan.entitlements.max_characters} character${plan.entitlements.max_characters === 1 ? "" : "s"}`,
        `${plan.entitlements.max_concurrent_streams} concurrent stream${plan.entitlements.max_concurrent_streams === 1 ? "" : "s"}`,
        `${plan.entitlements.max_accounts_linked} linked account${plan.entitlements.max_accounts_linked === 1 ? "" : "s"}`,
        `Includes ${formatHours(includedActiveSpeech)}h Active Speech (OpenAI)`,
        `≈ ${formatHours(est)}h stream at ${formatPct(talkRatio)} talk ratio`,
      ];

  const extras = isRu
    ? [
        "Desktop companion app (локальные интеграции)",
        "TikTok Live + OBS WebSocket интеграции",
        "BYOK поддержка для совместимых провайдеров",
      ]
    : [
        "Desktop companion app (local integrations)",
        "TikTok Live + OBS WebSocket integrations",
        "BYOK support for compatible providers",
      ];

  return [...base, ...extras];
}

export default function PricingPageClient(props: { locale?: string }) {
  const router = useRouter();
  const isRu = props.locale === "ru";
  const [billing, setBilling] = useState<PricingInterval>("yearly");
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
            {isRu ? "Ежемесячно" : "Monthly"}
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
            {isRu ? "Ежегодно" : "Yearly"}
          </button>
        </div>
        <p className="text-xs text-white/60">
          {isRu
            ? `Оплата раз в год. Экономия до ${PRICING_YEARLY_DISCOUNT_PCT}%.`
            : `Billed yearly. Save up to ${PRICING_YEARLY_DISCOUNT_PCT}%.`}
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
                  <p className="text-2xl font-semibold text-white">
                    {isRu ? "Связаться с sales" : "Contact sales"}
                  </p>
                ) : billing === "monthly" && monthlyPrice !== null ? (
                  <p className="text-2xl font-semibold text-white">
                    {formatEur(monthlyPrice)} / {isRu ? "мес" : "month"}
                  </p>
                ) : yearlyMonthlyEquivalent !== null && yearlyTotal !== null ? (
                  <div className="space-y-1">
                    <p className="text-2xl font-semibold text-white">
                      {formatEur(yearlyMonthlyEquivalent)} / {isRu ? "мес" : "month"}
                      <span className="ml-2 text-sm font-normal text-white/70">
                        {isRu ? "оплата раз в год" : "billed yearly"}
                      </span>
                    </p>
                    <p className="text-xs text-white/60">
                      {isRu
                        ? `оплата раз в год ${formatEur(yearlyTotal)}`
                        : `billed yearly ${formatEur(yearlyTotal)}`}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {isRu ? "Что включено" : "What’s included"}
                  <InfoTip
                    label={isRu ? "Что считается Active Speech" : "What counts as Active Speech"}
                    text={
                      isRu
                        ? "Active Speech — это время, когда AI реально говорит. Тишина/ожидание не считаются."
                        : "Active Speech is the time the AI is actually speaking. Silence/idle time doesn’t count."
                    }
                  />
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {whatsIncluded({ plan, talkRatio, isRu }).map((line) => (
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
                    {isRu ? "Связаться с sales" : "Contact sales"}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => startCheckout(plan.id)}
                    disabled={loadingPlanId === plan.id}
                  >
                    {loadingPlanId === plan.id
                      ? isRu
                        ? "Переходим..."
                        : "Redirecting..."
                      : isRu
                        ? "Подписаться"
                        : "Subscribe"}
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
            {isRu ? "Сравнение тарифов" : "Compare plans"}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {isRu
              ? "Часы стрима — оценка. Реальная тарификация идёт по Active Speech."
              : "Stream hours are estimates. We always meter real usage by Active Speech."}
          </p>
        </div>
        <PricingComparisonTable plans={plans} talkRatio={talkRatio} />
      </div>

      <div className="space-y-4 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            {isRu ? "FAQ по тарифам" : "Pricing FAQ"}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {isRu ? "Коротко и по делу — про usage и лимиты." : "Common questions, answered."}
          </p>
        </div>
        <PricingFAQ
          items={[
            {
              q: isRu ? "Что такое Active Speech?" : "What is Active Speech?",
              a: isRu
                ? "Active Speech — это время, когда AI реально говорит в эфире. Тишина и простой не считаются."
                : "Active Speech is the time the AI is actually speaking on stream. Silence and idle time don’t count.",
            },
            {
              q: isRu
                ? "Чем отличаются included providers и BYOK?"
                : "What’s the difference between included providers and BYOK?",
              a: isRu
                ? "Included providers покрываются в рамках квоты Active Speech. В режиме BYOK вы используете свои ключи и оплачиваете провайдера напрямую; RoxStreamAI при этом отслеживает Active Speech для лимитов."
                : "Included providers are covered up to your plan’s Active Speech quota. With BYOK, you bring your own provider keys and you pay that provider directly; RoxStreamAI still tracks Active Speech for your limits.",
            },
            {
              q: isRu
                ? "Почему вы показываете оценку часов стрима?"
                : "Why do you show estimated stream hours?",
              a: isRu
                ? "Часы стрима зависят от того, насколько «разговорный» ваш формат. Слайдер talk ratio переводит Active Speech в реалистичную оценку часов стрима."
                : "Stream hours depend on how talk-heavy your stream is. The talk ratio slider helps you translate Active Speech into a realistic stream-hour estimate.",
            },
            {
              q: isRu ? "Можно сменить тариф позже?" : "Can I change plans later?",
              a: isRu
                ? "Да. Апгрейд — в любой момент. Даунгрейд применяется со следующего периода."
                : "Yes. You can upgrade at any time. Downgrades take effect on the next billing cycle.",
            },
            {
              q: isRu ? "Есть годовая оплата?" : "Do you offer yearly billing?",
              a: isRu
                ? `Да. Годовая оплата экономит до ${PRICING_YEARLY_DISCOUNT_PCT}% по сравнению с ежемесячной.`
                : `Yes. Yearly billing saves up to ${PRICING_YEARLY_DISCOUNT_PCT}% compared to monthly.`,
            },
            {
              q: isRu
                ? "Нужны больше лимиты или инвойсинг?"
                : "Need higher limits or invoicing?",
              a: isRu
                ? "Выберите Enterprise: кастомные лимиты, онбординг и поддержка инвойсинга."
                : "Choose Enterprise to get custom limits, onboarding, and invoicing support.",
            },
          ]}
        />
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-white">
          {isRu ? "Как считается usage" : "How usage works"}
        </h2>
        <p className="mt-3 text-sm text-white/70">
          {isRu
            ? "Active Speech — это время, когда AI реально говорит в эфире. Дашборд переводит настройки в оценку часов стрима на основе talk ratio. Если вы используете built-in провайдеров, расходы покрываются в рамках квоты тарифа. Если вы используете BYOK, вы оплачиваете провайдера напрямую, а RoxStreamAI отслеживает Active Speech для лимитов."
            : "Active Speech is the time the AI actually talks on stream. The dashboard converts your settings into estimated stream hours based on your talk ratio. If you use built-in providers, RoxStreamAI covers provider costs up to your plan quota. If you use BYOK, you pay the provider directly and RoxStreamAI tracks usage."}
        </p>
      </div>
    </div>
  );
}

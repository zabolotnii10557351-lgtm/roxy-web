"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import type { Locale } from "@/i18n/locales";
import type { PlanCardContent } from "@/i18n/content";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type ComparisonRow = { label: string; values: string[] };

interface PricingPlansProps {
  locale: Locale;
  planCards: PlanCardContent[];
  comparisonTitle: string;
  comparisonHeaders: string[];
  comparisonRows: ComparisonRow[];
}

const billingLabels: Record<Locale, {
  monthly: string;
  yearly: string;
  perMonth: string;
  perYear: string;
  note: string;
  billedAnnually: string;
}> = {
  en: {
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/ month",
    perYear: "/ year",
    note: "Save 20% with annual billing",
    billedAnnually: "Billed annually",
  },
  de: {
    monthly: "Monatlich",
    yearly: "Jährlich",
    perMonth: "/ Monat",
    perYear: "/ Jahr",
    note: "20% sparen bei jährlicher Zahlung",
    billedAnnually: "Jährliche Abrechnung",
  },
  es: {
    monthly: "Mensual",
    yearly: "Anual",
    perMonth: "/ mes",
    perYear: "/ año",
    note: "Ahorra 20% con facturación anual",
    billedAnnually: "Facturado anualmente",
  },
  fr: {
    monthly: "Mensuel",
    yearly: "Annuel",
    perMonth: "/ mois",
    perYear: "/ an",
    note: "Économisez 20% avec la facturation annuelle",
    billedAnnually: "Facturé annuellement",
  },
  it: {
    monthly: "Mensile",
    yearly: "Annua",
    perMonth: "/ mese",
    perYear: "/ anno",
    note: "Risparmia il 20% con fatturazione annuale",
    billedAnnually: "Fatturato annualmente",
  },
  pt: {
    monthly: "Mensal",
    yearly: "Anual",
    perMonth: "/ mês",
    perYear: "/ ano",
    note: "Economize 20% com cobrança anual",
    billedAnnually: "Cobrado anualmente",
  },
  ru: {
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    perMonth: "/ месяц",
    perYear: "/ год",
    note: "Сэкономьте 20% при оплате за год",
    billedAnnually: "Оплата раз в год",
  },
  tr: {
    monthly: "Aylık",
    yearly: "Yıllık",
    perMonth: "/ ay",
    perYear: "/ yıl",
    note: "Yıllık ödeme ile %20 tasarruf",
    billedAnnually: "Yıllık faturalandırma",
  },
  ja: {
    monthly: "月払い",
    yearly: "年払い",
    perMonth: "/ 月",
    perYear: "/ 年",
    note: "年払いで20%お得",
    billedAnnually: "年額請求",
  },
  zh: {
    monthly: "按月",
    yearly: "按年",
    perMonth: "/月",
    perYear: "/年",
    note: "年付可省 20%",
    billedAnnually: "按年计费",
  },
  uk: {
    monthly: "Щомісяця",
    yearly: "Щороку",
    perMonth: "/ місяць",
    perYear: "/ рік",
    note: "Заощаджуйте 20% при річній оплаті",
    billedAnnually: "Оплата раз на рік",
  },
};

const monthlyPrices: Record<PlanCardContent["id"], number> = {
  trial: 0,
  basic: 19,
  pro: 59,
  studio: 199,
};

const yearlyMultiplier = 10;

export default function PricingPlans({
  locale,
  planCards,
  comparisonTitle,
  comparisonHeaders,
  comparisonRows,
}: PricingPlansProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const labels = billingLabels[locale] ?? billingLabels.en;

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const formatPrice = (planId: PlanCardContent["id"]) => {
    const base = monthlyPrices[planId];
    if (planId === "trial") {
      return formatter.format(0);
    }
    const value = billing === "monthly" ? base : base * yearlyMultiplier;
    const suffix = billing === "monthly" ? labels.perMonth : labels.perYear;
    return `${formatter.format(value)} ${suffix}`;
  };

  const startCheckout = async (planId: PlanCardContent["id"]) => {
    if (planId === "trial") {
      router.push("/register");
      return;
    }

    setError(null);
    setLoadingPlan(planId);

    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      router.push("/login");
      return;
    }

    const response = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: accessToken,
        kind: "plan",
        plan: planId,
        interval: billing,
      }),
    });

    const json = await response.json();
    if (!response.ok || !json?.url) {
      setError(json?.error ?? "Checkout failed");
      setLoadingPlan(null);
      return;
    }

    window.location.href = json.url;
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
            {labels.monthly}
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
            {labels.yearly}
          </button>
        </div>
        <p className="text-xs text-white/60">{labels.note}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {planCards.map((plan) => (
          <div key={plan.id} className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              {plan.badge ? <Badge>{plan.badge}</Badge> : null}
            </div>
            <p className="mt-2 text-sm text-white/60">{plan.description}</p>
            <p className="mt-6 text-2xl font-semibold text-white">
              {formatPrice(plan.id)}
            </p>
            <p className="mt-1 text-xs text-white/60">
              {billing === "yearly" && plan.id !== "trial"
                ? labels.billedAnnually
                : plan.includedHours}
            </p>
            <ul className="mt-6 space-y-2 text-xs text-white/70">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              onClick={() => startCheckout(plan.id)}
              disabled={loadingPlan === plan.id}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {error ? (
        <p className="text-xs text-rose-200">{error}</p>
      ) : null}

      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-xl font-semibold text-white">{comparisonTitle}</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-white/60">
                {comparisonHeaders.map((header) => (
                  <th key={header} className="py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-white/5">
                  <td className="py-3 text-white/70">{row.label}</td>
                  {row.values.map((value, index) => (
                    <td key={index} className="py-3 text-white">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

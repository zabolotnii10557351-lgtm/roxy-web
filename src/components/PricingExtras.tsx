"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface PricingExtrasProps {
  extraCreditsTitle: string;
  extraCreditsSubtitle: string;
  extraCredits: Array<{ label: string; price: string }>;
  addonTitle: string;
  addonBadge: string;
  addonDescription: string;
  addonPrices: Array<{ label: string; price: string }>;
  addonCta: string;
}

export default function PricingExtras({
  extraCreditsTitle,
  extraCreditsSubtitle,
  extraCredits,
  addonTitle,
  addonBadge,
  addonDescription,
  addonPrices,
  addonCta,
}: PricingExtrasProps) {
  const router = useRouter();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async (payload: Record<string, string>) => {
    setError(null);
    setLoadingKey(JSON.stringify(payload));

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
      body: JSON.stringify({ access_token: accessToken, ...payload }),
    });

    const json = await response.json();
    if (!response.ok || !json?.url) {
      setError(json?.error ?? "Checkout failed");
      setLoadingKey(null);
      return;
    }

    window.location.href = json.url;
  };

  const creditPacks = ["h10", "h50", "h200"] as const;
  const addonIntervals = ["monthly", "lifetime"] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-xl font-semibold text-white">{extraCreditsTitle}</h3>
        <p className="mt-2 text-sm text-white/60">{extraCreditsSubtitle}</p>
        <div className="mt-6 space-y-3 text-sm text-white/70">
          {extraCredits.map((item, index) => {
            const pack = creditPacks[index];
            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
              >
                <div>
                  <span className="block text-white">{item.label}</span>
                  <span className="text-white/60">{item.price}</span>
                </div>
                <Button
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() => startCheckout({ kind: "credits", pack })}
                  disabled={loadingKey === JSON.stringify({ kind: "credits", pack })}
                >
                  Buy
                </Button>
              </div>
            );
          })}
        </div>
        {error ? (
          <p className="mt-4 text-xs text-rose-200">{error}</p>
        ) : null}
      </div>
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{addonTitle}</h3>
          <Badge>{addonBadge}</Badge>
        </div>
        <p className="mt-2 text-sm text-white/60">{addonDescription}</p>
        <div className="mt-6 space-y-3 text-sm text-white/70">
          {addonPrices.map((item, index) => {
            const interval = addonIntervals[index];
            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
              >
                <div>
                  <span className="block text-white">{item.label}</span>
                  <span className="text-white/60">{item.price}</span>
                </div>
                <Button
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() => startCheckout({ kind: "unreal", interval })}
                  disabled={
                    loadingKey === JSON.stringify({ kind: "unreal", interval })
                  }
                >
                  {addonCta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

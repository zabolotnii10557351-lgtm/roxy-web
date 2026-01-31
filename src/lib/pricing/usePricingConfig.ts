"use client";

import { useEffect, useState } from "react";
import { PricingConfigSchema, type PricingConfig } from "@/lib/pricing/config";
import { getDefaultPricingConfig } from "@/lib/pricing/config";

type State =
  | { status: "loading"; config: PricingConfig | null; source?: string }
  | { status: "ready"; config: PricingConfig; source?: string }
  | { status: "error"; config: PricingConfig; error: string; source?: string };

export function usePricingConfig(): State {
  const [state, setState] = useState<State>({ status: "loading", config: null });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch("/api/pricing", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const json = (await res.json()) as { config: unknown; source?: string };
        const parsed = PricingConfigSchema.safeParse(json.config);

        if (!parsed.success) {
          throw new Error("Invalid pricing config received");
        }

        if (!cancelled) {
          setState({ status: "ready", config: parsed.data, source: json.source });
        }
      } catch (e) {
        const fallback = { version: 1, ...getDefaultPricingConfig() };
        if (!cancelled) {
          setState({
            status: "error",
            config: fallback,
            error: e instanceof Error ? e.message : "Failed to load pricing",
          });
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading" && state.config === null) {
    return state;
  }

  return state;
}

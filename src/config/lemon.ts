export type LemonBillingInterval = "month" | "year";

export type BillingPlanId =
  | "starter"
  | "creator"
  | "pro"
  | "studio"
  | "scale"
  | "enterprise";

export type AddonPackId = "as_2h" | "as_10h" | "as_25h";

export type LemonVariantMapping = {
  variantId: string;
  planId: BillingPlanId;
  interval: LemonBillingInterval;
  isYearly: boolean;
};

export type LemonAddonMapping = {
  variantId: string;
  packId: AddonPackId;
  amountSeconds: number;
  priceEur: number;
};

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

// Plan variant IDs must be configured from LemonSqueezy.
export function getPlanVariantMapping(planId: BillingPlanId, interval: LemonBillingInterval): LemonVariantMapping {
  const key = `LEMON_VARIANT_${planId.toUpperCase()}_${interval.toUpperCase()}`;
  const variantId = requiredEnv(key);

  return {
    variantId,
    planId,
    interval,
    isYearly: interval === "year",
  };
}

export function mapVariantIdToPlan(variantId: string): LemonVariantMapping | null {
  const env = process.env;

  const pairs: Array<{ planId: BillingPlanId; interval: LemonBillingInterval; envKey: string }> = [
    { planId: "starter", interval: "month", envKey: "LEMON_VARIANT_STARTER_MONTH" },
    { planId: "starter", interval: "year", envKey: "LEMON_VARIANT_STARTER_YEAR" },
    { planId: "creator", interval: "month", envKey: "LEMON_VARIANT_CREATOR_MONTH" },
    { planId: "creator", interval: "year", envKey: "LEMON_VARIANT_CREATOR_YEAR" },
    { planId: "pro", interval: "month", envKey: "LEMON_VARIANT_PRO_MONTH" },
    { planId: "pro", interval: "year", envKey: "LEMON_VARIANT_PRO_YEAR" },
    { planId: "studio", interval: "month", envKey: "LEMON_VARIANT_STUDIO_MONTH" },
    { planId: "studio", interval: "year", envKey: "LEMON_VARIANT_STUDIO_YEAR" },
    { planId: "scale", interval: "month", envKey: "LEMON_VARIANT_SCALE_MONTH" },
    { planId: "scale", interval: "year", envKey: "LEMON_VARIANT_SCALE_YEAR" },
  ];

  for (const p of pairs) {
    const id = env[p.envKey];
    if (id && id === variantId) {
      return {
        variantId,
        planId: p.planId,
        interval: p.interval,
        isYearly: p.interval === "year",
      };
    }
  }

  return null;
}

export function getAddonPackMapping(packId: AddonPackId): LemonAddonMapping {
  // Prices per spec. Actual Lemon prices must match.
  if (packId === "as_2h") {
    return {
      packId,
      variantId: requiredEnv("LEMON_ADDON_AS_2H_VARIANT"),
      amountSeconds: 2 * 3600,
      priceEur: 19,
    };
  }
  if (packId === "as_10h") {
    return {
      packId,
      variantId: requiredEnv("LEMON_ADDON_AS_10H_VARIANT"),
      amountSeconds: 10 * 3600,
      priceEur: 79,
    };
  }
  if (packId === "as_25h") {
    return {
      packId,
      variantId: requiredEnv("LEMON_ADDON_AS_25H_VARIANT"),
      amountSeconds: 25 * 3600,
      priceEur: 169,
    };
  }

  const exhaustive: never = packId;
  throw new Error(`Unsupported packId: ${exhaustive}`);
}

export function mapVariantIdToAddon(variantId: string): LemonAddonMapping | null {
  const candidates: Array<{ envKey: string; packId: AddonPackId; amountSeconds: number; priceEur: number }> = [
    { envKey: "LEMON_ADDON_AS_2H_VARIANT", packId: "as_2h", amountSeconds: 2 * 3600, priceEur: 19 },
    { envKey: "LEMON_ADDON_AS_10H_VARIANT", packId: "as_10h", amountSeconds: 10 * 3600, priceEur: 79 },
    { envKey: "LEMON_ADDON_AS_25H_VARIANT", packId: "as_25h", amountSeconds: 25 * 3600, priceEur: 169 },
  ];

  for (const c of candidates) {
    const id = process.env[c.envKey];
    if (id && id === variantId) {
      return {
        variantId,
        packId: c.packId,
        amountSeconds: c.amountSeconds,
        priceEur: c.priceEur,
      };
    }
  }

  return null;
}

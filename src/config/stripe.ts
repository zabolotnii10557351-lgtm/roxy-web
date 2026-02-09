import type { PricingPlanId } from "@/config/pricingPlans";

export type StripeBillingInterval = "month" | "year";

const DEFAULT_PRODUCT_IDS: Record<Exclude<PricingPlanId, "enterprise">, string> = {
  starter: "prod_TvdHlqGULAHGbB",
  creator: "prod_TwQuv6Y4IsQAC5",
  pro: "prod_TwQvRO0ffKwMyI",
  studio: "prod_TwQwJmZSUF1I16",
  scale: "prod_TwQx23QIXA6pnh",
};

const ENV_PRODUCT_KEYS: Record<Exclude<PricingPlanId, "enterprise">, string> = {
  starter: "STRIPE_PRODUCT_STARTER",
  creator: "STRIPE_PRODUCT_CREATOR",
  pro: "STRIPE_PRODUCT_PRO",
  studio: "STRIPE_PRODUCT_STUDIO",
  scale: "STRIPE_PRODUCT_SCALE",
};

export function getStripeProductId(planId: PricingPlanId): string | null {
  if (planId === "enterprise") return null;
  const envKey = ENV_PRODUCT_KEYS[planId];
  const envValue = process.env[envKey];
  return envValue && envValue.length > 0 ? envValue : DEFAULT_PRODUCT_IDS[planId];
}

export function mapStripeProductIdToPlan(productId: string): PricingPlanId | null {
  const pairs = Object.entries(DEFAULT_PRODUCT_IDS) as Array<
    [Exclude<PricingPlanId, "enterprise">, string]
  >;

  for (const [planId, defaultId] of pairs) {
    const envKey = ENV_PRODUCT_KEYS[planId];
    const envId = process.env[envKey];
    if ((envId && envId === productId) || defaultId === productId) {
      return planId;
    }
  }

  return null;
}

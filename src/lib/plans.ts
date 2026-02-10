import { PRICING_PLANS, type PricingPlanId } from "@/config/pricingPlans";

export type PlanId = "trial" | "basic" | "pro" | "studio" | "scale" | "enterprise";

export const planRank: Record<PlanId, number> = {
  trial: 0,
  basic: 1,
  pro: 2,
  studio: 3,
  scale: 4,
  enterprise: 5,
};

export const isPlanAtLeast = (current: PlanId, target: PlanId) =>
  planRank[current] >= planRank[target];

function mapPlanIdToPricingPlanId(planId: PlanId): PricingPlanId {
  if (planId === "trial") return "starter";
  if (planId === "basic") return "creator";
  if (planId === "pro") return "pro";
  if (planId === "studio") return "studio";
  if (planId === "scale") return "scale";
  if (planId === "enterprise") return "enterprise";
  return "starter";
}

export function getPlanHours(planId: PlanId) {
  const pricingPlanId = mapPlanIdToPricingPlanId(planId);
  const plan = PRICING_PLANS.find((item) => item.id === pricingPlanId);
  const included = plan?.entitlements?.included_active_speech_hours_openai ?? null;
  return included ?? null;
}

export type PlanId = "trial" | "basic" | "pro" | "studio";

export const planRank: Record<PlanId, number> = {
  trial: 0,
  basic: 1,
  pro: 2,
  studio: 3,
};

export const isPlanAtLeast = (current: PlanId, target: PlanId) =>
  planRank[current] >= planRank[target];

export const planHours: Record<PlanId, number | null> = {
  trial: 1,
  basic: null,
  pro: 10,
  studio: 40,
};

export function getPlanHours(planId: PlanId) {
  return planHours[planId];
}

import { create } from "zustand";

export type PlanId = "trial" | "basic" | "pro" | "studio";

interface PlanState {
  currentPlan: PlanId;
  setPlan: (plan: PlanId) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  currentPlan: "pro",
  setPlan: (plan) => set({ currentPlan: plan }),
}));

export const planRank: Record<PlanId, number> = {
  trial: 0,
  basic: 1,
  pro: 2,
  studio: 3,
};

export const isPlanAtLeast = (current: PlanId, target: PlanId) =>
  planRank[current] >= planRank[target];

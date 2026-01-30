"use client";

import { createContext, useContext, useMemo } from "react";
import { getPlanHours, type PlanId } from "@/lib/plans";

export interface PlanProfile {
  planId: PlanId;
  trialEndsAt?: string | null;
  planExpiresAt?: string | null;
  activeHoursUsed?: number | null;
}

export interface PlanContextValue {
  planId: PlanId;
  trialEndsAt?: Date | null;
  planExpiresAt?: Date | null;
  activeHoursUsed: number;
  hoursLimit: number | null;
  hoursRemaining: number | null;
  isTrial: boolean;
  isTrialExpired: boolean;
  isOverLimit: boolean;
  isAccessBlocked: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function toDate(value?: string | null) {
  return value ? new Date(value) : null;
}

export function PlanProvider({
  profile,
  children,
}: {
  profile: PlanProfile;
  children: React.ReactNode;
}) {
  const value = useMemo<PlanContextValue>(() => {
    const planId = profile.planId;
    const trialEndsAt = toDate(profile.trialEndsAt);
    const planExpiresAt = toDate(profile.planExpiresAt);
    const activeHoursUsed = profile.activeHoursUsed ?? 0;
    const hoursLimit = getPlanHours(planId);
    const hoursRemaining =
      hoursLimit === null ? null : Math.max(0, hoursLimit - activeHoursUsed);
    const isTrial = planId === "trial";
    const now = new Date();
    const isTrialExpired = Boolean(isTrial && trialEndsAt && trialEndsAt < now);
    const isOverLimit = Boolean(hoursLimit !== null && hoursRemaining !== null && hoursRemaining <= 0);
    const isAccessBlocked = isTrialExpired || isOverLimit;

    return {
      planId,
      trialEndsAt,
      planExpiresAt,
      activeHoursUsed,
      hoursLimit,
      hoursRemaining,
      isTrial,
      isTrialExpired,
      isOverLimit,
      isAccessBlocked,
    };
  }, [profile]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within PlanProvider");
  }
  return context;
}

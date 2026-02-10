export type PricingInterval = "monthly" | "yearly";

export type PricingPlanId =
  | "starter"
  | "creator"
  | "pro"
  | "studio"
  | "scale"
  | "enterprise";

export interface PlanEntitlements {
  trial_days?: number;
  max_characters: number;
  max_concurrent_streams: number;
  max_accounts_linked: number;
  scheduler_enabled: boolean;
  dono_rules_limit: number;
  stream_scripts_limit: number;
  scenes_limit: number;
  included_active_speech_hours_openai: number;
  allow_voice_openai_included: boolean;
  allow_byok_elevenlabs: boolean;
  watermark_branding: boolean;
}

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  monthly_price_eur: number | null;
  entitlements: PlanEntitlements | null;
  marketing?: {
    badge?: string;
    blurb?: string;
  };
}

export const PRICING_YEARLY_DISCOUNT_PCT = 20;

export const PRICING_DEFAULT_TALK_RATIO = 0.2;
export const PRICING_MIN_TALK_RATIO = 0.1;
export const PRICING_MAX_TALK_RATIO = 0.5;

export const PRICING_TOOLTIP_TEXT =
  "Stream hours are an estimate based on your talk ratio. We meter real usage by active speech duration. At 20% talk ratio, 1h active speech is about 5h stream.";

export function calcYearlyTotal(monthlyPrice: number): number {
  return monthlyPrice * 12 * (1 - PRICING_YEARLY_DISCOUNT_PCT / 100);
}

export function calcYearlyMonthlyEquivalent(monthlyPrice: number): number {
  return calcYearlyTotal(monthlyPrice) / 12;
}

export function calcEstimatedStreamHours(
  activeSpeechHours: number,
  talkRatio: number
): number {
  if (!Number.isFinite(activeSpeechHours) || activeSpeechHours < 0) {
    return 0;
  }
  if (!Number.isFinite(talkRatio) || talkRatio <= 0) {
    return 0;
  }
  return activeSpeechHours / talkRatio;
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly_price_eur: 9.99,
    marketing: {
      badge: "7-day trial",
      blurb: "One character plus core scenes and basic triggers.",
    },
    entitlements: {
      trial_days: 7,
      max_characters: 1,
      max_concurrent_streams: 1,
      max_accounts_linked: 1,
      scheduler_enabled: false,
      dono_rules_limit: 10,
      stream_scripts_limit: 5,
      scenes_limit: 1,
      included_active_speech_hours_openai: 0.5,
      allow_voice_openai_included: true,
      allow_byok_elevenlabs: true,
      watermark_branding: true,
    },
  },
  {
    id: "creator",
    name: "Creator",
    monthly_price_eur: 19.99,
    marketing: {
      blurb: "More characters, more scenes, higher trigger throughput.",
    },
    entitlements: {
      max_characters: 3,
      max_concurrent_streams: 2,
      max_accounts_linked: 2,
      scheduler_enabled: false,
      dono_rules_limit: 30,
      stream_scripts_limit: 20,
      scenes_limit: 3,
      included_active_speech_hours_openai: 2,
      allow_voice_openai_included: true,
      allow_byok_elevenlabs: true,
      watermark_branding: true,
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthly_price_eur: 59.99,
    marketing: {
      badge: "Best value",
      blurb: "More concurrency, watermark control, automation-ready.",
    },
    entitlements: {
      max_characters: 10,
      max_concurrent_streams: 3,
      max_accounts_linked: 5,
      scheduler_enabled: true,
      dono_rules_limit: 200,
      stream_scripts_limit: 100,
      scenes_limit: 10,
      included_active_speech_hours_openai: 6,
      allow_voice_openai_included: true,
      allow_byok_elevenlabs: true,
      watermark_branding: false,
    },
  },
  {
    id: "studio",
    name: "Studio",
    monthly_price_eur: 149.99,
    marketing: {
      blurb: "Team-ready limits, higher quotas for interactive formats.",
    },
    entitlements: {
      max_characters: 25,
      max_concurrent_streams: 5,
      max_accounts_linked: 10,
      scheduler_enabled: true,
      dono_rules_limit: 1000,
      stream_scripts_limit: 500,
      scenes_limit: 25,
      included_active_speech_hours_openai: 20,
      allow_voice_openai_included: true,
      allow_byok_elevenlabs: true,
      watermark_branding: false,
    },
  },
  {
    id: "scale",
    name: "Scale",
    monthly_price_eur: 299.99,
    marketing: {
      blurb: "Multi-account and always-on operations.",
    },
    entitlements: {
      max_characters: 50,
      max_concurrent_streams: 10,
      max_accounts_linked: 25,
      scheduler_enabled: true,
      dono_rules_limit: 5000,
      stream_scripts_limit: 2000,
      scenes_limit: 50,
      included_active_speech_hours_openai: 50,
      allow_voice_openai_included: true,
      allow_byok_elevenlabs: true,
      watermark_branding: false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly_price_eur: null,
    entitlements: null,
    marketing: {
      blurb: "Custom limits, invoicing, onboarding.",
    },
  },
];

export function getPricingPlan(planId: PricingPlanId): PricingPlan {
  const found = PRICING_PLANS.find((plan) => plan.id === planId);
  if (!found) {
    return PRICING_PLANS[0];
  }
  return found;
}

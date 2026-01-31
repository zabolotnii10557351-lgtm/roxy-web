import { z } from "zod";
import type { PricingPlan } from "@/config/pricing";
import {
  PRICING_DEFAULT_TALK_RATIO,
  PRICING_MAX_TALK_RATIO,
  PRICING_MIN_TALK_RATIO,
  PRICING_PLANS,
  PRICING_TOOLTIP_TEXT,
} from "@/config/pricing";

export const PlanEntitlementsSchema = z
  .object({
    trial_days: z.number().int().positive().optional(),
    max_characters: z.number().int().nonnegative(),
    max_concurrent_streams: z.number().int().nonnegative(),
    max_accounts_linked: z.number().int().nonnegative(),
    scheduler_enabled: z.boolean(),
    dono_rules_limit: z.number().int().nonnegative(),
    stream_scripts_limit: z.number().int().nonnegative(),
    scenes_limit: z.number().int().nonnegative(),
    included_active_speech_hours_openai: z.number().nonnegative(),
    allow_voice_openai_included: z.boolean(),
    allow_byok_elevenlabs: z.boolean(),
    watermark_branding: z.boolean(),
  })
  .strict();

export const PricingPlanSchema = z
  .object({
    id: z.enum([
      "starter",
      "creator",
      "pro",
      "studio",
      "scale",
      "enterprise",
    ]),
    name: z.string().min(1),
    monthly_price_eur: z.number().nonnegative().nullable(),
    entitlements: PlanEntitlementsSchema.nullable(),
  })
  .strict();

export const PricingConfigSchema = z
  .object({
    version: z.number().int().positive(),
    yearly_discount_pct: z.number().min(0).max(100),
    tooltip_text: z.string().min(1),
    default_talk_ratio: z.number().min(0).max(1),
    min_talk_ratio: z.number().min(0).max(1),
    max_talk_ratio: z.number().min(0).max(1),
    plans: z.array(PricingPlanSchema).min(1),
  })
  .strict();

export type PricingConfig = z.infer<typeof PricingConfigSchema>;

export function getDefaultPricingConfig(): Omit<PricingConfig, "version"> {
  return {
    yearly_discount_pct: 20,
    tooltip_text: PRICING_TOOLTIP_TEXT,
    default_talk_ratio: PRICING_DEFAULT_TALK_RATIO,
    min_talk_ratio: PRICING_MIN_TALK_RATIO,
    max_talk_ratio: PRICING_MAX_TALK_RATIO,
    plans: PRICING_PLANS.map((plan) => ({
      id: plan.id,
      name: plan.name,
      monthly_price_eur: plan.monthly_price_eur,
      entitlements: plan.entitlements,
    })),
  };
}

export function normalizePricingPlans(plans: PricingPlan[]): PricingPlan[] {
  const order = new Map(PRICING_PLANS.map((plan, index) => [plan.id, index]));
  return [...plans].sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999));
}

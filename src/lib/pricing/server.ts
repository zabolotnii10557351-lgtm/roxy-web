import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/auth";
import { getDefaultPricingConfig, PricingConfigSchema, type PricingConfig } from "@/lib/pricing/config";

export type PricingPlanId =
  | "starter"
  | "creator"
  | "pro"
  | "studio"
  | "scale"
  | "enterprise";

export function mapBackendPlanToPricingPlan(planId: string): PricingPlanId {
  if (planId === "trial") return "starter";
  if (planId === "basic") return "creator";
  if (planId === "pro") return "pro";
  if (planId === "studio") return "studio";
  if (planId === "scale") return "scale";
  if (planId === "enterprise") return "enterprise";
  return "starter";
}

export async function getActivePricingConfigServer(): Promise<PricingConfig> {
  const adminClient = createSupabaseAdminClient();

  if (adminClient) {
    const { data, error } = await adminClient
      .from("pricing_config")
      .select("version, is_active, json")
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.json) {
      const parsed = PricingConfigSchema.safeParse({
        version: data.version,
        ...(data.json as object),
      });

      if (parsed.success) {
        return parsed.data;
      }
    }
  }

  return { version: 1, ...getDefaultPricingConfig() };
}

export async function getPlanEntitlementsForPlanId(planId: string) {
  const config = await getActivePricingConfigServer();
  const pricingPlanId = mapBackendPlanToPricingPlan(planId);
  const plan = config.plans.find((p) => p.id === pricingPlanId) ?? config.plans[0];
  return plan?.entitlements ?? null;
}

export async function getUserPlanEntitlements(params: {
  supabase: SupabaseClient;
  userId: string;
}) {
  const { data, error } = await params.supabase
    .from("profiles")
    .select("plan_id")
    .eq("id", params.userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const planId = data?.plan_id ?? "trial";
  const entitlements = await getPlanEntitlementsForPlanId(planId);
  return { planId, entitlements };
}

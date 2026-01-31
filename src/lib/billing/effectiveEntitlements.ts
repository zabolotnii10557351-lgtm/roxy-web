import { ENTITLEMENTS } from "@/lib/billing/variants";
import { z } from "zod";

export type Entitlements = {
  flags: Record<string, boolean>;
  limits: Record<string, number>;
};

const EntitlementsSchema = z.object({
  flags: z.record(z.boolean()),
  limits: z.record(z.number()),
});

const ProfileSchema = z
  .object({
    trial_ends_at: z.string().nullable().optional(),
    status: z.string().optional(),
    entitlements: EntitlementsSchema.optional(),
    addons: z
      .object({
        unreal_connector: z.boolean().optional(),
      })
      .optional(),
  })
  .passthrough();

export function computeEffective(profile: unknown): Entitlements {
  const parsed = ProfileSchema.safeParse(profile);
  const p = parsed.success ? parsed.data : null;

  const now = new Date().getTime();
  const trialEnds = p?.trial_ends_at ? new Date(p.trial_ends_at).getTime() : 0;
  let base: Entitlements = (p?.entitlements ?? (ENTITLEMENTS.trial as unknown)) as Entitlements;

  if (p?.status === "trialing" && trialEnds && now > trialEnds) {
    base = ENTITLEMENTS.trial;
  }

  const out = structuredClone(base) as Entitlements;
  if (p?.addons?.unreal_connector) {
    out.flags.unreal_connector = true;
  }

  return out;
}

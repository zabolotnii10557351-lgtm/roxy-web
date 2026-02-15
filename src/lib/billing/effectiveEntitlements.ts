import { z } from "zod";

const ENTITLEMENTS = {
  trial: {
    flags: {
      export_import: false,
      watermark_toggle: false,
      auto_language: false,
      advanced_scripts: false,
      unreal_connector: false,
    },
    limits: {
      tiktok_accounts: 1,
      dono_rules: 10,
      scripts: 2,
      knowledge_items: 0,
      logs_days: 3,
    },
  },
  basic: {
    flags: {
      export_import: false,
      watermark_toggle: false,
      auto_language: false,
      advanced_scripts: false,
      unreal_connector: false,
    },
    limits: {
      tiktok_accounts: 1,
      dono_rules: 20,
      scripts: 3,
      knowledge_items: 3,
      logs_days: 7,
    },
  },
  pro: {
    flags: {
      export_import: true,
      watermark_toggle: true,
      auto_language: true,
      advanced_scripts: true,
      unreal_connector: false,
    },
    limits: {
      tiktok_accounts: 5,
      dono_rules: 200,
      scripts: 999,
      knowledge_items: 20,
      logs_days: 30,
    },
  },
  studio: {
    flags: {
      export_import: true,
      watermark_toggle: true,
      auto_language: true,
      advanced_scripts: true,
      unreal_connector: false,
    },
    limits: {
      tiktok_accounts: 20,
      dono_rules: 1000,
      scripts: 999,
      knowledge_items: 200,
      logs_days: 90,
    },
  },
} as const;

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

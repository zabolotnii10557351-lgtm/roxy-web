export const VARIANTS = {
  basic: { monthly: "1263099", yearly: "1263083" },
  pro: { monthly: "1263109", yearly: "1263108" },
  studio: { monthly: "1263113", yearly: "1263112" },
  extraCredits: {
    h10: "1263117",
    h50: "1263124",
    h200: "1263126",
  },
  unrealConnector: {
    monthly: "1263131",
    lifetime: "1263159",
  },
} as const;

export const CREDIT_PACK_MINUTES: Record<string, number> = {
  "1263117": 10 * 60,
  "1263124": 50 * 60,
  "1263126": 200 * 60,
};

export const ENTITLEMENTS = {
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

import { z } from "zod";

export const IdSchema = z.string().uuid();

export const CharacterConfigSchema = z.object({
  profile: z
    .object({
      displayName: z.string().default(""),
      bio: z.string().default(""),
      goals: z.string().default(""),
    })
    .default({ displayName: "", bio: "", goals: "" }),
  brain: z
    .object({
      provider: z.enum(["openai", "anthropic", "gemini", "deepseek"]).default("openai"),
      model: z.string().default("gpt-4o-mini"),
    })
    .default({ provider: "openai", model: "gpt-4o-mini" }),
  language: z
    .object({
      primary: z.string().default("en"),
    })
    .default({ primary: "en" }),
  dna: z
    .object({
      systemPrompt: z.string().default(""),
      behavior: z.string().default(""),
      style: z.string().default(""),
    })
    .default({ systemPrompt: "", behavior: "", style: "" }),
  voice: z
    .object({
      provider: z
        .enum(["openai_included", "elevenlabs_byok"])
        .default("openai_included"),
      voiceId: z.string().optional().default(""),
      style: z.record(z.any()).optional().default({}),
    })
    .default({ provider: "openai_included", voiceId: "", style: {} }),
  memory: z
    .object({
      enabled: z.boolean().default(true),
      rememberViewers: z.boolean().default(false),
      notes: z.string().default(""),
    })
    .default({ enabled: true, rememberViewers: false, notes: "" }),
  safety: z
    .object({
      rules: z.array(z.string()).default([]),
    })
    .default({ rules: [] }),
  streamBehavior: z
    .object({
      shortAnswers: z.boolean().default(true),
      maxResponseSeconds: z.number().int().min(1).max(60).default(8),
    })
    .default({ shortAnswers: true, maxResponseSeconds: 8 }),
});

export const CharacterRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  name: z.string(),
  config: CharacterConfigSchema.nullable().optional(),
  published: z.boolean().optional().default(false),
  created_at: z.string().optional(),
});

export const ConnectorRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  provider: z.enum(["tiktok"]),
  status: z.enum(["connected", "disconnected", "error"]),
  config: z.record(z.any()).optional().nullable(),
  created_at: z.string().optional(),
});

export const DonoRuleConfigSchema = z.object({
  trigger: z.object({
    type: z.literal("gift").default("gift"),
    giftId: z.string().default("rose"),
    minAmount: z.number().int().min(1).default(1),
  }),
  cooldownSeconds: z.number().int().min(0).default(10),
  reaction: z.object({
    text: z.string().default(""),
    emotionTag: z.string().default("neutral"),
    actions: z.array(z.record(z.any())).default([]),
  }),
  enabled: z.boolean().default(true),
});

export const DonoRuleRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  name: z.string(),
  config: DonoRuleConfigSchema.nullable().optional(),
  created_at: z.string().optional(),
});

export const StreamScriptConfigSchema = z.object({
  type: z.literal("interval").default("interval"),
  intervalSeconds: z.number().int().min(1).default(600),
  conditions: z.object({
    minChatMessagesLast5Min: z.number().int().min(0).default(10),
  }),
  message: z.object({
    text: z.string().default(""),
    emotionTag: z.string().default("neutral"),
  }),
  enabled: z.boolean().default(true),
});

export const StreamScriptRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  name: z.string(),
  config: StreamScriptConfigSchema.nullable().optional(),
  created_at: z.string().optional(),
});

export const SceneConfigSchema = z.object({
  resolution: z.string().default("1080p"),
  quality: z.string().default("medium"),
  cameraPreset: z.string().default("front"),
  lightingPreset: z.string().default("soft"),
  notes: z.string().default(""),
});

export const SceneRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  name: z.string(),
  config: SceneConfigSchema.nullable().optional(),
  created_at: z.string().optional(),
});

export const DeploySessionRowSchema = z.object({
  id: IdSchema,
  workspace_id: IdSchema,
  token: z.string(),
  status: z.enum(["ready", "stopped", "error"]),
  character_id: IdSchema.nullable().optional(),
  created_at: z.string().optional(),
});

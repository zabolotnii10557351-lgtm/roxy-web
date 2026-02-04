import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { logUsageEvent } from "@/server/ai/usage";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z
  .object({
    description: z.string().min(10),
    language: z.string().optional(),
    brainProvider: z.enum(["openai", "anthropic", "gemini", "deepseek"]).optional(),
    brainModel: z.string().optional(),
  })
  .strict();

const OutputSchema = z.object({
  persona: z.string().default(""),
  system_prompt: z.string().default(""),
  behavior_rules: z.string().default(""),
  style: z.string().default(""),
  safety_rules: z.array(z.string()).default([]),
  sample_lines: z.array(z.string()).default([]),
  stream_behavior: z
    .object({
      short_answers: z.boolean().default(true),
      max_response_seconds: z.number().int().min(1).max(60).default(8),
    })
    .default({ short_answers: true, max_response_seconds: 8 }),
  goals: z.string().default(""),
});

type OutputPayload = z.infer<typeof OutputSchema>;

function coerceBrainProviderId(value: unknown): BrainProviderId {
  return value === "openai" || value === "anthropic" || value === "gemini" || value === "deepseek"
    ? value
    : "openai";
}

function resolveBrainProviderKey(providerId: BrainProviderId, userOpenAiKey: string | null) {
  if (providerId === "openai") {
    return userOpenAiKey ?? process.env.OPENAI_API_KEY ?? null;
  }

  if (providerId === "anthropic") {
    return process.env.ANTHROPIC_API_KEY ?? null;
  }

  if (providerId === "gemini") {
    return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_AI_API_KEY ?? null;
  }

  return null;
}

function resolveBrainModel(providerId: BrainProviderId, storedModel: string | null) {
  const cleaned = storedModel?.trim() || null;

  if (providerId === "openai") {
    return cleaned ?? "gpt-4o-mini";
  }

  if (cleaned) {
    return cleaned;
  }

  if (providerId === "anthropic") {
    return process.env.ANTHROPIC_MODEL ?? "";
  }

  if (providerId === "gemini") {
    return process.env.GEMINI_MODEL ?? "";
  }

  return "";
}

function extractJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const slice = text.slice(start, end + 1);
  try {
    return JSON.parse(slice) as OutputPayload;
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT =
  "You generate character DNA for AI streamers. Return only valid JSON with the specified keys.";

function buildPrompt(params: { description: string; language: string }) {
  return [
    "Create a character DNA package based on the user description.",
    `Language: ${params.language}.`,
    "Return JSON ONLY with keys:",
    "persona, system_prompt, behavior_rules, style, safety_rules (array), sample_lines (array), stream_behavior { short_answers, max_response_seconds }, goals.",
    "Keep it concise and production-safe.",
    `Description: ${params.description}`,
  ].join("\n\n");
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:fast-dna:${user.id}`,
    limit: 10,
    windowMs: 60_000,
  });

  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait and retry." },
      { status: 429 },
    );
  }

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = BodySchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const language = parsed.data.language?.trim() || "English";
  const providerId = coerceBrainProviderId(parsed.data.brainProvider);
  const secrets = await getUserSecretsServerOnly(user.id);
  const apiKey = resolveBrainProviderKey(providerId, secrets.openaiApiKey ?? null);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brain provider key is not configured on the server." },
      { status: 400 },
    );
  }

  const modelId = resolveBrainModel(providerId, parsed.data.brainModel ?? null);
  if (!modelId) {
    return NextResponse.json(
      { error: "Brain provider model is not configured." },
      { status: 400 },
    );
  }

  try {
    const provider = getBrainProvider({ providerId, modelId, apiKey });
    const result = await provider.generateReply({
      system: SYSTEM_PROMPT,
      prompt: buildPrompt({
        description: parsed.data.description,
        language,
      }),
      language,
      maxTokens: 700,
      temperature: 0.7,
    });

    const totalTokens =
      result.usage?.totalTokens ??
      (result.usage?.inputTokens && result.usage?.outputTokens
        ? result.usage.inputTokens + result.usage.outputTokens
        : null);

    if (totalTokens) {
      const isBillable =
        providerId === "openai"
          ? secrets.openaiApiKey == null
          : providerId === "anthropic" || providerId === "gemini";

      await logUsageEvent({
        supabase,
        workspaceId,
        userId: user.id,
        provider: providerId,
        model: modelId,
        type: "brain_tokens",
        amount: totalTokens,
        unit: "tokens",
        isBillable,
      });
    }

    const parsedJson = extractJson(result.text);
    if (!parsedJson) {
      return NextResponse.json(
        { error: "Failed to parse Fast DNA output." },
        { status: 502 },
      );
    }

    const safe = OutputSchema.safeParse(parsedJson);
    if (!safe.success) {
      return NextResponse.json(
        { error: "Fast DNA output validation failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({ dna: safe.data });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 },
    );
  }
}

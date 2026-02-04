import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { logUsageEvent } from "@/server/ai/usage";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import { z } from "zod";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z.object({
  language: z.string().optional(),
});

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
  if (providerId === "openai") {
    return storedModel ?? "gpt-4o-mini";
  }

  if (storedModel && storedModel.trim().length > 0) {
    return storedModel;
  }

  if (providerId === "anthropic") {
    return process.env.ANTHROPIC_MODEL ?? "";
  }

  if (providerId === "gemini") {
    return process.env.GEMINI_MODEL ?? "";
  }

  return "";
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:test-brain:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });

  if (!rl.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait and retry." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - new Date().getTime()) / 1000)),
        },
      }
    );
  }

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = BodySchema.safeParse(json ?? {});
  const language = parsed.success ? parsed.data.language ?? "English" : "English";

  const { data: aiSettings } = await supabase
    .from("workspace_ai_settings")
    .select("brain_provider, brain_model")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  const secrets = await getUserSecretsServerOnly(user.id);

  try {
    const providerId = coerceBrainProviderId(aiSettings?.brain_provider);
    const apiKey = resolveBrainProviderKey(providerId, secrets.openaiApiKey ?? null);
    if (!apiKey) {
      return NextResponse.json(
        { error: "Brain provider key is not configured on the server." },
        { status: 400 }
      );
    }

    const modelId = resolveBrainModel(providerId, aiSettings?.brain_model ?? null);
    if (!modelId) {
      return NextResponse.json(
        { error: "Brain provider model is not configured." },
        { status: 400 }
      );
    }

    const provider = getBrainProvider({
      providerId,
      modelId,
      apiKey,
    });

    const result = await provider.generateReply({
      system: "You are a helpful assistant.",
      prompt: `Say hello in ${language} in one sentence.`,
      language,
      maxTokens: 80,
      temperature: 0.6,
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

    return NextResponse.json({ text: result.text });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 }
    );
  }
}

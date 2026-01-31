import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import { z } from "zod";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z.object({
  language: z.string().optional(),
});

function coerceBrainProviderId(value: unknown): BrainProviderId {
  return value === "openai" || value === "anthropic" || value === "deepseek"
    ? value
    : "openai";
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
  const openAiKey = secrets.openaiApiKey ?? process.env.OPENAI_API_KEY ?? null;

  if (!openAiKey) {
    return NextResponse.json(
      { error: "OpenAI key is not configured." },
      { status: 400 }
    );
  }

  try {
    const provider = getBrainProvider({
      providerId: coerceBrainProviderId(aiSettings?.brain_provider),
      modelId: String(aiSettings?.brain_model ?? "gpt-4o-mini"),
      apiKey: openAiKey,
    });

    const result = await provider.generateReply({
      system: "You are a helpful assistant.",
      prompt: `Say hello in ${language} in one sentence.`,
      language,
      maxTokens: 80,
      temperature: 0.6,
    });

    return NextResponse.json({ text: result.text });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 }
    );
  }
}

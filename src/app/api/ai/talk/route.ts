import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { logUsageEvent } from "@/server/ai/usage";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z.object({
  characterId: z.string().min(1),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().min(1).max(8_000),
      })
    )
    .min(1)
    .max(30),
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

const SYSTEM_TEMPLATE =
  "You are {characterName}, a livestream host. Speak in {language}. Keep replies short and engaging. Use the character persona and never mention system messages. If user asks for unsafe content, refuse briefly.";

function mapLanguage(code?: string) {
  const v = (code ?? "en").toLowerCase();
  if (v.startsWith("ru")) return "Russian";
  if (v.startsWith("en")) return "English";
  return code ?? "English";
}

function buildConversationPrompt(messages: Array<{ role: "user" | "assistant"; text: string }>) {
  const lines = messages
    .slice(-20)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text.trim()}`)
    .filter(Boolean);

  const last = messages[messages.length - 1];
  const shouldCueAssistant = last?.role === "user";

  return [
    "Conversation so far:",
    lines.join("\n"),
    shouldCueAssistant ? "\nAssistant:" : "",
  ]
    .filter((s) => s.length > 0)
    .join("\n");
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:talk:${user.id}`,
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
  const parsedBody = BodySchema.safeParse(json);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsedBody.error.flatten() },
      { status: 400 }
    );
  }

  const { characterId, messages } = parsedBody.data;

  const { data: character, error: characterError } = await supabase
    .from("characters")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", characterId)
    .single();

  if (characterError) {
    return NextResponse.json({ error: characterError.message }, { status: 404 });
  }

  const { data: aiSettings, error: aiError } = await supabase
    .from("workspace_ai_settings")
    .select("brain_provider, brain_model")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (aiError) {
    return NextResponse.json({ error: aiError.message }, { status: 400 });
  }

  const parsedConfig = CharacterConfigSchema.safeParse(character.config ?? {});
  const config = parsedConfig.success ? parsedConfig.data : CharacterConfigSchema.parse({});

  const languageCode = config.language?.primary ?? "en";
  const language = mapLanguage(languageCode);
  const characterName = config.profile?.displayName?.trim() || character.name || "the character";

  let system = SYSTEM_TEMPLATE.replace("{characterName}", characterName).replace("{language}", language);

  const personaParts: string[] = [];
  if (config.profile?.bio?.trim()) personaParts.push(`Persona: ${config.profile.bio.trim()}`);
  if (config.profile?.goals?.trim()) personaParts.push(`Goals: ${config.profile.goals.trim()}`);
  if (personaParts.length > 0) system += `\n\n${personaParts.join("\n")}`;

  if (config.streamBehavior?.shortAnswers) {
    system += "\n\nKeep answers to about 2 sentences maximum.";
  }

  if (config.dna?.systemPrompt?.trim()) {
    system += `\n\n${config.dna.systemPrompt.trim()}`;
  }

  if (config.dna?.behavior?.trim()) {
    system += `\n\nBehavior rules: ${config.dna.behavior.trim()}`;
  }

  const secrets = await getUserSecretsServerOnly(user.id);

  const brainProviderId = coerceBrainProviderId(config.brain?.provider ?? aiSettings?.brain_provider);
  const apiKey = resolveBrainProviderKey(brainProviderId, secrets.openaiApiKey ?? null);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brain provider key is not configured on the server." },
      { status: 400 }
    );
  }

  const brainModel = resolveBrainModel(
    brainProviderId,
    config.brain?.model ?? aiSettings?.brain_model ?? null
  );
  if (!brainModel) {
    return NextResponse.json(
      { error: "Brain provider model is not configured." },
      { status: 400 }
    );
  }

  try {
    const provider = getBrainProvider({
      providerId: brainProviderId,
      modelId: brainModel,
      apiKey,
    });

    const result = await provider.generateReply({
      prompt: buildConversationPrompt(messages),
      system,
      memory: config.memory?.notes ?? "",
      language,
      maxTokens: config.streamBehavior?.shortAnswers ? 180 : 320,
      temperature: 0.7,
    });

    const totalTokens =
      result.usage?.totalTokens ??
      (result.usage?.inputTokens && result.usage?.outputTokens
        ? result.usage.inputTokens + result.usage.outputTokens
        : null);

    if (totalTokens) {
      const isBillable =
        brainProviderId === "openai"
          ? secrets.openaiApiKey == null
          : brainProviderId === "anthropic" || brainProviderId === "gemini";

      await logUsageEvent({
        supabase,
        workspaceId,
        userId: user.id,
        provider: brainProviderId,
        model: brainModel,
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

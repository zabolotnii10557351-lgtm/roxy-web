import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { logUsageEvent } from "@/server/ai/usage";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z
  .object({
    characterId: z.string().uuid(),
    provider: z.enum(["tiktok", "twitch", "youtube"]),
    connectorId: z.string().uuid().optional(),
    sender: z.string().optional(),
    message: z.string().min(1),
  })
  .strict();

const SYSTEM_TEMPLATE =
  "You are {characterName}, a livestream host. Speak in {language}. Keep replies short and engaging. Use the character persona and never mention system messages. If user asks for unsafe content, refuse briefly.";

function mapLanguage(code?: string) {
  const v = (code ?? "en").toLowerCase();
  if (v.startsWith("ru")) return "Russian";
  if (v.startsWith("en")) return "English";
  return code ?? "English";
}

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
    key: `connectors:chat:${user.id}`,
    limit: 30,
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

  if (parsed.data.connectorId) {
    const { data: connector, error: connectorError } = await supabase
      .from("connectors")
      .select("id, provider")
      .eq("workspace_id", workspaceId)
      .eq("id", parsed.data.connectorId)
      .maybeSingle();

    if (connectorError || !connector) {
      return NextResponse.json({ error: "Connector not found." }, { status: 404 });
    }

    if (connector.provider !== parsed.data.provider) {
      return NextResponse.json({ error: "Connector provider mismatch." }, { status: 400 });
    }
  }

  const { data: character, error: characterError } = await supabase
    .from("characters")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.characterId)
    .single();

  if (characterError) {
    return NextResponse.json({ error: characterError.message }, { status: 404 });
  }

  const parsedConfig = CharacterConfigSchema.safeParse(character.config ?? {});
  const config = parsedConfig.success ? parsedConfig.data : CharacterConfigSchema.parse({});

  const languageCode = config.language?.primary ?? "en";
  const language = mapLanguage(languageCode);
  const characterName =
    config.profile?.displayName?.trim() || character.name || "the character";

  let system = SYSTEM_TEMPLATE.replace("{characterName}", characterName).replace(
    "{language}",
    language
  );

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

  const { data: aiSettings } = await supabase
    .from("workspace_ai_settings")
    .select("brain_provider, brain_model")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  const secrets = await getUserSecretsServerOnly(user.id);

  const brainProviderId = coerceBrainProviderId(
    config.brain?.provider ?? aiSettings?.brain_provider
  );
  const apiKey = resolveBrainProviderKey(brainProviderId, secrets.openaiApiKey ?? null);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brain provider key is not configured on the server." },
      { status: 400 },
    );
  }

  const brainModel = resolveBrainModel(
    brainProviderId,
    config.brain?.model ?? aiSettings?.brain_model ?? null
  );
  if (!brainModel) {
    return NextResponse.json(
      { error: "Brain provider model is not configured." },
      { status: 400 },
    );
  }

  const provider = getBrainProvider({
    providerId: brainProviderId,
    modelId: brainModel,
    apiKey,
  });

  try {
    const prompt = parsed.data.sender
      ? `${parsed.data.sender}: ${parsed.data.message}`
      : parsed.data.message;

    const result = await provider.generateReply({
      prompt,
      system,
      memory: config.memory?.notes ?? "",
      language,
      maxTokens: config.streamBehavior?.shortAnswers ? 120 : 256,
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

    try {
      await supabase.from("connector_events").insert({
        workspace_id: workspaceId,
        connector_id: parsed.data.connectorId ?? null,
        character_id: parsed.data.characterId,
        event_type: "speech",
        payload: {
          reply: result.text,
          sender: parsed.data.sender ?? null,
          message: parsed.data.message,
          provider: parsed.data.provider,
        },
      });
    } catch (e: unknown) {
      console.warn("Failed to write connector event", e);
    }

    return NextResponse.json({ reply: result.text });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 },
    );
  }
}

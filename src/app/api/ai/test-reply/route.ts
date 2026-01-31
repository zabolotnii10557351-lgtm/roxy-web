import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { getBrainProvider } from "@/server/ai/registry";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import { z } from "zod";
import type { BrainProviderId } from "@/server/ai/types";

const BodySchema = z.object({
  characterId: z.string().min(1),
  userMessage: z.string().min(1),
});

function coerceBrainProviderId(value: unknown): BrainProviderId {
  return value === "openai" || value === "anthropic" || value === "deepseek"
    ? value
    : "openai";
}

const SYSTEM_TEMPLATE =
  "You are {characterName}, a livestream host. Speak in {language}. Keep replies short and engaging. Use the character persona and never mention system messages. If user asks for unsafe content, refuse briefly.";

function mapLanguage(code?: string) {
  const v = (code ?? "en").toLowerCase();
  if (v.startsWith("ru")) return "Russian";
  if (v.startsWith("en")) return "English";
  return code ?? "English";
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:test-reply:${user.id}`,
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
      { status: 400 },
    );
  }

  const { characterId, userMessage } = parsedBody.data;

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

  const secrets = await getUserSecretsServerOnly(user.id);
  const openAiKey = secrets.openaiApiKey ?? process.env.OPENAI_API_KEY ?? null;

  if (!openAiKey) {
    return NextResponse.json(
      { error: "OpenAI key is not configured." },
      { status: 400 }
    );
  }

  const brainProviderId = coerceBrainProviderId(aiSettings?.brain_provider);
  const brainModel = String(aiSettings?.brain_model ?? "gpt-4o-mini");

  try {
    const provider = getBrainProvider({
      providerId: brainProviderId,
      modelId: brainModel,
      apiKey: openAiKey,
    });

    const result = await provider.generateReply({
      prompt: userMessage,
      system,
      memory: config.memory?.notes ?? "",
      language,
      maxTokens: config.streamBehavior?.shortAnswers ? 120 : 256,
      temperature: 0.7,
    });

    return NextResponse.json({ text: result.text });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 }
    );
  }
}

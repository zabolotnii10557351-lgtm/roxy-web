import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getVoiceProvider } from "@/server/ai/registry";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import { z } from "zod";
import type { VoiceProviderId } from "@/server/ai/types";

const BodySchema = z.object({
  text: z.string().min(1),
  voiceProvider: z.enum(["openai", "elevenlabs"]).optional(),
  voiceId: z.string().optional(),
  language: z.string().optional(),
});

function coerceVoiceProviderId(value: unknown): VoiceProviderId {
  return value === "openai" || value === "elevenlabs" ? value : "openai";
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:test-voice:${user.id}`,
    limit: 10,
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

  const { text } = parsedBody.data;

  const { data: aiSettings, error: aiError } = await supabase
    .from("workspace_ai_settings")
    .select("voice_provider, voice_voice_id")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (aiError) {
    return NextResponse.json({ error: aiError.message }, { status: 400 });
  }

  const voiceProvider = coerceVoiceProviderId(
    parsedBody.data.voiceProvider ?? aiSettings?.voice_provider,
  );
  const voiceId = String(
    parsedBody.data.voiceId ?? aiSettings?.voice_voice_id ?? "alloy",
  );
  const language = parsedBody.data.language ?? "";

  const secrets = await getUserSecretsServerOnly(user.id);

  if (voiceProvider === "elevenlabs") {
    const key = secrets.elevenlabsApiKey;
    if (!key) {
      return NextResponse.json(
        { error: "Please add your ElevenLabs API key in Settings." },
        { status: 400 }
      );
    }

    try {
      const provider = getVoiceProvider({ providerId: "elevenlabs", apiKey: key });
      const out = await provider.synthesize({ text, voiceId, language });

      const body = new Uint8Array(out.audioBuffer);

      const res = new NextResponse(body, {
        status: 200,
        headers: {
          "Content-Type": out.mimeType,
          "Cache-Control": "no-store",
          "X-Char-Count": String(out.charCount ?? text.length),
        },
      });

      if (out.durationSeconds != null) {
        res.headers.set("X-Duration-Seconds", String(out.durationSeconds));
      }

      return res;
    } catch (e: unknown) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Provider call failed." },
        { status: 502 }
      );
    }
  }

  // openai (included) - uses BYOK if present, else server env key
  const openAiKey = secrets.openaiApiKey ?? process.env.OPENAI_API_KEY ?? null;
  if (!openAiKey) {
    return NextResponse.json(
      { error: "OpenAI key is not configured." },
      { status: 400 }
    );
  }

  try {
    const provider = getVoiceProvider({ providerId: "openai", apiKey: openAiKey });
    const out = await provider.synthesize({ text, voiceId, language });

    const body = new Uint8Array(out.audioBuffer);

    const res = new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": out.mimeType,
        "Cache-Control": "no-store",
        "X-Char-Count": String(out.charCount ?? text.length),
      },
    });

    if (out.durationSeconds != null) {
      res.headers.set("X-Duration-Seconds", String(out.durationSeconds));
    }

    return res;
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Provider call failed." },
      { status: 502 }
    );
  }
}

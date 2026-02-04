import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserSecretsServerOnly } from "@/server/ai/secrets";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(req: Request) {
  const { user } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:transcribe:${user.id}`,
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

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
  }

  const audio = form.get("audio");
  const language = String(form.get("language") ?? "").trim();

  if (!(audio instanceof File)) {
    return NextResponse.json({ error: "Missing audio file." }, { status: 400 });
  }

  if (audio.size <= 0) {
    return NextResponse.json({ error: "Empty audio file." }, { status: 400 });
  }

  if (audio.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Audio file is too large (max 25MB)." },
      { status: 413 }
    );
  }

  const secrets = await getUserSecretsServerOnly(user.id);
  const apiKey = secrets.openaiApiKey ?? process.env.OPENAI_API_KEY ?? null;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI key is not configured." },
      { status: 400 }
    );
  }

  const model = process.env.OPENAI_STT_MODEL ?? "gpt-4o-mini-transcribe";

  try {
    const upstream = new FormData();
    upstream.append("model", model);
    upstream.append("file", audio, audio.name || "audio.webm");
    if (language.length > 0) upstream.append("language", language);

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstream,
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: `Transcription failed (${res.status}).`, details: text.slice(0, 500) },
        { status: 502 }
      );
    }

    const json = JSON.parse(text) as { text?: string };
    return NextResponse.json({ text: String(json.text ?? "").trim() });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Transcription failed." },
      { status: 502 }
    );
  }
}

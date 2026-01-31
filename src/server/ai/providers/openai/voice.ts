import type { VoiceProvider, VoiceSynthesizeInput, VoiceSynthesizeOutput } from "@/server/ai/types";

export class OpenAIVoiceProvider implements VoiceProvider {
  public readonly id = "openai" as const;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(params: { apiKey: string; model?: string }) {
    this.apiKey = params.apiKey;
    this.model = params.model ?? process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts";
  }

  async synthesize(input: VoiceSynthesizeInput): Promise<VoiceSynthesizeOutput> {
    const voice = input.voiceId && input.voiceId.trim().length > 0 ? input.voiceId.trim() : "alloy";

    const body = {
      model: this.model,
      voice,
      input: input.text,
      format: "mp3",
    };

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenAI TTS error (${res.status}): ${text.slice(0, 500)}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    return {
      audioBuffer,
      mimeType: "audio/mpeg",
      charCount: input.text.length,
    };
  }
}

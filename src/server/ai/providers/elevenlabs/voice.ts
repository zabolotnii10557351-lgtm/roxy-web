import type { VoiceProvider, VoiceSynthesizeInput, VoiceSynthesizeOutput } from "@/server/ai/types";

export class ElevenLabsVoiceProvider implements VoiceProvider {
  public readonly id = "elevenlabs" as const;
  private readonly apiKey: string;

  constructor(params: { apiKey: string }) {
    this.apiKey = params.apiKey;
  }

  async synthesize(input: VoiceSynthesizeInput): Promise<VoiceSynthesizeOutput> {
    const voiceId = input.voiceId?.trim();
    if (!voiceId) {
      throw new Error("ElevenLabs voiceId is required.");
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`;

    const body = {
      text: input.text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": this.apiKey,
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ElevenLabs error (${res.status}): ${text.slice(0, 500)}`);
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

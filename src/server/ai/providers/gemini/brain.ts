import type {
  BrainProvider,
  BrainGenerateReplyInput,
  BrainGenerateReplyOutput,
} from "@/server/ai/types";

type GeminiResponseJson = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
};

export class GeminiBrainProvider implements BrainProvider {
  public readonly id = "gemini" as const;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(params: { apiKey: string; model: string }) {
    this.apiKey = params.apiKey;
    this.model = params.model;
  }

  async generateReply(input: BrainGenerateReplyInput): Promise<BrainGenerateReplyOutput> {
    const systemParts = [input.system];
    if (input.language) systemParts.push(`Language: ${input.language}`);
    if (input.memory && input.memory.trim().length > 0) {
      systemParts.push(`Memory notes: ${input.memory.trim()}`);
    }

    const prompt = [systemParts.join("\n\n"), input.prompt].filter(Boolean).join("\n\n");

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: input.temperature ?? 0.7,
        maxOutputTokens: input.maxTokens ?? 256,
      },
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      this.model,
    )}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Gemini error (${res.status}): ${text.slice(0, 500)}`);
    }

    const json = (await res.json()) as GeminiResponseJson;
    const outputText =
      json?.candidates?.[0]?.content?.parts?.map((part) => part?.text ?? "").join("") ?? "";
    const usage = json?.usageMetadata;

    return {
      text: outputText.trim(),
      usage: usage
        ? {
            inputTokens: usage.promptTokenCount,
            outputTokens: usage.candidatesTokenCount,
            totalTokens: usage.totalTokenCount,
          }
        : undefined,
    };
  }
}

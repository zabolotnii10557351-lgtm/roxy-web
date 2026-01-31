import type { BrainProvider, BrainGenerateReplyInput, BrainGenerateReplyOutput } from "@/server/ai/types";

type OpenAIResponsesApiJson = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  };
};

export class OpenAIBrainProvider implements BrainProvider {
  public readonly id = "openai" as const;
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

    const body = {
      model: this.model,
      input: [
        {
          role: "system",
          content: systemParts.join("\n\n"),
        },
        {
          role: "user",
          content: input.prompt,
        },
      ],
      temperature: input.temperature ?? 0.7,
      max_output_tokens: input.maxTokens ?? 256,
    };

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenAI error (${res.status}): ${text.slice(0, 500)}`);
    }

    const json = (await res.json()) as OpenAIResponsesApiJson;
    const outputText: string | undefined =
      json?.output_text ??
      json?.output?.[0]?.content?.find((c) => c?.type === "output_text")?.text;

    const usage = json?.usage;

    return {
      text: (outputText ?? "").trim(),
      usage: usage
        ? {
            inputTokens: usage.input_tokens,
            outputTokens: usage.output_tokens,
            totalTokens: usage.total_tokens,
          }
        : undefined,
    };
  }
}

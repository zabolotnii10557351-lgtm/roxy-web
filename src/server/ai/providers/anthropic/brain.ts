import type {
  BrainProvider,
  BrainGenerateReplyInput,
  BrainGenerateReplyOutput,
} from "@/server/ai/types";

type AnthropicResponseJson = {
  content?: Array<{ text?: string; type?: string }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
};

export class AnthropicBrainProvider implements BrainProvider {
  public readonly id = "anthropic" as const;
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
      max_tokens: input.maxTokens ?? 256,
      temperature: input.temperature ?? 0.7,
      system: systemParts.join("\n\n"),
      messages: [
        {
          role: "user",
          content: input.prompt,
        },
      ],
    };

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Anthropic error (${res.status}): ${text.slice(0, 500)}`);
    }

    const json = (await res.json()) as AnthropicResponseJson;
    const outputText = json?.content?.map((item) => item?.text ?? "").join("") ?? "";
    const usage = json?.usage;

    return {
      text: outputText.trim(),
      usage: usage
        ? {
            inputTokens: usage.input_tokens,
            outputTokens: usage.output_tokens,
            totalTokens:
              usage.input_tokens != null && usage.output_tokens != null
                ? usage.input_tokens + usage.output_tokens
                : undefined,
          }
        : undefined,
    };
  }
}

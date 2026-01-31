export type BrainProviderId = "openai" | "anthropic" | "deepseek";
export type VoiceProviderId = "openai" | "elevenlabs";

export type ProviderAvailability = "available" | "coming_soon";

export interface BrainProviderMeta {
  id: BrainProviderId;
  label: string;
  availability: ProviderAvailability;
  docsUrl?: string;
}

export const BRAIN_PROVIDER_META: Record<BrainProviderId, BrainProviderMeta> = {
  openai: {
    id: "openai",
    label: "OpenAI",
    availability: "available",
  },
  anthropic: {
    id: "anthropic",
    label: "Anthropic",
    availability: "coming_soon",
  },
  deepseek: {
    id: "deepseek",
    label: "DeepSeek",
    availability: "coming_soon",
  },
};

export interface BrainGenerateReplyInput {
  prompt: string;
  system: string;
  memory?: string;
  language?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface BrainGenerateReplyOutput {
  text: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
}

export interface BrainProvider {
  id: BrainProviderId;
  generateReply(input: BrainGenerateReplyInput): Promise<BrainGenerateReplyOutput>;
}

export interface VoiceSynthesizeInput {
  text: string;
  voiceId: string;
  language?: string;
  style?: Record<string, unknown>;
}

export interface VoiceSynthesizeOutput {
  audioBuffer: Buffer;
  mimeType: string;
  durationSeconds?: number;
  charCount?: number;
}

export interface VoiceProvider {
  id: VoiceProviderId;
  synthesize(input: VoiceSynthesizeInput): Promise<VoiceSynthesizeOutput>;
}

import type { BrainProvider, VoiceProvider, BrainProviderId, VoiceProviderId } from "@/server/ai/types";
import { OpenAIBrainProvider } from "@/server/ai/providers/openai/brain";
import { OpenAIVoiceProvider } from "@/server/ai/providers/openai/voice";
import { ElevenLabsVoiceProvider } from "@/server/ai/providers/elevenlabs/voice";

export function getBrainProvider(params: {
  providerId: BrainProviderId;
  modelId: string;
  apiKey: string;
}): BrainProvider {
  const { providerId, modelId, apiKey } = params;

  if (providerId === "openai") {
    return new OpenAIBrainProvider({ apiKey, model: modelId });
  }

  if (providerId === "anthropic" || providerId === "deepseek") {
    throw new Error(`${providerId} brain provider is coming soon.`);
  }

  const exhaustive: never = providerId;
  throw new Error(`Unsupported brain provider: ${exhaustive}`);
}

export function getVoiceProvider(params: {
  providerId: VoiceProviderId;
  apiKey: string;
}): VoiceProvider {
  const { providerId, apiKey } = params;

  if (providerId === "openai") {
    return new OpenAIVoiceProvider({ apiKey });
  }

  if (providerId === "elevenlabs") {
    return new ElevenLabsVoiceProvider({ apiKey });
  }

  const exhaustive: never = providerId;
  throw new Error(`Unsupported voice provider: ${exhaustive}`);
}

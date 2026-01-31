import { supabaseAdmin } from "@/lib/supabase/admin";

export type UserSecrets = {
  openaiApiKey: string | null;
  elevenlabsApiKey: string | null;
};

export async function getUserSecretsServerOnly(userId: string): Promise<UserSecrets> {
  const { data, error } = await supabaseAdmin
    .from("user_secrets")
    .select("openai_api_key, elevenlabs_api_key")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load user secrets.");
  }

  return {
    openaiApiKey: data?.openai_api_key ?? null,
    elevenlabsApiKey: data?.elevenlabs_api_key ?? null,
  };
}

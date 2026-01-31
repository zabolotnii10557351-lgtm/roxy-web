import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

const PostBodySchema = z.object({
  brain_provider: z.enum(["openai", "anthropic", "deepseek"]).optional(),
  brain_model: z.string().min(1).optional(),
  voice_provider: z.enum(["openai", "elevenlabs"]).optional(),
  voice_voice_id: z.string().min(1).optional(),
});

async function ensureWorkspaceAiSettings(params: {
  supabase: SupabaseClient;
  workspaceId: string;
}) {
  const { supabase, workspaceId } = params;

  const { data, error } = await supabase
    .from("workspace_ai_settings")
    .select("workspace_id, brain_provider, brain_model, voice_provider, voice_voice_id")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data) return data;

  const { data: inserted, error: insertError } = await supabase
    .from("workspace_ai_settings")
    .insert({ workspace_id: workspaceId })
    .select("workspace_id, brain_provider, brain_model, voice_provider, voice_voice_id")
    .single();

  if (insertError) throw new Error(insertError.message);
  return inserted;
}

export async function GET() {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:settings:get:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const settings = await ensureWorkspaceAiSettings({ supabase, workspaceId });

  const { data: flags, error: flagsError } = await supabase.rpc(
    "get_user_secret_flags"
  );
  if (flagsError) throw new Error(flagsError.message);

  return NextResponse.json({
    workspaceId,
    userId: user.id,
    settings,
    secretFlags: flags,
  });
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:settings:post:${user.id}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = PostBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const brain_provider = parsed.data.brain_provider ?? "openai";
  const brain_model = parsed.data.brain_model ?? "gpt-4o-mini";
  const voice_provider = parsed.data.voice_provider ?? "openai";
  const voice_voice_id = parsed.data.voice_voice_id ?? "alloy";

  const { data, error } = await supabase
    .from("workspace_ai_settings")
    .upsert({
      workspace_id: workspaceId,
      brain_provider,
      brain_model,
      voice_provider,
      voice_voice_id,
    })
    .select("workspace_id, brain_provider, brain_model, voice_provider, voice_voice_id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ settings: data });
}

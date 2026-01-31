import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

async function ensureWorkspaceAiSettings(params: {
  supabase: any;
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
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const body = (await req.json().catch(() => null)) as any;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const allowedBrainProviders = new Set(["openai", "anthropic", "deepseek"]);
  const allowedVoiceProviders = new Set(["openai", "elevenlabs"]);

  const brain_provider = String(body.brain_provider ?? "openai");
  const brain_model = String(body.brain_model ?? "gpt-4o-mini");
  const voice_provider = String(body.voice_provider ?? "openai");
  const voice_voice_id = String(body.voice_voice_id ?? "alloy");

  if (!allowedBrainProviders.has(brain_provider)) {
    return NextResponse.json({ error: "Unsupported brain provider." }, { status: 400 });
  }
  if (!allowedVoiceProviders.has(voice_provider)) {
    return NextResponse.json({ error: "Unsupported voice provider." }, { status: 400 });
  }

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

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { StreamScriptConfigSchema } from "@/lib/schemas/workspace";

const BodySchema = z
  .object({
    scriptId: z.string().uuid(),
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    provider: z.enum(["tiktok", "twitch", "youtube"]).optional(),
  })
  .strict();

export async function POST(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = BodySchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data: script, error } = await supabase
    .from("stream_scripts")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.scriptId)
    .maybeSingle();

  if (error || !script) {
    return NextResponse.json({ error: "Stream script not found." }, { status: 404 });
  }

  const config = StreamScriptConfigSchema.parse(script.config ?? {});
  if (!config.enabled) {
    return NextResponse.json({ error: "Stream script is disabled." }, { status: 400 });
  }

  const payload = {
    scriptId: script.id,
    name: script.name,
    message: config.message,
    intervalSeconds: config.intervalSeconds,
    provider: parsed.data.provider ?? null,
  };

  const { error: insertError } = await supabase
    .from("connector_events")
    .insert({
      workspace_id: workspaceId,
      connector_id: parsed.data.connectorId ?? null,
      character_id: parsed.data.characterId ?? null,
      event_type: "script_message",
      payload,
    });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, payload });
}
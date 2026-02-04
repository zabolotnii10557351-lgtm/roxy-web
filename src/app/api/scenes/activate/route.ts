import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { SceneConfigSchema } from "@/lib/schemas/workspace";

const BodySchema = z
  .object({
    sceneId: z.string().uuid(),
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    reason: z.string().optional(),
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

  const { data: scene, error } = await supabase
    .from("scenes")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.sceneId)
    .maybeSingle();

  if (error || !scene) {
    return NextResponse.json({ error: "Scene not found." }, { status: 404 });
  }

  const config = SceneConfigSchema.parse(scene.config ?? {});
  const payload = {
    sceneId: scene.id,
    name: scene.name,
    config,
    reason: parsed.data.reason ?? null,
  };

  const { error: insertError } = await supabase
    .from("connector_events")
    .insert({
      workspace_id: workspaceId,
      connector_id: parsed.data.connectorId ?? null,
      character_id: parsed.data.characterId ?? null,
      event_type: "scene_switch",
      payload,
    });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, payload });
}
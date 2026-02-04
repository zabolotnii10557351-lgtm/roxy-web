import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

const BodySchema = z
  .object({
    type: z.string().min(1),
    payload: z.unknown().optional(),
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
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

  const payload = parsed.data.payload ?? {};
  const { error } = await supabase.from("connector_events").insert({
    workspace_id: workspaceId,
    connector_id: parsed.data.connectorId ?? null,
    character_id: parsed.data.characterId ?? null,
    event_type: `webhook:${parsed.data.type}`,
    payload,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
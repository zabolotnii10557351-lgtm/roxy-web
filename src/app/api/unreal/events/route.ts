import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

const PollSchema = z.object({
  connectorId: z.string().uuid().optional(),
  characterId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional(),
  after: z.string().datetime().optional(),
});

const CreateSchema = z
  .object({
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    type: z.string().min(1),
    payload: z.unknown().optional(),
  })
  .strict();

export async function GET(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `unreal:events:poll:${user.id}`,
    limit: 120,
    windowMs: 60_000,
  });

  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const parsed = PollSchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { connectorId, characterId, limit, after } = parsed.data;
  const pageSize = limit ?? 50;

  let query = supabase
    .from("connector_events")
    .select("id, connector_id, character_id, event_type, payload, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: true })
    .limit(pageSize);

  if (connectorId) {
    query = query.eq("connector_id", connectorId);
  }

  if (characterId) {
    query = query.eq("character_id", characterId);
  }

  if (after) {
    query = query.gt("created_at", after);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const events = Array.isArray(data) ? data : [];
  const nextCursor = events.length > 0 ? events[events.length - 1].created_at : after ?? null;

  return NextResponse.json({ events, nextCursor });
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `unreal:events:push:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });

  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = CreateSchema.safeParse(json ?? {});
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
    event_type: parsed.data.type,
    payload,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
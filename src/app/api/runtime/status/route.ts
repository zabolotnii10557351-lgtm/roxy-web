import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

const UpdateSchema = z
  .object({
    status: z.enum(["online", "offline", "error"]).optional(),
    version: z.string().optional(),
    payload: z.unknown().optional(),
  })
  .strict();

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const { data, error } = await supabase
    .from("local_runtime_status")
    .select("workspace_id, status, version, last_seen, payload, updated_at")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data ?? null });
}

export async function POST(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = UpdateSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data.payload ?? {};

  const { data, error } = await supabase
    .from("local_runtime_status")
    .upsert({
      workspace_id: workspaceId,
      status: parsed.data.status ?? "online",
      version: parsed.data.version ?? null,
      last_seen: new Date().toISOString(),
      payload,
      updated_at: new Date().toISOString(),
    })
    .select("workspace_id, status, version, last_seen, payload, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data });
}
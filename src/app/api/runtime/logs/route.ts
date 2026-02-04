import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

const CreateSchema = z
  .object({
    level: z.enum(["debug", "info", "warn", "error"]).optional(),
    message: z.string().min(1),
    payload: z.unknown().optional(),
  })
  .strict();

export async function GET(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);

  const { data, error } = await supabase
    .from("local_runtime_logs")
    .select("id, level, message, payload, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = CreateSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data.payload ?? {};

  const { data, error } = await supabase
    .from("local_runtime_logs")
    .insert({
      workspace_id: workspaceId,
      level: parsed.data.level ?? "info",
      message: parsed.data.message,
      payload,
    })
    .select("id, level, message, payload, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data });
}
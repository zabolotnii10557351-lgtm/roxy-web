import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

const CreateSchema = z
  .object({
    characterId: z.string().uuid().optional(),
  })
  .strict();

function generateToken() {
  return crypto.randomBytes(24).toString("hex");
}

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const { data, error } = await supabase
    .from("deploy_sessions")
    .select("id, token, status, character_id, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(20);

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

  const token = generateToken();

  const { data, error } = await supabase
    .from("deploy_sessions")
    .insert({
      workspace_id: workspaceId,
      token,
      status: "ready",
      character_id: parsed.data.characterId ?? null,
    })
    .select("id, token, status, character_id, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data });
}
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { SceneConfigSchema } from "@/lib/schemas/workspace";

const CreateSchema = z
  .object({
    name: z.string().min(1),
    config: z.unknown().optional(),
  })
  .strict();

const UpdateSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
    config: z.unknown().optional(),
  })
  .strict();

const DeleteSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

function mergeConfig(
  current: z.infer<typeof SceneConfigSchema>,
  next?: unknown,
) {
  if (!next) return current;

  const parsedNext = SceneConfigSchema.partial().safeParse(next);
  const nextConfig = parsedNext.success ? parsedNext.data : {};

  const merged = {
    ...current,
    ...nextConfig,
  } as z.infer<typeof SceneConfigSchema>;

  return SceneConfigSchema.parse(merged);
}

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const { data, error } = await supabase
    .from("scenes")
    .select("id, workspace_id, name, config, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const config = SceneConfigSchema.parse(parsed.data.config ?? {});

  const { data, error } = await supabase
    .from("scenes")
    .insert({
      workspace_id: workspaceId,
      name: parsed.data.name.trim(),
      config,
    })
    .select("id, workspace_id, name, config, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data });
}

export async function PATCH(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = UpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data: existing, error: fetchError } = await supabase
    .from("scenes")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Scene not found." }, { status: 404 });
  }

  const currentConfig = SceneConfigSchema.parse(existing.config ?? {});
  const mergedConfig = mergeConfig(currentConfig, parsed.data.config);

  const { data, error } = await supabase
    .from("scenes")
    .update({
      name: parsed.data.name?.trim() ?? existing.name,
      config: mergedConfig,
    })
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id)
    .select("id, workspace_id, name, config, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = DeleteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
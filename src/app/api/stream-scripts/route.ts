import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserPlanEntitlements } from "@/lib/pricing/server";
import { StreamScriptConfigSchema } from "@/lib/schemas/workspace";

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
    enabled: z.boolean().optional(),
  })
  .strict();

const DeleteSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

function mergeConfig(
  current: z.infer<typeof StreamScriptConfigSchema>,
  next?: unknown,
  enabledOverride?: boolean,
) {
  if (!next) {
    if (typeof enabledOverride === "boolean") {
      return { ...current, enabled: enabledOverride };
    }
    return current;
  }

  const parsedNext = StreamScriptConfigSchema.partial().safeParse(next);
  const nextConfig = parsedNext.success ? parsedNext.data : {};

  const merged = {
    ...current,
    ...nextConfig,
    conditions: {
      ...current.conditions,
      ...(nextConfig as { conditions?: Record<string, unknown> }).conditions,
    },
    message: {
      ...current.message,
      ...(nextConfig as { message?: Record<string, unknown> }).message,
    },
  } as z.infer<typeof StreamScriptConfigSchema>;

  if (typeof enabledOverride === "boolean") {
    merged.enabled = enabledOverride;
  }

  return StreamScriptConfigSchema.parse(merged);
}

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const { data, error } = await supabase
    .from("stream_scripts")
    .select("id, workspace_id, name, config, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const { supabase, workspaceId, user } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { entitlements } = await getUserPlanEntitlements({
    supabase,
    userId: user.id,
  });

  if (entitlements?.stream_scripts_limit != null) {
    const { count, error: countError } = await supabase
      .from("stream_scripts")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    if (typeof count === "number" && count >= entitlements.stream_scripts_limit) {
      return NextResponse.json(
        { error: "Stream script limit reached for your plan." },
        { status: 403 },
      );
    }
  }

  const config = StreamScriptConfigSchema.parse(parsed.data.config ?? {});

  const { data, error } = await supabase
    .from("stream_scripts")
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
    .from("stream_scripts")
    .select("id, name, config")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Stream script not found." }, { status: 404 });
  }

  const currentConfig = StreamScriptConfigSchema.parse(existing.config ?? {});
  const mergedConfig = mergeConfig(currentConfig, parsed.data.config, parsed.data.enabled);

  const { data, error } = await supabase
    .from("stream_scripts")
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
    .from("stream_scripts")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
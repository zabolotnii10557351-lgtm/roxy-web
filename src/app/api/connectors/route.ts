import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { getUserPlanEntitlements } from "@/lib/pricing/server";

const ProviderSchema = z.enum(["tiktok", "twitch", "youtube"]);

const PostSchema = z
  .object({
    provider: ProviderSchema,
    account: z.string().min(1),
    url: z.string().optional().default(""),
    setActive: z.boolean().optional().default(true),
  })
  .strict();

const PatchSchema = z
  .object({
    id: z.string().uuid(),
    setActive: z.boolean().default(true),
  })
  .strict();

async function setActiveForProvider(params: {
  supabase: Awaited<ReturnType<typeof requireUserAndWorkspace>>["supabase"];
  workspaceId: string;
  provider: z.infer<typeof ProviderSchema>;
  activeId: string;
}) {
  const { data, error } = await params.supabase
    .from("connectors")
    .select("id, config")
    .eq("workspace_id", params.workspaceId)
    .eq("provider", params.provider);

  if (error) throw new Error(error.message);

  const updates = (data ?? []).map((row) => ({
    id: row.id,
    config: {
      ...(row.config ?? {}),
      is_active: row.id === params.activeId,
    },
  }));

  for (const update of updates) {
    const { error: updateError } = await params.supabase
      .from("connectors")
      .update({ config: update.config })
      .eq("id", update.id)
      .eq("workspace_id", params.workspaceId);

    if (updateError) throw new Error(updateError.message);
  }
}

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const { data, error } = await supabase
    .from("connectors")
    .select("id, provider, status, config, created_at")
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
  const parsed = PostSchema.safeParse(json);
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

  if (entitlements?.max_accounts_linked != null) {
    const { count, error: countError } = await supabase
      .from("connectors")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    if (typeof count === "number" && count >= entitlements.max_accounts_linked) {
      return NextResponse.json(
        { error: "Connector limit reached for your plan." },
        { status: 403 },
      );
    }
  }

  const config = {
    account: parsed.data.account.trim(),
    url: parsed.data.url?.trim() ?? "",
    is_active: Boolean(parsed.data.setActive),
  };

  const { data, error } = await supabase
    .from("connectors")
    .insert({
      workspace_id: workspaceId,
      provider: parsed.data.provider,
      status: "connected",
      config,
    })
    .select("id, provider, status, config, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (parsed.data.setActive) {
    await setActiveForProvider({
      supabase,
      workspaceId,
      provider: parsed.data.provider,
      activeId: data.id,
    });
  }

  return NextResponse.json({ item: data });
}

export async function PATCH(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("connectors")
    .select("id, provider")
    .eq("workspace_id", workspaceId)
    .eq("id", parsed.data.id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Connector not found." }, { status: 404 });
  }

  if (parsed.data.setActive) {
    await setActiveForProvider({
      supabase,
      workspaceId,
      provider: data.provider as z.infer<typeof ProviderSchema>,
      activeId: data.id,
    });
  }

  return NextResponse.json({ ok: true });
}

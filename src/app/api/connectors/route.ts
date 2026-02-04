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

type ConnectorRowFull = {
  id: string;
  provider: z.infer<typeof ProviderSchema> | string;
  status: string;
  config: unknown | null;
  created_at?: string | null;
};

type ConnectorRowLegacy = {
  id: string;
  provider: z.infer<typeof ProviderSchema> | string;
  config: unknown | null;
  created_at?: string | null;
};

function isMissingColumnError(message: string | undefined, columnName: string) {
  if (!message) return false;
  const m = message.toLowerCase();
  const col = columnName.toLowerCase();
  return (
    m.includes(`'${col}'`) && m.includes("schema cache")
  ) || m.includes(`column connectors.${col} does not exist`);
}

function isMissingCreatedAtError(message: string | undefined) {
  if (!message) return false;
  const m = message.toLowerCase();
  return m.includes("created_at") && (m.includes("does not exist") || m.includes("schema cache"));
}

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

  const primary = await supabase
    .from("connectors")
    .select("id, provider, status, config, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (!primary.error) {
    return NextResponse.json({ items: primary.data ?? [] });
  }

  // Backwards-compatible fallback for older schemas.
  if (isMissingColumnError(primary.error.message, "status") || isMissingCreatedAtError(primary.error.message)) {
    const fallback = await supabase
      .from("connectors")
      .select("id, provider, config, created_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false });

    if (fallback.error && isMissingCreatedAtError(fallback.error.message)) {
      // Oldest schemas might not have created_at.
      const retryWithoutOrder = await supabase
        .from("connectors")
        .select("id, provider, config")
        .eq("workspace_id", workspaceId);

      if (retryWithoutOrder.error) {
        return NextResponse.json(
          { error: retryWithoutOrder.error.message },
          { status: 400 }
        );
      }

      const items = ((retryWithoutOrder.data ?? []) as ConnectorRowLegacy[]).map((row) => ({
        ...row,
        status: "connected",
      }));
      return NextResponse.json({ items });
    }

    if (fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 400 });
    }

    const items = ((fallback.data ?? []) as ConnectorRowLegacy[]).map((row) => ({
      ...row,
      status: "connected",
    }));
    return NextResponse.json({ items });
  }

  return NextResponse.json({ error: primary.error.message }, { status: 400 });
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

  const insertPayloadWithStatus: Record<string, unknown> = {
    workspace_id: workspaceId,
    provider: parsed.data.provider,
    status: "connected",
    config,
  };

  const { data, error } = await supabase
    .from("connectors")
    .insert(insertPayloadWithStatus)
    .select("id, provider, status, config, created_at")
    .single();

  let inserted: ConnectorRowFull | null = (data as ConnectorRowFull | null) ?? null;

  if (error) {
    // Retry without the status column (older migrations not applied yet).
    if (isMissingColumnError(error.message, "status")) {
      const retry = await supabase
        .from("connectors")
        .insert({
          workspace_id: workspaceId,
          provider: parsed.data.provider,
          config,
        })
        .select("id, provider, config, created_at")
        .single();

      if (retry.error) {
        return NextResponse.json({ error: retry.error.message }, { status: 400 });
      }

      const retryRow = (retry.data as ConnectorRowLegacy | null) ?? null;
      inserted = retryRow
        ? { ...retryRow, status: "connected" }
        : null;
    } else {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  if (!inserted) {
    return NextResponse.json({ error: "Failed to create connector." }, { status: 500 });
  }

  if (parsed.data.setActive) {
    await setActiveForProvider({
      supabase,
      workspaceId,
      provider: parsed.data.provider,
      activeId: inserted.id,
    });
  }

  return NextResponse.json({ item: inserted });
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

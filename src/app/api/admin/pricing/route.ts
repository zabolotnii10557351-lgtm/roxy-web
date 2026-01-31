import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminForAction } from "@/lib/auth";
import { getDefaultPricingConfig, PricingConfigSchema } from "@/lib/pricing/config";
import { writeAdminAuditLog } from "@/server/admin/audit";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

export async function GET() {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const rl = rateLimitSlidingWindow({
      key: `admin:pricing:get:${user.id}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const { data, error } = await client
      .from("pricing_config")
      .select("id, version, is_active, json, created_at, created_by")
      .order("version", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

const PostSchema = z
  .object({
    base_version: z.number().int().positive().optional(),
  })
  .strict();

export async function POST(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:pricing:post:${user.id}:${ip}`,
      limit: 30,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = PostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { data: maxRow } = await client
      .from("pricing_config")
      .select("version")
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextVersion = (maxRow?.version ?? 0) + 1;

    let baseJson: unknown = null;
    if (parsed.data.base_version) {
      const { data: base, error: baseError } = await client
        .from("pricing_config")
        .select("json")
        .eq("version", parsed.data.base_version)
        .maybeSingle();

      if (baseError) {
        return NextResponse.json({ error: baseError.message }, { status: 500 });
      }
      baseJson = base?.json ?? null;
    }

    const fallback = getDefaultPricingConfig();
    const json = baseJson ?? fallback;

    const validated = PricingConfigSchema.safeParse({ version: nextVersion, ...(json as object) });
    if (!validated.success) {
      return NextResponse.json(
        { error: "Base pricing config failed validation" },
        { status: 400 },
      );
    }

    const { data: created, error } = await client
      .from("pricing_config")
      .insert({
        version: nextVersion,
        is_active: false,
        json: json as never,
        created_by: user.id,
      })
      .select("id, version, is_active, json, created_at, created_by")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAdminAuditLog({
      client,
      adminUserId: user.id,
      action: "pricing.create_version",
      targetType: "pricing_config",
      targetId: String(nextVersion),
      payload: { base_version: parsed.data.base_version ?? null },
    });

    return NextResponse.json({ item: created });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

const PutSchema = z
  .object({
    version: z.number().int().positive(),
    json: z.unknown(),
  })
  .strict();

export async function PUT(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:pricing:put:${user.id}:${ip}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = PutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const validated = PricingConfigSchema.safeParse({
      version: parsed.data.version,
      ...(parsed.data.json as object),
    });

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid pricing config", issues: validated.error.issues },
        { status: 400 },
      );
    }

    const { data, error } = await client
      .from("pricing_config")
      .update({ json: parsed.data.json as never, created_by: user.id })
      .eq("version", parsed.data.version)
      .select("id, version, is_active, json, created_at, created_by")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAdminAuditLog({
      client,
      adminUserId: user.id,
      action: "pricing.update_version",
      targetType: "pricing_config",
      targetId: String(parsed.data.version),
      payload: { version: parsed.data.version },
    });

    return NextResponse.json({ item: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

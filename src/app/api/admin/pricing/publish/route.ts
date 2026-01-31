import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminForAction } from "@/lib/auth";
import { writeAdminAuditLog } from "@/server/admin/audit";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

const BodySchema = z
  .object({
    version: z.number().int().positive(),
  })
  .strict();

export async function POST(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:pricing:publish:${user.id}:${ip}`,
      limit: 10,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const version = parsed.data.version;

    const { error: clearError } = await client
      .from("pricing_config")
      .update({ is_active: false })
      .neq("version", version);

    if (clearError) {
      return NextResponse.json({ error: clearError.message }, { status: 500 });
    }

    const { data, error } = await client
      .from("pricing_config")
      .update({ is_active: true })
      .eq("version", version)
      .select("id, version, is_active")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAdminAuditLog({
      client,
      adminUserId: user.id,
      action: "pricing.publish",
      targetType: "pricing_config",
      targetId: String(version),
      payload: { version },
    });

    return NextResponse.json({ item: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

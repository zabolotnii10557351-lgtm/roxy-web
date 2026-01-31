import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminForAction } from "@/lib/auth";
import { writeAdminAuditLog } from "@/server/admin/audit";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

export async function GET(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:users:get:${user.id}:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Rate limited", resetAt: rl.resetAt },
        { status: 429 },
      );
    }

    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim() ?? "";
    const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") ?? 200)));

    let query = client
      .from("profiles")
      .select("id, email, role, plan_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (q) {
      query = query.ilike("email", `%${q}%`);
    }

    const { data, error } = await query;

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

const PatchSchema = z
  .object({
    id: z.string().uuid(),
    role: z.enum(["user", "admin"]).optional(),
    plan_id: z.string().optional(),
  })
  .strict();

export async function PATCH(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:users:patch:${user.id}:${ip}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Rate limited", resetAt: rl.resetAt },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = PatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const updates: Record<string, unknown> = {};
    if (parsed.data.role) updates.role = parsed.data.role;
    if (parsed.data.plan_id) updates.plan_id = parsed.data.plan_id;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const { data, error } = await client
      .from("profiles")
      .update(updates)
      .eq("id", parsed.data.id)
      .select("id, email, role, plan_id")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAdminAuditLog({
      client,
      adminUserId: user.id,
      action: "users.update_profile",
      targetType: "profile",
      targetId: parsed.data.id,
      payload: updates,
    });

    return NextResponse.json({ item: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

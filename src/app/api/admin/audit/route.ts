import { NextResponse } from "next/server";
import { assertAdminForAction } from "@/lib/auth";
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
      key: `admin:audit:get:${user.id}:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const url = new URL(req.url);
    const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") ?? 200)));

    const action = url.searchParams.get("action")?.trim() ?? "";
    const targetType = url.searchParams.get("target_type")?.trim() ?? "";

    let query = client
      .from("admin_audit_logs")
      .select(
        "id, admin_user_id, action, target_type, target_id, payload, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (action) {
      query = query.ilike("action", `%${action}%`);
    }

    if (targetType) {
      query = query.eq("target_type", targetType);
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

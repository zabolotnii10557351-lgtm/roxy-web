import { NextRequest, NextResponse } from "next/server";
import { assertAdminForAction } from "@/lib/auth";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

const TABLES: Record<string, string> = {
  waitlist: "waitlist_emails",
  investors: "investor_leads",
  contact: "contact_messages",
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ kind: string }> },
) {
  try {
    const { kind } = await context.params;
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:leads:get:${kind}:${user.id}:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const table = TABLES[kind];

    if (!table) {
      return NextResponse.json({ error: "Unknown leads kind" }, { status: 404 });
    }

    const url = new URL(req.url);
    const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") ?? 200)));

    const { data, error } = await client
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

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

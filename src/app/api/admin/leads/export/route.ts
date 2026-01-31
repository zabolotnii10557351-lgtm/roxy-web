import { NextResponse } from "next/server";
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

function toCsv(rows: Record<string, unknown>[]) {
  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set<string>()),
  );

  const escape = (value: unknown) => {
    if (value === null || value === undefined) {
      return "";
    }
    const str = typeof value === "string" ? value : JSON.stringify(value);
    const quoted = str.replaceAll('"', '""');
    return `"${quoted}"`;
  };

  const lines = [headers.map(escape).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }

  return lines.join("\n");
}

export async function GET(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:leads:export:${user.id}:${ip}`,
      limit: 20,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const url = new URL(req.url);
    const kind = url.searchParams.get("kind") ?? "";
    const table = TABLES[kind];

    if (!table) {
      return NextResponse.json({ error: "Unknown leads kind" }, { status: 404 });
    }

    const { data, error } = await client
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const csv = toCsv((data ?? []) as Record<string, unknown>[]);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=leads_${kind}.csv`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

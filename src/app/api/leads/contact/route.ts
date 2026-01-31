import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/auth";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

const BodySchema = z
  .object({
    email: z.string().email(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    message: z.string().min(1).max(5000),
    source: z.string().optional(),
  })
  .strict();

export async function POST(req: Request) {
  const ip = getIp(req);
  const rl = rateLimitSlidingWindow({ key: `leads:contact:${ip}`, limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const adminClient = createSupabaseAdminClient();
  if (!adminClient) {
    return NextResponse.json(
      { error: "Lead capture not configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { error } = await adminClient.from("contact_messages").insert({
    email: parsed.data.email.toLowerCase(),
    first_name: parsed.data.first_name ?? null,
    last_name: parsed.data.last_name ?? null,
    message: parsed.data.message,
    source: parsed.data.source ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

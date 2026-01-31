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
    name: z.string().optional(),
    firm: z.string().optional(),
    message: z.string().optional(),
    source: z.string().optional(),
  })
  .strict();

export async function POST(req: Request) {
  const ip = getIp(req);
  const rl = rateLimitSlidingWindow({ key: `leads:investors:${ip}`, limit: 5, windowMs: 60_000 });
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
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { error } = await adminClient.from("investor_leads").insert({
    email: parsed.data.email.toLowerCase(),
    name: parsed.data.name ?? null,
    firm: parsed.data.firm ?? null,
    message: parsed.data.message ?? null,
    source: parsed.data.source ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

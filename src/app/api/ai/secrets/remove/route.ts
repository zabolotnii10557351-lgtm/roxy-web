import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { z } from "zod";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

const BodySchema = z.object({
  provider: z.enum(["openai", "elevenlabs"]),
});

export async function POST(req: Request) {
  const { supabase, user } = await requireUserAndWorkspace();

  const rl = rateLimitSlidingWindow({
    key: `ai:secrets:remove:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { provider } = parsed.data;

  const { data, error } = await supabase.rpc("remove_user_secret", {
    p_provider: provider,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ secretFlags: data });
}

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

export async function POST(req: Request) {
  const { supabase } = await requireUserAndWorkspace();

  const body = (await req.json().catch(() => null)) as any;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const provider = String(body.provider ?? "");
  const apiKey = String(body.apiKey ?? "");

  if (provider !== "openai" && provider !== "elevenlabs") {
    return NextResponse.json({ error: "Unsupported provider." }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("set_user_secret", {
    p_provider: provider,
    p_api_key: apiKey,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ secretFlags: data });
}

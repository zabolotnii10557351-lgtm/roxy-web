export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

function normalizeCode(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidCode(code: string) {
  return /^[a-z0-9_-]{3,20}$/.test(code);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("code") ?? "";
  const code = normalizeCode(raw);

  if (!code || !isValidCode(code)) {
    return NextResponse.json(
      { ok: false, available: false, error: "Invalid code format." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("promo_codes")
    .select("id")
    .ilike("code", code)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, available: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, available: !data?.id });
}

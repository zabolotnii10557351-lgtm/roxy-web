export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ code: null }, { status: 401 });
  }

  const { data: signup } = await supabaseAdmin
    .from("referral_signups")
    .select("code_id")
    .eq("referred_user_id", user.id)
    .order("created_at", { ascending: false })
    .maybeSingle();

  if (!signup?.code_id) {
    return NextResponse.json({ code: null });
  }

  const { data: codeRow } = await supabaseAdmin
    .from("promo_codes")
    .select("code")
    .eq("id", signup.code_id)
    .maybeSingle();

  return NextResponse.json({ code: codeRow?.code ?? null });
}

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/lib/site/url";

function normalizeCode(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidCode(code: string) {
  return /^[a-z0-9_-]{3,20}$/.test(code);
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();
  const body = (await req.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const codeInput = normalizeCode(String(body.code ?? ""));
  if (!isValidCode(codeInput)) {
    return NextResponse.json({ error: "Invalid code format." }, { status: 400 });
  }

  const { data: existingByOwner } = await supabase
    .from("promo_codes")
    .select("id, code")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (existingByOwner?.id) {
    return NextResponse.json({
      code: existingByOwner.code,
      referralLink: `${getSiteUrl()}/register?ref=${existingByOwner.code}`,
    });
  }

  const { data: existingCode } = await supabaseAdmin
    .from("promo_codes")
    .select("id")
    .ilike("code", codeInput)
    .maybeSingle();

  if (existingCode?.id) {
    return NextResponse.json({ error: "Code is already taken." }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("promo_codes")
    .insert({
      code: codeInput,
      owner_user_id: user.id,
      owner_workspace_id: workspaceId,
    })
    .select("code")
    .single();

  if (error || !data?.code) {
    return NextResponse.json({ error: error?.message ?? "Create failed." }, { status: 400 });
  }

  return NextResponse.json({
    code: data.code,
    referralLink: `${getSiteUrl()}/register?ref=${data.code}`,
  });
}

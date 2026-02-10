export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPlanEntitlementsForPlanId } from "@/lib/pricing/server";
import type { PlanId } from "@/lib/plans";

function readRuntimeToken(req: Request) {
  const headerToken = req.headers.get("x-runtime-token")?.trim();
  if (headerToken) return headerToken;
  const auth = req.headers.get("authorization")?.trim() ?? "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return "";
}

export async function POST(req: Request) {
  const expectedToken = process.env.RUNTIME_USAGE_TOKEN ?? "";
  if (!expectedToken) {
    return NextResponse.json({ error: "Runtime token not configured." }, { status: 500 });
  }

  const provided = readRuntimeToken(req);
  if (!provided || provided !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const userId = String(body.userId ?? body.user_id ?? "").trim();
  const workspaceIdRaw = String(body.workspaceId ?? body.workspace_id ?? "").trim();
  const seconds = Number(body.seconds ?? 0);
  const hours = Number(body.hours ?? 0);

  const usageSeconds = Number.isFinite(seconds) && seconds > 0 ? seconds : hours > 0 ? hours * 3600 : 0;

  if (!userId) {
    return NextResponse.json({ error: "userId required." }, { status: 400 });
  }

  if (!Number.isFinite(usageSeconds) || usageSeconds <= 0) {
    return NextResponse.json({ error: "seconds or hours required." }, { status: 400 });
  }

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("profiles")
    .select("plan_id, trial_ends_at, active_hours_used")
    .eq("id", userId)
    .maybeSingle();

  if (profileErr) {
    return NextResponse.json({ error: profileErr.message }, { status: 400 });
  }

  if (!profile) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  let workspaceId = workspaceIdRaw;
  if (!workspaceId) {
    const { data: settings } = await supabaseAdmin
      .from("user_settings")
      .select("default_workspace_id")
      .eq("user_id", userId)
      .maybeSingle();
    workspaceId = settings?.default_workspace_id ?? "";
  }

  if (!workspaceId) {
    return NextResponse.json({ error: "workspaceId required." }, { status: 400 });
  }

  const planId = (profile.plan_id ?? "trial") as PlanId;
  const trialEndsAt = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null;
  const activeHoursUsed = Number(profile.active_hours_used ?? 0);
  const entitlements = await getPlanEntitlementsForPlanId(planId);
  const hoursLimit = entitlements?.included_active_speech_hours_openai ?? null;

  if (planId === "trial" && trialEndsAt && trialEndsAt < new Date()) {
    return NextResponse.json({ error: "Trial expired" }, { status: 402 });
  }

  const nextTotal = activeHoursUsed + usageSeconds / 3600;

  if (hoursLimit !== null && nextTotal > hoursLimit) {
    return NextResponse.json({ error: "Usage limit exceeded" }, { status: 402 });
  }

  const { error: updErr } = await supabaseAdmin
    .from("profiles")
    .update({ active_hours_used: nextTotal })
    .eq("id", userId);

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  if (hoursLimit !== null) {
    const ratios = [0.8, 0.95];
    const now = new Date();
    for (const ratio of ratios) {
      const threshold = hoursLimit * ratio;
      if (activeHoursUsed < threshold && nextTotal >= threshold) {
        const type = `usage_warning_${Math.round(ratio * 100)}`;
        const since = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString();
        const { data: existing } = await supabaseAdmin
          .from("notifications")
          .select("id")
          .eq("user_id", userId)
          .eq("type", type)
          .gte("created_at", since)
          .maybeSingle();

        if (!existing?.id) {
          const remaining = Math.max(0, hoursLimit - nextTotal);
          await supabaseAdmin.from("notifications").insert({
            user_id: userId,
            workspace_id: workspaceId,
            type,
            title: "Active Speech is running low",
            body: `You have about ${remaining.toFixed(1)}h left. Consider adding more hours or upgrading your plan.`,
            data: { hours_limit: hoursLimit, hours_used: nextTotal },
          });
        }
      }
    }
  }

  return NextResponse.json({ ok: true });
}

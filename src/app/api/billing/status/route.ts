import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  // Ensure there's a billing_state row.
  const { data: existing, error: readErr } = await supabase
    .from("billing_state")
    .select(
      "workspace_id, plan_id, status, trial_end, current_period_start, current_period_end, lemon_customer_id, lemon_subscription_id, lemon_variant_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, stripe_product_id, cancel_at_period_end"
    )
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (readErr) {
    return NextResponse.json({ error: readErr.message }, { status: 400 });
  }

  if (existing) {
    return NextResponse.json({ billing: existing });
  }

  // Insert defaults using service role so it works even if insert policy changes.
  const { data: inserted, error: insErr } = await supabaseAdmin
    .from("billing_state")
    .insert({ workspace_id: workspaceId, plan_id: "starter", status: "trialing" })
    .select(
      "workspace_id, plan_id, status, trial_end, current_period_start, current_period_end, lemon_customer_id, lemon_subscription_id, lemon_variant_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, stripe_product_id, cancel_at_period_end"
    )
    .single();

  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 400 });
  }

  return NextResponse.json({ billing: inserted });
}

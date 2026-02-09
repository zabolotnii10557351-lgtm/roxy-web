import { supabaseAdmin } from "@/lib/supabase/admin";

export type BillingStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "paused";

export type BillingStateRow = {
  workspace_id: string;
  plan_id: string;
  status: BillingStatus;
  trial_end: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  lemon_customer_id: string | null;
  lemon_subscription_id: string | null;
  lemon_variant_id: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  cancel_at_period_end: boolean;
};

export async function upsertBillingState(params: {
  workspaceId: string;
  patch: Partial<BillingStateRow>;
}) {
  const payload: Partial<BillingStateRow> & { workspace_id: string } = {
    workspace_id: params.workspaceId,
    ...params.patch,
  };

  const { data, error } = await supabaseAdmin
    .from("billing_state")
    .upsert(payload)
    .select(
      "workspace_id, plan_id, status, trial_end, current_period_start, current_period_end, lemon_customer_id, lemon_subscription_id, lemon_variant_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, stripe_product_id, cancel_at_period_end"
    )
    .single();

  if (error) throw new Error(error.message);
  return data as BillingStateRow;
}

export async function findWorkspaceIdByLemonCustomerId(customerId: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from("billing_state")
    .select("workspace_id")
    .eq("lemon_customer_id", customerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.workspace_id ?? null;
}

export async function findWorkspaceIdByStripeCustomerId(customerId: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from("billing_state")
    .select("workspace_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.workspace_id ?? null;
}

export async function ensureQuotaLedgerForPeriod(params: {
  workspaceId: string;
  periodStart: string;
  periodEnd: string;
  quotaType: "openai_active_speech_seconds";
}) {
  const { workspaceId, periodStart, periodEnd, quotaType } = params;

  const { data, error } = await supabaseAdmin
    .from("quota_ledger")
    .select("id")
    .eq("workspace_id", workspaceId)
    .eq("period_start", periodStart)
    .eq("quota_type", quotaType)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (data) return;

  const { error: insertError } = await supabaseAdmin.from("quota_ledger").insert({
    workspace_id: workspaceId,
    period_start: periodStart,
    period_end: periodEnd,
    quota_type: quotaType,
    included_seconds: 0,
    purchased_seconds: 0,
    used_seconds: 0,
  });

  if (insertError) throw new Error(insertError.message);
}

export function getCurrentMonthPeriod(now = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));
  return { start, end };
}

export async function addPurchasedSeconds(params: {
  workspaceId: string;
  amountSeconds: number;
  externalOrderId?: string | null;
}) {
  const { start, end } = getCurrentMonthPeriod();
  const periodStart = start.toISOString();
  const periodEnd = end.toISOString();

  await ensureQuotaLedgerForPeriod({
    workspaceId: params.workspaceId,
    periodStart,
    periodEnd,
    quotaType: "openai_active_speech_seconds",
  });

  // Supabase JS doesn't support arithmetic update; do a select+update.
  const { data, error: selErr } = await supabaseAdmin
    .from("quota_ledger")
    .select("purchased_seconds")
    .eq("workspace_id", params.workspaceId)
    .eq("period_start", periodStart)
    .eq("quota_type", "openai_active_speech_seconds")
    .single();

  if (selErr) throw new Error(selErr.message);

  const next = Number(data?.purchased_seconds ?? 0) + params.amountSeconds;

  const { error: updErr } = await supabaseAdmin
    .from("quota_ledger")
    .update({ purchased_seconds: next })
    .eq("workspace_id", params.workspaceId)
    .eq("period_start", periodStart)
    .eq("quota_type", "openai_active_speech_seconds");

  if (updErr) throw new Error(updErr.message);
}

import type { SupabaseClient } from "@supabase/supabase-js";

type UsageEventParams = {
  supabase: SupabaseClient;
  workspaceId: string;
  userId: string;
  provider: string;
  model?: string | null;
  type: string;
  amount: number;
  unit: string;
  isBillable?: boolean;
  sessionId?: string | null;
};

export async function logUsageEvent(params: UsageEventParams) {
  if (!Number.isFinite(params.amount) || params.amount <= 0) return;

  const { error } = await params.supabase.from("usage_events").insert({
    workspace_id: params.workspaceId,
    user_id: params.userId,
    session_id: params.sessionId ?? null,
    provider: params.provider,
    model: params.model ?? null,
    type: params.type,
    amount: params.amount,
    unit: params.unit,
    is_billable: params.isBillable ?? true,
  });

  if (error) {
    console.warn("Failed to log usage event", error);
  }
}

import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminAuditTargetType =
  | "profile"
  | "pricing_config"
  | "content_block"
  | "waitlist_email"
  | "investor_lead"
  | "contact_message"
  | "release"
  | "other";

export async function writeAdminAuditLog(params: {
  client: SupabaseClient;
  adminUserId: string;
  action: string;
  targetType?: AdminAuditTargetType;
  targetId?: string;
  payload?: unknown;
}) {
  const { error } = await params.client.from("admin_audit_logs").insert({
    admin_user_id: params.adminUserId,
    action: params.action,
    target_type: params.targetType ?? null,
    target_id: params.targetId ?? null,
    payload: (params.payload ?? {}) as never,
  });

  if (error) {
    // Never block admin actions because audit logging failed.
    console.warn("Failed to write admin audit log", error);
  }
}

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireUserAndWorkspace() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: settings, error } = await supabase
    .from("user_settings")
    .select("default_workspace_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  let workspaceId = settings?.default_workspace_id ?? null;
  if (!workspaceId) {
    const { data: ensuredWorkspaceId, error: ensureError } = await supabase.rpc(
      "ensure_user_bootstrap"
    );

    if (ensureError) {
      throw new Error(ensureError.message);
    }

    if (typeof ensuredWorkspaceId === "string" && ensuredWorkspaceId.length > 0) {
      workspaceId = ensuredWorkspaceId;
    }
  }

  if (!workspaceId) {
    throw new Error("No default workspace configured.");
  }

  return { supabase, user, workspaceId };
}

export async function getUserAndWorkspaceOrNull() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, workspaceId: null };
  }

  const { data: settings } = await supabase
    .from("user_settings")
    .select("default_workspace_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { supabase, user, workspaceId: settings?.default_workspace_id ?? null };
}

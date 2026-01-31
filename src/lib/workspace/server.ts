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

  const workspaceId = settings?.default_workspace_id;
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

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

export async function requireAuthenticatedUser() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}

export async function requireAdminUser() {
  const { user, supabase } = await requireAuthenticatedUser();
  const adminEmails = getAdminEmails();
  const isEmailAdmin = user.email
    ? adminEmails.includes(user.email.toLowerCase())
    : false;

  let isRoleAdmin = false;

  if (!isEmailAdmin || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    isRoleAdmin = profile?.role === "admin";
  }

  const isAdmin = isEmailAdmin || isRoleAdmin;

  if (!isAdmin) {
    redirect("/app");
  }

  const adminClient =
    isEmailAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClient()
      : null;

  return { user, supabase, adminClient, isAdmin, isEmailAdmin };
}

export async function assertAdminForAction() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const adminEmails = getAdminEmails();
  const isEmailAdmin = user.email
    ? adminEmails.includes(user.email.toLowerCase())
    : false;

  let isRoleAdmin = false;

  if (!isEmailAdmin || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    isRoleAdmin = profile?.role === "admin";
  }

  const isAdmin = isEmailAdmin || isRoleAdmin;

  if (!isAdmin) {
    throw new Error("Not authorized");
  }

  const adminClient =
    isEmailAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClient()
      : null;

  return { user, supabase, adminClient };
}

import { createClient } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function computeIsAdmin(params: {
  user: { id: string; email?: string | null };
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
}) {
  const adminEmails = getAdminEmails();
  const isEmailAdmin = params.user.email
    ? adminEmails.includes(params.user.email.toLowerCase())
    : false;

  let isRoleAdmin = false;

  if (!isEmailAdmin || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: profile } = await params.supabase
      .from("profiles")
      .select("role")
      .eq("id", params.user.id)
      .maybeSingle();

    isRoleAdmin = profile?.role === "admin";
  }

  return {
    isAdmin: isEmailAdmin || isRoleAdmin,
    isEmailAdmin,
  };
}

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
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}

export async function requireAdminUser() {
  const { user, supabase } = await requireAuthenticatedUser();
  const { isAdmin, isEmailAdmin } = await computeIsAdmin({ user, supabase });

  if (!isAdmin) {
    redirect("/app");
  }

  const adminClient =
    isEmailAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClient()
      : null;

  return { user, supabase, adminClient, isAdmin, isEmailAdmin };
}

export async function requireAdminUserOrNotFound() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { isAdmin, isEmailAdmin } = await computeIsAdmin({ user, supabase });

  if (!isAdmin) {
    notFound();
  }

  const adminClient =
    isEmailAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClient()
      : null;

  return { user, supabase, adminClient, isAdmin, isEmailAdmin };
}

export async function assertAdminForAction() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { isAdmin, isEmailAdmin } = await computeIsAdmin({ user, supabase });

  if (!isAdmin) {
    throw new Error("Not authorized");
  }

  const adminClient =
    isEmailAdmin && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdminClient()
      : null;

  return { user, supabase, adminClient };
}

export async function getIsAdminForCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAdmin: false };
  }

  const { isAdmin } = await computeIsAdmin({ user, supabase });
  return { isAdmin };
}

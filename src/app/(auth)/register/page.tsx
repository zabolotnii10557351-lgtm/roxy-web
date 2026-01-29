import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function registerAction(
  _: { error?: string; success?: string },
  formData: FormData
) {
  "use server";
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect("/app");
  }

  return { success: "Check your email to confirm your account." };
}

export default async function RegisterPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  return (
    <Container className="py-20">
      <div className="flex justify-center">
        <AuthForm
          title="Create your account"
          description="Start with a free trial and download the desktop app."
          action={registerAction}
          submitLabel="Create account"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@company.com",
              autoComplete: "email",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "At least 8 characters",
              autoComplete: "new-password",
            },
          ]}
          footer={
            <span>
              Already have an account?{" "}
              <Link className="text-cyan-300 hover:text-cyan-200" href="/login">
                Sign in
              </Link>
            </span>
          }
        />
      </div>
    </Container>
  );
}

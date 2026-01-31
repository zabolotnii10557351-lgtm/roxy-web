import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import CaptchaField from "@/app/(auth)/_components/CaptchaField";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function registerAction(
  _: { error?: string; success?: string },
  formData: FormData
) {
  "use server";
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const displayName = formData.get("display_name")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const captchaToken = formData.get("captchaToken")?.toString();
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (!displayName) {
    return { error: "Display name is required." };
  }

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (siteKey && !captchaToken) {
    return { error: "Captcha is required." };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      captchaToken: siteKey ? captchaToken : undefined,
      data: {
        display_name: displayName,
        username: username || undefined,
      },
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
  const supabase = await createSupabaseServerClient();
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
          title="Create your RoxStreamAI account"
          description="Start your 7-day Starter trial and set up your streamer."
          action={registerAction}
          submitLabel="Create account"
          fields={[
            {
              name: "display_name",
              label: "Display name",
              type: "text",
              placeholder: "Lia",
              autoComplete: "nickname",
              required: true,
            },
            {
              name: "username",
              label: "Username (optional)",
              type: "text",
              placeholder: "lia_streams",
              autoComplete: "username",
              required: false,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@example.com",
              autoComplete: "email",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Minimum 8 characters",
              autoComplete: "new-password",
            },
          ]}
          extraContent={<CaptchaField />}
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

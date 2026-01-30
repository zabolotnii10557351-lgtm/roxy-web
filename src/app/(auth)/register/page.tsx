import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import CaptchaField from "@/app/(auth)/_components/CaptchaField";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { redirect } from "next/navigation";

async function registerAction(
  _: { error?: string; success?: string },
  formData: FormData
) {
  "use server";
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const captchaToken = formData.get("captchaToken")?.toString();
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!siteKey) {
    return { error: t.auth.captchaMissing };
  }

  if (!captchaToken) {
    return { error: t.auth.captchaRequired };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      captchaToken,
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
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
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
          title={t.auth.createAccount}
          description={t.auth.createAccountDescription}
          action={registerAction}
          submitLabel={t.auth.createAccount}
          fields={[
            {
              name: "email",
              label: t.auth.email,
              type: "email",
              placeholder: t.auth.emailPlaceholder,
              autoComplete: "email",
            },
            {
              name: "password",
              label: t.auth.password,
              type: "password",
              placeholder: t.auth.passwordMin,
              autoComplete: "new-password",
            },
          ]}
          extraContent={<CaptchaField />}
          footer={
            <span>
              {t.auth.alreadyHaveAccount}{" "}
              <Link className="text-cyan-300 hover:text-cyan-200" href="/login">
                {t.common.signIn}
              </Link>
            </span>
          }
        />
      </div>
    </Container>
  );
}

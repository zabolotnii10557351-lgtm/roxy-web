import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import CaptchaField from "@/app/(auth)/_components/CaptchaField";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { redirect } from "next/navigation";

async function loginAction(
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
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken,
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("captcha")) {
      return { error: t.auth.captchaError };
    }
    return { error: error.message };
  }

  redirect("/app");
}

export default async function LoginPage() {
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
          title={t.auth.welcomeBack}
          description={t.auth.signInDescription}
          action={loginAction}
          submitLabel={t.common.signIn}
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
              placeholder: t.auth.passwordPlaceholder,
              autoComplete: "current-password",
            },
          ]}
          extraContent={<CaptchaField />}
          footer={
            <div className="flex flex-col gap-2">
              <Link className="text-white hover:text-white" href="/reset">
                {t.auth.forgotPassword}
              </Link>
              <span>
                {t.auth.newHere}{" "}
                <Link className="text-cyan-300 hover:text-cyan-200" href="/register">
                  {t.auth.createAccount}
                </Link>
              </span>
            </div>
          }
        />
      </div>
    </Container>
  );
}

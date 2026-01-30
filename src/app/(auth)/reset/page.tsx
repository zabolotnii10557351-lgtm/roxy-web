import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { redirect } from "next/navigation";

async function resetAction(
  _: { error?: string; success?: string },
  formData: FormData
) {
  "use server";
  const email = formData.get("email")?.toString().trim();

  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password reset link sent. Check your inbox." };
}

export default async function ResetPage() {
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
          title={t.auth.resetPassword}
          description={t.auth.resetDescription}
          action={resetAction}
          submitLabel={t.auth.resetPassword}
          fields={[
            {
              name: "email",
              label: t.auth.email,
              type: "email",
              placeholder: t.auth.emailPlaceholder,
              autoComplete: "email",
            },
          ]}
          footer={
            <span>
              {t.auth.backToSignIn}{" "}
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

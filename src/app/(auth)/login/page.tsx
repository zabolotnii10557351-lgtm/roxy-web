import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import CaptchaField from "@/app/(auth)/_components/CaptchaField";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function safeReturnTo(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  if (value.includes("\n") || value.includes("\r")) return null;
  return value;
}

async function loginAction(
  _: { error?: string; success?: string },
  formData: FormData
) {
  "use server";
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const returnTo = safeReturnTo(formData.get("returnTo"));
  const captchaToken = formData.get("captchaToken")?.toString();
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (siteKey && !captchaToken) {
    return { error: "Captcha is required." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken: siteKey ? captchaToken : undefined,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(returnTo ?? "/app");
}

export default async function LoginPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const returnTo = safeReturnTo(searchParams.returnTo);

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
          title="Welcome back"
          description="Sign in to manage characters, usage, and your desktop connection."
          action={loginAction}
          submitLabel="Sign in"
          hiddenFields={returnTo ? { returnTo } : undefined}
          fields={[
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
              placeholder: "••••••••",
              autoComplete: "current-password",
            },
          ]}
          extraContent={<CaptchaField />}
          footer={
            <div className="flex flex-col gap-2">
              <Link className="text-white hover:text-white" href="/reset">
                Forgot password?
              </Link>
              <span>
                New here?{" "}
                <Link className="text-cyan-300 hover:text-cyan-200" href="/register">
                  Create account
                </Link>
              </span>
            </div>
          }
        />
      </div>
    </Container>
  );
}

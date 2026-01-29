import Link from "next/link";
import Container from "@/components/Container";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function loginAction(
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
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/app");
}

export default async function LoginPage() {
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
          title="Welcome back"
          description="Sign in to access your dashboard and downloads."
          action={loginAction}
          submitLabel="Sign in"
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
              placeholder: "••••••••",
              autoComplete: "current-password",
            },
          ]}
          footer={
            <div className="flex flex-col gap-2">
              <Link className="text-white hover:text-white" href="/reset">
                Forgot password?
              </Link>
              <span>
                New here?{" "}
                <Link className="text-cyan-300 hover:text-cyan-200" href="/register">
                  Create an account
                </Link>
              </span>
            </div>
          }
        />
      </div>
    </Container>
  );
}

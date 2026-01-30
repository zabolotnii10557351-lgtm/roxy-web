"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function BillingSuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      attempts += 1;
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, status")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.plan && profile?.status === "active") {
        setStatus("Payment confirmed. Redirecting...");
        router.push("/app/billing");
        return;
      }

      if (attempts >= maxAttempts) {
        setStatus("We are still processing your payment. Please refresh later.");
        return;
      }

      setTimeout(poll, 2000);
    };

    poll();
  }, [router]);

  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      <h1 className="text-2xl font-semibold text-white">Payment received</h1>
      <p className="text-sm text-white/70">{status}</p>
      <div className="flex items-center justify-center gap-3">
        <Button href="/app">Go to dashboard</Button>
        <Button href="/app/billing" variant="secondary">
          Billing
        </Button>
      </div>
    </div>
  );
}

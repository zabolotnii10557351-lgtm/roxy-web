"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

type BillingStatusResponse = {
  billing?: {
    workspace_id: string;
    plan_id: string;
    status: string;
    lemon_customer_id: string | null;
    lemon_subscription_id: string | null;
  };
  error?: string;
};

export default function BillingSuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      attempts += 1;
      const res = await fetch("/api/billing/status", { cache: "no-store" });

      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        router.push("/login");
        return;
      }

      const json = (await res.json().catch(() => null)) as BillingStatusResponse | null;
      if (!json || !res.ok) {
        setStatus(json?.error ?? "We are still processing your payment. Please refresh later.");
        return;
      }

      const billing = json.billing;
      if (billing?.lemon_subscription_id) {
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

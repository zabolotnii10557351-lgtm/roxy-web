"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import { useTranslations } from "@/i18n/client";

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
  const t = useTranslations();
  const [status, setStatus] = useState(() => t.app.billingSuccessVerifying);

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
        setStatus(json?.error ?? t.app.billingSuccessProcessing);
        return;
      }

      const billing = json.billing;
      if (billing?.lemon_subscription_id) {
        setStatus(t.app.billingSuccessConfirmedRedirecting);
        router.push("/app/billing");
        return;
      }

      if (attempts >= maxAttempts) {
        setStatus(t.app.billingSuccessProcessing);
        return;
      }

      setTimeout(poll, 2000);
    };

    poll();
  }, [router, t.app.billingSuccessConfirmedRedirecting, t.app.billingSuccessProcessing]);

  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      <h1 className="text-2xl font-semibold text-white">{t.app.billingSuccessTitle}</h1>
      <p className="text-sm text-white/70">{status}</p>
      <p className="text-xs text-white/60">
        Regulamin i wzór formularza odstąpienia od umowy znajdziesz w
        {" "}
        <Link className="underline" href="/terms">Terms & Conditions</Link>.
        {" "}
        Polityka prywatności:
        {" "}
        <Link className="underline" href="/privacy">Privacy Policy</Link>.
        {" "}
        The Terms and withdrawal form are available in
        {" "}
        <Link className="underline" href="/terms">Terms & Conditions</Link>,
        {" "}
        and the privacy policy is available in
        {" "}
        <Link className="underline" href="/privacy">Privacy Policy</Link>.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button href="/app">{t.app.billingSuccessGoToDashboard}</Button>
        <Button href="/app/billing" variant="secondary">
          {t.app.billing}
        </Button>
      </div>
    </div>
  );
}

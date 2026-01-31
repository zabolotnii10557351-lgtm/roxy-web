"use client";

import Button from "@/components/Button";

export default function BillingCancelPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      <h1 className="text-2xl font-semibold text-white">Checkout canceled</h1>
      <p className="text-sm text-white/70">
        No worries — you can restart checkout anytime.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button href="/app/billing">Back to billing</Button>
        <Button href="/pricing" variant="secondary">
          View plans
        </Button>
      </div>
    </div>
  );
}

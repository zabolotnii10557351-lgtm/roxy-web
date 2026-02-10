"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

interface ReferralStatus {
  code: string | null;
  referralLink?: string;
  signups?: Array<{
    id: string;
    created_at: string;
    referred_email: string;
  }>;
  redemptions?: Array<{
    id: string;
    created_at: string;
    plan_id: string;
    is_qualifying: boolean;
    claimed_at: string | null;
    referred_email: string;
  }>;
  totals?: {
    signups: number;
    purchases: number;
    qualifying: number;
    unclaimedQualifying: number;
    claimableBatches: number;
  };
}

export default function ReferralsPage() {
  const t = useTranslations();
  const [status, setStatus] = useState<ReferralStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    const res = await fetch("/api/referrals/status");
    const json = (await res.json().catch(() => null)) as ReferralStatus | null;
    setStatus(json ?? null);
    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleCreate = async () => {
    setError(null);
    setActionLoading(true);
    try {
      const res = await fetch("/api/referrals/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput }),
      });
      const json = (await res.json().catch(() => null)) as
        | { code?: string; referralLink?: string; error?: string }
        | null;
      if (!res.ok) {
        setError(json?.error ?? "Unable to create code.");
        setActionLoading(false);
        return;
      }
      setCodeInput(json?.code ?? "");
      await loadStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create code.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleClaim = async () => {
    setError(null);
    setActionLoading(true);
    try {
      const res = await fetch("/api/referrals/claim", { method: "POST" });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(json?.error ?? "Unable to claim bonus.");
        setActionLoading(false);
        return;
      }
      await loadStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to claim bonus.");
    } finally {
      setActionLoading(false);
    }
  };

  const canClaim = useMemo(() => {
    return Boolean(status?.totals?.claimableBatches && status.totals.claimableBatches > 0);
  }, [status]);

  const copyLink = async () => {
    if (!status?.referralLink) return;
    await navigator.clipboard.writeText(status.referralLink);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.referrals}</h2>
        <p className="text-sm text-white/60">
          {t.app.referralInviteSubtitle}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 text-sm text-white/80">
        <h3 className="text-lg font-semibold text-white">{t.app.referralHowTitle}</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/70">
          <li>{t.app.referralHowLine1}</li>
          <li>{t.app.referralHowLine2}</li>
          <li>{t.app.referralHowLine3}</li>
          <li>{t.app.referralHowLine4}</li>
        </ul>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.referralPromoTitle}</h3>
          {loading ? (
            <p className="mt-4 text-sm text-white/60">{t.common.loading}</p>
          ) : status?.code ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                {status.code}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                {status.referralLink}
              </div>
              <Button variant="secondary" onClick={copyLink}>
                {t.app.referralPromoCopy}
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder={t.app.referralPromoPlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
              />
              <Button onClick={handleCreate} disabled={actionLoading}>
                {actionLoading ? t.common.saving : t.app.referralPromoCreate}
              </Button>
            </div>
          )}
          {error ? <p className="mt-3 text-xs text-rose-200">{error}</p> : null}
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.referralBonusTitle}</h3>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>Signups: {status?.totals?.signups ?? 0}</div>
            <div>Purchases: {status?.totals?.purchases ?? 0}</div>
            <div>Qualifying purchases: {status?.totals?.qualifying ?? 0}</div>
            <div>Unclaimed qualifying: {status?.totals?.unclaimedQualifying ?? 0}</div>
          </div>
          <Button
            className="mt-4 w-full"
            onClick={handleClaim}
            disabled={!canClaim || actionLoading}
          >
            {actionLoading ? t.common.saving : t.app.referralBonusClaim}
          </Button>
          {!canClaim ? (
            <p className="mt-2 text-xs text-white/60">
              {t.app.referralBonusNeed}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.referralRegistrationsTitle}</h3>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            {(status?.signups ?? []).length === 0 ? (
              <p>{t.app.referralNoSignups}</p>
            ) : (
              status?.signups?.map((row) => (
                <div key={row.id} className="flex items-center justify-between">
                  <span>{row.referred_email || "New user"}</span>
                  <span className="text-xs text-white/50">
                    {new Date(row.created_at).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.referralPurchasesTitle}</h3>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            {(status?.redemptions ?? []).length === 0 ? (
              <p>{t.app.referralNoPurchases}</p>
            ) : (
              status?.redemptions?.map((row) => (
                <div key={row.id} className="flex items-center justify-between">
                  <div>
                    <div>{row.referred_email || "Subscriber"}</div>
                    <div className="text-xs text-white/50">{row.plan_id}</div>
                  </div>
                  <div className="text-right text-xs text-white/50">
                    <div>{row.is_qualifying ? "Qualifying" : "Starter"}</div>
                    <div>{new Date(row.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

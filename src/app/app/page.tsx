"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import ToastList from "@/components/ToastList";
import Badge from "@/components/Badge";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function OverviewPage() {
  const {
    planId,
    isAccessBlocked,
    hoursRemaining,
    hoursLimit,
    isTrialExpired,
  } = usePlan();
  const t = useTranslations();

  const { workspaceId, loading: workspaceLoading } = useCurrentWorkspace();
  const [characterCount, setCharacterCount] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [referralLoading, setReferralLoading] = useState(false);
  const [referralError, setReferralError] = useState<string | null>(null);

  useEffect(() => {
    if (workspaceLoading) return;
    if (!workspaceId) {
      setCharacterCount(null);
      return;
    }

    let cancelled = false;

    (async () => {
      const supabase = createSupabaseBrowserClient();
      const { count } = await supabase
        .from("characters")
        .select("id", { count: "exact", head: true })
        .eq("workspace_id", workspaceId);

      if (cancelled) return;
      setCharacterCount(typeof count === "number" ? count : null);
    })();

    return () => {
      cancelled = true;
    };
  }, [workspaceId, workspaceLoading]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await fetch("/api/referrals/status");
      if (!res.ok) return;
      const json = (await res.json().catch(() => null)) as
        | { code?: string | null; referralLink?: string }
        | null;
      if (cancelled) return;
      if (json?.code) {
        setReferralCode(String(json.code));
        setReferralLink(String(json.referralLink ?? ""));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const createReferralCode = async () => {
    if (!referralCode) return;
    setReferralError(null);
    setReferralLoading(true);
    try {
      const res = await fetch("/api/referrals/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: referralCode }),
      });
      const json = (await res.json().catch(() => null)) as
        | { code?: string; referralLink?: string; error?: string }
        | null;
      if (!res.ok) {
        setReferralError(json?.error ?? "Unable to create code.");
      } else {
        setReferralCode(String(json?.code ?? referralCode));
        setReferralLink(String(json?.referralLink ?? ""));
      }
    } finally {
      setReferralLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.overview}</h2>
          <p className="text-sm text-white/60">
            {t.app.overviewSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>
            {t.app.currentPlan}: {planId.toUpperCase()}
          </Badge>
          <Button variant="secondary" href="/app/billing">
            {t.app.managePlan}
          </Button>
          {isAccessBlocked ? (
            <Button variant="secondary" href="/app/billing">
              {t.app.upgradeRequired}
            </Button>
          ) : (
            <Button variant="secondary">
              {t.app.startSession}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label={t.app.currentPlan}
          value={planId.toUpperCase()}
          helper={t.app.managePlan}
        />
        <StatCard
          label={t.app.characters}
          value={characterCount === null ? "—" : String(characterCount)}
          helper={t.app.charactersSubtitle}
        />
        <StatCard
          label={t.app.remainingHours}
          value={
            hoursLimit === null
              ? "∞"
              : `${hoursRemaining?.toFixed(1) ?? "0.0"}h / ${hoursLimit}h`
          }
          helper={hoursLimit === null ? t.app.unlimitedHours : undefined}
        />
      </div>

      {hoursLimit !== null ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          {t.app.remainingHours}: {hoursRemaining?.toFixed(1)}h / {hoursLimit}h
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.quickActions}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Button variant="secondary" href="/app/dono-engine" disabled={isAccessBlocked}>
              {t.app.setupDonoRules}
            </Button>
            <Button variant="secondary" href="/app/referrals" disabled={isAccessBlocked}>
              {t.app.generateShareLink}
            </Button>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">{t.app.referralProgramTitle}</p>
            <p className="mt-2">
              {t.app.referralProgramBody}
            </p>
            {referralLink ? (
              <div className="mt-3 space-y-2">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white">
                  Code: {referralCode}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
                  {referralLink}
                </div>
                <Button variant="secondary" href="/app/referrals">
                  {t.app.referralProgramManage}
                </Button>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                <input
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder={t.app.referralPromoPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                />
                <Button variant="secondary" onClick={createReferralCode} disabled={referralLoading}>
                  {referralLoading ? t.common.saving : t.app.referralPromoCreate}
                </Button>
                {referralError ? (
                  <p className="text-xs text-rose-200">{referralError}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.systemToastsTitle}</h3>
          <p className="mt-2 text-xs text-white/60">
            {t.app.systemToastsSubtitle}
          </p>
          <div className="mt-4">
            <ToastList />
          </div>
        </div>
      </div>
    </div>
  );
}

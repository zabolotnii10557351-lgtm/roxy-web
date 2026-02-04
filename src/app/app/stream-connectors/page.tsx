"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import FeatureLock from "@/components/FeatureLock";
import { isPlanAtLeast } from "@/lib/plans";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";

type ConnectorRow = {
  id: string;
  provider: "tiktok" | "twitch" | "youtube";
  status: string;
  config?: {
    account?: string;
    url?: string;
    is_active?: boolean;
  } | null;
};

function ConnectorCard(props: {
  title: string;
  provider: "tiktok" | "twitch" | "youtube";
  description: string;
  connectors: ConnectorRow[];
  onCreate: (provider: ConnectorRow["provider"], account: string, url: string) => void;
  onActivate: (id: string) => void;
  busy: boolean;
  error: string | null;
}) {
  const [account, setAccount] = useState("");
  const [url, setUrl] = useState("");

  const providerConnectors = useMemo(
    () => props.connectors.filter((c) => c.provider === props.provider),
    [props.connectors, props.provider]
  );

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{props.title}</h3>
        <Badge variant="outline">{props.provider}</Badge>
      </div>
      <p className="mt-3 text-sm text-white/70">{props.description}</p>

      <div className="mt-4 grid gap-3">
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          placeholder="Username or channel"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          placeholder="Profile URL (optional)"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              props.onCreate(props.provider, account, url);
              setAccount("");
              setUrl("");
            }}
            disabled={props.busy || account.trim().length === 0}
          >
            Save account
          </Button>
        </div>
        {props.error ? (
          <p className="text-xs text-rose-200/80">{props.error}</p>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        {providerConnectors.length === 0 ? (
          <p className="text-xs text-white/50">No accounts saved yet.</p>
        ) : (
          providerConnectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => props.onActivate(connector.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-2 text-xs transition ${
                connector.config?.is_active
                  ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              <span>{connector.config?.account ?? "(unknown)"}</span>
              <span>{connector.config?.is_active ? "Active" : "Set active"}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default function StreamConnectorsPage() {
  const { planId, isAccessBlocked } = usePlan();
  const t = useTranslations();
  const proUnlocked = isPlanAtLeast(planId, "pro") && !isAccessBlocked;

  const [connectors, setConnectors] = useState<ConnectorRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConnectors = async () => {
    setError(null);
    const res = await fetch("/api/connectors");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load connectors");
      return;
    }
    setConnectors((json?.items ?? []) as ConnectorRow[]);
  };

  useEffect(() => {
    void loadConnectors();
  }, []);

  const handleCreate = async (provider: ConnectorRow["provider"], account: string, url: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/connectors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, account, url, setActive: true }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to save account");
      setBusy(false);
      return;
    }

    await loadConnectors();
    setBusy(false);
  };

  const handleActivate = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/connectors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, setActive: true }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to activate account");
      setBusy(false);
      return;
    }

    await loadConnectors();
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.connectors}</h2>
        <p className="text-sm text-white/60">
          {t.app.connectorsSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ConnectorCard
          title="TikTok Live"
          provider="tiktok"
          description={t.app.connectorsTiktokDescription}
          connectors={connectors}
          onCreate={handleCreate}
          onActivate={handleActivate}
          busy={busy}
          error={error}
        />
        <ConnectorCard
          title="Twitch"
          provider="twitch"
          description={t.app.connectorsJoinWaitlist}
          connectors={connectors}
          onCreate={handleCreate}
          onActivate={handleActivate}
          busy={busy}
          error={error}
        />
        <ConnectorCard
          title="YouTube Live"
          provider="youtube"
          description={t.app.connectorsEarlyAccessNote}
          connectors={connectors}
          onCreate={handleCreate}
          onActivate={handleActivate}
          busy={busy}
          error={error}
        />
      </div>

      <FeatureLock
        title={t.app.connectorsMultiAccountTitle}
        description={t.app.connectorsMultiAccountDescription}
        locked={!proUnlocked}
      >
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            {t.app.connectorsMultiAccountTitle}
          </h3>
          <p className="text-sm text-white/70">
            {t.app.connectorsMultiAccountBody}
          </p>
          <div className="grid gap-3 text-xs text-white/70 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              {t.app.connectorsExampleRotationWindow}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              {t.app.connectorsExampleMaxSessionsPerDay}
            </div>
          </div>
        </div>
      </FeatureLock>
    </div>
  );
}

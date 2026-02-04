"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ConnectorRow = {
  id: string;
  provider: string;
  config?: { account?: string; is_active?: boolean };
};

type CharacterRow = { id: string; name: string | null };

type DeploySessionRow = {
  id: string;
  token: string;
  status: string;
  character_id: string | null;
  created_at: string;
};

const steps = [
  "Choose OBS scene",
  "Add Browser Source",
  "Paste your overlay URL",
  "Start your session",
];

export default function DeployPage() {
  const t = useTranslations();
  const [connectors, setConnectors] = useState<ConnectorRow[]>([]);
  const [connectorsError, setConnectorsError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<CharacterRow[]>([]);
  const [deploySessions, setDeploySessions] = useState<DeploySessionRow[]>([]);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  const loadConnectors = useCallback(async () => {
    setConnectorsError(null);
    const res = await fetch("/api/connectors");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setConnectorsError(json?.error ?? "Failed to load connectors");
      return;
    }
    setConnectors((json?.items ?? []) as ConnectorRow[]);
  }, []);

  const loadCharacters = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("characters")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (error) {
      setDeployError(error.message);
      return;
    }

    const rows = (data ?? []) as CharacterRow[];
    setCharacters(rows);
    setSelectedCharacterId((prev) => prev ?? (rows.length > 0 ? rows[0].id : null));
  }, []);

  const loadDeploySessions = useCallback(async () => {
    setDeployError(null);
    const res = await fetch("/api/deploy-sessions");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setDeployError(json?.error ?? "Failed to load share links");
      return;
    }
    setDeploySessions((json?.items ?? []) as DeploySessionRow[]);
  }, []);

  const setActive = async (id: string) => {
    const res = await fetch("/api/connectors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, setActive: true }),
    });
    if (res.ok) {
      await loadConnectors();
    }
  };

  useEffect(() => {
    void loadConnectors();
    void loadCharacters();
    void loadDeploySessions();
    setBaseUrl(window.location.origin);
  }, [loadConnectors, loadCharacters, loadDeploySessions]);

  const providers = ["tiktok", "twitch", "youtube"] as const;
  const latestSession = useMemo(() => deploySessions[0], [deploySessions]);
  const overlayUrl = latestSession && baseUrl
    ? `${baseUrl}/overlay/${latestSession.token}`
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.deploy}</h2>
        <p className="text-sm text-white/60">
          {t.app.deploySubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Deployment flow</h3>
          <ol className="mt-4 space-y-3 text-sm text-white/70">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={async () => {
                setBusy(true);
                setDeployError(null);
                const res = await fetch("/api/deploy-sessions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ characterId: selectedCharacterId ?? undefined }),
                });
                const json = await res.json().catch(() => null);
                if (!res.ok) {
                  setDeployError(json?.error ?? "Failed to generate share link");
                  setBusy(false);
                  return;
                }
                await loadDeploySessions();
                setBusy(false);
              }}
              disabled={busy || characters.length === 0}
            >
              {t.app.generateShareLink}
            </Button>
            <Button variant="secondary" href="/docs/obs">
              {t.nav.docs}
            </Button>
          </div>
          {deployError ? (
            <p className="mt-3 text-xs text-rose-200/80">{deployError}</p>
          ) : null}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Overlay character</h4>
            {characters.length === 0 ? (
              <p className="mt-2 text-xs text-white/50">No characters available.</p>
            ) : (
              <select
                value={selectedCharacterId ?? ""}
                onChange={(e) => setSelectedCharacterId(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                {characters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name?.trim() ? c.name : "Untitled character"}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Active accounts</h4>
            {connectorsError ? (
              <p className="mt-2 text-xs text-rose-200/80">{connectorsError}</p>
            ) : null}
            <div className="mt-3 grid gap-3">
              {providers.map((provider) => {
                const items = connectors.filter((c) => c.provider === provider);
                return (
                  <div key={provider} className="rounded-2xl border border-white/10 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">{provider}</p>
                    <div className="mt-2 grid gap-2">
                      {items.length === 0 ? (
                        <span className="text-xs text-white/50">No accounts saved.</span>
                      ) : (
                        items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-xs transition ${
                              item.config?.is_active
                                ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-100"
                                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            <span>{item.config?.account ?? "(unknown)"}</span>
                            <span>{item.config?.is_active ? "Active" : "Set active"}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Session status</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Overlay URL: {overlayUrl ?? "Not generated yet"}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Status: {latestSession?.status ?? t.common.preview}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Last publish: {latestSession?.created_at ?? "—"}
            </div>
          </div>
          {overlayUrl ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" href={overlayUrl}>
                Open overlay
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

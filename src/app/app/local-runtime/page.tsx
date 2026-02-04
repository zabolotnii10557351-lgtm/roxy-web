"use client";

import { useEffect, useState } from "react";
import DesktopOnlyGate from "@/components/DesktopOnlyGate";
import Button from "@/components/Button";

type RuntimeStatus = {
  workspace_id: string;
  status: "online" | "offline" | "error";
  version?: string | null;
  last_seen?: string | null;
  payload?: Record<string, unknown> | null;
  updated_at?: string | null;
};

export default function LocalRuntimePage() {
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadStatus = async () => {
    setError(null);
    const res = await fetch("/api/runtime/status");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load runtime status");
      return;
    }
    setStatus(json?.item ?? null);
  };

  useEffect(() => {
    void loadStatus();
    const id = setInterval(() => void loadStatus(), 15_000);
    return () => clearInterval(id);
  }, []);

  const sendHeartbeat = async () => {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/runtime/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "online", version: "desktop-preview" }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to send heartbeat");
      setBusy(false);
      return;
    }
    setStatus(json?.item ?? null);
    setBusy(false);
  };

  return (
    <DesktopOnlyGate title="Local Runtime">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Local Runtime</h2>
          <p className="mt-2 text-sm text-white/60">
            Desktop-only tools for connecting your RoxStreamAI dashboard to a local runtime.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Status: {status?.status ?? "offline"}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Version: {status?.version ?? "—"}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Last seen: {status?.last_seen ?? "—"}
            </div>
          </div>
          {error ? <p className="mt-3 text-xs text-rose-200/80">{error}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={loadStatus} disabled={busy}>
              Refresh
            </Button>
            <Button variant="ghost" onClick={sendHeartbeat} disabled={busy}>
              Send test heartbeat
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <p className="mt-2 text-sm text-white/70">
            Point the desktop runtime to /api/runtime/status for heartbeats and /api/runtime/logs for diagnostics.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: Desktop Mode required.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

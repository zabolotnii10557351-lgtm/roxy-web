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

type RuntimeLog = {
  id: string;
  level: string;
  message: string;
  payload?: Record<string, unknown> | null;
  created_at: string;
};

export default function DiagnosticsPage() {
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [logs, setLogs] = useState<RuntimeLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadStatus = async () => {
    const res = await fetch("/api/runtime/status");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load runtime status");
      return;
    }
    setStatus(json?.item ?? null);
  };

  const loadLogs = async () => {
    const res = await fetch("/api/runtime/logs?limit=50");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load runtime logs");
      return;
    }
    setLogs((json?.items ?? []) as RuntimeLog[]);
  };

  useEffect(() => {
    void loadStatus();
    void loadLogs();
    const id = setInterval(() => {
      void loadStatus();
      void loadLogs();
    }, 20_000);
    return () => clearInterval(id);
  }, []);

  const refreshAll = async () => {
    setBusy(true);
    setError(null);
    await Promise.all([loadStatus(), loadLogs()]);
    setBusy(false);
  };

  return (
    <DesktopOnlyGate title="Diagnostics">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Diagnostics</h2>
          <p className="mt-2 text-sm text-white/60">
            Desktop-only diagnostics for troubleshooting local runtime and connectors.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Status</h3>
            <Button variant="secondary" onClick={refreshAll} disabled={busy}>
              Refresh
            </Button>
          </div>
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
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Logs</h3>
          <div className="mt-4 space-y-2">
            {logs.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                No logs yet.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.2em] text-white/40">
                      {log.level}
                    </span>
                    <span>{log.created_at}</span>
                  </div>
                  <div className="mt-2 text-sm text-white">{log.message}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: Desktop Mode required.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

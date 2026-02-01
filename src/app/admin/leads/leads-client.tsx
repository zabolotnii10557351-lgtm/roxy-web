"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "@/i18n/client";

type Kind = "waitlist" | "contact" | "investors";

type LeadRow = Record<string, unknown> & {
  id?: string | number | null;
};

export default function AdminLeadsClient() {
  const t = useTranslations();

  const [kind, setKind] = useState<Kind>("waitlist");
  const [items, setItems] = useState<LeadRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const formatError = useCallback(
    (err: unknown) => {
      if (err instanceof Error) return err.message;
      return t.admin.errorUnknown;
    },
    [t],
  );

  const exportUrl = useMemo(() => {
    const url = new URL("/api/admin/leads/export", window.location.origin);
    url.searchParams.set("kind", kind);
    return url.toString();
  }, [kind]);

  const load = useCallback(async (nextKind: Kind) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads/${nextKind}?limit=500`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const json = (await res.json()) as { items: LeadRow[] };
      setItems(json.items ?? []);
    } catch (e) {
      setError(formatError(e));
    } finally {
      setBusy(false);
    }
  }, [formatError]);

  useEffect(() => {
    void load(kind);
  }, [kind, load]);

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {([
            { id: "waitlist", label: t.admin.leadsWaitlist },
            { id: "contact", label: t.admin.leadsContact },
            { id: "investors", label: t.admin.leadsInvestors },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setKind(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                kind === tab.id
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={exportUrl}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
          >
            {t.admin.buttonExportCsv}
          </a>
          <button
            onClick={() => void load(kind)}
            disabled={busy}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
          >
            {t.admin.buttonRefresh}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/50">
          {t.admin.leadsShowingRows.replace("{count}", String(items.length))}
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-white/50">
              <tr>
                {(Object.keys(items[0] ?? {}) as string[]).slice(0, 8).map((key) => (
                  <th key={key} className="px-4 py-3">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((row, idx) => (
                <tr
                  key={
                    typeof row.id === "string" || typeof row.id === "number"
                      ? String(row.id)
                      : String(idx)
                  }
                  className="text-white/80"
                >
                  {(Object.keys(items[0] ?? {}) as string[]).slice(0, 8).map((key) => (
                    <td key={key} className="px-4 py-3 align-top">
                      {String(row[key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="px-4 py-6 text-white/60">{t.admin.leadsNoLeads}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

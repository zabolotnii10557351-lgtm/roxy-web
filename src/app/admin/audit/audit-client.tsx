"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "@/i18n/client";

type AuditRow = {
  id: string;
  admin_user_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  payload: unknown;
  created_at: string;
};

export default function AdminAuditClient() {
  const { locale } = useLocale();
  const t = useTranslations();

  const [items, setItems] = useState<AuditRow[]>([]);
  const [action, setAction] = useState("");
  const [targetType, setTargetType] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const formatError = (err: unknown) => {
    if (err instanceof Error) return err.message;
    return t.admin.errorUnknown;
  };

  async function load() {
    setBusy(true);
    setError(null);

    try {
      const url = new URL("/api/admin/audit", window.location.origin);
      url.searchParams.set("limit", "200");
      if (action.trim()) url.searchParams.set("action", action.trim());
      if (targetType.trim()) url.searchParams.set("target_type", targetType.trim());

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const json = (await res.json()) as { items: AuditRow[] };
      setItems(json.items ?? []);
    } catch (e) {
      setError(formatError(e));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder={t.admin.auditFilterActionPlaceholder}
          className="w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <input
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
          placeholder={t.admin.auditFilterTargetTypePlaceholder}
          className="w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <button
          onClick={() => void load()}
          disabled={busy}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
        >
          {t.admin.buttonRefresh}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/50">
          {t.admin.auditShowingEntries.replace("{count}", String(items.length))}
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-4 py-3">{t.admin.auditTime}</th>
                <th className="px-4 py-3">{t.admin.auditAction}</th>
                <th className="px-4 py-3">{t.admin.auditTarget}</th>
                <th className="px-4 py-3">{t.admin.auditPayload}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((row) => (
                <tr key={row.id} className="text-white/80">
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    {new Date(row.created_at).toLocaleString(locale)}
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-xs">
                    {row.action}
                  </td>
                  <td className="px-4 py-3 align-top text-xs">
                    <div>{row.target_type ?? "—"}</div>
                    <div className="text-white/50">{row.target_id ?? "—"}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <pre className="max-w-[720px] whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-[#0A0F1A] p-3 text-xs text-white/70">
                      {JSON.stringify(row.payload ?? {}, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="px-4 py-6 text-white/60" colSpan={4}>
                    {t.admin.auditNoEntries}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ContentRow = {
  id: string;
  key: string;
  locale: string;
  markdown: string;
  is_published: boolean;
  updated_at: string | null;
  updated_by: string | null;
};

function formatError(err: unknown) {
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export default function AdminContentClient() {
  const [items, setItems] = useState<ContentRow[]>([]);
  const [q, setQ] = useState("");
  const [locale, setLocale] = useState("en");
  const [selected, setSelected] = useState<ContentRow | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [published, setPublished] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const url = new URL("/api/admin/content", window.location.origin);
    if (q.trim()) url.searchParams.set("q", q.trim());
    if (locale.trim()) url.searchParams.set("locale", locale.trim());

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const json = (await res.json()) as { items: ContentRow[] };
    setItems(json.items ?? []);

    if (selected) {
      const updated = (json.items ?? []).find(
        (i) => i.key === selected.key && i.locale === selected.locale,
      );
      if (updated) {
        setSelected(updated);
        setMarkdown(updated.markdown ?? "");
        setPublished(Boolean(updated.is_published));
      }
    }
  }

  useEffect(() => {
    void load().catch((e) => setError(formatError(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, ContentRow[]>();
    for (const row of items) {
      const group = row.key.split(".")[0] ?? "other";
      map.set(group, [...(map.get(group) ?? []), row]);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  async function save() {
    setBusy(true);
    setError(null);

    try {
      if (!selected) {
        throw new Error("Select a block to edit");
      }

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: selected.key,
          locale: selected.locale,
          markdown,
          is_published: published,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await load();
    } catch (e) {
      setError(formatError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search keys or text…"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            <option value="en">en</option>
            <option value="ru">ru</option>
          </select>
          <button
            onClick={() => void load().catch((e) => setError(formatError(e)))}
            disabled={busy}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {grouped.map(([group, rows]) => (
            <div key={group}>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                {group}
              </p>
              <div className="mt-2 space-y-1">
                {rows.map((row) => {
                  const isSelected =
                    selected?.key === row.key && selected?.locale === row.locale;
                  return (
                    <button
                      key={`${row.key}:${row.locale}`}
                      onClick={() => {
                        setSelected(row);
                        setMarkdown(row.markdown ?? "");
                        setPublished(Boolean(row.is_published));
                        setError(null);
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                        isSelected
                          ? "border-white/20 bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-semibold text-white/90">
                          {row.key}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                            row.is_published
                              ? "bg-emerald-500/20 text-emerald-200"
                              : "bg-white/10 text-white/60"
                          }`}
                        >
                          {row.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-white/40">
                        {row.locale} • {row.updated_at ? new Date(row.updated_at).toLocaleString() : "—"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!items.length ? (
            <p className="text-sm text-white/60">No content blocks yet.</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Editor
              </p>
              <p className="text-sm text-white/80">
                {selected ? `${selected.key} (${selected.locale})` : "Select a block"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-white/5"
                />
                Published
              </label>
              <button
                onClick={() => void save()}
                disabled={busy || !selected}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Markdown
              </p>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                rows={18}
                className="w-full rounded-2xl border border-white/10 bg-[#0A0F1A] p-4 font-mono text-xs text-white/80"
                placeholder="# Title\n\nYour content…"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Preview
              </p>
              <div className="prose prose-invert max-w-none rounded-2xl border border-white/10 bg-[#0A0F1A] p-4 text-white/80">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

interface NotificationRow {
  id: string;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const t = useTranslations();
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/notifications?limit=25");
    const json = (await res.json().catch(() => null)) as
      | { notifications?: NotificationRow[] }
      | null;
    setItems(json?.notifications ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const markAllRead = async () => {
    setActionLoading(true);
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readAll: true }),
    });
    await load();
    setActionLoading(false);
  };

  const markRead = async (id: string) => {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
    setItems((prev) => prev.map((row) => (row.id === id ? { ...row, is_read: true } : row)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.notificationsTitle}</h2>
          <p className="text-sm text-white/60">{t.app.notificationsSubtitle}</p>
        </div>
        <Button variant="secondary" onClick={markAllRead} disabled={actionLoading}>
          {actionLoading ? t.common.saving : t.app.notificationsMarkAll}
        </Button>
      </div>

      <div className="glass-card rounded-3xl p-6">
        {loading ? (
          <p className="text-sm text-white/60">{t.common.loading}</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-white/60">{t.app.notificationsEmpty}</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 text-sm ${
                  item.is_read
                    ? "border-white/10 bg-white/5 text-white/60"
                    : "border-cyan-400/40 bg-cyan-400/10 text-white"
                }`}
              >
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  {item.body ? <div className="mt-1 text-xs text-white/70">{item.body}</div> : null}
                  <div className="mt-2 text-[10px] text-white/50">
                    {new Date(item.created_at).toLocaleString()}
                  </div>
                </div>
                {!item.is_read ? (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    {t.app.notificationsMarkRead}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

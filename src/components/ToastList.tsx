"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/client";

type NotificationRow = {
  id: string;
  title: string;
  created_at: string;
};

export default function ToastList() {
  const t = useTranslations();
  const [items, setItems] = useState<NotificationRow[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await fetch("/api/notifications?limit=5");
      if (!res.ok) return;
      const json = (await res.json().catch(() => null)) as
        | { notifications?: NotificationRow[] }
        | null;
      if (!cancelled && json?.notifications) {
        setItems(json.notifications);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const fallback = [
    t.common.saved,
    t.common.draftUpdated,
    t.common.published,
    t.common.planUpgradeRequired,
    t.common.creditsLimitReached,
  ];

  const rows = items.length > 0
    ? items.map((item) => ({ id: item.id, title: item.title }))
    : fallback.map((title) => ({ id: title, title }));

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.id}
          className="glass-card flex items-center justify-between rounded-2xl px-4 py-3 text-xs text-white/80"
        >
          <span>{row.title}</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/60">
            {t.common.now}
          </span>
        </div>
      ))}
    </div>
  );
}

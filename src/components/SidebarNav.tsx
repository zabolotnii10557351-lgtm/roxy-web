"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Users,
  Plug,
  Gift,
  ScrollText,
  Box,
  Monitor,
  Activity,
  Layers,
  CreditCard,
  Settings,
  Bell,
  Link2,
} from "lucide-react";
import { usePlan } from "@/providers/PlanProvider";
import { useTranslations } from "@/i18n/client";

export default function SidebarNav({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  const { isTrial, isTrialExpired, trialEndsAt } = usePlan();
  const t = useTranslations();
  const [nowMs, setNowMs] = useState<number | null>(null);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setIsDesktopMode(Boolean((window as unknown as { __TAURI__?: unknown }).__TAURI__));
  }, []);

  const daysLeft =
    trialEndsAt && nowMs !== null
      ? Math.max(0, Math.ceil((trialEndsAt.getTime() - nowMs) / 86400000))
      : null;

  const navItems = [
    { href: "/app", label: t.app.overview, icon: LayoutGrid },
    { href: "/app/characters", label: t.app.characters, icon: Users },
    { href: "/app/stream-connectors", label: t.app.connectors, icon: Plug },
    { href: "/app/dono-engine", label: t.app.donoEngine, icon: Gift },
    { href: "/app/scripts", label: t.app.scripts, icon: ScrollText },
    ...(isDesktopMode
      ? [
          { href: "/app/unreal", label: t.app.unrealConnector, icon: Box },
          { href: "/app/local-runtime", label: t.app.localRuntime, icon: Monitor },
          { href: "/app/diagnostics", label: t.app.diagnostics, icon: Activity },
        ]
      : []),
    { href: "/app/billing", label: t.app.billing, icon: CreditCard },
    { href: "/app/referrals", label: t.app.referrals, icon: Link2 },
    { href: "/app/notifications", label: t.app.notifications, icon: Bell },
    { href: "/app/settings", label: t.app.settings, icon: Settings },
    ...(isAdmin
      ? [{ href: "/admin", label: t.admin.label, icon: Layers }]
      : []),
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-white/5 bg-[#0C1222] px-5 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-semibold">
          R
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{t.common.brand}</p>
          <p className="text-xs text-white/60">{t.common.dashboard}</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/70 transition-all duration-200 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-white hover:pl-4 relative overflow-hidden"
          >
            <div className="absolute left-0 h-full w-1 bg-gradient-to-b from-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />
            <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
            {item.label}
          </Link>
        ))}
      </nav>
      {isTrial ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          <p className="font-semibold text-white">
            {isTrialExpired
              ? t.app.trialEnded
              : t.app.trialEndsIn.replace("{days}", String(daysLeft ?? 0))}
          </p>
          <p className="mt-1">{t.common.planUpgradeRequired}</p>
        </div>
      ) : null}
    </aside>
  );
}

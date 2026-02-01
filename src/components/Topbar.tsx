"use client";

import { Bell, Sparkles } from "lucide-react";
import Badge from "@/components/Badge";
import SignOutButton from "@/components/SignOutButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "@/i18n/client";

export default function Topbar({ displayName }: { displayName: string }) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
          {t.common.brand}
        </p>
        <h1 className="text-lg font-semibold text-white">
          {t.auth.welcomeBack}, {displayName}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Badge>{t.common.preview}</Badge>
        <button className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          {t.common.proPerks}
        </button>
        <SignOutButton />
      </div>
    </div>
  );
}

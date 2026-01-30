"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

interface FeatureLockProps {
  title: string;
  description: string;
  locked: boolean;
  children: React.ReactNode;
}

export default function FeatureLock({
  title,
  description,
  locked,
  children,
}: FeatureLockProps) {
  const t = useTranslations();

  if (!locked) {
    return <div className="glass-card rounded-2xl p-6">{children}</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-transparent" />
      <div className="relative space-y-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/60">{description}</p>
        <Button variant="outline" href="/app/billing">
          {t.common.planUpgradeRequired}
        </Button>
      </div>
    </div>
  );
}

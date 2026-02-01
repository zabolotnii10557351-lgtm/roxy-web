"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/client";

export default function DesktopOnlyGate({
  children,
  title,
  message,
}: {
  children: React.ReactNode;
  title?: string;
  message?: string;
}) {
  const t = useTranslations();
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    setIsDesktopMode(Boolean((window as unknown as { __TAURI__?: unknown }).__TAURI__));
  }, []);

  if (!isDesktopMode) {
    const titleText = title ?? t.common.desktopOnlyTitle;
    const messageText = message ?? t.common.desktopOnlyMessage;

    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="text-white font-semibold">{titleText}</div>
        <div className="mt-1">{messageText}</div>
      </div>
    );
  }

  return <>{children}</>;
}

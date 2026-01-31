"use client";

import { useEffect, useState } from "react";

export default function DesktopOnlyGate({
  children,
  title = "Desktop-only",
  message = "This section is available in the RoxStreamAI Desktop app.",
}: {
  children: React.ReactNode;
  title?: string;
  message?: string;
}) {
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    setIsDesktopMode(Boolean((window as unknown as { __TAURI__?: unknown }).__TAURI__));
  }, []);

  if (!isDesktopMode) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="text-white font-semibold">{title}</div>
        <div className="mt-1">{message}</div>
      </div>
    );
  }

  return <>{children}</>;
}

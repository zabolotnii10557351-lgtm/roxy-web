"use client";

import { useId } from "react";
import { Info } from "lucide-react";

export default function InfoTooltip({ text }: { text: string }) {
  const id = useId();

  return (
    <span className="relative inline-flex items-center">
      <span
        aria-describedby={id}
        className="group inline-flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:text-white"
      >
        <Info className="h-4 w-4" />
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#0A0F1A] p-3 text-xs text-white/80 opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
        >
          {text}
        </span>
      </span>
    </span>
  );
}

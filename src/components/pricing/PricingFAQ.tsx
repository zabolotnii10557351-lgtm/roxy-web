"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function PricingFAQ(props: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {props.items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={item.q} className="glass-card rounded-3xl p-5">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-sm font-semibold text-white">{item.q}</span>
              <span className="text-xs text-white/60">{open ? "–" : "+"}</span>
            </button>
            {open ? (
              <p className="mt-3 text-sm text-white/70">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

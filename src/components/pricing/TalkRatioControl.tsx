"use client";

import InfoTooltip from "@/components/InfoTooltip";

const PRESETS = [0.1, 0.2, 0.3, 0.4] as const;

export default function TalkRatioControl(props: {
  value: number;
  onChange: (value: number) => void;
  tooltipText: string;
  labels?: {
    talkRatio: string;
    description: string;
    howWeEstimate: string;
    current: string;
    tip: string;
  };
}) {
  const pct = Math.round(props.value * 100);
  const l = props.labels;

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{l?.talkRatio ?? "Talk ratio"}</p>
          <p className="mt-1 text-xs text-white/60">
            {l?.description ?? "Choose how much of your stream time is active speech."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-white/70">
          <span className="inline-flex items-center gap-2">
            {l?.howWeEstimate ?? "How we estimate"}
            <InfoTooltip text={props.tooltipText} />
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-2">
          <input
            type="range"
            min={0.1}
            max={0.4}
            step={0.01}
            value={props.value}
            onChange={(e) => props.onChange(Number(e.target.value))}
            className="w-full"
            aria-label="Talk ratio"
          />
          <p className="text-xs text-white/60">
            {l?.current ?? "Current"}: <span className="font-semibold text-white">{pct}%</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const active = Math.abs(preset - props.value) < 0.0001;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => props.onChange(preset)}
                className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                  active
                    ? "border-white/20 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                {Math.round(preset * 100)}%
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-xs text-white/60">
        {l?.tip ?? "Tip: 20% is a good starting point for most talk-heavy streams."}
      </div>
    </div>
  );
}

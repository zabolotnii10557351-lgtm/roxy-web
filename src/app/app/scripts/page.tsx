"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type StreamScriptMessage = { text: string; emotionTag: string };

type StreamScriptSegment = {
  name: string;
  durationMinutes: number;
  intervalMinutes: number;
  minChatMessagesLast5Min: number;
  behaviorPreset: string;
  emotionTag: string;
  taskText: string;
  enabled: boolean;
};

type StreamScriptConfigPlan = {
  type: "plan";
  totalMinutes: number;
  segments: Array<{
    name: string;
    durationMinutes: number;
    intervalSeconds: number;
    behaviorPreset: string;
    conditions: { minChatMessagesLast5Min: number };
    message: StreamScriptMessage;
    enabled: boolean;
  }>;
  enabled: boolean;
};

type StreamScriptConfigIntervalLegacy = {
  type: "interval";
  intervalSeconds: number;
  segmentMinutes?: number;
  behaviorPreset?: string;
  conditions: { minChatMessagesLast5Min: number };
  message: StreamScriptMessage;
  enabled: boolean;
};

type StreamScriptConfig = StreamScriptConfigPlan | StreamScriptConfigIntervalLegacy;

type StreamScriptRow = {
  id: string;
  name: string;
  config?: StreamScriptConfig | null;
  created_at?: string;
};

const PRESETS: Array<{ id: string; label: string; desc: string }> = [
  { id: "neutral", label: "Neutral", desc: "Balanced, safe default" },
  { id: "friendly", label: "Friendly", desc: "Warm, supportive, chatty" },
  { id: "energetic", label: "Energetic", desc: "Hype + short punchy lines" },
  { id: "educational", label: "Educational", desc: "Explains concepts, asks questions" },
  { id: "companion", label: "Companion", desc: "Co-host style (with you)" },
  { id: "sales", label: "Brand / Sales", desc: "Soft promo, benefits, CTA" },
];

function clampInt(input: number, min: number, max: number) {
  const n = Number(input);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function moveItem<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return arr;
  if (fromIndex < 0 || fromIndex >= arr.length) return arr;
  if (toIndex < 0 || toIndex >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

function toPlanConfig(config?: StreamScriptConfig | null): StreamScriptConfigPlan {
  const cfg = config ?? {
    type: "plan",
    totalMinutes: 240,
    segments: [],
    enabled: true,
  };

  if (cfg.type === "plan") {
    return {
      type: "plan",
      totalMinutes: clampInt(cfg.totalMinutes ?? 240, 1, 24 * 60),
      segments: Array.isArray(cfg.segments) ? cfg.segments : [],
      enabled: Boolean(cfg.enabled ?? true),
    };
  }

  // Legacy interval -> wrap into a single segment plan
  const legacy = cfg as StreamScriptConfigIntervalLegacy;
  const segmentMinutes = clampInt(legacy.segmentMinutes ?? 60, 1, 24 * 60);
  const intervalSeconds = clampInt(legacy.intervalSeconds ?? 600, 1, 24 * 60 * 60);
  const intervalMinutes = clampInt(Math.max(1, Math.round(intervalSeconds / 60)), 1, 24 * 60);

  return {
    type: "plan",
    totalMinutes: segmentMinutes,
    enabled: Boolean(legacy.enabled ?? true),
    segments: [
      {
        name: "Segment 1",
        durationMinutes: segmentMinutes,
        intervalSeconds,
        behaviorPreset: legacy.behaviorPreset ?? legacy.message?.emotionTag ?? "neutral",
        conditions: {
          minChatMessagesLast5Min: clampInt(
            legacy.conditions?.minChatMessagesLast5Min ?? 10,
            0,
            100000,
          ),
        },
        message: {
          text: legacy.message?.text ?? "",
          emotionTag: legacy.message?.emotionTag ?? "neutral",
        },
        enabled: Boolean(legacy.enabled ?? true),
      },
    ],
  };
}

function planConfigToSegments(plan: StreamScriptConfigPlan): StreamScriptSegment[] {
  return (plan.segments ?? []).map((s) => ({
    name: s.name ?? "Segment",
    durationMinutes: clampInt(s.durationMinutes ?? 60, 1, 24 * 60),
    intervalMinutes: clampInt(Math.max(1, Math.round((s.intervalSeconds ?? 600) / 60)), 1, 24 * 60),
    minChatMessagesLast5Min: clampInt(s.conditions?.minChatMessagesLast5Min ?? 10, 0, 100000),
    behaviorPreset: s.behaviorPreset ?? s.message?.emotionTag ?? "neutral",
    emotionTag: s.message?.emotionTag ?? "neutral",
    taskText: s.message?.text ?? "",
    enabled: Boolean(s.enabled ?? true),
  }));
}

function segmentsToPlanConfig(params: {
  enabled: boolean;
  totalMinutes: number;
  segments: StreamScriptSegment[];
}): StreamScriptConfigPlan {
  return {
    type: "plan",
    enabled: Boolean(params.enabled),
    totalMinutes: clampInt(params.totalMinutes, 1, 24 * 60),
    segments: params.segments.map((s) => ({
      name: s.name.trim().length > 0 ? s.name.trim() : "Segment",
      durationMinutes: clampInt(s.durationMinutes, 1, 24 * 60),
      intervalSeconds: clampInt(s.intervalMinutes * 60, 1, 24 * 60 * 60),
      behaviorPreset: (s.behaviorPreset.trim() || "neutral"),
      conditions: {
        minChatMessagesLast5Min: clampInt(s.minChatMessagesLast5Min, 0, 100000),
      },
      message: {
        text: s.taskText ?? "",
        emotionTag: (s.emotionTag.trim() || "neutral"),
      },
      enabled: Boolean(s.enabled),
    })),
  };
}

function defaultSegment(): StreamScriptSegment {
  return {
    name: "New segment",
    durationMinutes: 60,
    intervalMinutes: 10,
    minChatMessagesLast5Min: 10,
    behaviorPreset: "neutral",
    emotionTag: "neutral",
    taskText: "",
    enabled: true,
  };
}

function cloneSegment(segment: StreamScriptSegment): StreamScriptSegment {
  return {
    ...segment,
    name: segment.name.trim().length > 0 ? `${segment.name} (copy)` : "New segment (copy)",
  };
}

function buildSkeletonSegments(totalMinutes: number): StreamScriptSegment[] {
  // Base template for a 4-hour (240m) stream.
  const base: Array<Omit<StreamScriptSegment, "durationMinutes"> & { durationMinutes: number }> = [
    {
      name: "Intro — greet + rules",
      durationMinutes: 15,
      intervalMinutes: 5,
      minChatMessagesLast5Min: 0,
      behaviorPreset: "friendly",
      emotionTag: "friendly",
      taskText:
        "Welcome viewers, explain today’s plan, set chat rules, ask a warm opening question.",
      enabled: true,
    },
    {
      name: "Personal topics — warm chat",
      durationMinutes: 30,
      intervalMinutes: 10,
      minChatMessagesLast5Min: 10,
      behaviorPreset: "companion",
      emotionTag: "companion",
      taskText:
        "Discuss 2–3 personal topics; ask chat opinions; keep it interactive.",
      enabled: true,
    },
    {
      name: "Main topic / storytelling",
      durationMinutes: 30,
      intervalMinutes: 10,
      minChatMessagesLast5Min: 10,
      behaviorPreset: "educational",
      emotionTag: "educational",
      taskText:
        "Go deeper on one topic; summarize key points; ask 1 question every 10 minutes.",
      enabled: true,
    },
    {
      name: "Game block #1",
      durationMinutes: 60,
      intervalMinutes: 10,
      minChatMessagesLast5Min: 5,
      behaviorPreset: "energetic",
      emotionTag: "energetic",
      taskText:
        "Keep hype; react to key moments; call out chat names; keep short lines.",
      enabled: true,
    },
    {
      name: "Brand promo — soft sell",
      durationMinutes: 15,
      intervalMinutes: 5,
      minChatMessagesLast5Min: 0,
      behaviorPreset: "sales",
      emotionTag: "sales",
      taskText:
        "Soft-promote brand: 1 benefit + 1 proof + 1 CTA. Keep it friendly, not pushy.",
      enabled: true,
    },
    {
      name: "Game block #2 / challenges",
      durationMinutes: 60,
      intervalMinutes: 10,
      minChatMessagesLast5Min: 5,
      behaviorPreset: "energetic",
      emotionTag: "energetic",
      taskText:
        "Run challenges/polls; celebrate wins; recap progress every ~20 minutes.",
      enabled: true,
    },
    {
      name: "Q&A — chill conversation",
      durationMinutes: 20,
      intervalMinutes: 10,
      minChatMessagesLast5Min: 10,
      behaviorPreset: "friendly",
      emotionTag: "friendly",
      taskText:
        "Answer questions; read donations; thank supporters; keep warm tone.",
      enabled: true,
    },
    {
      name: "Outro — recap + next stream",
      durationMinutes: 10,
      intervalMinutes: 5,
      minChatMessagesLast5Min: 0,
      behaviorPreset: "neutral",
      emotionTag: "neutral",
      taskText:
        "Recap highlights, tease next stream, thank everyone, final CTA (follow/subscribe).",
      enabled: true,
    },
  ];

  const baseTotal = base.reduce((acc, s) => acc + s.durationMinutes, 0);
  const targetTotal = clampInt(totalMinutes || 240, 1, 24 * 60);
  const scale = targetTotal / baseTotal;

  // Scale and keep at least 1 minute per segment.
  const scaled = base.map((s) => ({
    ...s,
    durationMinutes: Math.max(1, Math.round(s.durationMinutes * scale)),
  }));

  // Fix rounding drift by adjusting the largest segment.
  const scaledTotal = scaled.reduce((acc, s) => acc + s.durationMinutes, 0);
  const drift = targetTotal - scaledTotal;
  if (drift !== 0) {
    let maxIdx = 0;
    for (let i = 1; i < scaled.length; i++) {
      if (scaled[i].durationMinutes > scaled[maxIdx].durationMinutes) maxIdx = i;
    }
    scaled[maxIdx] = {
      ...scaled[maxIdx],
      durationMinutes: Math.max(1, scaled[maxIdx].durationMinutes + drift),
    };
  }

  return scaled;
}

function SegmentEditor(props: {
  index: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  segment: StreamScriptSegment;
  onChange: (next: StreamScriptSegment) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onInsertAfter: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  const presetDesc = PRESETS.find((p) => p.id === props.segment.behaviorPreset)?.desc ?? "Custom";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-full flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="rounded-xl border border-white/10 bg-white/5 px-2 py-1">#{props.index + 1}</span>
            <Button
              variant="ghost"
              onClick={props.onMoveUp}
              disabled={props.busy || !props.canMoveUp}
            >
              ↑
            </Button>
            <Button
              variant="ghost"
              onClick={props.onMoveDown}
              disabled={props.busy || !props.canMoveDown}
            >
              ↓
            </Button>
          </div>

          <input
            value={props.segment.name}
            onChange={(e) => props.onChange({ ...props.segment, name: e.target.value })}
            className="w-full max-w-xl flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Hour 1 — Intro + chat"
          />

          <label className="flex items-center gap-2 text-xs text-white/70">
            <input
              type="checkbox"
              checked={props.segment.enabled}
              onChange={(e) => props.onChange({ ...props.segment, enabled: e.target.checked })}
              disabled={props.busy}
            />
            Enabled
          </label>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div>
          <p className="mb-1 text-[11px] font-medium text-white/70">Duration (minutes)</p>
          <input
            value={props.segment.durationMinutes}
            onChange={(e) =>
              props.onChange({ ...props.segment, durationMinutes: Number(e.target.value) })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            type="number"
            min={1}
          />
        </div>

        <div>
          <p className="mb-1 text-[11px] font-medium text-white/70">Repeat every (minutes)</p>
          <input
            value={props.segment.intervalMinutes}
            onChange={(e) =>
              props.onChange({ ...props.segment, intervalMinutes: Number(e.target.value) })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            type="number"
            min={1}
          />
          <p className="mt-1 text-[11px] text-white/45">
            Example: 10 = every 10 minutes.
          </p>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-medium text-white/70">Chat activity threshold</p>
          <input
            value={props.segment.minChatMessagesLast5Min}
            onChange={(e) =>
              props.onChange({ ...props.segment, minChatMessagesLast5Min: Number(e.target.value) })
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            type="number"
            min={0}
          />
          <p className="mt-1 text-[11px] text-white/45">
            Minimum messages in the last 5 minutes.
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-1 text-[11px] font-medium text-white/70">Behavior preset</p>
          <select
            value={props.segment.behaviorPreset}
            onChange={(e) => {
              const next = e.target.value;
              props.onChange({
                ...props.segment,
                behaviorPreset: next,
                emotionTag: next,
              });
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
            <option value={props.segment.emotionTag}>Custom (keep current)</option>
          </select>
          <p className="mt-1 text-[11px] text-white/45">{presetDesc}</p>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-medium text-white/70">Advanced: emotion tag</p>
          <input
            value={props.segment.emotionTag}
            onChange={(e) => props.onChange({ ...props.segment, emotionTag: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="neutral"
          />
        </div>
      </div>

      <textarea
        value={props.segment.taskText}
        onChange={(e) => props.onChange({ ...props.segment, taskText: e.target.value })}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        placeholder={
          "Task for this segment (optional).\n" +
          "Examples:\n" +
          "• Discuss AI news with chat\n" +
          "• Every 5 minutes say: RoxStreamAI\n" +
          "• Promote: barber shop (benefits, price, booking)"
        }
        rows={3}
      />

      <div className="mt-3 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={props.onInsertAfter} disabled={props.busy}>
          Insert after
        </Button>
        <Button variant="ghost" onClick={props.onDelete} disabled={props.busy}>
          Delete segment
        </Button>
      </div>
    </div>
  );
}

function ScriptCard(props: {
  script: StreamScriptRow;
  onSave: (id: string, name: string, config: StreamScriptConfig) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onTrigger: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const initialPlan = toPlanConfig(props.script.config);
  const initialSegments = planConfigToSegments(initialPlan);

  const [name, setName] = useState(props.script.name);
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(Boolean(initialPlan.enabled));
  const [totalMinutes, setTotalMinutes] = useState(clampInt(initialPlan.totalMinutes ?? 240, 1, 24 * 60));
  const [segments, setSegments] = useState<StreamScriptSegment[]>(initialSegments);

  const enabledSegments = segments.filter((s) => s.enabled);
  const minutesSum = enabledSegments.reduce((acc, s) => acc + clampInt(s.durationMinutes, 1, 24 * 60), 0);
  const minutesMismatch = enabledSegments.length > 0 && minutesSum !== clampInt(totalMinutes, 1, 24 * 60);
  const minutesDelta = minutesSum - clampInt(totalMinutes, 1, 24 * 60);
  const minutesDeltaLabel = minutesDelta > 0 ? `+${minutesDelta}m` : `${minutesDelta}m`;
  const summary = `${enabledSegments.length} segments · enabled minutes: ${minutesSum}m · total plan: ${totalMinutes}m`;

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Stream script template name"
        />
        <label className="ml-4 flex items-center gap-2 text-xs text-white/70">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enabled
        </label>
      </div>

      <p className="mt-2 text-xs text-white/55">{summary}</p>
      {minutesMismatch ? (
        <p className="mt-1 text-[11px] text-amber-200/80">
          Enabled segments total {minutesSum}m, which doesn’t match plan length {totalMinutes}m ({minutesDeltaLabel}).
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={() => setExpanded((v) => !v)} disabled={props.busy}>
          {expanded ? "Collapse" : "Edit segments"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const cfg = segmentsToPlanConfig({ enabled, totalMinutes, segments });
            void props.onSave(props.script.id, name, cfg);
          }}
          disabled={props.busy || name.trim().length === 0}
        >
          Save
        </Button>
        <Button variant="ghost" onClick={() => props.onTrigger(props.script.id)} disabled={props.busy}>
          Test trigger
        </Button>
        <Button variant="ghost" onClick={() => props.onDelete(props.script.id)} disabled={props.busy}>
          Delete
        </Button>
      </div>

      {expanded ? (
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-1 text-[11px] font-medium text-white/70">Total stream length (minutes)</p>
            <input
              value={totalMinutes}
              onChange={(e) => setTotalMinutes(Number(e.target.value))}
              className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              type="number"
              min={1}
            />
            <p className="mt-1 text-[11px] text-white/45">
              Template metadata. You can build a 4h plan = 240 minutes.
            </p>
          </div>

          <div className="space-y-3">
            {segments.length === 0 ? (
              <p className="text-xs text-white/50">No segments yet.</p>
            ) : (
              segments.map((seg, idx) => (
                <SegmentEditor
                  key={`${idx}:${seg.name}`}
                  index={idx}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < segments.length - 1}
                  segment={seg}
                  busy={props.busy}
                  onChange={(next) => {
                    setSegments((prev) => prev.map((p, i) => (i === idx ? next : p)));
                  }}
                  onMoveUp={() => setSegments((prev) => moveItem(prev, idx, idx - 1))}
                  onMoveDown={() => setSegments((prev) => moveItem(prev, idx, idx + 1))}
                  onDuplicate={() =>
                    setSegments((prev) => {
                      const copy = prev.slice();
                      copy.splice(idx + 1, 0, cloneSegment(prev[idx]));
                      return copy;
                    })
                  }
                  onInsertAfter={() =>
                    setSegments((prev) => {
                      const copy = prev.slice();
                      copy.splice(idx + 1, 0, defaultSegment());
                      return copy;
                    })
                  }
                  onDelete={() => {
                    setSegments((prev) => prev.filter((_, i) => i !== idx));
                  }}
                />
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => setSegments((prev) => [...prev, defaultSegment()])}
              disabled={props.busy}
            >
              Add segment
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSegments(buildSkeletonSegments(totalMinutes))}
              disabled={props.busy}
            >
              Auto-fill skeleton
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function StreamScriptsPage() {
  const t = useTranslations();
  const [scripts, setScripts] = useState<StreamScriptRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [totalMinutes, setTotalMinutes] = useState(240);
  const [segments, setSegments] = useState<StreamScriptSegment[]>([
    {
      ...defaultSegment(),
      name: "Hour 1 — Intro + chat",
      durationMinutes: 60,
      intervalMinutes: 10,
    },
  ]);

  const createEnabledSegments = segments.filter((s) => s.enabled);
  const createMinutesSum = createEnabledSegments.reduce(
    (acc, s) => acc + clampInt(s.durationMinutes, 1, 24 * 60),
    0,
  );
  const createMinutesMismatch =
    createEnabledSegments.length > 0 &&
    createMinutesSum !== clampInt(totalMinutes, 1, 24 * 60);
  const createMinutesDelta = createMinutesSum - clampInt(totalMinutes, 1, 24 * 60);
  const createMinutesDeltaLabel = createMinutesDelta > 0 ? `+${createMinutesDelta}m` : `${createMinutesDelta}m`;

  const loadScripts = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/stream-scripts");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load scripts");
      return;
    }
    setScripts((json?.items ?? []) as StreamScriptRow[]);
  }, []);

  useEffect(() => {
    void loadScripts();
  }, [loadScripts]);

  const handleCreate = async () => {
    setBusy(true);
    setError(null);

    const cfg = segmentsToPlanConfig({
      enabled: true,
      totalMinutes,
      segments,
    });

    const res = await fetch("/api/stream-scripts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        config: cfg,
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to create script");
      setBusy(false);
      return;
    }

    setName("");
    setTotalMinutes(240);
    setSegments([
      {
        ...defaultSegment(),
        name: "Hour 1 — Intro + chat",
        durationMinutes: 60,
        intervalMinutes: 10,
      },
    ]);
    await loadScripts();
    setBusy(false);
  };

  const handleSave = async (id: string, nextName: string, config: StreamScriptConfig) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/stream-scripts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: nextName, config }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to update script");
      setBusy(false);
      return;
    }

    await loadScripts();
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/stream-scripts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to delete script");
      setBusy(false);
      return;
    }

    await loadScripts();
    setBusy(false);
  };

  const handleTrigger = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/stream-scripts/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scriptId: id }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to trigger script");
      setBusy(false);
      return;
    }

    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.scripts}</h2>
        <p className="text-sm text-white/60">{t.app.scriptsSubtitle}</p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">New script</h3>
        <p className="mt-1 text-xs text-white/55">
          Create a stream script template with multiple segments (intro → topics → games → promo). Then you can pick a template at stream start.
        </p>
        {createMinutesMismatch ? (
          <p className="mt-2 text-[11px] text-amber-200/80">
            Enabled segments total {createMinutesSum}m, which doesn’t match stream length {totalMinutes}m ({createMinutesDeltaLabel}).
          </p>
        ) : null}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-medium text-white/70">Template name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              placeholder="4h Co-host + brand promo"
            />
          </div>

          <div>
            <p className="mb-1 text-[11px] font-medium text-white/70">Stream length (minutes)</p>
            <input
              value={totalMinutes}
              onChange={(e) => setTotalMinutes(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              type="number"
              min={1}
            />
            <p className="mt-1 text-[11px] text-white/45">Example: 240 = 4 hours.</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {segments.map((seg, idx) => (
            <SegmentEditor
              key={`${idx}:${seg.name}`}
              index={idx}
              canMoveUp={idx > 0}
              canMoveDown={idx < segments.length - 1}
              segment={seg}
              busy={busy}
              onChange={(next) => setSegments((prev) => prev.map((p, i) => (i === idx ? next : p)))}
              onMoveUp={() => setSegments((prev) => moveItem(prev, idx, idx - 1))}
              onMoveDown={() => setSegments((prev) => moveItem(prev, idx, idx + 1))}
              onDuplicate={() =>
                setSegments((prev) => {
                  const copy = prev.slice();
                  copy.splice(idx + 1, 0, cloneSegment(prev[idx]));
                  return copy;
                })
              }
              onInsertAfter={() =>
                setSegments((prev) => {
                  const copy = prev.slice();
                  copy.splice(idx + 1, 0, defaultSegment());
                  return copy;
                })
              }
              onDelete={() => setSegments((prev) => prev.filter((_, i) => i !== idx))}
            />
          ))}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => setSegments((prev) => [...prev, defaultSegment()])}
              disabled={busy}
            >
              Add segment
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSegments(buildSkeletonSegments(totalMinutes))}
              disabled={busy}
            >
              Auto-fill 4h skeleton
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={handleCreate}
            disabled={busy || name.trim().length === 0}
          >
            Create script
          </Button>
        </div>
        {error ? <p className="mt-3 text-xs text-rose-200/80">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {scripts.length === 0 ? (
          <p className="text-xs text-white/50">No scripts yet.</p>
        ) : (
          scripts.map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              onSave={handleSave}
              onDelete={handleDelete}
              onTrigger={handleTrigger}
              busy={busy}
            />
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type DonoRuleConfig = {
  trigger: {
    type: "gift";
    giftId: string;
    minAmount: number;
  };
  cooldownSeconds: number;
  reaction: {
    text: string;
    emotionTag: string;
    actions: Record<string, unknown>[];
  };
  enabled: boolean;
};

type DonoRuleRow = {
  id: string;
  name: string;
  config?: DonoRuleConfig | null;
  created_at?: string;
};

function DonoRuleCard(props: {
  rule: DonoRuleRow;
  onSave: (id: string, name: string, config: DonoRuleConfig) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const initialConfig: DonoRuleConfig = props.rule.config ?? {
    trigger: { type: "gift", giftId: "rose", minAmount: 1 },
    cooldownSeconds: 10,
    reaction: { text: "", emotionTag: "neutral", actions: [] },
    enabled: true,
  };

  const [name, setName] = useState(props.rule.name);
  const [giftId, setGiftId] = useState(initialConfig.trigger.giftId);
  const [minAmount, setMinAmount] = useState(initialConfig.trigger.minAmount);
  const [cooldownSeconds, setCooldownSeconds] = useState(initialConfig.cooldownSeconds);
  const [reactionText, setReactionText] = useState(initialConfig.reaction.text);
  const [emotionTag, setEmotionTag] = useState(initialConfig.reaction.emotionTag);
  const [enabled, setEnabled] = useState(initialConfig.enabled);

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Rule name"
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

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          value={giftId}
          onChange={(e) => setGiftId(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Gift ID (e.g. rose)"
        />
        <input
          value={minAmount}
          onChange={(e) => setMinAmount(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Min amount"
          type="number"
          min={1}
        />
        <input
          value={cooldownSeconds}
          onChange={(e) => setCooldownSeconds(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Cooldown seconds"
          type="number"
          min={0}
        />
        <input
          value={emotionTag}
          onChange={(e) => setEmotionTag(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Emotion tag"
        />
      </div>

      <textarea
        value={reactionText}
        onChange={(e) => setReactionText(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        placeholder="Reaction text"
        rows={3}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            props.onSave(props.rule.id, name, {
              trigger: { type: "gift", giftId: giftId.trim(), minAmount },
              cooldownSeconds,
              reaction: { text: reactionText, emotionTag, actions: [] },
              enabled,
            })
          }
          disabled={props.busy || name.trim().length === 0 || giftId.trim().length === 0}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onDelete(props.rule.id)}
          disabled={props.busy}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function DonoEnginePage() {
  const t = useTranslations();
  const [rules, setRules] = useState<DonoRuleRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [giftId, setGiftId] = useState("rose");
  const [minAmount, setMinAmount] = useState(1);
  const [cooldownSeconds, setCooldownSeconds] = useState(10);
  const [reactionText, setReactionText] = useState("");
  const [emotionTag, setEmotionTag] = useState("neutral");

  const loadRules = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/dono-rules");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load Dono rules");
      return;
    }
    setRules((json?.items ?? []) as DonoRuleRow[]);
  }, []);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  const handleCreate = async () => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        config: {
          trigger: { type: "gift", giftId, minAmount },
          cooldownSeconds,
          reaction: { text: reactionText, emotionTag, actions: [] },
          enabled: true,
        },
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to create Dono rule");
      setBusy(false);
      return;
    }

    setName("");
    setGiftId("rose");
    setMinAmount(1);
    setCooldownSeconds(10);
    setReactionText("");
    setEmotionTag("neutral");
    await loadRules();
    setBusy(false);
  };

  const handleSave = async (id: string, nextName: string, config: DonoRuleConfig) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: nextName, config }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to update Dono rule");
      setBusy(false);
      return;
    }

    await loadRules();
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/dono-rules", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to delete Dono rule");
      setBusy(false);
      return;
    }

    await loadRules();
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.donoEngine}</h2>
        <p className="text-sm text-white/60">{t.app.donoEngineSubtitle}</p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">New rule</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Rule name"
          />
          <input
            value={giftId}
            onChange={(e) => setGiftId(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Gift ID (e.g. rose)"
          />
          <input
            value={minAmount}
            onChange={(e) => setMinAmount(Number(e.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Min amount"
            type="number"
            min={1}
          />
          <input
            value={cooldownSeconds}
            onChange={(e) => setCooldownSeconds(Number(e.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Cooldown seconds"
            type="number"
            min={0}
          />
          <input
            value={emotionTag}
            onChange={(e) => setEmotionTag(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Emotion tag"
          />
        </div>
        <textarea
          value={reactionText}
          onChange={(e) => setReactionText(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Reaction text"
          rows={3}
        />
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={handleCreate}
            disabled={busy || name.trim().length === 0 || giftId.trim().length === 0}
          >
            Create rule
          </Button>
        </div>
        {error ? <p className="mt-3 text-xs text-rose-200/80">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {rules.length === 0 ? (
          <p className="text-xs text-white/50">No Dono rules yet.</p>
        ) : (
          rules.map((rule) => (
            <DonoRuleCard
              key={rule.id}
              rule={rule}
              onSave={handleSave}
              onDelete={handleDelete}
              busy={busy}
            />
          ))
        )}
      </div>
    </div>
  );
}

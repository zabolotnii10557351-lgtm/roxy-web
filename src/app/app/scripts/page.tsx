"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type StreamScriptConfig = {
  type: "interval";
  intervalSeconds: number;
  conditions: {
    minChatMessagesLast5Min: number;
  };
  message: {
    text: string;
    emotionTag: string;
  };
  enabled: boolean;
};

type StreamScriptRow = {
  id: string;
  name: string;
  config?: StreamScriptConfig | null;
  created_at?: string;
};

function ScriptCard(props: {
  script: StreamScriptRow;
  onSave: (id: string, name: string, config: StreamScriptConfig) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onTrigger: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const initialConfig: StreamScriptConfig = props.script.config ?? {
    type: "interval",
    intervalSeconds: 600,
    conditions: { minChatMessagesLast5Min: 10 },
    message: { text: "", emotionTag: "neutral" },
    enabled: true,
  };

  const [name, setName] = useState(props.script.name);
  const [intervalSeconds, setIntervalSeconds] = useState(initialConfig.intervalSeconds);
  const [minChatMessages, setMinChatMessages] = useState(
    initialConfig.conditions.minChatMessagesLast5Min,
  );
  const [messageText, setMessageText] = useState(initialConfig.message.text);
  const [emotionTag, setEmotionTag] = useState(initialConfig.message.emotionTag);
  const [enabled, setEnabled] = useState(initialConfig.enabled);

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Script name"
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
          value={intervalSeconds}
          onChange={(e) => setIntervalSeconds(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Interval seconds"
          type="number"
          min={1}
        />
        <input
          value={minChatMessages}
          onChange={(e) => setMinChatMessages(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Min chat msgs / 5m"
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
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        placeholder="Script message"
        rows={3}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            props.onSave(props.script.id, name, {
              type: "interval",
              intervalSeconds,
              conditions: { minChatMessagesLast5Min: minChatMessages },
              message: { text: messageText, emotionTag },
              enabled,
            })
          }
          disabled={props.busy || name.trim().length === 0}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onTrigger(props.script.id)}
          disabled={props.busy}
        >
          Test trigger
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onDelete(props.script.id)}
          disabled={props.busy}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function StreamScriptsPage() {
  const t = useTranslations();
  const [scripts, setScripts] = useState<StreamScriptRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [intervalSeconds, setIntervalSeconds] = useState(600);
  const [minChatMessages, setMinChatMessages] = useState(10);
  const [messageText, setMessageText] = useState("");
  const [emotionTag, setEmotionTag] = useState("neutral");

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

    const res = await fetch("/api/stream-scripts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        config: {
          type: "interval",
          intervalSeconds,
          conditions: { minChatMessagesLast5Min: minChatMessages },
          message: { text: messageText, emotionTag },
          enabled: true,
        },
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to create script");
      setBusy(false);
      return;
    }

    setName("");
    setIntervalSeconds(600);
    setMinChatMessages(10);
    setMessageText("");
    setEmotionTag("neutral");
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
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Script name"
          />
          <input
            value={intervalSeconds}
            onChange={(e) => setIntervalSeconds(Number(e.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Interval seconds"
            type="number"
            min={1}
          />
          <input
            value={minChatMessages}
            onChange={(e) => setMinChatMessages(Number(e.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Min chat msgs / 5m"
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
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Script message"
          rows={3}
        />
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

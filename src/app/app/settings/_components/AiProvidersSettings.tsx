"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";

type WorkspaceAiSettings = {
  workspace_id: string;
  brain_provider: string;
  brain_model: string;
  voice_provider: string;
  voice_voice_id: string;
};

type SecretFlags = {
  openai_has_key?: boolean;
  elevenlabs_has_key?: boolean;
};

const OPENAI_MODELS = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4o"];
const OPENAI_VOICES = ["alloy", "verse", "aria", "sage", "coral"];

export default function AiProvidersSettings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<WorkspaceAiSettings | null>(null);
  const [secretFlags, setSecretFlags] = useState<SecretFlags>({});

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [openaiKey, setOpenaiKey] = useState("");
  const [elevenKey, setElevenKey] = useState("");
  const [keysBusy, setKeysBusy] = useState(false);

  const [testBrainBusy, setTestBrainBusy] = useState(false);
  const [testBrainText, setTestBrainText] = useState<string | null>(null);

  const [testVoiceBusy, setTestVoiceBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const languageForSamples = useMemo(() => {
    // MVP: infer from voice_voice_id or just default to English
    return "en";
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/ai/settings", { method: "GET" });
      const json = await res.json().catch(() => null);

      if (cancelled) return;

      if (!res.ok) {
        setError(json?.error ?? "Failed to load AI settings.");
        setLoading(false);
        return;
      }

      setSettings(json.settings);
      setSecretFlags(json.secretFlags ?? {});
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSaveSettings = async () => {
    if (!settings) return;

    setSaving(true);
    setSaveMessage(null);

    const res = await fetch("/api/ai/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brain_provider: settings.brain_provider,
        brain_model: settings.brain_model,
        voice_provider: settings.voice_provider,
        voice_voice_id: settings.voice_voice_id,
      }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setSaveMessage(json?.error ?? "Failed to save settings.");
      setSaving(false);
      return;
    }

    setSettings(json.settings);
    setSaveMessage("Saved.");
    setSaving(false);
  };

  const setSecret = async (provider: "openai" | "elevenlabs", apiKey: string) => {
    setKeysBusy(true);
    setSaveMessage(null);

    const res = await fetch("/api/ai/secrets/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, apiKey }),
    });
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setSaveMessage(json?.error ?? "Failed to save key.");
      setKeysBusy(false);
      return;
    }

    setSecretFlags(json.secretFlags ?? {});
    setSaveMessage("Key saved.");
    setKeysBusy(false);
  };

  const removeSecret = async (provider: "openai" | "elevenlabs") => {
    setKeysBusy(true);
    setSaveMessage(null);

    const res = await fetch("/api/ai/secrets/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setSaveMessage(json?.error ?? "Failed to remove key.");
      setKeysBusy(false);
      return;
    }

    setSecretFlags(json.secretFlags ?? {});
    setSaveMessage("Key removed.");
    setKeysBusy(false);
  };

  const handleTestBrain = async () => {
    setTestBrainBusy(true);
    setTestBrainText(null);
    setSaveMessage(null);

    const res = await fetch("/api/ai/test-brain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "English" }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setSaveMessage(json?.error ?? "Brain test failed.");
      setTestBrainBusy(false);
      return;
    }

    setTestBrainText(json.text ?? "");
    setTestBrainBusy(false);
  };

  const handleTestVoice = async () => {
    if (!settings) return;

    setTestVoiceBusy(true);
    setSaveMessage(null);

    const sampleText =
      languageForSamples.startsWith("ru")
        ? "Привет! Это тест голоса RoxStreamAI."
        : "Hello! This is a RoxStreamAI voice test.";

    const res = await fetch("/api/ai/test-voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: sampleText,
        voiceProvider: settings.voice_provider,
        voiceId: settings.voice_voice_id,
        language: languageForSamples,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      setSaveMessage(json?.error ?? "Voice test failed.");
      setTestVoiceBusy(false);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    if (audioRef.current) {
      audioRef.current.src = url;
      try {
        await audioRef.current.play();
      } catch {
        // Autoplay can be blocked; user can press play.
      }
    }

    setTestVoiceBusy(false);
  };

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">AI Providers</h3>
        <p className="mt-4 text-sm text-white/60">Loading…</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white">AI Providers</h3>
      <p className="mt-2 text-sm text-white/60">
        Configure brain + voice per workspace. Keys are stored server-side.
      </p>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      {settings ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Brain provider
              </label>
              <select
                value={settings.brain_provider}
                onChange={(e) =>
                  setSettings((s) =>
                    s ? { ...s, brain_provider: e.target.value } : s
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic" disabled>
                  Anthropic (coming soon)
                </option>
                <option value="deepseek" disabled>
                  DeepSeek (coming soon)
                </option>
              </select>
              <p className="text-xs text-white/60">
                Other brain providers are listed for visibility, but aren’t available yet. Today the app runs on
                OpenAI.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Brain model
              </label>
              <select
                value={settings.brain_model}
                onChange={(e) =>
                  setSettings((s) => (s ? { ...s, brain_model: e.target.value } : s))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                {OPENAI_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-sm font-semibold text-white">Cost estimator (coming soon)</h4>
            <p className="mt-2 text-sm text-white/70">
              We’ll add an in-app estimator once additional providers are enabled (tokens, voice characters,
              and projected spend). For now, OpenAI voice is included and BYOK providers bill you directly.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Voice provider
              </label>
              <select
                value={settings.voice_provider}
                onChange={(e) =>
                  setSettings((s) =>
                    s ? { ...s, voice_provider: e.target.value } : s
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <option value="openai">OpenAI (included)</option>
                <option value="elevenlabs">ElevenLabs (BYOK)</option>
              </select>
              {settings.voice_provider === "elevenlabs" && !secretFlags.elevenlabs_has_key ? (
                <p className="text-xs text-amber-200/90">
                  Add your ElevenLabs key below to use this provider.
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Voice preset / Voice ID
              </label>
              {settings.voice_provider === "openai" ? (
                <select
                  value={settings.voice_voice_id}
                  onChange={(e) =>
                    setSettings((s) =>
                      s ? { ...s, voice_voice_id: e.target.value } : s
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                >
                  {OPENAI_VOICES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={settings.voice_voice_id}
                  onChange={(e) =>
                    setSettings((s) =>
                      s ? { ...s, voice_voice_id: e.target.value } : s
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder="ElevenLabs Voice ID"
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={handleSaveSettings} disabled={saving}>
              {saving ? "Saving…" : "Save AI settings"}
            </Button>
            <Button variant="secondary" onClick={handleTestBrain} disabled={testBrainBusy}>
              {testBrainBusy ? "Testing…" : "Test brain"}
            </Button>
            <Button variant="secondary" onClick={handleTestVoice} disabled={testVoiceBusy}>
              {testVoiceBusy ? "Generating…" : "Test voice"}
            </Button>
          </div>

          {saveMessage ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              {saveMessage}
            </p>
          ) : null}

          {testBrainText ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Test brain response
              </p>
              <p className="mt-2">{testBrainText}</p>
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              API keys (BYOK)
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">OpenAI API key (optional)</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                  placeholder={secretFlags.openai_has_key ? "Connected" : "sk-..."}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSecret("openai", openaiKey)}
                    disabled={keysBusy || openaiKey.trim().length === 0}
                  >
                    {secretFlags.openai_has_key ? "Replace key" : "Save key"}
                  </Button>
                  {secretFlags.openai_has_key ? (
                    <Button
                      variant="outline"
                      onClick={() => removeSecret("openai")}
                      disabled={keysBusy}
                    >
                      Remove key
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/60">ElevenLabs API key</label>
                <input
                  type="password"
                  value={elevenKey}
                  onChange={(e) => setElevenKey(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                  placeholder={secretFlags.elevenlabs_has_key ? "Connected" : ""}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSecret("elevenlabs", elevenKey)}
                    disabled={keysBusy || elevenKey.trim().length === 0}
                  >
                    {secretFlags.elevenlabs_has_key ? "Replace key" : "Save key"}
                  </Button>
                  {secretFlags.elevenlabs_has_key ? (
                    <Button
                      variant="outline"
                      onClick={() => removeSecret("elevenlabs")}
                      disabled={keysBusy}
                    >
                      Remove key
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Keys are never returned to the browser. The UI only shows “Connected”.
            </p>
          </div>

          <audio ref={audioRef} className="w-full" controls />
        </div>
      ) : null}
    </div>
  );
}

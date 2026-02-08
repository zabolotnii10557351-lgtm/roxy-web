"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

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
const ELEVENLABS_DOCS_URL = "/docs/providers/elevenlabs";
const ELEVENLABS_YOUTUBE_URL = process.env.NEXT_PUBLIC_ELEVENLABS_YT_URL ?? "";

export default function AiProvidersSettings() {
  const t = useTranslations();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

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

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    setErrorCode(null);

    const res = await fetch("/api/ai/settings", { method: "GET" });
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setError(json?.error ?? t.app.aiProvidersLoadFailed);
      setErrorCode(json?.code ?? null);
      setLoading(false);
      return;
    }

    setSettings(json.settings);
    setSecretFlags(json.secretFlags ?? {});
    setLoading(false);
  }, [t.app.aiProvidersLoadFailed]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      await loadSettings();
    })();

    return () => {
      cancelled = true;
    };
  }, [loadSettings]);

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
      setSaveMessage(json?.error ?? t.app.aiProvidersSaveFailed);
      setSaving(false);
      return;
    }

    setSettings(json.settings);
    setSaveMessage(t.common.saved);
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
      setSaveMessage(json?.error ?? t.app.aiProvidersSaveKeyFailed);
      setKeysBusy(false);
      return;
    }

    setSecretFlags(json.secretFlags ?? {});
    setSaveMessage(t.app.aiProvidersKeySaved);
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
      setSaveMessage(json?.error ?? t.app.aiProvidersRemoveKeyFailed);
      setKeysBusy(false);
      return;
    }

    setSecretFlags(json.secretFlags ?? {});
    setSaveMessage(t.app.aiProvidersKeyRemoved);
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
      setSaveMessage(json?.error ?? t.app.aiProvidersBrainTestFailed);
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
      setSaveMessage(json?.error ?? t.app.aiProvidersVoiceTestFailed);
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
        <h3 className="text-lg font-semibold text-white">{t.app.aiProvidersTitle}</h3>
        <p className="mt-4 text-sm text-white/60">{t.common.loading}</p>
      </div>
    );
  }

  const costEstimatorTitle = t.app.aiProvidersCostEstimatorTitle.replace(
    "{comingSoon}",
    t.common.comingSoon
  );
  const keysNotReturnedNote = t.app.aiProvidersKeysNotReturnedNote.replace(
    "{connected}",
    t.common.connected
  );

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white">{t.app.aiProvidersTitle}</h3>
      <p className="mt-2 text-sm text-white/60">{t.app.aiProvidersSubtitle}</p>

      {!settings || errorCode === "AI_SETTINGS_NOT_READY" ? (
        <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
          <p className="font-semibold">AI settings aren’t ready yet.</p>
          <p className="mt-2 text-sm text-amber-100/80">
            Create default settings for this workspace, then refresh.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={loadSettings}>
              {t.admin.buttonRefresh}
            </Button>
          </div>
        </div>
      ) : null}

      {error && settings ? (
        <p className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      {settings ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {t.app.aiProvidersBrainProviderLabel}
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
                <option value="anthropic">Anthropic</option>
                <option value="gemini">Google Gemini</option>
                <option value="deepseek" disabled>
                  {`DeepSeek (${t.common.comingSoon})`}
                </option>
              </select>
              <p className="text-xs text-white/60">
                {t.app.aiProvidersBrainProviderHelp}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {t.app.aiProvidersBrainModelLabel}
              </label>
              {settings.brain_provider === "openai" ? (
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
              ) : (
                <input
                  value={settings.brain_model}
                  onChange={(e) =>
                    setSettings((s) => (s ? { ...s, brain_model: e.target.value } : s))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder={t.app.aiProvidersBrainModelLabel}
                />
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-sm font-semibold text-white">{costEstimatorTitle}</h4>
            <p className="mt-2 text-sm text-white/70">
              {t.app.aiProvidersCostEstimatorBody}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {t.app.aiProvidersVoiceProviderLabel}
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
                <option value="openai">{t.app.aiProvidersVoiceProviderOpenAIIncluded}</option>
                <option value="elevenlabs">{t.app.aiProvidersVoiceProviderElevenLabsByok}</option>
              </select>
              {settings.voice_provider === "elevenlabs" && !secretFlags.elevenlabs_has_key ? (
                <p className="text-xs text-amber-200/90">
                  {t.app.aiProvidersVoiceProviderElevenLabsNeedsKey}
                </p>
              ) : null}
              {settings.voice_provider === "elevenlabs" ? (
                <div className="mt-2 text-xs text-white/60">
                  <p>Included voices are coming soon. ElevenLabs works via BYOK today.</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href={ELEVENLABS_DOCS_URL}
                      className="text-cyan-200 hover:text-cyan-100"
                    >
                      Как получить ключ?
                    </a>
                    {ELEVENLABS_YOUTUBE_URL ? (
                      <a
                        href={ELEVENLABS_YOUTUBE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-200 hover:text-cyan-100"
                      >
                        YouTube инструкция
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                {t.app.aiProvidersVoiceIdLabel}
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
                  placeholder={t.app.aiProvidersVoiceIdPlaceholderElevenLabs}
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={handleSaveSettings} disabled={saving}>
              {saving ? t.common.saving : t.app.aiProvidersSaveButton}
            </Button>
            <Button variant="secondary" onClick={handleTestBrain} disabled={testBrainBusy}>
              {testBrainBusy ? t.common.testing : t.app.aiProvidersTestBrainButton}
            </Button>
            <Button variant="secondary" onClick={handleTestVoice} disabled={testVoiceBusy}>
              {testVoiceBusy ? t.common.generating : t.app.aiProvidersTestVoiceButton}
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
                {t.app.aiProvidersTestBrainResponseLabel}
              </p>
              <p className="mt-2">{testBrainText}</p>
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              {t.app.aiProvidersApiKeysTitle}
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.aiProvidersOpenAiKeyLabel}</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                  placeholder={secretFlags.openai_has_key ? t.common.connected : "sk-..."}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSecret("openai", openaiKey)}
                    disabled={keysBusy || openaiKey.trim().length === 0}
                  >
                    {secretFlags.openai_has_key
                      ? t.app.aiProvidersReplaceKeyButton
                      : t.app.aiProvidersSaveKeyButton}
                  </Button>
                  {secretFlags.openai_has_key ? (
                    <Button
                      variant="outline"
                      onClick={() => removeSecret("openai")}
                      disabled={keysBusy}
                    >
                      {t.app.aiProvidersRemoveKeyButton}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.aiProvidersElevenLabsKeyLabel}</label>
                <input
                  type="password"
                  value={elevenKey}
                  onChange={(e) => setElevenKey(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white"
                  placeholder={secretFlags.elevenlabs_has_key ? t.common.connected : ""}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSecret("elevenlabs", elevenKey)}
                    disabled={keysBusy || elevenKey.trim().length === 0}
                  >
                    {secretFlags.elevenlabs_has_key
                      ? t.app.aiProvidersReplaceKeyButton
                      : t.app.aiProvidersSaveKeyButton}
                  </Button>
                  {secretFlags.elevenlabs_has_key ? (
                    <Button
                      variant="outline"
                      onClick={() => removeSecret("elevenlabs")}
                      disabled={keysBusy}
                    >
                      {t.app.aiProvidersRemoveKeyButton}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/50">
              {keysNotReturnedNote}
            </p>
          </div>

          <audio ref={audioRef} className="w-full" controls />
        </div>
      ) : null}
    </div>
  );
}

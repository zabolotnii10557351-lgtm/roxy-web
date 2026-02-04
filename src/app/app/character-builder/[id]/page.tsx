"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import InfoTooltip from "@/components/InfoTooltip";
import ExportForUnrealButton from "@/components/unreal/ExportForUnrealButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { localeOptions, useLocale, useTranslations } from "@/i18n/client";
import type { z } from "zod";

type CharacterConfig = z.infer<typeof CharacterConfigSchema>;

type CharacterRow = {
  id: string;
  name: string;
  config: unknown;
};

const OPENAI_VOICES = ["alloy", "verse", "aria", "sage", "coral"];

function AutoGrowTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string }) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [props.value]);

  return <textarea {...props} ref={ref} />;
}

function voiceProviderToApi(provider: string): "openai" | "elevenlabs" {
  return provider === "elevenlabs_byok" ? "elevenlabs" : "openai";
}

export default function CharacterBuilderByIdPage() {
  const t = useTranslations();
  const { locale } = useLocale();
  const params = useParams<{ id: string }>();
  const characterId = params?.id;

  const { workspaceId, loading: workspaceLoading, error: workspaceError } =
    useCurrentWorkspace();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<CharacterRow | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [userMessage, setUserMessage] = useState(() => t.app.characterBuilderDefaultUserMessage);
  const [replyBusy, setReplyBusy] = useState(false);
  const [replyText, setReplyText] = useState<string | null>(null);

  const [voiceSampleText, setVoiceSampleText] = useState(
    () => t.app.characterBuilderDefaultUserMessage
  );
  const [voiceBusy, setVoiceBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [fastDnaPrompt, setFastDnaPrompt] = useState("");
  const [fastDnaBusy, setFastDnaBusy] = useState(false);
  const [audioDnaBusy, setAudioDnaBusy] = useState(false);
  const [audioDnaTranscript, setAudioDnaTranscript] = useState<string | null>(null);
  const [fastDnaResult, setFastDnaResult] = useState<
    | {
        persona: string;
        system_prompt: string;
        behavior_rules: string;
        style: string;
        safety_rules: string[];
        sample_lines: string[];
        stream_behavior: { short_answers: boolean; max_response_seconds: number };
        goals: string;
      }
    | null
  >(null);

  const [talkMessages, setTalkMessages] = useState<
    Array<{ role: "user" | "assistant"; text: string }>
  >([]);
  const [talkInput, setTalkInput] = useState("");
  const [talkBusy, setTalkBusy] = useState(false);
  const [talkAutoVoice, setTalkAutoVoice] = useState(false);

  const config = useMemo(() => {
    const parsed = CharacterConfigSchema.safeParse(character?.config ?? {});
    return parsed.success ? parsed.data : CharacterConfigSchema.parse({});
  }, [character?.config]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!characterId) return;
      if (workspaceLoading) return;
      if (!workspaceId) {
        setError(workspaceError ?? t.app.characterBuilderNoWorkspaceConfigured);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const supabase = createSupabaseBrowserClient();
      const { data, error: fetchError } = await supabase
        .from("characters")
        .select("id, name, config")
        .eq("workspace_id", workspaceId)
        .eq("id", characterId)
        .single();

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setCharacter(data as CharacterRow);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [characterId, workspaceId, workspaceLoading, workspaceError, t.app.characterBuilderNoWorkspaceConfigured]);

  const updateConfig = useCallback((patch: Partial<CharacterConfig>) => {
    setCharacter((c) => {
      if (!c) return c;

      const parsed = CharacterConfigSchema.safeParse(c.config ?? {});
      const base = parsed.success ? parsed.data : CharacterConfigSchema.parse({});
      const next: CharacterConfig = { ...base, ...patch };

      return { ...c, config: next };
    });
  }, []);

  useEffect(() => {
    if (!character?.id) return;

    const provider = config.brain?.provider ?? "openai";
    const model = (config.brain?.model ?? "").trim();
    if (provider !== "openai" && model === "gpt-4o-mini") {
      updateConfig({ brain: { provider, model: "" } });
      return;
    }

    if (provider === "openai" && model.length === 0) {
      updateConfig({ brain: { provider, model: "gpt-4o-mini" } });
    }
  }, [character?.id, config.brain?.provider, config.brain?.model, updateConfig]);

  const handleSave = async () => {
    if (!character) return;
    if (!workspaceId) return;

    setSaving(true);
    setSaveMessage(null);

    const supabase = createSupabaseBrowserClient();
    const validated = CharacterConfigSchema.parse(character.config ?? {});

    const { error: updateError } = await supabase
      .from("characters")
      .update({
        name: character.name,
        config: validated,
      })
      .eq("workspace_id", workspaceId)
      .eq("id", character.id);

    if (updateError) {
      setSaveMessage(updateError.message);
      setSaving(false);
      return;
    }

    setSaveMessage(t.common.saved);
    setSaving(false);
  };

  const handleTestReply = async () => {
    if (!character) return;

    setReplyBusy(true);
    setReplyText(null);
    setSaveMessage(null);

    const res = await fetch("/api/ai/test-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterId: character.id,
        userMessage,
      }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setSaveMessage(json?.error ?? t.app.characterBuilderTestResponseFailed);
      setReplyBusy(false);
      return;
    }

    setReplyText(String(json.text ?? ""));
    setReplyBusy(false);
  };

  const handleTestVoice = async () => {
    if (!character) return;

    setVoiceBusy(true);
    setSaveMessage(null);

    const language = (config.language?.primary ?? "en").trim() || "en";
    const text = voiceSampleText.trim().length > 0
      ? voiceSampleText.trim()
      : language.toLowerCase().startsWith("ru")
        ? "Привет! Это тест голоса RoxStreamAI."
        : "Hello! This is a RoxStreamAI voice test.";

    const voiceProvider = voiceProviderToApi(config.voice?.provider ?? "openai_included");
    const voiceId = config.voice?.voiceId?.trim() || "alloy";

    const res = await fetch("/api/ai/test-voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voiceProvider,
        voiceId,
        language,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      setSaveMessage(json?.error ?? t.app.characterBuilderTestVoiceFailed);
      setVoiceBusy(false);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    if (audioRef.current) {
      audioRef.current.src = url;
      try {
        await audioRef.current.play();
      } catch {
        // autoplay can be blocked
      }
    }

    setVoiceBusy(false);
  };

  const handleFastDna = async () => {
    if (!character) return;

    setFastDnaBusy(true);
    setSaveMessage(null);

    const res = await fetch("/api/ai/fast-dna", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: fastDnaPrompt,
        language: (config.language?.primary ?? "en").trim() || "en",
        brainProvider: config.brain?.provider ?? "openai",
        brainModel: config.brain?.model?.trim() || undefined,
      }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setSaveMessage(json?.error ?? "Fast DNA generation failed.");
      setFastDnaBusy(false);
      return;
    }

    setFastDnaResult(json?.dna ?? null);
    setFastDnaBusy(false);
  };

  const handleTranscribeAudioForDna = async (file: File | null) => {
    if (!file) return;

    setAudioDnaBusy(true);
    setSaveMessage(null);
    setAudioDnaTranscript(null);

    try {
      const form = new FormData();
      form.append("audio", file, file.name);
      form.append("language", (config.language?.primary ?? "en").trim() || "en");

      const res = await fetch("/api/ai/transcribe", {
        method: "POST",
        body: form,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setSaveMessage(json?.error ?? "Transcription failed.");
        setAudioDnaBusy(false);
        return;
      }

      const text = String(json?.text ?? "").trim();
      setAudioDnaTranscript(text.length > 0 ? text : null);
      if (text.length > 0) {
        setFastDnaPrompt(text);
      }
    } catch (e: unknown) {
      setSaveMessage(e instanceof Error ? e.message : "Transcription failed.");
    } finally {
      setAudioDnaBusy(false);
    }
  };

  const handleTalkSend = async () => {
    if (!character) return;
    const trimmed = talkInput.trim();
    if (trimmed.length === 0) return;

    setTalkBusy(true);
    setSaveMessage(null);

    const nextMessages = [...talkMessages, { role: "user" as const, text: trimmed }];
    setTalkMessages(nextMessages);
    setTalkInput("");

    const res = await fetch("/api/ai/talk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterId: character.id,
        messages: nextMessages,
      }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setSaveMessage(json?.error ?? "Talk request failed.");
      setTalkBusy(false);
      return;
    }

    const assistantText = String(json?.text ?? "").trim();
    const withAssistant = assistantText.length
      ? [...nextMessages, { role: "assistant" as const, text: assistantText }]
      : nextMessages;

    setTalkMessages(withAssistant);

    if (talkAutoVoice && assistantText.length > 0) {
      try {
        const language = (config.language?.primary ?? "en").trim() || "en";
        const voiceProvider = voiceProviderToApi(config.voice?.provider ?? "openai_included");
        const voiceId = config.voice?.voiceId?.trim() || "alloy";

        const voiceRes = await fetch("/api/ai/test-voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: assistantText,
            voiceProvider,
            voiceId,
            language,
          }),
        });

        if (voiceRes.ok) {
          const blob = await voiceRes.blob();
          const url = URL.createObjectURL(blob);

          if (audioRef.current) {
            audioRef.current.src = url;
            try {
              await audioRef.current.play();
            } catch {
              // autoplay can be blocked
            }
          }
        }
      } catch {
        // ignore voice playback errors
      }
    }

    setTalkBusy(false);
  };

  const applyFastDna = () => {
    if (!fastDnaResult) return;

    updateConfig({
      profile: {
        ...config.profile,
        bio: fastDnaResult.persona ?? config.profile?.bio ?? "",
        goals: fastDnaResult.goals ?? config.profile?.goals ?? "",
      },
      dna: {
        ...config.dna,
        systemPrompt: fastDnaResult.system_prompt ?? "",
        behavior: fastDnaResult.behavior_rules ?? "",
        style: fastDnaResult.style ?? "",
      },
      safety: {
        rules: fastDnaResult.safety_rules ?? [],
      },
      streamBehavior: {
        shortAnswers: fastDnaResult.stream_behavior?.short_answers ?? true,
        maxResponseSeconds:
          fastDnaResult.stream_behavior?.max_response_seconds ?? 8,
      },
    });
  };

  if (loading) {
    return <p className="text-sm text-white/60">{t.common.loading}</p>;
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {error}
      </p>
    );
  }

  if (!character) {
    return <p className="text-sm text-white/60">{t.app.characterBuilderNotFound}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.characterBuilder}</h2>
          <p className="text-sm text-white/60">{t.app.characterBuilderLiveNote}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge>{t.app.characterBuilderDraft}</Badge>
          <ExportForUnrealButton
            characterId={character.id}
            characterName={character.name}
            variant="secondary"
          />
          <Button variant="secondary" onClick={handleSave} disabled={saving}>
            {saving ? t.common.saving : t.common.save}
          </Button>
        </div>
      </div>

      {saveMessage ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          {saveMessage}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{t.app.characterBuilderProfileTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                value={character.name}
                onChange={(e) => setCharacter((c) => (c ? { ...c, name: e.target.value } : c))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder={t.app.characterBuilderCharacterNamePlaceholder}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-white/60">{t.app.characterBuilderPrimaryLanguagePlaceholder}</label>
                  <InfoTooltip text={`Used for replies, voice tests, and Fast DNA. Default: ${locale.toUpperCase()}.`} />
                </div>
                <input
                  value={(config.language?.primary ?? "").trim() || locale}
                  onChange={(e) => updateConfig({ language: { primary: e.target.value } })}
                  list="character-language-options"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder={t.app.characterBuilderPrimaryLanguagePlaceholder}
                />
                <datalist id="character-language-options">
                  {localeOptions.map((option) => (
                    <option key={option.code} value={option.code} label={option.label} />
                  ))}
                  <option value="en" label="English" />
                  <option value="ru" label="Русский" />
                  <option value="es" label="Español" />
                  <option value="fr" label="Français" />
                  <option value="de" label="Deutsch" />
                  <option value="pt" label="Português" />
                  <option value="it" label="Italiano" />
                  <option value="tr" label="Türkçe" />
                  <option value="ja" label="日本語" />
                  <option value="zh" label="中文" />
                  <option value="uk" label="Українська" />
                </datalist>
              </div>
            </div>
            <AutoGrowTextarea
              value={config.profile?.bio ?? ""}
              onChange={(e) => updateConfig({ profile: { ...config.profile, bio: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder={t.app.characterBuilderBioPlaceholder}
              rows={4}
            />
            <AutoGrowTextarea
              value={config.dna?.systemPrompt ?? ""}
              onChange={(e) => updateConfig({ dna: { ...config.dna, systemPrompt: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="System prompt"
              rows={3}
            />
            <AutoGrowTextarea
              value={config.dna?.behavior ?? ""}
              onChange={(e) => updateConfig({ dna: { ...config.dna, behavior: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Behavior rules and guardrails"
              rows={3}
            />
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Brain</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.aiProvidersBrainProviderLabel}</label>
                <select
                  value={config.brain?.provider ?? "openai"}
                  onChange={(e) =>
                    updateConfig({
                      brain: {
                        ...config.brain,
                        provider: e.target.value as CharacterConfig["brain"]["provider"],
                        model:
                          e.target.value === "openai" ? "gpt-4o-mini" : "",
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                >
                  <option value="openai" className="text-black">OpenAI</option>
                  <option value="anthropic" className="text-black">Anthropic</option>
                  <option value="gemini" className="text-black">Google Gemini</option>
                  <option value="deepseek" disabled className="text-black">
                    DeepSeek (coming soon)
                  </option>
                </select>
                {config.brain?.provider !== "openai" && (config.brain?.model ?? "").trim().length === 0 ? (
                  <p className="text-xs text-white/50">
                    Using server default model (set `ANTHROPIC_MODEL` / `GEMINI_MODEL` on Vercel).
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.aiProvidersBrainModelLabel}</label>
                <input
                  value={
                    config.brain?.provider === "openai"
                      ? (config.brain?.model ?? "").trim() || "gpt-4o-mini"
                      : (config.brain?.model ?? "").trim()
                  }
                  readOnly
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder={
                    config.brain?.provider === "openai"
                      ? "gpt-4o-mini"
                      : "Uses server default"
                  }
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{t.app.characterBuilderVoiceTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.characterBuilderVoiceProviderLabel}</label>
                <select
                  value={config.voice?.provider ?? "openai_included"}
                  onChange={(e) =>
                    updateConfig({
                      voice: {
                        ...config.voice,
                        provider: e.target.value as CharacterConfig["voice"]["provider"],
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                >
                  <option value="openai_included" className="text-black">{t.app.characterBuilderVoiceProviderOpenAIIncluded}</option>
                  <option value="elevenlabs_byok" className="text-black">{t.app.characterBuilderVoiceProviderElevenLabsByok}</option>
                </select>
                {config.voice?.provider === "openai_included" ? (
                  <p className="text-xs text-white/50">
                    Requires server `OPENAI_API_KEY` (Vercel env) or your own key in Settings.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.characterBuilderVoiceIdLabel}</label>
                {config.voice?.provider === "openai_included" ? (
                  <select
                    value={(config.voice?.voiceId ?? "").trim() || "alloy"}
                    onChange={(e) => updateConfig({ voice: { ...config.voice, voiceId: e.target.value } })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  >
                    {OPENAI_VOICES.map((voice) => (
                      <option key={voice} value={voice} className="text-black">
                        {voice}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={config.voice?.voiceId ?? ""}
                    onChange={(e) => updateConfig({ voice: { ...config.voice, voiceId: e.target.value } })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                    placeholder={t.app.characterBuilderVoiceIdPlaceholderElevenLabs}
                  />
                )}
              </div>
            </div>
            <AutoGrowTextarea
              value={voiceSampleText}
              onChange={(e) => setVoiceSampleText(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              rows={2}
              placeholder={t.app.characterBuilderDefaultUserMessage}
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={handleTestVoice} disabled={voiceBusy}>
                {voiceBusy ? t.common.generating : t.app.characterBuilderTestVoice}
              </Button>
              <audio ref={audioRef} controls />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{t.app.characterBuilderTestResponseTitle}</h3>
            <p className="mt-2 text-sm text-white/60">
              {t.app.characterBuilderTestResponseDescription}
            </p>
            <AutoGrowTextarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              rows={3}
            />
            <div className="mt-4 flex items-center gap-3">
              <Button variant="secondary" onClick={handleTestReply} disabled={replyBusy}>
                {replyBusy ? t.common.thinking : t.app.characterBuilderTestResponse}
              </Button>
            </div>

            {replyText ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t.app.characterBuilderReplyLabel}</p>
                <p className="mt-2">{replyText}</p>
              </div>
            ) : null}
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">Talk to AI</h3>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-violet-400"
                    checked={talkAutoVoice}
                    onChange={(e) => setTalkAutoVoice(e.target.checked)}
                  />
                  Speak replies
                </label>
                <Button
                  variant="outline"
                  onClick={() => setTalkMessages([])}
                  disabled={talkBusy || talkMessages.length === 0}
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="mt-4 max-h-[320px] space-y-3 overflow-auto rounded-2xl border border-white/10 bg-white/5 p-4">
              {talkMessages.length === 0 ? (
                <p className="text-sm text-white/50">
                  Send a message to preview how your character responds. This uses the configured Brain provider.
                </p>
              ) : (
                talkMessages.map((m, idx) => (
                  <div
                    key={`${m.role}-${idx}`}
                    className={
                      m.role === "user"
                        ? "ml-auto max-w-[90%] rounded-2xl bg-violet-500/15 px-4 py-3 text-sm text-white"
                        : "mr-auto max-w-[90%] rounded-2xl bg-white/10 px-4 py-3 text-sm text-white"
                    }
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      {m.role === "user" ? "You" : "AI"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{m.text}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div className="flex-1">
                <AutoGrowTextarea
                  value={talkInput}
                  onChange={(e) => setTalkInput(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  rows={2}
                  placeholder="Type a message…"
                />
              </div>
              <Button
                variant="secondary"
                onClick={handleTalkSend}
                disabled={talkBusy || talkInput.trim().length === 0}
              >
                {talkBusy ? t.common.thinking : "Send"}
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Fast DNA</h3>
            <p className="mt-2 text-sm text-white/60">
              Describe the streamer you want. We’ll generate persona, rules, style, safety, examples, and behavior.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Audio DNA assistant (beta)</p>
                <p className="text-xs text-white/50">Uploads stay server-side; requires OpenAI key.</p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleTranscribeAudioForDna(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-white/15"
                  disabled={audioDnaBusy}
                />
                {audioDnaBusy ? (
                  <span className="text-xs text-white/60">Transcribing…</span>
                ) : null}
              </div>
              {audioDnaTranscript ? (
                <p className="mt-3 text-xs text-white/60">
                  Transcript loaded into the prompt below.
                </p>
              ) : null}
            </div>

            <AutoGrowTextarea
              value={fastDnaPrompt}
              onChange={(e) => setFastDnaPrompt(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              rows={3}
              placeholder="e.g. Energetic tech streamer who loves memes and explains new gadgets in simple language"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleFastDna}
                disabled={fastDnaBusy || fastDnaPrompt.trim().length < 10}
              >
                {fastDnaBusy ? t.common.generating : "Generate Fast DNA"}
              </Button>
              <Button
                variant="outline"
                onClick={applyFastDna}
                disabled={!fastDnaResult}
              >
                Apply to DNA
              </Button>
              <Button
                variant="secondary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? t.common.saving : "Save preset"}
              </Button>
            </div>

            {fastDnaResult ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Preview</p>
                <p className="mt-2"><strong>Persona:</strong> {fastDnaResult.persona}</p>
                <p className="mt-2"><strong>Behavior:</strong> {fastDnaResult.behavior_rules}</p>
                <p className="mt-2"><strong>Style:</strong> {fastDnaResult.style}</p>
                {fastDnaResult.sample_lines?.length ? (
                  <p className="mt-2"><strong>Examples:</strong> {fastDnaResult.sample_lines.join(" | ")}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.characterBuilderNotesTitle}</h3>
          <p className="mt-2 text-sm text-white/60">
            {t.app.characterBuilderNotesDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

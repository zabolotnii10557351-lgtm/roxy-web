"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ExportForUnrealButton from "@/components/unreal/ExportForUnrealButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { useTranslations } from "@/i18n/client";
import type { z } from "zod";

type CharacterConfig = z.infer<typeof CharacterConfigSchema>;

type CharacterRow = {
  id: string;
  name: string;
  config: unknown;
};

const OPENAI_VOICES = ["alloy", "verse", "aria", "sage", "coral"];

function voiceProviderToApi(provider: string): "openai" | "elevenlabs" {
  return provider === "elevenlabs_byok" ? "elevenlabs" : "openai";
}

export default function CharacterBuilderByIdPage() {
  const t = useTranslations();
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

  const updateConfig = (patch: Partial<CharacterConfig>) => {
    setCharacter((c) => {
      if (!c) return c;

      const parsed = CharacterConfigSchema.safeParse(c.config ?? {});
      const base = parsed.success ? parsed.data : CharacterConfigSchema.parse({});
      const next: CharacterConfig = { ...base, ...patch };

      return { ...c, config: next };
    });
  };

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

    const language = config.language?.primary ?? "en";
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
        language: config.language?.primary ?? "en",
        brainProvider: config.brain?.provider ?? "openai",
        brainModel: config.brain?.model ?? "gpt-4o-mini",
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
              <input
                value={config.language?.primary ?? "en"}
                onChange={(e) => updateConfig({ language: { primary: e.target.value } })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder={t.app.characterBuilderPrimaryLanguagePlaceholder}
              />
            </div>
            <textarea
              value={config.profile?.bio ?? ""}
              onChange={(e) => updateConfig({ profile: { ...config.profile, bio: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder={t.app.characterBuilderBioPlaceholder}
              rows={4}
            />
            <textarea
              value={config.dna?.systemPrompt ?? ""}
              onChange={(e) => updateConfig({ dna: { ...config.dna, systemPrompt: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="System prompt"
              rows={3}
            />
            <textarea
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
                      },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="deepseek" disabled>
                    DeepSeek (coming soon)
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.aiProvidersBrainModelLabel}</label>
                <input
                  value={config.brain?.model ?? ""}
                  onChange={(e) => updateConfig({ brain: { ...config.brain, model: e.target.value } })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder={t.app.aiProvidersBrainModelLabel}
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
                  <option value="openai_included">{t.app.characterBuilderVoiceProviderOpenAIIncluded}</option>
                  <option value="elevenlabs_byok">{t.app.characterBuilderVoiceProviderElevenLabsByok}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">{t.app.characterBuilderVoiceIdLabel}</label>
                {config.voice?.provider === "openai_included" ? (
                  <select
                    value={config.voice?.voiceId ?? ""}
                    onChange={(e) => updateConfig({ voice: { ...config.voice, voiceId: e.target.value } })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  >
                    {OPENAI_VOICES.map((voice) => (
                      <option key={voice} value={voice}>
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
            <textarea
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
            <textarea
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
            <h3 className="text-lg font-semibold text-white">Fast DNA</h3>
            <p className="mt-2 text-sm text-white/60">
              Describe the streamer you want. We’ll generate persona, rules, style, safety, examples, and behavior.
            </p>
            <textarea
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

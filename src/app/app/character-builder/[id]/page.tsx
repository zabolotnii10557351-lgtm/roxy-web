"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ExportForUnrealButton from "@/components/unreal/ExportForUnrealButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import type { z } from "zod";

type CharacterConfig = z.infer<typeof CharacterConfigSchema>;

type CharacterRow = {
  id: string;
  name: string;
  config: unknown;
};

function voiceProviderToApi(provider: string): "openai" | "elevenlabs" {
  return provider === "elevenlabs_byok" ? "elevenlabs" : "openai";
}

export default function CharacterBuilderByIdPage() {
  const params = useParams<{ id: string }>();
  const characterId = params?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<CharacterRow | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [userMessage, setUserMessage] = useState("Hi! Give me a short, fun greeting.");
  const [replyBusy, setReplyBusy] = useState(false);
  const [replyText, setReplyText] = useState<string | null>(null);

  const [voiceBusy, setVoiceBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const config = useMemo(() => {
    const parsed = CharacterConfigSchema.safeParse(character?.config ?? {});
    return parsed.success ? parsed.data : CharacterConfigSchema.parse({});
  }, [character?.config]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!characterId) return;

      setLoading(true);
      setError(null);

      const supabase = createSupabaseBrowserClient();
      const { data, error: fetchError } = await supabase
        .from("characters")
        .select("id, name, config")
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
  }, [characterId]);

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
      .eq("id", character.id);

    if (updateError) {
      setSaveMessage(updateError.message);
      setSaving(false);
      return;
    }

    setSaveMessage("Saved.");
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
      setSaveMessage(json?.error ?? "Test Response failed.");
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
    const text = language.toLowerCase().startsWith("ru")
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
      setSaveMessage(json?.error ?? "Test Voice failed.");
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

  if (loading) {
    return <p className="text-sm text-white/60">Loading…</p>;
  }

  if (error) {
    return (
      <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {error}
      </p>
    );
  }

  if (!character) {
    return <p className="text-sm text-white/60">Character not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Character Builder</h2>
          <p className="text-sm text-white/60">Brain + Voice testing is live.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge>Draft</Badge>
          <ExportForUnrealButton
            characterId={character.id}
            characterName={character.name}
            variant="secondary"
          />
          <Button variant="secondary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
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
            <h3 className="text-lg font-semibold text-white">Profile</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                value={character.name}
                onChange={(e) => setCharacter((c) => (c ? { ...c, name: e.target.value } : c))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Character name"
              />
              <input
                value={config.language?.primary ?? "en"}
                onChange={(e) => updateConfig({ language: { primary: e.target.value } })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Primary language (en/ru)"
              />
            </div>
            <textarea
              value={config.profile?.bio ?? ""}
              onChange={(e) => updateConfig({ profile: { ...config.profile, bio: e.target.value } })}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Persona and tone guidelines"
              rows={4}
            />
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Voice</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Voice provider</label>
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
                  <option value="openai_included">OpenAI (included)</option>
                  <option value="elevenlabs_byok">ElevenLabs (BYOK)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Voice preset / Voice ID</label>
                <input
                  value={config.voice?.voiceId ?? ""}
                  onChange={(e) => updateConfig({ voice: { ...config.voice, voiceId: e.target.value } })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder={config.voice?.provider === "elevenlabs_byok" ? "ElevenLabs Voice ID" : "alloy"}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={handleTestVoice} disabled={voiceBusy}>
                {voiceBusy ? "Generating…" : "Test Voice"}
              </Button>
              <audio ref={audioRef} controls />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Test Response</h3>
            <p className="mt-2 text-sm text-white/60">
              Calls the workspace brain provider and applies your character persona.
            </p>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              rows={3}
            />
            <div className="mt-4 flex items-center gap-3">
              <Button variant="secondary" onClick={handleTestReply} disabled={replyBusy}>
                {replyBusy ? "Thinking…" : "Test Response"}
              </Button>
            </div>

            {replyText ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Reply</p>
                <p className="mt-2">{replyText}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Notes</h3>
          <p className="mt-2 text-sm text-white/60">
            Configure provider defaults in Settings → AI Providers.
          </p>
        </div>
      </div>
    </div>
  );
}

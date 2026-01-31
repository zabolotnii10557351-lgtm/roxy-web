"use client";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useTranslations } from "@/i18n/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";

const tabs = [
  "Profile",
  "Voice & Language",
  "Knowledge Pack",
  "Safety",
  "Memory",
  "Stream Behavior",
  "Publish",
];

export default function CharacterBuilderPage() {
  const t = useTranslations();
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateDraft = async () => {
    setCreating(true);
    setCreateError(null);

    const supabase = createSupabaseBrowserClient();
    const defaultConfig = CharacterConfigSchema.parse({});

    const { data, error } = await supabase
      .from("characters")
      .insert({ name: "New character", config: defaultConfig })
      .select("id")
      .single();

    if (error) {
      setCreateError(error.message);
      setCreating(false);
      return;
    }

    router.push(`/app/character-builder/${data.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {t.app.characterBuilder}
          </h2>
          <p className="text-sm text-white/60">
            {t.app.characterBuilderSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge>Draft updated</Badge>
          <Button variant="secondary" onClick={handleCreateDraft} disabled={creating}>
            {creating ? "Creating…" : "Create draft"}
          </Button>
        </div>
      </div>

      {createError ? (
        <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {createError}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <span
            key={tab}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Profile</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Character name"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Persona archetype"
              />
            </div>
            <textarea
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Backstory and tone guidelines"
              rows={4}
            />
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Voice & Language</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Voice preset"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Primary language"
              />
            </div>
            <Button className="mt-4" variant="secondary">
              Test Response
            </Button>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Safety</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Blocked topics"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Rate limit"
              />
            </div>
          </div>
        </div>

        <div className="glass-card sticky top-24 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
            <Badge>Preview</Badge>
          </div>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-white/50">Chat</p>
              <p>user_912: Hi Roxy, show us a challenge!</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-white/50">Roxy reply</p>
              <p>
                Let’s spin the wheel. If we hit 7, we unlock a mini-game. Ready?
              </p>
            </div>
          </div>
          <Button className="mt-6 w-full" variant="secondary">
            Simulate Gift
          </Button>
        </div>
      </div>
    </div>
  );
}

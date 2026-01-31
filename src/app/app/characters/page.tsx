"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";
import PolyphoriaComingSoonModal from "@/components/polyphoria/PolyphoriaComingSoonModal";

export default function CharactersPage() {
  const t = useTranslations();
  const [polyphoriaOpen, setPolyphoriaOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.characters}</h2>
          <p className="text-sm text-white/60">
            {t.app.charactersSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setPolyphoriaOpen(true)}>
            3D Editor
          </Button>
          <Button href="/app/characters/new">{t.app.createCharacter}</Button>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-10 text-center">
        <p className="text-sm text-white/70">
          {t.app.noCharacters}
        </p>
        <Button className="mt-4" variant="secondary" href="/app/characters/new">
          {t.app.createCharacter}
        </Button>
      </div>

      <PolyphoriaComingSoonModal open={polyphoriaOpen} onClose={() => setPolyphoriaOpen(false)} />
    </div>
  );
}

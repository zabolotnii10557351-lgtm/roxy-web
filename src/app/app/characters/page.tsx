"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

export default function CharactersPage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{t.app.characters}</h2>
          <p className="text-sm text-white/60">
            {t.app.charactersSubtitle}
          </p>
        </div>
        <Button>{t.app.createCharacter}</Button>
      </div>

      <div className="glass-card rounded-3xl p-10 text-center">
        <p className="text-sm text-white/70">
          {t.app.noCharacters}
        </p>
        <Button className="mt-4" variant="secondary">
          {t.app.createCharacter}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";
import PolyphoriaComingSoonModal from "@/components/polyphoria/PolyphoriaComingSoonModal";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type CharacterRow = {
  id: string;
  name: string | null;
};

export default function CharactersPage() {
  const t = useTranslations();
  const [polyphoriaOpen, setPolyphoriaOpen] = useState(false);

  const { workspaceId, loading: workspaceLoading, error: workspaceError } =
    useCurrentWorkspace();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CharacterRow[]>([]);

  useEffect(() => {
    if (workspaceLoading) return;
    if (!workspaceId) {
      setError(workspaceError ?? "No workspace configured.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      const supabase = createSupabaseBrowserClient();
      const { data, error: fetchError } = await supabase
        .from("characters")
        .select("id, name")
        .eq("workspace_id", workspaceId);

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
        setItems([]);
        setLoading(false);
        return;
      }

      setItems((data ?? []) as CharacterRow[]);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [workspaceId, workspaceLoading, workspaceError]);

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
        {loading ? (
          <p className="text-sm text-white/60">Loading…</p>
        ) : error ? (
          <p className="text-sm text-rose-200">{error}</p>
        ) : items.length === 0 ? (
          <>
            <p className="text-sm text-white/70">{t.app.noCharacters}</p>
            <Button className="mt-4" variant="secondary" href="/app/characters/new">
              {t.app.createCharacter}
            </Button>
          </>
        ) : (
          <div className="space-y-3 text-left">
            {items.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {c.name?.trim() ? c.name : "Untitled character"}
                  </p>
                  <p className="text-xs text-white/50">{c.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" href={`/app/character-builder/${c.id}`}>
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PolyphoriaComingSoonModal open={polyphoriaOpen} onClose={() => setPolyphoriaOpen(false)} />
    </div>
  );
}

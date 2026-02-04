"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
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

  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [draftNames, setDraftNames] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmIds, setConfirmIds] = useState<string[]>([]);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmDescription, setConfirmDescription] = useState<string>("");

  const selectedCount = useMemo(() => {
    return Object.values(selectedIds).filter(Boolean).length;
  }, [selectedIds]);

  const openConfirmDelete = useCallback((ids: string[]) => {
    const count = ids.length;
    setConfirmIds(ids);
    setConfirmTitle(count === 1 ? "Delete character?" : `Delete ${count} characters?`);
    setConfirmDescription(
      count === 1
        ? "This action cannot be undone."
        : "This action cannot be undone. The selected characters will be permanently removed.",
    );
    setConfirmOpen(true);
  }, []);

  const loadCharacters = useCallback(async () => {
    if (!workspaceId) return;
    const supabase = createSupabaseBrowserClient();
    const { data, error: fetchError } = await supabase
      .from("characters")
      .select("id, name")
      .eq("workspace_id", workspaceId);

    if (fetchError) {
      throw fetchError;
    }
    return (data ?? []) as CharacterRow[];
  }, [workspaceId]);

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
      try {
        const rows = (await loadCharacters()) ?? [];
        if (cancelled) return;
        setItems(rows);
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Failed to load characters";
        setError(message);
        setItems([]);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [workspaceId, workspaceLoading, workspaceError, loadCharacters]);

  useEffect(() => {
    if (!editMode) return;
    const nextDrafts: Record<string, string> = {};
    for (const c of items) {
      nextDrafts[c.id] = draftNames[c.id] ?? (c.name?.trim() ? c.name : "");
    }
    setDraftNames(nextDrafts);

    const nextSelected: Record<string, boolean> = {};
    for (const c of items) {
      if (selectedIds[c.id]) nextSelected[c.id] = true;
    }
    setSelectedIds(nextSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, items]);

  const handleRename = useCallback(
    async (id: string) => {
      if (!workspaceId) return;
      const nextNameRaw = draftNames[id] ?? "";
      const nextName = nextNameRaw.trim();

      const existing = items.find((x) => x.id === id);
      const existingName = existing?.name?.trim() ?? "";
      if (nextName === existingName) return;

      setBusy(true);
      setError(null);
      try {
        const supabase = createSupabaseBrowserClient();
        const { error: updateError } = await supabase
          .from("characters")
          .update({ name: nextName.length === 0 ? null : nextName })
          .eq("id", id)
          .eq("workspace_id", workspaceId);
        if (updateError) throw updateError;

        const rows = (await loadCharacters()) ?? [];
        setItems(rows);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to rename character";
        setError(message);
      } finally {
        setBusy(false);
      }
    },
    [workspaceId, draftNames, items, loadCharacters],
  );

  const handleDelete = useCallback(
    async (ids: string[]) => {
      if (!workspaceId) return;
      if (ids.length === 0) return;

      setBusy(true);
      setError(null);
      try {
        const supabase = createSupabaseBrowserClient();
        const { error: deleteError } = await supabase
          .from("characters")
          .delete()
          .in("id", ids)
          .eq("workspace_id", workspaceId);
        if (deleteError) throw deleteError;

        setSelectedIds((prev) => {
          const next = { ...prev };
          for (const id of ids) delete next[id];
          return next;
        });
        setDraftNames((prev) => {
          const next = { ...prev };
          for (const id of ids) delete next[id];
          return next;
        });

        const rows = (await loadCharacters()) ?? [];
        setItems(rows);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to delete character";
        setError(message);
      } finally {
        setBusy(false);
      }
    },
    [workspaceId, loadCharacters],
  );

  const confirmDeleteSelected = useCallback(() => {
    const ids = Object.entries(selectedIds)
      .filter(([, v]) => v)
      .map(([id]) => id);
    openConfirmDelete(ids);
  }, [openConfirmDelete, selectedIds]);

  const toggleSelectAll = useCallback(() => {
    if (items.length === 0) return;
    const allSelected = items.every((c) => selectedIds[c.id]);
    if (allSelected) {
      setSelectedIds({});
      return;
    }
    const next: Record<string, boolean> = {};
    for (const c of items) next[c.id] = true;
    setSelectedIds(next);
  }, [items, selectedIds]);

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
          <Button
            variant={editMode ? "secondary" : "ghost"}
            onClick={() => {
              setError(null);
              setEditMode((v) => !v);
              if (editMode) {
                setSelectedIds({});
              }
            }}
          >
            {editMode ? "Done" : "Edit"}
          </Button>
          <Button variant="secondary" onClick={() => setPolyphoriaOpen(true)}>
            3D Editor
          </Button>
          <Button href="/app/characters/new">{t.app.createCharacter}</Button>
        </div>
      </div>

      {editMode && items.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-white/70">
            <input
              type="checkbox"
              checked={items.length > 0 && items.every((c) => selectedIds[c.id])}
              onChange={toggleSelectAll}
              disabled={busy}
            />
            Select all
          </label>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="border-rose-400/30 bg-rose-500/15 text-rose-50 hover:bg-rose-500/25"
              onClick={confirmDeleteSelected}
              disabled={busy || selectedCount === 0}
            >
              Delete selected ({selectedCount})
            </Button>
          </div>
        </div>
      ) : null}

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
                <div className="min-w-0 flex-1">
                  {editMode ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 text-xs text-white/70">
                        <input
                          type="checkbox"
                          checked={!!selectedIds[c.id]}
                          onChange={(e) =>
                            setSelectedIds((prev) => ({ ...prev, [c.id]: e.target.checked }))
                          }
                          disabled={busy}
                        />
                        Select
                      </label>
                      <input
                        value={draftNames[c.id] ?? (c.name?.trim() ? c.name : "")}
                        onChange={(e) =>
                          setDraftNames((prev) => ({ ...prev, [c.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleRename(c.id);
                          }
                        }}
                        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                        placeholder="Character name"
                        disabled={busy}
                      />
                      <Button
                        variant="ghost"
                        onClick={() => void handleRename(c.id)}
                        disabled={busy}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-white">
                        {c.name?.trim() ? c.name : "Untitled character"}
                      </p>
                      <p className="text-xs text-white/50">{c.id}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="border border-rose-400/20 bg-rose-500/10 text-rose-50 hover:bg-rose-500/20"
                    onClick={() => openConfirmDelete([c.id])}
                    disabled={busy}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary" href={`/app/character-builder/${c.id}`}>
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        description={confirmDescription}
        cancelLabel={t.common.cancel}
        confirmLabel={busy ? t.common.loading : "Yes, delete"}
        confirmVariant="secondary"
        confirmClassName="border-rose-400/30 bg-rose-500/15 text-rose-50 hover:bg-rose-500/25"
        busy={busy}
        onClose={() => {
          if (busy) return;
          setConfirmOpen(false);
          setConfirmIds([]);
        }}
        onConfirm={async () => {
          const ids = confirmIds;
          setConfirmOpen(false);
          setConfirmIds([]);
          await handleDelete(ids);
        }}
      />

      <PolyphoriaComingSoonModal open={polyphoriaOpen} onClose={() => setPolyphoriaOpen(false)} />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";

function safeFilePart(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, "_")
    .replaceAll(/[^a-z0-9_\-]/g, "")
    .slice(0, 40);
}

export default function ExportForUnrealButton(props: {
  characterId: string;
  characterName: string;
  variant?: "primary" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  const [includeDonoRules, setIncludeDonoRules] = useState(true);
  const [includeScripts, setIncludeScripts] = useState(true);
  const [includeScenes, setIncludeScenes] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const filename = useMemo(() => {
    const name = safeFilePart(props.characterName) || "character";
    return `rox_character_${name}_${props.characterId}.json`;
  }, [props.characterId, props.characterName]);

  const download = async () => {
    setBusy(true);
    setMessage(null);

    const res = await fetch("/api/unreal/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterId: props.characterId,
        includeDonoRules,
        includeScripts,
        includeScenes,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      setMessage(json?.error ?? "Export failed.");
      setBusy(false);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

    setBusy(false);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant={props.variant ?? "secondary"}
        onClick={() => setOpen(true)}
      >
        Export for Unreal
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="glass-card w-full max-w-lg rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Export for Unreal</h3>
            <p className="mt-2 text-sm text-white/70">
              Generate a JSON config you can use for manual Unreal setup today, and for the Runtime Connector later.
            </p>

            <div className="mt-5 space-y-2 text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeDonoRules}
                  onChange={(e) => setIncludeDonoRules(e.target.checked)}
                />
                Include Dono rules
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeScripts}
                  onChange={(e) => setIncludeScripts(e.target.checked)}
                />
                Include scripts
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeScenes}
                  onChange={(e) => setIncludeScenes(e.target.checked)}
                />
                Include scenes
              </label>
            </div>

            {message ? (
              <p className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {message}
              </p>
            ) : null}

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={download} disabled={busy}>
                {busy ? "Generating…" : "Generate + download"}
              </Button>
            </div>

            <p className="mt-3 text-xs text-white/50">File: {filename}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

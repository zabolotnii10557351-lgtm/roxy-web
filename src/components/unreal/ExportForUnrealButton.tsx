"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type TauriInvoke = (command: string, args?: Record<string, unknown>) => Promise<unknown>;

type TauriGlobal = {
  __TAURI__?: {
    invoke?: TauriInvoke;
    core?: {
      invoke?: TauriInvoke;
    };
  };
};

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
  const t = useTranslations();
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
      setMessage(json?.error ?? t.app.unrealExportFailed);
      setBusy(false);
      return;
    }

    const tauri = (window as unknown as TauriGlobal).__TAURI__;
    const invoke: TauriInvoke | undefined = tauri?.invoke ?? tauri?.core?.invoke;

    if (typeof invoke === "function") {
      const content = await res.text();
      try {
        const savedPath = await invoke("save_unreal_manifest", {
          filename,
          content,
        });
        setMessage(
          t.app.unrealExportSavedTo.replace("{path}", String(savedPath))
        );
        setBusy(false);
        return;
      } catch {
        // Fall back to browser download.
      }
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
        {t.app.unrealExportButton}
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
            <h3 className="text-lg font-semibold text-white">{t.app.unrealExportTitle}</h3>
            <p className="mt-2 text-sm text-white/70">
              {t.app.unrealExportDescription}
            </p>

            <div className="mt-5 space-y-2 text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeDonoRules}
                  onChange={(e) => setIncludeDonoRules(e.target.checked)}
                />
                {t.app.unrealExportIncludeDonoRules}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeScripts}
                  onChange={(e) => setIncludeScripts(e.target.checked)}
                />
                {t.app.unrealExportIncludeScripts}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeScenes}
                  onChange={(e) => setIncludeScenes(e.target.checked)}
                />
                {t.app.unrealExportIncludeScenes}
              </label>
            </div>

            {message ? (
              <p className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {message}
              </p>
            ) : null}

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
                {t.common.cancel}
              </Button>
              <Button variant="secondary" onClick={download} disabled={busy}>
                {busy ? t.common.generating : t.app.unrealExportGenerateDownload}
              </Button>
            </div>

            <p className="mt-3 text-xs text-white/50">
              {t.app.unrealExportFile.replace("{filename}", filename)}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

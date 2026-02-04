"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

type SceneConfig = {
  resolution: string;
  quality: string;
  cameraPreset: string;
  lightingPreset: string;
  notes: string;
};

type SceneRow = {
  id: string;
  name: string;
  config?: SceneConfig | null;
  created_at?: string;
};

function SceneCard(props: {
  scene: SceneRow;
  onSave: (id: string, name: string, config: SceneConfig) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onActivate: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const initialConfig: SceneConfig = props.scene.config ?? {
    resolution: "1080p",
    quality: "medium",
    cameraPreset: "front",
    lightingPreset: "soft",
    notes: "",
  };

  const [name, setName] = useState(props.scene.name);
  const [resolution, setResolution] = useState(initialConfig.resolution);
  const [quality, setQuality] = useState(initialConfig.quality);
  const [cameraPreset, setCameraPreset] = useState(initialConfig.cameraPreset);
  const [lightingPreset, setLightingPreset] = useState(initialConfig.lightingPreset);
  const [notes, setNotes] = useState(initialConfig.notes);

  return (
    <div className="glass-card rounded-3xl p-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        placeholder="Scene name"
      />

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Resolution (e.g. 1080p)"
        />
        <input
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Quality (low/medium/high)"
        />
        <input
          value={cameraPreset}
          onChange={(e) => setCameraPreset(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Camera preset"
        />
        <input
          value={lightingPreset}
          onChange={(e) => setLightingPreset(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Lighting preset"
        />
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        placeholder="Notes for your Unreal scene"
        rows={3}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            props.onSave(props.scene.id, name, {
              resolution,
              quality,
              cameraPreset,
              lightingPreset,
              notes,
            })
          }
          disabled={props.busy || name.trim().length === 0}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onActivate(props.scene.id)}
          disabled={props.busy}
        >
          Activate
        </Button>
        <Button
          variant="ghost"
          onClick={() => props.onDelete(props.scene.id)}
          disabled={props.busy}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function AvatarScenePage() {
  const t = useTranslations();
  const [scenes, setScenes] = useState<SceneRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [resolution, setResolution] = useState("1080p");
  const [quality, setQuality] = useState("medium");
  const [cameraPreset, setCameraPreset] = useState("front");
  const [lightingPreset, setLightingPreset] = useState("soft");
  const [notes, setNotes] = useState("");

  const loadScenes = async () => {
    setError(null);
    const res = await fetch("/api/scenes");
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to load scenes");
      return;
    }
    setScenes((json?.items ?? []) as SceneRow[]);
  };

  useEffect(() => {
    void loadScenes();
  }, []);

  const handleCreate = async () => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/scenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        config: {
          resolution,
          quality,
          cameraPreset,
          lightingPreset,
          notes,
        },
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to create scene");
      setBusy(false);
      return;
    }

    setName("");
    setResolution("1080p");
    setQuality("medium");
    setCameraPreset("front");
    setLightingPreset("soft");
    setNotes("");
    await loadScenes();
    setBusy(false);
  };

  const handleSave = async (id: string, nextName: string, config: SceneConfig) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/scenes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: nextName, config }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to update scene");
      setBusy(false);
      return;
    }

    await loadScenes();
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/scenes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to delete scene");
      setBusy(false);
      return;
    }

    await loadScenes();
    setBusy(false);
  };

  const handleActivate = async (id: string) => {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/scenes/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sceneId: id, reason: "manual" }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      setError(json?.error ?? "Failed to activate scene");
      setBusy(false);
      return;
    }

    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.avatarScene}</h2>
        <p className="text-sm text-white/60">{t.app.avatarSceneSubtitle}</p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">New scene</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Scene name"
          />
          <input
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Resolution (e.g. 1080p)"
          />
          <input
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Quality (low/medium/high)"
          />
          <input
            value={cameraPreset}
            onChange={(e) => setCameraPreset(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Camera preset"
          />
          <input
            value={lightingPreset}
            onChange={(e) => setLightingPreset(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            placeholder="Lighting preset"
          />
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          placeholder="Notes for your Unreal scene"
          rows={3}
        />
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={handleCreate}
            disabled={busy || name.trim().length === 0}
          >
            Create scene
          </Button>
        </div>
        {error ? <p className="mt-3 text-xs text-rose-200/80">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {scenes.length === 0 ? (
          <p className="text-xs text-white/50">No scenes yet.</p>
        ) : (
          scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              onSave={handleSave}
              onDelete={handleDelete}
              onActivate={handleActivate}
              busy={busy}
            />
          ))
        )}
      </div>
    </div>
  );
}

import Button from "@/components/Button";
import Badge from "@/components/Badge";

export default function AvatarScenePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Avatar + Scene</h2>
          <p className="text-sm text-white/60">
            Manage the visual layer for your AI streamer.
          </p>
        </div>
        <Button variant="secondary">Open Unreal Preview</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Scene control</h3>
            <Badge>Preview</Badge>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Active scene: Neon Studio
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Lighting preset: Cyber Dawn
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Emotion hooks: Enabled
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Lip-sync: Auto
            </div>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Scene assets</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Neon City (UE template)
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Cozy Desk (UE template)
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Arena Battle (UE template)
            </div>
          </div>
          <Button className="mt-4 w-full">Upload asset</Button>
        </div>
      </div>
    </div>
  );
}

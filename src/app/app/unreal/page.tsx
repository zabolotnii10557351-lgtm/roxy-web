import Button from "@/components/Button";

export default function UnrealHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Unreal</h2>
        <p className="mt-2 text-sm text-white/60">
          Guides and placeholders for your RoxStreamAI → Unreal workflow. The Runtime Connector is coming soon.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Getting started</h3>
          <p className="mt-2 text-sm text-white/70">
            Choose one of the setup paths below. If you already have an Unreal project, start with Manual setup.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" href="/app/unreal/import-metahuman">How to import MetaHuman</Button>
            <Button variant="secondary" href="/app/unreal/livelink-face">Live Link Face (archive)</Button>
            <Button variant="secondary" href="/app/unreal/manual-setup">Manual Unreal setup</Button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Runtime Connector</h3>
          <p className="mt-2 text-sm text-white/70">
            A native connector that will sync your character config, events, and facial animation in realtime.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" href="/app/unreal/runtime-connector">Open Runtime Connector</Button>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Tip: You can already export a character JSON from the Character Builder.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Export for Unreal</h3>
        <p className="mt-2 text-sm text-white/70">
          Open any character and click “Export for Unreal” to download a JSON bundle. This is usable for manual
          wiring today and will be supported by the Runtime Connector later.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/characters">Go to Characters</Button>
        </div>
      </div>
    </div>
  );
}

import Button from "@/components/Button";

export default function ImportMetaHumanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">How to import MetaHuman</h2>
        <p className="mt-2 text-sm text-white/60">
          This guide is a placeholder. It will be expanded with step-by-step screenshots and project templates.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-3">
        <p className="text-sm text-white/70">
          Recommended path:
        </p>
        <ol className="list-decimal pl-5 text-sm text-white/70 space-y-2">
          <li>Create / open an Unreal project with MetaHuman support.</li>
          <li>Import your MetaHuman (via Quixel Bridge / MetaHuman pipeline).</li>
          <li>Verify the face rig animates in-editor.</li>
          <li>Proceed to Live Link / UDP setup.</li>
        </ol>

        <div className="pt-3 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/unreal/livelink-face">Next: Live Link Face</Button>
          <Button variant="secondary" href="/app/unreal">Back to Unreal hub</Button>
        </div>
      </div>
    </div>
  );
}

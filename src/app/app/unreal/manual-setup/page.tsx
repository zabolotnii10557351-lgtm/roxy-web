import Button from "@/components/Button";

export default function ManualUnrealSetupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Manual Unreal setup</h2>
        <p className="mt-2 text-sm text-white/60">
          Placeholder checklist for manual wiring. The Runtime Connector will automate most of this later.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-3">
        <ol className="list-decimal pl-5 text-sm text-white/70 space-y-2">
          <li>Prepare your character / MetaHuman in an Unreal level.</li>
          <li>Set up facial animation input (Live Link / UDP).</li>
          <li>Create mappings from “emotion tags” to your animation/pose system.</li>
          <li>Use RoxStreamAI exports as your source of truth for configs.</li>
        </ol>

        <div className="pt-3 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/unreal/runtime-connector">Runtime Connector (coming soon)</Button>
          <Button variant="secondary" href="/app/unreal">Back to Unreal hub</Button>
        </div>
      </div>
    </div>
  );
}

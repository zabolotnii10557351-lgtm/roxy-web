import Button from "@/components/Button";

export default function LiveLinkFacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Live Link Face (archive)</h2>
        <p className="mt-2 text-sm text-white/60">
          Placeholder guide. In the final version you’ll be able to import a Live Link Face archive directly.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-3">
        <p className="text-sm text-white/70">
          For now:
        </p>
        <ul className="list-disc pl-5 text-sm text-white/70 space-y-2">
          <li>Record on iPhone using Live Link Face.</li>
          <li>Export / copy the recording data to your PC.</li>
          <li>Configure your Unreal project to receive facial animation (Live Link / UDP).</li>
        </ul>

        <div className="pt-3 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/unreal/manual-setup">Next: Manual setup</Button>
          <Button variant="secondary" href="/app/unreal">Back to Unreal hub</Button>
        </div>
      </div>
    </div>
  );
}

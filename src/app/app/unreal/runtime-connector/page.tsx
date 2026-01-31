import Button from "@/components/Button";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";

export default function UnrealRuntimeConnectorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Unreal Runtime Connector</h2>
        <p className="mt-2 text-sm text-white/60">
          Coming soon: a native bridge that syncs character config + events into Unreal in realtime.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">What it will do</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
          <li>Connect your RoxStreamAI workspace to an Unreal project.</li>
          <li>Stream emotion / event triggers to Blueprint or C++ hooks.</li>
          <li>Optionally sync scenes/scripts/dono rules for tooling.</li>
        </ul>

        <div className="mt-6">
          <NotifyMeForm tag="unreal_runtime" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" href="/app/unreal/manual-setup">Manual setup checklist</Button>
          <Button variant="secondary" href="/app/unreal">Back to Unreal hub</Button>
        </div>
      </div>
    </div>
  );
}

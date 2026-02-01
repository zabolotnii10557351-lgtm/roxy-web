import DesktopOnlyGate from "@/components/DesktopOnlyGate";

export default function LocalRuntimePage() {
  return (
    <DesktopOnlyGate title="Local Runtime">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Local Runtime</h2>
          <p className="mt-2 text-sm text-white/60">
            Desktop-only tools for connecting your RoxStreamAI dashboard to a local runtime.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <p className="mt-2 text-sm text-white/70">
            Preview. Status and health checks will appear here once the local service integration is enabled.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <p className="mt-2 text-sm text-white/70">
            Start/stop controls and connectivity verification will be available in Desktop Mode.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: Desktop Mode required.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

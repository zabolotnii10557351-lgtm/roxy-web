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
          <p className="mt-2 text-xs text-white/60">Coming soon.</p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Connect</h3>
          <p className="mt-2 text-xs text-white/60">
            Coming soon: start/stop local runtime and verify connectivity.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: UI only. No native logic is wired yet.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

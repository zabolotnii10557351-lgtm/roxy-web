import DesktopOnlyGate from "@/components/DesktopOnlyGate";

export default function DiagnosticsPage() {
  return (
    <DesktopOnlyGate title="Diagnostics">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Diagnostics</h2>
          <p className="mt-2 text-sm text-white/60">
            Desktop-only diagnostics for troubleshooting local runtime and connectors.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <p className="mt-2 text-sm text-white/70">
            Preview. Desktop Mode diagnostics will show runtime connectivity, provider status, and connector health here.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            Connect the local runtime to populate diagnostics.
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Logs</h3>
          <p className="mt-2 text-sm text-white/70">
            Preview. Runtime logs will be viewable here.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: Desktop Mode required.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

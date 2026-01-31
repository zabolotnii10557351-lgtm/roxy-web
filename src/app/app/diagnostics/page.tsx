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
            This feature is in development. You can explore the UI now.
          </p>

          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Backend: not connected. Start the local service or check port settings.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              OpenAI key: missing
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              ElevenLabs key: missing
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              TikTok token: missing
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Logs</h3>
          <p className="mt-2 text-sm text-white/70">
            This feature is in development. You can explore the UI now.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: UI only. No native logic is wired yet.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

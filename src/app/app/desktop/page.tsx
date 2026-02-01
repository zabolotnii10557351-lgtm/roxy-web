import DesktopOnlyGate from "@/components/DesktopOnlyGate";

export default async function DesktopIntegrationsPage() {
  return (
    <DesktopOnlyGate title="Desktop integrations">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Desktop integrations</h2>
          <p className="mt-2 text-sm text-white/60">
            These integrations are only available in the desktop app.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">OBS local control</h3>
            <p className="mt-2 text-xs text-white/60">Coming soon.</p>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Audio devices</h3>
            <p className="mt-2 text-xs text-white/60">Coming soon.</p>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">Unreal local bridge</h3>
            <p className="mt-2 text-xs text-white/60">Coming soon.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Note: Desktop Mode required.
        </div>
      </div>
    </DesktopOnlyGate>
  );
}

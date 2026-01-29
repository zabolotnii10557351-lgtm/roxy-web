import Button from "@/components/Button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Settings</h2>
        <p className="text-sm text-white/60">
          Control workspace preferences and export tools.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Workspace</h3>
          <div className="mt-4 space-y-3">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Workspace name"
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Default language"
            />
          </div>
          <Button className="mt-4" variant="secondary">
            Save settings
          </Button>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Config tools</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Export / Import settings
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Reset memory storage
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Generate audit logs
            </div>
          </div>
          <Button className="mt-4">Export Config</Button>
        </div>
      </div>
    </div>
  );
}

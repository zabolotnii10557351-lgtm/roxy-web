import Button from "@/components/Button";

const steps = [
  "Choose OBS scene",
  "Add Browser Source",
  "Paste Roxy overlay URL",
  "Start session",
];

export default function DeployPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Deploy</h2>
        <p className="text-sm text-white/60">
          Publish your session and go live in OBS.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Deployment flow</h3>
          <ol className="mt-4 space-y-3 text-sm text-white/70">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <Button className="mt-4">Generate Share Link</Button>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Session status</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Overlay URL: https://roxy.stream/demo/overlay
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Status: Ready to go live
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Last publish: 2 hours ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

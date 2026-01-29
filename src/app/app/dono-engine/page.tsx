import Button from "@/components/Button";
import Badge from "@/components/Badge";

export default function DonoEnginePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Dono Engine</h2>
          <p className="text-sm text-white/60">
            Build rules that react to gifts and donations.
          </p>
        </div>
        <Button>Simulate Gift</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Rule editor</h3>
            <Badge>Saved</Badge>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs text-white/60">Trigger</label>
              <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                <option>Rose (1 coin)</option>
                <option>Galaxy (1000 coins)</option>
                <option>Universe (10000 coins)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Cooldown</label>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="20s"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Emotion</label>
              <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                <option>Excited</option>
                <option>Grateful</option>
                <option>Playful</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Action</label>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                placeholder="Trigger confetti overlay"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="text-xs text-white/60">Response line</label>
            <textarea
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              rows={3}
              placeholder="Thank you for the Galaxy! Let's launch the mini-game."
            />
          </div>
          <Button className="mt-4" variant="secondary">
            Test Response
          </Button>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">Active rules</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Rose → Quick thank you → 10s cooldown
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Galaxy → Scene change → 45s cooldown
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3">
              Universe → Battle mode → 120s cooldown
            </div>
          </div>
          <Button className="mt-4 w-full">Create rule</Button>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 text-center">
        <p className="text-sm text-white/70">
          Create a rule to react to gifts and donations.
        </p>
      </div>
    </div>
  );
}

import Button from "@/components/Button";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";

export default function MarketingCharacterEditorPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-white">3D Editor (Polyphoria)</h1>
      <p className="mt-4 text-lg text-white/70">
        We’re preparing an in-app character editor integration. Sign up to get notified when early access opens.
      </p>

      <div className="mt-10 glass-card rounded-3xl p-6">
        <NotifyMeForm tag="polyphoria" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="secondary" href="/download">Download desktop</Button>
        <Button variant="secondary" href="/app">Open dashboard</Button>
      </div>
    </div>
  );
}

import Badge from "@/components/Badge";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";

export default function CharacterEditorPage() {
  const enabled = process.env.POLYPHORIA_ENABLED === "true";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">3D Character Editor</h2>
        <p className="mt-2 text-sm text-white/60">
          {enabled
            ? "Polyphoria editor integration is enabled (work in progress)."
            : "Coming soon: an in-app 3D editor powered by Polyphoria."}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        {enabled ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">Editor</h3>
              <Badge variant="outline">Preview</Badge>
            </div>
            <p className="mt-3 text-sm text-white/70">
              The embedded editor surface will appear here. For now, use the Character Builder to edit persona and voice.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-white/70">
              Join the waitlist to get early access when we roll this out.
            </p>
            <div className="mt-5">
              <NotifyMeForm tag="polyphoria" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

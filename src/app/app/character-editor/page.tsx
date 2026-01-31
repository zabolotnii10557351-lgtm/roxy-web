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
          <p className="text-sm text-white/70">
            Placeholder: the embedded editor UI will live here.
          </p>
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

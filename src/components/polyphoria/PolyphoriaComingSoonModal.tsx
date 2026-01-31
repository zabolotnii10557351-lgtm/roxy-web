"use client";

import Button from "@/components/Button";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";

export default function PolyphoriaComingSoonModal(props: {
  open: boolean;
  onClose: () => void;
}) {
  if (!props.open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
    >
      <div className="glass-card w-full max-w-lg rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">3D Editor is coming soon</h3>
        <p className="mt-2 text-sm text-white/70">
          We’re preparing an in-app character editor integration. For now, you can import your MetaHuman
          or use your existing Unreal scene.
        </p>

        <div className="mt-5">
          <NotifyMeForm tag="polyphoria" />
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" href="/app/unreal/import-metahuman" onClick={props.onClose}>
            How to import MetaHuman
          </Button>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Button from "@/components/Button";

export default function ComingSoonModal({
  open,
  onClose,
  title = "Coming soon",
  description = "Billing checkout will be enabled after LemonSqueezy integration.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card w-full max-w-md rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

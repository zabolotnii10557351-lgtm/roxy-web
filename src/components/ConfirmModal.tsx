"use client";

import Button from "@/components/Button";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "secondary",
  confirmClassName,
  busy,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "secondary" | "outline" | "ghost";
  confirmClassName?: string;
  busy?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <div className="glass-card w-full max-w-md rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description ? (
          <p className="mt-2 text-sm text-white/70">{description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            className={confirmClassName}
            onClick={onConfirm}
            disabled={busy}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

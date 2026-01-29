const toasts = [
  "Saved",
  "Draft updated",
  "Published",
  "Plan upgrade required",
  "Credits limit reached. Buy more hours.",
];

export default function ToastList() {
  return (
    <div className="space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast}
          className="glass-card flex items-center justify-between rounded-2xl px-4 py-3 text-xs text-white/80"
        >
          <span>{toast}</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/60">
            now
          </span>
        </div>
      ))}
    </div>
  );
}

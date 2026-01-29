export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/35 blur-[160px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-40 -left-20 h-[460px] w-[460px] rounded-full bg-blue-500/30 blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-10 right-0 h-[520px] w-[520px] rounded-full bg-cyan-400/25 blur-[170px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/3 right-1/4 h-[360px] w-[360px] rounded-full bg-violet-600/20 blur-[140px] animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.12),_transparent_50%)]" />
    </div>
  );
}

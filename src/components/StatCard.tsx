import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  helper,
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 group relative overflow-hidden", className)}>
      <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full transition-opacity group-hover:opacity-100 opacity-0" />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
          {label}
        </p>
        <p className="mt-4 text-3xl font-bold bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">{value}</p>
        {helper ? (
          <p className="mt-3 text-xs text-white/60 leading-relaxed">{helper}</p>
        ) : null}
      </div>
    </div>
  );
}

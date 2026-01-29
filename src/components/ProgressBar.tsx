import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-white/10", className)}>
      <div
        className="h-2 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

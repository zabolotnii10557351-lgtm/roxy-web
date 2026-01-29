import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "solid",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
        variant === "solid"
          ? "bg-gradient-to-r from-white/20 to-white/10 text-white backdrop-blur-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
          : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

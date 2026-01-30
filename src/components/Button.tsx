import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export default function Button({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60";
  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 text-white shadow-[0_20px_50px_rgba(76,29,149,0.35)] hover:shadow-[0_25px_60px_rgba(76,29,149,0.5)] hover:scale-105",
    secondary:
      "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm hover:border-white/30",
    outline:
      "border border-white/15 text-white hover:border-white/40 hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
  };

  const classes = cn(base, styles[variant], className);

  if (href) {
    if (props.disabled) {
      return (
        <span
          className={classes}
          aria-disabled="true"
          role="link"
          tabIndex={-1}
        >
          {children}
        </span>
      );
    }
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

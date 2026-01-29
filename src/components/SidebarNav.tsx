import Link from "next/link";
import {
  LayoutGrid,
  Users,
  UserPlus,
  Plug,
  Gift,
  ScrollText,
  Sparkles,
  Layers,
  Rocket,
  CreditCard,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/app", label: "Overview", icon: LayoutGrid },
  { href: "/app/characters", label: "Characters", icon: Users },
  { href: "/app/characters/new", label: "Character Builder", icon: UserPlus },
  { href: "/app/stream-connectors", label: "Connectors", icon: Plug },
  { href: "/app/dono-engine", label: "Dono Engine", icon: Gift },
  { href: "/app/scripts", label: "Stream Scripts", icon: ScrollText },
  { href: "/app/avatar-scene", label: "Avatar + Scene", icon: Sparkles },
  { href: "/app/deploy", label: "Deploy", icon: Rocket },
  { href: "/app/billing", label: "Billing", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default function SidebarNav() {
  return (
    <aside className="hidden w-64 flex-col border-r border-white/5 bg-[#0C1222] px-5 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-semibold">
          R
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Roxy AI Streamer</p>
          <p className="text-xs text-white/60">Dashboard</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/70 transition-all duration-200 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-white hover:pl-4 relative overflow-hidden"
          >
            <div className="absolute left-0 h-full w-1 bg-gradient-to-b from-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />
            <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
        <p className="font-semibold text-white">Trial ends in 5 days</p>
        <p className="mt-1">Upgrade to unlock scheduling and extra hours.</p>
      </div>
    </aside>
  );
}

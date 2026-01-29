import { Bell, Sparkles } from "lucide-react";
import Badge from "@/components/Badge";
import SignOutButton from "@/components/SignOutButton";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
          Roxy AI Streamer
        </p>
        <h1 className="text-lg font-semibold text-white">Welcome back, Lia</h1>
      </div>
      <div className="flex items-center gap-3">
        <Badge>Preview</Badge>
        <button className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Pro perks
        </button>
        <SignOutButton />
      </div>
    </div>
  );
}

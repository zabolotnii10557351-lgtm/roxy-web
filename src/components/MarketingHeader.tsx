import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function MarketingHeader() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user?.email ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0F1A]/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-semibold shadow-lg shadow-violet-500/30 transition-shadow group-hover:shadow-xl group-hover:shadow-violet-500/50">
            R
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Roxy AI Streamer</p>
            <p className="text-xs text-white/60 transition-colors group-hover:text-white/80">Launch an AI streamer</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-cyan-400 after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <Link
              href="/app"
              className="relative text-white/70 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-cyan-400 after:transition-all hover:after:w-full"
            >
              Dashboard
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-xs text-white/60">{userEmail}</span>
              <Button variant="ghost" href="/app">
                Open Dashboard
              </Button>
            </div>
          ) : (
            <Button variant="ghost" href="/login">
              Sign in
            </Button>
          )}
          <Button href="/download">Download Demo</Button>
        </div>
      </Container>
    </header>
  );
}

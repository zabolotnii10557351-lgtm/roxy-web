import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { Menu } from "lucide-react";

export default async function MarketingHeader() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user?.email ?? "";

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/use-cases", label: t.nav.useCases },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/docs", label: t.nav.docs },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0F1A]/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-semibold shadow-lg shadow-violet-500/30 transition-shadow group-hover:shadow-xl group-hover:shadow-violet-500/50">
            R
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{t.common.brand}</p>
            <p className="text-xs text-white/60 transition-colors group-hover:text-white/80">
              {t.marketing.heroTitle}
            </p>
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
              {t.common.dashboard}
            </Link>
          ) : null}
        </nav>
        <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <span className="text-xs text-white/60">{userEmail}</span>
                <Button variant="ghost" href="/app">
                  {t.common.openDashboard}
                </Button>
              </>
            ) : (
              <Button variant="ghost" href="/login">
                {t.common.signIn}
              </Button>
            )}
            <Button href="/download">{t.common.downloadDemo}</Button>
          </div>

          <LanguageSwitcher />

          <details className="relative md:hidden">
            <summary
              className="list-none rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-[#0A0F1A]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <nav className="flex flex-col gap-1 text-sm">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}

                {user ? (
                  <Link
                    href="/app"
                    className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {t.common.dashboard}
                  </Link>
                ) : null}
              </nav>

              <div className="mt-3 flex flex-col gap-2">
                {user ? (
                  <Button variant="secondary" href="/app" className="w-full px-4 py-2 text-sm">
                    {t.common.openDashboard}
                  </Button>
                ) : (
                  <Button variant="secondary" href="/login" className="w-full px-4 py-2 text-sm">
                    {t.common.signIn}
                  </Button>
                )}

                <Button href="/download" className="w-full px-4 py-2 text-sm">
                  {t.common.downloadDemo}
                </Button>
              </div>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}

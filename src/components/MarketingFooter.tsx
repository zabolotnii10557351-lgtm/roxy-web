import Link from "next/link";
import Container from "@/components/Container";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function MarketingFooter() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const links = [
    { href: "/use-cases", label: t.nav.useCases },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/docs", label: t.nav.docs },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
    { href: "/team", label: t.nav.team },
    { href: "/terms", label: t.nav.terms },
    { href: "/privacy", label: t.nav.privacy },
    { href: "/cookies", label: t.nav.cookies },
  ];

  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-white">{t.common.brand}</p>
          <p className="text-xs text-white/60">{t.marketing.heroSubtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

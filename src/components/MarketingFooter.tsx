import Link from "next/link";
import Container from "@/components/Container";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function MarketingFooter() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
  const groups: Array<{
    title: string;
    links: Array<{ href: string; label: string }>;
  }> = [
    {
      title: t.nav.footerProduct,
      links: [
        { href: "/use-cases", label: t.nav.useCases },
        { href: "/pricing", label: t.nav.pricing },
        { href: "/download", label: t.nav.footerDownload },
      ],
    },
    {
      title: t.nav.footerResources,
      links: [
        { href: "/docs", label: t.nav.docs },
        { href: "/blog", label: t.nav.blog },
      ],
    },
    {
      title: t.nav.footerCompany,
      links: [
        { href: "/about", label: t.nav.about },
        { href: "/team", label: t.nav.team },
        { href: "mailto:support@roxstreamai.com", label: t.nav.contact },
        {
          href: "mailto:sales@roxstreamai.com",
          label: t.nav.footerAdsCollabs,
        },
      ],
    },
    {
      title: t.nav.footerLegal,
      links: [
        { href: "/terms", label: t.nav.terms },
        { href: "/privacy", label: t.nav.privacy },
        { href: "/cookies", label: t.nav.cookies },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-white/5 py-10">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">{t.common.brand}</p>
          <p className="text-sm text-white/70">
            {t.nav.footerDescription}
          </p>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} RoxStreamAI. {t.nav.footerCopyright}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {group.title}
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                {group.links.map((link) =>
                  link.href.startsWith("mailto:") ? (
                    <a key={link.href} href={link.href} className="hover:text-white">
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import BackgroundGlow from "@/components/BackgroundGlow";
import SignOutButton from "@/components/SignOutButton";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { requireAdminUserOrNotFound } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUserOrNotFound();

  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const navLinks = [
    { href: "/admin", label: t.admin.navOverview },
    { href: "/admin/users", label: t.admin.navUsers },
    { href: "/admin/pricing", label: t.admin.navPricing },
    { href: "/admin/content", label: t.admin.navContent },
    { href: "/admin/leads", label: t.admin.navLeads },
    { href: "/admin/audit", label: t.admin.navAudit },
    { href: "/admin/releases", label: t.admin.navReleases },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white">
      <BackgroundGlow />
      <div className="relative z-10">
        <header className="border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-white">
                {t.common.brand} {t.admin.label}
              </Link>
              <nav className="hidden items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/60 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/app"
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                {t.admin.dashboardLink}
              </Link>
              <SignOutButton />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

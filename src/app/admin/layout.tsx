import Link from "next/link";
import BackgroundGlow from "@/components/BackgroundGlow";
import SignOutButton from "@/components/SignOutButton";
import { requireAdminUser } from "@/lib/auth";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/releases", label: "Releases" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white">
      <BackgroundGlow />
      <div className="relative z-10">
        <header className="border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-white">
                Roxy Admin
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
                Dashboard
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

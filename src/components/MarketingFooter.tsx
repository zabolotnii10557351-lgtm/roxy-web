import Link from "next/link";
import Container from "@/components/Container";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export default function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-white">Roxy AI Streamer</p>
          <p className="text-xs text-white/60">Automation for 24/7 live formats.</p>
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

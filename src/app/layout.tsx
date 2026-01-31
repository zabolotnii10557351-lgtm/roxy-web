import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/client";
import { getLocaleFromRequest } from "@/i18n/server";
import { getSiteUrl } from "@/lib/site/url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "RoxStreamAI",
    template: "%s | RoxStreamAI",
  },
  description:
    "Launch an AI streamer in 10 minutes. Roxy reads chat, reacts to gifts, runs scripts, and streams 24/7.",
  openGraph: {
    type: "website",
    siteName: "RoxStreamAI",
    title: "RoxStreamAI",
    description:
      "Launch an AI streamer in 10 minutes. Roxy reads chat, reacts to gifts, runs scripts, and streams 24/7.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoxStreamAI",
    description:
      "Launch an AI streamer in 10 minutes. Roxy reads chat, reacts to gifts, runs scripts, and streams 24/7.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromRequest();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0F1A] text-white`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

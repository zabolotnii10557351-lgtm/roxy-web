import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "@/i18n/client";
import { getLocaleFromRequest } from "@/i18n/server";
import { getSiteUrl } from "@/lib/site/url";

const GTM_ID = "GTM-5MH7PSM2";
const COOKIEBOT_ID = "a7da215d-404e-49d5-b7e0-e7df76ac72b1";

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
    "Create characters, scenes, and interactive triggers in minutes. AI co-host is optional.",
  openGraph: {
    type: "website",
    siteName: "RoxStreamAI",
    title: "RoxStreamAI",
    description:
      "Create characters, scenes, and interactive triggers in minutes. AI co-host is optional.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoxStreamAI",
    description:
      "Create characters, scenes, and interactive triggers in minutes. AI co-host is optional.",
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
      <head>
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });
`}
        </Script>
        <Script
          id="Cookiebot"
          src={`https://consent.cookiebot.com/uc.js`}
          data-cbid={COOKIEBOT_ID}
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0F1A] text-white`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

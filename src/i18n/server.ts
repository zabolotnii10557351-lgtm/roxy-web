import { cookies, headers } from "next/headers";
import { defaultLocale, resolveLocale, type Locale } from "@/i18n/locales";
import { translations, type Translations } from "@/i18n/translations";

export async function getLocaleFromRequest(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (cookieLocale) {
    return resolveLocale(cookieLocale);
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const primary = acceptLanguage.split(",")[0];
  return resolveLocale(primary);
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

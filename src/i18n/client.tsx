"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  defaultLocale,
  localeOptions,
  resolveLocale,
  type Locale,
} from "@/i18n/locales";
import { translations, type Translations } from "@/i18n/translations";

interface LocaleContextValue {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (value: Locale) => {
    const resolved = resolveLocale(value);
    setLocaleState(resolved);
    document.cookie = `locale=${resolved}; path=/; max-age=31536000`;
    document.documentElement.lang = resolved;
    window.location.reload();
  };

  const value = useMemo<LocaleContextValue>(() => {
    const current = translations[locale] ?? translations[defaultLocale];
    return { locale, translations: current, setLocale };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useTranslations() {
  return useLocale().translations;
}

export { localeOptions };

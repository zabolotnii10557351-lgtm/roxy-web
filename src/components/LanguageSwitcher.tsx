"use client";

import { localeOptions, useLocale } from "@/i18n/client";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      value={locale}
      onChange={(event) => setLocale(event.target.value as typeof locale)}
      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white"
      aria-label="Language"
    >
      {localeOptions.map((option) => (
        <option key={option.code} value={option.code} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
  );
}

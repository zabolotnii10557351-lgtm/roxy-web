export type Locale =
  | "en"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pt"
  | "ru"
  | "tr"
  | "uk";

export const defaultLocale: Locale = "en";

const unsortedLocaleOptions: Array<{ code: Locale; label: string }> = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "tr", label: "Türkçe" },
  { code: "uk", label: "Українська" },
];

export const localeOptions = [...unsortedLocaleOptions].sort((a, b) =>
  a.label.localeCompare(b.label)
);

export function resolveLocale(value?: string | null): Locale {
  if (!value) return defaultLocale;
  const normalized = value.toLowerCase();
  const base = normalized.split("-")[0] as Locale;
  const match = localeOptions.find((option) => option.code === base);
  return match?.code ?? defaultLocale;
}

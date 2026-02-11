export type Locale =
  | "cs"
  | "en"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pl"
  | "pt"
  | "ru"
  | "sk"
  | "tr"
  | "uk";

export const defaultLocale: Locale = "en";

const unsortedLocaleOptions: Array<{ code: Locale; label: string }> = [
  { code: "cs", label: "Čeština" },
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "sk", label: "Slovenčina" },
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

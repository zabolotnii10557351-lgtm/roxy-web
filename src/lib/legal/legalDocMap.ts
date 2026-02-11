import type { Locale } from "@/i18n/locales";

const PRIVACY_DOCS: Record<Locale, string> = {
  cs: "Privacy_Policy_ROXSTREAMAI_CS_filled.txt",
  de: "Privacy_Policy_ROXSTREAMAI_DE_filled.txt",
  en: "Privacy_Policy_ROXSTREAMAI_EN_filled.txt",
  es: "Privacy_Policy_ROXSTREAMAI_ES_filled.txt",
  fr: "Privacy_Policy_ROXSTREAMAI_FR_filled.txt",
  it: "Privacy_Policy_ROXSTREAMAI_IT_filled.txt",
  ja: "Privacy_Policy_ROXSTREAMAI_EN_filled.txt",
  pl: "Obowiazek_informacyjny_ROXSTREAMAI_PL_filled.txt",
  pt: "Privacy_Policy_ROXSTREAMAI_PT_filled.txt",
  ru: "Privacy_Policy_ROXSTREAMAI_RU_filled.txt",
  sk: "Privacy_Policy_ROXSTREAMAI_SK_filled.txt",
  tr: "Privacy_Policy_ROXSTREAMAI_TR_filled.txt",
  uk: "Privacy_Policy_ROXSTREAMAI_UK_filled.txt",
  zh: "Privacy_Policy_ROXSTREAMAI_EN_filled.txt",
};

const TERMS_DOCS: Record<Locale, string> = {
  cs: "Terms_and_Conditions_ROXSTREAMAI_CS_filled.txt",
  de: "Terms_and_Conditions_ROXSTREAMAI_DE_filled.txt",
  en: "Terms_and_Conditions_ROXSTREAMAI_EN_filled.txt",
  es: "Terms_and_Conditions_ROXSTREAMAI_ES_filled.txt",
  fr: "Terms_and_Conditions_ROXSTREAMAI_FR_filled.txt",
  it: "Terms_and_Conditions_ROXSTREAMAI_IT_filled.txt",
  ja: "Terms_and_Conditions_ROXSTREAMAI_EN_filled.txt",
  pl: "Terms_and_Conditions_ROXSTREAMAI_PL_filled.txt",
  pt: "Terms_and_Conditions_ROXSTREAMAI_PT_filled.txt",
  ru: "Terms_and_Conditions_ROXSTREAMAI_RU_filled.txt",
  sk: "Terms_and_Conditions_ROXSTREAMAI_SK_filled.txt",
  tr: "Terms_and_Conditions_ROXSTREAMAI_TR_filled.txt",
  uk: "Terms_and_Conditions_ROXSTREAMAI_UK_filled.txt",
  zh: "Terms_and_Conditions_ROXSTREAMAI_EN_filled.txt",
};

const COOKIES_DOCS: Record<Locale, string> = {
  cs: "Cookie_Policy_ROXSTREAMAI_CS_filled.txt",
  de: "Cookie_Policy_ROXSTREAMAI_DE_filled.txt",
  en: "Cookie_Policy_ROXSTREAMAI_EN_filled.txt",
  es: "Cookie_Policy_ROXSTREAMAI_ES_filled.txt",
  fr: "Cookie_Policy_ROXSTREAMAI_FR_filled.txt",
  it: "Cookie_Policy_ROXSTREAMAI_IT_filled.txt",
  ja: "Cookie_Policy_ROXSTREAMAI_EN_filled.txt",
  pl: "Polityka_Cookies_ROXSTREAMAI_PL_filled.txt",
  pt: "Cookie_Policy_ROXSTREAMAI_PT_filled.txt",
  ru: "Cookie_Policy_ROXSTREAMAI_RU_filled.txt",
  sk: "Cookie_Policy_ROXSTREAMAI_SK_filled.txt",
  tr: "Cookie_Policy_ROXSTREAMAI_TR_filled.txt",
  uk: "Cookie_Policy_ROXSTREAMAI_UK_filled.txt",
  zh: "Cookie_Policy_ROXSTREAMAI_EN_filled.txt",
};

export function getPrivacyDocFile(locale: Locale): string {
  return PRIVACY_DOCS[locale] ?? PRIVACY_DOCS.en;
}

export function getTermsDocFile(locale: Locale): string {
  return TERMS_DOCS[locale] ?? TERMS_DOCS.en;
}

export function getCookiesDocFile(locale: Locale): string {
  return COOKIES_DOCS[locale] ?? COOKIES_DOCS.en;
}

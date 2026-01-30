import type { Locale } from "@/i18n/locales";
import { getContent, type PlanCardContent, type FaqItem } from "@/i18n/content";

export type PlanCard = PlanCardContent;

export function getPlanCards(locale: Locale) {
  return getContent(locale).planCards;
}

export function getFaqs(locale: Locale): FaqItem[] {
  return getContent(locale).faqs;
}

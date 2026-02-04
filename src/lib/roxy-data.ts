import type { Locale } from "@/i18n/locales";
import { type PlanCardContent, type FaqItem } from "@/i18n/content";
import { getMarketingContent } from "@/server/content/getMarketingContent";

export type PlanCard = PlanCardContent;

export async function getPlanCards(locale: Locale) {
  const content = await getMarketingContent(locale);
  return content.planCards;
}

export async function getFaqs(locale: Locale): Promise<FaqItem[]> {
  const content = await getMarketingContent(locale);
  return content.faqs;
}

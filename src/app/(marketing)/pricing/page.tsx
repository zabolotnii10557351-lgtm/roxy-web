import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PricingPlans from "@/components/PricingPlans";
import PricingExtras from "@/components/PricingExtras";
import { getPlanCards, getFaqs } from "@/lib/roxy-data";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function PricingPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);
  const planCards = getPlanCards(locale);
  const faqs = getFaqs(locale);
  const comparisonRows = content.pricing.comparisonRows;

  return (
    <div className="space-y-24 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.pricing.eyebrow}
          title={content.pricing.title}
          subtitle={content.pricing.subtitle}
        />
      </Container>

      <Container>
        <PricingPlans
          locale={locale}
          planCards={planCards}
          comparisonTitle={content.pricing.comparisonTitle}
          comparisonHeaders={content.pricing.comparisonHeaders}
          comparisonRows={comparisonRows}
        />
      </Container>

      <Container>
        <PricingExtras
          extraCreditsTitle={content.pricing.extraCreditsTitle}
          extraCreditsSubtitle={content.pricing.extraCreditsSubtitle}
          extraCredits={content.pricing.extraCredits}
          addonTitle={content.pricing.addonTitle}
          addonBadge={content.pricing.addonBadge}
          addonDescription={content.pricing.addonDescription}
          addonPrices={content.pricing.addonPrices}
          addonCta={content.pricing.addonCta}
        />
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.pricing.faqEyebrow}
          title={content.pricing.faqTitle}
          subtitle={content.pricing.faqSubtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.q} className="glass-card rounded-2xl p-6">
              <h4 className="text-base font-semibold text-white">
                {item.q}
              </h4>
              <p className="mt-3 text-sm text-white/70">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

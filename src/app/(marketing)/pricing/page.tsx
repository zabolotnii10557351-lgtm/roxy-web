import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import PricingPlans from "@/components/PricingPlans";
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
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white">
              {content.pricing.extraCreditsTitle}
            </h3>
            <p className="mt-2 text-sm text-white/60">
              {content.pricing.extraCreditsSubtitle}
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              {content.pricing.extraCredits.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                {content.pricing.addonTitle}
              </h3>
              <Badge>{content.pricing.addonBadge}</Badge>
            </div>
            <p className="mt-2 text-sm text-white/60">
              {content.pricing.addonDescription}
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              {content.pricing.addonPrices.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full" variant="secondary" href="/app">
              {content.pricing.addonCta}
            </Button>
          </div>
        </div>
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

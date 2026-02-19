import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";
import { getMarketingContent } from "@/server/content/getMarketingContent";
import PricingPageClient from "@/components/pricing/PricingPageClient";

export default async function PricingPage() {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);
  const cmsTitle = await getContentBlock({ key: "pricing.title", locale });
  const cmsSubtitle = await getContentBlock({ key: "pricing.subtitle", locale });

  return (
    <div className="space-y-24 pb-20 pt-16">
      <Container>
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {cmsTitle || content.pricing.title}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            {cmsSubtitle || content.pricing.subtitle}
          </p>
        </div>
      </Container>

      <Container>
        <PricingPageClient locale={locale} />
      </Container>
    </div>
  );
}

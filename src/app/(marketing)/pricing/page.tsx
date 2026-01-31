import PricingPlans from "@/components/PricingPlans";
import Container from "@/components/Container";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function PricingPage() {
  const locale = await getLocaleFromRequest();
  const cmsTitle = await getContentBlock({ key: "pricing.title", locale });
  const cmsSubtitle = await getContentBlock({ key: "pricing.subtitle", locale });

  return (
    <div className="space-y-24 pb-20 pt-16">
      <Container>
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {cmsTitle || "Pricing that scales from hobby to studio"}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            {cmsSubtitle || "Start with a 7-day free trial on Starter. Upgrade anytime."}
          </p>
        </div>
      </Container>

      <Container>
        <PricingPlans />
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";
import PricingPageClient from "@/components/pricing/PricingPageClient";

export default async function PricingPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const cmsTitle = await getContentBlock({ key: "pricing.title", locale });
  const cmsSubtitle = await getContentBlock({ key: "pricing.subtitle", locale });

  return (
    <div className="space-y-24 pb-20 pt-16">
      <Container>
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {cmsTitle ||
              (isRu
                ? "Цены, которые растут вместе со стримом"
                : "Pricing that scales with your stream")}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            {cmsSubtitle ||
              (isRu
                ? "Начните с 7‑дневного триала. Апгрейд — когда понадобятся больше персонажей, выше concurrency или больше Active Speech."
                : "Start small with a 7-day trial. Upgrade when you need more characters, higher concurrency, or more Active Speech.")}
          </p>
        </div>
      </Container>

      <Container>
        <PricingPageClient locale={locale} />
      </Container>
    </div>
  );
}

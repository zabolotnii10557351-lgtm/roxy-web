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
                ? "Выберите план и масштабируйте персонажей, сцены и лимиты Dono Engine, когда будете готовы."
                : "Pick a plan, scale characters, scenes, and Dono Engine limits when you're ready.")}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            {cmsSubtitle ||
              (isRu
                ? "Начните с триала. Апгрейд по мере роста персонажей, сцен и concurrency."
                : "Start with a trial. Upgrade as you add characters, scenes, and concurrency.")}
          </p>
        </div>
      </Container>

      <Container>
        <PricingPageClient locale={locale} />
      </Container>
    </div>
  );
}

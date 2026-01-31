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
            {cmsTitle || "Pricing that scales with your stream"}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            {cmsSubtitle || "Start small with a 7-day trial. Upgrade when you need more characters, higher concurrency, or more Active Speech."}
          </p>
        </div>
      </Container>

      <Container>
        <PricingPlans />
      </Container>

      <Container>
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white">How usage works</h2>
          <p className="mt-3 text-sm text-white/70">
            Active Speech is the time the AI actually talks on stream. The dashboard converts your settings into estimated monthly hours.
            If you use built-in providers, RoxStreamAI covers provider costs up to your plan quota. If you use BYOK, you pay the provider directly and RoxStreamAI tracks hours only.
          </p>
        </div>
      </Container>
    </div>
  );
}

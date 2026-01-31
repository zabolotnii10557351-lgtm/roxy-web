import {
  Sparkles,
  Layers,
  Users,
  Plug,
  Mic,
  Monitor,
  Activity,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import { getFaqs } from "@/lib/roxy-data";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";


const featureIconMap: Record<string, typeof Sparkles> = {
  characters: Users,
  providers: Plug,
  "active-speech": Mic,
  concurrency: Layers,
  "desktop-app": Monitor,
  diagnostics: Activity,
};

const featureLinks: Record<string, string> = {
  characters: "/app/characters",
  providers: "/app/settings",
  "active-speech": "/app/billing",
  concurrency: "/pricing",
  "desktop-app": "/download",
  diagnostics: "/app/diagnostics",
};

export default async function Home() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
  const content = getContent(locale);
  const faqs = getFaqs(locale);

  return (
    <div className="space-y-24 pb-20">
      <section className="pt-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge className="mb-6 animate-float">{t.marketing.heroBadge}</Badge>
            <h1 className="bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {t.marketing.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              {t.marketing.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button href="/download">{t.marketing.demoPrimary}</Button>
              <Button href="/app" variant="secondary">
                {t.common.openDashboard}
              </Button>
              <Button href="/pricing" variant="ghost">
                View pricing
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/50 animate-in fade-in duration-1000 delay-500">
              {t.marketing.demoNote}
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {content.useCases.items.map((item, index) => (
              <Link
                key={item.id}
                href={`/use-cases#${item.id}`}
                className="glass-card rounded-2xl p-6 text-sm text-white/80 hover:text-white group transition-all hover:scale-[1.01]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-xs group-hover:from-violet-500/40 group-hover:to-cyan-500/40 transition-all duration-300">✓</span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={content.docs.quickstart.eyebrow}
            title={t.marketing.howItWorksTitle}
            subtitle={t.marketing.howItWorksSubtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.docs.quickstart.steps.map((step, index) => (
              <Link
                key={step.title}
                href={`/docs#${step.id}`}
                className="glass-card rounded-2xl p-6 group relative overflow-hidden transition-all hover:scale-[1.01]"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg font-bold text-white shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                      {index + 1}
                    </span>
                    <p className="text-xs uppercase tracking-wider text-white/50">Step {index + 1}</p>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white group-hover:gradient-text transition-all">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={content.docs.product.eyebrow}
            title={t.marketing.featuresTitle}
            subtitle={t.marketing.featuresSubtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.docs.product.items.map((feature) => (
              <Link
                key={feature.title}
                href={featureLinks[feature.id] ?? "/docs"}
                className="glass-card rounded-2xl p-6 group relative overflow-hidden transition-all hover:scale-[1.01]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 group-hover:scale-110 transition-all duration-300">
                    {(() => {
                      const Icon = featureIconMap[feature.id] ?? Sparkles;
                      return (
                        <Icon className="h-6 w-6 text-cyan-300 group-hover:text-cyan-200" />
                      );
                    })()}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white group-hover:gradient-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={content.useCases.eyebrow}
            title={t.marketing.useCasesTitle}
            subtitle={t.marketing.useCasesSubtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.useCases.items.map((useCase) => (
              <Link
                key={useCase.id}
                href={`/use-cases#${useCase.id}`}
                className="glass-card rounded-2xl p-6 transition-all hover:scale-[1.01]"
              >
                <h3 className="text-lg font-semibold text-white">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  {useCase.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {t.marketing.ctaTitle}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {t.marketing.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/download">{t.marketing.ctaPrimary}</Button>
              <Button href="/pricing" variant="secondary">
                {t.marketing.ctaSecondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title={t.marketing.faqTitle}
            subtitle={t.marketing.faqSubtitle}
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
      </section>
    </div>
  );
}

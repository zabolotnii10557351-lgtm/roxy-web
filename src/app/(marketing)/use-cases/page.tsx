import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function UseCasesPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.useCases.eyebrow}
          title={content.useCases.title}
          subtitle={content.useCases.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.useCases.items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="glass-card rounded-3xl p-6 scroll-mt-24"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.useCases.outcomes.eyebrow}
          title={content.useCases.outcomes.title}
          subtitle={content.useCases.outcomes.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.useCases.outcomes.items.map((outcome) => (
            <div key={outcome.title} className="glass-card rounded-2xl p-6">
              <h4 className="text-base font-semibold text-white">
                {outcome.title}
              </h4>
              <p className="mt-3 text-sm text-white/70">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {content.useCases.cta.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {content.useCases.cta.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/download">{content.useCases.cta.primary}</Button>
            <Button href="/pricing" variant="secondary">
              {content.useCases.cta.secondary}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

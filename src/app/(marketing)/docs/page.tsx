import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";
export default async function DocsPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.docs.quickstart.eyebrow}
          title={content.docs.quickstart.title}
          subtitle={content.docs.quickstart.subtitle}
        />

        <div className="mt-8 glass-card rounded-2xl p-5 text-sm text-white/70">
          This doc section is being written. The UI is visible now, but the feature may be in beta.
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {content.docs.quickstart.steps.map((step, index) => (
            <div key={step.id} id={step.id} className="glass-card rounded-2xl p-5 scroll-mt-24">
              <p className="text-xs text-white/50">Step {index + 1}</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {step.title}
              </p>
              <p className="mt-2 text-xs text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.docs.product.eyebrow}
          title={content.docs.product.title}
          subtitle={content.docs.product.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.docs.product.items.map((item) => (
            <div key={item.id} id={item.id} className="glass-card rounded-2xl p-6 scroll-mt-24">
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.docs.api.eyebrow}
          title={content.docs.api.title}
          subtitle={content.docs.api.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.docs.api.sections.map((section) => (
            <div key={section.title} className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white">
                {section.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">
                {section.description}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.docs.glossary.eyebrow}
          title={content.docs.glossary.title}
          subtitle={content.docs.glossary.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.docs.glossary.items.map((item) => (
            <div key={item.term} className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white">
                {item.term}
              </h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

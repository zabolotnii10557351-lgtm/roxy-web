import Container from "@/components/Container";
import { getMarketingContent } from "@/server/content/getMarketingContent";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function TermsPage() {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);

  return (
    <div className="pb-20 pt-16">
      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-white">
            {content.terms.title}
          </h1>
          <p className="mt-4 text-sm text-white/70">
            {content.terms.intro}
          </p>
          <div className="mt-6 space-y-4 text-sm text-white/70">
            {content.terms.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-semibold text-white">
                  {section.title}
                </h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

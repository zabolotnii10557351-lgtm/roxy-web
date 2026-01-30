import Container from "@/components/Container";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function PrivacyPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  return (
    <div className="pb-20 pt-16">
      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-white">
            {content.privacy.title}
          </h1>
          <p className="mt-4 text-sm text-white/70">
            {content.privacy.intro}
          </p>
          <div className="mt-6 space-y-4 text-sm text-white/70">
            {content.privacy.sections.map((section) => (
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

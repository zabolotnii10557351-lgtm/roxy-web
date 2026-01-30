import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function AboutPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.about.eyebrow}
          title={content.about.title}
          subtitle={content.about.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">
              {content.about.missionTitle}
            </h3>
            <p className="mt-3 text-sm text-white/70">
              {content.about.missionBody}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">
              {content.about.beliefTitle}
            </h3>
            <p className="mt-3 text-sm text-white/70">
              {content.about.beliefBody}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

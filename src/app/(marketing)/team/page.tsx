import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function TeamPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  const cmsTitle = await getContentBlock({ key: "team.title", locale });
  const cmsSubtitle = await getContentBlock({ key: "team.subtitle", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.team.eyebrow}
          title={cmsTitle || content.team.title}
          subtitle={cmsSubtitle || content.team.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.team.members.map((member) => (
            <div key={member.name} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-cyan-200">{member.role}</p>
              <p className="mt-3 text-sm text-white/70">{member.focus}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={content.team.values.eyebrow}
          title={content.team.values.title}
          subtitle={content.team.values.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.team.values.items.map((value) => (
            <div key={value.title} className="glass-card rounded-2xl p-6">
              <h4 className="text-base font-semibold text-white">
                {value.title}
              </h4>
              <p className="mt-3 text-sm text-white/70">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {content.team.cta.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {content.team.cta.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/contact">{content.team.cta.primary}</Button>
            <Button href="/blog" variant="secondary">
              {content.team.cta.secondary}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

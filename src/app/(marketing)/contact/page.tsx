import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function ContactPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.contact.eyebrow}
          title={content.contact.title}
          subtitle={content.contact.subtitle}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-3xl p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder={content.contact.firstName}
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder={content.contact.lastName}
              />
            </div>
            <input
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder={content.contact.email}
            />
            <textarea
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder={content.contact.message}
              rows={4}
            />
            <Button className="mt-6 w-full" href="mailto:hello@roxy.stream">
              {content.contact.sendRequest}
            </Button>
          </div>
          <div className="glass-card rounded-3xl p-8 text-sm text-white/70">
            <p className="text-base font-semibold text-white">
              {content.contact.directLines}
            </p>
            <p className="mt-4">hello@roxy.stream</p>
            <p className="mt-2">Partnerships: partners@roxy.stream</p>
            <p className="mt-6 text-xs text-white/50">
              {content.contact.responseTime}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

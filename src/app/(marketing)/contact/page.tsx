import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";
import ContactForm from "@/app/(marketing)/contact/contact-form";

function getQueryFirst(value: string | string[] | undefined) {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const initialTopic = getQueryFirst(searchParams.topic);
  const initialMessage = getQueryFirst(searchParams.message);
  const initialEmail = getQueryFirst(searchParams.email);

  const locale = await getLocaleFromRequest();
  const content = getContent(locale);

  const cmsTitle = await getContentBlock({ key: "contact.title", locale });
  const cmsSubtitle = await getContentBlock({ key: "contact.subtitle", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={content.contact.eyebrow}
          title={cmsTitle || content.contact.title}
          subtitle={cmsSubtitle || content.contact.subtitle}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm
            labels={{
              name: "Name",
              topic: "Topic",
              topicOptions: ["Support", "Partnership", "Sales", "Security"],
              email: content.contact.email,
              message: content.contact.message,
              sendRequest: content.contact.sendRequest,
            }}
            initialTopic={initialTopic}
            initialMessage={initialMessage}
            initialEmail={initialEmail}
          />
          <div className="glass-card rounded-3xl p-8 text-sm text-white/70">
            <p className="text-base font-semibold text-white">
              {content.contact.directLines}
            </p>
            <p className="mt-4">hello@roxy.stream</p>
            <p className="mt-2">Partnerships: partners@roxy.stream</p>
            <p className="mt-4 text-xs text-white/60">
              For technical issues, include your Diagnostics screenshot and Desktop logs path.
            </p>
            <p className="mt-6 text-xs text-white/50">
              {content.contact.responseTime}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

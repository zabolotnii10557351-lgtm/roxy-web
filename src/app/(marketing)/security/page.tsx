import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function SecurityPage() {
  const locale = await getLocaleFromRequest();
  const title = await getContentBlock({ key: "security.title", locale });
  const subtitle = await getContentBlock({ key: "security.subtitle", locale });
  const body = await getContentBlock({ key: "security.body", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Security"
          title={title || "Security"}
          subtitle={subtitle || "How we handle data and access."}
        />
        <div className="mt-10 glass-card rounded-3xl p-8">
          <MarkdownBlock markdown={body || ""} />
        </div>
      </Container>
    </div>
  );
}

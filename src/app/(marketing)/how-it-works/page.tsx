import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function HowItWorksPage() {
  const locale = await getLocaleFromRequest();
  const title = await getContentBlock({ key: "how_it_works.title", locale });
  const subtitle = await getContentBlock({ key: "how_it_works.subtitle", locale });
  const body = await getContentBlock({ key: "how_it_works.body", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={title || "How it works"}
          subtitle={subtitle || "From idea to live stream."}
        />
        <div className="mt-10 glass-card rounded-3xl p-8">
          <MarkdownBlock markdown={body || ""} />
        </div>
      </Container>
    </div>
  );
}

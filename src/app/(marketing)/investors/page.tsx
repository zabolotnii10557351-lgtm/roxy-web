import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function InvestorsPage() {
  const locale = await getLocaleFromRequest();
  const title = await getContentBlock({ key: "investors.title", locale });
  const subtitle = await getContentBlock({ key: "investors.subtitle", locale });
  const body = await getContentBlock({ key: "investors.body", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Investors"
          title={title || "Investors"}
          subtitle={subtitle || "Reach out to invest in Roxy."}
        />
        <div className="mt-10 glass-card rounded-3xl p-8">
          <MarkdownBlock markdown={body || ""} />
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function InvestorsPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "investors.title", locale });
  const subtitle = await getContentBlock({ key: "investors.subtitle", locale });
  const body = await getContentBlock({ key: "investors.body", locale });

  const fallbackTitle = isRu ? "Инвесторам" : "Investors";
  const fallbackSubtitle = isRu
    ? "Если вы хотите обсудить инвестиции или партнёрство — напишите нам."
    : "If you want to discuss investment or strategic partnerships, reach out.";
  const fallbackBody = isRu
    ? [
        "### Контакт",
        "- Email: **hello@roxy.stream**",
        "- Форма: [/contact?topic=Partnership](/contact?topic=Partnership)",
        "",
        "### Что указать в письме",
        "- Кто вы и фонд/компания",
        "- Интерес (инвестиции / стратегическое партнёрство)",
        "- Удобное время/таймзона для созвона",
      ].join("\n")
    : [
        "### Contact",
        "- Email: **hello@roxy.stream**",
        "- Form: [/contact?topic=Partnership](/contact?topic=Partnership)",
        "",
        "### What to include",
        "- Who you are (fund/company)",
        "- Interest (investment / strategic partnership)",
        "- Preferred time/timezone for a call",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Инвесторам" : "Investors"}
          title={title || fallbackTitle}
          subtitle={subtitle || fallbackSubtitle}
        />
        <div className="mt-10 glass-card rounded-3xl p-8">
          <MarkdownBlock markdown={body || fallbackBody} />
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function RoadmapPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "roadmap.title", locale });
  const subtitle = await getContentBlock({ key: "roadmap.subtitle", locale });
  const body = await getContentBlock({ key: "roadmap.body", locale });

  const fallbackTitle = isRu ? "Roadmap" : "Roadmap";
  const fallbackSubtitle = isRu
    ? "Публичный план на высоком уровне. Даты и детали могут меняться."
    : "A high-level public roadmap. Dates and details may change.";
  const fallbackBody = isRu
    ? [
        "### Ближайшие направления",
        "- Улучшение стабильности real-time сессий и диагностики.",
        "- Больше шаблонов для форматов стрима и сценариев.",
        "- Расширение интеграций для стрима и аватара.",
        "- Больше прозрачности по usage (Active Speech) и лимитам.",
        "",
        "### Как влиять",
        "Если вы хотите повлиять на приоритеты — напишите нам: [/contact](/contact).",
      ].join("\n")
    : [
        "### Near-term focus",
        "- Improve reliability of real-time sessions and diagnostics.",
        "- More templates for stream formats and scripts.",
        "- Expand streaming and avatar integrations.",
        "- Better visibility into usage (Active Speech) and limits.",
        "",
        "### Influence priorities",
        "Want something prioritized? Reach out: [/contact](/contact).",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "План" : "Roadmap"}
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

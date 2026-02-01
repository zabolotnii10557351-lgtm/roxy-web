import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function IntegrationsPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "integrations.title", locale });
  const subtitle = await getContentBlock({ key: "integrations.subtitle", locale });
  const body = await getContentBlock({ key: "integrations.body", locale });

  const fallbackTitle = isRu ? "Интеграции" : "Integrations";
  const fallbackSubtitle = isRu
    ? "Подключите RoxStreamAI к вашему сетапу: стрим, аватар и провайдеры."
    : "Connect RoxStreamAI to your stack: streaming, avatars, and providers.";
  const fallbackBody = isRu
    ? [
        "### Что обычно подключают",
        "- **OBS (WebSocket)** — управление сценами/оверлеями и события в стриме (в зависимости от вашего сетапа).",
        "- **Unreal / Live Link** — real-time пайплайн для аватара через Desktop companion.",
        "- **TikTok Live** — взаимодействие с чатом и событиями платформы (если включено в вашем режиме).",
        "- **BYOK провайдеры** — используйте свои ключи совместимых провайдеров.",
        "",
        "### Где начать",
        "- OBS: [/docs/obs](/docs/obs)",
        "- Unreal: [/docs/unreal](/docs/unreal)",
        "- Провайдеры: [/docs/providers](/docs/providers)",
        "",
        "Если вы не уверены, с чего начать — откройте туториал: [/docs/tutorials/first-stream](/docs/tutorials/first-stream).",
      ].join("\n")
    : [
        "### Common integrations",
        "- **OBS (WebSocket)** to drive scenes/overlays and react to stream events (depending on your setup).",
        "- **Unreal / Live Link** for real-time avatar workflows via the Desktop companion.",
        "- **TikTok Live** for chat and platform events (when enabled for your mode).",
        "- **BYOK providers** to use your own compatible provider keys.",
        "",
        "### Where to start",
        "- OBS: [/docs/obs](/docs/obs)",
        "- Unreal: [/docs/unreal](/docs/unreal)",
        "- Providers: [/docs/providers](/docs/providers)",
        "",
        "If you want a guided path, follow: [/docs/tutorials/first-stream](/docs/tutorials/first-stream).",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Интеграции" : "Integrations"}
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

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function HowItWorksPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "how_it_works.title", locale });
  const subtitle = await getContentBlock({ key: "how_it_works.subtitle", locale });
  const body = await getContentBlock({ key: "how_it_works.body", locale });

  const fallbackTitle = isRu ? "Как это работает" : "How it works";
  const fallbackSubtitle = isRu
    ? "Короткий путь от идеи до первого live-сеанса."
    : "A quick path from idea to first live session.";
  const fallbackBody = isRu
    ? [
        "### 1) Создайте персонажа",
        "Опишите голос/тон, правила и ограничения. Начните с одной роли и расширяйте позже.",
        "",
        "### 2) Выберите режим провайдера",
        "Используйте **included providers** в рамках квоты или включите **BYOK** и подключите свои ключи.",
        "",
        "### 3) Подключите стрим-интеграции",
        "Подключите нужные коннекторы (например, OBS/Unreal) через Desktop companion и проверьте пайплайн.",
        "",
        "### 4) Настройте guardrails",
        "Определите, что можно/нельзя в эфире, и какие темы/слова требуют блокировки или мягкого редиректа.",
        "",
        "### 5) Запустите первую сессию",
        "Используйте туториал: [/docs/tutorials/first-stream](/docs/tutorials/first-stream).",
      ].join("\n")
    : [
        "### 1) Create a character",
        "Define voice/tone, rules, and limits. Start with one role and expand later.",
        "",
        "### 2) Choose your provider mode",
        "Use **included providers** within your quota or enable **BYOK** to connect your own keys.",
        "",
        "### 3) Connect your stream integrations",
        "Wire up the connectors you need (e.g. OBS/Unreal) via the Desktop companion and validate the pipeline.",
        "",
        "### 4) Add guardrails",
        "Define what’s allowed on stream, and what topics/words require blocking or gentle redirection.",
        "",
        "### 5) Run your first session",
        "Follow: [/docs/tutorials/first-stream](/docs/tutorials/first-stream).",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Процесс" : "How it works"}
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

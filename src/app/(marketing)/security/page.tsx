import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function SecurityPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "security.title", locale });
  const subtitle = await getContentBlock({ key: "security.subtitle", locale });
  const body = await getContentBlock({ key: "security.body", locale });

  const fallbackTitle = isRu ? "Безопасность" : "Security";
  const fallbackSubtitle = isRu
    ? "Практика и рекомендации по работе с аккаунтами и BYOK-ключами."
    : "Practices and recommendations for accounts and BYOK keys.";
  const fallbackBody = isRu
    ? [
        "### Принципы",
        "Мы стараемся держать безопасность простой и проверяемой: минимизируем чувствительные данные и отделяем продуктовые настройки от секретов.",
        "",
        "### Рекомендации для BYOK",
        "- Используйте ключи с минимальными правами и ограничениями по проекту.",
        "- Регулярно ротируйте ключи и храните их как секреты.",
        "- Если вы подозреваете утечку — сразу отзовите ключ у провайдера.",
        "",
        "### Вопросы security/compliance",
        "Напишите нам: [/contact?topic=Security](/contact?topic=Security).",
      ].join("\n")
    : [
        "### Principles",
        "We aim to keep security practical and verifiable: minimize sensitive data and treat secrets as secrets.",
        "",
        "### BYOK recommendations",
        "- Use least-privilege keys and scope them to the smallest possible project.",
        "- Rotate keys regularly and store them as secrets.",
        "- If you suspect exposure, revoke keys at the provider immediately.",
        "",
        "### Security/compliance questions",
        "Reach out: [/contact?topic=Security](/contact?topic=Security).",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Безопасность" : "Security"}
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

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";

export default async function ProductPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";
  const title = await getContentBlock({ key: "product.title", locale });
  const subtitle = await getContentBlock({ key: "product.subtitle", locale });
  const body = await getContentBlock({ key: "product.body", locale });

  const fallbackTitle = isRu ? "Продукт" : "Product";
  const fallbackSubtitle = isRu
    ? "Что вы получаете в RoxStreamAI: дашборд, Desktop companion и понятные лимиты usage."
    : "What you get with RoxStreamAI: a dashboard, a Desktop companion, and clear usage limits.";
  const fallbackBody = isRu
    ? [
        "### Из чего состоит RoxStreamAI",
        "- **Web dashboard** — где вы настраиваете персонажей, провайдеров, сценарии и лимиты.",
        "- **Desktop companion app** — локальные интеграции, диагностика и связка с real-time пайплайном.",
        "",
        "### Ключевые модули",
        "- **Characters**: личность, голос, правила и guardrails.",
        "- **Stream connectors**: подключение каналов и контроль concurrency.",
        "- **Usage**: метрика **Active Speech** и понятные лимиты по тарифу.",
        "",
        "### BYOK",
        "BYOK (Bring Your Own Keys) позволяет использовать свои ключи совместимых провайдеров. В этом режиме вы оплачиваете провайдера напрямую, а RoxStreamAI отслеживает Active Speech для лимитов.",
        "",
        "### Дальше",
        "- Начните с гайда: [/docs/getting-started](/docs/getting-started)",
        "- Посмотрите тарифы: [/pricing](/pricing)",
      ].join("\n")
    : [
        "### What RoxStreamAI includes",
        "- **Web dashboard** to configure characters, providers, scripts, and limits.",
        "- **Desktop companion app** for local integrations, diagnostics, and real-time workflows.",
        "",
        "### Core modules",
        "- **Characters**: persona, voice, rules, and guardrails.",
        "- **Stream connectors**: link channels and manage concurrency.",
        "- **Usage**: clear **Active Speech** metering and plan limits.",
        "",
        "### BYOK",
        "BYOK (Bring Your Own Keys) lets you use your own compatible provider keys. In BYOK mode, you pay the provider directly while RoxStreamAI tracks Active Speech for plan limits.",
        "",
        "### Next steps",
        "- Start here: [/docs/getting-started](/docs/getting-started)",
        "- See plans: [/pricing](/pricing)",
      ].join("\n");

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Продукт" : "Product"}
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

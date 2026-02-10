import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const sections = [
    {
      href: "/docs/getting-started",
      title: isRu ? "Быстрый старт" : "Getting started",
      body: isRu ? "Аккаунт → скачивание → первая сессия." : "Account → download → first session.",
    },
    {
      href: "/docs/providers",
      title: isRu ? "Провайдеры и ключи" : "Providers and keys",
      body: isRu ? "OpenAI voice и BYOK для ElevenLabs." : "OpenAI voice and BYOK for ElevenLabs.",
    },
    {
      href: "/docs/unreal",
      title: isRu ? "Unreal workflow" : "Unreal workflows",
      body: isRu ? "Desktop connector mode и Live Link Face режим." : "Desktop connector mode and Live Link Face mode.",
    },
    {
      href: "/docs/obs",
      title: isRu ? "Настройка OBS" : "OBS setup",
      body: isRu ? "Подключение и проверка OBS WebSocket." : "Connect and verify OBS WebSocket.",
    },
    {
      href: "/docs/safety",
      title: isRu ? "Безопасность и модерация" : "Safety and moderation",
      body: isRu ? "Guardrails, стоп‑фразы и правила поведения." : "Guardrails, stop phrases, and moderation rules.",
    },
    {
      href: "/docs/troubleshooting",
      title: isRu ? "Траблшутинг" : "Troubleshooting",
      body: isRu ? "Частые ошибки, лог‑пути и диагностика." : "Common errors, log paths, and diagnostics.",
    },
  ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Документация" : "Documentation"}
          title={isRu ? "Документация" : "Documentation"}
          subtitle={
            isRu
              ? "Гайды по настройке, провайдерам, Unreal‑workflow и диагностике."
              : "Setup guides, provider configuration, Unreal workflows, and troubleshooting."
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="glass-card rounded-3xl p-6 transition-all hover:scale-[1.01]"
              >
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.body}</p>
                <p className="mt-5 text-xs text-cyan-200">{isRu ? "Открыть →" : "Open →"}</p>
              </Link>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {isRu ? "Туториал" : "Tutorial"}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {isRu ? "Первая сессия" : "Your first session"}
            </h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {isRu
                ? "Чеклист: аккаунт, ключи, Desktop Mode и проверка перед эфиром."
                : "A checklist: account, keys, Desktop Mode, and pre-stream validation."}
            </p>
            <div className="mt-6">
              <Link
                href="/docs/tutorials/first-stream"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                {isRu ? "Открыть туториал" : "Open tutorial"}
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">
              {isRu
                ? "Часть функций может быть в beta — раздел обновляется." 
                : "Some features may be in beta — this section evolves quickly."}
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={isRu ? "F&Q" : "F&Q"}
          title={isRu ? "F&Q" : "F&Q"}
          subtitle={
            isRu
              ? "Остались вопросы после гайдов? Начните чат с помощником ниже."
              : "Still have questions after the guides? Start a chat with the assistant below."
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link href="/roadmap" className="glass-card rounded-3xl p-6 transition-all hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Roadmap" : "Roadmap"}</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {isRu ? "Ближайшие 90 дней: docs, туториалы, интеграции." : "Next 90 days: docs, tutorials, integrations."}
            </p>
            <p className="mt-5 text-xs text-cyan-200">{isRu ? "Открыть →" : "Open →"}</p>
          </Link>
          <Link href="/blog" className="glass-card rounded-3xl p-6 transition-all hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Блог" : "Blog"}</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {isRu ? "Короткие гайды и разборы cost math." : "Guides, setup notes, and cost math."}
            </p>
            <p className="mt-5 text-xs text-cyan-200">{isRu ? "Открыть →" : "Open →"}</p>
          </Link>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70"
          >
            {isRu ? "Начать чат" : "Start chat"}
          </button>
        </div>
      </Container>
    </div>
  );
}

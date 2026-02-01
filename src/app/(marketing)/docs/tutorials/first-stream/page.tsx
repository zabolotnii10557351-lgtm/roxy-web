import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsFirstStreamTutorialPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const phases = isRu
    ? [
        {
          title: "До эфира (10 минут)",
          items: [
            "Проверьте провайдера и ключи (BYOK), если используете.",
            "Откройте Desktop app и убедитесь, что интеграции активны.",
            "Сделайте тестовый прогон на 30–60 секунд.",
          ],
        },
        {
          title: "Старт сессии",
          items: [
            "Запускайте с коротким «hello script» и нейтральным стилем.",
            "Держите аварийную остановку речи под рукой.",
            "Оцените задержку: если ощущается медленно — упрощайте цепочку.",
          ],
        },
        {
          title: "Во время эфира",
          items: [
            "Не добавляйте новые фичи на лету — сначала стабильность.",
            "Следите за чатом: сложные темы лучше «деэскалировать» и возвращаться к игре/сценарию.",
            "Записывайте заметки: что улучшить в промпте и правилах поведения.",
          ],
        },
      ]
    : [
        {
          title: "Before you go live (10 minutes)",
          items: [
            "Verify provider and keys (BYOK) if you use it.",
            "Open the desktop app and confirm integrations are active.",
            "Run a 30–60 second test session.",
          ],
        },
        {
          title: "Start the session",
          items: [
            "Begin with a short hello script and a neutral speaking style.",
            "Keep an emergency stop path within reach.",
            "Evaluate latency: if it feels slow, simplify the chain.",
          ],
        },
        {
          title: "During the stream",
          items: [
            "Avoid adding new features mid-stream — stability first.",
            "De-escalate difficult topics and return to your script/gameplay.",
            "Take notes: what to improve in your prompt and rules.",
          ],
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Tutorial" : "Tutorial"}
          title={isRu ? "Первая сессия" : "Your first session"}
          subtitle={
            isRu
              ? "Пошаговый чеклист, чтобы уверенно выйти в эфир."
              : "A checklist to go live with confidence."}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {phases.map((p) => (
            <div key={p.title} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {p.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-white/50">
            {isRu
              ? "Если вы только знакомитесь — начните с Getting started и OBS setup."
              : "If you’re new here, start with Getting started and OBS setup."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs/getting-started" className="text-cyan-200 hover:text-cyan-100 text-sm">
              {isRu ? "Быстрый старт →" : "Getting started →"}
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/docs/obs" className="text-cyan-200 hover:text-cyan-100 text-sm">
              {isRu ? "OBS setup →" : "OBS setup →"}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

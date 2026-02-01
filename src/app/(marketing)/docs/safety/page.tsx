import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function DocsSafetyPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const now = isRu
    ? [
        "Запускайте первую настройку в приватном/тестовом режиме.",
        "Держите физический «panic stop» (горячая клавиша/кнопка) для остановки речи.",
        "Заранее определите темы-табу и стиль ответа (коротко/нейтрально/без эскалации).",
        "Проверяйте промпт и персонажа: меньше двусмысленности — меньше рисков.",
      ]
    : [
        "Do your first setup in a private/test mode.",
        "Keep a physical panic-stop path (hotkey/button) to stop speech.",
        "Define taboo topics and response style ahead of time (short/neutral/no escalation).",
        "Audit your character prompt: less ambiguity means fewer risks.",
      ];

  const comingSoon = isRu
    ? [
        "Шаблоны модерации по категориям.",
        "Блок-листы и стоп‑фразы на уровне проекта.",
        "Режим «только ответы на вопросы» для сложных чатов.",
      ]
    : [
        "Category-based moderation presets.",
        "Project-level blocklists and stop phrases.",
        "‘Answer-only’ mode for high-pressure chats.",
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Безопасность и модерация" : "Safety and moderation"}
          subtitle={
            isRu
              ? "Практики, которые снижают риск в прямом эфире."
              : "Practical guardrails that reduce risk on live streams."}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Рекомендуем уже сейчас" : "Recommended now"}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {now.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Coming soon" : "Coming soon"}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {comingSoon.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-white/50">
              {isRu
                ? "Фичи отмечены как Coming soon, чтобы не обещать то, чего нет в текущей сборке."
                : "Marked as Coming soon to avoid claiming features that aren’t in your current build."}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

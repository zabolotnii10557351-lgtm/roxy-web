import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsGettingStartedPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const steps = isRu
    ? [
        {
          title: "Создайте аккаунт",
          body: "Откройте веб‑панель и авторизуйтесь. Для работы демо достаточно базовой настройки.",
        },
        {
          title: "Скачайте Desktop app",
          body: "Desktop companion app помогает подключать локальные интеграции (например, Unreal/OBS).",
        },
        {
          title: "Выберите голосового провайдера",
          body: "Поддерживаются разные провайдеры; для некоторых нужен BYOK (ваш API‑ключ).",
        },
        {
          title: "Подключите OBS (если нужно)",
          body: "Включите OBS WebSocket и проверьте, что Roxy может управлять сценами/источниками.",
        },
        {
          title: "Соберите первый сценарий",
          body: "Задайте персонажа, стиль речи и правила поведения. Начните с короткого теста.",
        },
        {
          title: "Проверьте перед эфиром",
          body: "Сделайте прогон в приватном режиме: звук, задержка, аварийная остановка.",
        },
      ]
    : [
        {
          title: "Create your account",
          body: "Open the web dashboard and sign in. A basic setup is enough for the demo.",
        },
        {
          title: "Download the desktop app",
          body: "The desktop companion app helps with local integrations (for example, Unreal/OBS).",
        },
        {
          title: "Pick your voice provider",
          body: "Different providers are supported; some require BYOK (your own API key).",
        },
        {
          title: "Connect OBS (optional)",
          body: "Enable OBS WebSocket and verify Roxy can control scenes/sources.",
        },
        {
          title: "Build your first flow",
          body: "Set character, speaking style, and behavior rules. Start with a short test session.",
        },
        {
          title: "Pre-stream checklist",
          body: "Run a private rehearsal: audio, latency, and an emergency stop path.",
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Быстрый старт" : "Getting started"}
          subtitle={
            isRu
              ? "Минимальная настройка, чтобы запустить первую сессию без сюрпризов."
              : "The minimum setup to run your first session without surprises."
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="glass-card rounded-3xl p-6">
              <p className="text-xs text-white/50">{isRu ? "Шаг" : "Step"} {index + 1}</p>
              <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="/docs/tutorials/first-stream"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            {isRu ? "Открыть туториал «Первая сессия»" : "Open the ‘First session’ tutorial"}
          </Link>
          <p className="text-xs text-white/50">
            {isRu
              ? "Тарифы и ограничения по расходам — на странице Pricing."
              : "Plans and usage limits are covered on the Pricing page."}
            {" "}
            <Link href="/pricing" className="text-cyan-200 hover:text-cyan-100">
              {isRu ? "Смотреть тарифы →" : "See pricing →"}
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

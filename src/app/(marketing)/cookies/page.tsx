import Container from "@/components/Container";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function CookiesPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const t = isRu
    ? {
        title: "Cookie Policy",
        subtitle: "Как RoxStreamAI использует cookies и похожие технологии.",
        whatTitle: "Что такое cookies?",
        whatBody:
          "Cookies — это небольшие текстовые файлы на вашем устройстве. Они помогают сохранять сессию, помнить настройки и улучшать продукт.",
        useTitle: "Какие cookies мы используем",
        uses: [
          "Обязательные cookies (аутентификация/сессия) — нужны для базовой функциональности.",
          "Cookies предпочтений (например, язык) — запоминают выбранную локаль.",
          "Аналитика (опционально) — помогает понять, что улучшать.",
        ],
        manageTitle: "Как управлять cookies",
        manageBody:
          "Вы можете управлять cookies в настройках браузера. Отключение обязательных cookies может сломать вход в аккаунт и другие основные функции.",
        updated: "Последнее обновление: 2026-02-01",
      }
    : {
        title: "Cookie Policy",
        subtitle:
          "This page explains how RoxStreamAI uses cookies and similar technologies.",
        whatTitle: "What are cookies?",
        whatBody:
          "Cookies are small text files stored on your device. They help us keep you signed in, remember preferences, and improve the product.",
        useTitle: "Cookies we use",
        uses: [
          "Essential cookies (authentication/session) — required for core functionality.",
          "Preference cookies (e.g. language) — remember settings like your chosen locale.",
          "Analytics cookies (optional) — help us understand what to improve.",
        ],
        manageTitle: "Managing cookies",
        manageBody:
          "You can control cookies through your browser settings. Disabling essential cookies may prevent sign-in and other core features from working.",
        updated: "Last updated: 2026-02-01",
      };

  return (
    <Container className="py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-white">{t.title}</h1>
          <p className="mt-3 text-sm text-white/60">{t.subtitle}</p>
        </div>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">{t.whatTitle}</h2>
          <p className="text-sm text-white/70">{t.whatBody}</p>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">{t.useTitle}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-white/70">
            {t.uses.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">{t.manageTitle}</h2>
          <p className="text-sm text-white/70">{t.manageBody}</p>
        </section>

        <p className="text-xs text-white/50">{t.updated}</p>
      </div>
    </Container>
  );
}

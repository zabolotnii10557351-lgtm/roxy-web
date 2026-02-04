import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsElevenLabsKeyPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const youtubeUrl = process.env.NEXT_PUBLIC_ELEVENLABS_YT_URL ?? "";

  const steps = isRu
    ? [
        "Перейдите в ElevenLabs и войдите в аккаунт.",
        "Откройте раздел API Keys и создайте новый ключ.",
        "Скопируйте ключ и вставьте его в Settings → AI Providers → ElevenLabs.",
        "Выберите голос (Voice ID) и выполните Test Voice.",
      ]
    : [
        "Sign in to your ElevenLabs account.",
        "Open the API Keys section and create a new key.",
        "Paste the key in Settings → AI Providers → ElevenLabs.",
        "Select a Voice ID and run Test Voice.",
      ];

  return (
    <div className="space-y-16 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Как получить ElevenLabs API key" : "How to get an ElevenLabs API key"}
          subtitle={
            isRu
              ? "ElevenLabs сейчас работает только в режиме BYOK. Ключ хранится на сервере и не возвращается в браузер."
              : "ElevenLabs currently works in BYOK mode. Keys are stored server-side and never returned to the browser."
          }
        />

        <div className="mt-10 glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">
            {isRu ? "Пошаговая инструкция" : "Step-by-step"}
          </h3>
          <ol className="mt-4 space-y-2 text-sm text-white/70">
            {steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/app/settings"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
          >
            {isRu ? "Открыть настройки" : "Open settings"}
          </Link>
          {youtubeUrl ? (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 hover:bg-cyan-500/20"
            >
              {isRu ? "YouTube инструкция" : "YouTube tutorial"}
            </a>
          ) : (
            <span className="text-xs text-white/50">
              {isRu
                ? "YouTube‑ссылка будет добавлена позже."
                : "YouTube link will be added soon."}
            </span>
          )}
        </div>
      </Container>
    </div>
  );
}

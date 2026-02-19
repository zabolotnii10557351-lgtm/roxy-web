import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import MarkdownBlock from "@/components/MarkdownBlock";
import { getLocaleFromRequest } from "@/i18n/server";
import { getContentBlock } from "@/server/content/getContentBlock";
import type { Locale } from "@/i18n/locales";

interface RoadmapStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
}

function getRoadmapStrings(locale: Locale): RoadmapStrings {
  if (locale === "ru") {
    return {
      eyebrow: "План развития",
      title: "Roadmap",
      subtitle:
        "Публичный план на высоком уровне. Даты и детали могут меняться.",
      body: [
        "## Фаза 1 — Готово",
        "",
        "Базовый пайплайн AI‑стримера запущен и работает.",
        "",
        "- AI Мозг (OpenAI Responses API) — генерация ответов на чат и события",
        "- Синтез речи (TTS) — озвучка через OpenAI / ElevenLabs с очередью и фолбэком",
        "- Lip Sync (NeuroSync) — аудио → blendshapes в реальном времени",
        "- TikTok Live — чтение чата и подарков через tiktok-live-connector",
        "- Донаты — правила маршрутизации с триггерами в Unreal",
        "- OBS — скриншоты сцены и переключение через obs-websocket-js",
        "- Desktop App (Tauri) — единый запуск NeuroSync + Unreal + Bot, настройки и логи",
        "",
        "## Фаза 2 — В работе",
        "",
        "Расширение возможностей и упрощение настройки.",
        "",
        "- Pixel Streaming — запуск Unreal в браузере без локальной GPU",
        "- Smart Customize — визуальный редактор персонажа и сцены из дашборда",
        "- Webcam Tracking — захват мимики через камеру вместо Live Link Face",
        "- STT улучшения — более стабильный Realtime API и автоопределение устройства",
        "",
        "## Фаза 3 — Планы",
        "",
        "Масштабирование платформы.",
        "",
        "- Мультиплатформа — поддержка Twitch и YouTube Live помимо TikTok",
        "- Мобильное приложение — управление стримом с телефона",
        "- Маркетплейс — обмен персонажами, сценами и триггерами между пользователями",
        "- Мульти‑персонаж — одновременная работа нескольких AI‑ведущих",
        "",
        "---",
        "",
        "Хотите повлиять на приоритеты? Напишите нам: [/contact](/contact).",
      ].join("\n"),
    };
  }

  return {
    eyebrow: "Roadmap",
    title: "Roadmap",
    subtitle: "A high-level public roadmap. Dates and details may change.",
    body: [
      "## Phase 1 — Done",
      "",
      "The core AI streamer pipeline is live and running.",
      "",
      "- AI Brain (OpenAI Responses API) — chat and event response generation",
      "- Text-to-Speech (TTS) — voice synthesis via OpenAI / ElevenLabs with queue and fallback",
      "- Lip Sync (NeuroSync) — audio → blendshapes in real time",
      "- TikTok Live — reading chat and gifts via tiktok-live-connector",
      "- Donations — routing rules with Unreal triggers",
      "- OBS — scene screenshots and switching via obs-websocket-js",
      "- Desktop App (Tauri) — one-click launch of NeuroSync + Unreal + Bot, settings, and logs",
      "",
      "## Phase 2 — In Progress",
      "",
      "Expanding capabilities and simplifying setup.",
      "",
      "- Pixel Streaming — run Unreal in a browser without a local GPU",
      "- Smart Customize — visual character and scene editor from the dashboard",
      "- Webcam Tracking — facial capture via webcam instead of Live Link Face",
      "- STT Improvements — more stable Realtime API and auto device detection",
      "",
      "## Phase 3 — Planned",
      "",
      "Scaling the platform.",
      "",
      "- Multi-platform — Twitch and YouTube Live support alongside TikTok",
      "- Mobile App — control your stream from your phone",
      "- Marketplace — share characters, scenes, and triggers between users",
      "- Multi-character — run multiple AI hosts simultaneously",
      "",
      "---",
      "",
      "Want something prioritized? Reach out: [/contact](/contact).",
    ].join("\n"),
  };
}

export default async function RoadmapPage() {
  const locale = await getLocaleFromRequest();
  const strings = getRoadmapStrings(locale);

  const cmsTitle = await getContentBlock({ key: "roadmap.title", locale });
  const cmsSubtitle = await getContentBlock({
    key: "roadmap.subtitle",
    locale,
  });
  const cmsBody = await getContentBlock({ key: "roadmap.body", locale });

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={strings.eyebrow}
          title={cmsTitle || strings.title}
          subtitle={cmsSubtitle || strings.subtitle}
        />
        <div className="mt-10 glass-card rounded-3xl p-8">
          <MarkdownBlock markdown={cmsBody || strings.body} />
        </div>
      </Container>
    </div>
  );
}

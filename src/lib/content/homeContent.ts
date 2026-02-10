import type { Locale } from "@/i18n/locales";

export type HomePillar = {
  icon: "bot" | "activity" | "monitor";
  title: string;
  body: string;
};

export type HomeIntegration = {
  label: string;
  note?: string;
  logo?: string;
};

export type HomeCard = {
  icon: "sparkles" | "monitor" | "activity";
  title: string;
  body: string;
  href: string;
  cta: string;
};

export type HomeSecurityCard = {
  icon: "lock" | "badgeCheck" | "activity";
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeFaqItem = {
  q: string;
  a: string;
};

export type HomeContent = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    note: string;
  };
  pillars: HomePillar[];
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stepLabel: string;
    steps: string[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomeIntegration[];
  };
  characters: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: HomeCard[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    customLabel: string;
  };
  security: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: HomeSecurityCard[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomeFaqItem[];
  };
};

export function getHomeContentFallback(locale: Locale): HomeContent {
  const isRu = locale === "ru";

  return {
    hero: {
      badge: "RoxStreamAI",
      title: isRu
        ? "Запустите AI‑ведущего для стримов за считанные минуты."
        : "Launch AI-hosted streams in minutes.",
      subtitle: isRu
        ? "Создавайте уникальных персонажей под свой формат и выводите стриминг на новый уровень, не теряя контроля."
        : "Create unique characters for your usage and take streaming to a whole new level without losing control.",
      primaryCtaLabel: isRu ? "Скачать демо" : "Download demo",
      secondaryCtaLabel: isRu ? "Смотреть тарифы" : "See pricing",
      note: isRu
        ? "Понятные лимиты. Предсказуемая стоимость. BYOK поддерживается."
        : "Clear usage limits. Predictable costs. BYOK supported.",
    },
    pillars: isRu
      ? [
          {
            icon: "bot",
            title: "AI‑ко‑хост, а не чат‑бот",
            body: "Запускайте эфир с предсказуемым форматом: интро, сегменты, баттлы, Q&A и аудитория‑промпты. Настройте тон, правила и guardrails — чтобы стрим ощущался живым, но под контролем.",
          },
          {
            icon: "activity",
            title: "Понятные лимиты",
            body: "Выберите, сколько Active Speech вам нужно в месяц. Слайдер talk ratio помогает заранее прикинуть часы стрима и стоимость под ваш формат.",
          },
          {
            icon: "monitor",
            title: "Unreal‑готовые workflow",
            body: "Десктоп‑компаньон помогает подключать стрим к Unreal‑workflow. Экспортируйте и переиспользуйте персонажей или работайте через Live Link Face в своей сцене.",
          },
        ]
      : [
          {
            icon: "bot",
            title: "AI co-host, not a chatbot",
            body: "Run a predictable live format: intros, segments, battles, Q&A, and audience prompts. Customize tone, rules, and guardrails so the stream feels human without losing control.",
          },
          {
            icon: "activity",
            title: "Clear usage limits",
            body: "Pick how much Active Speech you want per month. Use the talk ratio slider to estimate stream hours and cost before you go live.",
          },
          {
            icon: "monitor",
            title: "Unreal-ready workflows",
            body: "Use the desktop companion to connect your stream to Unreal Engine workflows. Export and reuse characters, or integrate via Live Link Face if you prefer your own scene.",
          },
        ],
    howItWorks: {
      eyebrow: isRu ? "Как это работает" : "How it works",
      title: isRu ? "Ваш первый эфир за один вечер" : "Go live in one evening",
      subtitle: isRu
        ? "От аккаунта до стабильного live‑цикла за 5 шагов."
        : "From account to stable live loop in 5 steps.",
      stepLabel: isRu ? "Шаг" : "Step",
      steps: isRu
        ? [
            "Создайте аккаунт и скачайте десктоп‑компаньон.",
            "Подключите каналы и инструменты (TikTok‑first).",
            "Выберите персону и правила безопасности.",
            "Запускайте сессию: чат, подарки, скрипты и модерация в одном цикле.",
            "Отслеживайте usage и настройте talk ratio под формат.",
          ]
        : [
            "Create an account and download the desktop companion.",
            "Connect your streaming channels and tools (TikTok-first).",
            "Choose a character persona and safety rules.",
            "Start your session: chat, gifts, scripts, and moderation in one loop.",
            "Track usage and tune the talk ratio for your format.",
          ],
    },
    integrations: {
      eyebrow: isRu ? "Интеграции" : "Integrations",
      title: isRu
        ? "Подключайте то, чем вы уже пользуетесь"
        : "Works with your existing stack",
      subtitle: isRu
        ? "TikTok Live сегодня, больше провайдеров скоро."
        : "TikTok Live today. More providers soon.",
      items: [
        {
          label: "TikTok Live",
          note: isRu ? "сегодня" : "today",
          logo: "https://cdn.simpleicons.org/tiktok/ffffff",
        },
        {
          label: "OBS WebSocket",
          logo: "https://cdn.simpleicons.org/obsstudio/ffffff",
        },
        {
          label: "Unreal Engine",
          note: isRu ? "workflow" : "workflows",
          logo: "https://cdn.simpleicons.org/unrealengine/ffffff",
        },
        {
          label: "OpenAI voice",
          note: isRu ? "включено" : "included",
          logo: "https://cdn.simpleicons.org/openai/ffffff",
        },
        {
          label: "ElevenLabs",
          note: "BYOK",
          logo: "https://cdn.simpleicons.org/elevenlabs/ffffff",
        },
        {
          label: isRu ? "Другие провайдеры" : "More providers",
          note: isRu ? "скоро" : "soon",
          logo: "https://cdn.simpleicons.org/simpleicons/ffffff",
        },
      ],
    },
    characters: {
      eyebrow: isRu ? "Персонажи" : "Characters",
      title: isRu
        ? "Соберите персону один раз — переиспользуйте везде"
        : "Build once, reuse everywhere",
      subtitle: isRu
        ? "Создавайте персонажей в веб‑панели и экспортируйте в Unreal через Desktop Mode. Редактор Polyphoria — скоро."
        : "Create characters in the web dashboard and export to Unreal via Desktop Mode. Polyphoria editor integration is coming soon.",
      cards: isRu
        ? [
            {
              icon: "sparkles",
              title: "Персона и правила",
              body: "Тон, запрещенные слова, темы и формат шоу.",
              href: "/app/characters",
              cta: "Открыть персонажей",
            },
            {
              icon: "monitor",
              title: "Desktop Mode",
              body: "Подключение к Unreal, диагностика и экспорт (beta).",
              href: "/download",
              cta: "Скачать демо",
            },
            {
              icon: "activity",
              title: "Live‑цикл",
              body: "Чат + подарки + скрипты + модерация.",
              href: "/use-cases",
              cta: "Смотреть кейсы",
            },
          ]
        : [
            {
              icon: "sparkles",
              title: "Persona and rules",
              body: "Tone, forbidden words, topics, and show format.",
              href: "/app/characters",
              cta: "Open characters",
            },
            {
              icon: "monitor",
              title: "Desktop Mode",
              body: "Unreal connector, diagnostics, and export (beta).",
              href: "/download",
              cta: "Download demo",
            },
            {
              icon: "activity",
              title: "Live loop",
              body: "Chat + gifts + scripts + moderation.",
              href: "/use-cases",
              cta: "See use cases",
            },
          ],
    },
    pricing: {
      eyebrow: isRu ? "Тарифы" : "Pricing",
      title: isRu
        ? "Начните с малого, масштабируйтесь когда готовы"
        : "Start small, scale when you are ready",
      subtitle: isRu
        ? "Три плана для старта — полный калькулятор на странице тарифов."
        : "A quick teaser — full breakdown on the Pricing page.",
      ctaLabel: isRu ? "Смотреть тарифы" : "See pricing",
      customLabel: isRu ? "Индивидуально" : "Custom",
    },
    security: {
      eyebrow: isRu ? "Безопасность" : "Security & guardrails",
      title: isRu ? "Создано для live" : "Built for live streams",
      subtitle: isRu
        ? "Прагматичные guardrails и прозрачные лимиты."
        : "Pragmatic guardrails and transparent limits.",
      cards: isRu
        ? [
            {
              icon: "lock",
              title: "Правила и стоп‑сигналы",
              body: "Скрипты, стоп‑фразы и правила поведения помогают держать формат предсказуемым.",
              ctaLabel: "Подробнее",
              ctaHref: "/security",
            },
            {
              icon: "badgeCheck",
              title: "Rate limiting",
              body: "Мы ограничиваем шумные запросы и защищаем ключевые эндпоинты.",
              ctaLabel: "Подробнее",
              ctaHref: "/security",
            },
            {
              icon: "activity",
              title: "Аудит и диагностика",
              body: "Диагностика в Desktop Mode и админ‑аудит помогают разбирать инциденты и баги.",
              ctaLabel: "Подробнее",
              ctaHref: "/security",
            },
          ]
        : [
            {
              icon: "lock",
              title: "Rules and stop signals",
              body: "Scripts, stop phrases, and behavior rules keep the show predictable.",
              ctaLabel: "Learn more",
              ctaHref: "/security",
            },
            {
              icon: "badgeCheck",
              title: "Rate limiting",
              body: "We rate-limit sensitive endpoints to reduce abuse and spikes.",
              ctaLabel: "Learn more",
              ctaHref: "/security",
            },
            {
              icon: "activity",
              title: "Audit and diagnostics",
              body: "Desktop diagnostics and admin audit trails help investigate issues.",
              ctaLabel: "Learn more",
              ctaHref: "/security",
            },
          ],
    },
    cta: {
      title: isRu ? "Готовы увидеть в действии?" : "Ready to run your first session?",
      subtitle: isRu
        ? "Начните с триала или сравните тарифы."
        : "Start with a demo download or compare plans.",
      primaryLabel: isRu ? "Скачать демо" : "Download demo",
      primaryHref: "/download",
      secondaryLabel: isRu ? "Смотреть тарифы" : "See pricing",
      secondaryHref: "/pricing",
    },
    faq: {
      eyebrow: "FAQ",
      title: isRu ? "Быстрые ответы" : "FAQ",
      subtitle: isRu
        ? "Все о тарифах и лимитах."
        : "Quick answers about Desktop Mode, usage, and BYOK.",
      items: isRu
        ? [
            {
              q: "Как вы измеряете usage?",
              a: "Мы измеряем Active Speech — время, когда AI реально говорит. Сам стрим может идти дольше, чем Active Speech.",
            },
            {
              q: "Можно использовать свои ключи?",
              a: "Да. Для поддерживаемых провайдеров можно подключить BYOK и переключаться при необходимости.",
            },
            {
              q: "Нужен ли Unreal Engine?",
              a: "Нет. Unreal‑workflow опциональны. Можно стримить без Unreal и подключить позже.",
            },
            {
              q: "Насколько это безопасно для live?",
              a: "Мы поддерживаем guardrails: формат‑скрипты, rate limiting и правила модерации. Вы всегда контролируете поведение.",
            },
            {
              q: "Что такое talk ratio?",
              a: "Это доля времени, когда AI говорит в эфире. Меньший talk ratio даёт больше часов стрима при том же бюджете Active Speech.",
            },
            {
              q: "Можно ли менять тариф позже?",
              a: "Да. Апгрейд — в любой момент. Даунгрейд обычно применяется со следующего периода.",
            },
          ]
        : [
            {
              q: "How do you measure usage?",
              a: "We measure Active Speech time — the time the AI is actually speaking. Your stream can run longer than your Active Speech.",
            },
            {
              q: "Can I use my own API keys?",
              a: "Yes. You can bring your own keys for supported providers and switch when needed.",
            },
            {
              q: "Do I need Unreal Engine?",
              a: "No. Unreal workflows are optional. You can run the stream without Unreal, or connect later.",
            },
            {
              q: "Is this safe for live streams?",
              a: "We support guardrails like scripted formats, rate limiting, and moderation rules. You are always in control.",
            },
            {
              q: "What is talk ratio?",
              a: "Talk ratio is the percentage of time the AI is actively speaking during a stream. Lower talk ratio means more stream hours for the same Active Speech budget.",
            },
            {
              q: "Can I change plans later?",
              a: "Yes. You can upgrade at any time. Downgrades typically apply on the next billing cycle.",
            },
          ],
    },
  };
}

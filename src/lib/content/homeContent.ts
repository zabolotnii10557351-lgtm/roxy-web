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
  aiHost: {
    title: string;
    body: string;
  };
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
        ? "Создайте любого персонажа. Запустите интерактивные 3D аватар стримы за минуты."
        : "Create any character. Run interactive 3D avatar streams in minutes.",
      subtitle: isRu
        ? "RoxStreamAI - это веб панель и десктопный компаньон, где вы создаете персонажа, выбираете сцены и фоны, и запускаете Unreal действия от подарков. Добавляйте AI co-host когда нужно или отдайте управление 24/7."
        : "RoxStreamAI is a web dashboard plus a desktop companion that lets you build a character, pick scenes and backgrounds, and trigger Unreal actions from gifts. Add an AI co-host anytime or let it run the show while you rest.",
      primaryCtaLabel: isRu ? "Начать бесплатный триал" : "Start free trial",
      secondaryCtaLabel: isRu ? "Скачать десктопное приложение" : "Download desktop app",
      note: isRu
        ? "Понятные лимиты. Предсказуемая стоимость. BYOK поддерживается."
        : "Clear usage limits. Predictable costs. BYOK supported.",
    },
    pillars: isRu
      ? [
          {
            icon: "bot",
            title: "Конструктор персонажей",
            body: "Создайте персону с голосом, тоном, правилами и лором. Переиспользуйте ее в разных форматах и аккаунтах.",
          },
          {
            icon: "monitor",
            title: "Сцены и фоны",
            body: "Быстро меняйте локации, оверлеи и пресеты сцен. Освежайте визуал без пересборки пайплайна.",
          },
          {
            icon: "activity",
            title: "Триггеры Dono Engine",
            body: "Свяжите подарки с действиями: эмоции, реплики, VFX, смены камеры, смены сцен, cooldowns и приоритеты.",
          },
        ]
      : [
          {
            icon: "bot",
            title: "Character Builder",
            body: "Build a persona with voice, tone, rules, and lore. Reuse it across formats and accounts.",
          },
          {
            icon: "monitor",
            title: "Scenes + Backgrounds",
            body: "Switch locations, overlays, and scene presets fast. Keep visuals fresh without rebuilding your pipeline.",
          },
          {
            icon: "activity",
            title: "Dono Engine Triggers",
            body: "Map gifts to actions: emotions, lines, VFX, camera cuts, scene changes, cooldowns, priorities.",
          },
        ],
    aiHost: {
      title: isRu
        ? "AI host - это доп, а не весь продукт."
        : "AI host is an add-on, not the whole product.",
      body: isRu
        ? "Стримьте сами, когда хотите. Включайте AI co-host, чтобы заполнить паузы, следовать скриптам, реагировать на чат и подарки, или полностью вести эфир 24/7."
        : "Stream yourself when you want. Turn on the AI co-host to fill dead air, follow scripts, react to chat and gifts, or fully take over for 24/7 rotation.",
    },
    howItWorks: {
      eyebrow: isRu ? "Как это работает" : "How it works",
      title: isRu ? "Как это работает" : "How it works",
      subtitle: isRu
        ? "Пять шагов от персонажа до эфира."
        : "Five steps from character to live.",
      stepLabel: isRu ? "Шаг" : "Step",
      steps: isRu
        ? [
            "Создайте персонажа (персона, голос, правила).",
            "Выберите сцены и фоны (пресеты или ваш Unreal сетап).",
            "Настройте правила Dono Engine (подарки -> реакции -> действия).",
            "Подключите Desktop Mode (Unreal коннектор + диагностика).",
            "Выходите в эфир - с AI co-host или без него.",
          ]
        : [
            "Create a character (persona, voice, rules).",
            "Choose scenes and backgrounds (presets or your Unreal setup).",
            "Configure Dono Engine rules (gifts -> reactions -> actions).",
            "Connect Desktop Mode (Unreal connector + diagnostics).",
            "Go live with or without AI co-host.",
          ],
    },
    integrations: {
      eyebrow: isRu ? "Интеграции" : "Integrations",
      title: isRu
        ? "Подключайте то, чем вы уже пользуетесь"
        : "Works with your existing stack",
      subtitle: isRu
        ? "TikTok Live сегодня. OBS и Unreal workflow встроены. BYOK для провайдеров - когда нужен полный контроль."
        : "TikTok Live today. OBS and Unreal workflows built-in. BYOK supported for providers when you want full control.",
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
        ? "Соберите библиотеку персонажей для вашего канала"
        : "Build a character library for your channel.",
      subtitle: isRu
        ? "Создавайте персонажей в панели, экспортируйте в Unreal через Desktop Mode и переиспользуйте их в сценах, форматах и аккаунтах. Интеграция Polyphoria editor скоро."
        : "Create characters in the dashboard, export to Unreal via Desktop Mode, and reuse them across scenes, formats, and accounts. Polyphoria editor integration is coming soon.",
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
        ? "Начните с одного персонажа. Масштабируйте сцены, триггеры и concurrency."
        : "Start with one character. Scale scenes, triggers, and concurrency.",
      subtitle: isRu
        ? "Планы строятся вокруг персонажей, сцен и лимитов Dono Engine. Использование AI речи остается предсказуемым за счет Active Speech."
        : "Plans are built around characters, scenes, and Dono Engine limits. AI speech usage stays predictable with Active Speech tracking.",
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
            q: "Можно ли стримить без AI host?",
            a: "Да. Можно вести эфир с 3D аватаром и триггерами, а AI co-host включить позже.",
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
            q: "Что могут триггерить подарки?",
            a: "Эмоции, реплики, действия, смены сцен и события Unreal с cooldowns и приоритетами.",
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
              q: "Can I run without the AI host?",
              a: "Yes. You can stream with a 3D avatar and triggers only, and enable AI co-host later.",
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
              q: "What can gifts trigger?",
              a: "Emotions, lines, actions, scene changes, and Unreal events with cooldowns and priorities.",
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

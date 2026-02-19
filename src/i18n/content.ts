import type { Locale } from "@/i18n/locales";

export interface PlanCardContent {
  id: "trial" | "basic" | "pro" | "studio";
  name: string;
  price: string;
  description: string;
  badge?: string;
  includedHours: string;
  cta: string;
  features: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPostContent {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readingTime: string;
  content: string[];
}

export interface MarketingContent {
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionBody: string;
    beliefTitle: string;
    beliefBody: string;
    roxyTitle: string;
    roxyBody: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    sendRequest: string;
    directLines: string;
    responseTime: string;
  };
  terms: {
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
  };
  privacy: {
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string }>;
  };
  useCases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      highlights: string[];
    }>;
    outcomes: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ title: string; description: string }>;
    };
    cta: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
    };
  };
  docs: {
    quickstart: {
      eyebrow: string;
      title: string;
      subtitle: string;
      steps: Array<{ id: string; title: string; description: string }>;
    };
    product: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ id: string; title: string; description: string }>;
    };
    api: {
      eyebrow: string;
      title: string;
      subtitle: string;
      sections: Array<{ title: string; description: string; items: string[] }>;
    };
    glossary: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ term: string; description: string }>;
    };
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    comparisonTitle: string;
    comparisonHeaders: string[];
    comparisonRows: Array<{ label: string; values: string[] }>;
    extraCreditsTitle: string;
    extraCreditsSubtitle: string;
    extraCredits: Array<{ label: string; price: string }>;
    addonTitle: string;
    addonBadge: string;
    addonDescription: string;
    addonPrices: Array<{ label: string; price: string }>;
    addonCta: string;
    faqEyebrow: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backToBlog: string;
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: Array<{ name: string; role: string; focus: string }>;
    values: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ title: string; description: string }>;
    };
    cta: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
    };
  };
  download: {
    eyebrow: string;
    title: string;
    subtitle: string;
    latestLabel: string;
    noReleases: string;
    openAdmin: string;
    releaseHistory: string;
    download: string;
  };
  planCards: PlanCardContent[];
  faqs: FaqItem[];
  blogPosts: BlogPostContent[];
}

const en: MarketingContent = {
  about: {
    eyebrow: "Behind the scenes of RoxStreamAI",
    title: "About",
    subtitle: "What we're building and why.",
    missionTitle: "Mission",
    missionBody:
      "Help creators run high-quality avatar streams with less technical overhead and less burnout. RoxStreamAI makes character, scene, and trigger workflows repeatable and adds AI hosting when you want it.",
    beliefTitle: "What it is",
    beliefBody:
      "A web dashboard plus a desktop companion app. The dashboard manages characters, scenes, triggers, providers, and usage. The desktop app connects to Unreal, runs diagnostics, and enables real-time avatar workflows.",
    roxyTitle: "What RoxStreamAI stands for",
    roxyBody:
      "RoxStreamAI stands for Roxy AI Streamer. Roxy is our first created character, which led to the appearance of RoxStreamAI. She was the beginning of our long story.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Contact",
    subtitle:
      "Tell us what you're building - characters, Unreal scenes, interactive dono formats, or AI co-hosting.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    message: "Message",
    sendRequest: "Send message",
    directLines: "Direct lines",
    responseTime: "We respond within 1 business day.",
  },
  terms: {
    title: "Terms",
    intro:
      "These Terms govern your use of RoxStreamAI, including the website, the dashboard, and the desktop application. By creating an account or using the service, you agree to these Terms.",
    sections: [
      {
        title: "Accounts",
        body: "You are responsible for your account credentials and all activity under your account.",
      },
      {
        title: "Acceptable use",
        body: "You agree not to use RoxStreamAI for illegal activity, abuse, harassment, or to violate platform rules.",
      },
      {
        title: "Provider usage and BYOK",
        body: "When you use built-in providers, RoxStreamAI may pass your requests to third-party providers. When you use BYOK, you are responsible for your own provider keys and billing with that provider.",
      },
      {
        title: "Billing and renewals",
        body: "Paid plans renew automatically unless canceled. Usage-based charges and add-ons may apply depending on your plan.",
      },
      {
        title: "Content and data",
        body: "You retain ownership of your content. You grant RoxStreamAI permission to process it only to provide and improve the service.",
      },
      {
        title: "Availability",
        body: "We aim for high availability but do not guarantee uninterrupted service. Maintenance and outages can occur.",
      },
      {
        title: "Termination",
        body: "We may suspend or terminate access if these Terms are violated. You can cancel your plan anytime in the dashboard.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro:
      "This policy explains what data we collect, how we use it, and your choices.",
    sections: [
      {
        title: "Data we collect",
        body: "Account email, usage metrics (Active Speech, sessions), and optional device diagnostics (if you choose to share).",
      },
      {
        title: "How we use data",
        body: "To provide the service, secure accounts, measure usage, provide support, and improve reliability.",
      },
      {
        title: "Providers",
        body: "Some features rely on third-party providers (voice and models).",
      },
      {
        title: "We do not sell data",
        body: "We do not sell personal data.",
      },
      {
        title: "Security",
        body: "We apply access controls and redaction to protect secrets.",
      },
    ],
  },
  useCases: {
    eyebrow: "Priklady pouziti",
    title: "Priklady pouziti",
    subtitle:
      "Real formats RoxStreamAI is built for - characters, scenes, and interactive triggers. AI hosting is optional.",
    items: [
      {
        id: "24-7-host",
        title: "24/7 AI host",
        description:
          "Keep a consistent presence with controlled Active Speech. Perfect for always-on channels and international time zones.",
        highlights: [
          "Controlled Active Speech",
          "Predictable cost",
          "Always-on formats",
        ],
      },
      {
        id: "battle-formats",
        title: "Battle and event formats",
        description:
          "Run scripted segments, timed reactions, and event triggers. Keep pacing stable under pressure.",
        highlights: [
          "Scripted segments",
          "Timed reactions",
          "Event triggers",
        ],
      },
      {
        id: "multi-language",
        title: "Multi-language streams",
        description:
          "One character, multiple languages. Switch voice and brain providers per language or region.",
        highlights: [
          "One persona",
          "Multiple languages",
          "Provider switching",
        ],
      },
      {
        id: "unreal-avatar",
        title: "Unreal avatar streams",
        description:
          "Use the Desktop App to connect to Unreal and stream a real-time character.",
        highlights: [
          "Desktop App workflow",
          "Unreal connection",
          "Real-time avatar",
        ],
      },
      {
        id: "team-workflows",
        title: "Team workflows",
        description:
          "Manage characters, usage, and access across a team. Admin tools help keep keys and billing safe.",
        highlights: [
          "Admin tools",
          "Key management",
          "Audit visibility",
        ],
      },
    ],
    outcomes: {
      eyebrow: "Outcomes",
      title: "What teams unlock",
      subtitle: "Clear limits, predictable cost, and operational visibility.",
      items: [
        {
          title: "Predictable spend",
          description:
            "Control Active Speech and provider selection so usage stays predictable.",
        },
        {
          title: "Faster setup",
          description:
            "Build a character, pick providers, and go live without a complex pipeline.",
        },
        {
          title: "Clear diagnostics",
          description:
            "Use status indicators to debug backend, audio, tokens, and connectors.",
        },
      ],
    },
    cta: {
      title: "Ready to get started?",
      subtitle: "Download the Desktop App or view pricing.",
      primary: "Download Demo",
      secondary: "View pricing",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Documentation",
      title: "Documentation",
      subtitle: "Set up your character, scenes, and interactive triggers.",
      steps: [
        {
          id: "create-character",
          title: "Create a character",
          description: "Create your first character to unlock streaming and Unreal export.",
        },
        {
          id: "pick-providers",
          title: "Pick voice and brain providers",
          description: "Choose providers by budget, latency, and quality. Built-in options plus BYOK.",
        },
        {
          id: "set-limits",
          title: "Set limits for AI speech (optional)",
          description:
            "Keep usage predictable when AI co-host is enabled.",
        },
        {
          id: "connect-unreal",
          title: "Connect Unreal using the Desktop App",
          description: "Use the Desktop App for Unreal connection, export, and local diagnostics.",
        },
        {
          id: "go-live",
          title: "Go live and manage sessions",
          description: "Start a session and monitor Active Speech and provider usage.",
        },
      ],
    },
    product: {
      eyebrow: "Sections",
      title: "What you can set up",
      subtitle: "Core areas of the dashboard and Desktop App.",
      items: [
        {
          id: "characters",
          title: "Characters and presets",
          description:
            "Create persona profiles with languages, tone, safety rules, and behavior presets.",
        },
        {
          id: "providers",
          title: "Voice and brain providers",
          description:
            "Switch LLM and TTS providers by budget, latency, and quality. Built-in options plus BYOK.",
        },
        {
          id: "active-speech",
          title: "Active Speech control",
          description:
            "Set how much the AI speaks per hour. See estimated monthly hours and cost instantly.",
        },
        {
          id: "concurrency",
          title: "Concurrency",
          description:
            "Run multiple streams at the same time under one account, based on your plan.",
        },
        {
          id: "desktop-app",
          title: "Desktop app for Unreal",
          description:
            "Connect to Unreal, export characters, test audio and Live Link, and diagnose issues fast.",
        },
        {
          id: "diagnostics",
          title: "Diagnostics",
          description:
            "Clear status indicators for backend, audio devices, tokens, and connectors.",
        },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Reference overview",
      subtitle: "Structured endpoints for integrations and analytics.",
      sections: [
        {
          title: "Authentication",
          description:
            "Use project keys from the dashboard. Requests are authorized via bearer tokens with scoped roles.",
          items: [
            "POST /auth/token — exchange API key for session token",
            "POST /auth/refresh — refresh session token",
          ],
        },
        {
          title: "Characters",
          description:
            "Create, update, and version character profiles used in live sessions.",
          items: [
            "GET /characters — list characters",
            "POST /characters — create character",
            "PATCH /characters/{id} — update persona",
          ],
        },
        {
          title: "Sessions",
          description:
            "Start or stop live sessions, inspect metrics, and pull transcripts.",
          items: [
            "POST /sessions/start — start a session",
            "POST /sessions/stop — stop a session",
            "GET /sessions/{id} — session details",
          ],
        },
        {
          title: "Events",
          description:
            "Subscribe to gift reactions, scripted events, and moderation signals.",
          items: [
            "GET /events/stream — server-sent events",
            "POST /webhooks — register webhook",
          ],
        },
      ],
    },
    glossary: {
      eyebrow: "Glossary",
      title: "Key terms",
      subtitle: "Short definitions used across the dashboard.",
      items: [
        {
          term: "Active speech hours",
          description:
            "Minutes when RoxStreamAI generates and plays TTS. Silence and idle time do not count.",
        },
        {
          term: "Dono Engine",
          description:
            "Rules that map gifts to reactions: emotions, lines, actions, cooldowns, priorities.",
        },
        {
          term: "Stream Scripts",
          description:
            "Prebuilt scenarios like intros, loops, mini-games, and battle mode flows.",
        },
        {
          term: "Knowledge Pack",
          description:
            "Custom facts and lore that make the persona consistent and on-brand.",
        },
        {
          term: "Watermark",
          description:
            "A visual brand mark that can be disabled on Pro and Studio plans.",
        },
        {
          term: "Multi-account queue",
          description:
            "Scheduling rotation across multiple TikTok accounts for 24/7 streaming.",
        },
      ],
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title:
      "Pick a plan, scale characters, scenes, and Dono Engine limits when you're ready.",
    subtitle:
      "Plans are built around characters, scenes, and Dono Engine limits. AI speech usage stays predictable with Active Speech tracking.",
    comparisonTitle: "Plan comparison",
    comparisonHeaders: ["Feature", "Trial", "Basic", "Pro", "Studio"],
    comparisonRows: [
      {
        label: "Active speech hours included",
        values: ["60 min", "Unlimited (BYOK)", "10 hours", "40 hours"],
      },
      { label: "Watermark", values: ["On", "On", "Toggle", "Toggle"] },
      { label: "Accounts", values: ["1", "1", "Up to 5", "Up to 20"] },
      { label: "Dono rules", values: ["10", "20", "200", "1000"] },
      { label: "Scripts", values: ["2", "3", "Unlimited", "Unlimited + advanced"] },
      { label: "Knowledge items", values: ["-", "3", "20", "200"] },
      { label: "Logs retention", values: ["3 days", "7 days", "30 days", "90 days"] },
      { label: "Team seats", values: ["-", "-", "-", "5"] },
      { label: "Commercial license", values: ["-", "-", "-", "Yes"] },
      {
        label: "Unreal connector availability",
        values: ["-", "Pro+", "Pro+", "Pro+"],
      },
    ],
    extraCreditsTitle: "Extra Credits",
    extraCreditsSubtitle: "Buy more active speech hours when you hit the limit.",
    extraCredits: [
      { label: "+10 hours", price: "€25" },
      { label: "+50 hours", price: "€99" },
      { label: "+200 hours", price: "€299" },
    ],
    addonTitle: "Unreal Connector Pack",
    addonBadge: "Add-on",
    addonDescription:
      "Unreal Live connector, lip-sync triggers, sample UE scenes, and action mapping for Dono Engine.",
    addonPrices: [
      { label: "Monthly", price: "€49 / month" },
      { label: "Lifetime", price: "€299" },
    ],
    addonCta: "Manage add-ons",
    faqEyebrow: "FAQ",
    faqTitle: "Need quick answers?",
    faqSubtitle: "Plan questions, simplified.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Blog",
    subtitle:
      "Updates, guides, and behind-the-scenes for avatar streams and interactive triggers.",
    backToBlog: "Back to blog",
  },
  team: {
    eyebrow: "Team",
    title: "Team",
    subtitle: "Meet the people behind RoxStreamAI.",
    members: [
      {
        name: "Founder",
        role: "Product and Engineering",
        focus: "Owns product direction, integrations, and reliability.",
      },
      {
        name: "3D and Unreal Pipeline",
        role: "Realtime avatar workflows",
        focus: "Export, retargeting, and Live Link pipelines.",
      },
      {
        name: "Community and Growth",
        role: "Creator feedback loop",
        focus: "Content, onboarding, and iteration loops.",
      },
    ],
    values: {
      eyebrow: "Values",
      title: "How we work",
      subtitle: "The principles that shape every product decision.",
      items: [
        {
          title: "Creator-first",
          description: "Remove friction from character and scene pipelines.",
        },
        {
          title: "Operational clarity",
          description: "Predictable limits for interactive streams.",
        },
        {
          title: "Safety by default",
          description: "Guardrails for live triggers and chat.",
        },
      ],
    },
    cta: {
      title: "Want to collaborate?",
      subtitle: "Partnerships, integrations, or early access requests - let’s talk.",
      primary: "Contact us",
      secondary: "Read updates",
    },
  },
  download: {
    eyebrow: "Desktop App",
    title: "Desktop App",
    subtitle:
      "The Desktop App connects RoxStreamAI to Unreal and provides local diagnostics. Sign in with the same account as the web dashboard.",
    latestLabel: "Latest",
    noReleases:
      "No releases yet. Ask an admin to add the first Windows/macOS build in the admin panel.",
    openAdmin: "Open admin releases",
    releaseHistory: "Release history",
    download: "Download",
  },
  planCards: [
    {
      id: "trial",
      name: "Trial",
      price: "€0",
      description: "Preview",
      badge: "Preview",
      includedHours: "60 minutes active speech",
      cta: "Start Trial",
      features: [
        "TikTok: 1 account",
        "Dono rules: up to 10",
        "Scripts: 2 base presets",
        "Watermark always on",
        "Logs: 3 days",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "€19 / month",
      description: "BYOK",
      badge: "BYOK",
      includedHours: "Unlimited (BYOK)",
      cta: "Choose Basic",
      features: [
        "TikTok: 1 account",
        "Dono rules: up to 20",
        "Scripts: up to 3",
        "Watermark always on",
        "Knowledge pack: 3 items",
        "Logs: 7 days",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€59 / month",
      description: "Best value",
      badge: "Best value",
      includedHours: "10 hours / month",
      cta: "Choose Pro",
      features: [
        "Credits + BYOK",
        "TikTok: up to 5 accounts",
        "Dono rules: up to 200",
        "Scripts: unlimited",
        "Watermark toggle",
        "Auto language",
        "Knowledge pack: 20 items",
        "Logs: 30 days",
        "Export/Import",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "€199 / month",
      description: "For teams",
      badge: "For teams",
      includedHours: "40 hours / month",
      cta: "Contact / Choose Studio",
      features: [
        "Credits + BYOK",
        "Accounts: up to 20",
        "Team seats: 5",
        "Commercial license",
        "Dono rules: up to 1000",
        "Advanced scripts",
        "Watermark toggle",
        "Knowledge pack: 200 items",
        "Logs: 90 days",
        "Priority support",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need the Desktop App?",
      a: "Yes for Unreal connection, export, and local diagnostics. The dashboard works in the browser.",
    },
    {
      q: "What is Active Speech?",
      a: "It is the time your AI actually speaks on stream. It is the main driver of voice and model cost.",
    },
    {
      q: "Can I use my own API keys?",
      a: "Yes. BYOK is supported for compatible providers.",
    },
    {
      q: "Is there a trial?",
      a: "Yes. The Starter plan includes a 7-day trial.",
    },
  ],
  blogPosts: [
    {
      slug: "how-active-speech-impacts-cost",
      title: "How Active Speech impacts cost",
      summary:
        "Active Speech is the time your AI actually speaks. Here is how it affects spend and how to control it.",
      date: "2026-01-31",
      category: "Guides",
      readingTime: "5 min",
      content: [
        "Active Speech is the time your AI actually talks on stream. Silence and idle time do not count.",
        "Voice and model providers charge by usage. If your AI talks more often, cost goes up.",
        "In RoxStreamAI you set an Active Speech target and limits. The dashboard converts it into estimated monthly hours before you go live.",
        "To reduce cost, lower the talk ratio, shorten long monologues, and move some segments to non-speaking interactions.",
        "BYOK keeps provider billing under your direct control. RoxStreamAI still tracks hours so you can stay within your plan limits.",
      ],
    },
    {
      slug: "connect-ai-avatar-to-unreal",
      title: "How to connect an AI avatar to Unreal",
      summary:
        "A practical overview of the Desktop App workflow for Unreal connection, export, and Live Link checks.",
      date: "2026-01-31",
      category: "Unreal workflows",
      readingTime: "6 min",
      content: [
        "Install the Desktop App and sign in with the same account you use in the web dashboard.",
        "Create or pick a character in the dashboard, then open the Unreal Connector section in Desktop Mode.",
        "Export the character configuration and import it into your Unreal project.",
        "Use the Desktop App diagnostics to verify audio devices, tokens, and connector status before going live.",
        "If you use Live Link Face or other trackers, validate the pipeline end-to-end while the stream is offline.",
      ],
    },
    {
      slug: "byok-vs-built-in-providers",
      title: "BYOK vs built-in providers",
      summary:
        "When to use built-in providers for simplicity and when BYOK gives maximum control.",
      date: "2026-01-31",
      category: "Provider benchmarks",
      readingTime: "6 min",
      content: [
        "Built-in providers are the fastest way to start. RoxStreamAI covers provider costs up to your plan quota.",
        "BYOK means you connect your own provider keys. You pay the provider directly and RoxStreamAI tracks hours and limits.",
        "Use built-in providers when you want speed and fewer moving parts. Use BYOK when you want full control over vendor choice, pricing, and performance.",
        "You can mix approaches: start with built-in providers, then switch to BYOK when you have stable settings.",
      ],
    },
  ],
};

const ru: MarketingContent = {
  ...en,
  about: {
    eyebrow: "За кулисами RoxStreamAI",
    title: "О нас",
    subtitle: "Что мы строим и почему.",
    missionTitle: "Миссия",
    missionBody:
      "Помогать создателям запускать качественные аватар стримы с меньшим тех оверхедом и меньшим выгоранием. RoxStreamAI делает персонажей, сцены и триггеры повторяемыми и добавляет AI хостинг, когда он нужен.",
    beliefTitle: "Что это",
    beliefBody:
      "Это веб панель и десктопное приложение компаньон. Панель управляет персонажами, сценами, триггерами, провайдерами и использованием. Десктопное приложение подключается к Unreal, запускает диагностику и включает процесс работы аватара в реальном времени.",
    roxyTitle: "Что значит RoxStreamAI",
    roxyBody:
      "RoxStreamAI расшифровывается как Roxy AI Streamer. Рокси — наш первый персонаж, который привёл к появлению RoxStreamAI. Она стала началом нашей долгой истории.",
  },

  contact: {
    eyebrow: "Контакты",
    title: "Спланируем ваш следующий live‑формат",
    subtitle:
      "Расскажите, что вы строите - персонажи, сцены Unreal, интерактивные dono форматы или AI co-hosting.",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Рабочий email",
    message: "Что вы хотите автоматизировать в RoxStreamAI?",
    sendRequest: "Отправить запрос",
    directLines: "Прямые контакты",
    responseTime: "Отвечаем в течение 1 рабочего дня.",
  },
  terms: {
    title: "Условия",
    intro:
      "Эти условия регулируют использование RoxStreamAI, включая сайт, десктоп‑приложение и сервисы. Создавая аккаунт, вы соглашаетесь с условиями.",
    sections: [
      {
        title: "Аккаунты",
        body: "Вы отвечаете за безопасность учетных данных и все действия в аккаунте.",
      },
      {
        title: "Использование",
        body: "Вы обязуетесь использовать RoxStreamAI в рамках правил платформ и законодательства. Запрещены злоупотребления, харассмент и незаконные действия.",
      },
      {
        title: "Провайдеры и BYOK",
        body: "При встроенных провайдерах RoxStreamAI может передавать запросы третьим сторонам. При BYOK вы отвечаете за ключи и биллинг у провайдера.",
      },
      {
        title: "Контент",
        body: "Вы сохраняете права на контент. Мы используем его только для предоставления и улучшения сервиса.",
      },
      {
        title: "Биллинг",
        body: "Платные планы продлеваются автоматически. Возможны доплаты за дополнительные кредиты или аддоны.",
      },
      {
        title: "Доступность",
        body: "Мы стремимся к высокой доступности, но не гарантируем бесперебойную работу. Возможны обслуживание и сбои.",
      },
      {
        title: "Прекращение",
        body: "Мы можем ограничить доступ при нарушениях. Отменить подписку можно в кабинете.",
      },
    ],
  },
  privacy: {
    title: "Конфиденциальность",
    intro:
      "RoxStreamAI собирает только данные, необходимые для автоматизации стриминга, аналитики и управления аккаунтом. Мы не продаем персональные данные.",
    sections: [
      {
        title: "Какие данные собираем",
        body: "Данные аккаунта, метрики использования и настройки персонажей, сценариев и интеграций.",
      },
      {
        title: "Как используем",
        body: "Для аутентификации, запуска сессий, поддержки и повышения надежности и безопасности.",
      },
      {
        title: "Безопасность",
        body: "Мы применяем контроль доступа и редактирование секретов для защиты.",
      },
      {
        title: "Срок хранения",
        body: "Зависит от тарифа и управляется в кабинете или через поддержку.",
      },
      {
        title: "Ваш контроль",
        body: "Вы можете экспортировать или удалить данные. Напишите нам для удаления аккаунта.",
      },
    ],
  },
  useCases: {
    eyebrow: "Кейсы",
    title: "Реальные результаты для live‑форматов",
    subtitle:
      "Реальные форматы, под которые создан RoxStreamAI - персонажи, сцены и интерактивные триггеры. AI хостинг опционален.",
    items: [
      {
        id: "creators",
        title: "Создатели",
        description:
          "Увеличьте часы эфира без выгорания. RoxStreamAI ведет приветствия, реакции на подарки и сценарные паузы, сохраняя единый голос и стиль бренда.",
        highlights: [
          "24/7 темп с безопасными паузами",
          "Мгновенные on‑brand реакции на подарки",
          "Клиповый контент через сценарные блоки",
        ],
      },
      {
        id: "faceless",
        title: "Faceless‑стриминг",
        description:
          "Запускайте каналы с персонажем без камеры. Создавайте лор, держите вовлеченность и оставайтесь полностью вне кадра, пока AI ведет чат и подарки.",
        highlights: ["Персона + пакеты знаний", "Контроль голоса", "Модерация"],
      },
      {
        id: "agencies",
        title: "Агентства",
        description:
          "Управляйте множеством аккаунтов и языков из единой панели. Координируйте регионы, аналитику и бренд‑безопасность в одном месте.",
        highlights: ["Планировщик аккаунтов", "Командный доступ", "Централизованная аналитика"],
      },
      {
        id: "unreal-avatar",
        title: "Стримы с аватаром Unreal",
        description:
          "Используйте десктоп‑приложение, чтобы подключить Unreal и стримить персонажа в реальном времени.",
        highlights: ["Workflow десктоп‑приложения", "Подключение Unreal", "Аватар в реальном времени"],
      },
      {
        id: "team-workflows",
        title: "Командные процессы",
        description:
          "Управляйте персонажами, расходом и доступом в команде. Админ‑инструменты защищают ключи и биллинг.",
        highlights: ["Админ‑инструменты", "Управление ключами", "Видимость аудита"],
      },
    ],
    outcomes: {
      eyebrow: "Результаты",
      title: "Что получают команды",
      subtitle: "Короткие циклы, четкие метрики и контроль бренда.",
      items: [
        {
          title: "Выше удержание",
          description:
            "Сценарии и триггеры подарков повышают вовлеченность на длинных эфирах.",
        },
        {
          title: "Ниже операционные затраты",
          description:
            "Меньше ручной модерации и on‑camera времени при высокой ежедневной активности.",
        },
        {
          title: "Быстрее эксперименты",
          description:
            "Тестируйте хуки и форматы через сценарии и A/B‑модели.",
        },
      ],
    },
    cta: {
      title: "Готовы описать ваш кейс?",
      subtitle: "Расскажите, что хотите автоматизировать, и мы предложим план.",
      primary: "Связаться",
      secondary: "Смотреть тарифы",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Документация",
      title: "Быстрый старт",
      subtitle: "Все, что нужно для запуска первой AI‑сессии.",
      steps: [
        {
          id: "connect",
          title: "Подключение",
          description: "Подключите TikTok Live, выберите регион и язык по умолчанию для персонажа.",
        },
        {
          id: "customize",
          title: "Настройка",
          description: "Создайте персону, добавьте пакеты знаний, выберите голос и правила безопасности.",
        },
        {
          id: "set-limits",
          title: "Задайте лимиты AI‑речи (опционально)",
          description: "Держите расход предсказуемым, когда AI co‑host активен.",
        },
        {
          id: "connect-unreal",
          title: "Подключите Unreal через десктоп‑приложение",
          description: "Используйте десктоп‑приложение для Unreal‑подключения, экспорта и локальной диагностики.",
        },
        {
          id: "go-live",
          title: "Выход в эфир",
          description: "Включите движок Dono + скрипты стрима и протестируйте сессию перед 24/7.",
        },
      ],
    },
    product: {
      eyebrow: "Продукт",
      title: "Документация по функциям",
      subtitle: "Подробности по ключевым системам RoxStreamAI.",
      items: [
        { id: "dono-engine", title: "Движок Dono", description: "Свяжите подарки с действиями, эмоциями и репликами через приоритеты, cooldown и safety‑fallback." },
        { id: "stream-scripts", title: "Скрипты стрима", description: "Планируйте интро, циклы, мини‑игры и battle‑режим через таймеры." },
        { id: "scheduler", title: "Планировщик аккаунтов", description: "Ротируйте аккаунты и регионы для 24/7‑покрытия с безопасным темпом." },
        { id: "safety", title: "Safety Guard", description: "Фильтры, запрещенные темы, лимиты скорости и фразы аварийной остановки." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Подключайте реакции к аватар‑сцене через event‑hooks и lip‑sync." },
        { id: "diagnostics", title: "Диагностика", description: "Индикаторы статуса для backend, audio, токенов и коннекторов." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Обзор справочника",
      subtitle: "Структурированные эндпоинты для интеграций и аналитики.",
      sections: [
        { title: "Аутентификация", description: "Используйте ключи проекта из кабинета. Запросы авторизуются через bearer‑token.", items: ["POST /auth/token — обмен API‑ключа на session token", "POST /auth/refresh — обновление session token"] },
        { title: "Персонажи", description: "Создавайте, обновляйте и версионируйте профили персонажей для live‑сессий.", items: ["GET /characters — список персонажей", "POST /characters — создать персонажа", "PATCH /characters/{id} — обновить персону"] },
        { title: "Сессии", description: "Запускайте или останавливайте сессии, проверяйте метрики и получайте транскрипты.", items: ["POST /sessions/start — старт сессии", "POST /sessions/stop — стоп сессии", "GET /sessions/{id} — детали сессии"] },
        { title: "События", description: "Подписка на реакции подарков, сценарные события и сигналы модерации.", items: ["GET /events/stream — server‑sent events", "POST /webhooks — регистрация webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Глоссарий",
      title: "Ключевые термины",
      subtitle: "Короткие определения, используемые в кабинете.",
      items: [
        { term: "Активные часы речи", description: "Минуты, когда RoxStreamAI генерирует и воспроизводит TTS. Паузы не учитываются." },
        { term: "Движок Dono", description: "Правила, которые связывают подарки с эмоциями, репликами, действиями, cooldown и приоритетами." },
        { term: "Скрипты стрима", description: "Сценарии интро, циклов, мини‑игр и battle‑режима." },
        { term: "Пакет знаний", description: "Кастомные факты, удерживающие персону согласованной и в рамках бренда." },
        { term: "Watermark", description: "Визуальная метка бренда, отключаемая на Pro и Studio." },
        { term: "Очередь аккаунтов", description: "Плановая ротация нескольких TikTok‑аккаунтов для 24/7‑стриминга." },
      ],
    },
  },
  pricing: {
    eyebrow: "Тарифы",
    title:
      "Выберите план и масштабируйте персонажей, сцены и лимиты движка Dono, когда будете готовы.",
    subtitle:
      "Планы строятся вокруг персонажей, сцен и лимитов движка Dono. Использование AI речи остается предсказуемым благодаря Active Speech.",
    comparisonTitle: "Сравнение тарифов",
    comparisonHeaders: ["Функция", "Тест", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Включенные активные часы речи", values: ["60 мин", "Безлимит (BYOK)", "10 часов", "40 часов"] },
      { label: "Водяной знак", values: ["Вкл", "Вкл", "Переключаемый", "Переключаемый"] },
      { label: "Аккаунты", values: ["1", "1", "До 5", "До 20"] },
      { label: "Dono‑правила", values: ["10", "20", "200", "1000"] },
      { label: "Сценарии", values: ["2", "3", "Безлимит", "Безлимит + расширенные"] },
      { label: "Knowledge‑элементы", values: ["-", "3", "20", "200"] },
      { label: "Хранение логов", values: ["3 дня", "7 дней", "30 дней", "90 дней"] },
      { label: "Командные места", values: ["-", "-", "-", "5"] },
      { label: "Коммерческая лицензия", values: ["-", "-", "-", "Да"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Доп. кредиты",
    extraCreditsSubtitle: "Покупайте дополнительные активные часы при достижении лимита.",
    extraCredits: [
      { label: "+10 часов", price: "€25" },
      { label: "+50 часов", price: "€99" },
      { label: "+200 часов", price: "€299" },
    ],
    addonTitle: "Пакет Unreal Connector",
    addonBadge: "Аддон",
    addonDescription: "Unreal Live connector, lip‑sync триггеры, примерные UE‑сцены и маппинг действий движка Dono.",
    addonPrices: [
      { label: "Ежемесячно", price: "€49 / месяц" },
      { label: "Навсегда", price: "€299" },
    ],
    addonCta: "Управлять аддонами",
    faqEyebrow: "FAQ",
    faqTitle: "Нужны ответы?",
    faqSubtitle: "Коротко о тарифах.",
  },
  blog: {
    eyebrow: "Блог",
    title: "Обновления, кейсы и анонсы",
    subtitle:
      "Обновления, гайды и закулисье аватар стримов и интерактивных триггеров.",
    backToBlog: "Назад в блог",
  },
  team: {
    eyebrow: "Команда",
    title: "Люди, которые строят RoxStreamAI",
    subtitle: "Знакомьтесь с командой RoxStreamAI.",
    members: [
      { name: "Lia Chen", role: "Продукт и рост", focus: "Инструменты для создателей, онбординг и стратегия цен." },
      { name: "Maks Orlov", role: "Лид инженерии", focus: "Realtime‑системы, stream‑scripts и надежность платформы." },
      { name: "Sofia Kim", role: "Лид дизайна", focus: "Бренд‑система, UI‑киты и новые потоки кабинета." },
    ],
    values: {
      eyebrow: "Ценности",
      title: "Как мы работаем",
      subtitle: "Принципы, по которым строим продукт.",
      items: [
        { title: "Creator-first", description: "Убираем трение в пайплайнах персонажей и сцен." },
        { title: "Операционная ясность", description: "Предсказуемые лимиты для интерактивных стримов." },
        { title: "Безопасность по умолчанию", description: "Защитные правила для live триггеров и чата." },
      ],
    },
    cta: {
      title: "Хотите сотрудничать?",
      subtitle: "Партнерства, интеграции или ранний доступ — напишите нам.",
      primary: "Связаться",
      secondary: "Читать обновления",
    },
  },
  download: {
    eyebrow: "Загрузки",
    title: "Скачайте последнюю версию",
    subtitle: "Выберите платформу. Релизы управляются админами.",
    latestLabel: "Последняя",
    noReleases: "Релизов пока нет. Попросите админа добавить первую Windows/macOS сборку.",
    openAdmin: "Открыть релизы",
    releaseHistory: "История релизов",
    download: "Скачать",
  },
  planCards: [
    {
      id: "trial",
      name: "Тест",
      price: "€0",
      description: "Превью",
      badge: "Превью",
      includedHours: "60 минут активной речи",
      cta: "Начать тест",
      features: [
        "TikTok: 1 аккаунт",
        "Dono‑правила: до 10",
        "Сценарии: 2 базовых пресета",
        "Водяной знак всегда включен",
        "Логи: 3 дня",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "€19 / месяц",
      description: "BYOK",
      badge: "BYOK",
      includedHours: "Безлимит (BYOK)",
      cta: "Выбрать",
      features: [
        "TikTok: 1 аккаунт",
        "Dono‑правила: до 20",
        "Сценарии: 3 пресета",
        "Knowledge‑элементы: 3",
        "Логи: 7 дней",
        "Водяной знак всегда включен",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€99 / месяц",
      description: "Лучший выбор",
      badge: "Популярно",
      includedHours: "10 часов активной речи",
      cta: "Выбрать",
      features: [
        "Кредиты + BYOK",
        "Аккаунты: до 5",
        "Dono‑правила: 200",
        "Сценарии: безлимит",
        "Knowledge‑элементы: 20",
        "Водяной знак: переключаемый",
        "Логи: 30 дней",
        "Экспорт/Импорт",
        "Unreal поддержка",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "€299 / месяц",
      description: "Для команд",
      badge: "Studio",
      includedHours: "40 часов активной речи",
      cta: "Выбрать",
      features: [
        "Аккаунты: до 20",
        "Dono‑правила: 1000",
        "Сценарии: безлимит + расширенные",
        "Knowledge‑элементы: 200",
        "Водяной знак: переключаемый",
        "Логи: 90 дней",
        "Командные места: 5",
        "Коммерческая лицензия",
        "Приоритетная поддержка",
        "Unreal поддержка",
      ],
    },
  ],
  faqs: [
    { q: "Нужен API‑ключ?", a: "Basic использует BYOK. Pro/Studio включают кредиты." },
    { q: "Что такое активные часы речи?", a: "Считается только время, когда RoxStreamAI говорит." },
    { q: "Можно отключить водяной знак?", a: "В Basic/Тесте — нет. В Pro/Studio — да." },
    { q: "Доход гарантирован?", a: "Нет, зависит от контента и аудитории." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Кейсы брендов с AI‑персонажами",
      summary: "Кампании 24/7 и интерактивные AI‑персонажи для брендов.",
      date: "2026-01-12",
      category: "Кейсы",
      readingTime: "6 мин",
      content: [
        "AI‑стримеры позволяют запускать live‑форматы без человека‑хоста.",
        "Начните с главного персонажа и добавьте пакеты знаний, чтобы держать ответы в рамках бренда.",
        "Планировщик мульти‑аккаунтов держит региональные каналы активными 24/7, а модерация и аналитика централизованы.",
        "Начните с hero‑персонажа и свяжите Dono‑правила с кампаниями.",
        "Агентства используют планировщик мульти‑аккаунтов для регионального 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Представляем RoxStreamAI",
      summary: "Быстрый путь от персоны к live‑сессии — для создателей, faceless‑каналов и команд.",
      date: "2026-01-08",
      category: "Продукт",
      readingTime: "5 мин",
      content: [
        "RoxStreamAI запускает AI‑стримеров за минуты: подключите аккаунт, настройте персону и выходите в эфир с готовыми сценариями и реакциями.",
        "Платформа для длинных сессий: безопасный темп, встроенная модерация и планировщик, который держит каналы активными без ручного переключения.",
        "Пользователи Pro получают кредиты и готовые процессы. BYOK позволяет подключать собственные модели и голоса.",
        "Настройте лимиты Active Speech, чтобы расходы были предсказуемыми.",
        "Экспорт и диагностика в десктоп‑приложении ускоряют запуск.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Стек автоматизации для 24/7 live",
      summary: "Сценарии, модерация и реакционные циклы для высокого вовлечения.",
      date: "2025-12-20",
      category: "Гайды",
      readingTime: "7 мин",
      content: [
        "Надежный 24/7‑формат строится на трех слоях: сценарная структура, реактивные моменты и контроль безопасности.",
        "Далее свяжите донаты с реакциями через приоритеты и cooldowns — это создает всплески новизны без перегруза.",
        "И наконец, настройте защитные правила и ручное вмешательство: персонаж остается стабильным даже при высокой нагрузке чата.",
        "Скрипты и приоритеты держат темп без перегрузки чата.",
      ],
    },
  ],
};

const uk: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Про нас",
    title: "RoxStreamAI створено для завжди‑онлайн творців",
    subtitle:
      "Ми будуємо автоматизацію стримінгу, що відчувається преміально, безпечно й керовано.",
    missionTitle: "Наша місія",
    missionBody:
      "Дати авторам polished AI‑ко‑хоста, який веде шоу, реагує на подарунки та утримує увагу в різних часових поясах.",
    beliefTitle: "У що ми віримо",
    beliefBody:
      "Людська креативність — головна. RoxStreamAI бере на себе рутину, розклад і реакційні цикли, щоб ви фокусувалися на стратегії контенту.",
    roxyTitle: "Що означає RoxStreamAI",
    roxyBody:
      "RoxStreamAI означає Roxy AI Streamer. Роксі — наш перший персонаж, який призвів до появи RoxStreamAI. Вона стала початком нашої довгої історії.",
  },
  contact: {
    eyebrow: "Контакти",
    title: "Сплануємо ваш наступний live‑формат",
    subtitle: "Розкажіть про цілі стримінгу — ми підготуємо план запуску.",
    firstName: "Імʼя",
    lastName: "Прізвище",
    email: "Робочий email",
    message: "Що ви хочете автоматизувати в RoxStreamAI?",
    sendRequest: "Надіслати запит",
    directLines: "Прямі контакти",
    responseTime: "Відповідаємо протягом 1 робочого дня.",
  },
  terms: {
    title: "Умови",
    intro:
      "Ці умови регулюють використання RoxStreamAI, включно із сайтом, десктоп‑додатком та сервісами. Створюючи акаунт, ви погоджуєтесь з умовами.",
    sections: [
      { title: "Акаунти", body: "Ви відповідаєте за безпеку облікових даних і всі дії в акаунті." },
      { title: "Використання", body: "Ви зобовʼязуєтесь використовувати RoxStreamAI відповідно до правил платформ і законодавства. Зловживання та незаконна діяльність заборонені." },
      { title: "Провайдери та BYOK", body: "За вбудованих провайдерів RoxStreamAI може передавати запити третім сторонам. За BYOK ви відповідаєте за ключі та білінг у провайдера." },
      { title: "Білінг", body: "Платні плани продовжуються автоматично. Можливі доплати за кредити або аддони." },
      { title: "Контент", body: "Ви зберігаєте права на контент. Ми обробляємо його лише для надання та покращення сервісу." },
      { title: "Доступність", body: "Ми прагнемо високої доступності, але не гарантуємо безперервну роботу. Можливі техобслуговування та збої." },
      { title: "Припинення", body: "Ми можемо обмежити доступ при порушеннях. Скасувати підписку можна в кабінеті." },
    ],
  },
  privacy: {
    title: "Конфіденційність",
    intro:
      "RoxStreamAI збирає лише дані, потрібні для автоматизації стримінгу, аналітики та керування акаунтом. Ми не продаємо персональні дані.",
    sections: [
      { title: "Які дані збираємо", body: "Дані акаунта, метрики використання та налаштування персонажів, сценаріїв і інтеграцій." },
      { title: "Як використовуємо", body: "Для аутентифікації, запуску сесій, підтримки та покращення надійності й безпеки." },
      { title: "Термін зберігання", body: "Залежить від тарифу та керується в кабінеті або через підтримку." },
      { title: "Ваш контроль", body: "Ви можете експортувати або видалити дані. Напишіть нам для видалення акаунта." },
      { title: "Безпека", body: "Ми застосовуємо контроль доступу та редагування секретів для захисту." },
    ],
  },
  useCases: {
    eyebrow: "Кейси",
    title: "Реальні результати для live‑форматів",
    subtitle:
      "Дивіться, як творці, faceless‑канали та агентства використовують RoxStreamAI для довших і безпечніших стримів.",
    items: [
      {
        id: "creators",
        title: "Творці",
        description:
          "Збільшіть години ефіру без вигорання. Автоматизуйте привітання, реакції на подарунки та паузи зі стабільним голосом.",
        highlights: [
          "24/7 темп із безпечними паузами",
          "Миттєві правила реакцій на подарунки",
          "Кліпові моменти через сценарії",
        ],
      },
      {
        id: "faceless",
        title: "Faceless‑стримінг",
        description:
          "Запускайте канали з персонажем без камери. Будуйте лор і утримуйте увагу.",
        highlights: ["Персона + пакети знань", "Контроль голосу", "Модерація"],
      },
      {
        id: "agencies",
        title: "Агентства",
        description:
          "Керуйте кількома акаунтами та мовами з одного кабінету. Ідеально для студій та операторів.",
        highlights: ["Планувальник акаунтів", "Командний доступ", "Централізована аналітика"],
      },
      {
        id: "unreal-avatar",
        title: "Стріми з аватаром Unreal",
        description:
          "Використовуйте десктоп‑додаток, щоб підключити Unreal та стрімити персонажа в реальному часі.",
        highlights: ["Workflow десктоп‑додатка", "Підключення Unreal", "Аватар у реальному часі"],
      },
      {
        id: "team-workflows",
        title: "Командні процеси",
        description:
          "Керуйте персонажами, споживанням і доступом у команді. Адмін‑інструменти захищають ключі та білінг.",
        highlights: ["Адмін‑інструменти", "Керування ключами", "Видимість аудиту"],
      },
    ],
    outcomes: {
      eyebrow: "Результати",
      title: "Що отримують команди",
      subtitle: "Короткі цикли, чіткі метрики та контроль бренду.",
      items: [
        { title: "Вища утриманість", description: "Сценарії та тригери подарунків підвищують залученість на довгих ефірах." },
        { title: "Нижчі витрати", description: "Менше ручної модерації та on‑camera часу при високій щоденній активності." },
        { title: "Швидші експерименти", description: "Тестуйте формати через сценарії та A/B‑моделі." },
      ],
    },
    cta: {
      title: "Готові описати ваш кейс?",
      subtitle: "Розкажіть, що хочете автоматизувати, і ми запропонуємо план.",
      primary: "Звʼязатися",
      secondary: "Переглянути тарифи",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Документація",
      title: "Швидкий старт",
      subtitle: "Усе, що потрібно для запуску першої AI‑сесії.",
      steps: [
        { id: "connect", title: "Підключення", description: "Підключіть TikTok Live, оберіть регіон і мову за замовчуванням для персонажа." },
        { id: "customize", title: "Налаштування", description: "Створіть персону, додайте пакети знань, оберіть голос і правила безпеки." },
        { id: "set-limits", title: "Встановіть ліміти AI‑мовлення (опційно)", description: "Тримайте використання передбачуваним, коли AI co‑host активний." },
        { id: "connect-unreal", title: "Підключіть Unreal через десктоп‑додаток", description: "Використовуйте десктоп‑додаток для підключення Unreal, експорту та локальної діагностики." },
        { id: "go-live", title: "Вихід в ефір", description: "Увімкніть рушій Dono + скрипти стріму і протестуйте сесію перед 24/7." },
      ],
    },
    product: {
      eyebrow: "Продукт",
      title: "Документація функцій",
      subtitle: "Докладніше про ключові системи RoxStreamAI.",
      items: [
        { id: "dono-engine", title: "Рушій Dono", description: "Звʼяжіть подарунки з діями, емоціями та репліками через пріоритети, cooldown і safety‑fallback." },
        { id: "stream-scripts", title: "Скрипти стріму", description: "Плануйте інтро, цикли, міні‑ігри та battle‑режим за таймерами." },
        { id: "scheduler", title: "Планувальник акаунтів", description: "Ротуйте акаунти й регіони для 24/7‑покриття з безпечним темпом." },
        { id: "safety", title: "Safety Guard", description: "Фільтри, заблоковані теми, ліміти швидкості та фрази аварійної зупинки." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Підключайте реакції до сцени аватара через event‑hooks і lip‑sync." },
        { id: "diagnostics", title: "Діагностика", description: "Індикатори стану для backend, audio, токенів і конекторів." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Огляд довідника",
      subtitle: "Структуровані ендпоінти для інтеграцій і аналітики.",
      sections: [
        { title: "Автентифікація", description: "Використовуйте ключі проєкту з кабінету. Запити авторизуються через bearer‑token.", items: ["POST /auth/token — обмін API‑ключа на session token", "POST /auth/refresh — оновлення session token"] },
        { title: "Персонажі", description: "Створюйте, оновлюйте та версіонуйте профілі персонажів для live‑сесій.", items: ["GET /characters — список персонажів", "POST /characters — створити персонажа", "PATCH /characters/{id} — оновити персону"] },
        { title: "Сесії", description: "Запускайте або зупиняйте сесії, переглядайте метрики та отримуйте транскрипти.", items: ["POST /sessions/start — старт сесії", "POST /sessions/stop — стоп сесії", "GET /sessions/{id} — деталі сесії"] },
        { title: "Події", description: "Підписка на реакції подарунків, сценарні події та сигнали модерації.", items: ["GET /events/stream — server‑sent events", "POST /webhooks — реєстрація webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Глосарій",
      title: "Ключові терміни",
      subtitle: "Короткі визначення, які використовуються в кабінеті.",
      items: [
        { term: "Активні години мовлення", description: "Хвилини, коли RoxStreamAI генерує та відтворює TTS. Пауза не рахується." },
        { term: "Рушій Dono", description: "Правила, що повʼязують подарунки з емоціями, репліками, діями, cooldown і пріоритетами." },
        { term: "Скрипти стріму", description: "Сценарії інтро, циклів, міні‑ігор та battle‑режиму." },
        { term: "Пакет знань", description: "Кастомні факти, що тримають персону узгодженою та в межах бренду." },
        { term: "Watermark", description: "Візуальна мітка бренду, яку можна вимкнути на Pro і Studio." },
        { term: "Черга акаунтів", description: "Планова ротація кількох TikTok‑акаунтів для 24/7‑стримінгу." },
      ],
    },
  },
  pricing: {
    eyebrow: "Тарифи",
    title: "Тарифи, які масштабуються",
    subtitle: "Оберіть BYOK для максимального контролю або Pro‑кредити для запуску в один клік.",
    comparisonTitle: "Порівняння тарифів",
    comparisonHeaders: ["Функція", "Тест", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Включені активні години мовлення", values: ["60 хв", "Безліміт (BYOK)", "10 год", "40 год"] },
      { label: "Watermark", values: ["Увімкнено", "Увімкнено", "Перемикається", "Перемикається"] },
      { label: "Акаунти", values: ["1", "1", "До 5", "До 20"] },
      { label: "Dono‑правила", values: ["10", "20", "200", "1000"] },
      { label: "Скрипти", values: ["2", "3", "Безліміт", "Безліміт + розширені"] },
      { label: "Knowledge‑елементи", values: ["-", "3", "20", "200"] },
      { label: "Зберігання логів", values: ["3 дні", "7 днів", "30 днів", "90 днів"] },
      { label: "Командні місця", values: ["-", "-", "-", "5"] },
      { label: "Комерційна ліцензія", values: ["-", "-", "-", "Так"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Додаткові кредити",
    extraCreditsSubtitle: "Купуйте більше активних годин, коли досягаєте ліміту.",
    extraCredits: [
      { label: "+10 год", price: "€25" },
      { label: "+50 год", price: "€99" },
      { label: "+200 год", price: "€299" },
    ],
    addonTitle: "Пакет Unreal Connector",
    addonBadge: "Аддон",
    addonDescription: "Unreal Live connector, lip‑sync тригери, приклади UE‑сцен та мапінг дій для рушія Dono.",
    addonPrices: [
      { label: "Щомісяця", price: "€49 / місяць" },
      { label: "Назавжди", price: "€299" },
    ],
    addonCta: "Керувати аддонами",
    faqEyebrow: "FAQ",
    faqTitle: "Потрібні відповіді?",
    faqSubtitle: "Коротко про тарифи.",
  },
  blog: {
    eyebrow: "Блог",
    title: "Оновлення, кейси та анонси",
    subtitle: "Новини продукту, зростання та реальні формати стримінгу.",
    backToBlog: "Назад до блогу",
  },
  team: {
    eyebrow: "Команда",
    title: "Люди, які будують RoxStreamAI",
    subtitle: "Невелика команда на стику стримінгу, AI та продукт‑дизайну.",
    members: [
      { name: "Lia Chen", role: "Продукт і зростання", focus: "Інструменти для творців, онбординг і цінова стратегія." },
      { name: "Maks Orlov", role: "Лід інженерії", focus: "Realtime‑системи, stream‑scripts і надійність платформи." },
      { name: "Sofia Kim", role: "Лід дизайну", focus: "Бренд‑система, UI‑кити та нові потоки кабінету." },
    ],
    values: {
      eyebrow: "Цінності",
      title: "Як ми працюємо",
      subtitle: "Принципи, за якими будуємо продукт.",
      items: [
        { title: "Creator‑first", description: "Ми прибираємо тертя, щоб творці зосереджувались на форматах і сторітелінгу." },
        { title: "Операційна ясність", description: "Аналітика, процеси й скрипти для швидких рішень і повторюваного зростання." },
        { title: "Безпека за замовчуванням", description: "Кожен потік містить правила модерації, ліміти й запобіжники перед масштабуванням." },
      ],
    },
    cta: {
      title: "Хочете співпрацювати?",
      subtitle: "Партнерства, інтеграції або ранній доступ — напишіть нам.",
      primary: "Звʼязатися",
      secondary: "Читати оновлення",
    },
  },
  download: {
    eyebrow: "Завантаження",
    title: "Завантажте останню версію",
    subtitle: "Оберіть платформу. Релізи керуються адмінами.",
    latestLabel: "Остання",
    noReleases: "Релізів ще немає. Попросіть адміна додати першу Windows/macOS збірку.",
    openAdmin: "Відкрити релізи",
    releaseHistory: "Історія релізів",
    download: "Завантажити",
  },
  planCards: [
    {
      id: "trial",
      name: "Тест",
      price: "€0",
      description: "Превʼю",
      badge: "Превʼю",
      includedHours: "60 хвилин активного мовлення",
      cta: "Почати тест",
      features: [
        "TikTok: 1 акаунт",
        "Dono‑правила: до 10",
        "Скрипти: 2 базові пресети",
        "Watermark завжди увімкнено",
        "Логи: 3 дні",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "€19 / місяць",
      description: "BYOK",
      badge: "BYOK",
      includedHours: "Безліміт (BYOK)",
      cta: "Обрати",
      features: [
        "TikTok: 1 акаунт",
        "Dono‑правила: до 20",
        "Скрипти: 3 пресети",
        "Knowledge‑елементи: 3",
        "Логи: 7 днів",
        "Watermark завжди увімкнено",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€99 / місяць",
      description: "Найкращий вибір",
      badge: "Популярно",
      includedHours: "10 годин активного мовлення",
      cta: "Обрати",
      features: [
        "Кредити + BYOK",
        "Акаунти: до 5",
        "Dono‑правила: 200",
        "Скрипти: безліміт",
        "Knowledge‑елементи: 20",
        "Watermark: перемикається",
        "Логи: 30 днів",
        "Експорт/Імпорт",
        "Підтримка Unreal",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "€299 / місяць",
      description: "Для команд",
      badge: "Studio",
      includedHours: "40 годин активного мовлення",
      cta: "Обрати",
      features: [
        "Акаунти: до 20",
        "Dono‑правила: 1000",
        "Скрипти: безліміт + розширені",
        "Knowledge‑елементи: 200",
        "Watermark: перемикається",
        "Логи: 90 днів",
        "Командні місця: 5",
        "Комерційна ліцензія",
        "Пріоритетна підтримка",
        "Підтримка Unreal",
      ],
    },
  ],
  faqs: [
    { q: "Потрібен API‑ключ?", a: "Basic використовує BYOK. Pro/Studio включають кредити." },
    { q: "Що таке активні години мовлення?", a: "Рахується лише час, коли RoxStreamAI говорить." },
    { q: "Чи можна вимкнути watermark?", a: "У Basic/Тесті — ні. У Pro/Studio — так." },
    { q: "Чи гарантується дохід?", a: "Ні, усе залежить від контенту та аудиторії." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Кейси брендів з AI‑персонажами",
      summary: "Постійні кампанії та інтерактивні AI‑персонажі для брендів.",
      date: "2026-01-12",
      category: "Кейси",
      readingTime: "6 хв",
      content: [
        "AI‑стримери дозволяють запускати live‑формати без людини‑хоста.",
        "Почніть із головного персонажа та додайте пакети знань, щоб відповіді були в межах бренду.",
        "Планувальник мульти‑акаунтів тримає регіональні канали активними 24/7, а модерація та аналітика централізовані.",
        "Почніть із hero‑персони та прив'яжіть Dono‑правила до кампаній.",
        "Агенції використовують мульти‑акаунт планувальник для регіонального 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Представляємо RoxStreamAI",
      summary: "Швидкий шлях від персони до live‑сесії — для творців, faceless‑каналів і команд.",
      date: "2026-01-08",
      category: "Продукт",
      readingTime: "5 хв",
      content: [
        "RoxStreamAI запускає AI‑стримерів за хвилини: підключіть акаунт, налаштуйте персону й виходьте в ефір із готовими сценаріями та реакціями.",
        "Платформа для довгих сесій: безпечний темп, вбудована модерація та планувальник без ручного перемикання.",
        "Користувачі Pro отримують кредити й готові процеси. BYOK дозволяє підключати власні моделі та голоси.",
        "Налаштуйте ліміти Active Speech, щоб витрати були передбачуваними.",
        "Експорт і діагностика у десктоп‑додатку пришвидшують запуск.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Стек автоматизації для 24/7 live",
      summary: "Скрипти, модерація та реакційні цикли для високого залучення.",
      date: "2025-12-20",
      category: "Гайди",
      readingTime: "7 хв",
      content: [
        "Надійний 24/7‑формат має три шари: сценарну структуру, реактивні моменти й контроль безпеки.",
        "Далі звʼяжіть донати з реакціями через пріоритети та cooldowns — це створює сплески новизни без перевантаження.",
        "Насамкінець налаштуйте запобіжники й ручне перевизначення, щоб персонаж залишався стабільним навіть за великого чату.",
        "Скрипти й пріоритети тримають темп без перевантаження чату.",
      ],
    },
  ],
};

const de: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Über uns",
    title: "Roxy ist für 24/7‑Creator gebaut",
    subtitle:
      "Wir entwickeln Streaming‑Automatisierung, die premium, sicher und vollständig steuerbar ist.",
    missionTitle: "Unsere Mission",
    missionBody:
      "Creator bekommen einen polierten KI‑Co‑Host, der Shows fährt, auf Geschenke reagiert und Zuschauer über Zeitzonen hinweg hält.",
    beliefTitle: "Woran wir glauben",
    beliefBody:
      "Kreativität führt. Roxy übernimmt Wiederholung, Planung und Reaktions‑Loops, damit du dich auf Strategie fokussierst.",
    roxyTitle: "Wofür RoxStreamAI steht",
    roxyBody:
      "RoxStreamAI steht für Roxy AI Streamer. Roxy ist unser erster Charakter, der zur Entstehung von RoxStreamAI führte. Sie war der Beginn unserer langen Geschichte.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Lass uns dein nächstes Live‑Format planen",
    subtitle:
      "Erzähl uns von deinen Streaming‑Zielen – wir erstellen einen Rollout‑Plan.",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "Geschäftliche E‑Mail",
    message: "Was soll Roxy automatisieren?",
    sendRequest: "Anfrage senden",
    directLines: "Direkte Kontakte",
    responseTime: "Antwort innerhalb von 1 Werktag.",
  },
  terms: {
    title: "AGB",
    intro:
      "Diese Bedingungen regeln die Nutzung von RoxStreamAI, inkl. Website, Desktop‑App und Services.",
    sections: [
      { title: "Konten", body: "Du bist für deine Zugangsdaten und alle Aktivitäten verantwortlich." },
      { title: "Nutzung", body: "Nutzung gemäß Plattform‑Regeln und Gesetzen. Missbrauch ist untersagt." },
      { title: "Provider‑Nutzung und BYOK", body: "Bei integrierten Providern können Anfragen an Drittanbieter weitergegeben werden. Bei BYOK bist du für eigene Keys und Abrechnung verantwortlich." },
      { title: "Abrechnung", body: "Pläne verlängern sich automatisch. Zusatznutzung kann berechnet werden." },
      { title: "Inhalte", body: "Du behältst die Rechte. Wir verarbeiten Inhalte nur zur Bereitstellung." },
      { title: "Verfügbarkeit", body: "Wir streben hohe Verfügbarkeit an, garantieren aber keine unterbrechungsfreie Nutzung. Wartung und Ausfälle können auftreten." },
      { title: "Kündigung", body: "Wir können bei Verstößen sperren. Kündigung jederzeit im Dashboard." },
    ],
  },
  privacy: {
    title: "Datenschutz",
    intro:
      "RoxStreamAI sammelt nur notwendige Daten für Automatisierung, Analytics und Konto‑Management.",
    sections: [
      { title: "Erhobene Daten", body: "Account‑Details, Nutzungsmetriken und Konfigurationen." },
      { title: "Verwendung", body: "Authentifizierung, Sessions, Support und Sicherheit." },
      { title: "Speicherung", body: "Abhängig vom Plan und in der Konsole steuerbar." },
      { title: "Kontrolle", body: "Datenexport oder Löschung jederzeit möglich." },
      { title: "Sicherheit", body: "Wir nutzen Zugriffskontrollen und Redaktion, um Geheimnisse zu schützen." },
    ],
  },
  useCases: {
    eyebrow: "Anwendungsfälle",
    title: "Echte Ergebnisse für moderne Live‑Formate",
    subtitle:
      "So nutzen Creator, faceless Channels und Agenturen Roxy für längere, sichere Streams.",
    items: [
      {
        id: "creators",
        title: "Creator",
        description:
          "Skaliere Stream‑Stunden ohne Burnout. Automatisiere Begrüßungen, Gift‑Reaktionen und Pausen.",
        highlights: ["24/7‑Pacing", "Sofortige Reaktionen", "Clip‑Momente"],
      },
      {
        id: "faceless",
        title: "Faceless‑Streaming",
        description:
          "Starte Charakter‑Kanäle ohne Kamera. Baue Lore und halte Engagement hoch.",
        highlights: ["Persona + Wissenspakete", "Voice‑Kontrolle", "Moderation"],
      },
      {
        id: "agencies",
        title: "Agenturen",
        description:
          "Verwalte mehrere Creator, Logins und Sprachen in einem Control Room.",
        highlights: ["Mehrkonto‑Planer", "Team‑Zugriff", "Analytics"],
      },
      {
        id: "unreal-avatar",
        title: "Unreal‑Avatar‑Streams",
        description:
          "Nutze die Desktop‑App, um Unreal zu verbinden und einen Echtzeit‑Charakter zu streamen.",
        highlights: ["Desktop‑App‑Workflow", "Unreal‑Verbindung", "Echtzeit‑Avatar"],
      },
      {
        id: "team-workflows",
        title: "Team‑Workflows",
        description:
          "Verwalte Charaktere, Nutzung und Zugriffe im Team. Admin‑Tools halten Keys und Billing sicher.",
        highlights: ["Admin‑Tools", "Key‑Management", "Audit‑Einblick"],
      },
    ],
    outcomes: {
      eyebrow: "Ergebnisse",
      title: "Was Teams gewinnen",
      subtitle: "Kurze Zyklen, klare Metriken und Brand‑Kontrolle.",
      items: [
        { title: "Höhere Retention", description: "Skripte und Gift‑Trigger halten Zuschauer länger." },
        { title: "Geringere Kosten", description: "Weniger manuelle Moderation und On‑Camera‑Zeit." },
        { title: "Schnellere Tests", description: "Hooks und Formate per A/B‑Scripts testen." },
      ],
    },
    cta: {
      title: "Bereit für deinen Anwendungsfall?",
      subtitle: "Sag uns, was du automatisieren willst – wir planen den Rollout.",
      primary: "Kontakt aufnehmen",
      secondary: "Preise ansehen",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Dokumentation",
      title: "Schnellstart",
      subtitle: "Alles, was du für die erste AI‑Streamer‑Session brauchst.",
      steps: [
        { id: "connect", title: "Verbinden", description: "TikTok Live verbinden, Region wählen und Standardsprache festlegen." },
        { id: "customize", title: "Anpassen", description: "Persona erstellen, Wissenspakete hinzufügen, Voice wählen und Safety‑Regeln definieren." },
        { id: "set-limits", title: "Limits für AI Speech setzen (optional)", description: "Halte die Nutzung planbar, wenn der AI Co‑Host aktiviert ist." },
        { id: "connect-unreal", title: "Unreal mit der Desktop‑App verbinden", description: "Nutze die Desktop‑App für Unreal‑Verbindung, Export und lokale Diagnosen." },
        { id: "go-live", title: "Live gehen", description: "Dono‑Motor + Stream‑Skripte aktivieren und vor 24/7 testen." },
      ],
    },
    product: {
      eyebrow: "Produkt",
      title: "Feature‑Dokumentation",
      subtitle: "Deep Dives in die Systeme, die Roxy antreiben.",
      items: [
        { id: "dono-engine", title: "Dono‑Motor", description: "Gifts auf Aktionen, Emotionen und Lines mappen – mit Prioritäten, Cooldowns und Safety‑Fallbacks." },
        { id: "stream-scripts", title: "Stream‑Skripte", description: "Intros, Loops, Mini‑Games und Battle‑Mode mit Timern planen." },
        { id: "scheduler", title: "Mehrkonto‑Planer", description: "Accounts und Regionen rotieren, um 24/7‑Coverage mit sicherem Pacing zu sichern." },
        { id: "safety", title: "Safety Guard", description: "Profanity‑Filter, gesperrte Topics, Rate‑Limits und Notfall‑Stopp‑Phrasen." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Live‑Reaktionen mit Avatar‑Scenes verbinden – event‑getrieben mit Lip‑Sync." },
        { id: "diagnostics", title: "Diagnose", description: "Statusanzeigen fur Backend, Audio, Tokens und Connectoren." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Referenz‑Überblick",
      subtitle: "Strukturierte Endpunkte für Integrationen und Analytics.",
      sections: [
        { title: "Authentifizierung", description: "Projekt‑Keys aus dem Dashboard verwenden. Requests werden per Bearer‑Token autorisiert.", items: ["POST /auth/token — API‑Key gegen Session‑Token tauschen", "POST /auth/refresh — Session‑Token erneuern"] },
        { title: "Characters", description: "Charakterprofile für Live‑Sessions erstellen, aktualisieren und versionieren.", items: ["GET /characters — Characters auflisten", "POST /characters — Character erstellen", "PATCH /characters/{id} — Persona aktualisieren"] },
        { title: "Sessions", description: "Live‑Sessions starten/stoppen, Metriken prüfen und Transkripte abrufen.", items: ["POST /sessions/start — Session starten", "POST /sessions/stop — Session stoppen", "GET /sessions/{id} — Session‑Details"] },
        { title: "Events", description: "Gift‑Reaktionen, Script‑Events und Moderationssignale abonnieren.", items: ["GET /events/stream — Server‑Sent Events", "POST /webhooks — Webhook registrieren"] },
      ],
    },
    glossary: {
      eyebrow: "Glossar",
      title: "Schlüsselbegriffe",
      subtitle: "Kurze Definitionen aus dem Dashboard.",
      items: [
        { term: "Aktive Sprachstunden", description: "Minuten, in denen Roxy TTS erzeugt und abspielt. Stille zählt nicht." },
        { term: "Dono‑Motor", description: "Regeln, die Gifts auf Emotionen, Lines, Actions, Cooldowns und Prioritäten mappen." },
        { term: "Stream‑Skripte", description: "Szenarien wie Intros, Loops, Mini‑Games und Battle‑Mode." },
        { term: "Wissenspaket", description: "Custom‑Fakten, die die Persona konsistent und on‑brand halten." },
        { term: "Watermark", description: "Visuelles Brand‑Mark, das in Pro/Studio deaktiviert werden kann." },
        { term: "Mehrkonto‑Warteschlange", description: "Geplante Rotation mehrerer TikTok‑Accounts für 24/7‑Streaming." },
      ],
    },
  },
  pricing: {
    eyebrow: "Preise",
    title: "Preise, die mit deinem Streaming skalieren",
    subtitle: "BYOK für maximale Kontrolle oder Pro‑Credits für Plug‑and‑Play.",
    comparisonTitle: "Planvergleich",
    comparisonHeaders: ["Feature", "Test", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Aktive Sprachstunden enthalten", values: ["60 Min", "Unbegrenzt (BYOK)", "10 Stunden", "40 Stunden"] },
      { label: "Watermark", values: ["An", "An", "Umschaltbar", "Umschaltbar"] },
      { label: "Accounts", values: ["1", "1", "Bis zu 5", "Bis zu 20"] },
      { label: "Dono‑Regeln", values: ["10", "20", "200", "1000"] },
      { label: "Scripts", values: ["2", "3", "Unbegrenzt", "Unbegrenzt + erweitert"] },
      { label: "Knowledge‑Items", values: ["-", "3", "20", "200"] },
      { label: "Log‑Retention", values: ["3 Tage", "7 Tage", "30 Tage", "90 Tage"] },
      { label: "Team‑Seats", values: ["-", "-", "-", "5"] },
      { label: "Kommerzielle Lizenz", values: ["-", "-", "-", "Ja"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Extra‑Credits",
    extraCreditsSubtitle: "Mehr aktive Sprachstunden kaufen, wenn das Limit erreicht ist.",
    extraCredits: [
      { label: "+10 Stunden", price: "€25" },
      { label: "+50 Stunden", price: "€99" },
      { label: "+200 Stunden", price: "€299" },
    ],
    addonTitle: "Unreal Connector Pack",
    addonBadge: "Add‑on",
    addonDescription: "Unreal Live Connector, Lip‑Sync‑Trigger, Beispiel‑UE‑Scenes und Action‑Mapping für den Dono‑Motor.",
    addonPrices: [
      { label: "Monatlich", price: "€49 / Monat" },
      { label: "Lifetime", price: "€299" },
    ],
    addonCta: "Add‑ons verwalten",
    faqEyebrow: "FAQ",
    faqTitle: "Kurze Antworten",
    faqSubtitle: "Pläne einfach erklärt.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Updates, Anwendungsfälle und Launch‑Notizen",
    subtitle: "Produktnews, Growth‑Playbooks und reale Stream‑Formate.",
    backToBlog: "Zurück zum Blog",
  },
  team: {
    eyebrow: "Team",
    title: "Das Team hinter RoxStreamAI",
    subtitle: "Ein fokussiertes Team aus Streaming‑Ops, AI‑Systemen und Produktdesign.",
    members: [
      { name: "Lia Chen", role: "Produkt & Growth", focus: "Creator‑Tooling, Onboarding und Pricing‑Strategie." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Realtime‑Systeme, Stream‑Skripte und Plattform‑Reliability." },
      { name: "Sofia Kim", role: "Design Lead", focus: "Brand‑System, UI‑Kits und neue Dashboard‑Abläufe." },
    ],
    values: {
      eyebrow: "Werte",
      title: "So arbeiten wir",
      subtitle: "Prinzipien, die unsere Produktentscheidungen prägen.",
      items: [
        { title: "Creator‑first", description: "Wir bauen Tools, die Reibung entfernen, damit Creator sich auf Formate und Storytelling fokussieren." },
        { title: "Operative Klarheit", description: "Analytics, Abläufe und Scripts für schnelle Entscheidungen und wiederholbares Wachstum." },
        { title: "Safety by default", description: "Jeder Ablauf enthält Moderationsregeln, Rate‑Limits und Sicherheitsleitplanken vor dem Skalieren." },
      ],
    },
    cta: {
      title: "Zusammenarbeiten?",
      subtitle: "Partnerschaften, Integrationen oder Early Access – sprich mit uns.",
      primary: "Kontakt",
      secondary: "Updates lesen",
    },
  },
  download: {
    eyebrow: "Downloads",
    title: "Neueste Desktop‑Version",
    subtitle: "Plattform wählen. Releases werden vom Admin‑Team verwaltet.",
    latestLabel: "Neueste",
    noReleases: "Noch keine Releases. Bitte Admin um die erste Windows/macOS‑Build im Admin‑Panel.",
    openAdmin: "Admin‑Releases öffnen",
    releaseHistory: "Release‑Historie",
    download: "Download",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Test" : card.name,
    description:
      card.description === "Preview"
        ? "Vorschau"
        : card.description === "Best value"
          ? "Bestes Preis‑Leistung"
          : card.description === "For teams"
            ? "Für Teams"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "Minuten")
      .replace("hours", "Stunden")
      .replace("Unlimited", "Unbegrenzt"),
    cta: card.cta
      .replace("Start Trial", "Test starten")
      .replace("Choose", "Wählen"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "Konto")
        .replace("Dono rules", "Dono‑Regeln")
        .replace("Scripts", "Skripte")
        .replace("Watermark always on", "Wasserzeichen immer an")
        .replace("Logs", "Logs")
        .replace("Credits + BYOK", "Credits + BYOK")
        .replace("Auto language", "Auto‑Sprache")
        .replace("Export/Import", "Export/Import")
        .replace("Team seats", "Team‑Sitze")
        .replace("Commercial license", "Kommerzielle Lizenz")
        .replace("Advanced scripts", "Erweiterte Skripte")
    ),
  })),
  faqs: [
    { q: "Brauche ich API‑Keys?", a: "Basic nutzt BYOK. Pro/Studio enthalten Credits und funktionieren sofort." },
    { q: "Was sind aktive Sprachstunden?", a: "Nur die Zeit, in der Roxy spricht." },
    { q: "Kann ich das Wasserzeichen deaktivieren?", a: "Basic/Trial: nein. Pro/Studio: ja." },
    { q: "Garantiert das Einnahmen?", a: "Nein, Ergebnisse hängen von Inhalt und Publikum ab." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Brand‑Anwendungsfälle für AI‑Charaktere",
      summary: "Wie Marken 24/7‑Aktivierungen und interaktive Kampagnen mit AI‑Charakteren fahren.",
      date: "2026-01-12",
      category: "Anwendungsfälle",
      readingTime: "6 min",
      content: [
        "AI‑Streamer ermöglichen Live‑Formate ohne menschlichen Host. Der Charakter bleibt on‑message und reagiert auf Gifts.",
        "Starte mit einem Hero‑Charakter, füge Wissenspakete hinzu und verknüpfe Dono‑Regeln mit Kampagnen‑Events.",
        "Agenturen nutzen Mehrkonto‑Planung für regionale Kanäle rund um die Uhr.",
        "Verbinde Kampagnen‑Events mit Dono‑Regeln, um wiederkehrende Aktivierungen zu automatisieren.",
        "Agenturen nutzen die Mehrkonto‑Planung fur regionale 24/7‑Abdeckung.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "RoxStreamAI vorgestellt",
      summary: "Der schnelle Weg von Persona zur Live‑Session.",
      date: "2026-01-08",
      category: "Product",
      readingTime: "5 min",
      content: [
        "RoxStreamAI startet AI‑Streamer in Minuten: Account verbinden, Persona anpassen, live gehen.",
        "Fokus auf lange Sessions: sicheres Pacing, Moderation und Planer.",
        "Pro enthält Credits; BYOK erlaubt eigene Modelle und Voices.",
        "Plattform fur lange Sessions: sicheres Pacing, Moderation und Planer ohne manuelles Umschalten.",
        "Setze Active Speech Limits, um Kosten planbar zu halten.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Automation‑Stacks für 24/7 Live",
      summary: "Skripte, Moderation und Reaktions‑Loops für hohe Retention.",
      date: "2025-12-20",
      category: "Guides",
      readingTime: "7 min",
      content: [
        "Ein stabiles 24/7‑Format braucht Struktur, reaktive Momente und Safety‑Kontrollen.",
        "Mappe Donations zu Reaktionen mit Prioritäten und Cooldowns.",
        "Setze Sicherheitsleitplanken und menschliche Overrides.",
        "Skripte und Prioritaten halten das Tempo ohne Chat‑Overload.",
      ],
    },
  ],
};

const es: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Acerca de",
    title: "Roxy está hecho para creadores 24/7",
    subtitle: "Automatización premium, segura y totalmente controlable.",
    missionTitle: "Nuestra misión",
    missionBody:
      "Dar a creadores un co‑host IA que ejecuta shows, reacciona a regalos y mantiene el engagement.",
    beliefTitle: "Lo que creemos",
    beliefBody:
      "La creatividad manda. Roxy se encarga de repetición, agenda y loops de reacción.",
    roxyTitle: "Qué significa RoxStreamAI",
    roxyBody:
      "RoxStreamAI significa Roxy AI Streamer. Roxy es nuestro primer personaje, que dio origen a RoxStreamAI. Ella fue el comienzo de nuestra larga historia.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Planifiquemos tu próximo formato live",
    subtitle: "Cuéntanos tus objetivos y diseñamos un rollout.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email de trabajo",
    message: "¿Qué quieres que Roxy automatice?",
    sendRequest: "Enviar solicitud",
    directLines: "Contacto directo",
    responseTime: "Respondemos en 1 día hábil.",
  },
  terms: {
    title: "Términos",
    intro: "Estas condiciones rigen el uso de RoxStreamAI y sus servicios.",
    sections: [
      { title: "Cuentas", body: "Eres responsable de tus credenciales y actividad." },
      { title: "Uso", body: "Cumple reglas y leyes. No se permite abuso." },
      { title: "Uso de proveedores y BYOK", body: "Cuando usas proveedores integrados, RoxStreamAI puede enviar solicitudes a terceros. Con BYOK, tus claves y facturación son tu responsabilidad." },
      { title: "Facturación", body: "Planes se renuevan automáticamente. Pueden aplicarse extras." },
      { title: "Contenido", body: "Conservas la propiedad; procesamos solo para el servicio." },
      { title: "Disponibilidad", body: "Buscamos alta disponibilidad, pero no garantizamos servicio ininterrumpido. Puede haber mantenimiento y caídas." },
      { title: "Terminación", body: "Podemos suspender por incumplimiento. Cancelación en el panel." },
    ],
  },
  privacy: {
    title: "Privacidad",
    intro: "Solo recopilamos datos necesarios para el servicio. No vendemos datos personales.",
    sections: [
      { title: "Datos recopilados", body: "Detalles de cuenta, métricas y configuraciones." },
      { title: "Uso de datos", body: "Autenticación, sesiones, soporte y seguridad." },
      { title: "Retención", body: "Depende del plan y se gestiona en el panel." },
      { title: "Control", body: "Puedes exportar o eliminar datos cuando quieras." },
      { title: "Seguridad", body: "Aplicamos controles de acceso y redacción para proteger secretos." },
    ],
  },
  useCases: {
    eyebrow: "Casos de uso",
    title: "Resultados reales para formatos live modernos",
    subtitle: "Cómo creadores, faceless y agencias usan Roxy.",
    items: [
      {
        id: "creators",
        title: "Creadores",
        description: "Escala horas sin burnout con automatizaciones.",
        highlights: ["Pacing 24/7", "Reacciones instantáneas", "Momentos para clips"],
      },
      {
        id: "faceless",
        title: "Streaming faceless",
        description: "Canales con personaje sin cámara.",
        highlights: ["Persona + paquete de conocimiento", "Control de voz", "Moderación"],
      },
      {
        id: "agencies",
        title: "Agencias",
        description: "Múltiples cuentas e idiomas desde un solo panel.",
        highlights: ["Planificador multicuenta", "Acceso de equipo", "Analytics"],
      },
      {
        id: "unreal-avatar",
        title: "Streams con avatar en Unreal",
        description: "Usa la app de escritorio para conectar Unreal y emitir un personaje en tiempo real.",
        highlights: ["Flujo con app de escritorio", "Conexión Unreal", "Avatar en tiempo real"],
      },
      {
        id: "team-workflows",
        title: "Flujos de equipo",
        description:
          "Gestiona personajes, uso y accesos en equipo. Las herramientas de admin mantienen claves y facturación seguras.",
        highlights: ["Herramientas admin", "Gestión de claves", "Visibilidad de auditoría"],
      },
    ],
    outcomes: {
      eyebrow: "Resultados",
      title: "Lo que desbloquean los equipos",
      subtitle: "Ciclos cortos y control de marca.",
      items: [
        { title: "Mayor retención", description: "Scripts y triggers mantienen engagement." },
        { title: "Menor costo", description: "Menos moderación manual." },
        { title: "Más pruebas", description: "A/B testing de formatos y hooks." },
      ],
    },
    cta: {
      title: "¿Listo para tu caso?",
      subtitle: "Cuéntanos lo que quieres automatizar.",
      primary: "Hablar con nosotros",
      secondary: "Ver precios",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Documentación",
      title: "Inicio rápido",
      subtitle: "Todo lo necesario para lanzar tu primera sesión de AI streamer.",
      steps: [
        { id: "connect", title: "Conectar", description: "Vincula tu TikTok Live, elige región y el idioma por defecto del personaje." },
        { id: "customize", title: "Personalizar", description: "Crea la persona, añade paquetes de conocimiento, elige voz y define reglas de seguridad." },
        { id: "set-limits", title: "Define límites de habla IA (opcional)", description: "Mantén el uso predecible cuando el co‑host IA esté activo." },
        { id: "connect-unreal", title: "Conecta Unreal con la app de escritorio", description: "Usa la app de escritorio para conexión Unreal, exportación y diagnósticos locales." },
        { id: "go-live", title: "Ir en vivo", description: "Activa Motor Dono + scripts de stream y prueba antes del 24/7." },
      ],
    },
    product: {
      eyebrow: "Producto",
      title: "Documentación de funciones",
      subtitle: "Profundiza en los sistemas que impulsan Roxy.",
      items: [
        { id: "dono-engine", title: "Motor Dono", description: "Asigna regalos a acciones, emociones y líneas con prioridades, cooldowns y fallback de seguridad." },
        { id: "stream-scripts", title: "Scripts de stream", description: "Programa intros, loops, mini‑juegos y battle mode con triggers temporizados." },
        { id: "scheduler", title: "Planificador multicuenta", description: "Rota cuentas y regiones para mantener cobertura continua con pacing seguro." },
        { id: "safety", title: "Safety Guard", description: "Filtros de lenguaje, temas bloqueados, límites de ritmo y frases de stop de emergencia." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Conecta reacciones al avatar con hooks event‑driven y lip‑sync." },
        { id: "diagnostics", title: "Diagnosticos", description: "Indicadores de estado para backend, audio, tokens y conectores." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Resumen de referencia",
      subtitle: "Endpoints estructurados para integraciones y analítica.",
      sections: [
        { title: "Autenticación", description: "Usa las claves de proyecto del panel. Las solicitudes se autorizan con bearer token.", items: ["POST /auth/token — intercambia API key por session token", "POST /auth/refresh — actualiza el session token"] },
        { title: "Personajes", description: "Crea, actualiza y versiona perfiles de personaje usados en sesiones live.", items: ["GET /characters — listar personajes", "POST /characters — crear personaje", "PATCH /characters/{id} — actualizar persona"] },
        { title: "Sesiones", description: "Inicia o detén sesiones, revisa métricas y obtiene transcripciones.", items: ["POST /sessions/start — iniciar sesión", "POST /sessions/stop — detener sesión", "GET /sessions/{id} — detalles de sesión"] },
        { title: "Eventos", description: "Suscríbete a reacciones de regalos, eventos de scripts y señales de moderación.", items: ["GET /events/stream — server‑sent events", "POST /webhooks — registrar webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Glosario",
      title: "Términos clave",
      subtitle: "Definiciones cortas usadas en el panel.",
      items: [
        { term: "Horas de habla activa", description: "Minutos en los que Roxy genera y reproduce TTS. El silencio no cuenta." },
        { term: "Motor Dono", description: "Reglas que mapean regalos a emociones, líneas, acciones, cooldowns y prioridades." },
        { term: "Scripts de stream", description: "Escenarios como intros, loops, mini‑juegos y battle mode." },
        { term: "Paquete de conocimiento", description: "Datos personalizados que mantienen la persona consistente y alineada con la marca." },
        { term: "Watermark", description: "Marca visual que puede desactivarse en Pro y Studio." },
        { term: "Cola multi‑cuenta", description: "Rotación programada de varias cuentas TikTok para streaming 24/7." },
      ],
    },
  },
  pricing: {
    eyebrow: "Precios",
    title: "Precios que escalan con tu streaming",
    subtitle: "BYOK para control total o créditos Pro plug‑and‑play.",
    comparisonTitle: "Comparación de planes",
    comparisonHeaders: ["Función", "Prueba", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Horas de habla activas incluidas", values: ["60 min", "Ilimitado (BYOK)", "10 horas", "40 horas"] },
      { label: "Watermark", values: ["On", "On", "Toggle", "Toggle"] },
      { label: "Cuentas", values: ["1", "1", "Hasta 5", "Hasta 20"] },
      { label: "Reglas Dono", values: ["10", "20", "200", "1000"] },
      { label: "Scripts", values: ["2", "3", "Ilimitados", "Ilimitados + avanzados"] },
      { label: "Ítems de conocimiento", values: ["-", "3", "20", "200"] },
      { label: "Retención de logs", values: ["3 días", "7 días", "30 días", "90 días"] },
      { label: "Asientos de equipo", values: ["-", "-", "-", "5"] },
      { label: "Licencia comercial", values: ["-", "-", "-", "Sí"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Créditos extra",
    extraCreditsSubtitle: "Compra más horas activas cuando alcances el límite.",
    extraCredits: [
      { label: "+10 horas", price: "€25" },
      { label: "+50 horas", price: "€99" },
      { label: "+200 horas", price: "€299" },
    ],
    addonTitle: "Paquete Unreal Connector",
    addonBadge: "Add‑on",
    addonDescription: "Unreal Live connector, triggers de lip‑sync, escenas UE de ejemplo y mapeo de acciones para el Motor Dono.",
    addonPrices: [
      { label: "Mensual", price: "€49 / mes" },
      { label: "De por vida", price: "€299" },
    ],
    addonCta: "Gestionar add‑ons",
    faqEyebrow: "FAQ",
    faqTitle: "¿Necesitas respuestas?",
    faqSubtitle: "Preguntas frecuentes de planes.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Actualizaciones, casos y lanzamientos",
    subtitle: "Noticias de producto, playbooks de crecimiento y formatos reales.",
    backToBlog: "Volver al blog",
  },
  team: {
    eyebrow: "Equipo",
    title: "El equipo detrás de RoxStreamAI",
    subtitle: "Un equipo pequeño enfocado en operaciones de streaming, AI y diseño de producto.",
    members: [
      { name: "Lia Chen", role: "Producto y Growth", focus: "Herramientas para creadores, onboarding y estrategia de precios." },
      { name: "Maks Orlov", role: "Líder de ingeniería", focus: "Sistemas en tiempo real, scripts de stream y confiabilidad de plataforma." },
      { name: "Sofia Kim", role: "Líder de diseño", focus: "Sistema de marca, kits UI y nuevos flujos del dashboard." },
    ],
    values: {
      eyebrow: "Valores",
      title: "Cómo trabajamos",
      subtitle: "Principios que guían el producto.",
      items: [
        { title: "Creator‑first", description: "Construimos herramientas que eliminan fricción para enfocarse en formatos y narrativa." },
        { title: "Claridad operativa", description: "Analítica, flujos y scripts para decisiones rápidas y crecimiento repetible." },
        { title: "Seguridad por defecto", description: "Cada flujo incluye reglas de moderación, límites de ritmo y barreras de seguridad antes de escalar." },
      ],
    },
    cta: {
      title: "¿Quieres colaborar?",
      subtitle: "Partners, integraciones o acceso temprano—hablemos.",
      primary: "Contactar",
      secondary: "Leer actualizaciones",
    },
  },
  download: {
    eyebrow: "Descargas",
    title: "Descarga la última versión",
    subtitle: "Elige tu plataforma. Releases gestionados por el equipo admin.",
    latestLabel: "Última",
    noReleases: "Aún no hay releases. Pide al admin agregar el primer build Windows/macOS en el panel.",
    openAdmin: "Abrir releases admin",
    releaseHistory: "Historial de releases",
    download: "Descargar",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    description: card.description === "Preview" ? "Vista previa" : card.description,
    includedHours: card.includedHours.replace("minutes", "minutos").replace("hours", "horas"),
    cta: card.cta.replace("Start Trial", "Iniciar prueba").replace("Choose", "Elegir"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "cuenta")
        .replace("Dono rules", "Reglas Dono")
        .replace("Scripts", "Scripts")
        .replace("Watermark always on", "Marca de agua siempre activa")
        .replace("Logs", "Logs")
        .replace("Knowledge pack", "Paquete de conocimiento")
        .replace("Team seats", "Asientos de equipo")
        .replace("Commercial license", "Licencia comercial")
        .replace("Advanced scripts", "Scripts avanzados")
    ),
  })),
  faqs: [
    { q: "¿Necesito claves API?", a: "Basic usa BYOK. Pro/Studio incluyen créditos." },
    { q: "¿Qué son horas activas?", a: "Solo cuando Roxy habla." },
    { q: "¿Puedo quitar watermark?", a: "Basic/Trial: no. Pro/Studio: sí." },
    { q: "¿Garantiza ingresos?", a: "No, depende del contenido y audiencia." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casos de uso de marca con personajes IA",
      summary: "Cómo las marcas activan campañas siempre activas con personajes IA.",
      date: "2026-01-12",
      category: "Casos de uso",
      readingTime: "6 min",
      content: [
        "Los streamers IA permiten formatos live sin host humano. El personaje mantiene el mensaje y reacciona a regalos.",
        "Empieza con un personaje principal y añade paquetes de conocimiento para alinear respuestas.",
        "Para agencias, el planificador multi‑cuenta mantiene canales regionales activos 24/7.",
        "Empieza con un personaje hero y conecta reglas Dono a eventos de campaña.",
        "Las agencias usan el planificador multicuenta para cobertura regional 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Presentamos RoxStreamAI",
      summary: "De persona a sesión en vivo en minutos.",
      date: "2026-01-08",
      category: "Producto",
      readingTime: "5 min",
      content: [
        "RoxStreamAI permite lanzar streamers IA en minutos.",
        "Enfocado en sesiones largas con pacing seguro y moderación.",
        "Pro incluye créditos; BYOK permite tus propios modelos y voces.",
        "Plataforma para sesiones largas: pacing seguro, moderacion y planificador sin cambios manuales.",
        "Configura limites de Active Speech para mantener costos predecibles.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Stacks de automatización para 24/7",
      summary: "Scripts, moderación y loops de reacción para alto engagement.",
      date: "2025-12-20",
      category: "Guías",
      readingTime: "7 min",
      content: [
        "Un formato 24/7 necesita estructura, reacciones y controles de seguridad.",
        "Mapea donaciones a reacciones con prioridades y cooldowns.",
        "Configura barreras de seguridad y un override humano.",
        "Scripts y prioridades mantienen el ritmo sin saturar el chat.",
      ],
    },
  ],
};

const fr: MarketingContent = {
  ...en,
  about: {
    eyebrow: "À propos",
    title: "Roxy pour les créateurs 24/7",
    subtitle: "Automatisation premium, sûre et contrôlable.",
    missionTitle: "Notre mission",
    missionBody: "Un co‑host IA qui anime, réagit aux cadeaux et retient l’audience.",
    beliefTitle: "Nos convictions",
    beliefBody: "La créativité humaine d'abord. Roxy gère répétition, planning, réactions.",
    roxyTitle: "Ce que RoxStreamAI signifie",
    roxyBody:
      "RoxStreamAI signifie Roxy AI Streamer. Roxy est notre premier personnage, qui a donné naissance à RoxStreamAI. Elle a été le début de notre longue histoire.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Planifions votre prochain format live",
    subtitle: "Parlez‑nous de vos objectifs, on prépare un rollout.",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email pro",
    message: "Que voulez‑vous automatiser ?",
    sendRequest: "Envoyer",
    directLines: "Contacts directs",
    responseTime: "Réponse sous 1 jour ouvré.",
  },
  terms: {
    title: "Conditions",
    intro: "Conditions d’utilisation de RoxStreamAI.",
    sections: [
      { title: "Comptes", body: "Vous êtes responsable de vos identifiants." },
      { title: "Usage", body: "Respect des règles et lois. Abus interdit." },
      { title: "Fournisseurs et BYOK", body: "Avec les fournisseurs intégrés, RoxStreamAI peut transmettre vos requêtes à des tiers. Avec BYOK, vous gérez vos clés et votre facturation." },
      { title: "Facturation", body: "Renouvellement automatique. Extras possibles." },
      { title: "Contenu", body: "Vous gardez la propriété; traitement pour le service." },
      { title: "Disponibilité", body: "Nous visons une haute disponibilité sans garantir un service ininterrompu. Des maintenances et interruptions peuvent survenir." },
      { title: "Résiliation", body: "Suspension possible en cas d’abus. Annulation dans le dashboard." },
    ],
  },
  privacy: {
    title: "Confidentialité",
    intro: "Nous collectons uniquement les données nécessaires au service.",
    sections: [
      { title: "Données collectées", body: "Détails de compte, métriques et configs." },
      { title: "Utilisation", body: "Auth, sessions, support, fiabilité." },
      { title: "Rétention", body: "Selon le plan, gérable dans le dashboard." },
      { title: "Contrôle", body: "Export/suppression possibles." },
      { title: "Sécurité", body: "Nous appliquons des contrôles d'accès et une rédaction pour protéger les secrets." },
    ],
  },
  useCases: {
    eyebrow: "Cas d’usage",
    title: "Résultats réels pour formats live modernes",
    subtitle: "Créateurs, faceless et agences avec Roxy.",
    items: [
      { id: "creators", title: "Créateurs", description: "Scaler sans burnout.", highlights: ["Pacing 24/7", "Réactions rapides", "Moments clips"] },
      { id: "faceless", title: "Faceless", description: "Chaînes avec personnage sans caméra.", highlights: ["Persona + pack de connaissances", "Voix", "Modération"] },
      { id: "agencies", title: "Agences", description: "Multi‑comptes et langues.", highlights: ["Planificateur", "Accès équipe", "Analytics"] },
      { id: "unreal-avatar", title: "Streams d'avatar Unreal", description: "Utilisez l'application desktop pour connecter Unreal et diffuser un personnage en temps réel.", highlights: ["Workflow desktop", "Connexion Unreal", "Avatar en temps réel"] },
      { id: "team-workflows", title: "Flux d’équipe", description: "Gérez personnages, usage et accès en équipe. Les outils admin sécurisent clés et facturation.", highlights: ["Outils admin", "Gestion des clés", "Visibilité audit"] },
    ],
    outcomes: {
      eyebrow: "Résultats",
      title: "Ce que les équipes obtiennent",
      subtitle: "Cycles courts, métriques claires, contrôle de marque.",
      items: [
        { title: "Rétention élevée", description: "Scripts et triggers maintiennent l’engagement." },
        { title: "Coûts réduits", description: "Moins de modération manuelle." },
        { title: "Tests rapides", description: "A/B tests de formats." },
      ],
    },
    cta: { title: "Prêt pour votre cas ?", subtitle: "Dites‑nous quoi automatiser.", primary: "Nous contacter", secondary: "Voir les tarifs" },
  },
  docs: {
    quickstart: {
      eyebrow: "Documentation",
      title: "Démarrage rapide",
      subtitle: "Tout pour lancer votre première session d’AI streamer.",
      steps: [
        { id: "connect", title: "Connecter", description: "Liez TikTok Live, choisissez région et langue par défaut." },
        { id: "customize", title: "Personnaliser", description: "Créez la persona, ajoutez des packs de connaissances, choisissez la voix et les règles de sécurité." },
        { id: "set-limits", title: "Définir des limites d'AI speech (optionnel)", description: "Gardez l'usage prévisible quand le co‑host IA est activé." },
        { id: "connect-unreal", title: "Connecter Unreal via l'application desktop", description: "Utilisez l'app desktop pour la connexion Unreal, l'export et les diagnostics locaux." },
        { id: "go-live", title: "Passer live", description: "Activez le Moteur Dono + scripts de stream et testez avant le 24/7." },
      ],
    },
    product: {
      eyebrow: "Produit",
      title: "Documentation des fonctionnalités",
      subtitle: "Plongée dans les systèmes qui alimentent Roxy.",
      items: [
        { id: "dono-engine", title: "Moteur Dono", description: "Associez cadeaux à actions, émotions et lignes avec priorités, cooldowns et fallback sécurité." },
        { id: "stream-scripts", title: "Scripts de stream", description: "Planifiez intros, loops, mini‑jeux et battle mode avec déclencheurs temporisés." },
        { id: "scheduler", title: "Planificateur multi‑compte", description: "Faites tourner comptes et régions pour une couverture 24/7 avec pacing sûr." },
        { id: "safety", title: "Safety Guard", description: "Filtres de langage, sujets bloqués, rate limits et phrases d’arrêt d’urgence." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Connectez les réactions live à l’avatar via hooks event‑driven et lip‑sync." },
        { id: "diagnostics", title: "Diagnostics", description: "Indicateurs d'etat pour backend, audio, tokens et connecteurs." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Aperçu de référence",
      subtitle: "Endpoints structurés pour intégrations et analytics.",
      sections: [
        { title: "Authentification", description: "Utilisez les clés projet du dashboard. Requêtes autorisées via bearer token.", items: ["POST /auth/token — échanger la clé API contre un session token", "POST /auth/refresh — rafraîchir le session token"] },
        { title: "Personnages", description: "Créez, mettez à jour et versionnez les profils de personnages pour les sessions live.", items: ["GET /characters — lister les personnages", "POST /characters — créer un personnage", "PATCH /characters/{id} — mettre à jour la persona"] },
        { title: "Sessions", description: "Démarrez/stoppez des sessions, consultez les métriques et récupérez les transcriptions.", items: ["POST /sessions/start — démarrer une session", "POST /sessions/stop — arrêter une session", "GET /sessions/{id} — détails de session"] },
        { title: "Événements", description: "Abonnez‑vous aux réactions cadeaux, événements scriptés et signaux de modération.", items: ["GET /events/stream — server‑sent events", "POST /webhooks — enregistrer un webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Glossaire",
      title: "Termes clés",
      subtitle: "Définitions courtes utilisées dans le dashboard.",
      items: [
        { term: "Heures de parole active", description: "Minutes où Roxy génère et joue du TTS. Le silence ne compte pas." },
        { term: "Moteur Dono", description: "Règles qui lient cadeaux à émotions, lignes, actions, cooldowns et priorités." },
        { term: "Scripts de stream", description: "Scénarios d’intro, loops, mini‑jeux et battle mode." },
        { term: "Pack de connaissances", description: "Faits personnalisés pour garder la persona cohérente et on‑brand." },
        { term: "Watermark", description: "Marque visuelle désactivable sur Pro et Studio." },
        { term: "File multi‑compte", description: "Rotation programmée de plusieurs comptes TikTok pour le 24/7." },
      ],
    },
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Des tarifs qui évoluent avec votre streaming",
    subtitle: "BYOK pour contrôle total ou crédits Pro plug‑and‑play.",
    comparisonTitle: "Comparatif des plans",
    comparisonHeaders: ["Fonction", "Essai", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Heures de parole active incluses", values: ["60 min", "Illimité (BYOK)", "10 heures", "40 heures"] },
      { label: "Watermark", values: ["On", "On", "Toggle", "Toggle"] },
      { label: "Comptes", values: ["1", "1", "Jusqu’à 5", "Jusqu’à 20"] },
      { label: "Règles Dono", values: ["10", "20", "200", "1000"] },
      { label: "Scripts", values: ["2", "3", "Illimités", "Illimités + avancés"] },
      { label: "Éléments knowledge", values: ["-", "3", "20", "200"] },
      { label: "Rétention des logs", values: ["3 jours", "7 jours", "30 jours", "90 jours"] },
      { label: "Sièges équipe", values: ["-", "-", "-", "5"] },
      { label: "Licence commerciale", values: ["-", "-", "-", "Oui"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Crédits supplémentaires",
    extraCreditsSubtitle: "Achetez plus d’heures actives quand vous atteignez la limite.",
    extraCredits: [
      { label: "+10 heures", price: "€25" },
      { label: "+50 heures", price: "€99" },
      { label: "+200 heures", price: "€299" },
    ],
    addonTitle: "Pack Unreal Connector",
    addonBadge: "Add‑on",
    addonDescription: "Unreal Live connector, triggers de lip‑sync, scènes UE exemples et mapping d’actions pour le Moteur Dono.",
    addonPrices: [
      { label: "Mensuel", price: "€49 / mois" },
      { label: "À vie", price: "€299" },
    ],
    addonCta: "Gérer les add‑ons",
    faqEyebrow: "FAQ",
    faqTitle: "Réponses rapides",
    faqSubtitle: "Plans expliqués simplement.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Updates, cas d’usage et lancements",
    subtitle: "News produit, playbooks de croissance et formats réels.",
    backToBlog: "Retour au blog",
  },
  team: {
    eyebrow: "Équipe",
    title: "L’équipe derrière RoxStreamAI",
    subtitle: "Une petite équipe entre ops streaming, IA et design produit.",
    members: [
      { name: "Lia Chen", role: "Produit & Growth", focus: "Outils creators, onboarding et stratégie pricing." },
      { name: "Maks Orlov", role: "Lead Engineering", focus: "Systèmes realtime, scripts live et fiabilité plateforme." },
      { name: "Sofia Kim", role: "Lead Design", focus: "Brand system, UI kits et nouveaux flows dashboard." },
    ],
    values: {
      eyebrow: "Valeurs",
      title: "Notre façon de travailler",
      subtitle: "Principes qui guident nos décisions produit.",
      items: [
        { title: "Creator‑first", description: "On construit des outils qui éliminent la friction pour se concentrer sur formats et storytelling." },
        { title: "Clarté opérationnelle", description: "Analytics, processus et scripts pour décisions rapides et croissance répétable." },
        { title: "Sécurité par défaut", description: "Chaque flux inclut règles de modération, rate limits et garde‑fous avant l’échelle." },
      ],
    },
    cta: {
      title: "Collaborer ?",
      subtitle: "Partenariats, intégrations ou accès anticipé—parlons‑en.",
      primary: "Contacter",
      secondary: "Lire les updates",
    },
  },
  download: {
    eyebrow: "Téléchargements",
    title: "Télécharger la dernière version",
    subtitle: "Choisissez la plateforme. Les releases sont gérées par l’équipe admin.",
    latestLabel: "Dernière",
    noReleases: "Pas encore de releases. Demandez à un admin d’ajouter la première build Windows/macOS via le panneau admin.",
    openAdmin: "Ouvrir les releases admin",
    releaseHistory: "Historique des releases",
    download: "Télécharger",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Essai" : card.name,
    description:
      card.description === "Preview"
        ? "Aperçu"
        : card.description === "Best value"
          ? "Meilleur rapport qualité/prix"
          : card.description === "For teams"
            ? "Pour équipes"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minutes")
      .replace("hours", "heures")
      .replace("Unlimited", "Illimité"),
    cta: card.cta
      .replace("Start Trial", "Démarrer l'essai")
      .replace("Choose", "Choisir"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "compte")
        .replace("Dono rules", "Règles Dono")
        .replace("Scripts", "Scripts")
        .replace("Watermark always on", "Filigrane toujours activé")
        .replace("Logs", "Logs")
        .replace("Knowledge pack", "Pack de connaissances")
        .replace("Team seats", "Sièges d'équipe")
        .replace("Commercial license", "Licence commerciale")
        .replace("Advanced scripts", "Scripts avancés")
    ),
  })),
  faqs: [
    { q: "Ai‑je besoin de clés API ?", a: "Basic utilise BYOK. Pro/Studio incluent des crédits." },
    { q: "Que sont les heures actives ?", a: "Uniquement le temps où Roxy parle." },
    { q: "Puis‑je désactiver le filigrane ?", a: "Basic/Essai : non. Pro/Studio : oui." },
    { q: "Revenus garantis ?", a: "Non, cela dépend du contenu et de l’audience." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Cas d’usage marque pour les personnages IA",
      summary: "Activations 24/7 et campagnes interactives avec personnages IA.",
      date: "2026-01-12",
      category: "Cas d’usage",
      readingTime: "6 min",
      content: [
        "Les streamers IA permettent des formats live sans host humain.",
        "Commencez par un personnage principal et ajoutez des packs de connaissances.",
        "Le planificateur multi‑compte garde les chaînes régionales actives 24/7.",
        "Commencez avec un personnage hero et reliez les regles Dono aux evenements de campagne.",
        "Les agences utilisent la planification multi‑compte pour la couverture regionale 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Présentation de RoxStreamAI",
      summary: "De la persona à la session live en minutes.",
      date: "2026-01-08",
      category: "Produit",
      readingTime: "5 min",
      content: [
        "RoxStreamAI lance des streamers IA en quelques minutes.",
        "Sessions longues avec pacing sûr, modération et planificateur.",
        "Pro inclut des crédits; BYOK permet vos propres modèles et voix.",
        "Plateforme pour sessions longues: pacing sur, moderation et planificateur sans bascule manuelle.",
        "Reglez des limites Active Speech pour garder les couts previsibles.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Stacks d’automatisation pour 24/7",
      summary: "Scripts, modération et boucles de réaction.",
      date: "2025-12-20",
      category: "Guides",
      readingTime: "7 min",
      content: [
        "Un format 24/7 exige structure, réactions et sécurité.",
        "Mappez les dons à des réactions avec priorités et cooldowns.",
        "Ajoutez des garde‑fous et un override humain.",
        "Scripts et priorites gardent le rythme sans surcharge du chat.",
      ],
    },
  ],
};

const pl: MarketingContent = {
  ...en,
  about: {
    eyebrow: "O RoxStreamAI",
    title: "Roxy dla tworcow 24/7",
    subtitle: "Automatyzacja premium, bezpieczna i w pelni sterowalna.",
    missionTitle: "Misja",
    missionBody:
      "Dac twórcom dopracowanego AI co-hosta, ktory prowadzi formaty, reaguje na prezenty i utrzymuje uwage widzow w roznych strefach czasowych.",
    beliefTitle: "W co wierzymy",
    beliefBody:
      "Kreatywnosc czlowieka jest najwazniejsza. Roxy przejmuje powtarzalne zadania, harmonogramy i petle reakcji, aby zespoly mogly skupic sie na strategii.",
    roxyTitle: "Co oznacza RoxStreamAI",
    roxyBody:
      "RoxStreamAI oznacza Roxy AI Streamer. Roxy to nasz pierwszy stworzony charakter, ktory doprowadzil do powstania RoxStreamAI. Byla poczatkiem naszej dlugiej historii.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Zaplanujmy twoj nastepny format live",
    subtitle: "Opowiedz o celach streamu, a przygotujemy plan uruchomienia.",
    firstName: "Imie",
    lastName: "Nazwisko",
    email: "Email sluzbowy",
    message: "Co chcesz zautomatyzowac w RoxStreamAI?",
    sendRequest: "Wyslij zapytanie",
    directLines: "Bezposredni kontakt",
    responseTime: "Odpowiadamy w ciagu 1 dnia roboczego.",
  },
  terms: {
    title: "Warunki",
    intro:
      "Te warunki reguluja korzystanie z RoxStreamAI, w tym strony, dashboardu i aplikacji desktopowej. Zakladajac konto, akceptujesz warunki.",
    sections: [
      { title: "Konta", body: "Odpowiadasz za dane logowania i wszystkie dzialania w swoim koncie." },
      { title: "Zasady uzycia", body: "Korzystaj zgodnie z prawem i regulaminami platform. Naduzycia sa zabronione." },
      { title: "Dostawcy i BYOK", body: "Przy wbudowanych dostawcach RoxStreamAI moze przekazywac zapytania do podmiotow trzecich. Przy BYOK odpowiadasz za wlasne klucze i rozliczenia." },
      { title: "Rozliczenia", body: "Platne plany odnawiaja sie automatycznie. Mogly byc naliczane oplaty za uzycie i dodatki." },
      { title: "Tresci", body: "Zachowujesz prawa do tresci. Przetwarzamy je tylko w celu swiadczenia i ulepszania uslugi." },
      { title: "Dostepnosc", body: "Dbamy o wysoka dostepnosc, ale nie gwarantujemy braku przerw. Konserwacje i awarie moga sie zdarzyc." },
      { title: "Zakonczenie", body: "Mozemy zawiesic dostep przy naruszeniach. Subskrypcje mozna anulowac w panelu." },
    ],
  },
  privacy: {
    title: "Prywatnosc",
    intro:
      "Ta polityka wyjasnia, jakie dane zbieramy, jak je wykorzystujemy i jakie masz wybory.",
    sections: [
      { title: "Jakie dane zbieramy", body: "Email konta, metryki uzycia (Active Speech, sesje) oraz opcjonalna diagnostyka urzadzenia (jesli zdecydujesz sie udostepnic)." },
      { title: "Jak wykorzystujemy dane", body: "Do swiadczenia uslugi, zabezpieczen konta, pomiaru uzycia, wsparcia i poprawy niezawodnosci." },
      { title: "Dostawcy", body: "Czesc funkcji opiera sie na dostawcach zewnetrznych (glos i modele)." },
      { title: "Nie sprzedajemy danych", body: "Nie sprzedajemy danych osobowych." },
      { title: "Bezpieczenstwo", body: "Stosujemy kontrole dostepu i redakcje w celu ochrony sekretow." },
    ],
  },
  useCases: {
    eyebrow: "Przypadki uzycia",
    title: "Przypadki uzycia",
    subtitle:
      "Realne formaty, dla ktorych powstal RoxStreamAI - postacie, sceny i interaktywne triggery. AI hosting jest opcjonalny.",
    items: [
      {
        id: "24-7-host",
        title: "AI host 24/7",
        description:
          "Utrzymuj stala obecnosci dzieki kontrolowanemu Active Speech. Idealne dla kanalow 24/7 i roznych stref czasowych.",
        highlights: ["Kontrolowany Active Speech", "Przewidywalny koszt", "Formaty 24/7"],
      },
      {
        id: "battle-formats",
        title: "Formaty battle i eventowe",
        description:
          "Uruchamiaj scenariusze, reakcje czasowe i triggery eventowe. Utrzymuj tempo pod presja.",
        highlights: ["Segmenty scenariuszowe", "Reakcje czasowe", "Triggery eventowe"],
      },
      {
        id: "multi-language",
        title: "Streamy wielojezyczne",
        description:
          "Jedna postac, wiele jezykow. Zmieniaj dostawce glosu i modelu dla jezyka lub regionu.",
        highlights: ["Jedna persona", "Wiele jezykow", "Przelaczanie dostawcow"],
      },
      {
        id: "unreal-avatar",
        title: "Streamy z awatarem Unreal",
        description:
          "Uzyj Desktop App, aby polaczyc Unreal i streamowac postac w czasie rzeczywistym.",
        highlights: ["Procesy Desktop App", "Polaczenie z Unreal", "Awatar w czasie rzeczywistym"],
      },
      {
        id: "team-workflows",
        title: "Procesy zespolowe",
        description:
          "Zarzadzaj postaciami, zuzyciem i dostepem w zespole. Narzedzia admina chronia klucze i rozliczenia.",
        highlights: ["Narzędzia admina", "Zarzadzanie kluczami", "Widocznosc audytu"],
      },
    ],
    outcomes: {
      eyebrow: "Rezultaty",
      title: "Co zyskuja zespoly",
      subtitle: "Jasne limity, przewidywalny koszt i widocznosc operacyjna.",
      items: [
        { title: "Przewidywalne wydatki", description: "Kontrola Active Speech i wyboru dostawcow utrzymuje koszty w ryzach." },
        { title: "Szybszy start", description: "Zbuduj postac, wybierz dostawcow i uruchom bez zlozonego procesu." },
        { title: "Jasna diagnostyka", description: "Statusy pomagaja debugowac backend, audio, tokeny i konektory." },
      ],
    },
    cta: {
      title: "Gotowy, by zaczac?",
      subtitle: "Pobierz Desktop App lub sprawdz cennik.",
      primary: "Pobierz demo",
      secondary: "Zobacz ceny",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Dokumentacja",
      title: "Dokumentacja",
      subtitle: "Skonfiguruj postac, sceny i interaktywne triggery.",
      steps: [
        { id: "create-character", title: "Utworz postac", description: "Stworz pierwsza postac, aby odblokowac streaming i eksport do Unreal." },
        { id: "pick-providers", title: "Wybierz dostawcow glosu i modelu", description: "Wybierz dostawcow wg budzetu, latencji i jakosci. Opcje wbudowane i BYOK." },
        { id: "set-limits", title: "Ustaw limity AI speech (opcjonalnie)", description: "Zachowaj przewidywalnosc kosztow, gdy wlaczasz AI co-host." },
        { id: "connect-unreal", title: "Polacz Unreal przez Desktop App", description: "Uzyj Desktop App do polaczenia z Unreal, eksportu i lokalnej diagnostyki." },
        { id: "go-live", title: "Wejdz na live i monitoruj sesje", description: "Uruchom sesje i sledz Active Speech oraz zuzycie dostawcow." },
      ],
    },
    product: {
      eyebrow: "Sekcje",
      title: "Co mozna skonfigurowac",
      subtitle: "Kluczowe obszary dashboardu i Desktop App.",
      items: [
        { id: "characters", title: "Postacie i presety", description: "Tworz profile person z jezykami, tonem, zasadami bezpieczenstwa i presetami zachowan." },
        { id: "providers", title: "Dostawcy glosu i modelu", description: "Przelaczaj dostawcow LLM i TTS wg budzetu, latencji i jakosci. Wbudowane i BYOK." },
        { id: "active-speech", title: "Kontrola Active Speech", description: "Ustawiaj limity aktywnej mowy i harmonogramy, aby przewidywac koszty." },
        { id: "dono-rules", title: "Reguly Dono", description: "Mapuj prezenty na reakcje, skrypty i sceny z cooldownami i priorytetami." },
        { id: "scripts", title: "Skrypty", description: "Scenariusze intro, przerwy i segmenty eventowe w wielu jezykach." },
        { id: "unreal", title: "Unreal Connector", description: "Eksportuj postacie i uruchom proces awatara w czasie rzeczywistym." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Przeglad referencji",
      subtitle: "Strukturalne endpointy do integracji i analityki.",
      sections: [
        { title: "Uwierzytelnianie", description: "Uzywaj kluczy projektu z dashboardu. Zapytania sa autoryzowane przez bearer token.", items: ["POST /auth/token — wymiana klucza API na session token", "POST /auth/refresh — odswiezenie session token"] },
        { title: "Postacie", description: "Tworz, aktualizuj i wersjonuj profile postaci dla sesji live.", items: ["GET /characters — lista postaci", "POST /characters — utworz postac", "PATCH /characters/{id} — aktualizuj persone"] },
        { title: "Sesje", description: "Uruchamiaj i zatrzymuj sesje, sprawdzaj metryki i pobieraj transkrypty.", items: ["POST /sessions/start — start sesji", "POST /sessions/stop — stop sesji", "GET /sessions/{id} — szczegoly sesji"] },
        { title: "Zdarzenia", description: "Subskrybuj reakcje na prezenty, zdarzenia skryptowe i sygnaly moderacji.", items: ["GET /events/stream — server-sent events", "POST /webhooks — rejestracja webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Slownik",
      title: "Kluczowe pojecia",
      subtitle: "Krotkie definicje z dashboardu.",
      items: [
        { term: "Godziny aktywnej mowy", description: "Minuty, w ktorych Roxy generuje i odtwarza TTS. Cisza sie nie liczy." },
        { term: "Silnik Dono", description: "Reguly mapujace prezenty na emocje, kwestie, akcje, cooldowny i priorytety." },
        { term: "Skrypty streamu", description: "Scenariusze intro, petle, mini-gry i battle mode." },
        { term: "Pakiet wiedzy", description: "Wlasne fakty utrzymujace osobe spojnna i zgodna z marka." },
        { term: "Watermark", description: "Znak wizualny, ktory mozna wylaczyc w Pro i Studio." },
        { term: "Kolejka wielokontowa", description: "Zaplanowana rotacja wielu kont TikTok dla streamingu 24/7." },
      ],
    },
  },
  pricing: {
    eyebrow: "Cennik",
    title: "Ceny, ktore skaluja sie z twoim streamingiem",
    subtitle: "BYOK dla pelnej kontroli lub kredyty Pro typu plug-and-play.",
    comparisonTitle: "Porownanie planow",
    comparisonHeaders: ["Funkcja", "Trial", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Uwzglednione godziny aktywnej mowy", values: ["60 min", "Bez limitu (BYOK)", "10 godzin", "40 godzin"] },
      { label: "Watermark", values: ["Wlaczony", "Wlaczony", "Przelaczany", "Przelaczany"] },
      { label: "Konta", values: ["1", "1", "Do 5", "Do 20"] },
      { label: "Reguly Dono", values: ["10", "20", "200", "1000"] },
      { label: "Skrypty", values: ["2", "3", "Bez limitu", "Bez limitu + zaawansowane"] },
      { label: "Pozycje wiedzy", values: ["-", "3", "20", "200"] },
      { label: "Retencja logow", values: ["3 dni", "7 dni", "30 dni", "90 dni"] },
      { label: "Miejsca w zespole", values: ["-", "-", "-", "5"] },
      { label: "Licencja komercyjna", values: ["-", "-", "-", "Tak"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Dodatkowe kredyty",
    extraCreditsSubtitle: "Kup wiecej godzin aktywnej mowy, gdy limit zostanie osiagniety.",
    extraCredits: [
      { label: "+10 godzin", price: "€25" },
      { label: "+50 godzin", price: "€99" },
      { label: "+200 godzin", price: "€299" },
    ],
    addonTitle: "Pakiet Unreal Connector",
    addonBadge: "Dodatek",
    addonDescription: "Unreal Live Connector, triggery lip-sync, przykladowe sceny UE i mapowanie akcji dla silnika Dono.",
    addonPrices: [
      { label: "Miesiecznie", price: "€49 / mies." },
      { label: "Na zawsze", price: "€299" },
    ],
    addonCta: "Zarzadzaj dodatkami",
    faqEyebrow: "FAQ",
    faqTitle: "Szybkie odpowiedzi",
    faqSubtitle: "Prosty przewodnik po planach.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Aktualnosci, przypadki uzycia i premiery",
    subtitle: "Nowosci produktowe, playbooki wzrostu i realne formaty streamow.",
    backToBlog: "Wroc do bloga",
  },
  team: {
    eyebrow: "Zespol",
    title: "Zespol RoxStreamAI",
    subtitle: "Skoncentrowany zespol od operacji streamingowych, AI i projektowania produktu.",
    members: [
      { name: "Lia Chen", role: "Produkt i Growth", focus: "Narzędzia dla tworcow, onboarding i strategia cen." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Systemy realtime, skrypty streamu i niezawodnosc platformy." },
      { name: "Sofia Kim", role: "Design Lead", focus: "System marki, UI kit i nowe procesy w dashboardzie." },
    ],
    values: {
      eyebrow: "Wartosci",
      title: "Jak pracujemy",
      subtitle: "Zasady, ktore prowadza rozwoj produktu.",
      items: [
        { title: "Creator-first", description: "Budujemy narzedzia, ktore usuwaja tarcie, by twórcy mogli skupic sie na formatach i storytellingu." },
        { title: "Jasnosc operacyjna", description: "Analityka, procesy i skrypty do szybkich decyzji i powtarzalnego wzrostu." },
        { title: "Bezpieczenstwo domyslne", description: "Kazdy proces zawiera zasady moderacji, limity tempa i zabezpieczenia przed skalowaniem." },
      ],
    },
    cta: {
      title: "Chcesz wspolpracowac?",
      subtitle: "Partnerstwa, integracje lub wczesny dostep - porozmawiajmy.",
      primary: "Kontakt",
      secondary: "Czytaj aktualnosci",
    },
  },
  download: {
    eyebrow: "Pobieranie",
    title: "Najnowsza wersja Desktop",
    subtitle: "Wybierz platforme. Wydania sa zarzadzane przez adminow.",
    latestLabel: "Najnowsza",
    noReleases: "Brak wydan. Popros admina o pierwsze buildy Windows/macOS w panelu.",
    openAdmin: "Otworz wydania admina",
    releaseHistory: "Historia wydan",
    download: "Pobierz",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Test" : card.name,
    description:
      card.description === "Preview"
        ? "Podglad"
        : card.description === "Best value"
          ? "Najlepsza opcja"
          : card.description === "For teams"
            ? "Dla zespolow"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minut")
      .replace("hours", "godzin")
      .replace("Unlimited", "Bez limitu"),
    cta: card.cta
      .replace("Start Trial", "Rozpocznij test")
      .replace("Choose", "Wybierz"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "konto")
        .replace("Dono rules", "Zasady Dono")
        .replace("Scripts", "Skrypty")
        .replace("Watermark always on", "Znak wodny zawsze wlaczony")
        .replace("Logs", "Logi")
        .replace("Credits + BYOK", "Kredyty + BYOK")
        .replace("Auto language", "Auto jezyk")
        .replace("Export/Import", "Eksport/Import")
        .replace("Knowledge pack", "Pakiet wiedzy")
        .replace("Team seats", "Miejsca w zespole")
        .replace("Commercial license", "Licencja komercyjna")
        .replace("Advanced scripts", "Zaawansowane skrypty")
    ),
  })),
  faqs: [
    { q: "Czy potrzebuje kluczy API?", a: "Basic uzywa BYOK. Pro/Studio zawieraja kredyty." },
    { q: "Co to sa godziny aktywnej mowy?", a: "Tylko czas, gdy Roxy mowi." },
    { q: "Czy moge wylaczyc watermark?", a: "Basic/Test: nie. Pro/Studio: tak." },
    { q: "Czy to gwarantuje przychody?", a: "Nie, zalezy od tresci i publicznosci." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Przypadki marek z postaciami AI",
      summary: "Kampanie 24/7 i interaktywne postacie AI dla marek.",
      date: "2026-01-12",
      category: "Przypadki uzycia",
      readingTime: "6 min",
      content: [
        "AI streamerzy pozwalaja uruchamiac formaty live bez ludzkiego hosta.",
        "Zacznij od glownej postaci i dodaj pakiety wiedzy, by utrzymac odpowiedzi zgodne z marka.",
        "Harmonogram wielokontowy utrzymuje regionalne kanaly aktywne 24/7.",
        "Zacznij od postaci hero i powiaz reguly Dono z wydarzeniami kampanii.",
        "Agencje korzystaja z harmonogramu wielokontowego, by utrzymac regiony 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Poznaj RoxStreamAI",
      summary: "Od persony do sesji live w kilka minut.",
      date: "2026-01-08",
      category: "Produkt",
      readingTime: "5 min",
      content: [
        "RoxStreamAI uruchamia streamerow AI w kilka minut: polacz konto, ustaw personę i idz na live.",
        "Dlugie sesje z bezpiecznym tempem, moderacja i harmonogram.",
        "Pro zawiera kredyty; BYOK pozwala uzywac wlasnych modeli i glosow.",
        "Ustaw limity Active Speech, aby koszty byly przewidywalne.",
        "Workflow desktop pomaga w eksporcie i diagnostyce.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Stosy automatyzacji dla 24/7",
      summary: "Skrypty, moderacja i petle reakcji dla wysokiego zaangazowania.",
      date: "2025-12-20",
      category: "Poradniki",
      readingTime: "7 min",
      content: [
        "Format 24/7 potrzebuje struktury, reakcji i zabezpieczen.",
        "Mapuj donacje na reakcje z priorytetami i cooldownami.",
        "Ustaw zabezpieczenia i reczny override.",
        "Skrypty i priorytety utrzymuja tempo bez przeciazenia chatu.",
      ],
    },
  ],
};

const cs: MarketingContent = {
  ...en,
  about: {
    eyebrow: "O RoxStreamAI",
    title: "Roxy pro 24/7 tvurce",
    subtitle: "Premium automatizace, bezpecna a plne riditelna.",
    missionTitle: "Mise",
    missionBody:
      "Dat tvurcum vyladeny AI co-host, ktery vede formaty, reaguje na darky a drzi pozornost napric casovymi pasmy.",
    beliefTitle: "V co verime",
    beliefBody:
      "Lidska kreativita je na prvnim miste. Roxy se stara o rutinu, planovani a reakce, aby se tymy soustredily na strategii.",
    roxyTitle: "Co znamena RoxStreamAI",
    roxyBody:
      "RoxStreamAI znamena Roxy AI Streamer. Roxy je nas prvni vytvoreny charakter, ktery vedl ke vzniku RoxStreamAI. Byla zacatkem naseho dlouheho pribehu.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Naplanme vas dalsi live format",
    subtitle: "Reknete nam cile streamu a pripravime plan spusteni.",
    firstName: "Jmeno",
    lastName: "Prijmeni",
    email: "Pracovni email",
    message: "Co chcete v RoxStreamAI automatizovat?",
    sendRequest: "Odeslat zadost",
    directLines: "Primy kontakt",
    responseTime: "Odpovidame do 1 pracovniho dne.",
  },
  terms: {
    title: "Podminky",
    intro:
      "Tyto podminky upravuji pouzivani RoxStreamAI, vcetne webu, dashboardu a desktop aplikace. Vytvorenim uctu souhlasite s podminkami.",
    sections: [
      { title: "Ucty", body: "Odpovidate za sve pristupove udaje a vsechny aktivity v uctu." },
      { title: "Pouziti", body: "Pouzivejte sluzbu v souladu se zakony a pravidly platform. Zneuziti je zakazano." },
      { title: "Poskytovatele a BYOK", body: "Pri pouziti vestavenych poskytovatelu muze RoxStreamAI predavat pozadavky tretim stranam. U BYOK odpovidate za klice a fakturaci u poskytovatele." },
      { title: "Fakturace", body: "Placene plany se automaticky obnovuji. Mohou platit poplatky za spotrebu a add-ony." },
      { title: "Obsah", body: "Vlastnite svuj obsah. Zpracovavame jej jen pro poskytovani a zlepsovani sluzby." },
      { title: "Dostupnost", body: "Smerujeme k vysoke dostupnosti, ale negarantujeme bezvypadkovy provoz." },
      { title: "Ukonceni", body: "Pri poruseni podminek muzeme pristup omezit. Plan lze zrusit v dashboardu." },
    ],
  },
  privacy: {
    title: "Soukromi",
    intro:
      "Tato politika vysvetluje, jaka data sberame, jak je pouzivame a vase moznosti.",
    sections: [
      { title: "Sbirana data", body: "Email uctu, metriky pouziti (Active Speech, relace) a volitelna diagnostika zarizeni (pokud ji sdilite)." },
      { title: "Jak data pouzivame", body: "Pro poskytovani sluzby, zabezpeceni uctu, merene spotreby, podporu a zlepseni spolehlivosti." },
      { title: "Poskytovatele", body: "Nektere funkce zavisi na poskytovatelich tretich stran (hlas a modely)." },
      { title: "Data neprodavame", body: "Osobni data neprodavame." },
      { title: "Bezpecnost", body: "Pouzivame kontrolu pristupu a redakci tajemstvi." },
    ],
  },
  useCases: {
    eyebrow: "Priklady pouziti",
    title: "Priklady pouziti",
    subtitle:
      "Realne formaty, pro ktere je RoxStreamAI urceno - postavy, sceny a interaktivni triggery. AI hosting je volitelny.",
    items: [
      {
        id: "24-7-host",
        title: "AI host 24/7",
        description:
          "Drzte stabilni pritomnost s kontrolovanym Active Speech. Idealni pro kanaly 24/7 a ruzna casova pasma.",
        highlights: ["Kontrolovany Active Speech", "Predvidatelny naklad", "Formaty 24/7"],
      },
      {
        id: "battle-formats",
        title: "Battle a event formaty",
        description:
          "Spoustejte skriptovane segmenty, casovane reakce a event triggery. Udrzte tempo pod tlakem.",
        highlights: ["Skriptovane segmenty", "Casovane reakce", "Event triggery"],
      },
      {
        id: "multi-language",
        title: "Multijazycne streamy",
        description:
          "Jedna postava, vice jazyku. Prepinejte hlasove a modelove poskytovatele podle jazyka nebo regionu.",
        highlights: ["Jedna persona", "Vice jazyku", "Prepinani poskytovatelu"],
      },
      {
        id: "unreal-avatar",
        title: "Unreal avatar streamy",
        description:
          "Pouzijte Desktop App pro spojeni s Unreal a streamujte postavu v realnem case.",
        highlights: ["Postupy Desktop App", "Unreal propojeni", "Avatar v realnem case"],
      },
      {
        id: "team-workflows",
        title: "Tymove procesy",
        description:
          "Spravujte postavy, spotrebu a pristupy v tymu. Admin nastroje chrani klice a fakturaci.",
        highlights: ["Admin nastroje", "Sprava klicu", "Auditni prehled"],
      },
    ],
    outcomes: {
      eyebrow: "Vysledky",
      title: "Co tymy ziskaji",
      subtitle: "Jasne limity, predvidatelne naklady a operacni prehled.",
      items: [
        { title: "Predvidatelne vydaje", description: "Kontrola Active Speech a volby poskytovatelu drzi spotrebu stabilni." },
        { title: "Rychlejsi start", description: "Vytvorte postavu, zvolte poskytovatele a spustte bez sloziteho procesu." },
        { title: "Jasna diagnostika", description: "Stavove indikatory pomahaji ladit backend, audio, tokeny a konektory." },
      ],
    },
    cta: {
      title: "Pripraveni zacit?",
      subtitle: "Stahnete Desktop App nebo si prohlednete ceny.",
      primary: "Stahnout demo",
      secondary: "Zobrazit ceny",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Dokumentace",
      title: "Dokumentace",
      subtitle: "Nastavte postavu, sceny a interaktivni triggery.",
      steps: [
        { id: "create-character", title: "Vytvorte postavu", description: "Vytvorte prvni postavu a odemknete streaming a export do Unreal." },
        { id: "pick-providers", title: "Vyberte hlasove a modelove poskytovatele", description: "Volte podle rozpoctu, latence a kvality. Vestavene moznosti i BYOK." },
        { id: "set-limits", title: "Nastavte limity AI speech (volitelne)", description: "Udrzte predvidatelnost spotreby pri zapnuti AI co-hosta." },
        { id: "connect-unreal", title: "Pripojte Unreal pres Desktop App", description: "Desktop App slouzi pro propojeni s Unreal, export a lokalni diagnostiku." },
        { id: "go-live", title: "Spustte live a spravujte relace", description: "Spustte relaci a sledujte Active Speech a spotrebu poskytovatelu." },
      ],
    },
    product: {
      eyebrow: "Sekce",
      title: "Co muzete nastavit",
      subtitle: "Klicove oblasti dashboardu a Desktop App.",
      items: [
        { id: "characters", title: "Postavy a presety", description: "Tvorba person s jazyky, tonem, bezpecnostnimi pravidly a presety chovani." },
        { id: "providers", title: "Hlasovi a modelovi poskytovatele", description: "Prepinani LLM a TTS podle rozpoctu, latence a kvality. Vestavene moznosti i BYOK." },
        { id: "active-speech", title: "Kontrola Active Speech", description: "Nastavte limity aktivni reci a planovani pro predvidatelne naklady." },
        { id: "dono-rules", title: "Dono pravidla", description: "Mapujte darky na reakce, skripty a sceny s cooldowny a prioritami." },
        { id: "scripts", title: "Skripty", description: "Scenare intro, pauz a event segmentu ve vice jazycich." },
        { id: "unreal", title: "Unreal Connector", description: "Export postav a real-time avatar proces." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Prehled reference",
      subtitle: "Strukturovane endpointy pro integrace a analytiku.",
      sections: [
        { title: "Autentizace", description: "Pouzijte projektove klice z dashboardu. Pozadavky se autorizuji bearer tokenem.", items: ["POST /auth/token — vymena API klice za session token", "POST /auth/refresh — obnoveni session tokenu"] },
        { title: "Postavy", description: "Vytvarejte, aktualizujte a verzujte profily postav pro live relace.", items: ["GET /characters — seznam postav", "POST /characters — vytvorit postavu", "PATCH /characters/{id} — aktualizovat personu"] },
        { title: "Relace", description: "Spoustejte nebo zastavujte relace, kontrolujte metriky a ziskavejte prepisy.", items: ["POST /sessions/start — start relace", "POST /sessions/stop — stop relace", "GET /sessions/{id} — detaily relace"] },
        { title: "Udalosti", description: "Odebirejte reakce na darky, skriptovane udalosti a signaly moderace.", items: ["GET /events/stream — server-sent events", "POST /webhooks — registrace webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Slovnik",
      title: "Klicove pojmy",
      subtitle: "Kratke definice z dashboardu.",
      items: [
        { term: "Hodiny aktivni reci", description: "Minuty, kdy Roxy generuje a prehrava TTS. Ticho se nepocita." },
        { term: "Motor Dono", description: "Pravidla mapujici darky na emoce, hlasky, akce, cooldowny a priority." },
        { term: "Skripty streamu", description: "Scenare intro, loopu, mini-her a battle mode." },
        { term: "Balicek znalosti", description: "Vlastni fakta, ktera drzi personu konzistentni a v souladu s brandem." },
        { term: "Watermark", description: "Vizualni znacka, ktera lze vypnout v Pro/Studio." },
        { term: "Fronta vice uctu", description: "Planovana rotace vice TikTok uctu pro streaming 24/7." },
      ],
    },
  },
  pricing: {
    eyebrow: "Cenik",
    title: "Ceny, ktere skaluji s vasim streamingem",
    subtitle: "BYOK pro plnou kontrolu nebo Pro kredity plug-and-play.",
    comparisonTitle: "Srovnani planu",
    comparisonHeaders: ["Funkce", "Trial", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Zahrnute hodiny aktivni reci", values: ["60 min", "Neomezene (BYOK)", "10 hodin", "40 hodin"] },
      { label: "Watermark", values: ["Zapnuto", "Zapnuto", "Prepinatelne", "Prepinatelne"] },
      { label: "Ucty", values: ["1", "1", "Az 5", "Az 20"] },
      { label: "Dono pravidla", values: ["10", "20", "200", "1000"] },
      { label: "Skripty", values: ["2", "3", "Neomezene", "Neomezene + pokrocile"] },
      { label: "Polozky znalosti", values: ["-", "3", "20", "200"] },
      { label: "Retence logu", values: ["3 dny", "7 dni", "30 dni", "90 dni"] },
      { label: "Tymova mista", values: ["-", "-", "-", "5"] },
      { label: "Komercni licence", values: ["-", "-", "-", "Ano"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Extra kredity",
    extraCreditsSubtitle: "Kupte vice hodin aktivni reci po dosazeni limitu.",
    extraCredits: [
      { label: "+10 hodin", price: "€25" },
      { label: "+50 hodin", price: "€99" },
      { label: "+200 hodin", price: "€299" },
    ],
    addonTitle: "Unreal Connector balicek",
    addonBadge: "Add-on",
    addonDescription: "Unreal Live Connector, lip-sync triggery, ukazkove UE sceny a mapovani akci pro motor Dono.",
    addonPrices: [
      { label: "Mesicne", price: "€49 / mesic" },
      { label: "Lifetime", price: "€299" },
    ],
    addonCta: "Spravovat add-ony",
    faqEyebrow: "FAQ",
    faqTitle: "Rychle odpovedi",
    faqSubtitle: "Plany jednoduse.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Aktualizace, priklady pouziti a launch poznamky",
    subtitle: "Produktove novinky, growth playbooky a realne stream formaty.",
    backToBlog: "Zpet na blog",
  },
  team: {
    eyebrow: "Tym",
    title: "Tym za RoxStreamAI",
    subtitle: "Fokusovany tym na streaming ops, AI systemy a produktovy design.",
    members: [
      { name: "Lia Chen", role: "Produkt a Growth", focus: "Nastroje pro tvurce, onboarding a cenova strategie." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Realtime systemy, skripty streamu a spolehlivost platformy." },
      { name: "Sofia Kim", role: "Design Lead", focus: "System znacky, UI kity a nove postupy v dashboardu." },
    ],
    values: {
      eyebrow: "Hodnoty",
      title: "Jak pracujeme",
      subtitle: "Principy, ktere formuji produktova rozhodnuti.",
      items: [
        { title: "Creator-first", description: "Stavime nastroje, ktere odstranuji frikci, aby se tvurci soustredili na formaty a storytelling." },
        { title: "Operacni jasnost", description: "Analytika, procesy a skripty pro rychla rozhodnuti a opakovatelny rust." },
        { title: "Bezpecnost by default", description: "Kazdy proces obsahuje moderacni pravidla, rate limity a bezpecnostni ochrany pred skaloanim." },
      ],
    },
    cta: {
      title: "Chcete spolupracovat?",
      subtitle: "Partnerstvi, integrace nebo early access - pojdme mluvit.",
      primary: "Kontakt",
      secondary: "Cist aktualizace",
    },
  },
  download: {
    eyebrow: "Stazeni",
    title: "Nejnovejsi desktop verze",
    subtitle: "Vyberte platformu. Releasy spravuje admin tym.",
    latestLabel: "Nejnovejsi",
    noReleases: "Zatim zadne releasy. Pozadejte admina o prvni buildy Windows/macOS v admin panelu.",
    openAdmin: "Otevrit admin releasy",
    releaseHistory: "Historie releasu",
    download: "Stahnout",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Test" : card.name,
    description:
      card.description === "Preview"
        ? "Nahled"
        : card.description === "Best value"
          ? "Nejlepsi pomer"
          : card.description === "For teams"
            ? "Pro tymy"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minut")
      .replace("hours", "hodin")
      .replace("Unlimited", "Neomezene"),
    cta: card.cta
      .replace("Start Trial", "Zacit test")
      .replace("Choose", "Vybrat"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "ucet")
        .replace("Dono rules", "Dono pravidla")
        .replace("Scripts", "Skripty")
        .replace("Watermark always on", "Watermark vzdy zapnuty")
        .replace("Logs", "Logy")
        .replace("Credits + BYOK", "Kredity + BYOK")
        .replace("Auto language", "Auto jazyk")
        .replace("Export/Import", "Export/Import")
        .replace("Knowledge pack", "Balicek znalosti")
        .replace("Team seats", "Tymova mista")
        .replace("Commercial license", "Komericni licence")
        .replace("Advanced scripts", "Pokrocile skripty")
    ),
  })),
  faqs: [
    { q: "Potrebuji API klice?", a: "Basic pouziva BYOK. Pro/Studio obsahuje kredity." },
    { q: "Co jsou hodiny aktivni reci?", a: "Pouze cas, kdy Roxy mluvi." },
    { q: "Lze vypnout watermark?", a: "Basic/Trial: ne. Pro/Studio: ano." },
    { q: "Zarucuje to prijmy?", a: "Ne, zalezi na obsahu a publiku." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Priklady pouziti znacek s AI postavami",
      summary: "Kampane 24/7 a interaktivni AI postavy pro znacky.",
      date: "2026-01-12",
      category: "Priklady pouziti",
      readingTime: "6 min",
      content: [
        "AI streameri umoznuji live formaty bez lidskeho hosta.",
        "Zacnete hlavni postavou a pridejte balicky znalosti pro konzistenci odpovedi.",
        "Planovac vice uctu udrzuje regionalni kanaly aktivni 24/7.",
        "Zacnete s hero postavou a napojte Dono pravidla na kampanove udalosti.",
        "Agentury vyuzivaji planovani vice uctu pro regionalni 24/7 pokryti.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Predstavujeme RoxStreamAI",
      summary: "Od persony k live relaci behem minut.",
      date: "2026-01-08",
      category: "Produkt",
      readingTime: "5 min",
      content: [
        "RoxStreamAI spusti AI streamery behem minut: pripojte ucet, nastavte personu a jdete live.",
        "Zamereno na dlouhe relace: bezpecne tempo, moderace a planovac.",
        "Pro obsahuje kredity; BYOK umozni vlastni modely a hlasy.",
        "Nastavte limity Active Speech, aby byly naklady predvidatelne.",
        "Workflow pro desktop pomaha s exportem a diagnostikou.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Automatizacni stacky pro 24/7",
      summary: "Skripty, moderace a reakce pro vysoke zapojeni.",
      date: "2025-12-20",
      category: "Prirucky",
      readingTime: "7 min",
      content: [
        "Format 24/7 potrebuje strukturu, reakce a bezpecnostni kontroly.",
        "Mapujte donace na reakce s prioritami a cooldowny.",
        "Nastavte bezpecnostni ochrany a rucni override.",
        "Skripty a priority drzi tempo bez pretizeni chatu.",
      ],
    },
  ],
};

const sk: MarketingContent = {
  ...en,
  about: {
    eyebrow: "O RoxStreamAI",
    title: "Roxy pre 24/7 tvorcov",
    subtitle: "Premium automatizacia, bezpecna a plne ovladatelna.",
    missionTitle: "Misia",
    missionBody:
      "Dat tvorcom vyladeny AI co-host, ktory vedie formaty, reaguje na dary a udrziava pozornost napriec casovymi pasmami.",
    beliefTitle: "V com verime",
    beliefBody:
      "Ludska kreativita je prva. Roxy prebera rutinu, planovanie a reakcie, aby sa timy sustredili na strategiu.",
    roxyTitle: "Co znamena RoxStreamAI",
    roxyBody:
      "RoxStreamAI znamena Roxy AI Streamer. Roxy je nas prvy vytvoreny charakter, ktory viedol ku vzniku RoxStreamAI. Bola zaciatkom nasho dlheho pribehu.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Naplanujme vas dalsi live format",
    subtitle: "Povedzte nam ciele streamu a pripravime plan spustenia.",
    firstName: "Meno",
    lastName: "Priezvisko",
    email: "Pracovny email",
    message: "Co chcete v RoxStreamAI automatizovat?",
    sendRequest: "Odoslat poziadavku",
    directLines: "Priamy kontakt",
    responseTime: "Odpovedame do 1 pracovneho dna.",
  },
  terms: {
    title: "Podmienky",
    intro:
      "Tieto podmienky upravuju pouzivanie RoxStreamAI, vratane webu, dashboardu a desktop aplikacie. Vytvorenim uctu suhlasite s podmienkami.",
    sections: [
      { title: "Ucty", body: "Zodpovedate za pristupove udaje a vsetky aktivity v ucte." },
      { title: "Pouzitie", body: "Pouzivajte sluzbu v sulade so zakonmi a pravidlami platform. Zneuzitie je zakazane." },
      { title: "Poskytovatelia a BYOK", body: "Pri vstavaných poskytovateloch RoxStreamAI moze odosielat poziadavky tretim stranam. Pri BYOK zodpovedate za kluce a fakturaciu u poskytovatela." },
      { title: "Fakturacia", body: "Platene plany sa automaticky obnovuju. Môzu platit poplatky za spotrebu a add-ony." },
      { title: "Obsah", body: "Vlastnite svoj obsah. Spracuvame ho len na poskytovanie a zlepsovanie sluzby." },
      { title: "Dostupnost", body: "Snazime sa o vysoku dostupnost, no negarantujeme nepreruseny provoz." },
      { title: "Ukoncenie", body: "Pri poruseni podmienok mozeme pristup obmedzit. Plan zrusite v dashboarde." },
    ],
  },
  privacy: {
    title: "Sukromie",
    intro:
      "Tato politika vysvetluje, ake data zbierame, ako ich pouzivame a vase moznosti.",
    sections: [
      { title: "Zbierane data", body: "Email uctu, metriky pouzitia (Active Speech, relacie) a volitelna diagnostika zariadenia (ak ju zdielate)." },
      { title: "Ako data pouzivame", body: "Na poskytovanie sluzby, zabezpecenie uctu, meranie spotreby, podporu a zlepsovanie spolahlivosti." },
      { title: "Poskytovatelia", body: "Niektore funkcie zavisia od poskytovatelov tretich stran (hlas a modely)." },
      { title: "Data nepredavame", body: "Osobne data nepredavame." },
      { title: "Bezpecnost", body: "Pouzivame pristupove kontroly a redakciu tajomstiev." },
    ],
  },
  useCases: {
    eyebrow: "Pripady pouzitia",
    title: "Pripady pouzitia",
    subtitle:
      "Realne formaty, pre ktore je RoxStreamAI vytvorene - postavy, sceny a interaktivne triggery. AI hosting je volitelny.",
    items: [
      {
        id: "24-7-host",
        title: "AI host 24/7",
        description:
          "Udrzte stabilnu pritomnost s kontrolovanym Active Speech. Idealne pre kanaly 24/7 a rozne casove pasma.",
        highlights: ["Kontrolovany Active Speech", "Predvidatelne naklady", "Formaty 24/7"],
      },
      {
        id: "battle-formats",
        title: "Battle a event formaty",
        description:
          "Spustajte skriptovane segmenty, casovane reakcie a event triggery. Udrzte tempo pod tlakom.",
        highlights: ["Skriptovane segmenty", "Casovane reakcie", "Event triggery"],
      },
      {
        id: "multi-language",
        title: "Multijazycne streamy",
        description:
          "Jedna postava, viac jazykov. Prepinate hlasovych a modelovych poskytovatelov podla jazyka alebo regionu.",
        highlights: ["Jedna persona", "Viac jazykov", "Prepinanie poskytovatelov"],
      },
      {
        id: "unreal-avatar",
        title: "Unreal avatar streamy",
        description:
          "Pouzite Desktop App na prepojenie s Unreal a streamujte postavu v realnom case.",
        highlights: ["Postupy Desktop App", "Unreal prepojenie", "Avatar v realnom case"],
      },
      {
        id: "team-workflows",
        title: "Tymove procesy",
        description:
          "Spravujte postavy, spotrebu a pristupy v time. Admin nastroje chrania kluce a fakturaciu.",
        highlights: ["Admin nastroje", "Sprava klucov", "Auditny prehlad"],
      },
    ],
    outcomes: {
      eyebrow: "Vysledky",
      title: "Co timy ziskaju",
      subtitle: "Jasne limity, predvidatelne naklady a operacny prehlad.",
      items: [
        { title: "Predvidatelne vydaje", description: "Kontrola Active Speech a volby poskytovatelov udrzi spotrebu stabilnu." },
        { title: "Rychlejsi start", description: "Vytvorte postavu, zvolte poskytovatelov a spustite bez zloziteho procesu." },
        { title: "Jasna diagnostika", description: "Stavove indikatory pomahaju ladit backend, audio, tokeny a konektory." },
      ],
    },
    cta: {
      title: "Pripraveni zacat?",
      subtitle: "Stiahnite Desktop App alebo si pozrite ceny.",
      primary: "Stiahnut demo",
      secondary: "Zobrazit ceny",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Dokumentacia",
      title: "Dokumentacia",
      subtitle: "Nastavte postavu, sceny a interaktivne triggery.",
      steps: [
        { id: "create-character", title: "Vytvorte postavu", description: "Vytvorte prvu postavu a odomknite streaming a export do Unreal." },
        { id: "pick-providers", title: "Vyberte hlasovych a modelovych poskytovatelov", description: "Volte podla rozpoctu, latencie a kvality. Vstavane moznosti aj BYOK." },
        { id: "set-limits", title: "Nastavte limity AI speech (volitelne)", description: "Udrzte predvidatelnost spotreby pri zapnuti AI co-hosta." },
        { id: "connect-unreal", title: "Pripojte Unreal cez Desktop App", description: "Desktop App sluzi na prepojenie s Unreal, export a lokalnu diagnostiku." },
        { id: "go-live", title: "Spustite live a spravujte relacie", description: "Spustite relaciu a sledujte Active Speech a spotrebu poskytovatelov." },
      ],
    },
    product: {
      eyebrow: "Sekcie",
      title: "Co mozete nastavit",
      subtitle: "Klucove oblasti dashboardu a Desktop App.",
      items: [
        { id: "characters", title: "Postavy a presety", description: "Tvorba person s jazykmi, tonom, bezpecnostnymi pravidlami a presetmi spravania." },
        { id: "providers", title: "Hlasovi a modelovi poskytovatelia", description: "Prepinate LLM a TTS podla rozpoctu, latencie a kvality. Vstavane moznosti aj BYOK." },
        { id: "active-speech", title: "Kontrola Active Speech", description: "Nastavte limity aktivnej reci a planovanie pre predvidatelne naklady." },
        { id: "dono-rules", title: "Dono pravidla", description: "Mapujte dary na reakcie, skripty a sceny s cooldownmi a prioritami." },
        { id: "scripts", title: "Skripty", description: "Scenare intro, pauz a event segmentov vo viacerych jazykoch." },
        { id: "unreal", title: "Unreal Connector", description: "Export postav a real-time avatar proces." },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Prehlad referencie",
      subtitle: "Strukturovane endpointy pre integracie a analytiku.",
      sections: [
        { title: "Autentizacia", description: "Pouzite projektove kluce z dashboardu. Poziadavky su autorizovane bearer tokenom.", items: ["POST /auth/token — vymena API kluca za session token", "POST /auth/refresh — obnova session tokenu"] },
        { title: "Postavy", description: "Vytvarajte, aktualizujte a verzujte profily postav pre live relacie.", items: ["GET /characters — zoznam postav", "POST /characters — vytvorit postavu", "PATCH /characters/{id} — aktualizovat personu"] },
        { title: "Relacie", description: "Spustajte alebo zastavujte relacie, kontrolujte metriky a ziskavajte prepisy.", items: ["POST /sessions/start — start relacie", "POST /sessions/stop — stop relacie", "GET /sessions/{id} — detaily relacie"] },
        { title: "Udalosti", description: "Odoberajte reakcie na dary, skriptovane udalosti a signaly moderacie.", items: ["GET /events/stream — server-sent events", "POST /webhooks — registracia webhook"] },
      ],
    },
    glossary: {
      eyebrow: "Slovnik",
      title: "Klucove pojmy",
      subtitle: "Kratke definicie z dashboardu.",
      items: [
        { term: "Hodiny aktivnej reci", description: "Minuty, ked Roxy generuje a prehrava TTS. Ticho sa nepocita." },
        { term: "Motor Dono", description: "Pravidla mapujuce dary na emocie, hlasky, akcie, cooldowny a priority." },
        { term: "Skripty streamu", description: "Scenare intro, loopov, mini-hier a battle mode." },
        { term: "Balik znalosti", description: "Vlastne fakty, ktore drzia personu konzistentnu a on-brand." },
        { term: "Watermark", description: "Vizualna znacka, ktoru mozno vypnut v Pro a Studio." },
        { term: "Fronta viacerych uctov", description: "Planovana rotacia viacerych TikTok uctov pre streaming 24/7." },
      ],
    },
  },
  pricing: {
    eyebrow: "Cennik",
    title: "Ceny, ktore skaluju s vasim streamingom",
    subtitle: "BYOK pre plnu kontrolu alebo Pro kredity plug-and-play.",
    comparisonTitle: "Porovnanie planov",
    comparisonHeaders: ["Funkcia", "Trial", "Basic", "Pro", "Studio"],
    comparisonRows: [
      { label: "Zahrnute hodiny aktivnej reci", values: ["60 min", "Neobmedzene (BYOK)", "10 hodin", "40 hodin"] },
      { label: "Watermark", values: ["Zapnute", "Zapnute", "Prepinatelne", "Prepinatelne"] },
      { label: "Ucty", values: ["1", "1", "Do 5", "Do 20"] },
      { label: "Dono pravidla", values: ["10", "20", "200", "1000"] },
      { label: "Skripty", values: ["2", "3", "Neobmedzene", "Neobmedzene + pokrocile"] },
      { label: "Polozky znalosti", values: ["-", "3", "20", "200"] },
      { label: "Retencia logov", values: ["3 dni", "7 dni", "30 dni", "90 dni"] },
      { label: "Tymove miesta", values: ["-", "-", "-", "5"] },
      { label: "Komericna licencia", values: ["-", "-", "-", "Ano"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Extra kredity",
    extraCreditsSubtitle: "Kupte viac hodin aktivnej reci po dosiahnuti limitu.",
    extraCredits: [
      { label: "+10 hodin", price: "€25" },
      { label: "+50 hodin", price: "€99" },
      { label: "+200 hodin", price: "€299" },
    ],
    addonTitle: "Unreal Connector balicek",
    addonBadge: "Add-on",
    addonDescription: "Unreal Live Connector, lip-sync triggery, ukazkove UE sceny a mapovanie akcii pre motor Dono.",
    addonPrices: [
      { label: "Mesacne", price: "€49 / mesiac" },
      { label: "Lifetime", price: "€299" },
    ],
    addonCta: "Spravovat add-ony",
    faqEyebrow: "FAQ",
    faqTitle: "Rychle odpovede",
    faqSubtitle: "Jednoduche vysvetlenie planov.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Aktualizacie, pripady pouzitia a launch poznamky",
    subtitle: "Produktove novinky, growth playbooky a realne stream formaty.",
    backToBlog: "Spat na blog",
  },
  team: {
    eyebrow: "Tim",
    title: "Tim za RoxStreamAI",
    subtitle: "Zamerany tim na streaming ops, AI systemy a produktovy dizajn.",
    members: [
      { name: "Lia Chen", role: "Produkt a Growth", focus: "Nastroje pre tvorcov, onboarding a cenova strategia." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Realtime systemy, skripty streamu a spolahlivost platformy." },
      { name: "Sofia Kim", role: "Design Lead", focus: "System znacky, UI kity a nove postupy v dashboarde." },
    ],
    values: {
      eyebrow: "Hodnoty",
      title: "Ako pracujeme",
      subtitle: "Principy, ktore formuju produktove rozhodnutia.",
      items: [
        { title: "Creator-first", description: "Staviame nastroje, ktore odstraniju trenie, aby sa tvorcovia sustredili na formaty a storytelling." },
        { title: "Operacna jasnost", description: "Analytika, procesy a skripty pre rychle rozhodnutia a opakovatelny rast." },
        { title: "Bezpecnost by default", description: "Kazdy proces obsahuje moderacne pravidla, rate limity a bezpecnostne ochrany pred skaloanim." },
      ],
    },
    cta: {
      title: "Chcete spolupracovat?",
      subtitle: "Partnerstva, integracie alebo early access - porozpravajme sa.",
      primary: "Kontakt",
      secondary: "Citat aktualizacie",
    },
  },
  download: {
    eyebrow: "Stiahnutie",
    title: "Najnovsia desktop verzia",
    subtitle: "Vyberte platformu. Releasy spravuje admin tim.",
    latestLabel: "Najnovsia",
    noReleases: "Zatial ziadne releasy. Poziadajte admina o prve buildy Windows/macOS v admin paneli.",
    openAdmin: "Otvorit admin releasy",
    releaseHistory: "Historia releasov",
    download: "Stiahnut",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Test" : card.name,
    description:
      card.description === "Preview"
        ? "Nahlad"
        : card.description === "Best value"
          ? "Najlepsi pomer"
          : card.description === "For teams"
            ? "Pre timy"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minut")
      .replace("hours", "hodin")
      .replace("Unlimited", "Neobmedzene"),
    cta: card.cta
      .replace("Start Trial", "Zacat test")
      .replace("Choose", "Vybrat"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "ucet")
        .replace("Dono rules", "Dono pravidla")
        .replace("Scripts", "Skripty")
        .replace("Watermark always on", "Watermark vzdy zapnuty")
        .replace("Logs", "Logy")
        .replace("Credits + BYOK", "Kredity + BYOK")
        .replace("Auto language", "Auto jazyk")
        .replace("Export/Import", "Export/Import")
        .replace("Knowledge pack", "Balik znalosti")
        .replace("Team seats", "Tymove miesta")
        .replace("Commercial license", "Komericna licencia")
        .replace("Advanced scripts", "Pokrocile skripty")
    ),
  })),
  faqs: [
    { q: "Potrebujem API kluce?", a: "Basic pouziva BYOK. Pro/Studio obsahuje kredity." },
    { q: "Co su hodiny aktivnej reci?", a: "Iba cas, ked Roxy hovori." },
    { q: "Dá sa vypnut watermark?", a: "Basic/Trial: nie. Pro/Studio: ano." },
    { q: "Zarucuje to prijmy?", a: "Nie, zalezi na obsahu a publiku." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Pripady pouzitia znaciek s AI postavami",
      summary: "Kampane 24/7 a interaktivne AI postavy pre znacky.",
      date: "2026-01-12",
      category: "Pripady pouzitia",
      readingTime: "6 min",
      content: [
        "AI streameri umoznuju live formaty bez ludskeho hosta.",
        "Zacnite hlavnou postavou a pridajte baliky znalosti pre konzistentne odpovede.",
        "Planovac viacerych uctov udrziava regionalne kanaly aktivne 24/7.",
        "Zacnite s hero postavou a prepojte Dono pravidla s kampanovymi eventmi.",
        "Agentury vyuzivaju planovanie viacerych uctov pre regionalne 24/7 pokrytie.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Predstavujeme RoxStreamAI",
      summary: "Od persony k live relacii za niekolko minut.",
      date: "2026-01-08",
      category: "Produkt",
      readingTime: "5 min",
      content: [
        "RoxStreamAI spusti AI streamerov za par minut: pripojte ucet, nastavte personu a jdete live.",
        "Zamerane na dlhe relacie s bezpecnym tempom, moderaciou a planovacom.",
        "Pro obsahuje kredity; BYOK umoznuje vlastne modely a hlasy.",
        "Nastavte limity Active Speech, aby boli naklady predvidatelne.",
        "Workflow desktop pomaha s exportom a diagnostikou.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Automatizacne stacky pre 24/7",
      summary: "Skripty, moderacia a reakcie pre vysoke zapojenie.",
      date: "2025-12-20",
      category: "Navody",
      readingTime: "7 min",
      content: [
        "Format 24/7 potrebuje strukturu, reakcie a bezpecnostne kontroly.",
        "Mapujte donacie na reakcie s prioritami a cooldownmi.",
        "Nastavte bezpecnostne ochrany a rucny override.",
        "Skripty a priority drzia tempo bez pretazenia chatu.",
      ],
    },
  ],
};

const it: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Chi siamo",
    title: "Roxy per creator 24/7",
    subtitle: "Automazione premium, sicura e controllabile.",
    missionTitle: "La nostra missione",
    missionBody: "Un co‑host IA che gestisce gli show, reagisce ai regali e mantiene l’engagement.",
    beliefTitle: "In cosa crediamo",
    beliefBody: "La creatività umana viene prima. Roxy gestisce ripetizioni, pianificazione e loop di reazione.",
    roxyTitle: "Cosa significa RoxStreamAI",
    roxyBody:
      "RoxStreamAI sta per Roxy AI Streamer. Roxy è il nostro primo personaggio creato, che ha portato alla nascita di RoxStreamAI. È stata l'inizio della nostra lunga storia.",
  },
  contact: {
    eyebrow: "Contatto",
    title: "Pianifichiamo il tuo prossimo live",
    subtitle: "Raccontaci gli obiettivi e prepariamo il rollout.",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email lavoro",
    message: "Cosa vuoi automatizzare?",
    sendRequest: "Invia richiesta",
    directLines: "Contatti diretti",
    responseTime: "Risposta entro 1 giorno lavorativo.",
  },
  terms: {
    title: "Termini",
    intro: "Questi termini regolano l’uso di RoxStreamAI.",
    sections: [
      { title: "Account", body: "Responsabile delle credenziali." },
      { title: "Uso", body: "Rispetta regole e leggi. Abusi vietati." },
      { title: "Uso provider e BYOK", body: "Con i provider integrati RoxStreamAI può inoltrare le richieste a terzi. Con BYOK gestisci tu chiavi e fatturazione." },
      { title: "Fatturazione", body: "Rinnovo automatico. Extra possibili." },
      { title: "Contenuti", body: "Proprietà tua; elaboriamo solo per il servizio." },
      { title: "Disponibilità", body: "Puntiamo a un'alta disponibilità ma non garantiamo un servizio ininterrotto. Manutenzioni e interruzioni possono verificarsi." },
      { title: "Risoluzione", body: "Sospensione in caso di violazioni." },
    ],
  },
  privacy: {
    title: "Privacy",
    intro: "Raccogliamo solo i dati necessari al servizio.",
    sections: [
      { title: "Dati raccolti", body: "Dettagli account, metriche e configurazioni." },
      { title: "Uso dei dati", body: "Auth, sessioni, supporto, sicurezza." },
      { title: "Conservazione", body: "Dipende dal piano." },
      { title: "Controllo", body: "Export/eliminazione disponibili." },
      { title: "Sicurezza", body: "Applichiamo controlli di accesso e redazione per proteggere i segreti." },
    ],
  },
  useCases: {
    eyebrow: "Casi d’uso",
    title: "Risultati reali per live moderni",
    subtitle: "Creator, faceless e agenzie con Roxy.",
    items: [
      {
        id: "creators",
        title: "Creator",
        description:
          "Scala le ore di live senza burnout. Automatizza saluti, reazioni ai regali e intermezzi mantenendo la tua voce coerente.",
        highlights: ["Pacing 24/7 con pause sicure", "Reazioni istantanee ai regali", "Momenti da clip con script"],
      },
      {
        id: "faceless",
        title: "Faceless",
        description:
          "Lancia un canale guidato da personaggi senza mostrarti in camera. Costruisci lore e mantieni alto l’engagement.",
        highlights: ["Persona + pacchetto di conoscenze", "Controllo stile voce", "Barriere di sicurezza"],
      },
      {
        id: "agencies",
        title: "Agenzie",
        description:
          "Gestisci più creator, login e lingue da un’unica regia. Ideale per studi e operatori multi‑conto.",
        highlights: ["Pianificatore multi‑conto", "Accesso team + log attività", "Analytics centralizzate"],
      },
      {
        id: "unreal-avatar",
        title: "Stream con avatar Unreal",
        description:
          "Usa l'app desktop per connettere Unreal e trasmettere un personaggio in tempo reale.",
        highlights: ["Workflow app desktop", "Connessione Unreal", "Avatar in tempo reale"],
      },
      {
        id: "team-workflows",
        title: "Workflow di team",
        description:
          "Gestisci personaggi, consumo e accessi nel team. Gli strumenti admin proteggono chiavi e billing.",
        highlights: ["Strumenti admin", "Gestione chiavi", "Visibilità audit"],
      },
    ],
    outcomes: {
      eyebrow: "Risultati",
      title: "Cosa ottengono i team",
      subtitle: "Cicli brevi, metriche chiare e controllo brand.",
      items: [
        {
          title: "Maggiore retention",
          description: "Script e trigger dei regali mantengono l’engagement nelle sessioni lunghe.",
        },
        {
          title: "Costi operativi più bassi",
          description: "Riduci moderazione manuale e tempo on‑camera mantenendo l’output giornaliero.",
        },
        {
          title: "Sperimentazione più veloce",
          description: "Itera su hook e format con test rapidi e script A/B.",
        },
      ],
    },
    cta: {
      title: "Pronto a mappare il tuo caso d’uso?",
      subtitle: "Dicci cosa automatizzare e costruiremo il rollout.",
      primary: "Contattaci",
      secondary: "Vedi prezzi",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Documentazione",
      title: "Guida rapida",
      subtitle: "Tutto ciò che serve per avviare la prima sessione AI streamer.",
      steps: [
        {
          id: "connect",
          title: "Connetti",
          description: "Collega il tuo account TikTok Live, scegli la regione e la lingua predefinita.",
        },
        {
          id: "customize",
          title: "Personalizza",
          description: "Crea la persona, aggiungi pacchetti di conoscenze, scegli la voce e le regole di sicurezza.",
        },
        {
          id: "set-limits",
          title: "Imposta limiti di AI speech (opzionale)",
          description: "Mantieni l'uso prevedibile quando il co‑host IA è attivo.",
        },
        {
          id: "connect-unreal",
          title: "Connetti Unreal con l'app desktop",
          description: "Usa l'app desktop per connessione Unreal, export e diagnostica locale.",
        },
        {
          id: "go-live",
          title: "Vai live",
          description: "Abilita Motore Dono e script di streaming e fai una sessione di test prima del 24/7.",
        },
      ],
    },
    product: {
      eyebrow: "Prodotto",
      title: "Documentazione funzionalità",
      subtitle: "Approfondimenti sui sistemi che alimentano Roxy.",
      items: [
        {
          id: "dono-engine",
          title: "Motore Dono",
          description: "Mappa regali ad azioni, emozioni e battute con priorità, cooldown e fallback di sicurezza.",
        },
        {
          id: "stream-scripts",
          title: "Script di streaming",
          description: "Programma intro, loop, mini‑giochi e battle mode con trigger temporizzati.",
        },
        {
          id: "scheduler",
          title: "Pianificatore multi‑conto",
          description: "Ruota account e regioni per copertura live continua con pacing sicuro.",
        },
        {
          id: "safety",
          title: "Safety Guard",
          description: "Filtri linguaggio, argomenti bloccati, rate limit e frasi di stop emergenza.",
        },
        {
          id: "unreal-connector",
          title: "Unreal Connector",
          description: "Collega reazioni live alla scena avatar con hook event‑driven e lip‑sync.",
        },
        {
          id: "diagnostics",
          title: "Diagnostica",
          description: "Indicatori di stato per backend, audio, token e connettori.",
        },
      ],
    },
    api: {
      eyebrow: "API",
      title: "Panoramica reference",
      subtitle: "Endpoint strutturati per integrazioni e analytics.",
      sections: [
        {
          title: "Autenticazione",
          description: "Usa le chiavi progetto dal dashboard. Le richieste sono autorizzate via bearer token.",
          items: [
            "POST /auth/token — scambia API key con session token",
            "POST /auth/refresh — aggiorna session token",
          ],
        },
        {
          title: "Personaggi",
          description: "Crea, aggiorna e versiona profili personaggio usati nelle sessioni live.",
          items: [
            "GET /characters — lista personaggi",
            "POST /characters — crea personaggio",
            "PATCH /characters/{id} — aggiorna persona",
          ],
        },
        {
          title: "Sessioni",
          description: "Avvia o ferma le sessioni live, ispeziona metriche e scarica transcript.",
          items: [
            "POST /sessions/start — avvia sessione",
            "POST /sessions/stop — ferma sessione",
            "GET /sessions/{id} — dettagli sessione",
          ],
        },
        {
          title: "Eventi",
          description: "Iscriviti a reazioni regali, eventi scriptati e segnali di moderazione.",
          items: [
            "GET /events/stream — server‑sent events",
            "POST /webhooks — registra webhook",
          ],
        },
      ],
    },
    glossary: {
      eyebrow: "Glossario",
      title: "Termini chiave",
      subtitle: "Definizioni brevi usate nel dashboard.",
      items: [
        {
          term: "Ore attive di parlato",
          description: "Minuti in cui Roxy genera e riproduce TTS. Il silenzio non conta.",
        },
        {
          term: "Motore Dono",
          description: "Regole che mappano regali a emozioni, linee, azioni, cooldown e priorità.",
        },
        {
          term: "Script di streaming",
          description: "Scenari pre‑costruiti come intro, loop, mini‑giochi e battle mode.",
        },
        {
          term: "Pacchetto di conoscenze",
          description: "Fatti personalizzati che rendono la persona coerente e on‑brand.",
        },
        {
          term: "Watermark",
          description: "Marchio visivo disattivabile con piani Pro e Studio.",
        },
        {
          term: "Coda multi‑conto",
          description: "Rotazione schedulata di più conti TikTok per streaming 24/7.",
        },
      ],
    },
  },
  pricing: {
    eyebrow: "Prezzi",
    title: "Prezzi che scalano con il tuo streaming",
    subtitle: "Scegli BYOK per il massimo controllo o crediti Pro per plug‑and‑play.",
    comparisonTitle: "Confronto piani",
    comparisonHeaders: ["Funzione", "Prova", "Basic", "Pro", "Studio"],
    comparisonRows: [
      {
        label: "Ore attive incluse",
        values: ["60 min", "Illimitate (BYOK)", "10 ore", "40 ore"],
      },
      { label: "Watermark", values: ["On", "On", "Toggle", "Toggle"] },
      { label: "Account", values: ["1", "1", "Fino a 5", "Fino a 20"] },
      { label: "Regole Dono", values: ["10", "20", "200", "1000"] },
      { label: "Script", values: ["2", "3", "Illimitati", "Illimitati + avanzati"] },
      { label: "Elementi knowledge", values: ["-", "3", "20", "200"] },
      { label: "Conservazione log", values: ["3 giorni", "7 giorni", "30 giorni", "90 giorni"] },
      { label: "Posti team", values: ["-", "-", "-", "5"] },
      { label: "Licenza commerciale", values: ["-", "-", "-", "Sì"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "Crediti extra",
    extraCreditsSubtitle: "Acquista ore aggiuntive quando raggiungi il limite.",
    extraCredits: [
      { label: "+10 ore", price: "€25" },
      { label: "+50 ore", price: "€99" },
      { label: "+200 ore", price: "€299" },
    ],
    addonTitle: "Pacchetto Unreal Connector",
    addonBadge: "Add‑on",
    addonDescription:
      "Connettore Unreal Live, trigger lip‑sync, scene UE di esempio e mapping azioni per il Motore Dono.",
    addonPrices: [
      { label: "Mensile", price: "€49 / mese" },
      { label: "A vita", price: "€299" },
    ],
    addonCta: "Gestisci add‑on",
    faqEyebrow: "FAQ",
    faqTitle: "Serve una risposta rapida?",
    faqSubtitle: "Domande sui piani, semplificate.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Aggiornamenti, casi d’uso e note di lancio",
    subtitle: "News di prodotto, playbook di crescita e formati live reali.",
    backToBlog: "Torna al blog",
  },
  team: {
    eyebrow: "Team",
    title: "Le persone dietro RoxStreamAI",
    subtitle: "Un team piccolo e focalizzato tra ops streaming, AI e product design.",
    members: [
      { name: "Lia Chen", role: "Prodotto & Growth", focus: "Tool per creator, onboarding e strategia prezzi." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Sistemi realtime, script di streaming e affidabilità piattaforma." },
      { name: "Sofia Kim", role: "Design Lead", focus: "Brand system, UI kit e nuovi flow dashboard." },
    ],
    values: {
      eyebrow: "Valori",
      title: "Come lavoriamo",
      subtitle: "I principi che guidano ogni decisione di prodotto.",
      items: [
        {
          title: "Creator‑first",
          description: "Costruiamo strumenti che eliminano frizioni per concentrarsi su format e storytelling.",
        },
        {
          title: "Chiarezza operativa",
          description: "Analytics, processi e script per decisioni rapide e crescita ripetibile.",
        },
        {
          title: "Safety by default",
          description: "Ogni flusso include regole di moderazione, rate limit e barriere di sicurezza prima della scala.",
        },
      ],
    },
    cta: {
      title: "Vuoi collaborare?",
      subtitle: "Partnership, integrazioni o richieste di accesso anticipato—parliamone.",
      primary: "Contattaci",
      secondary: "Leggi aggiornamenti",
    },
  },
  download: {
    eyebrow: "Download",
    title: "Scarica l’ultima versione desktop",
    subtitle: "Scegli la piattaforma. Le release sono gestite dal team admin.",
    latestLabel: "Ultima",
    noReleases: "Nessuna release. Chiedi a un admin di aggiungere la prima build Windows/macOS dal pannello admin.",
    openAdmin: "Apri release admin",
    releaseHistory: "Cronologia release",
    download: "Scarica",
  },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Prova" : card.name,
    description:
      card.description === "Preview"
        ? "Anteprima"
        : card.description === "Best value"
          ? "Miglior valore"
          : card.description === "For teams"
            ? "Per team"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minuti")
      .replace("hours", "ore")
      .replace("Unlimited", "Illimitate"),
    cta: card.cta
      .replace("Start Trial", "Avvia prova")
      .replace("Choose", "Scegli"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "account")
        .replace("Dono rules", "Regole Dono")
        .replace("Scripts", "Script")
        .replace("Watermark always on", "Watermark sempre attivo")
        .replace("Logs", "Log")
        .replace("Knowledge pack", "Pacchetto di conoscenze")
        .replace("Team seats", "Posti team")
        .replace("Commercial license", "Licenza commerciale")
        .replace("Advanced scripts", "Script avanzati")
    ),
  })),
  faqs: [
    { q: "Servono API key?", a: "Basic usa BYOK. Pro/Studio includono crediti." },
    { q: "Cosa sono le ore attive?", a: "Solo il tempo in cui Roxy parla." },
    { q: "Posso disattivare il watermark?", a: "Basic/Prova: no. Pro/Studio: sì." },
    { q: "Guadagni garantiti?", a: "No, dipende da contenuto e pubblico." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casi d’uso di brand con personaggi IA",
      summary: "Attivazioni 24/7 e campagne interattive con personaggi IA.",
      date: "2026-01-12",
      category: "Casi d’uso",
      readingTime: "6 min",
      content: [
        "Gli streamer IA permettono formati live senza host umano.",
        "Inizia con un personaggio principale e aggiungi pacchetti di conoscenze.",
        "Il pianificatore multi‑conto mantiene canali regionali attivi 24/7.",
        "Inizia con un personaggio hero e collega le regole Dono agli eventi di campagna.",
        "Le agenzie usano il pianificatore multi‑conto per copertura regionale 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Presentiamo RoxStreamAI",
      summary: "Dalla persona alla sessione live in pochi minuti.",
      date: "2026-01-08",
      category: "Prodotto",
      readingTime: "5 min",
      content: [
        "RoxStreamAI lancia streamers IA in minuti.",
        "Sessioni lunghe con pacing sicuro e moderazione.",
        "Pro include crediti; BYOK consente modelli e voci propri.",
        "Piattaforma per sessioni lunghe: pacing sicuro, moderazione e pianificatore senza switch manuali.",
        "Imposta limiti Active Speech per mantenere i costi prevedibili.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Stack di automazione per 24/7",
      summary: "Script, moderazione e loop di reazione.",
      date: "2025-12-20",
      category: "Guide",
      readingTime: "7 min",
      content: [
        "Un formato 24/7 richiede struttura, reazioni e sicurezza.",
        "Mappa donazioni a reazioni con priorità e cooldown.",
        "Imposta barriere di sicurezza e override umano.",
        "Script e priorita mantengono il ritmo senza sovraccaricare la chat.",
      ],
    },
  ],
};

const pt: MarketingContent = {
  ...en,
  about: { eyebrow: "Sobre", title: "Roxy para creators 24/7", subtitle: "Automação premium, segura e controlável.", missionTitle: "Nossa missão", missionBody: "Um co‑host IA que conduz shows, reage a presentes e mantém o público engajado.", beliefTitle: "No que acreditamos", beliefBody: "A criatividade humana vem primeiro. A Roxy cuida da repetição, do agendamento e dos loops de reação.", roxyTitle: "O que significa RoxStreamAI", roxyBody: "RoxStreamAI significa Roxy AI Streamer. Roxy é nosso primeiro personagem criado, que levou ao surgimento do RoxStreamAI. Ela foi o começo da nossa longa história." },
  contact: { eyebrow: "Contato", title: "Vamos planejar seu próximo live", subtitle: "Conte seus objetivos e montamos o rollout.", firstName: "Nome", lastName: "Sobrenome", email: "Email de trabalho", message: "O que você quer automatizar?", sendRequest: "Enviar", directLines: "Contato direto", responseTime: "Respondemos em 1 dia útil." },
  terms: { title: "Termos", intro: "Estes termos regem o uso do RoxStreamAI.", sections: [ { title: "Contas", body: "Você é responsável por suas credenciais." }, { title: "Uso", body: "Siga regras e leis. Abusos proibidos." }, { title: "Uso de provedores e BYOK", body: "Com provedores integrados, o RoxStreamAI pode encaminhar solicitações a terceiros. Com BYOK, você é responsável por suas chaves e cobrança." }, { title: "Cobrança", body: "Renovação automática, extras possíveis." }, { title: "Conteúdo", body: "Você mantém a propriedade." }, { title: "Disponibilidade", body: "Buscamos alta disponibilidade, mas não garantimos serviço ininterrupto. Pode haver manutenção e quedas." }, { title: "Encerramento", body: "Podemos suspender por violação." } ] },
  privacy: { title: "Privacidade", intro: "Coletamos apenas dados necessários.", sections: [ { title: "Dados coletados", body: "Detalhes da conta, métricas e configs." }, { title: "Uso", body: "Auth, sessões, suporte, segurança." }, { title: "Retenção", body: "Depende do plano." }, { title: "Controle", body: "Exportar/excluir dados." }, { title: "Segurança", body: "Aplicamos controles de acesso e redação para proteger segredos." } ] },
  useCases: { eyebrow: "Casos de uso", title: "Resultados reais para lives modernas", subtitle: "Criadores, canais sem rosto e agências com Roxy.", items: [ { id: "creators", title: "Criadores", description: "Amplie horas de live sem burnout. Automatize saudações, reações a presentes e intervalos mantendo sua voz consistente.", highlights: ["Ritmo 24/7 com pausas seguras", "Reações instantâneas a presentes", "Momentos de clipe com scripts"] }, { id: "faceless", title: "Sem rosto", description: "Lance um canal guiado por personagem sem aparecer em câmera. Crie lore e mantenha o engajamento alto.", highlights: ["Persona + pacote de conhecimento", "Controle de estilo de voz", "Barreiras de segurança de moderação"] }, { id: "agencies", title: "Agências", description: "Gerencie vários creators, logins e idiomas em uma única central. Ideal para estúdios e operações multi‑conta.", highlights: ["Agendador multi‑conta", "Acesso em equipe + logs", "Análises centralizadas"] }, { id: "unreal-avatar", title: "Streams com avatar Unreal", description: "Use o app desktop para conectar o Unreal e transmitir um personagem em tempo real.", highlights: ["Fluxo do app desktop", "Conexão Unreal", "Avatar em tempo real"] }, { id: "team-workflows", title: "Fluxos de equipe", description: "Gerencie personagens, uso e acesso em equipe. Ferramentas admin mantêm chaves e cobrança seguras.", highlights: ["Ferramentas admin", "Gestão de chaves", "Visibilidade de auditoria"] } ], outcomes: { eyebrow: "Resultados", title: "O que as equipes desbloqueiam", subtitle: "Ciclos curtos, métricas claras e controle de marca.", items: [ { title: "Mais retenção", description: "Scripts e gatilhos de presentes mantêm o público engajado em sessões longas." }, { title: "Menor custo operacional", description: "Reduza moderação manual e tempo de câmera mantendo a produção diária." }, { title: "Experimentos mais rápidos", description: "Itere ganchos e formatos com testes rápidos e scripts A/B." } ] }, cta: { title: "Pronto para mapear seu caso de uso?", subtitle: "Diga o que automatizar e montamos o rollout.", primary: "Falar com a gente", secondary: "Ver preços" } },
  docs: { quickstart: { eyebrow: "Documentação", title: "Guia rápido", subtitle: "Tudo o que você precisa para iniciar sua primeira sessão de AI streamer.", steps: [ { id: "connect", title: "Conectar", description: "Vincule sua conta TikTok Live, selecione região e idioma padrão do personagem." }, { id: "customize", title: "Personalizar", description: "Crie a persona, adicione pacotes de conhecimento, escolha a voz e defina regras de segurança." }, { id: "set-limits", title: "Defina limites de fala IA (opcional)", description: "Mantenha o uso previsível quando o co‑host IA estiver ativo." }, { id: "connect-unreal", title: "Conecte Unreal com o app desktop", description: "Use o app desktop para conexão Unreal, exportação e diagnósticos locais." }, { id: "go-live", title: "Entrar ao vivo", description: "Ative Motor Dono + scripts de stream e faça uma sessão de teste antes do 24/7." } ] }, product: { eyebrow: "Produto", title: "Documentação de funcionalidades", subtitle: "Aprofunde nos sistemas que alimentam a Roxy.", items: [ { id: "dono-engine", title: "Motor Dono", description: "Mapeie presentes para ações, emoções e falas com prioridades, cooldowns e fallback de segurança." }, { id: "stream-scripts", title: "Scripts de stream", description: "Programe intros, loops, mini‑jogos e modo batalha com gatilhos temporizados." }, { id: "scheduler", title: "Agendador multi‑conta", description: "Alterne contas e regiões para manter cobertura contínua com ritmo seguro." }, { id: "safety", title: "Safety Guard", description: "Filtros de linguagem, tópicos bloqueados, rate limits e frases de parada emergencial." }, { id: "unreal-connector", title: "Unreal Connector", description: "Conecte reações ao avatar com hooks event‑driven e lip‑sync." }, { id: "diagnostics", title: "Diagnosticos", description: "Indicadores de status para backend, audio, tokens e conectores." } ] }, api: { eyebrow: "API", title: "Visão geral de referência", subtitle: "Endpoints estruturados para integrações e análises.", sections: [ { title: "Autenticação", description: "Use as chaves de projeto do dashboard. As requisições são autorizadas via bearer token.", items: [ "POST /auth/token — trocar API key por session token", "POST /auth/refresh — atualizar session token" ] }, { title: "Personagens", description: "Crie, atualize e versione perfis de personagem usados em lives.", items: [ "GET /characters — listar personagens", "POST /characters — criar personagem", "PATCH /characters/{id} — atualizar persona" ] }, { title: "Sessões", description: "Inicie ou pare sessões ao vivo, inspecione métricas e obtenha transcrições.", items: [ "POST /sessions/start — iniciar sessão", "POST /sessions/stop — parar sessão", "GET /sessions/{id} — detalhes da sessão" ] }, { title: "Eventos", description: "Assine reações a presentes, eventos de script e sinais de moderação.", items: [ "GET /events/stream — server‑sent events", "POST /webhooks — registrar webhook" ] } ] }, glossary: { eyebrow: "Glossário", title: "Termos‑chave", subtitle: "Definições curtas usadas no dashboard.", items: [ { term: "Horas de fala ativa", description: "Minutos em que a Roxy gera e reproduz TTS. Silêncio não conta." }, { term: "Motor Dono", description: "Regras que mapeiam presentes para emoções, falas, ações, cooldowns e prioridades." }, { term: "Scripts de stream", description: "Cenários como intros, loops, mini‑jogos e modo batalha." }, { term: "Pacote de conhecimento", description: "Fatos personalizados para manter a persona consistente e alinhada à marca." }, { term: "Marca d’água", description: "Marca visual que pode ser desativada nos planos Pro e Studio." }, { term: "Fila multi‑conta", description: "Rotação programada de várias contas TikTok para streaming 24/7." } ] } },
  pricing: { eyebrow: "Preços", title: "Preços que escalam com seu streaming", subtitle: "Escolha BYOK para máximo controle ou créditos Pro para plug‑and‑play.", comparisonTitle: "Comparação de planos", comparisonHeaders: ["Recurso", "Teste", "Basic", "Pro", "Studio"], comparisonRows: [ { label: "Horas ativas incluídas", values: ["60 min", "Ilimitado (BYOK)", "10 horas", "40 horas"] }, { label: "Marca d’água", values: ["On", "On", "Toggle", "Toggle"] }, { label: "Contas", values: ["1", "1", "Até 5", "Até 20"] }, { label: "Regras Dono", values: ["10", "20", "200", "1000"] }, { label: "Scripts", values: ["2", "3", "Ilimitados", "Ilimitados + avançados"] }, { label: "Itens de conhecimento", values: ["-", "3", "20", "200"] }, { label: "Retenção de logs", values: ["3 dias", "7 dias", "30 dias", "90 dias"] }, { label: "Assentos de equipe", values: ["-", "-", "-", "5"] }, { label: "Licença comercial", values: ["-", "-", "-", "Sim"] }, { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] } ], extraCreditsTitle: "Créditos extras", extraCreditsSubtitle: "Compre mais horas ativas quando atingir o limite.", extraCredits: [ { label: "+10 horas", price: "€25" }, { label: "+50 horas", price: "€99" }, { label: "+200 horas", price: "€299" } ], addonTitle: "Pacote Unreal Connector", addonBadge: "Add‑on", addonDescription: "Conector Unreal Live, gatilhos de lip‑sync, cenas UE de exemplo e mapeamento de ações para o Motor Dono.", addonPrices: [ { label: "Mensal", price: "€49 / mês" }, { label: "Vitalício", price: "€299" } ], addonCta: "Gerenciar add‑ons", faqEyebrow: "FAQ", faqTitle: "Precisa de respostas rápidas?", faqSubtitle: "Dúvidas sobre planos, simplificadas." },
  blog: { eyebrow: "Blog", title: "Atualizações, casos de uso e notas de lançamento", subtitle: "Novidades do produto, playbooks de crescimento e formatos reais de streaming.", backToBlog: "Voltar ao blog" },
  team: { eyebrow: "Equipe", title: "Quem constrói a RoxStreamAI", subtitle: "Um time pequeno e focado que combina operações de streaming, IA e design de produto.", members: [ { name: "Lia Chen", role: "Produto & Growth", focus: "Ferramentas para creators, onboarding e estratégia de preços." }, { name: "Maks Orlov", role: "Líder de Engenharia", focus: "Sistemas em tempo real, scripts de stream e confiabilidade." }, { name: "Sofia Kim", role: "Líder de Design", focus: "Sistema de marca, kits de UI e novos fluxos do dashboard." } ], values: { eyebrow: "Valores", title: "Como trabalhamos", subtitle: "Princípios que moldam cada decisão de produto.", items: [ { title: "Creator‑first", description: "Criamos ferramentas que removem atrito para foco em formatos e storytelling." }, { title: "Clareza operacional", description: "Analytics, fluxos e scripts pensados para decisões rápidas e crescimento repetível." }, { title: "Segurança por padrão", description: "Cada fluxo inclui regras de moderação, limites e barreiras de segurança antes de escalar." } ] }, cta: { title: "Quer colaborar?", subtitle: "Parcerias, integrações ou acesso antecipado—vamos conversar.", primary: "Contato", secondary: "Ler atualizações" } },
  download: { eyebrow: "Downloads", title: "Baixe a versão desktop mais recente", subtitle: "Escolha sua plataforma. As releases são gerenciadas pela equipe admin.", latestLabel: "Mais recente", noReleases: "Ainda não há releases. Peça para um admin adicionar o primeiro build Windows/macOS no painel admin.", openAdmin: "Abrir releases admin", releaseHistory: "Histórico de releases", download: "Baixar" },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Teste" : card.name,
    description:
      card.description === "Preview"
        ? "Prévia"
        : card.description === "Best value"
          ? "Melhor custo‑benefício"
          : card.description === "For teams"
            ? "Para equipes"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "minutos")
      .replace("hours", "horas")
      .replace("Unlimited", "Ilimitadas"),
    cta: card.cta.replace("Start Trial", "Iniciar teste").replace("Choose", "Escolher"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "conta")
        .replace("Dono rules", "Regras Dono")
        .replace("Scripts", "Scripts")
        .replace("Watermark always on", "Marca d'água sempre ativa")
        .replace("Logs", "Logs")
        .replace("Knowledge pack", "Pacote de conhecimento")
        .replace("Team seats", "Lugares de equipe")
        .replace("Commercial license", "Licença comercial")
        .replace("Advanced scripts", "Scripts avançados")
    ),
  })),
  faqs: [
    { q: "Preciso de API keys?", a: "Basic usa BYOK. Pro/Studio incluem créditos." },
    { q: "O que são horas ativas?", a: "Somente quando Roxy fala." },
    { q: "Posso desativar o watermark?", a: "Basic/Teste: não. Pro/Studio: sim." },
    { q: "Renda garantida?", a: "Não, depende do conteúdo e audiência." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casos de uso de marca com personagens IA",
      summary: "Ativações 24/7 e campanhas interativas com personagens IA.",
      date: "2026-01-12",
      category: "Casos de uso",
      readingTime: "6 min",
      content: [
        "Streamers IA permitem formatos live sem host humano.",
        "Comece com um personagem principal e adicione pacotes de conhecimento.",
        "O agendador multi‑conta mantém canais regionais ativos 24/7.",
        "Comece com um personagem hero e conecte regras Dono a eventos de campanha.",
        "Agencias usam o agendador multi‑conta para cobertura regional 24/7.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Apresentando RoxStreamAI",
      summary: "Da persona à sessão ao vivo em minutos.",
      date: "2026-01-08",
      category: "Produto",
      readingTime: "5 min",
      content: [
        "RoxStreamAI lança streamers IA em minutos.",
        "Sessões longas com pacing seguro e moderação.",
        "Pro inclui créditos; BYOK permite modelos e vozes próprias.",
        "Plataforma para sessoes longas: pacing seguro, moderacao e agendador sem troca manual.",
        "Defina limites de Active Speech para manter custos previsiveis.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Stacks de automação para 24/7",
      summary: "Scripts, moderação e loops de reação para alto engajamento.",
      date: "2025-12-20",
      category: "Guias",
      readingTime: "7 min",
      content: [
        "Um formato 24/7 precisa de estrutura, reações e segurança.",
        "Mapeie doações para reações com prioridades e cooldowns.",
        "Configure barreiras de segurança e override humano.",
        "Scripts e prioridades mantem o ritmo sem sobrecarregar o chat.",
      ],
    },
  ],
};

const tr: MarketingContent = {
  ...en,
  about: { eyebrow: "Hakkında", title: "Roxy 24/7 creator'lar için", subtitle: "Premium, güvenli ve kontrol edilebilir otomasyon.", missionTitle: "Misyonumuz", missionBody: "Show'ları yöneten, bağışlara tepki veren ve izleyiciyi bağlı tutan AI co‑host.", beliefTitle: "İnandıklarımız", beliefBody: "İnsan yaratıcılığı önde. Roxy tekrarları, planlamayı ve reaksiyon döngülerini yönetir.", roxyTitle: "RoxStreamAI ne anlama geliyor", roxyBody: "RoxStreamAI, Roxy AI Streamer anlamına gelir. Roxy, RoxStreamAI'nin ortaya çıkmasına yol açan ilk oluşturduğumuz karakterdir. Uzun hikayemizin başlangıcı oldu." },
  contact: { eyebrow: "İletişim", title: "Bir sonraki live formatını planlayalım", subtitle: "Hedeflerini anlat, rollout hazırlayalım.", firstName: "Ad", lastName: "Soyad", email: "İş e‑posta", message: "Neyi otomatikleştirmek istiyorsun?", sendRequest: "Gönder", directLines: "Doğrudan hatlar", responseTime: "1 iş günü içinde yanıt." },
  terms: { title: "Şartlar", intro: "RoxStreamAI kullanım şartları.", sections: [ { title: "Hesaplar", body: "Kimlik bilgileri sana aittir." }, { title: "Kullanım", body: "Kurallara uy. İstismar yasak." }, { title: "Saglayici kullanimi ve BYOK", body: "Dahili saglayicilari kullandiginizda RoxStreamAI istekleri ucuncu taraflara iletebilir. BYOK kullaniminda anahtarlar ve faturalandirma sizdedir." }, { title: "Faturalandırma", body: "Otomatik yenileme." }, { title: "İçerik", body: "Sahiplik sende kalır." }, { title: "Kullanilabilirlik", body: "Yuksek kullanilabilirlik hedefleriz, ancak kesintisiz hizmet garanti etmeyiz. Bakim ve kesintiler olabilir." }, { title: "Fesih", body: "İhlalde erişim durdurulabilir." } ] },
  privacy: { title: "Gizlilik", intro: "Sadece gerekli veriler toplanır.", sections: [ { title: "Toplanan veriler", body: "Hesap detayları, metrikler, ayarlar." }, { title: "Kullanım", body: "Auth, oturum, destek, güvenlik." }, { title: "Saklama", body: "Plana bağlı." }, { title: "Kontrol", body: "İhracat/silme." }, { title: "Guvenlik", body: "Sirlarin korunmasi icin erisim kontrolleri ve redaksiyon uygulariz." } ] },
  useCases: { eyebrow: "Kullanım alanları", title: "Modern canlı yayınlar için gerçek sonuçlar", subtitle: "Creator, faceless ve ajanslar için.", items: [ { id: "creators", title: "Creator’lar", description: "Burnout olmadan yayın saatlerini büyütün. Karşılama, bağış tepkileri ve araları otomatikleştirirken sesinizi tutarlı tutun.", highlights: ["24/7 güvenli pacing", "Bağışlara anında reaksiyon", "Script ile klip anları"] }, { id: "faceless", title: "Faceless", description: "Kameraya çıkmadan karakter odaklı kanal başlatın. Lore oluşturun ve etkileşimi yüksek tutun.", highlights: ["Persona + bilgi paketi", "Ses stili kontrolü", "Moderasyon koruma kuralları"] }, { id: "agencies", title: "Ajanslar", description: "Tek bir merkezden birden çok creator, giriş ve dil yönetin. Stüdyo ve çoklu hesap operasyonları için ideal.", highlights: ["Çoklu hesap zamanlayıcı", "Ekip erişimi + aktivite logları", "Merkezi analitik"] }, { id: "unreal-avatar", title: "Unreal avatar yayini", description: "Desktop uygulamasini kullanarak Unreal baglantisi kurun ve gercek zamanli avatar yayinlayin.", highlights: ["Desktop uygulama is akisi", "Unreal baglantisi", "Gercek zamanli avatar"] }, { id: "team-workflows", title: "Ekip iş akışları", description: "Ekipte karakterleri, kullanım ve erişimi yönetin. Admin araçları anahtarları ve faturalandırmayı güvenli tutar.", highlights: ["Admin araçları", "Anahtar yönetimi", "Denetim görünürlüğü"] } ], outcomes: { eyebrow: "Sonuçlar", title: "Takımların kazancı", subtitle: "Kısa döngüler, net metrikler ve marka kontrolü.", items: [ { title: "Daha yüksek tutma", description: "Script ve hediye trigger’ları uzun oturumlarda etkileşimi artırır." }, { title: "Daha düşük operasyon maliyeti", description: "Manuel moderasyonu ve kamera süresini azaltırken günlük çıktıyı koruyun." }, { title: "Daha hızlı denemeler", description: "Hızlı senaryo testleri ve A/B scriptlerle formatları iterasyonlayın." } ] }, cta: { title: "Kullanım alanınızı haritalamaya hazır mısınız?", subtitle: "Neyi otomatikleştirmek istediğinizi söyleyin, rollout planı çıkaralım.", primary: "İletişim", secondary: "Fiyatları gör" } },
  docs: { quickstart: { eyebrow: "Dokümanlar", title: "Hızlı başlangıç", subtitle: "İlk AI streamer oturumunu başlatmak için gereken her şey.", steps: [ { id: "connect", title: "Bağla", description: "TikTok Live hesabını bağla, bölge seç ve karakter için varsayılan dil ayarla." }, { id: "customize", title: "Özelleştir", description: "Persona oluştur, bilgi paketleri ekle, ses seç ve güvenlik kuralları tanımla." }, { id: "set-limits", title: "AI konuşma limitlerini belirle (opsiyonel)", description: "AI co‑host aktifken kullanımı öngörülebilir tut." }, { id: "connect-unreal", title: "Unreal'i desktop uygulama ile bağla", description: "Unreal bağlantısı, export ve yerel tanılama için desktop uygulamayı kullan." }, { id: "go-live", title: "Yayına çık", description: "Dono motoru + yayin skriptlerini etkinleştir ve 24/7’den önce test yayını yap." } ] }, product: { eyebrow: "Ürün", title: "Özellik dokümantasyonu", subtitle: "Roxy’yi güçlendiren sistemlere derin dalış.", items: [ { id: "dono-engine", title: "Dono motoru", description: "Bağışları aksiyonlara, duygulara ve repliklere eşleştir; öncelik, cooldown ve güvenlik fallback’leriyle." }, { id: "stream-scripts", title: "Yayin skriptleri", description: "Intro, loop, mini‑oyun ve battle modlarını zamanlı tetikleyicilerle planla." }, { id: "scheduler", title: "Çoklu hesap zamanlayıcı", description: "24/7 canlı kapsama için hesap ve bölgeleri güvenli pacing ile döndür." }, { id: "safety", title: "Safety Guard", description: "Küfür filtresi, bloklu konular, hız limitleri ve acil durdurma ifadeleri." }, { id: "unreal-connector", title: "Unreal Connector", description: "Canlı reaksiyonları avatar sahnesine event‑driven hook ve lip‑sync ile bağla." }, { id: "diagnostics", title: "Teşhis", description: "Backend, audio, token ve connector durum gostergeleri." } ] }, api: { eyebrow: "API", title: "Referans özeti", subtitle: "Entegrasyon ve analitik için yapılandırılmış uç noktalar.", sections: [ { title: "Kimlik doğrulama", description: "Dashboard’daki proje anahtarlarını kullan. İstekler bearer token ile yetkilendirilir.", items: [ "POST /auth/token — API anahtarını session token’a çevir", "POST /auth/refresh — session token yenile" ] }, { title: "Karakterler", description: "Canlı oturumlarda kullanılan karakter profillerini oluştur, güncelle ve versiyonla.", items: [ "GET /characters — karakter listele", "POST /characters — karakter oluştur", "PATCH /characters/{id} — persona güncelle" ] }, { title: "Oturumlar", description: "Canlı oturum başlat/durdur, metrikleri incele ve transkript çek.", items: [ "POST /sessions/start — oturum başlat", "POST /sessions/stop — oturum durdur", "GET /sessions/{id} — oturum detayları" ] }, { title: "Etkinlikler", description: "Bağış tepkileri, script olayları ve moderasyon sinyallerini izle.", items: [ "GET /events/stream — server‑sent events", "POST /webhooks — webhook kaydet" ] } ] }, glossary: { eyebrow: "Sözlük", title: "Temel terimler", subtitle: "Dashboard’da kullanılan kısa tanımlar.", items: [ { term: "Aktif konuşma saatleri", description: "Roxy’nin TTS ürettiği ve çaldığı süre. Sessizlik sayılmaz." }, { term: "Dono motoru", description: "Bağışları duygu, replik, aksiyon, cooldown ve önceliklerle eşleyen kurallar." }, { term: "Yayin skriptleri", description: "Intro, loop, mini‑oyun ve battle mod akışları." }, { term: "Bilgi paketi", description: "Persona’yı tutarlı ve markaya uygun yapan özel bilgiler." }, { term: "Filigran", description: "Pro ve Studio planlarında kapatılabilen görsel marka işareti." }, { term: "Çoklu hesap kuyruğu", description: "Birden fazla TikTok hesabı için 24/7 rotasyon planı." } ] } },
  pricing: { eyebrow: "Fiyatlandırma", title: "Yayınınızla ölçeklenen fiyatlar", subtitle: "Maksimum kontrol için BYOK veya Pro kredi ile hızlı başlangıç.", comparisonTitle: "Plan karşılaştırması", comparisonHeaders: ["Özellik", "Deneme", "Basic", "Pro", "Studio"], comparisonRows: [ { label: "Dahil aktif konuşma süresi", values: ["60 dk", "Sınırsız (BYOK)", "10 saat", "40 saat"] }, { label: "Filigran", values: ["Açık", "Açık", "Aç/Kapa", "Aç/Kapa"] }, { label: "Hesaplar", values: ["1", "1", "En fazla 5", "En fazla 20"] }, { label: "Dono kuralları", values: ["10", "20", "200", "1000"] }, { label: "Scriptler", values: ["2", "3", "Sınırsız", "Sınırsız + gelişmiş"] }, { label: "Knowledge öğeleri", values: ["-", "3", "20", "200"] }, { label: "Log saklama", values: ["3 gün", "7 gün", "30 gün", "90 gün"] }, { label: "Ekip koltukları", values: ["-", "-", "-", "5"] }, { label: "Ticari lisans", values: ["-", "-", "-", "Evet"] }, { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] } ], extraCreditsTitle: "Ek krediler", extraCreditsSubtitle: "Limit dolunca daha fazla aktif konuşma saati satın alın.", extraCredits: [ { label: "+10 saat", price: "€25" }, { label: "+50 saat", price: "€99" }, { label: "+200 saat", price: "€299" } ], addonTitle: "Unreal Connector Paketi", addonBadge: "Eklenti", addonDescription: "Unreal Live connector, lip‑sync tetikleri, örnek UE sahneleri ve Dono motoru aksiyon eşlemesi.", addonPrices: [ { label: "Aylık", price: "€49 / ay" }, { label: "Ömür boyu", price: "€299" } ], addonCta: "Eklentileri yönet", faqEyebrow: "SSS", faqTitle: "Hızlı cevap mı lazım?", faqSubtitle: "Plan soruları, kısaca." },
  blog: { eyebrow: "Blog", title: "Güncellemeler, kullanım alanları ve sürüm notları", subtitle: "Ürün haberleri, büyüme playbook’ları ve gerçek yayın formatları.", backToBlog: "Bloga dön" },
  team: { eyebrow: "Ekip", title: "RoxStreamAI’i geliştirenler", subtitle: "Yayın operasyonları, AI sistemleri ve ürün tasarımını birleştiren küçük bir ekip.", members: [ { name: "Lia Chen", role: "Ürün & Growth", focus: "Creator araçları, onboarding ve fiyatlama stratejisi." }, { name: "Maks Orlov", role: "Mühendislik Lideri", focus: "Gerçek zamanlı sistemler, stream scriptleri ve platform güvenilirliği." }, { name: "Sofia Kim", role: "Tasarım Lideri", focus: "Marka sistemi, UI kitleri ve yeni dashboard akışları." } ], values: { eyebrow: "Değerler", title: "Nasıl çalışıyoruz", subtitle: "Her ürün kararını şekillendiren ilkeler.", items: [ { title: "Creator‑first", description: "Creator’ların format ve hikayeye odaklanması için sürtünmeyi azaltırız." }, { title: "Operasyonel netlik", description: "Analitik, iş akışları ve scriptler hızlı karar ve tekrarlanabilir büyüme için tasarlandı." }, { title: "Varsayılan güvenlik", description: "Her akış, ölçeklemeden önce moderasyon kuralları ve koruma kuralları içerir." } ] }, cta: { title: "İş birliği yapmak ister misiniz?", subtitle: "Partnerlik, entegrasyon veya erken erişim talepleri—konuşalım.", primary: "İletişim", secondary: "Güncellemeleri oku" } },
  download: { eyebrow: "İndir", title: "En yeni masaüstü sürümü indir", subtitle: "Platformunu seç. Release’ler admin ekip tarafından yönetilir.", latestLabel: "En yeni", noReleases: "Henüz release yok. Admin panelinden ilk Windows/macOS build’ini ekleyin.", openAdmin: "Admin release’lerini aç", releaseHistory: "Release geçmişi", download: "İndir" },
  planCards: en.planCards.map((card) => ({
    ...card,
    name: card.name === "Trial" ? "Deneme" : card.name,
    description:
      card.description === "Preview"
        ? "Önizleme"
        : card.description === "Best value"
          ? "En iyi değer"
          : card.description === "For teams"
            ? "Takımlar için"
            : card.description,
    includedHours: card.includedHours
      .replace("minutes", "dakika")
      .replace("hours", "saat")
      .replace("Unlimited", "Sınırsız"),
    cta: card.cta.replace("Start Trial", "Denemeyi başlat").replace("Choose", "Seç"),
    features: card.features.map((feature) =>
      feature
        .replace("account", "hesap")
        .replace("Dono rules", "Dono kuralları")
        .replace("Scripts", "Scriptler")
        .replace("Watermark always on", "Filigran her zaman açık")
        .replace("Logs", "Loglar")
        .replace("Knowledge pack", "Bilgi paketi")
        .replace("Team seats", "Ekip koltukları")
        .replace("Commercial license", "Ticari lisans")
        .replace("Advanced scripts", "Gelişmiş scriptler")
    ),
  })),
  faqs: [
    { q: "API anahtarına ihtiyacım var mı?", a: "Basic BYOK kullanır. Pro/Studio kredi içerir." },
    { q: "Aktif konuşma saatleri nedir?", a: "Sadece Roxy konuşurken geçen süre." },
    { q: "Filigran kapanır mı?", a: "Basic/Deneme: hayır. Pro/Studio: evet." },
    { q: "Gelir garanti mi?", a: "Hayır, içerik ve kitleye bağlıdır." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "AI karakterlerle marka kullanım alanları",
      summary: "24/7 kampanyalar ve etkileşimli AI karakter kullanımı.",
      date: "2026-01-12",
      category: "Kullanım alanları",
      readingTime: "6 dk",
      content: [
        "AI streamer’lar insan host olmadan live formatlar sağlar.",
        "Ana karakterle başlayın ve bilgi paketi ekleyin.",
        "Çoklu hesap zamanlayıcı bölgesel kanalları 24/7 açık tutar.",
        "Hero bir karakterle baslayin ve Dono kurallarini kampanya etkinliklerine baglayin.",
        "Ajanslar bolgesel 24/7 kapsama icin coklu hesap zamanlayiciyi kullanir.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "RoxStreamAI tanıtımı",
      summary: "Persona’dan live oturuma dakikalar içinde.",
      date: "2026-01-08",
      category: "Ürün",
      readingTime: "5 dk",
      content: [
        "RoxStreamAI dakikalar içinde AI streamer başlatır.",
        "Uzun oturumlar için güvenli pacing ve moderasyon.",
        "Pro kredi içerir; BYOK kendi model/voice sağlar.",
        "Uzun oturumlar icin platform: guvenli pacing, moderasyon ve manuel gecis olmadan zamanlayici.",
        "Active Speech limitleri belirleyin, maliyetler ongorulebilir olsun.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "24/7 için otomasyon stack’leri",
      summary: "Script, moderasyon ve reaksiyon döngüleri.",
      date: "2025-12-20",
      category: "Kılavuzlar",
      readingTime: "7 dk",
      content: [
        "24/7 format için yapı, reaksiyon ve güvenlik gerekir.",
        "Bağışları öncelik ve cooldown ile reaksiyona bağlayın.",
        "Koruma kuralları ve insan müdahalesi ekleyin.",
        "Scriptler ve oncelikler chat'i yormadan tempoyu korur.",
      ],
    },
  ],
};

const contentMap: Record<string, MarketingContent> = {
  cs,
  en,
  de,
  es,
  fr,
  it,
  pl,
  pt,
  ru,
  sk,
  tr,
  uk,
};

export function getContent(locale: Locale): MarketingContent {
  return contentMap[locale] ?? en;
}

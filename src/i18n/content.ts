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
    eyebrow: "About",
    title: "RoxStreamAI is built for always-on creators",
    subtitle:
      "RoxStreamAI is a streaming automation platform with a safe AI co-host that stays on-brand and keeps audiences engaged—without losing human control.",
    missionTitle: "Our mission",
    missionBody:
      "Give creators and teams a polished AI co-host that can run shows, react to gifts, and maintain consistent live formats across time zones. We blend persona design, scripted structure, and real-time reactions so your stream feels human, premium, and reliable even when you step away.",
    beliefTitle: "What we believe",
    beliefBody:
      "Human creativity leads. RoxStreamAI handles repetition, scheduling, and moderation guardrails so you can focus on storytelling, community, and growth—without sacrificing safety or quality.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s plan your next live format",
    subtitle:
      "Tell us about your streaming goals and we will map a custom rollout.",
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    message: "What do you want RoxStreamAI to automate?",
    sendRequest: "Send request",
    directLines: "Direct lines",
    responseTime: "We respond within 1 business day.",
  },
  terms: {
    title: "Terms",
    intro:
      "These terms govern your use of RoxStreamAI, including the website, desktop app, and related services. By creating an account or using the service, you agree to these terms.",
    sections: [
      {
        title: "Accounts",
        body: "You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.",
      },
      {
        title: "Usage",
        body: "You agree to use RoxStreamAI in compliance with platform policies, applicable laws, and community guidelines. Abuse, harassment, or unlawful activity is not permitted.",
      },
      {
        title: "Content",
        body: "You retain ownership of your content. You grant us permission to process it solely to provide and improve the service.",
      },
      {
        title: "Billing",
        body: "Paid plans renew automatically unless canceled. Usage-based charges may apply for additional credits or add-ons.",
      },
      {
        title: "Termination",
        body: "We may suspend or terminate access if terms are violated or if the service is misused. You may cancel anytime in the dashboard.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro:
      "RoxStreamAI collects only the data required to provide streaming automation, analytics, and account management. We do not sell your personal data.",
    sections: [
      {
        title: "Data we collect",
        body: "Account details, usage metrics, and configuration data for your characters, scripts, and integrations.",
      },
      {
        title: "How we use data",
        body: "To authenticate users, run live sessions, provide support, and improve platform reliability and safety.",
      },
      {
        title: "Data retention",
        body: "Retention periods depend on your plan and can be managed in the dashboard or via support.",
      },
      {
        title: "Your controls",
        body: "You can export or delete your data at any time. Contact us for assistance with account removal or custom requirements.",
      },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "Real outcomes for modern live formats",
    subtitle:
      "See how creators, faceless channels, and agencies use RoxStreamAI to run longer, safer, and more engaging streams.",
    items: [
      {
        id: "creators",
        title: "Creators",
        description:
          "Scale your stream hours without burning out. RoxStreamAI handles greetings, gift reactions, and scripted intermissions while keeping your voice consistent and your brand on-message.",
        highlights: [
          "24/7 pacing with safe breaks",
          "Instant, on-brand gift reactions",
          "Clip-ready moments with scripted beats",
        ],
      },
      {
        id: "faceless",
        title: "Faceless streaming",
        description:
          "Launch a character-led channel without showing your face. Build lore-driven personas, keep engagement high, and stay completely off-camera while the AI handles chat, gifts, and pacing.",
        highlights: [
          "Persona + knowledge packs",
          "Voice style controls",
          "Safe moderation guardrails",
        ],
      },
      {
        id: "agencies",
        title: "Agencies",
        description:
          "Manage multiple creators, logins, and languages from one control room. Coordinate regional channels with centralized analytics and brand-safe guardrails.",
        highlights: [
          "Multi-account scheduler",
          "Team access + activity logs",
          "Centralized analytics",
        ],
      },
    ],
    outcomes: {
      eyebrow: "Outcomes",
      title: "What teams unlock",
      subtitle: "Short cycles, clear metrics, and consistent brand control.",
      items: [
        {
          title: "Higher retention",
          description:
            "Scripted loops and gift triggers keep viewers engaged across long sessions.",
        },
        {
          title: "Lower operational cost",
          description:
            "Reduce manual moderation and on-camera time while keeping daily output high.",
        },
        {
          title: "Faster experimentation",
          description:
            "Iterate on hooks and formats with rapid scenario testing and A/B scripts.",
        },
      ],
    },
    cta: {
      title: "Ready to map your use case?",
      subtitle:
        "Tell us what you want to automate and we will build a rollout plan.",
      primary: "Talk to us",
      secondary: "View pricing",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "Docs",
      title: "Quickstart",
      subtitle:
        "Everything you need to launch your first AI streamer session.",
      steps: [
        {
          id: "connect",
          title: "Connect",
          description:
            "Link your TikTok Live account, select region, and choose a default language for the character.",
        },
        {
          id: "customize",
          title: "Customize",
          description:
            "Create the persona, add knowledge packs, choose voice, and define safety rules.",
        },
        {
          id: "go-live",
          title: "Go Live",
          description:
            "Enable Dono Engine + Stream Scripts and launch a test session before going 24/7.",
        },
      ],
    },
    product: {
      eyebrow: "Product",
      title: "Feature documentation",
      subtitle: "Deep dives into the systems that power RoxStreamAI.",
      items: [
        {
          id: "dono-engine",
          title: "Dono Engine",
          description:
            "Map gifts to actions, emotions, and voice lines with priorities, cooldowns, and safety fallbacks.",
        },
        {
          id: "stream-scripts",
          title: "Stream Scripts",
          description:
            "Schedule intros, loop segments, mini-games, and battle modes with timed triggers.",
        },
        {
          id: "scheduler",
          title: "Multi-account Scheduler",
          description:
            "Rotate accounts and regions to maintain continuous live coverage with human-safe pacing.",
        },
        {
          id: "safety",
          title: "Safety Guard",
          description:
            "Add profanity filters, blocked topics, rate limits, and emergency stop phrases.",
        },
        {
          id: "unreal-connector",
          title: "Unreal Connector",
          description:
            "Connect live reactions to your avatar scene with event-driven hooks and lip-sync cues.",
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
    title: "Pricing that scales with your streaming",
    subtitle: "Choose BYOK for maximum control or Pro credits for plug-and-play.",
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
    title: "Updates, use cases, and launch notes",
    subtitle: "Product news, growth playbooks, and real-world streaming formats.",
    backToBlog: "Back to blog",
  },
  team: {
    eyebrow: "Team",
    title: "The people building RoxStreamAI",
    subtitle:
      "A small, focused team combining streaming operations, AI systems, and product design.",
    members: [
      {
        name: "Lia Chen",
        role: "Product & Growth",
        focus: "Creator tooling, onboarding, and pricing strategy.",
      },
      {
        name: "Maks Orlov",
        role: "Engineering Lead",
        focus: "Realtime systems, stream scripts, and platform reliability.",
      },
      {
        name: "Sofia Kim",
        role: "Design Lead",
        focus: "Brand system, UI kits, and new dashboard flows.",
      },
      {
        name: "Artem Volkov",
        role: "AI & Voice",
        focus: "Persona tuning, TTS pipelines, and safety controls.",
      },
    ],
    values: {
      eyebrow: "Values",
      title: "How we work",
      subtitle: "The principles that shape every product decision.",
      items: [
        {
          title: "Creator-first",
          description:
            "We build tools that remove friction so creators can focus on formats and storytelling.",
        },
        {
          title: "Operational clarity",
          description:
            "Analytics, workflows, and scripts are designed for quick decisions and repeatable growth.",
        },
        {
          title: "Safety by default",
          description:
            "Every flow includes moderation rules, rate limits, and guardrails before scale.",
        },
      ],
    },
    cta: {
      title: "Want to collaborate?",
      subtitle: "Partnerships, integrations, or early access requests—let’s talk.",
      primary: "Contact us",
      secondary: "Read updates",
    },
  },
  download: {
    eyebrow: "Downloads",
    title: "Grab the latest desktop build",
    subtitle: "Choose your platform. Releases are managed by the admin team.",
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
      q: "Do I need API keys?",
      a: "Basic uses BYOK. Pro and Studio include credits and work out of the box. You can still use BYOK on Pro+.",
    },
    {
      q: "What are ‘active speech hours’?",
      a: "Only the time when RoxStreamAI speaks. Idle and silence do not consume hours.",
    },
    {
      q: "Can I disable the watermark?",
      a: "Watermark is always on in Basic and Trial. Pro and Studio can disable it.",
    },
    {
      q: "Does this guarantee income?",
      a: "No. RoxStreamAI provides automation and retention tools, but results depend on your content and audience.",
    },
    {
      q: "Is Unreal required?",
      a: "No. Unreal is optional via the Unreal Connector Pack.",
    },
    {
      q: "Can I run 24/7?",
      a: "Yes. Pro/Studio support scheduling and multi-account rotation.",
    },
  ],
  blogPosts: [
    {
      slug: "introducing-roxstreamai",
      title: "Introducing RoxStreamAI",
      summary:
        "A practical AI co-host for live streaming: launch a persona, automate reactions, and keep formats consistent 24/7.",
      date: "2026-01-08",
      category: "Product",
      readingTime: "6 min",
      content: [
        "RoxStreamAI is an AI co-host for live streaming. It reads chat, reacts to gifts, and follows your show script so the format stays consistent even when you are not on camera.",
        "Start by connecting your TikTok Live account, choosing a persona, and loading knowledge packs that teach the character your brand, lore, and FAQs.",
        "Use Stream Scripts to define a reliable structure: intros, engagement loops, mini‑games, and safe breaks that keep pacing steady across long sessions.",
        "Dono Engine turns gifts into meaningful moments with priorities, cooldowns, and voice line triggers that feel intentional, not chaotic.",
        "RoxStreamAI includes moderation guardrails—blocked topics, rate limits, and emergency stop phrases—so the AI stays safe and on‑message.",
        "For teams, the scheduler keeps multiple accounts and regions running without manual handoffs, while analytics and logs stay centralized.",
        "Start with the trial, validate your format, and upgrade when you are ready to scale to 24/7 operations.",
      ],
    },
    {
      slug: "brand-use-cases-ai-characters",
      title: "Brand use cases for AI characters",
      summary:
        "How brands run always-on activations, interactive campaigns, and real-time engagement with AI characters.",
      date: "2026-01-12",
      category: "Use Cases",
      readingTime: "6 min",
      content: [
        "AI streamers let brands run live formats without a human host. The character stays on-message, reacts to gifts, and adapts to audience prompts while your team manages the agenda.",
        "Start with a single hero character and add brand knowledge packs to keep responses aligned. Tie Dono Engine rules to campaign events, then schedule scripts for product drops or seasonal activations.",
        "For agencies, multi-account scheduling keeps regional channels active around the clock, with moderation and analytics centralized in one dashboard.",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "Automation stacks for 24/7 live",
      summary:
        "A layered approach to scripts, moderation, and reaction loops that keep engagement high.",
      date: "2025-12-20",
      category: "Guides",
      readingTime: "7 min",
      content: [
        "A reliable 24/7 format needs three layers: scripted structure, reactive moments, and safety controls. Start with a timeline that alternates between engagement loops and short breaks.",
        "Next, map donations to reactions with priorities and cooldowns. This creates bursts of novelty without overwhelming the audience.",
        "Finally, configure safety guardrails and a human override. Your character stays consistent even under heavy chat volume.",
      ],
    },
  ],
};

const ru: MarketingContent = {
  ...en,
  about: {
    eyebrow: "О нас",
    title: "RoxStreamAI создан для всегда‑онлайн создателей",
    subtitle:
      "RoxStreamAI — это платформа автоматизации стриминга с безопасным AI‑ко‑хостом, которая держит бренд‑тон и повышает вовлеченность без потери контроля.",
    missionTitle: "Наша миссия",
    missionBody:
      "Дать авторам и командам polished AI‑ко‑хоста, который ведет шоу, реагирует на подарки и удерживает внимание по часовым поясам. Мы объединяем персоны, сценарии и реакции в реальном времени, чтобы эфир выглядел по‑человечески и стабильно.",
    beliefTitle: "Во что мы верим",
    beliefBody:
      "Человеческая креативность — главное. RoxStreamAI берет на себя рутину, расписание и модерацию, чтобы вы фокусировались на сторителлинге, комьюнити и росте — без компромиссов по безопасности.",
  },
  contact: {
    eyebrow: "Контакты",
    title: "Спланируем ваш следующий live‑формат",
    subtitle:
      "Расскажите о целях стриминга — мы составим кастомный план запуска.",
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
        title: "Контент",
        body: "Вы сохраняете права на контент. Мы используем его только для предоставления и улучшения сервиса.",
      },
      {
        title: "Биллинг",
        body: "Платные планы продлеваются автоматически. Возможны доплаты за дополнительные кредиты или аддоны.",
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
      "Смотрите, как создатели, faceless‑каналы и агентства используют RoxStreamAI для длинных, безопасных и вовлекающих стримов.",
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
          id: "go-live",
          title: "Выход в эфир",
          description: "Включите Dono Engine + Stream Scripts и протестируйте сессию перед 24/7.",
        },
      ],
    },
    product: {
      eyebrow: "Продукт",
      title: "Документация по функциям",
      subtitle: "Подробности по ключевым системам RoxStreamAI.",
      items: [
        { id: "dono-engine", title: "Dono Engine", description: "Свяжите подарки с действиями, эмоциями и репликами через приоритеты, cooldown и safety‑fallback." },
        { id: "stream-scripts", title: "Stream Scripts", description: "Планируйте интро, циклы, мини‑игры и battle‑режим через таймеры." },
        { id: "scheduler", title: "Планировщик аккаунтов", description: "Ротируйте аккаунты и регионы для 24/7‑покрытия с безопасным темпом." },
        { id: "safety", title: "Safety Guard", description: "Фильтры, запрещенные темы, лимиты скорости и фразы аварийной остановки." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Подключайте реакции к аватар‑сцене через event‑hooks и lip‑sync." },
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
        { term: "Dono Engine", description: "Правила, которые связывают подарки с эмоциями, репликами, действиями, cooldown и приоритетами." },
        { term: "Stream Scripts", description: "Сценарии интро, циклов, мини‑игр и battle‑режима." },
        { term: "Пакет знаний", description: "Кастомные факты, удерживающие персону согласованной и в рамках бренда." },
        { term: "Watermark", description: "Визуальная метка бренда, отключаемая на Pro и Studio." },
        { term: "Очередь аккаунтов", description: "Плановая ротация нескольких TikTok‑аккаунтов для 24/7‑стриминга." },
      ],
    },
  },
  pricing: {
    eyebrow: "Тарифы",
    title: "Тарифы, которые масштабируются",
    subtitle: "Выберите BYOK для максимального контроля или Pro‑кредиты для запуска в один клик.",
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
    addonDescription: "Unreal Live connector, lip‑sync триггеры, примерные UE‑сцены и маппинг действий Dono Engine.",
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
    subtitle: "Новости продукта, рост и реальные форматы стриминга.",
    backToBlog: "Назад в блог",
  },
  team: {
    eyebrow: "Команда",
    title: "Люди, которые строят RoxStreamAI",
    subtitle: "Небольшая команда на стыке стриминга, AI и продукт‑дизайна.",
    members: [
      { name: "Lia Chen", role: "Продукт и рост", focus: "Инструменты для создателей, онбординг и стратегия цен." },
      { name: "Maks Orlov", role: "Лид инженерии", focus: "Realtime‑системы, stream‑scripts и надежность платформы." },
      { name: "Sofia Kim", role: "Лид дизайна", focus: "Бренд‑система, UI‑киты и новые потоки кабинета." },
      { name: "Artem Volkov", role: "AI и голос", focus: "Тюнинг персоны, TTS‑пайплайны и контроль безопасности." },
    ],
    values: {
      eyebrow: "Ценности",
      title: "Как мы работаем",
      subtitle: "Принципы, по которым строим продукт.",
      items: [
        { title: "Creator‑first", description: "Мы устраняем трение, чтобы создатели фокусировались на форматах и сторителлинге." },
        { title: "Операционная ясность", description: "Аналитика, процессы и сценарии для быстрых решений и повторяемого роста." },
        { title: "Безопасность по умолчанию", description: "Каждый поток включает правила модерации, лимиты и guardrails перед масштабированием." },
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
        "Аккаунты: до 5",
        "Dono‑правила: 200",
        "Сценарии: безлимит",
        "Knowledge‑элементы: 20",
        "Водяной знак: переключаемый",
        "Логи: 30 дней",
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
        "Unreal поддержка",
      ],
    },
  ],
  faqs: [
    { q: "Нужен API‑ключ?", a: "Basic использует BYOK. Pro/Studio включают кредиты." },
    { q: "Что такое активные часы речи?", a: "Считается только время, когда RoxStreamAI говорит." },
    { q: "Можно отключить водяной знак?", a: "В Basic/Тесте — нет. В Pro/Studio — да." },
    { q: "Доход гарантирован?", a: "Нет, зависит от контента и аудитории." },
    { q: "Нужен Unreal?", a: "Нет, это опция." },
    { q: "Работает 24/7?", a: "Да, Pro/Studio поддерживают расписание." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Кейсы брендов с AI‑персонажами",
      summary: "Always‑on кампании и интерактивные AI‑персонажи для брендов.",
      date: "2026-01-12",
      category: "Кейсы",
      readingTime: "6 мин",
      content: [
        "AI‑стримеры позволяют запускать live‑форматы без человека‑хоста.",
        "Начните с главного персонажа и добавьте пакеты знаний, чтобы держать ответы в рамках бренда.",
        "Планировщик multi‑account держит региональные каналы активными 24/7, а модерация и аналитика централизованы.",
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
        "Пользователи Pro получают кредиты и готовые workflows. BYOK позволяет подключать собственные модели и голоса.",
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
        "И наконец, настройте guardrails и human‑override: персонаж остается стабильным даже при высокой нагрузке чата.",
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
      { title: "Контент", body: "Ви зберігаєте права на контент. Ми обробляємо його лише для надання та покращення сервісу." },
      { title: "Білінг", body: "Платні плани продовжуються автоматично. Можливі доплати за кредити або аддони." },
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
        { id: "go-live", title: "Вихід в ефір", description: "Увімкніть Dono Engine + Stream Scripts і протестуйте сесію перед 24/7." },
      ],
    },
    product: {
      eyebrow: "Продукт",
      title: "Документація функцій",
      subtitle: "Докладніше про ключові системи RoxStreamAI.",
      items: [
        { id: "dono-engine", title: "Dono Engine", description: "Звʼяжіть подарунки з діями, емоціями та репліками через пріоритети, cooldown і safety‑fallback." },
        { id: "stream-scripts", title: "Stream Scripts", description: "Плануйте інтро, цикли, міні‑ігри та battle‑режим за таймерами." },
        { id: "scheduler", title: "Планувальник акаунтів", description: "Ротуйте акаунти й регіони для 24/7‑покриття з безпечним темпом." },
        { id: "safety", title: "Safety Guard", description: "Фільтри, заблоковані теми, ліміти швидкості та фрази аварійної зупинки." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Підключайте реакції до сцени аватара через event‑hooks і lip‑sync." },
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
        { term: "Dono Engine", description: "Правила, що повʼязують подарунки з емоціями, репліками, діями, cooldown і пріоритетами." },
        { term: "Stream Scripts", description: "Сценарії інтро, циклів, міні‑ігор та battle‑режиму." },
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
    addonDescription: "Unreal Live connector, lip‑sync тригери, приклади UE‑сцен та мапінг дій для Dono Engine.",
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
      { name: "Artem Volkov", role: "AI та голос", focus: "Тюнінг персони, TTS‑пайплайни та контроль безпеки." },
    ],
    values: {
      eyebrow: "Цінності",
      title: "Як ми працюємо",
      subtitle: "Принципи, за якими будуємо продукт.",
      items: [
        { title: "Creator‑first", description: "Ми прибираємо тертя, щоб творці зосереджувались на форматах і сторітелінгу." },
        { title: "Операційна ясність", description: "Аналітика, процеси й скрипти для швидких рішень і повторюваного зростання." },
        { title: "Безпека за замовчуванням", description: "Кожен потік містить правила модерації, ліміти й guardrails перед масштабуванням." },
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
        "Акаунти: до 5",
        "Dono‑правила: 200",
        "Скрипти: безліміт",
        "Knowledge‑елементи: 20",
        "Watermark: перемикається",
        "Логи: 30 днів",
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
        "Підтримка Unreal",
      ],
    },
  ],
  faqs: [
    { q: "Потрібен API‑ключ?", a: "Basic використовує BYOK. Pro/Studio включають кредити." },
    { q: "Що таке активні години мовлення?", a: "Рахується лише час, коли RoxStreamAI говорить." },
    { q: "Чи можна вимкнути watermark?", a: "У Basic/Тесті — ні. У Pro/Studio — так." },
    { q: "Чи гарантується дохід?", a: "Ні, усе залежить від контенту та аудиторії." },
    { q: "Потрібен Unreal?", a: "Ні, це опція." },
    { q: "Працює 24/7?", a: "Так, Pro/Studio підтримують розклад." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Кейси брендів з AI‑персонажами",
      summary: "Always‑on кампанії та інтерактивні AI‑персонажі для брендів.",
      date: "2026-01-12",
      category: "Кейси",
      readingTime: "6 хв",
      content: [
        "AI‑стримери дозволяють запускати live‑формати без людини‑хоста.",
        "Почніть із головного персонажа та додайте пакети знань, щоб відповіді були в межах бренду.",
        "Планувальник multi‑account тримає регіональні канали активними 24/7, а модерація та аналітика централізовані.",
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
        "Користувачі Pro отримують кредити й готові workflows. BYOK дозволяє підключати власні моделі та голоси.",
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
        "Насамкінець налаштуйте guardrails і human‑override, щоб персонаж залишався стабільним навіть за великого чату.",
      ],
    },
  ],
};

const de: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Über uns",
    title: "Roxy ist für always‑on Creator gebaut",
    subtitle:
      "Wir entwickeln Streaming‑Automatisierung, die premium, sicher und vollständig steuerbar ist.",
    missionTitle: "Unsere Mission",
    missionBody:
      "Creator bekommen einen polierten KI‑Co‑Host, der Shows fährt, auf Geschenke reagiert und Zuschauer über Zeitzonen hinweg hält.",
    beliefTitle: "Woran wir glauben",
    beliefBody:
      "Kreativität führt. Roxy übernimmt Wiederholung, Planung und Reaktions‑Loops, damit du dich auf Strategie fokussierst.",
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
      { title: "Inhalte", body: "Du behältst die Rechte. Wir verarbeiten Inhalte nur zur Bereitstellung." },
      { title: "Abrechnung", body: "Pläne verlängern sich automatisch. Zusatznutzung kann berechnet werden." },
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
        highlights: ["Multi‑Account Scheduler", "Team‑Zugriff", "Analytics"],
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
      title: "Bereit für deinen Use Case?",
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
        { id: "go-live", title: "Live gehen", description: "Dono Engine + Stream Scripts aktivieren und vor 24/7 testen." },
      ],
    },
    product: {
      eyebrow: "Produkt",
      title: "Feature‑Dokumentation",
      subtitle: "Deep Dives in die Systeme, die Roxy antreiben.",
      items: [
        { id: "dono-engine", title: "Dono Engine", description: "Gifts auf Aktionen, Emotionen und Lines mappen – mit Prioritäten, Cooldowns und Safety‑Fallbacks." },
        { id: "stream-scripts", title: "Stream Scripts", description: "Intros, Loops, Mini‑Games und Battle‑Mode mit Timern planen." },
        { id: "scheduler", title: "Multi‑Account Scheduler", description: "Accounts und Regionen rotieren, um 24/7‑Coverage mit sicherem Pacing zu sichern." },
        { id: "safety", title: "Safety Guard", description: "Profanity‑Filter, gesperrte Topics, Rate‑Limits und Notfall‑Stopp‑Phrasen." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Live‑Reaktionen mit Avatar‑Scenes verbinden – event‑getrieben mit Lip‑Sync." },
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
        { term: "Dono Engine", description: "Regeln, die Gifts auf Emotionen, Lines, Actions, Cooldowns und Prioritäten mappen." },
        { term: "Stream Scripts", description: "Szenarien wie Intros, Loops, Mini‑Games und Battle‑Mode." },
        { term: "Wissenspaket", description: "Custom‑Fakten, die die Persona konsistent und on‑brand halten." },
        { term: "Watermark", description: "Visuelles Brand‑Mark, das in Pro/Studio deaktiviert werden kann." },
        { term: "Multi‑Account‑Queue", description: "Geplante Rotation mehrerer TikTok‑Accounts für 24/7‑Streaming." },
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
    addonDescription: "Unreal Live Connector, Lip‑Sync‑Trigger, Beispiel‑UE‑Scenes und Action‑Mapping für Dono Engine.",
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
    title: "Updates, Use Cases und Launch‑Notizen",
    subtitle: "Produktnews, Growth‑Playbooks und reale Stream‑Formate.",
    backToBlog: "Zurück zum Blog",
  },
  team: {
    eyebrow: "Team",
    title: "Das Team hinter RoxStreamAI",
    subtitle: "Ein fokussiertes Team aus Streaming‑Ops, AI‑Systemen und Produktdesign.",
    members: [
      { name: "Lia Chen", role: "Produkt & Growth", focus: "Creator‑Tooling, Onboarding und Pricing‑Strategie." },
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Realtime‑Systeme, Stream Scripts und Plattform‑Reliability." },
      { name: "Sofia Kim", role: "Design Lead", focus: "Brand‑System, UI‑Kits und neue Dashboard‑Flows." },
      { name: "Artem Volkov", role: "AI & Voice", focus: "Persona‑Tuning, TTS‑Pipelines und Safety‑Controls." },
    ],
    values: {
      eyebrow: "Werte",
      title: "So arbeiten wir",
      subtitle: "Prinzipien, die unsere Produktentscheidungen prägen.",
      items: [
        { title: "Creator‑first", description: "Wir bauen Tools, die Reibung entfernen, damit Creator sich auf Formate und Storytelling fokussieren." },
        { title: "Operative Klarheit", description: "Analytics, Workflows und Scripts für schnelle Entscheidungen und wiederholbares Wachstum." },
        { title: "Safety by default", description: "Jeder Flow enthält Moderationsregeln, Rate‑Limits und Guardrails vor dem Skalieren." },
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
    { q: "Ist Unreal erforderlich?", a: "Nein, optional via Unreal Connector." },
    { q: "Kann ich 24/7 laufen?", a: "Ja, Pro/Studio unterstützen Scheduling." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Brand‑Use‑Cases für AI‑Charaktere",
      summary: "Wie Marken always‑on Aktivierungen und interaktive Kampagnen mit AI‑Charakteren fahren.",
      date: "2026-01-12",
      category: "Use Cases",
      readingTime: "6 min",
      content: [
        "AI‑Streamer ermöglichen Live‑Formate ohne menschlichen Host. Der Charakter bleibt on‑message und reagiert auf Gifts.",
        "Starte mit einem Hero‑Charakter, füge Knowledge‑Packs hinzu und verknüpfe Dono‑Regeln mit Kampagnen‑Events.",
        "Agenturen nutzen Multi‑Account‑Scheduling für regionale Kanäle rund um die Uhr.",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "Introducing RoxStreamAI",
      summary: "Der schnelle Weg von Persona zur Live‑Session.",
      date: "2026-01-08",
      category: "Product",
      readingTime: "5 min",
      content: [
        "RoxStreamAI startet AI‑Streamer in Minuten: Account verbinden, Persona anpassen, live gehen.",
        "Fokus auf lange Sessions: sicheres Pacing, Moderation und Scheduler.",
        "Pro enthält Credits; BYOK erlaubt eigene Modelle und Voices.",
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
        "Setze Safety‑Guardrails und menschliche Overrides.",
      ],
    },
  ],
};

const es: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Acerca de",
    title: "Roxy está hecho para creadores always‑on",
    subtitle: "Automatización premium, segura y totalmente controlable.",
    missionTitle: "Nuestra misión",
    missionBody:
      "Dar a creadores un co‑host IA que ejecuta shows, reacciona a regalos y mantiene el engagement.",
    beliefTitle: "Lo que creemos",
    beliefBody:
      "La creatividad manda. Roxy se encarga de repetición, agenda y loops de reacción.",
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
      { title: "Contenido", body: "Conservas la propiedad; procesamos solo para el servicio." },
      { title: "Facturación", body: "Planes se renuevan automáticamente. Pueden aplicarse extras." },
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
        highlights: ["Scheduler multi‑cuenta", "Acceso de equipo", "Analytics"],
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
        { id: "go-live", title: "Ir en vivo", description: "Activa Dono Engine + Stream Scripts y prueba antes del 24/7." },
      ],
    },
    product: {
      eyebrow: "Producto",
      title: "Documentación de funciones",
      subtitle: "Profundiza en los sistemas que impulsan Roxy.",
      items: [
        { id: "dono-engine", title: "Dono Engine", description: "Asigna regalos a acciones, emociones y líneas con prioridades, cooldowns y fallback de seguridad." },
        { id: "stream-scripts", title: "Stream Scripts", description: "Programa intros, loops, mini‑juegos y battle mode con triggers temporizados." },
        { id: "scheduler", title: "Scheduler multi‑cuenta", description: "Rota cuentas y regiones para mantener cobertura continua con pacing seguro." },
        { id: "safety", title: "Safety Guard", description: "Filtros de lenguaje, temas bloqueados, límites de ritmo y frases de stop de emergencia." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Conecta reacciones al avatar con hooks event‑driven y lip‑sync." },
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
        { term: "Dono Engine", description: "Reglas que mapean regalos a emociones, líneas, acciones, cooldowns y prioridades." },
        { term: "Stream Scripts", description: "Escenarios como intros, loops, mini‑juegos y battle mode." },
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
    addonDescription: "Unreal Live connector, triggers de lip‑sync, escenas UE de ejemplo y mapeo de acciones para Dono Engine.",
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
      { name: "Maks Orlov", role: "Líder de ingeniería", focus: "Sistemas en tiempo real, stream scripts y confiabilidad de plataforma." },
      { name: "Sofia Kim", role: "Líder de diseño", focus: "Sistema de marca, kits UI y nuevos flujos del dashboard." },
      { name: "Artem Volkov", role: "AI y Voz", focus: "Ajuste de persona, pipelines TTS y controles de seguridad." },
    ],
    values: {
      eyebrow: "Valores",
      title: "Cómo trabajamos",
      subtitle: "Principios que guían el producto.",
      items: [
        { title: "Creator‑first", description: "Construimos herramientas que eliminan fricción para enfocarse en formatos y narrativa." },
        { title: "Claridad operativa", description: "Analítica, flujos y scripts para decisiones rápidas y crecimiento repetible." },
        { title: "Seguridad por defecto", description: "Cada flujo incluye reglas de moderación, límites de ritmo y guardrails antes de escalar." },
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
    { q: "¿Unreal es requerido?", a: "No, es opcional." },
    { q: "¿24/7?", a: "Sí, Pro/Studio soportan scheduling." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casos de uso de marca con personajes IA",
      summary: "Cómo las marcas activan campañas always‑on con personajes IA.",
      date: "2026-01-12",
      category: "Casos de uso",
      readingTime: "6 min",
      content: [
        "Los streamers IA permiten formatos live sin host humano. El personaje mantiene el mensaje y reacciona a regalos.",
        "Empieza con un personaje principal y añade paquetes de conocimiento para alinear respuestas.",
        "Para agencias, el scheduler multi‑cuenta mantiene canales regionales activos 24/7.",
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
        "Configura guardrails y un override humano.",
      ],
    },
  ],
};

const fr: MarketingContent = {
  ...en,
  about: {
    eyebrow: "À propos",
    title: "Roxy pour les créateurs always‑on",
    subtitle: "Automatisation premium, sûre et contrôlable.",
    missionTitle: "Notre mission",
    missionBody: "Un co‑host IA qui anime, réagit aux cadeaux et retient l’audience.",
    beliefTitle: "Nos convictions",
    beliefBody: "La créativité humaine d’abord. Roxy gère répétition, planning, réactions.",
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
      { title: "Contenu", body: "Vous gardez la propriété; traitement pour le service." },
      { title: "Facturation", body: "Renouvellement automatique. Extras possibles." },
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
    ],
  },
  useCases: {
    eyebrow: "Cas d’usage",
    title: "Résultats réels pour formats live modernes",
    subtitle: "Créateurs, faceless et agences avec Roxy.",
    items: [
      { id: "creators", title: "Créateurs", description: "Scaler sans burnout.", highlights: ["Pacing 24/7", "Réactions rapides", "Moments clips"] },
      { id: "faceless", title: "Faceless", description: "Chaînes avec personnage sans caméra.", highlights: ["Persona + pack de connaissances", "Voix", "Modération"] },
      { id: "agencies", title: "Agences", description: "Multi‑comptes et langues.", highlights: ["Scheduler", "Accès équipe", "Analytics"] },
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
        { id: "go-live", title: "Passer live", description: "Activez Dono Engine + Stream Scripts et testez avant le 24/7." },
      ],
    },
    product: {
      eyebrow: "Produit",
      title: "Documentation des fonctionnalités",
      subtitle: "Plongée dans les systèmes qui alimentent Roxy.",
      items: [
        { id: "dono-engine", title: "Dono Engine", description: "Associez cadeaux à actions, émotions et lignes avec priorités, cooldowns et fallback sécurité." },
        { id: "stream-scripts", title: "Stream Scripts", description: "Planifiez intros, loops, mini‑jeux et battle mode avec déclencheurs temporisés." },
        { id: "scheduler", title: "Scheduler multi‑compte", description: "Faites tourner comptes et régions pour une couverture 24/7 avec pacing sûr." },
        { id: "safety", title: "Safety Guard", description: "Filtres de langage, sujets bloqués, rate limits et phrases d’arrêt d’urgence." },
        { id: "unreal-connector", title: "Unreal Connector", description: "Connectez les réactions live à l’avatar via hooks event‑driven et lip‑sync." },
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
        { term: "Dono Engine", description: "Règles qui lient cadeaux à émotions, lignes, actions, cooldowns et priorités." },
        { term: "Stream Scripts", description: "Scénarios d’intro, loops, mini‑jeux et battle mode." },
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
    addonDescription: "Unreal Live connector, triggers de lip‑sync, scènes UE exemples et mapping d’actions pour Dono Engine.",
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
      { name: "Artem Volkov", role: "IA & Voice", focus: "Tuning persona, pipelines TTS et contrôles de sécurité." },
    ],
    values: {
      eyebrow: "Valeurs",
      title: "Notre façon de travailler",
      subtitle: "Principes qui guident nos décisions produit.",
      items: [
        { title: "Creator‑first", description: "On construit des outils qui éliminent la friction pour se concentrer sur formats et storytelling." },
        { title: "Clarté opérationnelle", description: "Analytics, workflows et scripts pour décisions rapides et croissance répétable." },
        { title: "Sécurité par défaut", description: "Chaque flow inclut règles de modération, rate limits et guardrails avant l’échelle." },
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
    { q: "Unreal est‑il requis ?", a: "Non, optionnel via l’Unreal Connector." },
    { q: "24/7 ?", a: "Oui, Pro/Studio supportent la planification." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Cas d’usage marque pour les personnages IA",
      summary: "Activations always‑on et campagnes interactives avec personnages IA.",
      date: "2026-01-12",
      category: "Cas d’usage",
      readingTime: "6 min",
      content: [
        "Les streamers IA permettent des formats live sans host humain.",
        "Commencez par un personnage principal et ajoutez des packs de connaissances.",
        "Le scheduler multi‑compte garde les chaînes régionales actives 24/7.",
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
        "Sessions longues avec pacing sûr, modération et scheduler.",
        "Pro inclut des crédits; BYOK permet vos propres modèles et voix.",
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
        "Ajoutez des guardrails et un override humain.",
      ],
    },
  ],
};

const it: MarketingContent = {
  ...en,
  about: {
    eyebrow: "Chi siamo",
    title: "Roxy per creator always‑on",
    subtitle: "Automazione premium, sicura e controllabile.",
    missionTitle: "La nostra missione",
    missionBody: "Un co‑host IA che gestisce gli show, reagisce ai regali e mantiene l’engagement.",
    beliefTitle: "In cosa crediamo",
    beliefBody: "La creatività umana viene prima. Roxy gestisce ripetizioni, pianificazione e loop di reazione.",
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
      { title: "Contenuti", body: "Proprietà tua; elaboriamo solo per il servizio." },
      { title: "Fatturazione", body: "Rinnovo automatico. Extra possibili." },
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
        highlights: ["Persona + pacchetto di conoscenze", "Controllo stile voce", "Guardrail di moderazione"],
      },
      {
        id: "agencies",
        title: "Agenzie",
        description:
          "Gestisci più creator, login e lingue da un’unica regia. Ideale per studi e operatori multi‑account.",
        highlights: ["Scheduler multi‑account", "Accesso team + log attività", "Analytics centralizzate"],
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
          id: "go-live",
          title: "Vai live",
          description: "Abilita Dono Engine e Stream Scripts e fai una sessione di test prima del 24/7.",
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
          title: "Dono Engine",
          description: "Mappa regali ad azioni, emozioni e battute con priorità, cooldown e fallback di sicurezza.",
        },
        {
          id: "stream-scripts",
          title: "Stream Scripts",
          description: "Programma intro, loop, mini‑giochi e battle mode con trigger temporizzati.",
        },
        {
          id: "scheduler",
          title: "Scheduler multi‑account",
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
          term: "Dono Engine",
          description: "Regole che mappano regali a emozioni, linee, azioni, cooldown e priorità.",
        },
        {
          term: "Stream Scripts",
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
          term: "Coda multi‑account",
          description: "Rotazione schedulata di più account TikTok per streaming 24/7.",
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
      "Connettore Unreal Live, trigger lip‑sync, scene UE di esempio e mapping azioni per Dono Engine.",
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
      { name: "Maks Orlov", role: "Engineering Lead", focus: "Sistemi realtime, stream scripts e affidabilità piattaforma." },
      { name: "Sofia Kim", role: "Design Lead", focus: "Brand system, UI kit e nuovi flow dashboard." },
      { name: "Artem Volkov", role: "AI & Voice", focus: "Tuning persona, pipeline TTS e controlli di sicurezza." },
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
          description: "Analytics, workflow e script per decisioni rapide e crescita ripetibile.",
        },
        {
          title: "Safety by default",
          description: "Ogni flow include regole di moderazione, rate limit e guardrail prima della scala.",
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
    { q: "Serve Unreal?", a: "No, è opzionale." },
    { q: "24/7?", a: "Sì, Pro/Studio supportano scheduling." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casi d’uso di brand con personaggi IA",
      summary: "Attivazioni always‑on e campagne interattive con personaggi IA.",
      date: "2026-01-12",
      category: "Casi d’uso",
      readingTime: "6 min",
      content: [
        "Gli streamer IA permettono formati live senza host umano.",
        "Inizia con un personaggio principale e aggiungi pacchetti di conoscenze.",
        "Il scheduler multi‑account mantiene canali regionali attivi 24/7.",
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
        "Imposta guardrail e override umano.",
      ],
    },
  ],
};

const pt: MarketingContent = {
  ...en,
  about: { eyebrow: "Sobre", title: "Roxy para creators always‑on", subtitle: "Automação premium, segura e controlável.", missionTitle: "Nossa missão", missionBody: "Um co‑host IA que conduz shows, reage a presentes e mantém o público engajado.", beliefTitle: "No que acreditamos", beliefBody: "A criatividade humana vem primeiro. A Roxy cuida da repetição, do agendamento e dos loops de reação." },
  contact: { eyebrow: "Contato", title: "Vamos planejar seu próximo live", subtitle: "Conte seus objetivos e montamos o rollout.", firstName: "Nome", lastName: "Sobrenome", email: "Email de trabalho", message: "O que você quer automatizar?", sendRequest: "Enviar", directLines: "Contato direto", responseTime: "Respondemos em 1 dia útil." },
  terms: { title: "Termos", intro: "Estes termos regem o uso do RoxStreamAI.", sections: [ { title: "Contas", body: "Você é responsável por suas credenciais." }, { title: "Uso", body: "Siga regras e leis. Abusos proibidos." }, { title: "Conteúdo", body: "Você mantém a propriedade." }, { title: "Cobrança", body: "Renovação automática, extras possíveis." }, { title: "Encerramento", body: "Podemos suspender por violação." } ] },
  privacy: { title: "Privacidade", intro: "Coletamos apenas dados necessários.", sections: [ { title: "Dados coletados", body: "Detalhes da conta, métricas e configs." }, { title: "Uso", body: "Auth, sessões, suporte, segurança." }, { title: "Retenção", body: "Depende do plano." }, { title: "Controle", body: "Exportar/excluir dados." } ] },
  useCases: { eyebrow: "Casos de uso", title: "Resultados reais para lives modernas", subtitle: "Criadores, canais sem rosto e agências com Roxy.", items: [ { id: "creators", title: "Criadores", description: "Amplie horas de live sem burnout. Automatize saudações, reações a presentes e intervalos mantendo sua voz consistente.", highlights: ["Ritmo 24/7 com pausas seguras", "Reações instantâneas a presentes", "Momentos de clipe com scripts"] }, { id: "faceless", title: "Sem rosto", description: "Lance um canal guiado por personagem sem aparecer em câmera. Crie lore e mantenha o engajamento alto.", highlights: ["Persona + pacote de conhecimento", "Controle de estilo de voz", "Guardrails de moderação"] }, { id: "agencies", title: "Agências", description: "Gerencie vários creators, logins e idiomas em uma única central. Ideal para estúdios e operações multi‑conta.", highlights: ["Scheduler multi‑conta", "Acesso em equipe + logs", "Análises centralizadas"] } ], outcomes: { eyebrow: "Resultados", title: "O que as equipes desbloqueiam", subtitle: "Ciclos curtos, métricas claras e controle de marca.", items: [ { title: "Mais retenção", description: "Scripts e gatilhos de presentes mantêm o público engajado em sessões longas." }, { title: "Menor custo operacional", description: "Reduza moderação manual e tempo de câmera mantendo a produção diária." }, { title: "Experimentos mais rápidos", description: "Itere ganchos e formatos com testes rápidos e scripts A/B." } ] }, cta: { title: "Pronto para mapear seu caso de uso?", subtitle: "Diga o que automatizar e montamos o rollout.", primary: "Falar com a gente", secondary: "Ver preços" } },
  docs: { quickstart: { eyebrow: "Documentação", title: "Guia rápido", subtitle: "Tudo o que você precisa para iniciar sua primeira sessão de AI streamer.", steps: [ { id: "connect", title: "Conectar", description: "Vincule sua conta TikTok Live, selecione região e idioma padrão do personagem." }, { id: "customize", title: "Personalizar", description: "Crie a persona, adicione pacotes de conhecimento, escolha a voz e defina regras de segurança." }, { id: "go-live", title: "Entrar ao vivo", description: "Ative Dono Engine + Stream Scripts e faça uma sessão de teste antes do 24/7." } ] }, product: { eyebrow: "Produto", title: "Documentação de funcionalidades", subtitle: "Aprofunde nos sistemas que alimentam a Roxy.", items: [ { id: "dono-engine", title: "Dono Engine", description: "Mapeie presentes para ações, emoções e falas com prioridades, cooldowns e fallback de segurança." }, { id: "stream-scripts", title: "Stream Scripts", description: "Programe intros, loops, mini‑jogos e modo batalha com gatilhos temporizados." }, { id: "scheduler", title: "Scheduler multi‑conta", description: "Alterne contas e regiões para manter cobertura contínua com ritmo seguro." }, { id: "safety", title: "Safety Guard", description: "Filtros de linguagem, tópicos bloqueados, rate limits e frases de parada emergencial." }, { id: "unreal-connector", title: "Unreal Connector", description: "Conecte reações ao avatar com hooks event‑driven e lip‑sync." } ] }, api: { eyebrow: "API", title: "Visão geral de referência", subtitle: "Endpoints estruturados para integrações e análises.", sections: [ { title: "Autenticação", description: "Use as chaves de projeto do dashboard. As requisições são autorizadas via bearer token.", items: [ "POST /auth/token — trocar API key por session token", "POST /auth/refresh — atualizar session token" ] }, { title: "Personagens", description: "Crie, atualize e versione perfis de personagem usados em lives.", items: [ "GET /characters — listar personagens", "POST /characters — criar personagem", "PATCH /characters/{id} — atualizar persona" ] }, { title: "Sessões", description: "Inicie ou pare sessões ao vivo, inspecione métricas e obtenha transcrições.", items: [ "POST /sessions/start — iniciar sessão", "POST /sessions/stop — parar sessão", "GET /sessions/{id} — detalhes da sessão" ] }, { title: "Eventos", description: "Assine reações a presentes, eventos de script e sinais de moderação.", items: [ "GET /events/stream — server‑sent events", "POST /webhooks — registrar webhook" ] } ] }, glossary: { eyebrow: "Glossário", title: "Termos‑chave", subtitle: "Definições curtas usadas no dashboard.", items: [ { term: "Horas de fala ativa", description: "Minutos em que a Roxy gera e reproduz TTS. Silêncio não conta." }, { term: "Dono Engine", description: "Regras que mapeiam presentes para emoções, falas, ações, cooldowns e prioridades." }, { term: "Stream Scripts", description: "Cenários como intros, loops, mini‑jogos e modo batalha." }, { term: "Pacote de conhecimento", description: "Fatos personalizados para manter a persona consistente e alinhada à marca." }, { term: "Marca d’água", description: "Marca visual que pode ser desativada nos planos Pro e Studio." }, { term: "Fila multi‑conta", description: "Rotação programada de várias contas TikTok para streaming 24/7." } ] } },
  pricing: { eyebrow: "Preços", title: "Preços que escalam com seu streaming", subtitle: "Escolha BYOK para máximo controle ou créditos Pro para plug‑and‑play.", comparisonTitle: "Comparação de planos", comparisonHeaders: ["Recurso", "Teste", "Basic", "Pro", "Studio"], comparisonRows: [ { label: "Horas ativas incluídas", values: ["60 min", "Ilimitado (BYOK)", "10 horas", "40 horas"] }, { label: "Marca d’água", values: ["On", "On", "Toggle", "Toggle"] }, { label: "Contas", values: ["1", "1", "Até 5", "Até 20"] }, { label: "Regras Dono", values: ["10", "20", "200", "1000"] }, { label: "Scripts", values: ["2", "3", "Ilimitados", "Ilimitados + avançados"] }, { label: "Itens de conhecimento", values: ["-", "3", "20", "200"] }, { label: "Retenção de logs", values: ["3 dias", "7 dias", "30 dias", "90 dias"] }, { label: "Assentos de equipe", values: ["-", "-", "-", "5"] }, { label: "Licença comercial", values: ["-", "-", "-", "Sim"] }, { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] } ], extraCreditsTitle: "Créditos extras", extraCreditsSubtitle: "Compre mais horas ativas quando atingir o limite.", extraCredits: [ { label: "+10 horas", price: "€25" }, { label: "+50 horas", price: "€99" }, { label: "+200 horas", price: "€299" } ], addonTitle: "Pacote Unreal Connector", addonBadge: "Add‑on", addonDescription: "Conector Unreal Live, gatilhos de lip‑sync, cenas UE de exemplo e mapeamento de ações para o Dono Engine.", addonPrices: [ { label: "Mensal", price: "€49 / mês" }, { label: "Vitalício", price: "€299" } ], addonCta: "Gerenciar add‑ons", faqEyebrow: "FAQ", faqTitle: "Precisa de respostas rápidas?", faqSubtitle: "Dúvidas sobre planos, simplificadas." },
  blog: { eyebrow: "Blog", title: "Atualizações, casos de uso e notas de lançamento", subtitle: "Novidades do produto, playbooks de crescimento e formatos reais de streaming.", backToBlog: "Voltar ao blog" },
  team: { eyebrow: "Equipe", title: "Quem constrói a RoxStreamAI", subtitle: "Um time pequeno e focado que combina operações de streaming, IA e design de produto.", members: [ { name: "Lia Chen", role: "Produto & Growth", focus: "Ferramentas para creators, onboarding e estratégia de preços." }, { name: "Maks Orlov", role: "Líder de Engenharia", focus: "Sistemas em tempo real, scripts de stream e confiabilidade." }, { name: "Sofia Kim", role: "Líder de Design", focus: "Sistema de marca, kits de UI e novos fluxos do dashboard." }, { name: "Artem Volkov", role: "IA & Voz", focus: "Ajuste de persona, pipelines de TTS e controles de segurança." } ], values: { eyebrow: "Valores", title: "Como trabalhamos", subtitle: "Princípios que moldam cada decisão de produto.", items: [ { title: "Creator‑first", description: "Criamos ferramentas que removem atrito para foco em formatos e storytelling." }, { title: "Clareza operacional", description: "Analytics, workflows e scripts pensados para decisões rápidas e crescimento repetível." }, { title: "Segurança por padrão", description: "Cada fluxo inclui regras de moderação, limites e guardrails antes de escalar." } ] }, cta: { title: "Quer colaborar?", subtitle: "Parcerias, integrações ou acesso antecipado—vamos conversar.", primary: "Contato", secondary: "Ler atualizações" } },
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
    { q: "Unreal é obrigatório?", a: "Não, é opcional." },
    { q: "24/7?", a: "Sim, Pro/Studio suportam agendamento." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "Casos de uso de marca com personagens IA",
      summary: "Ativações always‑on e campanhas interativas com personagens IA.",
      date: "2026-01-12",
      category: "Casos de uso",
      readingTime: "6 min",
      content: [
        "Streamers IA permitem formatos live sem host humano.",
        "Comece com um personagem principal e adicione pacotes de conhecimento.",
        "O scheduler multi‑conta mantém canais regionais ativos 24/7.",
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
        "Configure guardrails e override humano.",
      ],
    },
  ],
};

const tr: MarketingContent = {
  ...en,
  about: { eyebrow: "Hakkında", title: "Roxy always‑on creator’lar için", subtitle: "Premium, güvenli ve kontrol edilebilir otomasyon.", missionTitle: "Misyonumuz", missionBody: "Show’ları yöneten, bağışlara tepki veren ve izleyiciyi bağlı tutan AI co‑host.", beliefTitle: "İnandıklarımız", beliefBody: "İnsan yaratıcılığı önde. Roxy tekrarları, planlamayı ve reaksiyon döngülerini yönetir." },
  contact: { eyebrow: "İletişim", title: "Bir sonraki live formatını planlayalım", subtitle: "Hedeflerini anlat, rollout hazırlayalım.", firstName: "Ad", lastName: "Soyad", email: "İş e‑posta", message: "Neyi otomatikleştirmek istiyorsun?", sendRequest: "Gönder", directLines: "Doğrudan hatlar", responseTime: "1 iş günü içinde yanıt." },
  terms: { title: "Şartlar", intro: "RoxStreamAI kullanım şartları.", sections: [ { title: "Hesaplar", body: "Kimlik bilgileri sana aittir." }, { title: "Kullanım", body: "Kurallara uy. İstismar yasak." }, { title: "İçerik", body: "Sahiplik sende kalır." }, { title: "Faturalandırma", body: "Otomatik yenileme." }, { title: "Fesih", body: "İhlalde erişim durdurulabilir." } ] },
  privacy: { title: "Gizlilik", intro: "Sadece gerekli veriler toplanır.", sections: [ { title: "Toplanan veriler", body: "Hesap detayları, metrikler, ayarlar." }, { title: "Kullanım", body: "Auth, oturum, destek, güvenlik." }, { title: "Saklama", body: "Plana bağlı." }, { title: "Kontrol", body: "İhracat/silme." } ] },
  useCases: { eyebrow: "Kullanım alanları", title: "Modern canlı yayınlar için gerçek sonuçlar", subtitle: "Creator, faceless ve ajanslar için.", items: [ { id: "creators", title: "Creator’lar", description: "Burnout olmadan yayın saatlerini büyütün. Karşılama, bağış tepkileri ve araları otomatikleştirirken sesinizi tutarlı tutun.", highlights: ["24/7 güvenli pacing", "Bağışlara anında reaksiyon", "Script ile klip anları"] }, { id: "faceless", title: "Faceless", description: "Kameraya çıkmadan karakter odaklı kanal başlatın. Lore oluşturun ve etkileşimi yüksek tutun.", highlights: ["Persona + bilgi paketi", "Ses stili kontrolü", "Moderasyon guardrail’leri"] }, { id: "agencies", title: "Ajanslar", description: "Tek bir merkezden birden çok creator, giriş ve dil yönetin. Stüdyo ve multi‑account operasyonları için ideal.", highlights: ["Multi‑account scheduler", "Ekip erişimi + aktivite logları", "Merkezi analitik"] } ], outcomes: { eyebrow: "Sonuçlar", title: "Takımların kazancı", subtitle: "Kısa döngüler, net metrikler ve marka kontrolü.", items: [ { title: "Daha yüksek tutma", description: "Script ve hediye trigger’ları uzun oturumlarda etkileşimi artırır." }, { title: "Daha düşük operasyon maliyeti", description: "Manuel moderasyonu ve kamera süresini azaltırken günlük çıktıyı koruyun." }, { title: "Daha hızlı denemeler", description: "Hızlı senaryo testleri ve A/B scriptlerle formatları iterasyonlayın." } ] }, cta: { title: "Kullanım alanınızı haritalamaya hazır mısınız?", subtitle: "Neyi otomatikleştirmek istediğinizi söyleyin, rollout planı çıkaralım.", primary: "İletişim", secondary: "Fiyatları gör" } },
  docs: { quickstart: { eyebrow: "Dokümanlar", title: "Hızlı başlangıç", subtitle: "İlk AI streamer oturumunu başlatmak için gereken her şey.", steps: [ { id: "connect", title: "Bağla", description: "TikTok Live hesabını bağla, bölge seç ve karakter için varsayılan dil ayarla." }, { id: "customize", title: "Özelleştir", description: "Persona oluştur, bilgi paketleri ekle, ses seç ve güvenlik kuralları tanımla." }, { id: "go-live", title: "Yayına çık", description: "Dono Engine + Stream Scripts’i etkinleştir ve 24/7’den önce test yayını yap." } ] }, product: { eyebrow: "Ürün", title: "Özellik dokümantasyonu", subtitle: "Roxy’yi güçlendiren sistemlere derin dalış.", items: [ { id: "dono-engine", title: "Dono Engine", description: "Bağışları aksiyonlara, duygulara ve repliklere eşleştir; öncelik, cooldown ve güvenlik fallback’leriyle." }, { id: "stream-scripts", title: "Stream Scripts", description: "Intro, loop, mini‑oyun ve battle modlarını zamanlı tetikleyicilerle planla." }, { id: "scheduler", title: "Multi‑account Scheduler", description: "24/7 canlı kapsama için hesap ve bölgeleri güvenli pacing ile döndür." }, { id: "safety", title: "Safety Guard", description: "Küfür filtresi, bloklu konular, hız limitleri ve acil durdurma ifadeleri." }, { id: "unreal-connector", title: "Unreal Connector", description: "Canlı reaksiyonları avatar sahnesine event‑driven hook ve lip‑sync ile bağla." } ] }, api: { eyebrow: "API", title: "Referans özeti", subtitle: "Entegrasyon ve analitik için yapılandırılmış uç noktalar.", sections: [ { title: "Kimlik doğrulama", description: "Dashboard’daki proje anahtarlarını kullan. İstekler bearer token ile yetkilendirilir.", items: [ "POST /auth/token — API anahtarını session token’a çevir", "POST /auth/refresh — session token yenile" ] }, { title: "Karakterler", description: "Canlı oturumlarda kullanılan karakter profillerini oluştur, güncelle ve versiyonla.", items: [ "GET /characters — karakter listele", "POST /characters — karakter oluştur", "PATCH /characters/{id} — persona güncelle" ] }, { title: "Oturumlar", description: "Canlı oturum başlat/durdur, metrikleri incele ve transkript çek.", items: [ "POST /sessions/start — oturum başlat", "POST /sessions/stop — oturum durdur", "GET /sessions/{id} — oturum detayları" ] }, { title: "Etkinlikler", description: "Bağış tepkileri, script olayları ve moderasyon sinyallerini izle.", items: [ "GET /events/stream — server‑sent events", "POST /webhooks — webhook kaydet" ] } ] }, glossary: { eyebrow: "Sözlük", title: "Temel terimler", subtitle: "Dashboard’da kullanılan kısa tanımlar.", items: [ { term: "Aktif konuşma saatleri", description: "Roxy’nin TTS ürettiği ve çaldığı süre. Sessizlik sayılmaz." }, { term: "Dono Engine", description: "Bağışları duygu, replik, aksiyon, cooldown ve önceliklerle eşleyen kurallar." }, { term: "Stream Scripts", description: "Intro, loop, mini‑oyun ve battle mod akışları." }, { term: "Bilgi paketi", description: "Persona’yı tutarlı ve markaya uygun yapan özel bilgiler." }, { term: "Filigran", description: "Pro ve Studio planlarında kapatılabilen görsel marka işareti." }, { term: "Multi‑account queue", description: "Birden fazla TikTok hesabı için 24/7 rotasyon planı." } ] } },
  pricing: { eyebrow: "Fiyatlandırma", title: "Yayınınızla ölçeklenen fiyatlar", subtitle: "Maksimum kontrol için BYOK veya Pro kredi ile hızlı başlangıç.", comparisonTitle: "Plan karşılaştırması", comparisonHeaders: ["Özellik", "Deneme", "Basic", "Pro", "Studio"], comparisonRows: [ { label: "Dahil aktif konuşma süresi", values: ["60 dk", "Sınırsız (BYOK)", "10 saat", "40 saat"] }, { label: "Filigran", values: ["Açık", "Açık", "Aç/Kapa", "Aç/Kapa"] }, { label: "Hesaplar", values: ["1", "1", "En fazla 5", "En fazla 20"] }, { label: "Dono kuralları", values: ["10", "20", "200", "1000"] }, { label: "Scriptler", values: ["2", "3", "Sınırsız", "Sınırsız + gelişmiş"] }, { label: "Knowledge öğeleri", values: ["-", "3", "20", "200"] }, { label: "Log saklama", values: ["3 gün", "7 gün", "30 gün", "90 gün"] }, { label: "Ekip koltukları", values: ["-", "-", "-", "5"] }, { label: "Ticari lisans", values: ["-", "-", "-", "Evet"] }, { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] } ], extraCreditsTitle: "Ek krediler", extraCreditsSubtitle: "Limit dolunca daha fazla aktif konuşma saati satın alın.", extraCredits: [ { label: "+10 saat", price: "€25" }, { label: "+50 saat", price: "€99" }, { label: "+200 saat", price: "€299" } ], addonTitle: "Unreal Connector Paketi", addonBadge: "Eklenti", addonDescription: "Unreal Live connector, lip‑sync tetikleri, örnek UE sahneleri ve Dono Engine aksiyon eşlemesi.", addonPrices: [ { label: "Aylık", price: "€49 / ay" }, { label: "Ömür boyu", price: "€299" } ], addonCta: "Eklentileri yönet", faqEyebrow: "SSS", faqTitle: "Hızlı cevap mı lazım?", faqSubtitle: "Plan soruları, kısaca." },
  blog: { eyebrow: "Blog", title: "Güncellemeler, kullanım alanları ve sürüm notları", subtitle: "Ürün haberleri, büyüme playbook’ları ve gerçek yayın formatları.", backToBlog: "Bloga dön" },
  team: { eyebrow: "Ekip", title: "RoxStreamAI’i geliştirenler", subtitle: "Yayın operasyonları, AI sistemleri ve ürün tasarımını birleştiren küçük bir ekip.", members: [ { name: "Lia Chen", role: "Ürün & Growth", focus: "Creator araçları, onboarding ve fiyatlama stratejisi." }, { name: "Maks Orlov", role: "Mühendislik Lideri", focus: "Gerçek zamanlı sistemler, stream scriptleri ve platform güvenilirliği." }, { name: "Sofia Kim", role: "Tasarım Lideri", focus: "Marka sistemi, UI kitleri ve yeni dashboard akışları." }, { name: "Artem Volkov", role: "AI & Ses", focus: "Persona ayarı, TTS hatları ve güvenlik kontrolleri." } ], values: { eyebrow: "Değerler", title: "Nasıl çalışıyoruz", subtitle: "Her ürün kararını şekillendiren ilkeler.", items: [ { title: "Creator‑first", description: "Creator’ların format ve hikayeye odaklanması için sürtünmeyi azaltırız." }, { title: "Operasyonel netlik", description: "Analitik, iş akışları ve scriptler hızlı karar ve tekrarlanabilir büyüme için tasarlandı." }, { title: "Varsayılan güvenlik", description: "Her akış, ölçeklemeden önce moderasyon kuralları ve guardrail’ler içerir." } ] }, cta: { title: "İş birliği yapmak ister misiniz?", subtitle: "Partnerlik, entegrasyon veya erken erişim talepleri—konuşalım.", primary: "İletişim", secondary: "Güncellemeleri oku" } },
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
    { q: "Unreal gerekli mi?", a: "Hayır, opsiyonel." },
    { q: "24/7 çalışır mı?", a: "Evet, Pro/Studio scheduling destekler." },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "AI karakterlerle marka kullanım alanları",
      summary: "Always‑on kampanyalar ve etkileşimli AI karakter kullanımı.",
      date: "2026-01-12",
      category: "Kullanım alanları",
      readingTime: "6 dk",
      content: [
        "AI streamer’lar insan host olmadan live formatlar sağlar.",
        "Ana karakterle başlayın ve bilgi paketi ekleyin.",
        "Multi‑account scheduler bölgesel kanalları 24/7 açık tutar.",
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
        "Guardrail ve insan override ekleyin.",
      ],
    },
  ],
};

const ja: MarketingContent = {
  ...en,
  about: {
    eyebrow: "概要",
    title: "Roxy は常時稼働クリエイターのために",
    subtitle: "プレミアムで安全、完全に制御できる配信自動化。",
    missionTitle: "ミッション",
    missionBody:
      "番組運営、ギフト反応、視聴者維持を行う磨き上げたAI共同ホストを提供します。",
    beliefTitle: "私たちの信念",
    beliefBody:
      "主役は人の創造性。Roxy が反復、スケジューリング、反応ループを担い、戦略に集中できます。",
  },
  contact: {
    eyebrow: "お問い合わせ",
    title: "次のライブフォーマットを設計しましょう",
    subtitle: "配信目標を教えてください。最適な展開を設計します。",
    firstName: "名",
    lastName: "姓",
    email: "会社メール",
    message: "Roxy に何を自動化させたいですか？",
    sendRequest: "送信",
    directLines: "直通連絡先",
    responseTime: "1営業日以内に返信します。",
  },
  terms: {
    title: "利用規約",
    intro:
      "これらの規約は RoxStreamAI のWebサイト、デスクトップアプリ、関連サービスの利用に適用されます。アカウント作成または利用により同意したものとみなします。",
    sections: [
      {
        title: "アカウント",
        body: "資格情報の機密保持およびアカウントでの活動は利用者の責任です。",
      },
      {
        title: "利用",
        body: "プラットフォーム規約、関連法、コミュニティガイドラインを遵守してください。",
      },
      {
        title: "コンテンツ",
        body: "コンテンツの所有権は利用者にあります。サービス提供のために処理する権限を付与します。",
      },
      {
        title: "請求",
        body: "有料プランは解約まで自動更新されます。追加クレジットやアドオンは別途課金される場合があります。",
      },
      {
        title: "停止",
        body: "規約違反や不正利用がある場合、アクセスを停止または終了することがあります。",
      },
    ],
  },
  privacy: {
    title: "プライバシー",
    intro:
      "RoxStreamAI は配信自動化、分析、アカウント管理に必要なデータのみを収集します。個人データの販売は行いません。",
    sections: [
      {
        title: "収集するデータ",
        body: "アカウント情報、使用状況メトリクス、キャラクター・スクリプト・統合の設定。",
      },
      {
        title: "利用目的",
        body: "認証、配信セッション運用、サポート提供、信頼性と安全性の向上のため。",
      },
      {
        title: "保存期間",
        body: "保持期間はプランにより異なり、ダッシュボードやサポートで管理できます。",
      },
      {
        title: "ユーザーの管理",
        body: "いつでもデータのエクスポート・削除が可能です。",
      },
    ],
  },
  useCases: {
    eyebrow: "ユースケース",
    title: "現代のライブに実際の成果を",
    subtitle: "クリエイター、顔出しなし配信、代理店が Roxy を活用しています。",
    items: [
      {
        id: "creators",
        title: "クリエイター",
        description:
          "燃え尽きずに配信時間を拡大。挨拶、ギフト反応、休憩を自動化しながら声の一貫性を保てます。",
        highlights: ["24/7の安全なペース", "ギフトへの即時反応", "スクリプトで切り抜き素材"],
      },
      {
        id: "faceless",
        title: "顔出しなし配信",
        description:
          "顔出しせずにキャラクター主導チャンネルを運用。世界観のあるペルソナで高いエンゲージメントを維持します。",
        highlights: ["ペルソナ + 知識パック", "ボイススタイル制御", "モデレーションガード"],
      },
      {
        id: "agencies",
        title: "代理店",
        description:
          "複数のクリエイター、ログイン、言語を一つの管制室で管理。スタジオや多アカウント運用に最適です。",
        highlights: ["マルチアカウントスケジューラ", "チームアクセス + 活動ログ", "集中分析"],
      },
    ],
    outcomes: {
      eyebrow: "成果",
      title: "チームが得られること",
      subtitle: "短いサイクル、明確な指標、一貫したブランド管理。",
      items: [
        {
          title: "高い維持率",
          description: "スクリプトとギフトトリガーで長時間の視聴維持を実現します。",
        },
        {
          title: "運用コスト削減",
          description: "手動モデレーションとオンカメ時間を削減し、日々の出力を維持します。",
        },
        {
          title: "実験の高速化",
          description: "フックやフォーマットを素早く検証できるA/Bスクリプト。",
        },
      ],
    },
    cta: {
      title: "ユースケースを整理しませんか？",
      subtitle: "自動化したい内容を教えてください。ロールアウトを設計します。",
      primary: "相談する",
      secondary: "料金を見る",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "ドキュメント",
      title: "クイックスタート",
      subtitle: "最初のAIストリーマーを起動するための手順。",
      steps: [
        {
          id: "connect",
          title: "接続",
          description: "TikTok Live アカウントを連携し、地域と言語を選択します。",
        },
        {
          id: "customize",
          title: "カスタマイズ",
          description: "ペルソナ作成、知識パック追加、声の選択、安全ルール設定。",
        },
        {
          id: "go-live",
          title: "配信開始",
          description: "Dono Engine と Stream Scripts を有効化し、24/7前にテスト配信。",
        },
      ],
    },
    product: {
      eyebrow: "製品",
      title: "機能ドキュメント",
      subtitle: "Roxy を支えるシステムを深掘りします。",
      items: [
        {
          id: "dono-engine",
          title: "Dono Engine",
          description: "ギフトをアクションや感情にマッピング。優先度、クールダウン、安全フォールバックを設定。",
        },
        {
          id: "stream-scripts",
          title: "Stream Scripts",
          description: "イントロ、ループ、ミニゲーム、バトルモードをタイムトリガーで実行。",
        },
        {
          id: "scheduler",
          title: "マルチアカウントスケジューラ",
          description: "複数アカウントと地域をローテーションし、24/7配信を維持します。",
        },
        {
          id: "safety",
          title: "セーフティガード",
          description: "不適切語フィルタ、ブロックトピック、レート制限、緊急停止フレーズ。",
        },
        {
          id: "unreal-connector",
          title: "Unreal Connector",
          description: "アバターシーンのリアクションとリップシンクをイベント駆動で接続。",
        },
      ],
    },
    api: {
      eyebrow: "API",
      title: "リファレンス概要",
      subtitle: "統合と分析のための構造化エンドポイント。",
      sections: [
        {
          title: "認証",
          description: "ダッシュボードのプロジェクトキーを使用。ベアラートークンで認可します。",
          items: [
            "POST /auth/token — APIキーをセッショントークンに交換",
            "POST /auth/refresh — セッショントークンを更新",
          ],
        },
        {
          title: "キャラクター",
          description: "配信で使うキャラクタープロフィールの作成・更新・バージョン管理。",
          items: [
            "GET /characters — キャラクター一覧",
            "POST /characters — キャラクター作成",
            "PATCH /characters/{id} — ペルソナ更新",
          ],
        },
        {
          title: "セッション",
          description: "配信セッションの開始/停止、メトリクス確認、トランスクリプト取得。",
          items: [
            "POST /sessions/start — セッション開始",
            "POST /sessions/stop — セッション停止",
            "GET /sessions/{id} — セッション詳細",
          ],
        },
        {
          title: "イベント",
          description: "ギフト反応、スクリプトイベント、モデレーション信号を購読。",
          items: [
            "GET /events/stream — サーバー送信イベント",
            "POST /webhooks — Webhook登録",
          ],
        },
      ],
    },
    glossary: {
      eyebrow: "用語集",
      title: "主要用語",
      subtitle: "ダッシュボードで使う短い定義。",
      items: [
        {
          term: "アクティブ発話時間",
          description: "Roxy がTTSを生成・再生している時間。無音やアイドルは含みません。",
        },
        {
          term: "Dono Engine",
          description: "ギフトを感情・台詞・アクションに紐づけるルール。",
        },
        {
          term: "Stream Scripts",
          description: "イントロ、ループ、ミニゲーム、バトルモードなどのシナリオ。",
        },
        {
          term: "ナレッジパック",
          description: "ペルソナの一貫性とブランド性を保つための知識。",
        },
        {
          term: "透かし",
          description: "Pro/Studio で無効化できるブランド表示。",
        },
        {
          term: "マルチアカウントキュー",
          description: "複数のTikTokアカウントを24/7でローテーションするスケジュール。",
        },
      ],
    },
  },
  pricing: {
    eyebrow: "料金",
    title: "配信規模に合わせた価格",
    subtitle: "BYOKで最大の自由度、またはProクレジットで即開始。",
    comparisonTitle: "プラン比較",
    comparisonHeaders: ["機能", "トライアル", "Basic", "Pro", "Studio"],
    comparisonRows: [
      {
        label: "含まれるアクティブ発話時間",
        values: ["60分", "無制限（BYOK）", "10時間", "40時間"],
      },
      { label: "透かし", values: ["オン", "オン", "切替", "切替"] },
      { label: "アカウント", values: ["1", "1", "最大5", "最大20"] },
      { label: "Donoルール", values: ["10", "20", "200", "1000"] },
      { label: "スクリプト", values: ["2", "3", "無制限", "無制限 + 高度"] },
      { label: "知識アイテム", values: ["-", "3", "20", "200"] },
      { label: "ログ保持", values: ["3日", "7日", "30日", "90日"] },
      { label: "チーム席", values: ["-", "-", "-", "5"] },
      { label: "商用ライセンス", values: ["-", "-", "-", "あり"] },
      { label: "Unreal Connector", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "追加クレジット",
    extraCreditsSubtitle: "上限に達したらアクティブ発話時間を追加購入。",
    extraCredits: [
      { label: "+10時間", price: "€25" },
      { label: "+50時間", price: "€99" },
      { label: "+200時間", price: "€299" },
    ],
    addonTitle: "Unreal Connector パック",
    addonBadge: "アドオン",
    addonDescription:
      "Unreal Live 連携、リップシンクトリガー、サンプルUEシーン、Dono Engine のアクションマッピング。",
    addonPrices: [
      { label: "月額", price: "€49 / 月" },
      { label: "買い切り", price: "€299" },
    ],
    addonCta: "アドオンを管理",
    faqEyebrow: "FAQ",
    faqTitle: "よくある質問",
    faqSubtitle: "プランの疑問を解決。",
  },
  blog: {
    eyebrow: "ブログ",
    title: "更新情報、ユースケース、リリースノート",
    subtitle: "プロダクトニュース、成長の型、実運用の配信フォーマット。",
    backToBlog: "ブログに戻る",
  },
  team: {
    eyebrow: "チーム",
    title: "RoxStreamAI を作る人々",
    subtitle: "配信運用、AIシステム、プロダクトデザインを融合する小さなチーム。",
    members: [
      { name: "Lia Chen", role: "プロダクト & グロース", focus: "クリエイターツール、オンボーディング、価格戦略。" },
      { name: "Maks Orlov", role: "エンジニアリングリード", focus: "リアルタイムシステム、配信スクリプト、信頼性。" },
      { name: "Sofia Kim", role: "デザインリード", focus: "ブランドシステム、UIキット、ダッシュボード導線。" },
      { name: "Artem Volkov", role: "AI & ボイス", focus: "ペルソナ調整、TTSパイプライン、安全制御。" },
    ],
    values: {
      eyebrow: "価値観",
      title: "私たちの働き方",
      subtitle: "あらゆる意思決定を形作る原則。",
      items: [
        {
          title: "クリエイター第一",
          description: "摩擦をなくし、フォーマットとストーリーに集中できるツールを作ります。",
        },
        {
          title: "運用の明確さ",
          description: "分析、ワークフロー、スクリプトで迅速な意思決定を支援します。",
        },
        {
          title: "安全がデフォルト",
          description: "スケール前にモデレーションルール、レート制限、ガードレールを組み込みます。",
        },
      ],
    },
    cta: {
      title: "コラボしませんか？",
      subtitle: "パートナーシップ、統合、早期アクセスの相談はこちら。",
      primary: "お問い合わせ",
      secondary: "更新を見る",
    },
  },
  download: {
    eyebrow: "ダウンロード",
    title: "最新のデスクトップ版",
    subtitle: "プラットフォームを選択。リリースは管理チームが提供します。",
    latestLabel: "最新",
    noReleases: "まだリリースがありません。管理パネルで最初のWindows/macOSビルドを追加してください。",
    openAdmin: "管理画面でリリースを開く",
    releaseHistory: "リリース履歴",
    download: "ダウンロード",
  },
  planCards: [
    {
      id: "trial",
      name: "トライアル",
      price: "€0",
      description: "プレビュー",
      badge: "プレビュー",
      includedHours: "アクティブ音声 60分",
      cta: "トライアル開始",
      features: [
        "TikTok: 1アカウント",
        "Donoルール: 最大10",
        "スクリプト: 基本プリセット2",
        "透かし常時オン",
        "ログ: 3日",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "€19 / 月",
      description: "BYOK",
      badge: "BYOK",
      includedHours: "無制限（BYOK）",
      cta: "選択",
      features: [
        "TikTok: 1アカウント",
        "Donoルール: 最大20",
        "スクリプト: 3プリセット",
        "ログ: 7日",
        "透かし常時オン",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€99 / 月",
      description: "最もお得",
      badge: "人気",
      includedHours: "アクティブ音声 10時間",
      cta: "選択",
      features: [
        "アカウント: 最大5",
        "Donoルール: 200",
        "スクリプト: 無制限",
        "知識アイテム: 20",
        "透かし切替",
        "ログ: 30日",
        "Unreal対応",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "€299 / 月",
      description: "チーム向け",
      badge: "Studio",
      includedHours: "アクティブ音声 40時間",
      cta: "選択",
      features: [
        "アカウント: 最大20",
        "Donoルール: 1000",
        "スクリプト: 無制限 + 高度",
        "知識アイテム: 200",
        "透かし切替",
        "ログ: 90日",
        "チーム席: 5",
        "商用ライセンス",
        "Unreal対応",
      ],
    },
  ],
  faqs: [
    { q: "APIキーは必要ですか？", a: "BasicはBYOKです。Pro/Studioはクレジットが含まれます。" },
    { q: "アクティブ会話時間とは？", a: "Roxy が話している時間のみが計測されます。" },
    { q: "透かしは消せますか？", a: "Basic/トライアルでは不可。Pro/Studioで切替可能です。" },
    { q: "収益は保証されますか？", a: "いいえ。コンテンツや視聴者によります。" },
    { q: "Unreal は必須ですか？", a: "いいえ。オプションです。" },
    { q: "24/7で動かせますか？", a: "はい。Pro/Studioでスケジュール運用が可能です。" },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "AIキャラクターによるブランド活用例",
      summary: "常時稼働のキャンペーンとAIキャラクター活用の事例。",
      date: "2026-01-12",
      category: "ユースケース",
      readingTime: "6分",
      content: [
        "AIストリーマーは人のホストなしでライブ形式を提供します。",
        "代表キャラクターから始め、知識パックで拡張できます。",
        "マルチアカウントスケジューラで地域別チャンネルを24/7運用。",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "RoxStreamAI を発表",
      summary: "ペルソナから配信開始まで数分。",
      date: "2026-01-08",
      category: "プロダクト",
      readingTime: "5分",
      content: [
        "RoxStreamAI は数分でAIストリーマーを起動します。",
        "長時間配信向けの安全なペースとモデレーションを提供。",
        "Pro にはクレジットが含まれ、BYOK は自分のモデル/音声を利用できます。",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "24/7向けの自動化スタック",
      summary: "スクリプト、モデレーション、反応ループの設計。",
      date: "2025-12-20",
      category: "ガイド",
      readingTime: "7分",
      content: [
        "24/7フォーマットには構造、反応、セーフティが必要です。",
        "ギフトは優先度とクールダウンで反応に紐づけます。",
        "ガードレールと人のオーバーライドを用意しましょう。",
      ],
    },
  ],
};

const zh: MarketingContent = {
  ...en,
  about: {
    eyebrow: "关于",
    title: "Roxy 为持续直播的创作者而生",
    subtitle: "高级、安全、完全可控的直播自动化。",
    missionTitle: "使命",
    missionBody: "提供能够主持节目、对礼物做出反应并保持互动的 AI 共同主持。",
    beliefTitle: "理念",
    beliefBody: "人的创造力领先。Roxy 负责重复、排期与反应循环，让你专注内容策略。",
  },
  contact: {
    eyebrow: "联系",
    title: "规划你的下一场直播格式",
    subtitle: "告诉我们你的目标，我们将制定定制化方案。",
    firstName: "名",
    lastName: "姓",
    email: "工作邮箱",
    message: "你希望 Roxy 自动化什么？",
    sendRequest: "发送请求",
    directLines: "直联方式",
    responseTime: "1 个工作日内回复。",
  },
  terms: {
    title: "条款",
    intro:
      "本条款适用于 RoxStreamAI 网站、桌面应用及相关服务。创建账户或使用服务即表示同意。",
    sections: [
      {
        title: "账户",
        body: "你需对账户凭据的保密及账户内活动负责。",
      },
      {
        title: "使用",
        body: "需遵守平台政策、法律与社区规范，禁止滥用或违法行为。",
      },
      {
        title: "内容",
        body: "内容归你所有，我们仅为提供与改进服务而处理。",
      },
      {
        title: "计费",
        body: "付费套餐自动续费，额外点数或附加包可能产生费用。",
      },
      {
        title: "终止",
        body: "违反条款或不当使用可能导致暂停或终止访问。",
      },
    ],
  },
  privacy: {
    title: "隐私",
    intro: "我们仅收集提供直播自动化、分析和账户管理所需的数据。",
    sections: [
      {
        title: "收集的数据",
        body: "账户信息、使用指标、角色/脚本/集成的配置。",
      },
      {
        title: "使用方式",
        body: "用于认证、运行直播会话、提供支持、提升可靠性与安全性。",
      },
      {
        title: "保留",
        body: "保留周期取决于套餐，可在控制台或通过支持进行管理。",
      },
      {
        title: "你的控制",
        body: "你可随时导出或删除数据。",
      },
    ],
  },
  useCases: {
    eyebrow: "使用案例",
    title: "现代直播的真实成果",
    subtitle: "创作者、无露脸频道与机构使用 Roxy 进行安全长时直播。",
    items: [
      {
        id: "creators",
        title: "创作者",
        description: "在不透支的情况下扩展直播时长。自动问候、礼物反应与中场休息。",
        highlights: ["24/7 安全节奏", "礼物即时反应", "脚本生成可剪辑片段"],
      },
      {
        id: "faceless",
        title: "无露脸直播",
        description: "无需出镜也能运营角色频道，用世界观驱动互动。",
        highlights: ["人设 + 知识包", "语音风格控制", "内容审核护栏"],
      },
      {
        id: "agencies",
        title: "机构",
        description: "一个控制室管理多个创作者、登录与语言，适合工作室和多账号运营。",
        highlights: ["多账号调度", "团队权限 + 活动日志", "集中分析"],
      },
    ],
    outcomes: {
      eyebrow: "成果",
      title: "团队能获得什么",
      subtitle: "短周期、清晰指标与一致品牌控制。",
      items: [
        {
          title: "更高留存",
          description: "脚本循环与礼物触发让长时间观看保持活跃。",
        },
        {
          title: "更低成本",
          description: "减少人工审核和出镜时间，同时保持日常产出。",
        },
        {
          title: "更快试验",
          description: "通过快速场景测试与 A/B 脚本迭代钩子。",
        },
      ],
    },
    cta: {
      title: "准备好梳理你的案例了吗？",
      subtitle: "告诉我们你想自动化什么，我们会制定方案。",
      primary: "联系我们",
      secondary: "查看定价",
    },
  },
  docs: {
    quickstart: {
      eyebrow: "文档",
      title: "快速开始",
      subtitle: "启动你的第一场 AI 主播会话。",
      steps: [
        {
          id: "connect",
          title: "连接",
          description: "绑定 TikTok Live 账号，选择地区并设置角色默认语言。",
        },
        {
          id: "customize",
          title: "自定义",
          description: "创建人设、添加知识包、选择声音并设置安全规则。",
        },
        {
          id: "go-live",
          title: "开播",
          description: "启用 Dono Engine 与 Stream Scripts，24/7 前先进行测试直播。",
        },
      ],
    },
    product: {
      eyebrow: "产品",
      title: "功能文档",
      subtitle: "深入了解驱动 Roxy 的系统。",
      items: [
        {
          id: "dono-engine",
          title: "Dono Engine",
          description: "将礼物映射到动作、情绪与台词，支持优先级、冷却与安全回退。",
        },
        {
          id: "stream-scripts",
          title: "Stream Scripts",
          description: "按时间触发安排开场、循环片段、小游戏与战斗模式。",
        },
        {
          id: "scheduler",
          title: "多账号调度",
          description: "轮换账号与地区，保持 24/7 连续直播并控制节奏。",
        },
        {
          id: "safety",
          title: "安全护栏",
          description: "脏话过滤、禁用话题、速率限制与紧急停止短语。",
        },
        {
          id: "unreal-connector",
          title: "Unreal Connector",
          description: "将直播反应与虚幻场景连接，使用事件驱动触发和口型同步。",
        },
      ],
    },
    api: {
      eyebrow: "API",
      title: "参考概览",
      subtitle: "用于集成与分析的结构化端点。",
      sections: [
        {
          title: "认证",
          description: "使用控制台项目密钥，通过 Bearer Token 授权。",
          items: [
            "POST /auth/token — 交换 API 密钥获取会话令牌",
            "POST /auth/refresh — 刷新会话令牌",
          ],
        },
        {
          title: "角色",
          description: "创建、更新并管理用于直播的角色档案。",
          items: [
            "GET /characters — 列出角色",
            "POST /characters — 创建角色",
            "PATCH /characters/{id} — 更新人设",
          ],
        },
        {
          title: "会话",
          description: "启动/停止直播会话，查看指标并拉取转录。",
          items: [
            "POST /sessions/start — 启动会话",
            "POST /sessions/stop — 停止会话",
            "GET /sessions/{id} — 会话详情",
          ],
        },
        {
          title: "事件",
          description: "订阅礼物反应、脚本事件与审核信号。",
          items: [
            "GET /events/stream — 服务器推送事件",
            "POST /webhooks — 注册 Webhook",
          ],
        },
      ],
    },
    glossary: {
      eyebrow: "术语",
      title: "关键术语",
      subtitle: "控制台中使用的简短定义。",
      items: [
        {
          term: "活跃发声小时",
          description: "Roxy 生成并播放 TTS 的时间。静默与空闲不计入。",
        },
        {
          term: "Dono Engine",
          description: "将礼物映射到情绪、台词、动作、冷却与优先级的规则。",
        },
        {
          term: "Stream Scripts",
          description: "开场、循环、小游戏、战斗模式等预设流程。",
        },
        {
          term: "知识包",
          description: "保持人设一致性与品牌风格的自定义知识。",
        },
        {
          term: "水印",
          description: "Pro 与 Studio 可关闭的品牌标识。",
        },
        {
          term: "多账号队列",
          description: "跨多个 TikTok 账号进行 24/7 排班轮换。",
        },
      ],
    },
  },
  pricing: {
    eyebrow: "定价",
    title: "随直播规模扩展的价格",
    subtitle: "选择 BYOK 获取最大控制力，或用 Pro 点数即插即用。",
    comparisonTitle: "套餐对比",
    comparisonHeaders: ["功能", "试用", "Basic", "Pro", "Studio"],
    comparisonRows: [
      {
        label: "包含活跃发声时长",
        values: ["60 分钟", "无限（BYOK）", "10 小时", "40 小时"],
      },
      { label: "水印", values: ["开启", "开启", "可切换", "可切换"] },
      { label: "账号", values: ["1", "1", "最多 5", "最多 20"] },
      { label: "Dono 规则", values: ["10", "20", "200", "1000"] },
      { label: "脚本", values: ["2", "3", "无限", "无限 + 高级"] },
      { label: "知识条目", values: ["-", "3", "20", "200"] },
      { label: "日志保留", values: ["3 天", "7 天", "30 天", "90 天"] },
      { label: "团队席位", values: ["-", "-", "-", "5"] },
      { label: "商业授权", values: ["-", "-", "-", "是"] },
      { label: "Unreal 连接器", values: ["-", "Pro+", "Pro+", "Pro+"] },
    ],
    extraCreditsTitle: "额外点数",
    extraCreditsSubtitle: "达到上限后购买更多活跃发声时长。",
    extraCredits: [
      { label: "+10 小时", price: "€25" },
      { label: "+50 小时", price: "€99" },
      { label: "+200 小时", price: "€299" },
    ],
    addonTitle: "Unreal Connector 套件",
    addonBadge: "附加项",
    addonDescription:
      "Unreal Live 连接器、口型同步触发、示例 UE 场景与 Dono Engine 动作映射。",
    addonPrices: [
      { label: "月付", price: "€49 / 月" },
      { label: "永久", price: "€299" },
    ],
    addonCta: "管理附加项",
    faqEyebrow: "FAQ",
    faqTitle: "快速解答",
    faqSubtitle: "关于套餐的常见问题。",
  },
  blog: {
    eyebrow: "博客",
    title: "更新、使用案例与发布说明",
    subtitle: "产品动态、增长方法与真实直播格式。",
    backToBlog: "返回博客",
  },
  team: {
    eyebrow: "团队",
    title: "打造 RoxStreamAI 的人",
    subtitle: "小而精的团队，融合直播运营、AI 系统与产品设计。",
    members: [
      { name: "Lia Chen", role: "产品与增长", focus: "创作者工具、入门流程与定价策略。" },
      { name: "Maks Orlov", role: "工程负责人", focus: "实时系统、直播脚本与平台稳定性。" },
      { name: "Sofia Kim", role: "设计负责人", focus: "品牌体系、UI 套件与仪表板流程。" },
      { name: "Artem Volkov", role: "AI 与语音", focus: "人设调优、TTS 管线与安全控制。" },
    ],
    values: {
      eyebrow: "价值观",
      title: "我们的工作方式",
      subtitle: "塑造每个产品决策的原则。",
      items: [
        {
          title: "创作者优先",
          description: "消除摩擦，让创作者专注内容与叙事。",
        },
        {
          title: "运营清晰",
          description: "通过分析、流程与脚本支持快速决策与可复制增长。",
        },
        {
          title: "默认安全",
          description: "在扩展前加入审核规则、速率限制与安全护栏。",
        },
      ],
    },
    cta: {
      title: "想合作吗？",
      subtitle: "合作、集成或抢先体验申请，欢迎联系。",
      primary: "联系我们",
      secondary: "阅读更新",
    },
  },
  download: {
    eyebrow: "下载",
    title: "获取最新桌面版",
    subtitle: "选择你的平台，版本由管理团队发布。",
    latestLabel: "最新",
    noReleases: "暂无版本，请在管理面板添加首个 Windows/macOS 构建。",
    openAdmin: "打开管理发布",
    releaseHistory: "发布历史",
    download: "下载",
  },
  planCards: [
    {
      id: "trial",
      name: "试用",
      price: "€0",
      description: "预览",
      badge: "预览",
      includedHours: "活跃发声 60 分钟",
      cta: "开始试用",
      features: [
        "TikTok：1 个账号",
        "Dono 规则：最多 10",
        "脚本：2 个基础预设",
        "水印始终开启",
        "日志：3 天",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "€19 / 月",
      description: "BYOK",
      badge: "BYOK",
      includedHours: "无限（BYOK）",
      cta: "选择",
      features: [
        "TikTok：1 个账号",
        "Dono 规则：最多 20",
        "脚本：3 个预设",
        "日志：7 天",
        "水印始终开启",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€99 / 月",
      description: "最佳性价比",
      badge: "推荐",
      includedHours: "活跃发声 10 小时",
      cta: "选择",
      features: [
        "账号：最多 5",
        "Dono 规则：200",
        "脚本：无限",
        "知识条目：20",
        "水印可切换",
        "日志：30 天",
        "支持 Unreal",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      price: "€299 / 月",
      description: "团队适用",
      badge: "Studio",
      includedHours: "活跃发声 40 小时",
      cta: "选择",
      features: [
        "账号：最多 20",
        "Dono 规则：1000",
        "脚本：无限 + 高级",
        "知识条目：200",
        "水印可切换",
        "日志：90 天",
        "团队席位：5",
        "商业授权",
        "支持 Unreal",
      ],
    },
  ],
  faqs: [
    { q: "需要 API Key 吗？", a: "Basic 使用 BYOK。Pro/Studio 含点数。" },
    { q: "什么是活跃对话时长？", a: "仅统计 Roxy 发声的时间。" },
    { q: "可以去除水印吗？", a: "Basic/试用不支持，Pro/Studio 可切换。" },
    { q: "收入有保障吗？", a: "没有，取决于内容与受众。" },
    { q: "必须用 Unreal 吗？", a: "不是，属于可选项。" },
    { q: "能 24/7 运行吗？", a: "可以，Pro/Studio 支持排期。" },
  ],
  blogPosts: [
    {
      slug: "brand-use-cases-ai-characters",
      title: "AI 角色的品牌应用场景",
      summary: "常时在线活动与交互式 AI 角色的用法。",
      date: "2026-01-12",
      category: "使用案例",
      readingTime: "6 分钟",
      content: [
        "AI 主播可以在无人主持时提供直播形式。",
        "从主角开始，通过知识包扩展世界观。",
        "多账号调度让区域频道 24/7 在线。",
      ],
    },
    {
      slug: "introducing-roxstreamai",
      title: "RoxStreamAI 发布",
      summary: "从人设到开播只需几分钟。",
      date: "2026-01-08",
      category: "产品",
      readingTime: "5 分钟",
      content: [
        "RoxStreamAI 可在数分钟内启动 AI 主播。",
        "面向长时直播的安全节奏与审核。",
        "Pro 含点数；BYOK 可使用你的模型/语音。",
      ],
    },
    {
      slug: "roadmap-automation-stacks",
      title: "面向 24/7 的自动化栈",
      summary: "脚本、审核与反应循环的设计。",
      date: "2025-12-20",
      category: "指南",
      readingTime: "7 分钟",
      content: [
        "24/7 格式需要结构、反应与安全。",
        "将礼物与优先级、冷却规则绑定反应。",
        "加入安全护栏与人工接管。",
      ],
    },
  ],
};

const contentMap: Record<string, MarketingContent> = {
  en,
  de,
  es,
  fr,
  it,
  pt,
  ru,
  tr,
  ja,
  zh,
  uk,
};

export function getContent(locale: Locale): MarketingContent {
  return contentMap[locale] ?? en;
}

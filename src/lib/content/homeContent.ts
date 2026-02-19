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
  const isDe = locale === "de";
  const isFr = locale === "fr";

  function pick(en: string, ru: string, de: string, fr: string): string {
    if (isRu) return ru;
    if (isDe) return de;
    if (isFr) return fr;
    return en;
  }

  return {
    hero: {
      badge: "RoxStreamAI",
      title: pick(
        "Create any character. Run interactive 3D avatar streams in minutes.",
        "Создайте любого персонажа. Запустите интерактивные 3D аватар стримы за минуты.",
        "Erstellen Sie jeden Charakter. Starten Sie interaktive 3D-Avatar-Streams in Minuten.",
        "Créez n'importe quel personnage. Lancez des streams 3D interactifs en quelques minutes.",
      ),
      subtitle: pick(
        "RoxStreamAI is a web dashboard plus a desktop companion that lets you build a character, pick scenes and backgrounds, and trigger Unreal actions from gifts. Add an AI co-host anytime or let it run the show while you rest.",
        "RoxStreamAI - это веб панель и десктопный компаньон, где вы создаете персонажа, выбираете сцены и фоны, и запускаете Unreal действия от подарков. Добавляйте AI co-host когда нужно или отдайте управление 24/7.",
        "RoxStreamAI ist ein Web-Dashboard plus Desktop-Companion, mit dem Sie Charaktere erstellen, Szenen und Hintergründe auswählen und Unreal-Aktionen über Geschenke auslösen. Fügen Sie jederzeit einen AI-Co-Host hinzu oder lassen Sie ihn 24/7 moderieren.",
        "RoxStreamAI est un tableau de bord web plus un compagnon bureau qui vous permet de créer un personnage, choisir des scènes et arrière-plans, et déclencher des actions Unreal via les cadeaux. Ajoutez un co-host IA à tout moment ou laissez-le gérer 24h/24.",
      ),
      primaryCtaLabel: pick(
        "Start free trial",
        "Начать бесплатный триал",
        "Kostenlosen Test starten",
        "Commencer l'essai gratuit",
      ),
      secondaryCtaLabel: pick(
        "Download desktop app",
        "Скачать десктопное приложение",
        "Desktop-App herunterladen",
        "Télécharger l'app bureau",
      ),
      note: pick(
        "Clear usage limits. Predictable costs. BYOK supported.",
        "Понятные лимиты. Предсказуемая стоимость. BYOK поддерживается.",
        "Klare Nutzungslimits. Vorhersehbare Kosten. BYOK wird unterstützt.",
        "Limites d'utilisation claires. Coûts prévisibles. BYOK supporté.",
      ),
    },
    pillars: isDe
      ? [
          {
            icon: "bot",
            title: "Charakter-Editor",
            body: "Erstellen Sie eine Persona mit Stimme, Ton, Regeln und Lore. Verwenden Sie sie in verschiedenen Formaten und Accounts.",
          },
          {
            icon: "monitor",
            title: "Szenen + Hintergründe",
            body: "Wechseln Sie schnell zwischen Standorten, Overlays und Szenen-Presets. Halten Sie das Bild frisch ohne Pipeline-Umbau.",
          },
          {
            icon: "activity",
            title: "Dono Engine Trigger",
            body: "Verknüpfen Sie Geschenke mit Aktionen: Emotionen, Repliken, VFX, Kamerawechsel, Szenenwechsel, Cooldowns und Prioritäten.",
          },
        ]
      : isFr
        ? [
            {
              icon: "bot",
              title: "Éditeur de personnage",
              body: "Créez un persona avec voix, ton, règles et lore. Réutilisez-le dans différents formats et comptes.",
            },
            {
              icon: "monitor",
              title: "Scènes + Arrière-plans",
              body: "Changez rapidement de lieux, overlays et presets de scènes. Gardez un visuel frais sans reconstruire le pipeline.",
            },
            {
              icon: "activity",
              title: "Déclencheurs Dono Engine",
              body: "Associez les cadeaux à des actions : émotions, répliques, VFX, changements de caméra, changements de scène, cooldowns et priorités.",
            },
          ]
        : isRu
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
      title: pick(
        "AI host is an add-on, not the whole product.",
        "AI host - это доп, а не весь продукт.",
        "AI Host ist ein Add-on, nicht das ganze Produkt.",
        "L'hôte IA est un complément, pas tout le produit.",
      ),
      body: pick(
        "Stream yourself when you want. Turn on the AI co-host to fill dead air, follow scripts, react to chat and gifts, or fully take over for 24/7 rotation.",
        "Стримьте сами, когда хотите. Включайте AI co-host, чтобы заполнить паузы, следовать скриптам, реагировать на чат и подарки, или полностью вести эфир 24/7.",
        "Streamen Sie selbst, wenn Sie möchten. Schalten Sie den AI-Co-Host ein, um Pausen zu füllen, Skripten zu folgen, auf Chat und Geschenke zu reagieren, oder das Programm 24/7 zu übernehmen.",
        "Streamez vous-même quand vous voulez. Activez le co-host IA pour combler les silences, suivre des scripts, réagir au chat et aux cadeaux, ou prendre le relais 24h/24.",
      ),
    },
    howItWorks: {
      eyebrow: pick(
        "How it works",
        "Как это работает",
        "So funktioniert es",
        "Comment ça marche",
      ),
      title: pick(
        "How it works",
        "Как это работает",
        "So funktioniert es",
        "Comment ça marche",
      ),
      subtitle: pick(
        "Five steps from character to live.",
        "Пять шагов от персонажа до эфира.",
        "Fünf Schritte vom Charakter zum Live-Stream.",
        "Cinq étapes du personnage au direct.",
      ),
      stepLabel: pick("Step", "Шаг", "Schritt", "Étape"),
      steps: isDe
        ? [
            "Erstellen Sie einen Charakter (Persona, Stimme, Regeln).",
            "Wählen Sie Szenen und Hintergründe (Presets oder Ihr Unreal-Setup).",
            "Konfigurieren Sie Dono Engine Regeln (Geschenke -> Reaktionen -> Aktionen).",
            "Verbinden Sie den Desktop Mode (Unreal Connector + Diagnose).",
            "Gehen Sie live — mit oder ohne AI-Co-Host.",
          ]
        : isFr
          ? [
              "Créez un personnage (persona, voix, règles).",
              "Choisissez scènes et arrière-plans (presets ou votre setup Unreal).",
              "Configurez les règles Dono Engine (cadeaux -> réactions -> actions).",
              "Connectez le Desktop Mode (connecteur Unreal + diagnostics).",
              "Passez en direct — avec ou sans co-host IA.",
            ]
          : isRu
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
      eyebrow: pick(
        "Integrations",
        "Интеграции",
        "Integrationen",
        "Intégrations",
      ),
      title: pick(
        "Works with your existing stack",
        "Подключайте то, чем вы уже пользуетесь",
        "Funktioniert mit Ihrem bestehenden Setup",
        "Fonctionne avec votre stack existant",
      ),
      subtitle: pick(
        "TikTok Live today. OBS and Unreal workflows built-in. BYOK supported for providers when you want full control.",
        "TikTok Live сегодня. OBS и Unreal workflow встроены. BYOK для провайдеров - когда нужен полный контроль.",
        "TikTok Live heute. OBS und Unreal Workflows integriert. BYOK für Provider, wenn Sie volle Kontrolle wünschen.",
        "TikTok Live aujourd'hui. Workflows OBS et Unreal intégrés. BYOK supporté pour les providers.",
      ),
      items: [
        {
          label: "TikTok Live",
          note: pick("today", "сегодня", "heute", "aujourd'hui"),
          logo: "https://cdn.simpleicons.org/tiktok/ffffff",
        },
        {
          label: "OBS WebSocket",
          logo: "https://cdn.simpleicons.org/obsstudio/ffffff",
        },
        {
          label: "Unreal Engine",
          note: pick("workflows", "workflow", "workflows", "workflows"),
          logo: "https://cdn.simpleicons.org/unrealengine/ffffff",
        },
        {
          label: "OpenAI voice",
          note: pick("included", "включено", "inkludiert", "inclus"),
          logo: "https://cdn.simpleicons.org/openai/ffffff",
        },
        {
          label: "ElevenLabs",
          note: "BYOK",
          logo: "https://cdn.simpleicons.org/elevenlabs/ffffff",
        },
        {
          label: pick("More providers", "Другие провайдеры", "Weitere Provider", "Autres providers"),
          note: pick("soon", "скоро", "bald", "bientôt"),
          logo: "https://cdn.simpleicons.org/simpleicons/ffffff",
        },
      ],
    },
    characters: {
      eyebrow: pick(
        "Characters",
        "Персонажи",
        "Charaktere",
        "Personnages",
      ),
      title: pick(
        "Build a character library for your channel.",
        "Соберите библиотеку персонажей для вашего канала",
        "Erstellen Sie eine Charakter-Bibliothek für Ihren Kanal.",
        "Créez une bibliothèque de personnages pour votre chaîne.",
      ),
      subtitle: pick(
        "Create characters in the dashboard, export to Unreal via Desktop Mode, and reuse them across scenes, formats, and accounts. Polyphoria editor integration is coming soon.",
        "Создавайте персонажей в панели, экспортируйте в Unreal через Desktop Mode и переиспользуйте их в сценах, форматах и аккаунтах. Интеграция Polyphoria editor скоро.",
        "Erstellen Sie Charaktere im Dashboard, exportieren Sie sie über Desktop Mode nach Unreal und verwenden Sie sie in Szenen, Formaten und Accounts. Polyphoria Editor-Integration kommt bald.",
        "Créez des personnages dans le tableau de bord, exportez vers Unreal via Desktop Mode et réutilisez-les dans les scènes, formats et comptes. L'intégration de l'éditeur Polyphoria arrive bientôt.",
      ),
      cards: isDe
        ? [
            {
              icon: "sparkles",
              title: "Persona und Regeln",
              body: "Ton, verbotene Wörter, Themen und Show-Format.",
              href: "/app/characters",
              cta: "Charaktere öffnen",
            },
            {
              icon: "monitor",
              title: "Desktop Mode",
              body: "Unreal-Verbindung, Diagnose und Export (Beta).",
              href: "/download",
              cta: "Demo herunterladen",
            },
            {
              icon: "activity",
              title: "Live-Zyklus",
              body: "Chat + Geschenke + Skripte + Moderation.",
              href: "/use-cases",
              cta: "Use Cases ansehen",
            },
          ]
        : isFr
          ? [
              {
                icon: "sparkles",
                title: "Persona et règles",
                body: "Ton, mots interdits, sujets et format du show.",
                href: "/app/characters",
                cta: "Ouvrir les personnages",
              },
              {
                icon: "monitor",
                title: "Desktop Mode",
                body: "Connecteur Unreal, diagnostics et export (bêta).",
                href: "/download",
                cta: "Télécharger la démo",
              },
              {
                icon: "activity",
                title: "Boucle live",
                body: "Chat + cadeaux + scripts + modération.",
                href: "/use-cases",
                cta: "Voir les cas d'usage",
              },
            ]
          : isRu
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
      eyebrow: pick("Pricing", "Тарифы", "Preise", "Tarifs"),
      title: pick(
        "Start with one character. Scale scenes, triggers, and concurrency.",
        "Начните с одного персонажа. Масштабируйте сцены, триггеры и concurrency.",
        "Starten Sie mit einem Charakter. Skalieren Sie Szenen, Trigger und Concurrency.",
        "Commencez avec un personnage. Montez en scènes, déclencheurs et concurrence.",
      ),
      subtitle: pick(
        "Plans are built around characters, scenes, and Dono Engine limits. AI speech usage stays predictable with Active Speech tracking.",
        "Планы строятся вокруг персонажей, сцен и лимитов Dono Engine. Использование AI речи остается предсказуемым за счет Active Speech.",
        "Pläne basieren auf Charakteren, Szenen und Dono Engine Limits. AI-Sprachnutzung bleibt vorhersehbar mit Active Speech Tracking.",
        "Les plans sont construits autour des personnages, scènes et limites Dono Engine. L'utilisation vocale IA reste prévisible avec le suivi Active Speech.",
      ),
      ctaLabel: pick(
        "See pricing",
        "Смотреть тарифы",
        "Preise ansehen",
        "Voir les tarifs",
      ),
      customLabel: pick("Custom", "Индивидуально", "Individuell", "Personnalisé"),
    },
    security: {
      eyebrow: pick(
        "Security & guardrails",
        "Безопасность",
        "Sicherheit",
        "Sécurité",
      ),
      title: pick(
        "Built for live streams",
        "Создано для live",
        "Für Live-Streams gebaut",
        "Conçu pour le live",
      ),
      subtitle: pick(
        "Pragmatic guardrails and transparent limits.",
        "Прагматичные guardrails и прозрачные лимиты.",
        "Pragmatische Schutzmaßnahmen und transparente Limits.",
        "Garde-fous pragmatiques et limites transparentes.",
      ),
      cards: isDe
        ? [
            {
              icon: "lock",
              title: "Regeln und Stopp-Signale",
              body: "Skripte, Stopp-Phrasen und Verhaltensregeln halten das Format vorhersehbar.",
              ctaLabel: "Mehr erfahren",
              ctaHref: "/security",
            },
            {
              icon: "badgeCheck",
              title: "Rate Limiting",
              body: "Wir begrenzen auffällige Anfragen und schützen sensible Endpunkte.",
              ctaLabel: "Mehr erfahren",
              ctaHref: "/security",
            },
            {
              icon: "activity",
              title: "Audit und Diagnose",
              body: "Desktop-Diagnose und Admin-Audit helfen bei der Untersuchung von Vorfällen.",
              ctaLabel: "Mehr erfahren",
              ctaHref: "/security",
            },
          ]
        : isFr
          ? [
              {
                icon: "lock",
                title: "Règles et signaux d'arrêt",
                body: "Scripts, phrases d'arrêt et règles de comportement maintiennent le format prévisible.",
                ctaLabel: "En savoir plus",
                ctaHref: "/security",
              },
              {
                icon: "badgeCheck",
                title: "Rate limiting",
                body: "Nous limitons les requêtes sensibles pour réduire les abus.",
                ctaLabel: "En savoir plus",
                ctaHref: "/security",
              },
              {
                icon: "activity",
                title: "Audit et diagnostics",
                body: "Les diagnostics Desktop et l'audit admin aident à investiguer les incidents.",
                ctaLabel: "En savoir plus",
                ctaHref: "/security",
              },
            ]
          : isRu
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
      title: pick(
        "Ready to run your first session?",
        "Готовы увидеть в действии?",
        "Bereit, Ihre erste Session zu starten?",
        "Prêt à lancer votre première session ?",
      ),
      subtitle: pick(
        "Start with a demo download or compare plans.",
        "Начните с триала или сравните тарифы.",
        "Starten Sie mit einem Demo-Download oder vergleichen Sie Pläne.",
        "Commencez avec un téléchargement démo ou comparez les plans.",
      ),
      primaryLabel: pick(
        "Download demo",
        "Скачать демо",
        "Demo herunterladen",
        "Télécharger la démo",
      ),
      primaryHref: "/download",
      secondaryLabel: pick(
        "See pricing",
        "Смотреть тарифы",
        "Preise ansehen",
        "Voir les tarifs",
      ),
      secondaryHref: "/pricing",
    },
    faq: {
      eyebrow: "FAQ",
      title: "FAQ",
      subtitle: pick(
        "Quick answers about Desktop Mode, usage, and BYOK.",
        "Все о тарифах и лимитах.",
        "Schnelle Antworten zu Desktop Mode, Nutzung und BYOK.",
        "Réponses rapides sur le Desktop Mode, l'utilisation et le BYOK.",
      ),
      items: isDe
        ? [
            {
              q: "Wie messen Sie die Nutzung?",
              a: "Wir messen Active Speech — die Zeit, in der die KI tatsächlich spricht. Ihr Stream kann länger laufen als die Active Speech.",
            },
            {
              q: "Kann ich ohne AI-Host streamen?",
              a: "Ja. Sie können mit 3D-Avatar und Triggern streamen und den AI-Co-Host später aktivieren.",
            },
            {
              q: "Kann ich meine eigenen API-Schlüssel verwenden?",
              a: "Ja. Für unterstützte Provider können Sie BYOK nutzen und bei Bedarf wechseln.",
            },
            {
              q: "Brauche ich Unreal Engine?",
              a: "Nein. Unreal-Workflows sind optional. Sie können ohne Unreal streamen oder es später verbinden.",
            },
            {
              q: "Was können Geschenke auslösen?",
              a: "Emotionen, Repliken, Aktionen, Szenenwechsel und Unreal-Events mit Cooldowns und Prioritäten.",
            },
            {
              q: "Ist das sicher für Live-Streams?",
              a: "Wir unterstützen Guardrails wie Skript-Formate, Rate Limiting und Moderationsregeln. Sie haben immer die Kontrolle.",
            },
            {
              q: "Was ist Talk Ratio?",
              a: "Talk Ratio ist der Prozentsatz der Zeit, in der die KI während eines Streams aktiv spricht. Ein niedrigeres Talk Ratio bedeutet mehr Stream-Stunden für dasselbe Active Speech Budget.",
            },
            {
              q: "Kann ich den Plan später wechseln?",
              a: "Ja. Upgrades jederzeit. Downgrades gelten in der Regel ab dem nächsten Abrechnungszeitraum.",
            },
          ]
        : isFr
          ? [
              {
                q: "Comment mesurez-vous l'utilisation ?",
                a: "Nous mesurons l'Active Speech — le temps où l'IA parle réellement. Votre stream peut durer plus longtemps que l'Active Speech.",
              },
              {
                q: "Puis-je streamer sans l'hôte IA ?",
                a: "Oui. Vous pouvez streamer avec un avatar 3D et des déclencheurs uniquement, et activer le co-host IA plus tard.",
              },
              {
                q: "Puis-je utiliser mes propres clés API ?",
                a: "Oui. Pour les providers supportés, vous pouvez utiliser BYOK et basculer si nécessaire.",
              },
              {
                q: "Ai-je besoin d'Unreal Engine ?",
                a: "Non. Les workflows Unreal sont optionnels. Vous pouvez streamer sans Unreal ou le connecter plus tard.",
              },
              {
                q: "Que peuvent déclencher les cadeaux ?",
                a: "Émotions, répliques, actions, changements de scène et événements Unreal avec cooldowns et priorités.",
              },
              {
                q: "Est-ce sûr pour le live ?",
                a: "Nous supportons des garde-fous comme les formats scriptés, le rate limiting et les règles de modération. Vous gardez toujours le contrôle.",
              },
              {
                q: "Qu'est-ce que le talk ratio ?",
                a: "Le talk ratio est le pourcentage du temps où l'IA parle activement pendant un stream. Un talk ratio plus bas signifie plus d'heures de stream pour le même budget Active Speech.",
              },
              {
                q: "Puis-je changer de plan plus tard ?",
                a: "Oui. Vous pouvez upgrader à tout moment. Les downgrades s'appliquent généralement au prochain cycle de facturation.",
              },
            ]
          : isRu
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

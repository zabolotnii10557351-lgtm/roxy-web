import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import {
  Activity,
  BadgeCheck,
  Bot,
  Lock,
  Monitor,
  Plug,
  Sparkles,
} from "lucide-react";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { PRICING_PLANS } from "@/config/pricingPlans";

type LocaleKey = "en" | "ru" | string;

function isRu(locale: LocaleKey) {
  return locale === "ru";
}

export default async function Home() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const pillars = isRu(locale)
    ? [
        {
          icon: Bot,
          title: "AI‑ко‑хост, а не чат‑бот",
          body: "Запускайте эфир с предсказуемым форматом: интро, сегменты, баттлы, Q&A и аудитория‑промпты. Настройте тон, правила и guardrails — чтобы стрим ощущался живым, но под контролем.",
        },
        {
          icon: Activity,
          title: "Понятные лимиты",
          body: "Выберите, сколько Active Speech вам нужно в месяц. Слайдер talk ratio помогает заранее прикинуть часы стрима и стоимость под ваш формат.",
        },
        {
          icon: Monitor,
          title: "Unreal‑готовые workflow",
          body: "Десктоп‑компаньон помогает подключать стрим к Unreal‑workflow. Экспортируйте и переиспользуйте персонажей или работайте через Live Link Face в своей сцене.",
        },
      ]
    : [
        {
          icon: Bot,
          title: "AI co-host, not a chatbot",
          body: "Run a predictable live format: intros, segments, battles, Q&A, and audience prompts. Customize tone, rules, and guardrails so the stream feels human without losing control.",
        },
        {
          icon: Activity,
          title: "Clear usage limits",
          body: "Pick how much Active Speech you want per month. Use the talk ratio slider to estimate stream hours and cost before you go live.",
        },
        {
          icon: Monitor,
          title: "Unreal-ready workflows",
          body: "Use the desktop companion to connect your stream to Unreal Engine workflows. Export and reuse characters, or integrate via Live Link Face if you prefer your own scene.",
        },
      ];

  const howItWorksSteps = isRu(locale)
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
      ];

  const integrations = [
    { label: "TikTok Live", note: isRu(locale) ? "сегодня" : "today" },
    { label: "OBS WebSocket", note: "" },
    { label: "Unreal Engine", note: isRu(locale) ? "workflow" : "workflows" },
    { label: "OpenAI voice", note: isRu(locale) ? "включено" : "included" },
    { label: "ElevenLabs", note: "BYOK" },
    { label: isRu(locale) ? "Другие провайдеры" : "More providers", note: isRu(locale) ? "скоро" : "soon" },
  ];

  const pricingTeaserPlanIds = new Set(["starter", "creator", "pro"]);
  const teaserPlans = PRICING_PLANS.filter((p) => pricingTeaserPlanIds.has(p.id));

  const faqs = isRu(locale)
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
      ];

  return (
    <div className="space-y-24 pb-20">
      <section className="pt-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge className="mb-6 animate-float">{t.marketing.heroBadge}</Badge>
            <h1 className="bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {t.marketing.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              {t.marketing.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button href="/download">{t.marketing.demoPrimary}</Button>
              <Button href="/pricing" variant="secondary">
                {t.marketing.demoSecondary}
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/50 animate-in fade-in duration-1000 delay-500">
              {t.marketing.demoNote}
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="glass-card rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <p.icon className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={isRu(locale) ? "Как это работает" : "How it works"}
            title={t.marketing.howItWorksTitle}
            subtitle={t.marketing.howItWorksSubtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {howItWorksSteps.map((text, index) => (
              <div key={text} className="glass-card rounded-3xl p-6">
                <p className="text-xs uppercase tracking-wider text-white/50">
                  {isRu(locale) ? "Шаг" : "Step"} {index + 1}
                </p>
                <p className="mt-3 text-sm font-semibold text-white">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={isRu(locale) ? "Интеграции" : "Integrations"}
            title={isRu(locale) ? "Подключайте то, чем вы уже пользуетесь" : "Works with your existing stack"}
            subtitle={isRu(locale) ? "TikTok Live сегодня, больше провайдеров скоро." : "TikTok Live today. More providers soon."}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {integrations.map((it) => (
              <div key={it.label} className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                      <Plug className="h-5 w-5 text-cyan-200" />
                    </div>
                    <p className="text-sm font-semibold text-white">{it.label}</p>
                  </div>
                  {it.note ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60">
                      {it.note}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={isRu(locale) ? "Персонажи" : "Characters"}
            title={isRu(locale) ? "Соберите персону один раз — переиспользуйте везде" : "Build once, reuse everywhere"}
            subtitle={
              isRu(locale)
                ? "Создавайте персонажей в веб‑панели и экспортируйте в Unreal через Desktop Mode. Редактор Polyphoria — скоро."
                : "Create characters in the web dashboard and export to Unreal via Desktop Mode. Polyphoria editor integration is coming soon."
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[{
              icon: Sparkles,
              title: isRu(locale) ? "Персона и правила" : "Persona and rules",
              body: isRu(locale) ? "Тон, стоп‑фразы, темы и формат шоу." : "Tone, stop phrases, topics, and show format.",
              href: "/app/characters",
              cta: isRu(locale) ? "Открыть персонажей" : "Open characters",
            },{
              icon: Monitor,
              title: isRu(locale) ? "Desktop Mode" : "Desktop Mode",
              body: isRu(locale) ? "Подключение к Unreal, диагностика и экспорт (beta)." : "Unreal connector, diagnostics, and export (beta).",
              href: "/download",
              cta: isRu(locale) ? "Скачать демо" : "Download demo",
            },{
              icon: Activity,
              title: isRu(locale) ? "Live‑цикл" : "Live loop",
              body: isRu(locale) ? "Чат + подарки + скрипты + модерация." : "Chat + gifts + scripts + moderation.",
              href: "/use-cases",
              cta: isRu(locale) ? "Смотреть кейсы" : "See use cases",
            }].map((card) => (
              <div key={card.title} className="glass-card rounded-3xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                  <card.icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.body}</p>
                <div className="mt-5">
                  <Button href={card.href} variant="secondary">
                    {card.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={isRu(locale) ? "Тарифы" : "Pricing"}
            title={isRu(locale) ? "Начните с малого, масштабируйтесь когда готовы" : "Start small, scale when you are ready"}
            subtitle={isRu(locale) ? "Три плана для старта — полный калькулятор на странице тарифов." : "A quick teaser — full breakdown on the Pricing page."}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {teaserPlans.map((plan) => (
              <div key={plan.id} className="glass-card rounded-3xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    {plan.marketing?.blurb ? (
                      <p className="mt-1 text-xs text-white/60">{plan.marketing.blurb}</p>
                    ) : null}
                  </div>
                  {plan.marketing?.badge ? <Badge>{plan.marketing.badge}</Badge> : null}
                </div>
                <p className="mt-6 text-2xl font-semibold text-white">
                  {plan.monthly_price_eur !== null ? `€${plan.monthly_price_eur.toFixed(2)} / mo` : (isRu(locale) ? "Индивидуально" : "Custom")}
                </p>
                <div className="mt-6">
                  <Button href="/pricing" className="w-full">
                    {isRu(locale) ? "Смотреть тарифы" : "See pricing"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={isRu(locale) ? "Безопасность" : "Security & guardrails"}
            title={isRu(locale) ? "Создано для live" : "Built for live streams"}
            subtitle={isRu(locale) ? "Прагматичные guardrails и прозрачные лимиты." : "Pragmatic guardrails and transparent limits."}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Lock,
                title: isRu(locale) ? "Правила и стоп‑сигналы" : "Rules and stop signals",
                body: isRu(locale)
                  ? "Скрипты, стоп‑фразы и правила поведения помогают держать формат предсказуемым."
                  : "Scripts, stop phrases, and behavior rules keep the show predictable.",
              },
              {
                icon: BadgeCheck,
                title: isRu(locale) ? "Rate limiting" : "Rate limiting",
                body: isRu(locale)
                  ? "Мы ограничиваем шумные запросы и защищаем ключевые эндпоинты."
                  : "We rate-limit sensitive endpoints to reduce abuse and spikes.",
              },
              {
                icon: Activity,
                title: isRu(locale) ? "Аудит и диагностика" : "Audit and diagnostics",
                body: isRu(locale)
                  ? "Диагностика в Desktop Mode и админ‑аудит помогают разбирать инциденты и баги."
                  : "Desktop diagnostics and admin audit trails help investigate issues.",
              },
            ].map((card) => (
              <div key={card.title} className="glass-card rounded-3xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                  <card.icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.body}</p>
                <div className="mt-5">
                  <Button href="/security" variant="ghost">
                    {isRu(locale) ? "Подробнее" : "Learn more"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>

      <section>
        <Container>
          <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {t.marketing.ctaTitle}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {t.marketing.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/download">{t.marketing.ctaPrimary}</Button>
              <Button href="/pricing" variant="secondary">
                {t.marketing.ctaSecondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title={t.marketing.faqTitle}
            subtitle={t.marketing.faqSubtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="glass-card rounded-3xl p-6">
                <h4 className="text-base font-semibold text-white">{item.q}</h4>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      </section>
    </div>
  );
}

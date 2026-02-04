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
import { getLocaleFromRequest } from "@/i18n/server";
import { PRICING_PLANS } from "@/config/pricingPlans";
import { getContentBlockJson } from "@/server/content/getContentBlockJson";
import { getHomeContentFallback, type HomeContent } from "@/lib/content/homeContent";

const isRu = (locale: string) => locale === "ru";

export default async function Home() {
  const locale = await getLocaleFromRequest();
  const homeContent = await getContentBlockJson<HomeContent>({
    key: "home.content",
    locale,
    fallback: getHomeContentFallback(locale),
  });

  const iconMap = {
    bot: Bot,
    activity: Activity,
    monitor: Monitor,
    plug: Plug,
    sparkles: Sparkles,
    lock: Lock,
    badgeCheck: BadgeCheck,
  } as const;

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
            <Badge className="mb-6 animate-float">{homeContent.hero.badge}</Badge>
            <h1 className="bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {homeContent.hero.title}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              {homeContent.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button href="/download">{homeContent.hero.primaryCtaLabel}</Button>
              <Button href="/pricing" variant="secondary">
                {homeContent.hero.secondaryCtaLabel}
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/50 animate-in fade-in duration-1000 delay-500">
              {homeContent.hero.note}
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {homeContent.pillars.map((p) => {
              const Icon = iconMap[p.icon] ?? Bot;
              return (
              <div key={p.title} className="glass-card rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <Icon className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={homeContent.howItWorks.eyebrow}
            title={homeContent.howItWorks.title}
            subtitle={homeContent.howItWorks.subtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {homeContent.howItWorks.steps.map((text, index) => (
              <div key={text} className="glass-card rounded-3xl p-6">
                <p className="text-xs uppercase tracking-wider text-white/50">
                  {homeContent.howItWorks.stepLabel} {index + 1}
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
            eyebrow={homeContent.integrations.eyebrow}
            title={homeContent.integrations.title}
            subtitle={homeContent.integrations.subtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeContent.integrations.items.map((it) => (
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
            eyebrow={homeContent.characters.eyebrow}
            title={homeContent.characters.title}
            subtitle={homeContent.characters.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homeContent.characters.cards.map((card) => {
              const Icon = iconMap[card.icon] ?? Sparkles;
              return (
              <div key={card.title} className="glass-card rounded-3xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                  <Icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.body}</p>
                <div className="mt-5">
                  <Button href={card.href} variant="secondary">
                    {card.cta}
                  </Button>
                </div>
              </div>
            );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={homeContent.pricing.eyebrow}
            title={homeContent.pricing.title}
            subtitle={homeContent.pricing.subtitle}
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
                  {plan.monthly_price_eur !== null
                    ? `€${plan.monthly_price_eur.toFixed(2)} / mo`
                    : homeContent.pricing.customLabel}
                </p>
                <div className="mt-6">
                  <Button href="/pricing" className="w-full">
                    {homeContent.pricing.ctaLabel}
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
            eyebrow={homeContent.security.eyebrow}
            title={homeContent.security.title}
            subtitle={homeContent.security.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {homeContent.security.cards.map((card) => {
              const Icon = iconMap[card.icon] ?? Lock;
              return (
              <div key={card.title} className="glass-card rounded-3xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                  <Icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.body}</p>
                <div className="mt-5">
                  <Button href={card.ctaHref} variant="ghost">
                    {card.ctaLabel}
                  </Button>
                </div>
              </div>
            );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {homeContent.cta.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {homeContent.cta.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={homeContent.cta.primaryHref}>
                {homeContent.cta.primaryLabel}
              </Button>
              <Button href={homeContent.cta.secondaryHref} variant="secondary">
                {homeContent.cta.secondaryLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow={homeContent.faq.eyebrow}
            title={homeContent.faq.title}
            subtitle={homeContent.faq.subtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {homeContent.faq.items.map((item) => (
              <div key={item.q} className="glass-card rounded-3xl p-6">
                <h4 className="text-base font-semibold text-white">{item.q}</h4>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

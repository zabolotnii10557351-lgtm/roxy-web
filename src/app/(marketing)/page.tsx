import {
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  Gamepad2,
} from "lucide-react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import { faqs } from "@/lib/roxy-data";

const steps = [
  {
    title: "Connect",
    description: "Link your TikTok account and choose a region and language.",
  },
  {
    title: "Customize",
    description: "Pick a persona, voice, safety rules, and knowledge pack.",
  },
  {
    title: "Go Live",
    description: "Enable scripts + dono engine and start the session.",
  },
];

const features = [
  {
    title: "Dono Engine",
    description:
      "Gifts trigger chains: emotion, voice lines, actions, cooldowns, priorities.",
    icon: Sparkles,
  },
  {
    title: "Stream Scripts",
    description: "Intro, engagement loops, mini-games, battle mode, timed prompts.",
    icon: Gamepad2,
  },
  {
    title: "Multi-account Scheduler",
    description: "Rotate up to 5 accounts on Pro, up to 20 on Studio.",
    icon: Layers,
  },
  {
    title: "Out-of-the-box Pro",
    description: "No keys, no setup pain. Credits included, limits controlled.",
    icon: Zap,
  },
  {
    title: "Safety Guard",
    description: "Anti-spam mode, blocked words, topic controls, rate limits.",
    icon: ShieldCheck,
  },
  {
    title: "Unreal Connector (Add-on)",
    description: "Hook reactions and scripts into your avatar scene.",
    icon: Clock,
  },
];

const useCases = [
  {
    title: "Creators",
    description: "Scale live hours without burning out.",
  },
  {
    title: "Faceless streaming",
    description: "Run streams without being on camera.",
  },
  {
    title: "Agencies",
    description: "Operate multiple channels with team access.",
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      <section className="pt-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge className="mb-6 animate-float">Roxy AI Streamer</Badge>
            <h1 className="bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent text-4xl font-bold tracking-tight md:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Launch an AI streamer in 10 minutes.
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Roxy reads chat, reacts to gifts, runs show scripts, and can stream
              24/7. Built for TikTok Live today, Twitch and YouTube next.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button href="/download">Download Demo</Button>
              <Button href="/docs" variant="secondary">
                Watch 45s Demo
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/50 animate-in fade-in duration-1000 delay-500">
              Pro plan works out of the box with included credits. Basic
              supports BYOK.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Used by creators testing 24/7 live formats",
              "Built for gift reactions and retention loops",
              "Designed for multi-account streaming",
            ].map((item, index) => (
              <div 
                key={item} 
                className="glass-card rounded-2xl p-6 text-sm text-white/80 hover:text-white group cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-xs group-hover:from-violet-500/40 group-hover:to-cyan-500/40 transition-all duration-300">✓</span>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From zero to live in three moves"
            subtitle="Everything you need to launch a controllable AI streamer."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="glass-card rounded-2xl p-6 group relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg font-bold text-white shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                      {index + 1}
                    </span>
                    <p className="text-xs uppercase tracking-wider text-white/50">Step {index + 1}</p>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white group-hover:gradient-text transition-all">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="Key features"
            title="Automation that feels premium"
            subtitle="Designed for retention loops, safety, and long sessions."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card rounded-2xl p-6 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-cyan-300 group-hover:text-cyan-200" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white group-hover:gradient-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="Built for modern live formats"
            subtitle="One platform for creators, faceless formats, and agencies."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Ready to see it in action?
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Start with a free trial or compare plans in minutes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/app">Start Free Trial</Button>
              <Button href="/pricing" variant="secondary">
                View Pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Fast answers before you go live"
            subtitle="Everything you need to know about plans and usage."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="glass-card rounded-2xl p-6">
                <h4 className="text-base font-semibold text-white">
                  {item.q}
                </h4>
                <p className="mt-3 text-sm text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

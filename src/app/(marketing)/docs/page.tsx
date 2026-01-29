import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const quickstartSteps = [
  "Install app (placeholder)",
  "Open Dashboard",
  "Create Character",
  "Connect TikTok",
  "Setup Dono Engine",
  "Add Stream Scripts",
  "Deploy in OBS (Browser Source mock)",
];

const glossary = [
  {
    term: "Active speech hours",
    description:
      "Minutes when Roxy generates and plays TTS. Silence and idle time do not count.",
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
];

export default function DocsPage() {
  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Docs"
          title="Quickstart"
          subtitle="Everything you need to launch your first AI streamer session."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {quickstartSteps.map((step, index) => (
            <div key={step} className="glass-card rounded-2xl p-5">
              <p className="text-xs text-white/50">Step {index + 1}</p>
              <p className="mt-2 text-sm text-white">{step}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow="Glossary"
          title="Key terms"
          subtitle="Short definitions used across the dashboard."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {glossary.map((item) => (
            <div key={item.term} className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white">
                {item.term}
              </h3>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/Badge";
import { planCards, faqs } from "@/lib/roxy-data";

const comparisonRows = [
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
];

export default function PricingPage() {
  return (
    <div className="space-y-24 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing that scales with your streaming"
          subtitle="Choose BYOK for maximum control or Pro credits for plug-and-play."
        />
      </Container>

      <Container>
        <div className="grid gap-6 lg:grid-cols-4">
          {planCards.map((plan) => (
            <div key={plan.id} className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                {plan.badge ? <Badge>{plan.badge}</Badge> : null}
              </div>
              <p className="mt-2 text-sm text-white/60">{plan.description}</p>
              <p className="mt-6 text-2xl font-semibold text-white">
                {plan.price}
              </p>
              <p className="mt-1 text-xs text-white/60">
                {plan.includedHours}
              </p>
              <ul className="mt-6 space-y-2 text-xs text-white/70">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Button className="mt-6 w-full" href="/app">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-xl font-semibold text-white">Plan comparison</h3>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-white/60">
                  <th className="py-3">Feature</th>
                  <th className="py-3">Trial</th>
                  <th className="py-3">Basic</th>
                  <th className="py-3">Pro</th>
                  <th className="py-3">Studio</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-white/5">
                    <td className="py-3 text-white/70">{row.label}</td>
                    {row.values.map((value, index) => (
                      <td key={index} className="py-3 text-white">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white">Extra Credits</h3>
            <p className="mt-2 text-sm text-white/60">
              Buy more active speech hours when you hit the limit.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+10 hours</span>
                <span>€25</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+50 hours</span>
                <span>€99</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>+200 hours</span>
                <span>€299</span>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                Unreal Connector Pack
              </h3>
              <Badge>Add-on</Badge>
            </div>
            <p className="mt-2 text-sm text-white/60">
              Unreal Live connector, lip-sync triggers, sample UE scenes, and
              action mapping for Dono Engine.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Monthly</span>
                <span>€49 / month</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Lifetime</span>
                <span>€299</span>
              </div>
            </div>
            <Button className="mt-6 w-full" variant="secondary" href="/app">
              Manage add-ons
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Need quick answers?"
          subtitle="Plan questions, simplified."
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
    </div>
  );
}

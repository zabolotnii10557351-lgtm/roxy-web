import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Roxy is built for always-on creators"
          subtitle="We design streaming automation that feels premium, safe, and fully controllable."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Our mission</h3>
            <p className="mt-3 text-sm text-white/70">
              Give creators a polished AI co-host that runs shows, reacts to
              gifts, and keeps viewers engaged across time zones.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">What we believe</h3>
            <p className="mt-3 text-sm text-white/70">
              Human creativity leads. Roxy handles repetition, scheduling, and
              reaction loops so you can focus on your content strategy.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

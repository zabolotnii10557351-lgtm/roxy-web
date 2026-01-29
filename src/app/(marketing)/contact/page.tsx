import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let’s plan your next live format"
          subtitle="Tell us about your streaming goals and we will map a custom rollout."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-3xl p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder="First name"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
                placeholder="Last name"
              />
            </div>
            <input
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="Work email"
            />
            <textarea
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
              placeholder="What do you want Roxy to automate?"
              rows={4}
            />
            <Button className="mt-6 w-full">Send request</Button>
          </div>
          <div className="glass-card rounded-3xl p-8 text-sm text-white/70">
            <p className="text-base font-semibold text-white">Direct lines</p>
            <p className="mt-4">hello@roxy.stream</p>
            <p className="mt-2">Partnerships: partners@roxy.stream</p>
            <p className="mt-6 text-xs text-white/50">
              We respond within 1 business day.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

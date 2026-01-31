import Container from "@/components/Container";

export default function CookiesPage() {
  return (
    <Container className="py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-white">Cookie Policy</h1>
          <p className="mt-3 text-sm text-white/60">
            This page explains how RoxStreamAI uses cookies and similar
            technologies.
          </p>
        </div>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">What are cookies?</h2>
          <p className="text-sm text-white/70">
            Cookies are small text files stored on your device. They help us keep
            you signed in, understand how the site is used, and improve the
            product.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Cookies we use</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-white/70">
            <li>
              Essential cookies (authentication/session) — required for core
              functionality.
            </li>
            <li>
              Preference cookies (e.g. language) — remember settings like your
              chosen locale.
            </li>
            <li>
              Analytics cookies (optional) — help us understand what to improve.
            </li>
          </ul>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Managing cookies</h2>
          <p className="text-sm text-white/70">
            You can control cookies through your browser settings. Disabling
            essential cookies may prevent sign-in and other core features from
            working.
          </p>
        </section>

        <p className="text-xs text-white/50">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </Container>
  );
}

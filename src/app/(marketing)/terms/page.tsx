import Container from "@/components/Container";
import { loadLegalDoc } from "@/lib/legal/loadLegalDoc";

export default async function TermsPage() {
  const [termsPl, termsEn] = await Promise.all([
    loadLegalDoc("Regulamin_hybrydowy_ROXSTREAMAI_PL_filled.txt"),
    loadLegalDoc("Terms_and_Conditions_ROXSTREAMAI_EN_filled.txt"),
  ]);
  return (
    <div className="pb-20 pt-16">
      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-white">Terms & Conditions</h1>
          <p className="mt-4 text-sm text-white/70">
            Regulamin oraz Terms & Conditions w języku polskim i angielskim.
          </p>
          <div className="mt-6 space-y-8">
            <section>
              <h2 className="text-base font-semibold text-white">Polski</h2>
              <div className="mt-3 whitespace-pre-wrap text-sm text-white/70">
                {termsPl}
              </div>
            </section>
            <section>
              <h2 className="text-base font-semibold text-white">English</h2>
              <div className="mt-3 whitespace-pre-wrap text-sm text-white/70">
                {termsEn}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}

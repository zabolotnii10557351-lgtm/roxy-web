import Container from "@/components/Container";
import { getTranslations } from "@/i18n/server";
import { loadLegalDoc } from "@/lib/legal/loadLegalDoc";
import { getCookiesDocFile } from "@/lib/legal/legalDocMap";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function CookiesPage() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);
  const cookiesDoc = await loadLegalDoc(getCookiesDocFile(locale));
  return (
    <Container className="py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-white">{t.nav.cookies}</h1>
        </div>
        <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="whitespace-pre-wrap text-sm text-white/70">{cookiesDoc}</div>
        </section>
      </div>
    </Container>
  );
}

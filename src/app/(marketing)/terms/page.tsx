import Container from "@/components/Container";
import { getLocaleFromRequest } from "@/i18n/server";
import { loadLegalDoc } from "@/lib/legal/loadLegalDoc";
import { getTermsDocFile } from "@/lib/legal/legalDocMap";
import { getMarketingContent } from "@/server/content/getMarketingContent";

export default async function TermsPage() {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);
  const termsDoc = await loadLegalDoc(getTermsDocFile(locale));
  return (
    <div className="pb-20 pt-16">
      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-white">{content.terms.title}</h1>
          <p className="mt-4 text-sm text-white/70">{content.terms.intro}</p>
          <div className="mt-6 whitespace-pre-wrap text-sm text-white/70">{termsDoc}</div>
        </div>
      </Container>
    </div>
  );
}

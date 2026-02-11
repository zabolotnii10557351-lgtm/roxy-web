import Container from "@/components/Container";
import { getLocaleFromRequest } from "@/i18n/server";
import { loadLegalDoc } from "@/lib/legal/loadLegalDoc";
import { getPrivacyDocFile } from "@/lib/legal/legalDocMap";
import { getMarketingContent } from "@/server/content/getMarketingContent";

export default async function PrivacyPage() {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);
  const privacyDoc = await loadLegalDoc(getPrivacyDocFile(locale));
  return (
    <div className="pb-20 pt-16">
      <Container>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-2xl font-semibold text-white">{content.privacy.title}</h1>
          <p className="mt-4 text-sm text-white/70">{content.privacy.intro}</p>
          <div className="mt-6 whitespace-pre-wrap text-sm text-white/70">{privacyDoc}</div>
        </div>
      </Container>
    </div>
  );
}

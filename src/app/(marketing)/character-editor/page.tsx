import Button from "@/components/Button";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import NotifyMeForm from "@/components/polyphoria/NotifyMeForm";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function MarketingCharacterEditorPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Инструменты" : "Tools"}
          title={isRu ? "3D Editor (Polyphoria)" : "3D Editor (Polyphoria)"}
          subtitle={
            isRu
              ? "Мы готовим интеграцию редактора персонажей. Оставьте email — напишем, когда откроется early access."
              : "We’re preparing an in-app character editor integration. Leave your email to get notified when early access opens."
          }
        />

        <div className="mt-10 glass-card rounded-3xl p-6">
          <NotifyMeForm tag="polyphoria" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" href="/download">
            {isRu ? "Скачать Desktop" : "Download desktop"}
          </Button>
          <Button variant="secondary" href="/app">
            {isRu ? "Открыть дашборд" : "Open dashboard"}
          </Button>
        </div>
      </Container>
    </div>
  );
}

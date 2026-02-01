import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsProvidersPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const cards = isRu
    ? [
        {
          title: "BYOK (Bring your own key)",
          body: "Если вы используете стороннего провайдера, вам может понадобиться собственный API‑ключ. Храните ключ как пароль.",
        },
        {
          title: "OpenAI voice",
          body: "Подходит для низкой задержки и управляемых голосовых сессий. Расходы зависят от использования.",
        },
        {
          title: "ElevenLabs",
          body: "Удобно, если у вас уже есть голоса/аккаунт. Обычно подключается через BYOK.",
        },
        {
          title: "Проверка перед эфиром",
          body: "Сделайте короткий тест: качество, стабильность, лимиты провайдера и ключа.",
        },
      ]
    : [
        {
          title: "BYOK (Bring your own key)",
          body: "If you use a third-party provider, you may need your own API key. Treat it like a password.",
        },
        {
          title: "OpenAI voice",
          body: "Great for low-latency, controlled voice sessions. Costs depend on usage.",
        },
        {
          title: "ElevenLabs",
          body: "Handy if you already have voices/accounts. Usually connected via BYOK.",
        },
        {
          title: "Pre-stream verification",
          body: "Run a short test: quality, stability, and provider/key limits.",
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Провайдеры и ключи" : "Providers and keys"}
          subtitle={
            isRu
              ? "Как подключать голосовые провайдеры и не сливать ключи в эфир."
              : "How to connect voice providers and keep keys safe."}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{isRu ? "Рекомендации по безопасности" : "Security tips"}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• {isRu ? "Не вставляйте ключи в сцены/оверлеи и не показывайте их на экране." : "Never paste keys into scenes/overlays or show them on-stream."}</li>
            <li>• {isRu ? "Используйте отдельный ключ для стриминга, если провайдер это поддерживает." : "Use a dedicated streaming key if your provider supports it."}</li>
            <li>• {isRu ? "Если ключ утёк — немедленно отзовите/перевыпустите его у провайдера." : "If a key leaks, revoke/rotate it immediately in the provider dashboard."}</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-xs text-white/50">
          {isRu ? "Про лимиты и стоимость читайте на " : "See "}
          <Link href="/pricing" className="text-cyan-200 hover:text-cyan-100">
            {isRu ? "странице Pricing" : "Pricing"}
          </Link>
          {isRu ? "." : " for usage limits and cost guidance."}
        </div>
      </Container>
    </div>
  );
}

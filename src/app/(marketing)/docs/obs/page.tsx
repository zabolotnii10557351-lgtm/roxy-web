import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function DocsObsPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const checklist = isRu
    ? [
        "Установите и включите OBS WebSocket (или встроенный модуль в новых версиях OBS).",
        "Проверьте порт и пароль (если включён).",
        "Убедитесь, что firewall/антивирус не блокирует локальное соединение.",
        "Сделайте тест: переключение сцены, mute/unmute источника, управление старт/стоп записи (если используете).",
      ]
    : [
        "Install and enable OBS WebSocket (or use the built-in module in newer OBS versions).",
        "Verify port and password (if enabled).",
        "Make sure firewall/antivirus does not block local connections.",
        "Run a test: scene switching, source mute/unmute, and start/stop recording (if you use it).",
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "OBS setup" : "OBS setup"}
          subtitle={
            isRu
              ? "Подключите OBS WebSocket и проверьте управление сценами/источниками."
              : "Connect OBS WebSocket and verify scene/source control."}
        />

        <div className="mt-10 glass-card rounded-3xl p-8">
          <h3 className="text-lg font-semibold text-white">{isRu ? "Чеклист" : "Checklist"}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {checklist.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Надёжность" : "Reliability"}</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {isRu
                ? "Для стабильного стрима лучше держать управление OBS локально и минимизировать сетевые прокси." 
                : "For stable streams, keep OBS control local and avoid unnecessary network proxies."}
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white">{isRu ? "Права доступа" : "Permissions"}</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {isRu
                ? "Если что-то не работает, проверьте права приложения (Windows) и доступ к локальному порту." 
                : "If something fails, check app permissions (Windows) and local port access."}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";
import Link from "next/link";

export default async function DocsTroubleshootingPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const issues = isRu
    ? [
        {
          title: "Нет звука / звук прерывается",
          body: "Проверьте устройство вывода, уровень микшера и что провайдер не ограничивает запросы. Сделайте короткий тест без OBS/Unreal, чтобы сузить проблему.",
        },
        {
          title: "Большая задержка",
          body: "Уменьшите количество цепочек обработки, проверьте сеть и используйте более лёгкие настройки там, где это возможно.",
        },
        {
          title: "OBS не подключается",
          body: "Проверьте OBS WebSocket, порт/пароль и что локальный порт не блокируется firewall.",
        },
        {
          title: "Unreal не принимает данные",
          body: "Проверьте, что Desktop app запущен, и что ваш rig/плагин ожидает правильный формат/канал данных.",
        },
      ]
    : [
        {
          title: "No audio / stuttering",
          body: "Check output device, mixer levels, and whether the provider is rate-limiting you. Run a short test without OBS/Unreal to isolate the issue.",
        },
        {
          title: "High latency",
          body: "Reduce processing chains, check network stability, and prefer lighter settings where possible.",
        },
        {
          title: "OBS won’t connect",
          body: "Verify OBS WebSocket, port/password, and that your firewall isn’t blocking the local port.",
        },
        {
          title: "Unreal isn’t receiving data",
          body: "Confirm the desktop app is running and your rig/plugin expects the correct input format/channel.",
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Траблшутинг" : "Troubleshooting"}
          subtitle={
            isRu
              ? "Самые частые проблемы и быстрые проверки."
              : "Common issues and fast checks."}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {issues.map((i) => (
            <div key={i.title} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">{i.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{isRu ? "Нужна помощь?" : "Need help?"}</h3>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            {isRu
              ? "Если вы можете воспроизвести проблему — напишите нам с шагами и скриншотами настройки."
              : "If you can reproduce the issue, send steps and screenshots of your setup."}
          </p>
          <div className="mt-5">
            <Link href="/contact" className="text-cyan-200 hover:text-cyan-100 text-sm">
              {isRu ? "Открыть Contact →" : "Open Contact →"}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function DocsUnrealPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const workflows = isRu
    ? [
        {
          title: "Desktop connector mode",
          items: [
            "Запустите Desktop app рядом с Unreal.",
            "Выберите персонажа/rig и проверьте, что анимация/липсинк корректно принимаются.",
            "Сначала протестируйте в offline/preview режиме перед эфиром.",
          ],
        },
        {
          title: "Live Link Face workflow",
          items: [
            "Используйте Live Link Face как источник лицевых данных, если ваша сцена это предполагает.",
            "Держите стабильную сеть и минимизируйте jitter.",
            "Запишите короткий тест и сравните задержку с вашим аудио пайплайном.",
          ],
        },
      ]
    : [
        {
          title: "Desktop connector mode",
          items: [
            "Run the desktop app alongside Unreal.",
            "Select a character/rig and verify animation/lip sync is being received correctly.",
            "Test offline/preview first before going live.",
          ],
        },
        {
          title: "Live Link Face workflow",
          items: [
            "Use Live Link Face as a face data source if your setup expects it.",
            "Keep network stable and reduce jitter.",
            "Record a short test and compare latency against your audio pipeline.",
          ],
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Docs" : "Docs"}
          title={isRu ? "Unreal workflows" : "Unreal workflows"}
          subtitle={
            isRu
              ? "Два типовых сценария: через Desktop connector или через Live Link Face."
              : "Two common setups: via the desktop connector or via Live Link Face."}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {workflows.map((wf) => (
            <div key={wf.title} className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">{wf.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {wf.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{isRu ? "Рекомендации" : "Recommendations"}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• {isRu ? "Фиксируйте FPS/тайминг, иначе липсинк будет «плавать»." : "Lock down FPS/timing, or lip sync will drift."}</li>
            <li>• {isRu ? "Разделите аудио‑поток и рендер‑поток по приоритетам CPU/GPU." : "Separate audio and render workloads for stable CPU/GPU scheduling."}</li>
            <li>• {isRu ? "Оставляйте кнопку «panic stop» в зоне доступа." : "Keep a panic-stop path within reach."}</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

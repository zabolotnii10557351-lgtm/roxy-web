import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function UseCasesPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const title = isRu ? "Кейсы" : "Use cases";
  const subtitle = isRu
    ? "Реальные форматы, под которые создан RoxStreamAI - персонажи, сцены и интерактивные триггеры. AI хостинг опционален."
    : "Real formats RoxStreamAI is built for - characters, scenes, and interactive triggers. AI hosting is optional.";

  const useCases = isRu
    ? [
        {
          id: "creator-3d-avatar",
          title: "3D аватар стримы для создателей",
          for: "Создатели, которые ведут 3D аватар эфиры своим голосом.",
          setup: "Соберите персонажа, выберите сцены и подготовьте быстрые переключения.",
          does: "Держит персонажа и сценный workflow в порядке во время эфира.",
          outcome: "Уникальный формат с быстрыми сменами сцен.",
          tags: ["3D", "Scenes"],
        },
        {
          id: "interactive-dono",
          title: "Интерактивные dono шоу",
          for: "Форматы, где важны подарки, реакции и мини события.",
          setup: "Свяжите подарки с реакциями, VFX, сменами камеры и сцен.",
          does: "Запускает триггеры с cooldowns и приоритетами.",
          outcome: "Больше интерактива без потери контроля.",
          tags: ["Dono Engine", "Triggers"],
        },
        {
          id: "hybrid-cohost",
          title: "Гибридный стример + AI co-host",
          for: "Стримеры, которым нужна поддержка AI без потери лидерства.",
          setup: "Задайте скрипты, тон и моменты, когда co-host подключается.",
          does: "Заполняет паузы, следует скриптам и реагирует на чат и подарки.",
          outcome: "Шоу остается стабильным, когда нужен бэкап.",
          tags: ["Co-host", "Scripts"],
        },
        {
          id: "autopilot",
          title: "24/7 autopilot (optional)",
          for: "Команды, которые ротируют аккаунты и форматы круглосуточно.",
          setup: "Задайте правила, лимиты и расписания по аккаунтам.",
          does: "Запускает предсказуемые циклы с учетом Active Speech.",
          outcome: "Всегда активный эфир с контролируемым usage.",
          tags: ["Autopilot", "Active Speech"],
        },
        {
          id: "unreal-avatars",
          title: "Unreal аватар стримы",
          for: "Команды, которые ведут эфиры в Unreal сценах.",
          setup: "Подключите Unreal через Desktop Mode и экспортируйте персонажей.",
          does: "Соединяет Unreal workflow и проверяет диагностику.",
          outcome: "Меньше сбоев пайплайна во время эфира.",
          tags: ["Unreal", "Desktop Mode"],
        },
        {
          id: "team-workflows",
          title: "Командные и агентские workflow",
          for: "Агентства, которые управляют несколькими создателями и аккаунтами.",
          setup: "Управляйте библиотеками персонажей, ключами и ролями.",
          does: "Держит лимиты и доступы прозрачными для команды.",
          outcome: "Более чистые операции между аккаунтами.",
          tags: ["Teams", "Admin"],
        },
      ]
    : [
        {
          id: "creator-3d-avatar",
          title: "3D avatar creator streams",
          for: "Creators who lead 3D avatar streams with their own voice.",
          setup: "Build a character, pick scenes, and prep fast swaps.",
          does: "Keeps the avatar and scene workflow organized while you stream.",
          outcome: "A signature character format with fast scene changes.",
          tags: ["3D", "Scenes"],
        },
        {
          id: "interactive-dono",
          title: "Interactive dono shows",
          for: "Formats that rely on gifts, reactions, and mini-events.",
          setup: "Map gifts to reactions, VFX, camera cuts, and scene changes.",
          does: "Runs trigger rules with cooldowns and priorities.",
          outcome: "More interaction without losing control.",
          tags: ["Dono Engine", "Triggers"],
        },
        {
          id: "hybrid-cohost",
          title: "Hybrid streamer + AI co-host",
          for: "Streamers who want AI support without giving up the lead.",
          setup: "Set scripts, tone, and when the co-host steps in.",
          does: "Fills dead air, follows scripts, and reacts to chat and gifts.",
          outcome: "The live show stays consistent when you need backup.",
          tags: ["Co-host", "Scripts"],
        },
        {
          id: "autopilot",
          title: "24/7 autopilot (optional)",
          for: "Teams rotating accounts and formats around the clock.",
          setup: "Define rules, limits, and schedules per account.",
          does: "Runs predictable loops with Active Speech tracking.",
          outcome: "Always-on coverage with controlled usage.",
          tags: ["Autopilot", "Active Speech"],
        },
        {
          id: "unreal-avatars",
          title: "Unreal avatar streams",
          for: "Teams running Unreal scenes with live avatars.",
          setup: "Use Desktop Mode to connect Unreal and export characters.",
          does: "Connects Unreal workflows and validates diagnostics.",
          outcome: "Fewer pipeline issues during live sessions.",
          tags: ["Unreal", "Desktop Mode"],
        },
        {
          id: "team-workflows",
          title: "Team and agency workflows",
          for: "Agencies managing multiple creators and accounts.",
          setup: "Manage character libraries, keys, and roles.",
          does: "Keeps limits and access visible across teams.",
          outcome: "Cleaner operations across accounts.",
          tags: ["Teams", "Admin"],
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={isRu ? "Кейсы" : "Use cases"}
          title={title}
          subtitle={subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {useCases.map((uc) => (
            <div key={uc.id} id={uc.id} className="glass-card rounded-3xl p-7 scroll-mt-24">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{uc.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {uc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {isRu ? "Для кого" : "For"}
                  </p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{uc.for}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {isRu ? "Настройка" : "Setup"}
                  </p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{uc.setup}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {isRu ? "Что делает AI" : "What the AI does"}
                  </p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{uc.does}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {isRu ? "Результат" : "Outcome"}
                  </p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{uc.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={isRu ? "Результаты" : "Outcomes"}
          title={isRu ? "Что вы получаете" : "What you get"}
          subtitle={
            isRu
              ? "Определимый эффект для формата, качества и нагрузки."
              : "Concrete outcomes for format consistency and workload reduction."
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: isRu ? "Консистентность" : "Consistency",
              description: isRu
                ? "Один и тот же формат и поведение по слотам и аккаунтам."
                : "Repeatable format and behavior across sessions and accounts.",
            },
            {
              title: isRu ? "Предсказуемая стоимость" : "Predictable cost",
              description: isRu
                ? "Лимиты по Active Speech и оценка часов через talk ratio."
                : "Active Speech limits with stream-hour estimates via talk ratio.",
            },
            {
              title: isRu ? "Меньше ручной рутины" : "Less manual work",
              description: isRu
                ? "Скрипты, реакции и модерация собираются в один цикл."
                : "Scripts, reactions, and moderation in one loop.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-3xl p-6">
              <h4 className="text-base font-semibold text-white">{item.title}</h4>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow={isRu ? "Кейсы" : "Case studies"}
          title={isRu ? "Первые результаты (early access)" : "Early-access results"}
          subtitle={
            isRu
              ? "Пока без публичных кейсов — ниже честные плейсхолдеры."
              : "No public case studies yet — honest placeholders below."
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: isRu ? "Пилот" : "Pilot",
              body: isRu
                ? "Тест формата: реакции на подарки + сценарные сегменты."
                : "Format pilot: gift reactions + scripted segments.",
            },
            {
              title: isRu ? "Внутренний тест" : "Internal test",
              body: isRu
                ? "Диагностика Desktop Mode и проверка Unreal‑пайплайна."
                : "Desktop diagnostics and Unreal pipeline validation.",
            },
            {
              title: isRu ? "Партнёрство" : "Partner trial",
              body: isRu
                ? "Пробный запуск с интеграциями и лимитами."
                : "Trial run with integrations and usage limits.",
            },
          ].map((card) => (
            <div key={card.title} className="glass-card rounded-3xl p-6">
              <h4 className="text-base font-semibold text-white">{card.title}</h4>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="glass-card flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-semibold text-white">{isRu ? "Готовы обсудить ваш формат?" : "Want to plan your format?"}</h3>
            <p className="mt-2 text-sm text-white/70">{isRu ? "Скачайте демо или напишите нам — подскажем лучший сетап." : "Download the demo or reach out — we will help you pick the right setup."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/download">{isRu ? "Скачать демо" : "Download demo"}</Button>
            <Button href="/contact" variant="secondary">{isRu ? "Связаться" : "Contact"}</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

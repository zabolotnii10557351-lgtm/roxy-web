import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function UseCasesPage() {
  const locale = await getLocaleFromRequest();
  const isRu = locale === "ru";

  const title = isRu ? "Кейсы" : "Use cases";
  const subtitle = isRu
    ? "Форматы для создателей и команд: стабильный сценарий, предсказуемые лимиты и Unreal‑готовые workflow."
    : "Built for creators and teams that want consistent live formats, predictable costs, and Unreal-ready workflows.";

  const useCases = isRu
    ? [
        {
          id: "tiktok-cohost",
          title: "AI‑ко‑хост для TikTok Live",
          for: "Соло‑создатели, которым нужен стабильный формат без выгорания.",
          setup: "Подключите TikTok + выберите персону + выставьте talk ratio.",
          does: "Читает чат, реагирует на подарки, ведёт сегменты, держит темп.",
          outcome: "Больше консистентности и меньше ручной нагрузки.",
          tags: ["TikTok", "OBS"],
        },
        {
          id: "events",
          title: "Эфиры‑ивенты и премьеры",
          for: "Команды и бренды, которые делают регулярные запуски и спец‑эфиры.",
          setup: "Скрипт сегментов + правила модерации + сцен‑тайминг.",
          does: "Ведёт шоу по плану, переключает сегменты, поддерживает Q&A.",
          outcome: "Стабильное качество эфиров даже при перегрузке команды.",
          tags: ["OBS", "Scripts"],
        },
        {
          id: "qna",
          title: "Q&A‑шоу",
          for: "Создатели, которые хотят масштабировать ответы на аудиторию.",
          setup: "Правила ответов + стоп‑темы + лимиты речи.",
          does: "Отвечает по формату, не уходит в запрещённые темы, держит темп.",
          outcome: "Больше вовлечения и меньше хаоса в чате.",
          tags: ["TikTok"],
        },
        {
          id: "language-learning",
          title: "Языковые форматы",
          for: "Каналы обучения и практика разговорных навыков.",
          setup: "Персона + словарь/правила + сценарные упражнения.",
          does: "Ведёт упражнения, повторяет паттерны, поддерживает диалоги.",
          outcome: "Повторяемый формат и меньше подготовки.",
          tags: ["TikTok", "Scripts"],
        },
        {
          id: "product-demo",
          title: "Демо продукта в прямом эфире",
          for: "Стартапы и команды, которым нужен предсказуемый demo‑цикл.",
          setup: "Скрипт сегментов + блоки FAQ + правила модерации.",
          does: "Повторяет ключевые тезисы, отвечает на типовые вопросы.",
          outcome: "Снижение нагрузки на sales/support во время эфира.",
          tags: ["OBS"],
        },
        {
          id: "multi-account",
          title: "Мульти‑аккаунт и расписание",
          for: "Команды, которые крутят эфиры по регионам и часовым поясам.",
          setup: "Скрипты по аккаунтам + единые правила + лимиты.",
          does: "Повторяет проверенный формат и поддерживает консистентное поведение.",
          outcome: "Одинаковое качество в разных слотах без ручного контроля.",
          tags: ["Scheduler"],
        },
        {
          id: "unreal-avatar",
          title: "Премиум‑аватар в Unreal",
          for: "Команды, которые хотят визуальный уровень ‘как у студии’.",
          setup: "Desktop Mode + Unreal workflow + проверка пайплайна.",
          does: "Подключает реакции и речь к сцене, помогает с диагностикой.",
          outcome: "Более ‘дорогой’ вид и меньше срывов пайплайна.",
          tags: ["Unreal", "Live Link Face"],
        },
      ]
    : [
        {
          id: "tiktok-cohost",
          title: "AI co-host for TikTok Live",
          for: "Solo creators who want a stable live format.",
          setup: "Connect TikTok + pick a persona + set talk ratio.",
          does: "Reads chat, reacts to gifts, follows show segments, keeps pacing.",
          outcome: "More consistency, less burnout.",
          tags: ["TikTok", "OBS"],
        },
        {
          id: "events",
          title: "Events and premieres",
          for: "Teams running launches and scheduled live events.",
          setup: "Define segments + safety rules + timing.",
          does: "Runs the show loop, switches segments, supports Q&A.",
          outcome: "Consistent delivery even with a small team.",
          tags: ["OBS", "Scripts"],
        },
        {
          id: "qna",
          title: "Q&A shows",
          for: "Creators who want to scale audience interaction.",
          setup: "Answer rules + blocked topics + usage limits.",
          does: "Answers in format, avoids unsafe topics, keeps pacing.",
          outcome: "Higher engagement with fewer chat derailments.",
          tags: ["TikTok"],
        },
        {
          id: "language-learning",
          title: "Language-learning streams",
          for: "Education channels and practice-focused formats.",
          setup: "Persona + glossary/rules + scripted exercises.",
          does: "Guides exercises, repeats patterns, runs drills.",
          outcome: "Repeatable format with less prep.",
          tags: ["TikTok", "Scripts"],
        },
        {
          id: "product-demo",
          title: "Live product demos",
          for: "Teams who need a predictable demo loop.",
          setup: "Segment scripts + FAQ blocks + moderation rules.",
          does: "Repeats key points, answers common questions.",
          outcome: "Reduces sales/support load during streams.",
          tags: ["OBS"],
        },
        {
          id: "multi-account",
          title: "Multi-account scheduling",
          for: "Teams rotating channels across regions.",
          setup: "Pre-build scripts per account and time zone.",
          does: "Repeats a proven format and keeps behavior consistent.",
          outcome: "Stable output across time zones.",
          tags: ["Scheduler"],
        },
        {
          id: "unreal-avatar",
          title: "Unreal-ready avatar workflows",
          for: "Teams building premium avatar experiences.",
          setup: "Desktop Mode + Unreal workflow + end-to-end checks.",
          does: "Connects reactions and voice to your scene and helps validate the pipeline.",
          outcome: "Higher production value with fewer pipeline failures.",
          tags: ["Unreal", "Live Link Face"],
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

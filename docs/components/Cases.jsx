// Cases — 5 telecom AI cases from the PRD.
// Grid of summary cards; clicking one opens a modal with the full case.

const CASES = [
  {
    num: "01",
    title: "AI-аналитик задач",
    role: "AI Task Analyst",
    short: "Разбирает длинные цепочки переписки в задачах. Выдаёт суть, статус и следующий шаг — прямо внутри тикета.",
    context: "Интернет-провайдер. Большой поток технических задач, сложные цепочки переписки.",
    problem: [
      "50–100+ комментариев в одной задаче",
      "15–30 минут на вход в контекст",
      "Суть теряется в длинной переписке",
    ],
    ai: [
      "Анализирует всю переписку по задаче",
      "Выделяет суть, что уже сделано, текущий статус, следующий шаг",
      "Формирует структурированный summary прямо в задаче",
      "Предлагает вопросы, которые стоит решить для быстрого закрытия задачи",
    ],
    integrations: ["Task tracker (Jira / аналог)", "Внутренняя переписка", "Базы знаний"],
    results: [
      { value: "< 2 мин", label: "вход в задачу вместо 30 минут" },
      { value: ">90%", label: "adoption у сотрудников" },
      { value: "Один источник", label: "правды по статусу задачи" },
    ],
    changed: "Сотрудники работают не с «сырым шумом», а с уже разобранной задачей.",
  },
  {
    num: "02",
    title: "AI-инженер по модернизации сети",
    role: "ИИ-инженер по модернизации",
    short: "Проверяет техвозможность подключения абонента на высокий тариф — за минуты, по всей цепочке оборудования.",
    context: "Провайдер. Задача — можно ли подключить абонента на более высокий тариф.",
    problem: [
      "Пройти всю цепочку оборудования вручную",
      "Проверить коммутаторы и загрузку uplink",
      "Сверить тариф и параметры",
      "Десятки минут + 3–4 отдела на одну задачу",
    ],
    ai: [
      "Строит цепочку оборудования от абонента до ядра",
      "Проверяет модели оборудования",
      "Анализирует загрузку uplink",
      "Формирует вердикт: можно подключить / нужна замена / невозможно",
    ],
    integrations: ["Сетевые системы", "Данные по оборудованию", "Мониторинг загрузки"],
    results: [
      { value: "~2000", label: "задач/мес автоматизировано" },
      { value: "2 суток → 1 час", label: "время до вердикта" },
      { value: "4 → 1", label: "отделов в процессе" },
    ],
    changed: "Инженер получает готовый технический вывод, а не делает ресерч.",
  },
  {
    num: "03",
    title: "AI NOC Engineer",
    role: "AI NOC Engineer",
    short: "Сам разбирает инциденты на сети: диагностика, возможная причина и готовые рекомендации в задаче.",
    context: "Интернет-провайдер с большим количеством оборудования и абонентов. Постоянный поток событий и инцидентов в сети.",
    problem: [
      "Инциденты выявляются постфактум",
      "Инженеры реагируют вручную",
      "Диагностика: проверка портов, анализ ошибок, сопоставление данных",
      "Высокая нагрузка на NOC",
    ],
    ai: [
      "Анализирует данные с коммутаторов",
      "Выявляет ошибки и аномалии",
      "Автоматически создаёт задачи и определяет возможную причину",
      "Проводит первичную диагностику",
      "Выдаёт рекомендации инженеру",
    ],
    integrations: ["Системы мониторинга", "Коммутаторы и оборудование", "Task tracker", "Внутренняя инфраструктура"],
    results: [
      { value: "До абонента", label: "раннее выявление проблем" },
      { value: "× быстрее", label: "первичная диагностика" },
      { value: "Ниже", label: "нагрузка на инженеров NOC" },
    ],
    changed: "Инженер больше не «ищет проблему» — он получает уже разобранный инцидент с рекомендацией.",
  },
  {
    num: "04",
    title: "ИИ-аналитик сети и абонентов",
    role: "AI аналитик сети и абонентов",
    short: "Отвечает на операционные вопросы по сети, абонентам и оборудованию — без сборки отчётов.",
    context: "Компания с большим объёмом данных: сеть, абоненты, финансы, загрузка оборудования.",
    problem: [
      "На простой вопрос «что происходит в сети?» нужно собрать данные из разных систем",
      "Агрегировать вручную",
      "Анализировать вручную",
      "Аналитик тратит часы на каждый запрос",
    ],
    ai: [
      "Отвечает на запросы: где абонент, загрузка сети, количество устройств, состояние портов",
      "Анализирует загрузку узлов и узкие места",
      "Прогнозирует перегрузки и проблемы",
      "Работает с данными по абонентам: баланс, активность, прогноз отключения",
    ],
    integrations: ["Биллинг / CRM", "Сетевые системы", "Базы данных", "Внутренняя аналитика"],
    results: [
      { value: "Мгновенно", label: "ответы на операционные вопросы" },
      { value: "Ниже", label: "нагрузка на аналитиков" },
      { value: "Выше", label: "прозрачность бизнеса" },
    ],
    changed: "Раньше: «собрать отчёт». Теперь: «задать вопрос и получить ответ».",
  },
  {
    num: "05",
    title: "ИИ-конфигуратор сети",
    role: "ИИ-конфигуратор сети",
    short: "Генерирует готовые сетевые конфиги под задачу — со сверкой по работающим узлам.",
    context: "Настройка сетевого оборудования при подключении абонентов и изменениях в сети.",
    problem: [
      "Конфиги создаются вручную",
      "Высокий риск ошибок",
      "Нужно учитывать текущие настройки и сверяться с рабочими конфигами",
      "Занимает время инженера",
    ],
    ai: [
      "Генерирует готовые конфиги под задачу",
      "Автоматически подбирает порт и учитывает параметры оборудования",
      "Сравнивает с существующими конфигурациями, показывает diff",
      "Подготавливает рекомендации",
    ],
    integrations: ["Сетевое оборудование", "Конфигурационные данные", "Внутренняя инфраструктура"],
    results: [
      { value: "× быстрее", label: "настройка оборудования" },
      { value: "Меньше", label: "ошибок благодаря diff-сверке" },
      { value: "Единый стиль", label: "стандартизация конфигов" },
    ],
    changed: "Инженер не пишет конфиг вручную — проверяет и применяет готовое решение.",
  },
];

// ──────────────────────────────────────────────────────────────
// Card — summary entry inside the grid. Click opens the modal.
// ──────────────────────────────────────────────────────────────
function CaseCard({ caseData, onOpen }) {
  return (
    <button
      type="button"
      className="case-card"
      onClick={() => onOpen(caseData)}
      style={{ "--num-bg": "var(--primary)" }}
    >
      <div className="case-card__top">
        <span className="case-card__eyebrow">Кейс {caseData.num}</span>
        <span className="case-card__role">{caseData.role}</span>
      </div>
      <h3 className="case-card__title">{caseData.title}</h3>
      <p className="case-card__short">{caseData.short}</p>
      <span className="case-card__more">
        Подробнее
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {/* Decorative big number watermark */}
      <span className="case-card__bignum" aria-hidden="true">{caseData.num}</span>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// Modal — full case detail. Mirrors the template layout, but in
// the landing's purple aesthetic and using the design tokens.
// ──────────────────────────────────────────────────────────────
function CaseModal({ caseData, onClose }) {
  // Lock background scroll while open + close on Esc.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!caseData) return null;
  const c = caseData;

  return (
    <div
      className="case-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Кейс ${c.num}: ${c.title}`}
    >
      <div className="case-modal__sheet">
        <button type="button" className="case-modal__close" onClick={onClose} aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round"/>
          </svg>
        </button>

        <header className="case-detail__head">
          <span className="case-detail__eyebrow">Кейс {c.num}</span>
          <h2 className="case-detail__title">{c.title}</h2>
          <p className="case-detail__role">Роль: <b>{c.role}</b></p>
          <p className="case-detail__short">{c.short}</p>
        </header>

        {/* Mini flow strip — Source → Equipment → AI → Engineer */}
        <div className="case-flow">
          <CaseFlowNode label="Источник"     sub="абонент / задача" />
          <CaseFlowArrow />
          <CaseFlowNode label="Оборудование" sub="и системы" />
          <CaseFlowArrow />
          <CaseFlowNode label="AI-ассистент" sub="Sensei" active />
          <CaseFlowArrow />
          <CaseFlowNode label="Инженер"      sub="результат" />
        </div>

        <div className="case-detail__insight">
          <span className="case-detail__spark" aria-hidden="true" />
          AI собирает контекст, выявляет причины и предлагает решение.
        </div>

        {/* Context card */}
        <section className="case-detail__context">
          <div className="case-detail__context-label">Контекст</div>
          <p>{c.context}</p>
        </section>

        {/* 2-up: problem + AI actions */}
        <div className="case-detail__grid">
          <article className="case-block case-block--problem">
            <h3 className="case-block__title">
              <span className="case-block__num">1</span>
              Проблема
            </h3>
            <ul>
              {c.problem.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </article>
          <article className="case-block case-block--ai">
            <h3 className="case-block__title">
              <span className="case-block__num">2</span>
              Что делает ИИ
            </h3>
            <ul className="case-block__check">
              {c.ai.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </article>
        </div>

        {/* Integrations chain */}
        <section className="case-section">
          <h3 className="case-section__title">
            <span className="case-section__num">3</span>
            Интеграции
          </h3>
          <div className="case-chain">
            {c.integrations.map((it, i) => (
              <React.Fragment key={it}>
                {i > 0 && <CaseFlowArrow small />}
                <div className="case-chain__node">{it}</div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Results — 3 metric cards */}
        <section className="case-section">
          <h3 className="case-section__title">
            <span className="case-section__num">4</span>
            Результат
          </h3>
          <div className="case-results">
            {c.results.map((r, i) => (
              <article key={i} className="case-metric">
                <span className="case-metric__value">{r.value}</span>
                <span className="case-metric__label">{r.label}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Closing quote */}
        <section className="case-section case-section--quote">
          <h3 className="case-section__title">
            <span className="case-section__num">5</span>
            Что изменилось
          </h3>
          <blockquote className="case-quote">
            <span className="case-quote__mark" aria-hidden="true">“</span>
            {c.changed}
          </blockquote>
        </section>
      </div>
    </div>
  );
}

function CaseFlowNode({ label, sub, active }) {
  return (
    <div className={"case-flow__node" + (active ? " case-flow__node--active" : "")}>
      <div className="case-flow__dot">
        {active ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ) : <span className="case-flow__inner" />}
      </div>
      <p className="case-flow__label">{label}</p>
      {sub && <p className="case-flow__sub">{sub}</p>}
    </div>
  );
}
function CaseFlowArrow({ small }) {
  return (
    <span className={"case-flow__arrow" + (small ? " case-flow__arrow--sm" : "")}
          aria-hidden="true">→</span>
  );
}

// ──────────────────────────────────────────────────────────────
// Section — public component, replaces the old Industries block.
// ──────────────────────────────────────────────────────────────
function Cases() {
  const [active, setActive] = React.useState(null);

  // Allow opening a case via #case-03 etc. — handy for deep-linking.
  React.useEffect(() => {
    const tryOpen = () => {
      const m = window.location.hash.match(/^#case-(\d{1,2})$/);
      if (!m) return;
      const num = String(parseInt(m[1], 10)).padStart(2, "0");
      const found = CASES.find(x => x.num === num);
      if (found) setActive(found);
    };
    tryOpen();
    window.addEventListener("hashchange", tryOpen);
    return () => window.removeEventListener("hashchange", tryOpen);
  }, []);

  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Кейсы</span>
          <h2>Что <em>Sensei</em> уже делает в телекоме</h2>
          <p className="section__sub">
            Пять ролей, в которых ИИ-сотрудник заменяет рутину: от разбора инцидентов
            и техпроверок до конфигов и аналитики по сети и абонентам.
          </p>
        </div>

        <div className="case-grid">
          {CASES.map(c => (
            <CaseCard key={c.num} caseData={c} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && <CaseModal caseData={active} onClose={() => setActive(null)} />}
    </section>
  );
}
Object.assign(window, { Cases });

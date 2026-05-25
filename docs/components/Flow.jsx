// How-it-works — horizontal flow.
// Steps light up cumulatively as the user scrolls through the section,
// like a progress indicator. Clicking still focuses a step manually.

const STEPS = [
  { step: "01", title: "Поставьте задачу",
    desc: "Через тикет, сервис-деск, мессенджер или голосом. Привычный для команды способ.",
    chips: ["Тикет", "Мессенджер", "Голос"] },
  { step: "02", title: "Sensei подключается",
    desc: "К вашим внутренним системам — внутри защищённого контура компании.",
    chips: ["CRM", "OSS/BSS", "NMS", "NetBox", "Биллинг"] },
  { step: "03", title: "Анализирует контекст",
    desc: "Собирает данные, проверяет регламенты, оценивает параметры. Данные остаются внутри.",
    panel: "100% данных остаётся внутри вашей инфраструктуры" },
  { step: "04", title: "Возвращает результат",
    desc: "Готовый ответ в тикет, отчёт, письмо или карточку. Критические действия подтверждает человек.",
    chips: ["Ответ", "Отчёт", "Карточка", "Документ"] },
];

const PERIMETER = [
  { label: "Air-gapped",
    desc: "Работает без доступа в интернет — Sensei живёт целиком в вашем контуре." },
  { label: "RBAC",
    desc: "Ролевая модель доступа — каждый агент действует строго в рамках разрешений." },
  { label: "Аудит",
    desc: "Логирование всех промптов и действий — поток событий уходит в ваш SIEM." },
];

const STANDARDS = [
  { code: "ФЗ-152",       desc: "Персональные данные" },
  { code: "ФЗ-187",       desc: "Безопасность КИИ" },
  { code: "ГОСТ Р 57580", desc: "Финсектор" },
  { code: "ISO 27001",    desc: "ISMS" },
  { code: "SOC 2",        desc: "Type II" },
  { code: "OWASP ASVS",   desc: "Уровень 2" },
];

const FAQS = [
  {
    q: "Куда отправляются данные клиентов и сотрудников?",
    a: "Никуда. Sensei работает в вашем on-premise контуре. Нет исходящих соединений с внешним интернетом, нет внешних LLM-провайдеров, нет нашей телеметрии.",
  },
  {
    q: "Какие LLM используются и где они работают?",
    a: "Локально развёрнутые open-source модели на вашем железе. Поддерживаем Llama 3, Qwen, YandexGPT внутри контура. Внешние API-сервисы (OpenAI, Anthropic) не используются.",
  },
  {
    q: "Что Sensei может делать самостоятельно?",
    a: "Только то, что разрешено вашим регламентом. По умолчанию — чтение и подготовка ответа. Любое изменение в системе требует подтверждения человека или explicit-разрешения в политике.",
  },
  {
    q: "Как контролируется доступ Sensei к системам?",
    a: "Стандартная сервисная учётная запись с минимальными правами. Доступы к CRM, OSS/BSS, NMS назначаются вашим админом по принципу наименьших привилегий. Отзывается одной кнопкой.",
  },
  {
    q: "Можно ли отследить каждое действие?",
    a: "Да. Полный аудит-журнал по каждому запросу: какие системы опрашивались, какие данные читались, какие изменения предложены или выполнены. Журнал интегрируется в ваш SIEM.",
  },
  {
    q: "Как обновляется платформа? Что с пайплайном поставки?",
    a: "Образы поставляются вашим регламентом — DEV → STAGE → PROD. Без принудительных обновлений. Каждый релиз проходит ваши проверки безопасности перед выкаткой.",
  },
];

function FAQItem({ q, a }) {
  return (
    <details className="faq">
      <summary className="faq__q">
        <span>{q}</span>
        <span className="faq__chev" aria-hidden="true" />
      </summary>
      <p className="faq__a">{a}</p>
    </details>
  );
}

function Flow() {
  const sectionRef = React.useRef(null);
  const flowRef = React.useRef(null);
  const [litCount, setLitCount] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const flow = flowRef.current;
      if (!section || !flow) return;

      const sectionRect = section.getBoundingClientRect();
      const flowRect = flow.getBoundingClientRect();
      const vh = window.innerHeight;

      // Если секция не видна — обнулить
      if (sectionRect.bottom < 0 || sectionRect.top > vh) {
        setLitCount(0);
        return;
      }

      // Прогресс: на сколько flow-блок прошёл от bottom в top viewport
      const flowTop = flowRect.top;
      const flowHeight = flowRect.height;
      
      // 0 → flow вошёл в bottom viewport
      // 1 → flow уходит из top viewport
      let progress = 0;
      if (flowTop > vh) {
        progress = 0;
      } else if (flowTop + flowHeight < 0) {
        progress = 1;
      } else {
        progress = (vh - flowTop) / (vh + flowHeight);
      }

      const count = Math.min(Math.floor(progress * STEPS.length) + 1, STEPS.length);
      setLitCount(count);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = Math.max(0, litCount - 1);
  const fillPct = Math.min(100, Math.max(0, (litCount / STEPS.length) * 100));

  return (
    <section className="section" id="flow" ref={sectionRef}>
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Как это работает</span>
          <h2>Просто. Быстро. <em>Безопасно.</em></h2>
          <p className="section__sub">Четыре шага от задачи до готового результата.</p>
        </div>
        <div className="flow" ref={flowRef}>
          <div className="flow__progress" style={{ width: `${fillPct}%` }} />
          {STEPS.map((s, i) => {
            const lit = i < litCount;
            return (
              <div
                key={s.step}
                data-step={i + 1}
                className={
                  "flow__step" +
                  (lit            ? " lit"    : "") +
                  (i === active   ? " active" : "")
                }
              >
                <div className="flow__dot">{s.step}</div>
                <div className="flow__body">
                  <h3 className="flow__title">{s.title}</h3>
                  <p className="flow__desc">{s.desc}</p>
                  {s.chips && (
                    <div className="flow__chips">
                      {s.chips.map(c => <span key={c} className="flow__chip">{c}</span>)}
                    </div>
                  )}
                  {s.panel && <div className="flow__panel">{s.panel}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="perimeter">
          <div className="perimeter__head">
            <span className="perimeter__eyebrow">Закрытый контур</span>
            <h3 className="perimeter__title">
              Всё, что нужно службе ИБ, — <em>уже встроено в платформу</em>
            </h3>
          </div>
          <div className="perimeter__grid">
            {PERIMETER.map((p) => (
              <div key={p.label} className="perimeter__card">
                <span className="perimeter__label">{p.label}</span>
                <p className="perimeter__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-standards">
          <div className="sec-standards__head">
            <span className="sec-standards__label">Соответствие стандартам</span>
            <p className="sec-standards__sub">
              Архитектура Sensei спроектирована под требования российских регуляторов
              и международных стандартов ИБ.
            </p>
          </div>
          <div className="sec-standards__grid">
            {STANDARDS.map(s => (
              <div key={s.code} className="std">
                <span className="std__code">{s.code}</span>
                <span className="std__desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-faq" id="faq">
          <div className="sec-faq__head">
            <span className="section__eyebrow">Часто Задаваемые Вопросы</span>
            <h3><em>FAQ</em></h3>
            <p className="section__sub">
              Если у вашей службы безопасности остаются открытые вопросы — мы готовы
              прислать архитектурный документ и пройти security-ревью.
            </p>
          </div>
          <div className="sec-faq__grid">
            {FAQS.map((qa, i) => <FAQItem key={i} {...qa} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Flow });

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
  const outerRef    = React.useRef(null); // scroll-budget section
  const frameRef    = React.useRef(null); // flow cards panel
  const securityRef = React.useRef(null); // perimeter + standards + faq
  const [litCount, setLitCount] = React.useState(1);

  const STEP_BUDGET  = 280;
  const TOTAL_BUDGET = STEPS.length * STEP_BUDGET; // 1120 px

  React.useEffect(() => {
    const outer    = outerRef.current;
    const frame    = frameRef.current;
    const security = securityRef.current;
    if (!outer || !frame || !security) return;

    // ── Tablet/mobile (≤1080px): vertical layout, simple scroll highlight ──
    if (window.innerWidth <= 1080) {
      const steps = Array.from(outer.querySelectorAll('.flow__step'));
      const update = () => {
        const trigger = window.innerHeight * 0.65;
        let count = 0;
        steps.forEach(step => {
          if (step.getBoundingClientRect().top < trigger) count++;
        });
        setLitCount(Math.max(1, count));
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      return () => window.removeEventListener('scroll', update);
    }

    // ── Desktop/tablet: sticky scroll-budget animation ──
    // Outer section height = frame + security + scroll budget.
    // Both children sit in normal flow initially (frame on top, security below),
    // so the page looks correct before the section enters the viewport.
    const setHeight = () => {
      const fH = frame.offsetHeight;
      const sH = security.offsetHeight;
      outer.style.minHeight = `${fH + sH + TOTAL_BUDGET}px`;
    };
    requestAnimationFrame(setHeight);
    window.addEventListener('resize', setHeight);

    const reset = (el) => { el.style.position = el.style.top = el.style.left = el.style.right = ''; };

    const onScroll = () => {
      const into = -outer.getBoundingClientRect().top;
      const fH   = frame.offsetHeight;
      const sH   = security.offsetHeight; // live — updates when FAQ expands

      // Always keep outer tall enough so FAQ expansion never overlaps next section
      outer.style.minHeight = `${fH + sH + TOTAL_BUDGET}px`;

      if (into < 0) {
        // ── Above section: pure normal flow ──
        reset(frame); reset(security);
        setLitCount(0);
        return;
      }

      if (into >= TOTAL_BUDGET) {
        // ── Budget done: absolute so both scroll off with the section ──
        reset(frame); reset(security);
        frame.style.position    = 'absolute';
        frame.style.top         = `${TOTAL_BUDGET}px`;
        frame.style.left        = '0';
        frame.style.right       = '0';
        security.style.position = 'absolute';
        security.style.top      = `${TOTAL_BUDGET + fH}px`;
        security.style.left     = '0';
        security.style.right    = '0';
        setLitCount(STEPS.length);
        return;
      }

      // ── In budget: both fixed, security sits right below frame ──
      frame.style.position    = 'fixed';
      frame.style.top         = '0';
      frame.style.left        = '0';
      frame.style.right       = '0';
      security.style.position = 'fixed';
      security.style.top      = `${fH}px`;
      security.style.left     = '0';
      security.style.right    = '0';
      setLitCount(Math.min(Math.floor(into / STEP_BUDGET) + 1, STEPS.length));
    };

    // ResizeObserver: пересчитываем высоту при раскрытии FAQ (без скролла)
    const ro = new ResizeObserver(onScroll);
    ro.observe(security);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setHeight);
      outer.style.minHeight = '';
      reset(frame); reset(security);
    };
  }, []);

  const active  = Math.max(0, litCount - 1);
  const fillPct = Math.min(100, (litCount / STEPS.length) * 100);

  return (
    <section id="how-it-works" className="flow-outer-section section" ref={outerRef}>

      {/* ── Flow cards — becomes fixed during animation ── */}
      <div className="flow-sticky-frame" ref={frameRef}>
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">Как это работает</span>
            <h2>Просто. Быстро. <em>Безопасно.</em></h2>
            <p className="section__sub">Четыре шага от задачи до готового результата.</p>
          </div>
          <div className="flow">
            <div className="flow__progress" style={{ width: `${fillPct}%` }} />
            {STEPS.map((s, i) => {
              const lit = i < litCount;
              return (
                <div
                  key={s.step}
                  className={
                    "flow__step" +
                    (lit          ? " lit"    : "") +
                    (i === active ? " active" : "")
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
        </div>
      </div>

      {/* ── Security content — also fixed during animation, right below frame ── */}
      <div className="flow-security" ref={securityRef}>
        <div className="container">
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
            <div className="faq-cta">
              <p className="faq-cta__label">Остались вопросы?</p>
              <p className="faq-cta__sub">Расскажем об архитектуре, проведём security-ревью и ответим на всё лично.</p>
              <button
                className="faq-cta__btn"
                onClick={() => {
                  const input = document.querySelector('#form .form-panel input[type="text"]');
                  if (!input) return;
                  window.scrollTo({ top: input.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
                  setTimeout(() => input.focus(), 600);
                }}
              >
                Записаться на демо →
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
Object.assign(window, { Flow });

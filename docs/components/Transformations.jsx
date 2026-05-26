// Transformations — 4 before/after KPI cards + 1 custom task card in a
// 24px-gap column that collapse into a peek-stack as the user scrolls.
//
// Approach: pure CSS. Each card uses `position: sticky` with a per-card
// `top: calc(110px + var(--i) * 32px)` so it stops 32px lower than the
// previous one — forming a peek-stack naturally. No scroll JS, no
// translateY ramps (those caused visible jerks because the ramp moved
// the card opposite to scroll direction right before sticking).

const XFORMS = [
  { num: "01", title: "Проверка технической возможности",
    desc: "Sensei сам собирает данные из OSS/BSS, проверяет порты и трассу, формирует готовый ответ в тикет.",
    before: "2-3 дня", after: "10 мин" },
  { num: "02", title: "Разбор инцидента L1",
    desc: "Сбор контекста, приоритизация, рекомендации — автоматически. Инженер получает готовый план действий.",
    before: "40 мин", after: "5 мин" },
  { num: "03", title: "Рутина абонентского сервиса",
    desc: "Карточка клиента, история обращений, подготовка ответа — без переключений между системами.",
    before: "200+ ч/мес", after: "20 ч" },
  { num: "04", title: "Количество окон для задачи",
    desc: "Sensei сам ходит по системам и возвращает результат в привычный интерфейс.",
    before: "8 систем", after: "1 чат" },
];

function CustomTaskCard() {
  const [task, setTask] = React.useState("");

  React.useEffect(() => {
    // Load saved task from localStorage on mount
    const saved = localStorage.getItem("sensei_custom_task");
    if (saved) setTask(saved);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setTask(value);
    localStorage.setItem("sensei_custom_task", value);
    // Notify CTA form in real time (same-page sync)
    window.dispatchEvent(new CustomEvent("sensei-task-change", { detail: value }));
  };

  const handleSubmit = () => {
    // Scroll to the name input and focus it (same logic as Nav scrollToForm)
    const input = document.querySelector('#form .form-panel input[type="text"]');
    if (!input) return;
    const top = input.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => input.focus(), 600);
  };

  return (
    <article className="xform xform--custom" style={{ "--i": 4 }}>
      <div className="xform__head">
        <div className="xform__num">05</div>
        <h3 className="xform__title">Ваша задача</h3>
      </div>
      <p className="xform__desc">Опишите свою задачу и мы расскажем, как Sensei поможет её решить</p>
      <textarea
        className="xform__textarea"
        placeholder="Напишите задачу, которую вы хотите автоматизировать..."
        value={task}
        onChange={handleChange}
        rows={4}
      />
      <button className="xform__submit" onClick={handleSubmit}>
        Рассказать о решении
      </button>
    </article>
  );
}

function Transformations() {
  // The peek-stack is pure CSS. JS does two things:
  //  1. Measures the sticky heading's height so cards know where to stack.
  //  2. Once the stack starts collapsing, applies a matching translateY
  //     to the heading so it un-sticks together with the cards instead
  //     of staying pinned to the top while cards scroll up under it.
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const head = section.querySelector('.section__head');
    const stack = section.querySelector('.xforms-stack');
    const cards = stack ? [...stack.querySelectorAll('.xform')] : [];
    const lastCard = cards[cards.length - 1];
    const HEAD_TOP = 110;    // desktop: cards stack below sticky heading
    const MOBILE_TOP = 96;   // mobile: cards stick just below nav with gap
    const MOBILE_BP = 700;
    let stackTop = HEAD_TOP;

    const isMobile = () => window.innerWidth <= MOBILE_BP;

    // 1. Measure heading, set --xforms-stack-top so cards know where to pile.
    //    On mobile the heading is static — cards stack from nav bottom instead.
    const updateStackTop = () => {
      stackTop = isMobile()
        ? MOBILE_TOP
        : HEAD_TOP + head.offsetHeight + 32; // 32 = margin-bottom
      section.style.setProperty('--xforms-stack-top', `${stackTop}px`);
    };
    updateStackTop();
    window.addEventListener('resize', updateStackTop);

    // 2. When the last card starts scrolling off its sticky position,
    //    move the heading (desktop only) by the same delta so they exit together.
    const onScroll = () => {
      if (!lastCard) return;
      const wrap = head.parentElement; // .xforms-wrap
      const wrapBottom = wrap.getBoundingClientRect().bottom;
      const lastI = cards.length - 1;
      const lastCardStickyTop = stackTop + lastI * 32;
      const threshold = lastCardStickyTop + lastCard.offsetHeight;

      if (wrapBottom < threshold) {
        const delta = threshold - wrapBottom;
        if (!isMobile()) head.style.top = `${HEAD_TOP - delta}px`;
        cards.forEach((card, idx) => {
          card.style.top = `${stackTop + idx * 32 - delta}px`;
        });
      } else {
        if (!isMobile()) head.style.top = '';
        cards.forEach(c => { c.style.top = ''; });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateStackTop);
      if (head) head.style.top = '';
      cards.forEach(c => { c.style.top = ''; });
    };
  }, []);

  return (
    <section className="section xforms-section" id="xforms" ref={sectionRef}>
      <div className="container">
        <div className="xforms-wrap">
          <div className="section__head">
            <span className="section__eyebrow">Проблемы → решения</span>
            <h2><span style={{whiteSpace:'nowrap'}}>Какие бизнес-процессы вы можете</span><br /><em>оптимизировать с помощью Sensei</em></h2>
            <p className="section__sub">
              Каждый день инженеры и операторы тратят часы на рутину, которую Sensei
              выполняет за минуты — в рамках вашего регламента, под вашим аудитом.
            </p>
          </div>
          <div className="xforms-stack">
            {XFORMS.map((x, i) => (
              <article key={x.num} className="xform" style={{ "--i": i }}>
                <div className="xform__head">
                  <div className="xform__num">{x.num}</div>
                  <h3 className="xform__title">{x.title}</h3>
                </div>
                <p className="xform__desc">{x.desc}</p>
                <div className="kpi">
                  <div className="kpi__part">
                    <span className="kpi__label">Боль</span>
                    <span className="kpi__before">{x.before}</span>
                  </div>
                  <span className="kpi__arrow">→</span>
                  <div className="kpi__part right">
                    <span className="kpi__label">Решение</span>
                    <span className="kpi__after">{x.after}</span>
                  </div>
                </div>
              </article>
            ))}
            <CustomTaskCard />
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Transformations });

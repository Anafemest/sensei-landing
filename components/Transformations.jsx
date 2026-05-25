// Transformations — 4 before/after KPI cards in a 24px-gap column that
// collapse into a peek-stack as the user scrolls.
//
// Approach: every card is `position: sticky; top: 110px`. In flow they
// sit naturally with `gap: 24px`. JS measures each card's natural
// document position once on mount; on scroll we apply `translateY(i*32)`
// ONLY when a card has reached its sticky stop, otherwise the transform
// is 0 (so the flow gap stays a clean 24px). The last 24px of approach
// is ramped smoothly so the peek snaps in without a hard jump.
//
// Because every card shares the SAME sticky top, they all detach at the
// same scroll position when the stack's parent ends — the collapsed
// stack leaves as a single block.

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

const STICKY_TOP = 110;     // must match `.xform { top: ... }` in CSS
const PEEK_PER_CARD = 32;   // visible peek of each previous card in the stack
const RAMP_ZONE = 24;       // px of scroll over which the peek phases in

function Transformations() {
  const sectionRef = React.useRef(null);
  const stackRef = React.useRef(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;
    const cards = Array.from(stack.querySelectorAll(".xform"));
    if (!cards.length) return;

    // Measure each card's natural document position WITHOUT any transform.
    let naturalDocTops = [];
    let cardH = 0;
    const measure = () => {
      // Clear transforms before measuring so we get true flow positions.
      cards.forEach((c) => { c.style.transform = ""; });
      naturalDocTops = cards.map((c) => {
        const r = c.getBoundingClientRect();
        return r.top + window.scrollY;
      });
      cardH = cards[0].getBoundingClientRect().height;
    };
    measure();

    const onScroll = () => {
      const scrollY = window.scrollY;
      const sectionRect = section.getBoundingClientRect();
      // All cards share the same sticky top, so they all detach when
      // the stack's bottom rises past STICKY_TOP + cardH.
      const stackRect = stack.getBoundingClientRect();
      const detached = stackRect.bottom < STICKY_TOP + cardH;

      cards.forEach((card, i) => {
        const naturalViewportTop = naturalDocTops[i] - scrollY;
        // Ramp the peek in over the last RAMP_ZONE px before the card
        // would stick — gives a smooth phase-in rather than a hard snap.
        const zoneStart = STICKY_TOP + RAMP_ZONE;
        const zoneEnd = STICKY_TOP;
        let t = (zoneStart - naturalViewportTop) / (zoneStart - zoneEnd);
        t = Math.max(0, Math.min(1, t));
        if (detached) t = 0;
        const peek = t * i * PEEK_PER_CARD;
        card.style.transform = `translateY(${peek}px)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); onScroll(); });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section xforms-section" id="xforms" ref={sectionRef}>
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Проблемы → решения</span>
          <h2>Какие бизнес-процессы вы можете<br /><em>оптимизировать с помощью Sensei</em></h2>
          <p className="section__sub">
            Каждый день инженеры и операторы тратят часы на рутину, которую Sensei
            выполняет за минуты — в рамках вашего регламента, под вашим аудитом.
          </p>
        </div>
        <div className="xforms-stack" ref={stackRef}>
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
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Transformations });

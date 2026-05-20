// Transformations — 4 before/after KPI cards in a 2×2 grid.

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
  before: "8 систем", after: "1 чат" }];


function Transformations() {
  const headRef = React.useRef(null);
  const cardsRef = React.useRef(null);

  // Once the last card has reached its sticky stop (all cards stacked),
  // translate the heading up by the same scroll distance — so it appears
  // to scroll naturally with the page, keeping its gap from the stacked
  // cards. The card stack stays stuck; heading moves away with scroll.
  React.useEffect(() => {
    const head = headRef.current;
    const wrap = cardsRef.current;
    if (!head || !wrap) return;
    let detachScrollY = null;
    const onScroll = () => {
      const cards = wrap.querySelectorAll(".xform");
      if (!cards.length) return;
      const last = cards[cards.length - 1];
      const stickTop = 360 + (cards.length - 1) * 14; // mirrors CSS top calc
      const stacked = last.getBoundingClientRect().top <= stickTop + 2;
      if (stacked) {
        if (detachScrollY === null) detachScrollY = window.scrollY;
        const delta = window.scrollY - detachScrollY;
        head.style.transform = `translateY(${-delta}px)`;
      } else {
        detachScrollY = null;
        head.style.transform = "";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="xforms">
      <div className="container">
        <div className="section__head" ref={headRef}>
          <span className="section__eyebrow">Проблемы → решения</span>
          <h2>Какие задачи мы помогаем <em>решать каждый день</em></h2>
          <p className="section__sub">
            Каждый день инженеры и операторы тратят часы на рутину, которую Sensei
            выполняет за минуты — в рамках вашего регламента, под вашим аудитом.
          </p>
        </div>
        <div className="xforms" ref={cardsRef}>
          {XFORMS.map((x, i) =>
          <article key={x.num} className="xform" style={{ "--i": i, borderWidth: "1px 1px 1px 0px", width: "700px", padding: "32px 32px 28px" }}>
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
          )}
        </div>
      </div>
    </section>);

}
Object.assign(window, { Transformations });
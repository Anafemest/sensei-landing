// Pain stack — sticky cards, the topmost one auto-activates as the user scrolls.

function Pains() {
  const refs = React.useRef([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      // Whichever card's top edge is closest to (but past) 120px from top.
      const y = 140;
      let best = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= y) best = i;
      });
      setActive(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section section--alt" id="pains">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
          <p className="section-label" style={{ justifyContent: "center" }}>
            Проблемы и решения
          </p>
          <h2>
            Какие задачи мы помогаем <span style={{ color: "var(--primary)" }}>решать каждый день</span>
          </h2>
          <p style={{ fontSize: "1.05rem" }}>
            Каждый день инженеры и операторы тратят часы на рутину, которую
            ИИ-сотрудник выполняет за минуты.
          </p>
        </div>

        <div className="pain-stack">
          {painPoints.map((p, i) => (
            <article
              key={p.num}
              ref={(el) => (refs.current[i] = el)}
              className={`pain-stack-card${i === active ? " is-active" : ""}`}
            >
              <div className="pain-stack-card__head">
                <div className="pain-tile__num">{p.num}</div>
                <h3 className="pain-stack-card__title">{p.label}</h3>
              </div>
              <p className="pain-stack-card__desc">{p.description}</p>
              <div className="pain-kpi">
                <div className="pain-kpi__part">
                  <span className="pain-kpi__label">Боль</span>
                  <span className="pain-kpi__before">{p.before}</span>
                </div>
                <span className="pain-kpi__arrow">→</span>
                <div className="pain-kpi__part pain-kpi__part--solution">
                  <span className="pain-kpi__label">Решение</span>
                  <span className="pain-kpi__after">{p.after}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pains });

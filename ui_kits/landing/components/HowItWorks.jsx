// How-it-works timeline — 4 steps, click a step to make it active.

function HowItWorks() {
  const [active, setActive] = React.useState(0);
  return (
    <section className="section section--alt" id="how-it-works">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 60px" }}>
          <p className="section-label" style={{ justifyContent: "center" }}>
            Как это работает
          </p>
          <h2>
            Просто. Быстро. <span style={{ color: "var(--primary)" }}>Безопасно.</span>
          </h2>
          <p style={{ fontSize: "1.05rem" }}>Четыре шага от задачи до результата.</p>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="timeline">
            <div className="timeline__rail">
              {howItWorks.map((it, idx) => (
                <React.Fragment key={it.step}>
                  {idx > 0 && <div className="timeline__line" />}
                  <div className={`timeline__dot${idx === active ? " active" : ""}`}>
                    {it.step}
                  </div>
                </React.Fragment>
              ))}
              <div className="timeline__line" />
            </div>
            <div className="timeline__steps">
              {howItWorks.map((it, idx) => (
                <div
                  key={it.step}
                  className={`timeline__step${idx === active ? " active" : ""}`}
                  onClick={() => setActive(idx)}
                >
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  {it.chips && (
                    <div className="timeline__chips">
                      {it.chips.map((c) => (
                        <span key={c} className="chip">{c}</span>
                      ))}
                    </div>
                  )}
                  {it.security && (
                    <div className="security-panel">
                      <p>100% данных остаётся внутри вашей инфраструктуры</p>
                    </div>
                  )}
                  {it.cta && (
                    <div style={{ marginTop: 16 }}>
                      <a className="btn btn--ghost" href="#scenarios">
                        Смотреть сценарии <IconArrowRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks });

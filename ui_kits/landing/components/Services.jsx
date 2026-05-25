// Services — 5 cards + 1 featured "Sensei." brand tile, plus dark callout below.

function Services() {
  return (
    <section className="section section--warm" id="services">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 24,
            alignItems: "start",
            marginBottom: 34,
          }}
        >
          <h2>
            Экспертиза в автоматизации <span style={{ color: "var(--primary)" }}>телеком-процессов</span>
          </h2>
          <p style={{ marginTop: 10 }}>
            Мы создаём ИИ-инструменты, которые работают как штатные сотрудники —
            подключаются к вашим системам и решают задачи по регламентам.
          </p>
        </div>

        <div className="services-grid">
          {serviceCards.map((card, i) => {
            const Ico = card.Icon;
            return (
              <article key={i} className="service-card">
                <div className="service-icon">
                  <Ico />
                </div>
                <p className="service-card__title">{card.title}</p>
                <p>{card.desc}</p>
              </article>
            );
          })}
          <article className="service-card featured">
            <p className="brand-big">Sensei<span style={{color:"#fff"}}>.</span></p>
            <p style={{ color: "#e0d4ff", fontSize: "1.1rem" }}>
              Единый ИИ-сотрудник<br />для всех процессов
            </p>
          </article>
        </div>

        <div className="callout-dark">
          <div className="callout-dark__grid">
            <div>
              <h3>
                <span style={{ color: "var(--accent-light)" }}>Sensei</span> — платформа нового поколения
              </h3>
              <p className="callout-dark__lead">
                Мессенджеры и тикет-системы становятся основным интерфейсом
                между бизнесом и ИИ-сотрудником.
              </p>
            </div>
            <div className="callout-dark__panel">
              <p>
                Sensei открывает <span style={{ color: "var(--primary)" }}>новые возможности</span>
              </p>
              <ul>
                <li>автоматизация рутинных задач</li>
                <li>работа внутри защищённого контура</li>
                <li>интеграция с любыми внутренними системами</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services });

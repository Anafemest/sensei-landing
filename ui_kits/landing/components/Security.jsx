// Security — 3 "designer" tiles, white embossed cards on the lilac alt bg.

function Security() {
  return (
    <section className="section section--alt" id="security">
      <div className="container">
        <div className="security-head">
          <p className="section-label" style={{ justifyContent: "center" }}>
            Безопасность
          </p>
          <h2>
            Безопасность и <span style={{ color: "var(--primary)" }}>конфиденциальность</span>
          </h2>
        </div>
        <div className="security-row">
          {securityCards.map((card, i) => {
            const Ico = card.Icon;
            return (
              <div key={i} className="security-tile">
                <span className="security-tile__num">{`S-0${i + 1}`}</span>
                <div className="security-tile__icon"><Ico /></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Security });

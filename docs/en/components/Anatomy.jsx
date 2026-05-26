// Anatomy section — English version.

function Anatomy() {
  const nodes = [
    { label: "CRM",      ratio: 0.46, angle: 200 },
    { label: "OSS/BSS",  ratio: 0.46, angle:  20 },
    { label: "NMS",      ratio: 0.46, angle: 290 },
    { label: "NetBox",   ratio: 0.46, angle: 110 },
    { label: "Jira",     ratio: 0.78, angle:  65, brand: { bg: "#fff", logo: "../assets/logos/jira.svg" } },
    { label: "Telegram", ratio: 0.78, angle: 155, brand: { bg: "#fff", logo: "../assets/logos/telegram.svg" } },
    { label: "Trello",   ratio: 0.78, angle: 245, brand: { bg: "#fff", logo: "../assets/logos/trello.svg" } },
    { label: "Miro",     ratio: 0.78, angle: 335, brand: { bg: "#fff", logo: "../assets/logos/miro.svg" } },
  ];

  const center = 360;
  return (
    <section className="section" id="what-is">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Platform Architecture</span>
          <h2>One <em>agent</em> between your business and all your systems</h2>
          <p className="section__sub">
            Sensei lives inside the company's secure perimeter. Accepts tasks via familiar
            channels, accesses internal systems, and returns ready results.
            Nothing leaves the perimeter.
          </p>
        </div>

        <div className="anatomy">
          <div className="anatomy__diagram">
            <div className="anatomy__rings">
              <div className="anatomy__ring anatomy__ring--perimeter" />
              <div className="anatomy__ring anatomy__ring--outer" />
              <div className="anatomy__ring anatomy__ring--mid" />
              <div className="anatomy__ring anatomy__ring--inner" />
            </div>
            <span className="anatomy__perimeter-label">company perimeter</span>
            <div className="anatomy__core"><span>Sensei.</span></div>

            {[{ ratio: 0.46, mod: "inner" }, { ratio: 0.78, mod: "outer" }].map(({ ratio, mod }) => (
              <div key={mod} className={`anatomy__orbit anatomy__orbit--${mod}`}>
                {nodes.filter(n => n.ratio === ratio).map(({ label, angle, brand }) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = ratio * center;
                  const x = r * Math.cos(rad);
                  const y = r * Math.sin(rad);
                  return (
                    <div key={label} className={`anatomy__node${brand ? " anatomy__node--brand" : ""}`}
                         style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}>
                      {brand && (
                        <span className="anatomy__node-icon" style={{ background: brand.bg }}>
                          <img src={brand.logo} alt={label} width="18" height="18"
                               style={{ display: "block", objectFit: "contain" }} />
                        </span>
                      )}
                      <span className="anatomy__node-label">{label}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Anatomy });

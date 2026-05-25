// Anatomy section — the perimeter diagram with Sensei at the core
// and connected systems orbiting around. The whole thing renders with CSS positions.

// Tiny paper-plane glyph used for Telegram — iconic enough on its own.
function PaperPlane() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path d="M21 3 2 11l7 2 2 7 4-5 5 4 1-16Z" fill="#fff" />
    </svg>
  );
}

function Anatomy() {
  // Inner ring — generic internal system categories.
  // Outer ring — recognizable everyday tools, each rendered with a
  // brand-coloured tile so they're scannable at a glance.
  // node = { label, ratio (0=center, 1=perimeter), angle in deg, brand? }
  const nodes = [
    { label: "CRM",      ratio: 0.46, angle: 200 },
    { label: "OSS/BSS",  ratio: 0.46, angle:  20 },
    { label: "NMS",      ratio: 0.46, angle: 290 },
    { label: "NetBox",   ratio: 0.46, angle: 110 },

    { label: "Jira",     ratio: 0.78, angle:  65,
      brand: { bg: "#2684FF", fg: "#fff", glyph: "J" } },
    { label: "Telegram", ratio: 0.78, angle: 155,
      brand: { bg: "#26A5E4", fg: "#fff", glyph: <PaperPlane /> } },
    { label: "Trello",   ratio: 0.78, angle: 245,
      brand: { bg: "#0052CC", fg: "#fff", glyph: "T" } },
    { label: "Miro",     ratio: 0.78, angle: 335,
      brand: { bg: "#FFD02F", fg: "#050038", glyph: "M" } },
  ];

  // The diagram is rendered inside a 720×720 conceptual box.
  // anatomy__core is at center; we place nodes on a circle of radius (ratio × 360).
  const center = 360;
  return (
    <section className="section" id="what-is">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Анатомия платформы</span>
          <h2>
            Один <em>агент</em> между бизнесом и всеми вашими системами
          </h2>
          <p className="section__sub">
            Sensei живёт внутри защищённого периметра компании. Принимает задачи через
            привычные каналы, ходит во внутренние системы и возвращает готовый результат.
            Ничего не покидает контур.
          </p>
        </div>

        <div className="anatomy">
          <div className="anatomy__rings">
            <div className="anatomy__ring anatomy__ring--perimeter">
              <span className="anatomy__perimeter-label">контур компании</span>
            </div>
            <div className="anatomy__ring anatomy__ring--outer" />
            <div className="anatomy__ring anatomy__ring--mid" />
            <div className="anatomy__ring anatomy__ring--inner" />
          </div>
          <div className="anatomy__core"><span>Sensei.</span></div>

          {/* Two rotating orbit containers — one per ring. Nodes are positioned
              relative to centre; the container spins; each node counter-rotates
              so the label stays upright. */}
          {[
            { ratio: 0.46, mod: "inner" },
            { ratio: 0.78, mod: "outer" },
          ].map(({ ratio, mod }) => (
            <div key={mod} className={`anatomy__orbit anatomy__orbit--${mod}`}>
              {nodes.filter(n => n.ratio === ratio).map(({ label, angle, brand }) => {
                const rad = (angle * Math.PI) / 180;
                const r = ratio * center;
                const x = r * Math.cos(rad);
                const y = r * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className={`anatomy__node${brand ? " anatomy__node--brand" : ""}`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top:  `calc(50% + ${y}px)`,
                    }}
                  >
                    {brand && (
                      <span
                        className="anatomy__node-icon"
                        style={{ background: brand.bg, color: brand.fg }}
                      >
                        {brand.glyph}
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
    </section>
  );
}
Object.assign(window, { Anatomy });

// Anatomy section — the perimeter diagram with Sensei at the core
// and connected systems orbiting around. The whole thing renders with CSS positions.

function Anatomy() {
  // node label, distance ratio (0=center, 1=perimeter), angle in degrees
  const nodes = [
  ["CRM", 0.46, 200],
  ["OSS/BSS", 0.46, 20],
  ["NMS", 0.46, 290],
  ["NetBox", 0.46, 110],
  ["Биллинг", 0.78, 245],
  ["Тикет-система", 0.78, 65],
  ["Мессенджер", 0.78, 155],
  ["Сервис-деск", 0.78, 335]];


  // The diagram is rendered inside a 720×720 conceptual box.
  // anatomy__core is at center; we place nodes on a circle of radius (ratio × 360).
  const center = 360;
  return (
    <section className="section" id="anatomy">
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
              <span className="anatomy__perimeter-label">КОНТУР КОМПАНИИ</span>
            </div>
            <div className="anatomy__ring anatomy__ring--outer" />
            <div className="anatomy__ring anatomy__ring--mid" />
            <div className="anatomy__ring anatomy__ring--inner" />
          </div>
          <div className="anatomy__core"><span>Sensei.</span></div>
          {nodes.map(([label, ratio, deg], i) => {
            const rad = deg * Math.PI / 180;
            const r = ratio * center;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            return (
              <div
                key={i}
                className="anatomy__node"
                style={{
                  left: `calc(50% + ${x - center}px)`,
                  top: `calc(50% + ${y - center}px)`
                }}>
                
                {label}
              </div>);

          })}
        </div>
      </div>
    </section>);

}
Object.assign(window, { Anatomy });
// Industries — split section with a dark purple panel of clickable tags.

function Industries() {
  return (
    <section className="section section--alt" id="industries">
      <div className="container">
        <div className="industries-split">
          <div className="industries-split__left">
            <h2>
              Работаем с <span style={{ color: "var(--primary)" }}>разными индустриями</span>
            </h2>
            <p style={{ fontSize: "1.1rem", maxWidth: 510, lineHeight: 1.7 }}>
              Мы разрабатываем решения для компаний с регламентированными процессами,
              которые хотят автоматизировать рутину.
            </p>
            <div className="industries-split__divider" />
            <p style={{
              margin: 0,
              maxWidth: 490,
              fontSize: "clamp(1.6rem,3vw,2.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "var(--ink)",
            }}>
              Телеком — <span style={{ color: "var(--primary)" }}>главный фокус</span>,
              но подход масштабируется на любую отрасль.
            </p>
          </div>
          <div className="industries-split__panel">
            <h3>Отрасли, с которыми мы работаем</h3>
            <div className="tags">
              {industries.map((it) => (
                <a key={it.slug} href={`#${it.slug}`}>
                  <span>{it.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Industries });

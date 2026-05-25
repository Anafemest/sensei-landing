// Hero — dark purple-gradient, headline + metrics + decorative orb.
// Orb stands in for the production Three.js scene.

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" />
      <div className="hero__top">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>
              Платформа Sensei
            </p>
            <h1>
              Виртуальный сотрудник
              <br />
              <span style={{ color: "#b78aff" }}>внутри контура</span> компании
            </h1>
            <p style={{
              fontSize: "1.15rem",
              maxWidth: 540,
              lineHeight: 1.7,
              color: "rgba(243,245,255,0.8)",
            }}>
              Решаем реальные задачи телекома за минуты, а не дни. ИИ-сотрудник
              подключается к CRM, OSS/BSS, NMS и биллингу, работает внутри защищённого контура.
            </p>
            <div className="actions">
              <a className="btn btn--primary btn--large" href="#form">
                Записаться на демо <IconArrowRight size={16} />
              </a>
              <a className="btn btn--secondary btn--large" href="#how-it-works">
                Как это работает
              </a>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__scene">
              <div className="hero__orb" />
            </div>
            <div className="hero-metrics">
              <div className="hero-metric">
                <div className="hero-metric__value">
                  2-3 дня <span className="accent-num">→ 10 мин</span>
                </div>
                <div className="hero-metric__label">Скорость обработки</div>
              </div>
              <div className="hero-metric">
                <div className="hero-metric__value">
                  <span className="accent-num">Сотни часов</span>/мес
                </div>
                <div className="hero-metric__label">Экономия на рутине</div>
              </div>
              <div className="hero-metric">
                <div className="hero-metric__value">
                  <span className="accent-num">100%</span> внутри
                </div>
                <div className="hero-metric__label">Вашей инфраструктуры</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSummary() {
  return (
    <section className="hero-summary">
      <div className="container">
        <div className="hero__bottom">
          <div className="hero-info hero-info--main">
            <p>
              Создаём ИИ-инструменты, которые работают как штатные сотрудники
              внутри ваших систем
            </p>
            <a className="btn btn--primary" href="#form">Обсудить проект</a>
          </div>
          <div className="hero-info hero-info--note">
            <p className="hero-info__title">
              Одна из ключевых задач бизнеса — автоматизация рутины без потери контроля
            </p>
            <p>
              Мы разрабатываем решения, которые помогают компаниям ускорять процессы,
              сохраняя данные внутри контура.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, HeroSummary });

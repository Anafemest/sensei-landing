// Bridge — "was" vs "now with Sensei", connected by a vertical arrow.

function Bridge() {
  return (
    <section className="section section--warm">
      <div className="container">
        <div className="bridge-grid">
          <div className="bridge-col bridge-col--before">
            <p className="section-label">Было</p>
            <h3 style={{ color: "var(--faint)" }}>
              Ручной сбор данных из 8 систем, часы ожидания, потеря контекста
            </h3>
            <p style={{ fontSize: 14 }}>
              Инженеры переключаются между окнами, копируют данные вручную,
              результат возвращают в тикет с задержкой.
            </p>
          </div>
          <div className="bridge-line">
            <span className="bridge-line__dot" />
            <span className="bridge-line__arrow">→</span>
          </div>
          <div className="bridge-col bridge-col--after">
            <p className="section-label">Стало с Sensei</p>
            <h3>Автоматический сбор, анализ и результат за минуты</h3>
            <p style={{ fontSize: 14 }}>
              Sensei подключается к системам, собирает контекст, проверяет регламенты
              и возвращает готовый результат.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Bridge });

// Lead form (the dark demo footer).
// Fake submit — shows a success state after a short delay.

function LeadForm() {
  const [sent, setSent] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="form" className="demo-footer">
      <div className="container demo-footer__content">
        <div>
          <p className="section-label" style={{ color: "rgba(255,255,255,0.75)" }}>
            Начать работу
          </p>
          <h2 style={{ marginBottom: 16, color: "#fff" }}>
            Запросить демонстрацию
          </h2>
          <p style={{
            fontSize: "1.08rem",
            maxWidth: 500,
            lineHeight: 1.75,
            color: "rgba(233,236,255,0.9)",
          }}>
            Оставьте контакты — мы подготовим сценарий внедрения под ваши процессы
            и покажем, как Sensei решает задачи вашего бизнеса.
          </p>
          <div className={`form-success${sent ? " show" : ""}`}>
            <strong>Спасибо!</strong> Мы получили заявку и свяжемся с вами в
            ближайшее время.
          </div>
          <div className="demo-footer__benefits">
            <Benefit
              icon={<IconLock />}
              title="On-premise, без выноса данных"
              sub="Данные остаются в вашем контуре"
            />
            <Benefit
              icon={<IconZap />}
              title="Пилот за 2-4 недели"
              sub="Быстрый запуск на первом процессе"
            />
            <Benefit
              icon={<IconTrend />}
              title="Измеримый результат"
              sub="Эффект виден с первого процесса"
            />
          </div>
        </div>

        <div className="panel demo-footer__panel">
          <form className="lead-form" onSubmit={onSubmit}>
            <label>
              <span>Имя</span>
              <input type="text" name="name" required placeholder="Как вас зовут?" />
            </label>
            <label>
              <span>Компания</span>
              <input type="text" name="company" required placeholder="Название компании" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required placeholder="work@company.com" />
            </label>
            <label>
              <span>Телефон</span>
              <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" />
            </label>
            <label>
              <span>Какую задачу хотите решить?</span>
              <textarea name="usecase" rows={3} required placeholder="Опишите процесс или задачу..." />
            </label>
            <button className="btn btn--primary btn--large" type="submit"
                    style={{ width: "100%", marginTop: 8 }}>
              Отправить заявку
            </button>
            <p className="muted-sm" style={{ textAlign: "center" }}>
              Отправляя форму, вы соглашаетесь с{" "}
              <a href="#privacy" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                политикой конфиденциальности
              </a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon, title, sub }) {
  return (
    <div className="demo-benefit">
      <div className="demo-benefit__icon" style={{ color: "var(--accent-blue)" }}>
        {icon}
      </div>
      <div>
        <p>{title}</p>
        <small>{sub}</small>
      </div>
    </div>
  );
}

Object.assign(window, { LeadForm });

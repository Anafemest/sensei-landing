// Final CTA + lead form block.

const WEBHOOK_URL = "https://robot.icerock.dev/webhook/73704b14-4228-46b7-93ce-94317856a02b";

function CTA() {
  const [sent, setSent]       = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const [name, setName]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [task, setTask]       = React.useState("");
  const [phone, setPhone]     = React.useState("");

  // Pre-fill task from block 05 (CustomTaskCard) — via localStorage on mount
  // and via custom event for real-time sync while user is still on the page.
  React.useEffect(() => {
    const saved = localStorage.getItem("sensei_custom_task");
    if (saved) setTask(saved);

    const onTaskChange = (e) => setTask(e.detail);
    window.addEventListener("sensei-task-change", onTaskChange);
    return () => window.removeEventListener("sensei-task-change", onTaskChange);
  }, []);

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (!digitsOnly) { setPhone(""); return; }
    let d = digitsOnly.startsWith('8') ? '7' + digitsOnly.slice(1)
          : digitsOnly.startsWith('7') ? digitsOnly
          : '7' + digitsOnly;
    let fmt = '+' + d;
    if (d.length >= 2) fmt = '+' + d[0] + ' (' + d.slice(1, 4);
    if (d.length >= 5) fmt += ') ' + d.slice(4, 7);
    if (d.length >= 8) fmt += '-' + d.slice(7, 9);
    if (d.length >= 10) fmt += '-' + d.slice(9, 11);
    setPhone(fmt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrored(false);

    const now = new Date().toISOString();
    const payload = {
      form: {
        name,
        email,
        phone,
        task: task || "",
      },
      page: {
        url:       window.location.href,
        pathname:  window.location.pathname,
        title:     document.title,
        timestamp: now,
      },
      referrer: {
        value:    document.referrer || "",
        hostname: (() => {
          try { return document.referrer ? new URL(document.referrer).hostname : ""; }
          catch { return ""; }
        })(),
      },
      technical: {
        submittedAt: now,
        timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent:   navigator.userAgent,
        language:    navigator.language,
        screen:   { width: screen.width,      height: screen.height },
        viewport: { width: window.innerWidth, height: window.innerHeight },
      },
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setErrored(true);
      }
    } catch {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cta" id="form">
      <div className="container">
        <div className="cta__shell">
          <div className="cta__grid">
            <div>
              <span className="hero__eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>
                Начать работу
              </span>
              <h2>Запросить демонстрацию</h2>
              <p className="cta__lead">
                Оставьте контакты — мы подготовим сценарий внедрения под ваши процессы
                и покажем, как Sensei решает задачи вашего бизнеса.
              </p>
              <div className="cta__benefits">
                <Benefit icon={<ILock />} title="On-premise, без выноса данных"
                         sub="Данные остаются в вашем контуре" />
                <Benefit icon={<IZap />}  title="Пилот за 2-4 недели"
                         sub="Быстрый запуск на первом процессе" />
                <Benefit icon={<ITrend />} title="Измеримый результат"
                         sub="Эффект виден с первого процесса" />
              </div>
            </div>

            <div className="form-panel">
              <div className={`form-panel__success${sent ? " show" : ""}`}>
                <b>Спасибо!</b> Заявка получена, свяжемся с вами в ближайшее время.
              </div>
              <form onSubmit={handleSubmit}>
                <label><span>Имя</span>
                  <input required type="text" placeholder="Как вас зовут?"
                    value={name} onChange={e => setName(e.target.value)} /></label>
                <label><span>Email</span>
                  <input required type="email" placeholder="work@company.com"
                    value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label><span>Телефон</span>
                  <input required type="tel" placeholder="+7 (___) ___-__-__"
                    value={phone} onChange={handlePhoneChange} /></label>
                <label><span>Ваша задача <em style={{fontStyle:"normal",opacity:.55,fontWeight:400}}>— необязательно</em></span>
                  <textarea
                    placeholder="Опишите процесс, который хотите автоматизировать"
                    rows={3}
                    value={task}
                    onChange={e => setTask(e.target.value)}
                  /></label>
                <p className="form-panel__promise">
                  Позвоним в течение часа, подготовим сценарий под ваш процесс.
                </p>
                {errored && (
                  <p style={{color:"#e05",fontSize:"13px",margin:"-4px 0 8px"}}>
                    Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.
                  </p>
                )}
                <button className="form-panel__submit" type="submit" disabled={loading}>
                  {loading ? "Отправляем…" : "Отправить заявку"}
                </button>
                <p className="form-panel__fineprint">
                  Отправляя форму, вы соглашаетесь с{" "}
                  <a href="privacy/index.html">политикой конфиденциальности</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon, title, sub }) {
  return (
    <div className="cta__benefit">
      <div className="cta__benefit-icon">{icon}</div>
      <div>
        <p>{title}</p>
        <small>{sub}</small>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand"><Brand size={24} /></div>
            <p className="footer__about">
              Виртуальный сотрудник на базе ИИ для автоматизации процессов
              внутри защищённого контура компании.
            </p>
          </div>
          <div className="footer__col">
            <p className="footer__title">Продукт</p>
            <a href="#xforms">Решения</a>
            <a href="#what-is">Платформа</a>
            <a href="#how-it-works">Как работает</a>
            <a href="#case-studies">Кейсы</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Компания</p>
            <a href="#faq">FAQ</a>
            <a href="#team">Команда</a>
            <a href="#testimonials">Отзывы</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Контакты</p>
            <a href="#form">Связаться через форму</a>
            <div className="footer__contact-group footer__contact-group--inline">
              <span className="footer__contact-label">Написать нам:</span>
              <a href="mailto:hello@sensei.works" className="footer__contact-link">hello@sensei.works</a>
            </div>
            <div className="footer__contact-group footer__contact-group--inline">
              <span className="footer__contact-label">Позвонить нам:</span>
              <div className="footer__phones">
                <a href="tel:+79139072017" className="footer__contact-link">+7 (913) 907 2017</a>
                <a href="tel:+79266298201" className="footer__contact-link">+7 (926) 629 8201</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Sensei. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { CTA, Footer });

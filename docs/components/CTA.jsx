// Final CTA + lead form block.

function CTA() {
  const [sent, setSent] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digit characters except + at the start
    const digitsOnly = value.replace(/\D/g, '');
    
    if (!digitsOnly) {
      setPhone("");
      return;
    }
    
    // If user started with 8, replace with 7 (for Russian numbers)
    let normalizedDigits = digitsOnly;
    if (digitsOnly.startsWith('8')) {
      normalizedDigits = '7' + digitsOnly.slice(1);
    } else if (digitsOnly.startsWith('7')) {
      normalizedDigits = digitsOnly;
    } else {
      // User typing just digits (9XXXXXXXXXX) - prepend 7
      normalizedDigits = '7' + digitsOnly;
    }
    
    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '+' + normalizedDigits;
    if (normalizedDigits.length >= 2) {
      formatted = '+' + normalizedDigits.slice(0, 1) + ' (' + normalizedDigits.slice(1, 4);
    }
    if (normalizedDigits.length >= 5) {
      formatted += ') ' + normalizedDigits.slice(4, 7);
    }
    if (normalizedDigits.length >= 8) {
      formatted += '-' + normalizedDigits.slice(7, 9);
    }
    if (normalizedDigits.length >= 10) {
      formatted += '-' + normalizedDigits.slice(9, 11);
    }
    
    setPhone(formatted);
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
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label><span>Имя</span>
                  <input required type="text" placeholder="Как вас зовут?" /></label>
                <label><span>Email</span>
                  <input required type="email" placeholder="work@company.com" /></label>
                <label><span>Телефон</span>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+7 (___) ___-__-__" 
                    value={phone}
                    onChange={handlePhoneChange}
                  /></label>
                <p className="form-panel__promise">
                  Позвоним в течение часа, подготовим сценарий под ваш процесс.
                </p>
                <button className="form-panel__submit" type="submit">
                  Отправить заявку
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
            <a href="#flow">Как работает</a>
            <a href="#anatomy">Платформа</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Компания</p>
            <a href="#industries">Кейсы</a>
            <a href="#security">Безопасность</a>
            <a href="privacy/index.html">Политика конфиденциальности</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Контакты</p>
            <a href="#form">Связаться через форму</a>
            <div className="footer__contact-group">
              <p className="footer__contact-label">Написать нам</p>
              <a href="mailto:hello@sensei.works" className="footer__contact-link">hello@sensei.works</a>
            </div>
            <div className="footer__contact-group">
              <p className="footer__contact-label">Позвонить нам</p>
              <a href="tel:+79139072017" className="footer__contact-link">+7 (913) 907 2017</a>
              <a href="tel:+79266298201" className="footer__contact-link footer__contact-link--secondary">+7 (926) 629 8201</a>
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

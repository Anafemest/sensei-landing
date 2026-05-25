// Site footer — dark navy block at the bottom.

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Sensei<span>.</span></div>
            <p style={{
              maxWidth: 360,
              fontSize: 14,
              color: "rgba(216,221,239,0.7)",
              lineHeight: 1.7,
            }}>
              Виртуальный сотрудник на базе ИИ для автоматизации процессов
              внутри защищённого контура компании.
            </p>
          </div>
          <FooterCol title="Продукт" links={[
            ["Решения",     "#pains"],
            ["Как работает","#how-it-works"],
            ["Сценарии",    "#scenarios"],
            ["Кейсы",       "#cases"],
            ["Отрасли",     "#industries"],
          ]} />
          <FooterCol title="Компания" links={[
            ["Политика конфиденциальности", "#privacy"],
          ]} />
          <FooterCol title="Контакт" links={[
            ["Свяжитесь через форму", "#form"],
          ]} />
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sensei. Все права защищены.</p>
          <p>Разработано в России</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="footer-col">
      <p className="footer-col__title">{title}</p>
      {links.map(([label, href]) => (
        <a key={href} href={href}>{label}</a>
      ))}
    </div>
  );
}

Object.assign(window, { SiteFooter });

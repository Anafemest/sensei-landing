// Site header with mobile menu + scroll-shrink behavior.

function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Для кого",     "#audience"],
    ["Решения",      "#pains"],
    ["Безопасность", "#security"],
    ["Как работает", "#how-it-works"],
    ["Сценарии",     "#scenarios"],
    ["Кейсы",        "#cases"],
    ["Направления",  "#industries"],
    ["Демо",         "#form"],
  ];

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="brand" href="#top">Sensei<span>.</span></a>
        <nav className="site-nav" aria-label="Основная навигация">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <a className="btn btn--primary" href="#form">Обсудить проект</a>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { SiteHeader });

// Top nav — sticky capsule with hamburger menu for mobile.

function Nav() {
  const [activeSection, setActiveSection] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Highlight active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["xforms", "what-is", "how-it-works", "faq", "case-studies", "team", "testimonials", "form"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) current = section;
      }
      if (current === "form") current = "";
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveSection(hash);
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on outside click
  React.useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (!e.target.closest(".nav")) setMenuOpen(false);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const links = [
    ["Решения",       "#xforms"],
    ["Платформа",     "#what-is"],
    ["Как работает",  "#how-it-works"],
    ["FAQ",           "#faq"],
    ["Кейсы",         "#case-studies"],
    ["Команда",       "#team"],
    ["Отзывы",        "#testimonials"],
  ];

  return (
    <header className="nav">
      <a className="nav__brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); close(); }}>
        <Brand size={36} />
      </a>

      {/* Desktop links */}
      <nav className="nav__links">
        {links.map(([l, h]) => (
          <a key={h} href={h} className={activeSection === h.slice(1) ? "is-active" : ""}>{l}</a>
        ))}
      </nav>

      {/* Desktop contacts + CTA */}
      <div className="nav__contacts">
        <a href="tel:+79139072017" className="nav__contact-icon" title="Позвонить"><IPhone size={20} /></a>
        <a href="mailto:hello@sensei.works" className="nav__contact-icon" title="Написать письмо"><IMail size={20} /></a>
      </div>
      <a className="nav__cta" href="#form">Записаться на демо <IArrow size={14} /></a>

      {/* Mobile: hamburger button */}
      <button
        className="nav__burger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Mobile drawer */}
      <div className={`nav__drawer${menuOpen ? " nav__drawer--open" : ""}`} aria-hidden={!menuOpen}>
        {links.map(([l, h]) => (
          <a
            key={h} href={h}
            className={`nav__drawer-link${activeSection === h.slice(1) ? " is-active" : ""}`}
            onClick={close}
          >{l}</a>
        ))}
        <div className="nav__drawer-bottom">
          <div className="nav__drawer-contacts">
            <a href="tel:+79139072017" className="nav__contact-icon" title="Позвонить" onClick={close}>
              <IPhone size={20} />
            </a>
            <a href="mailto:hello@sensei.works" className="nav__contact-icon" title="Написать письмо" onClick={close}>
              <IMail size={20} />
            </a>
          </div>
          <a className="nav__drawer-cta" href="#form" onClick={close}>
            Записаться на демо <IArrow size={14} />
          </a>
        </div>
        <a className="nav__drawer-privacy" href="privacy/" onClick={close}>
          Политика конфиденциальности
        </a>
      </div>
    </header>
  );
}
Object.assign(window, { Nav });

// Top nav — sticky capsule.

function Nav() {
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["xforms", "what-is", "how-it-works", "faq", "case-studies", "team", "testimonials", "form"];
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Активируем секцию, если она начинается выше viewport центра
          if (rect.top <= 100) {
            current = section;
          }
        }
      }

      // #form не является пунктом меню — гасим подсветку
      if (current === "form") current = "";
      setActiveSection(current); // всегда обновляем, в т.ч. сброс в ""
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveSection(hash);
    });
    
    handleScroll(); // Вызовем при загрузке
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <a className="nav__brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Brand size={36} /></a>
      <nav className="nav__links">
        {links.map(([l, h]) => (
          <a 
            key={h} 
            href={h} 
            className={activeSection === h.slice(1) ? "is-active" : ""}
          >
            {l}
          </a>
        ))}
      </nav>
      <div className="nav__contacts">
        <a href="tel:+79139072017" className="nav__contact-icon" title="Позвонить">
          <IPhone size={20} />
        </a>
        <a href="mailto:hello@sensei.works" className="nav__contact-icon" title="Написать письмо">
          <IMail size={20} />
        </a>
      </div>
      <a className="nav__cta" href="#form">Записаться на демо <IArrow size={14} /></a>
    </header>
  );
}
Object.assign(window, { Nav });

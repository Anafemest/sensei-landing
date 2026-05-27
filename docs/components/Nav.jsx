// Top nav — sticky capsule with hamburger menu for mobile.

function Nav() {
  const [activeSection, setActiveSection] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Set to true while scrollToFaq() is in flight so handleScroll doesn't
  // override the active state before Flow.jsx has repositioned .flow-security.
  const pendingFaq = React.useRef(false);

  React.useEffect(() => {
    // THRESHOLD must be > scroll-margin-top of #faq (130px).
    const THRESHOLD    = 140;
    const STEP_BUDGET  = 280;             // matches Flow.jsx
    const TOTAL_BUDGET = 4 * STEP_BUDGET; // 1120px

    const handleScroll = () => {
      // While scrollToFaq() is still animating, keep FAQ highlighted.
      // The rAF loop in scrollToFaq releases this flag once Flow.jsx
      // has switched .flow-security to absolute and #faq is truly at top.
      if (pendingFaq.current) { setActiveSection("faq"); return; }

      const sections = ["xforms", "what-is", "how-it-works", "faq",
                        "case-studies", "team", "testimonials", "form"];
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        if (section === "faq") {
          // When into >= TOTAL_BUDGET, Flow has set .flow-security to absolute,
          // so el.getBoundingClientRect().top is the real viewport position.
          // While pendingFaq is true, handleScroll returns early (above) so we
          // never check here during the race-condition window.
          const outer = document.getElementById("how-it-works");
          if (outer) {
            const into = -outer.getBoundingClientRect().top;
            if (into >= TOTAL_BUDGET && el.getBoundingClientRect().top <= THRESHOLD) {
              current = section;
            }
          }
          continue;
        }

        if (el.getBoundingClientRect().top <= THRESHOLD) current = section;
      }

      if (current === "form") current = "";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Scroll to #faq, bypassing native anchor navigation.
  // When .flow-security is position:fixed the browser computes the wrong
  // scroll target (viewport pos + scrollY), overshooting by ~scrollY px.
  // We compute the real document position and use window.scrollTo().
  const scrollToFaq = (e) => {
    e.preventDefault();
    close();
    const outer   = document.getElementById("how-it-works");
    const faqEl   = document.getElementById("faq");
    const frameEl = outer ? outer.querySelector(".flow-sticky-frame") : null;
    const sec     = outer ? outer.querySelector(".flow-security")     : null;
    if (!outer || !faqEl || !frameEl || !sec) {
      faqEl && faqEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const TOTAL_BUDGET = 4 * 280;
    // faqInSec: offset of #faq from top of .flow-security.
    // BCR difference is accurate in both fixed and absolute modes.
    const faqInSec = faqEl.getBoundingClientRect().top - sec.getBoundingClientRect().top;
    const targetY  = outer.offsetTop + TOTAL_BUDGET + frameEl.offsetHeight + faqInSec - 130;

    pendingFaq.current = true;
    setActiveSection("faq");
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });

    // Poll via rAF until the scroll has settled (5 consecutive frames with the
    // same scrollY). No fixed timeout — avoids releasing the lock mid-animation
    // on long backwards scrolls (e.g. Cases/Team → FAQ = 1000-2000px).
    // When another nav link is clicked, pendingFaq is cleared externally and the
    // poll exits on the next frame.
    const THRESHOLD = 140;
    let prevScrollY  = window.scrollY;
    let stableFrames = 0;
    const poll = () => {
      if (!pendingFaq.current) return; // released by another link click
      const currentY = window.scrollY;
      if (currentY === prevScrollY) {
        stableFrames++;
        if (stableFrames >= 5) {
          // Scroll has settled — release lock, always keep FAQ active.
          pendingFaq.current = false;
          setActiveSection("faq");
          return;
        }
      } else {
        prevScrollY  = currentY;
        stableFrames = 0;
      }
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  };

  // Scroll to the form panel and focus the first input ("Имя")
  const scrollToForm = (e) => {
    e.preventDefault();
    close();
    setTimeout(() => {
      const input = document.querySelector('#form .form-panel input');
      if (!input) return;
      const top = input.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => input.focus(), 600);
    }, 150);
  };

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
      <a className="nav__brand" href="#top"
         onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); close(); }}>
        <Brand size={36} />
      </a>

      {/* Desktop links */}
      <nav className="nav__links">
        {links.map(([l, h]) => (
          <a key={h} href={h}
             className={activeSection === h.slice(1) ? "is-active" : ""}
             onClick={h === "#faq" ? scrollToFaq : () => { pendingFaq.current = false; }}
          >{l}</a>
        ))}
      </nav>

      {/* Desktop contacts + CTA */}
      <div className="nav__contacts">
        <a href="tel:+79139072017" className="nav__contact-icon" title="Позвонить"><IPhone size={20} /></a>
        <a href="mailto:hello@sensei.works" className="nav__contact-icon" title="Написать письмо"><IMail size={20} /></a>
      </div>
      <a className="nav__cta" href="#form" onClick={scrollToForm}>Записаться на демо <IArrow size={14} /></a>

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
            onClick={h === "#faq" ? scrollToFaq : () => { pendingFaq.current = false; close(); }}
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
          <a className="nav__drawer-cta" href="#form" onClick={scrollToForm}>
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

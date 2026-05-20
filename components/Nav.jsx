// Top nav — sticky capsule.

function Nav() {
  const links = [
  ["Платформа", "#anatomy"],
  ["Решения", "#xforms"],
  ["Как работает", "#flow"],
  ["Безопасность", "#security"],
  ["Индустрии", "#industries"]];

  return (
    <header className="nav">
      <a className="nav__brand" href="#top"><Brand size={36} /></a>
      <nav className="nav__links">
        {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
      </nav>
      <a className="nav__cta" href="#form">Записаться на демо <IArrow size={14} /></a>
    </header>);

}
Object.assign(window, { Nav });
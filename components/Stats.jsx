// Logos marquee — clients of Sensei.
// Logos hotlinked from the brands' own sites. Marquee loops infinitely.

const LOGOS = [
{ name: "LUBNET", src: "https://www.lubnet.ru/icons/logo3.svg",
  href: "https://www.lubnet.ru/" },
{ name: "ЕСК", src: "assets/logos/esk.svg",
  href: "https://esknet.net/" },
{ name: "SevenSky", src: "assets/logos/sevensky.svg",
  href: "https://www.seven-sky.net/" },
{ name: "FORMULA", src: "https://formula-smart.ru/wp-content/themes/formula/images/formula-logo.svg",
  href: "https://formula-smart.ru/" }];


function Stats() {
  const doubled = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="stats stats--logos">
      <div className="stats__caption">
        Нам доверяют операторы связи
      </div>
      <div className="stats__inner" style={{ width: "1705px", gap: "64px", fontWeight: "100" }}>
        {doubled.map((logo, i) =>
        <a key={i} className="logo" href={logo.href}
        target="_blank" rel="noopener noreferrer">
            <img src={logo.src} alt={logo.name} loading="lazy" />
          </a>
        )}
      </div>
    </div>);

}
Object.assign(window, { Stats });
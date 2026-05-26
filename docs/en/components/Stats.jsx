// Logos marquee — English version.

const LOGOS = [
  { name: "LUBNET",   src: "https://www.lubnet.ru/icons/logo3.svg",   href: "https://www.lubnet.ru/" },
  { name: "ESK",      src: "../assets/logos/esk.svg",                 href: "https://esknet.net/" },
  { name: "SevenSky", src: "../assets/logos/sevensky.svg",            href: "https://www.seven-sky.net/" },
  { name: "FORMULA",  src: "https://formula-smart.ru/wp-content/themes/formula/images/formula-logo.svg",
    href: "https://formula-smart.ru/" },
];

function LogoItem({ logo }) {
  return (
    <a className="logo" href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
      <img src={logo.src} alt={logo.name} loading="lazy"
        onError={(e) => {
          const a = e.currentTarget.parentElement;
          if (a) { a.classList.add("logo--fallback"); a.textContent = logo.name; }
        }}
      />
    </a>
  );
}

function LogoSet() {
  return (
    <div className="stats__set">
      {LOGOS.map((logo, i) => <LogoItem key={i} logo={logo} />)}
    </div>
  );
}

function Stats() {
  return (
    <div className="stats stats--logos">
      <div className="stats__caption">Trusted by telecom operators</div>
      <div className="stats__viewport">
        <div className="stats__track">
          <LogoSet /><LogoSet /><LogoSet /><LogoSet />
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Stats });

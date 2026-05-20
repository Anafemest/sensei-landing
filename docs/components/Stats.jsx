// Logos marquee — clients of Sensei. Seamless infinite scroll via
// three identical sets translated by exactly -100%/3.

const LOGOS = [
  { name: "LUBNET",   src: "https://www.lubnet.ru/icons/logo3.svg",
    href: "https://www.lubnet.ru/" },
  { name: "ЕСК",      src: "https://esknet.net/images/logo.svg",
    href: "https://esknet.net/" },
  { name: "SevenSky", src: "https://gde-luchshe.ru/media/providers/4/logo_d3a2a4c736.webp",
    href: "#" },
  { name: "FORMULA",  src: "https://formula-smart.ru/wp-content/themes/formula/images/formula-logo.svg",
    href: "https://formula-smart.ru/" },
];

function LogoItem({ logo }) {
  return (
    <a className="logo" href={logo.href}
       target="_blank" rel="noopener noreferrer"
       aria-label={logo.name}>
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        onError={(e) => {
          // External image failed — replace the slot with a styled wordmark
          // so its 160×56 footprint and spacing stay consistent.
          const a = e.currentTarget.parentElement;
          if (a) {
            a.classList.add("logo--fallback");
            a.textContent = logo.name;
          }
        }}
      />
    </a>
  );
}

// Each "set" is a complete flex group of all logos with a trailing
// padding-right equal to its internal gap. Stacking N identical sets
// makes the marquee seamless under translateX(-100% / N).
function LogoSet() {
  return (
    <div className="stats__set">
      {LOGOS.map((logo, i) => <LogoItem key={i} logo={logo} />)}
    </div>
  );
}

function Stats() {
  // Four sets — enough copies to fill any viewport with logos at all times.
  // Translate by exactly -100%/4 = one set-width → seamless wrap.
  return (
    <div className="stats stats--logos">
      <div className="stats__caption">
        Нам доверяют операторы связи
      </div>
      <div className="stats__viewport">
        <div className="stats__track">
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Stats });

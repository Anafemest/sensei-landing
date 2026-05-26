// Logos marquee — English version.

const LOGOS = [
  { name: "Eurion",  src: "../assets/logos/Eurion.svg",  href: "#" },
  { name: "TLV",     src: "../assets/logos/tlv.svg",     href: "#" },
  { name: "EuLink",  src: "../assets/logos/EuLink.svg",  href: "#" },
  { name: "Televo",  src: "../assets/logos/Televo.svg",  href: "#" },
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

// Logos marquee — English version.

const LOGOS = [
  { name: "Eurion",  src: "../assets/logos/Eurion.svg" },
  { name: "TLV",     src: "../assets/logos/tlv.svg"    },
  { name: "EuLink",  src: "../assets/logos/EuLink.svg" },
  { name: "Televo",  src: "../assets/logos/Televo.svg" },
];

function LogoItem({ logo }) {
  return (
    <div className="logo" aria-label={logo.name}>
      <img src={logo.src} alt={logo.name} loading="lazy"
        onError={(e) => {
          const div = e.currentTarget.parentElement;
          if (div) { div.classList.add("logo--fallback"); div.textContent = logo.name; }
        }}
      />
    </div>
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

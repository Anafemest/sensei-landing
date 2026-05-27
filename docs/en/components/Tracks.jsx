// Tracks — English version.

const TRACKS = [
  { num: "01", title: "Technical Checks",
    desc: "Connectivity, equipment, ports and route verification. Answer with full justification." },
  { num: "02", title: "L1 Incidents",
    desc: "Data collection for the incident, SLA prioritization, recommendations for the operator." },
  { num: "03", title: "Subscriber Service",
    desc: "Customer card, request history, first-line response template." },
  { num: "04", title: "Commercial Block",
    desc: "Tariff reconciliations, billing operations, service replies and documents." },
  { num: "05", title: "Integrations",
    desc: "CRM, OSS/BSS, NMS, NetBox, billing, ticketing systems." },
];

function Tracks() {
  return (
    <section className="section" id="tracks">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Automation Areas</span>
          <h2>What tasks <em>Sensei</em> takes on</h2>
        </div>
        <ul className="track-list">
          {TRACKS.map(t => (
            <li key={t.num} className="track-row">
              <span className="track-row__num">{t.num}</span>
              <span className="track-row__title">{t.title}</span>
              <span className="track-row__desc">{t.desc}</span>
            </li>
          ))}
        </ul>
        <div className="tracks-cta">
          <a href="#form" className="tracks-cta__btn"
             onClick={e => {
               e.preventDefault();
               const input = document.querySelector('#form .form-panel input[type="text"]');
               if (!input) return;
               window.scrollTo({ top: input.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
               setTimeout(() => input.focus(), 600);
             }}>Discuss the Project</a>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Tracks });

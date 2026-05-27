// Tracks — clean factual list of automation areas. No marketing copy.

const TRACKS = [
  { num: "01", title: "Техпроверки",
    desc: "Проверка подключения, оборудования, портов и трассы. Ответ с обоснованием." },
  { num: "02", title: "Инциденты L1",
    desc: "Сбор данных по инциденту, приоритизация по SLA, рекомендации для оператора." },
  { num: "03", title: "Абонентский сервис",
    desc: "Карточка клиента, история обращений, шаблон ответа первой линии." },
  { num: "04", title: "Коммерческий блок",
    desc: "Сверки тарифов, расчётные операции, служебные ответы и документы." },
  { num: "05", title: "Интеграции",
    desc: "CRM, OSS/BSS, NMS, NetBox, биллинг, тикет-системы. " },
];

function Tracks() {
  React.useEffect(() => {
    if (window.innerWidth > 760) return;
    const rows = [...document.querySelectorAll('.track-row')];
    if (!rows.length) return;

    const update = () => {
      const mid = window.innerHeight / 2;
      let closest = null, minDist = Infinity;
      rows.forEach(row => {
        const r = row.getBoundingClientRect();
        const dist = Math.abs((r.top + r.bottom) / 2 - mid);
        if (dist < minDist) { minDist = dist; closest = row; }
      });
      rows.forEach(row => row.classList.toggle('is-active', row === closest));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section className="section" id="tracks">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Направления автоматизации</span>
          <h2>Какие задачи забирает на себя <em>Sensei</em></h2>
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
             }}>Обсудить проект</a>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Tracks });

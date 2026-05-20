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
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Направления автоматизации</span>
          <h2>Где работает <em>Sensei</em></h2>
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
      </div>
    </section>
  );
}
Object.assign(window, { Tracks });

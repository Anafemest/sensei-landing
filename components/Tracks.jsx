// Tracks — clean factual list of automation areas. No marketing copy.

const TRACKS = [
{ num: "01", title: "Техпроверки",
  desc: "Проверка подключения, цепочки оборудования, портов и трассы. Ответ в тикет с обоснованием." },
{ num: "02", title: "Инциденты L1",
  desc: "Сбор контекста по инциденту, приоритизация по SLA, рекомендации для оператора." },
{ num: "03", title: "Абонентский сервис",
  desc: "Карточка клиента, история обращений, шаблон ответа первой линии." },
{ num: "04", title: "Коммерческий блок",
  desc: "Сверки тарифов, расчётные операции, служебные ответы и документы." },
{ num: "05", title: "Интеграции",
  desc: "CRM, OSS/BSS, NMS, NetBox, биллинг, тикет-системы. Подключение через сервисные учётки." }];


function Tracks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Направления автоматизации</span>
          <h2>Где работает <em>Sensei</em></h2>
        </div>
        <ul className="track-list">
          {TRACKS.map((t) =>
          <li key={t.num} className="track-row" style={{ letterSpacing: "1px" }}>
              <span className="track-row__num">{t.num}</span>
              <span className="track-row__title" style={{ fontWeight: "700", width: "192px" }}>{t.title}</span>
              <span className="track-row__desc" style={{ width: "1055px" }}>{t.desc}</span>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
Object.assign(window, { Tracks });
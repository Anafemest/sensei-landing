// Security — 3 principle cards + compliance bar + IB-service FAQ.
// For a telecom audience this is the critical trust block, so we expand
// past the high-level principles into concrete answers and standards.

const SEC = [
{ Icon: () => <IShield />, num: "S-01", title: "On-premise контур",
  desc: "Развёртывание в инфраструктуре заказчика. Никаких внешних облаков, никаких ваших данных у нас." },
{ Icon: () => <IKey />, num: "S-02", title: "Ролевая модель доступа",
  desc: "Доступы Sensei к системам настраиваются по внутренним регламентам и политикам безопасности." },
{ Icon: () => <IScroll />, num: "S-03", title: "Аудит и логирование",
  desc: "Каждое действие фиксируется в системах и доступно для проверки и контроля службой безопасности." }];


// CISO/IB-service objections, in the order they usually come up.
const FAQS = [
{
  q: "Куда отправляются данные клиентов и сотрудников?",
  a: "Никуда. Sensei работает в вашем on-premise контуре. Нет исходящих соединений с внешним интернетом, нет внешних LLM-провайдеров, нет нашей телеметрии."
},
{
  q: "Какие LLM используются и где они работают?",
  a: "Локально развёрнутые open-source модели на вашем железе. Поддерживаем Llama 3, Qwen, YandexGPT внутри контура. Внешние API-сервисы (OpenAI, Anthropic) не используются."
},
{
  q: "Что Sensei может делать самостоятельно?",
  a: "Только то, что разрешено вашим регламентом. По умолчанию — чтение и подготовка ответа. Любое изменение в системе требует подтверждения человека или explicit-разрешения в политике."
},
{
  q: "Как контролируется доступ Sensei к системам?",
  a: "Стандартная сервисная учётная запись с минимальными правами. Доступы к CRM, OSS/BSS, NMS назначаются вашим админом по принципу наименьших привилегий. Отзывается одной кнопкой."
},
{
  q: "Можно ли отследить каждое действие?",
  a: "Да. Полный аудит-журнал по каждому запросу: какие системы опрашивались, какие данные читались, какие изменения предложены или выполнены. Журнал интегрируется в ваш SIEM."
},
{
  q: "Как обновляется платформа? Что с пайплайном поставки?",
  a: "Образы поставляются вашим регламентом — DEV → STAGE → PROD. Без принудительных обновлений. Каждый релиз проходит ваши проверки безопасности перед выкаткой."
}];


function FAQItem({ q, a }) {
  return (
    <div className="faq">
      <p className="faq__q">{q}</p>
      <p className="faq__a">{a}</p>
    </div>);

}

function Security() {
  return (
    <section className="section" id="security">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Безопасность</span>
          <h2>Данные <em>остаются внутри</em></h2>
          <p className="section__sub">
            Три принципа, которые делают Sensei готовым к корпоративной службе
            безопасности и регуляторным требованиям телеком-сектора.
          </p>
        </div>

        <div className="sec-row">
          {SEC.map((s) =>
          <div key={s.num} className="sec-card">
              <div className="sec-card__head">
                <div className="sec-card__icon"><s.Icon /></div>
                <span className="sec-card__num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          )}
        </div>

        {/* FAQ — answers tuned for a CISO's first review */}
        <div className="sec-faq">
          <div className="sec-faq__head">
            <span className="section__eyebrow">Вопросы службы ИБ</span>
            <h3>Что чаще всего <em>спрашивает CISO</em></h3>
            <p className="section__sub">
              Если у вашей службы безопасности остаются открытые вопросы — мы готовы
              прислать архитектурный документ и пройти security-ревью.
            </p>
          </div>
          <div className="sec-faq__grid">
            {FAQS.map((qa, i) => <FAQItem key={i} {...qa} />)}
          </div>
        </div>
      </div>
    </section>);

}
Object.assign(window, { Security });
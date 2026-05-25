// Hero — split: copy + live agent terminal demo.

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <span className="hero__eyebrow">Платформа Sensei · ИИ-сотрудник</span>
          <h1>
            <span className="grad">от 2 дней до 10 минут</span>
          </h1>
          <p className="hero__lead">
            Sensei — виртуальный сотрудник, который живёт on-premise внутри
            вашего контура. Подключается к CRM, OSS/BSS, NMS и биллингу
            и возвращает готовый результат. Данные не покидают периметр.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#form">
              Записаться на демо <IArrow size={16} />
            </a>
          </div>
          <div className="hero__metrics">
            <div className="metric">
              <div className="metric__value">2-3 дня <span className="accent">→ 10 мин</span></div>
              <div className="metric__label">Скорость обработки тикета</div>
            </div>
            <div className="metric">
              <div className="metric__value"><span className="accent">Сотни</span> часов/мес</div>
              <div className="metric__label">Экономия на рутине</div>
            </div>
            <div className="metric">
              <div className="metric__value"><span className="accent">100%</span> on-prem</div>
              <div className="metric__label">Внутри вашей инфраструктуры</div>
            </div>
          </div>
        </div>
        <AgentTerminal />
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────
// AgentTerminal — fully scripted, looping demo of Sensei processing
// a real telecom ticket. Phases:
//   typing  → user message types char-by-char, inline code spans light up
//   accepted → "Sensei · принял" header
//   thinking → "читаю OSS/BSS, NetBox, трассировку…"
//   checks   → 4 status lines appear one by one
//   answer   → the structured response card slides in
//   hold     → pause, then reset to the start
// IntersectionObserver re-triggers the reset whenever the terminal scrolls
// back into view after having left.
// ──────────────────────────────────────────────────────────────

// User-message segments. `code: true` segments render in the inline
// highlighted "parsed entity" style and animate to a final framed state
// once they're fully typed out.
const SEGMENTS = [
{ text: "Проверь техвозможность подключения по адресу " },
{ text: "Санкт-Петербург, Невский пр. 28", code: true },
{ text: ". Клиент: " },
{ text: "ООО «Аврора»", code: true },
{ text: ", тариф 1 Гбит/с." }];

const TOTAL_CHARS = SEGMENTS.reduce((s, x) => s + x.text.length, 0);

const CHECKS = [
["Адрес найден в NetBox", "узел СПб-Центр-3"],
["Порты на оборудовании", "3 свободных"],
["Трасса до клиента", "1.2 км · оптика проложена"],
["Сверка с биллингом", "ограничений нет"]];


// Phase machine — durations in ms.
// After "answer" the terminal stays at the final state — it only resets
// when the user scrolls back to the top of the page.
const SCHEDULE = {
  TYPE_CHAR_MS: 28,
  AFTER_TYPING: 600,
  AFTER_ACCEPT: 650,
  THINKING: 1100,
  CHECK_STAGGER: 550,
  AFTER_CHECKS: 500,
  IDLE_AFTER: 400
};

function AgentTerminal() {
  const wrapRef = React.useRef(null);
  // phase: 'idle' | 'typing' | 'accepted' | 'thinking' | 'checking' | 'answer' | 'hold'
  const [phase, setPhase] = React.useState("idle");
  const [typed, setTyped] = React.useState(0); // chars typed so far
  const [revealed, setRevealed] = React.useState(0); // how many checks shown

  const reset = React.useCallback(() => {
    setTyped(0);
    setRevealed(0);
    setPhase("idle");
  }, []);

  // ── State machine driven by setTimeout / setInterval per phase ──
  React.useEffect(() => {
    let timer;
    if (phase === "idle") {
      timer = setTimeout(() => setPhase("typing"), SCHEDULE.IDLE_AFTER);
    } else
    if (phase === "typing") {
      if (typed < TOTAL_CHARS) {
        timer = setTimeout(() => setTyped((c) => c + 1), SCHEDULE.TYPE_CHAR_MS);
      } else {
        timer = setTimeout(() => setPhase("accepted"), SCHEDULE.AFTER_TYPING);
      }
    } else
    if (phase === "accepted") {
      timer = setTimeout(() => setPhase("thinking"), SCHEDULE.AFTER_ACCEPT);
    } else
    if (phase === "thinking") {
      timer = setTimeout(() => setPhase("checking"), SCHEDULE.THINKING);
    } else
    if (phase === "checking") {
      if (revealed < CHECKS.length) {
        timer = setTimeout(() => setRevealed((r) => r + 1), SCHEDULE.CHECK_STAGGER);
      } else {
        timer = setTimeout(() => setPhase("answer"), SCHEDULE.AFTER_CHECKS);
      }
    }
    // "answer" is terminal — stay here until reset is triggered by scroll
    return () => clearTimeout(timer);
  }, [phase, typed, revealed]);

  // ── Replay when the user scrolls back to the top of the page ──
  // Track when the user has scrolled away (>200px). Only then, upon
  // returning to ~0 scroll, do we restart the animation. This avoids
  // accidental rapid restarts and only triggers on a deliberate return.
  React.useEffect(() => {
    let wasScrolledAway = false;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y > 200) wasScrolledAway = true;
      if (y < 4 && wasScrolledAway && phase === "answer") {
        wasScrolledAway = false;
        reset();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, reset]);

  // ── Render the user message with progressive typing ──
  const isUserDone = typed >= TOTAL_CHARS && phase !== "idle" && phase !== "typing";
  const renderMessage = () => {
    let remaining = typed;
    const out = [];
    SEGMENTS.forEach((seg, i) => {
      if (remaining <= 0 && seg.text.length > 0) {
        // not started yet — render nothing
        return;
      }
      const showLen = Math.min(remaining, seg.text.length);
      const slice = seg.text.slice(0, showLen);
      remaining -= showLen;

      if (seg.code) {
        const finished = showLen === seg.text.length;
        out.push(
          <code key={i} className={`pcode${finished ? " pcode--done" : " pcode--typing"}`}>
            {slice}
          </code>
        );
      } else {
        out.push(<React.Fragment key={i}>{slice}</React.Fragment>);
      }
    });
    return out;
  };

  const showCursor = phase === "typing";
  const showAccepted = ["accepted", "thinking", "checking", "answer"].includes(phase);
  const showThinking = phase === "thinking";
  const showChecks = ["checking", "answer"].includes(phase);
  const showAnswer = phase === "answer";

  return (
    <div className="terminal" ref={wrapRef}>
      <div className="terminal__chrome">
        <div className="terminal__dots"><span /><span /><span /></div>
        <div className="terminal__title">sensei · ticket #INC-48217</div>
        <span className="terminal__pill"><span className="dot" />live</span>
      </div>
      <div className="terminal__body">

        {/* User message — always present after idle */}
        {phase !== "idle" &&
        <div className="msg">
            <div className="msg__avatar msg__avatar--user">АМ</div>
            <div className="msg__body">
              <div className="msg__who">Инженер L1 · 11:42</div>
              <div className={`msg__text${showCursor ? " msg__text--typing" : ""}`}>
                {renderMessage()}
              </div>
            </div>
          </div>
        }

        {/* Sensei accepts and works */}
        {showAccepted &&
        <div className="msg msg--enter">
            <div className="msg__avatar msg__avatar--sensei"><SenseiMark /></div>
            <div className="msg__body">
              <div className="msg__who">Sensei · принял</div>
              {showThinking &&
            <div className="thinking">
                  читаю OSS/BSS, NetBox, трассировку
                  <span className="dots"><span /><span /><span /></span>
                </div>
            }
              {showChecks &&
            <div className="checks">
                  {CHECKS.slice(0, revealed).map(([label, value], i) =>
              <div key={i} className="check check--in">
                      <span className="check__mark">✓</span>
                      <span>{label} · <b>{value}</b></span>
                    </div>
              )}
                </div>
            }
            </div>
          </div>
        }

        {/* Final response card */}
        {showAnswer &&
        <div className="msg msg--enter">
            <div className="msg__avatar msg__avatar--sensei"><SenseiMark /></div>
            <div className="msg__body">
              <div className="msg__who">Sensei · ответ в тикет</div>
              <div className="task-card task-card--in">
                <div className="task-card__row">
                  <span>Подключение</span>
                  <span className="ok">Возможно</span>
                </div>
                <div className="task-card__row">
                  <span>Срок монтажа</span>
                  <span>3–5 рабочих дней</span>
                </div>
                <div className="task-card__row">
                  <span>Тариф 1 Гбит/с</span>
                  <span className="ok">Доступен</span>
                </div>
                <div className="task-card__row">
                  <span>Время обработки</span>
                  <span><b style={{ color: "#b78aff" }}>00:08:24</b></span>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>);

}

// Mini brand mark used as the Sensei avatar inside the terminal:
// orbital rings BEHIND a bold "S" that bursts past them. Fully static —
// no satellite, no rotation.
function SenseiMark() {
  return (
    <svg
      width="26" height="26" viewBox="0 0 32 32"
      style={{ overflow: "visible" }}
      aria-hidden="true">
      
      {/* Orbits — rendered first so the S sits on top */}
      <circle cx="16" cy="16" r="12" fill="none"
      stroke="rgba(255,255,255,0.45)" strokeWidth="1"
      strokeDasharray="1.8 2.4" />
      <circle cx="16" cy="16" r="8" fill="none"
      stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      {/* Big S — extends past both orbits */}
      <text
        x="16" y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Outfit, ui-sans-serif, sans-serif"
        fontSize="28"
        fontWeight="900"
        fill="#fff"
        letterSpacing="-0.04em">
        S</text>
    </svg>);

}

Object.assign(window, { Hero });
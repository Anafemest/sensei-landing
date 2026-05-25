// Hero — split: copy + live agent terminal demo that cycles through
// 5 different Sensei scenarios (analyst, modernization, NOC, subscriber, config).

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <span className="hero__eyebrow">Платформа Sensei</span>
          <h1>
            <span className="grad">ИИ-сотрудник</span>
          </h1>
          <div className="hero__subline">от 2 дней до 10 минут</div>
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
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// AgentTerminal — cycles through window.SENSEI_SCENARIOS.
// Phases per scenario:
//   typing → user message types char-by-char
//   accepted → "Sensei · принял" header appears
//   thinking → ellipsis line
//   checking → status lines reveal one-by-one
//   answer  → final result card slides in
//   hold    → pause before advancing to the next scenario
// ──────────────────────────────────────────────────────────────

const SCHEDULE = {
  TYPE_CHAR_MS:   22,
  AFTER_TYPING:   500,
  AFTER_ACCEPT:   500,
  THINKING:       900,
  CHECK_STAGGER:  480,
  AFTER_CHECKS:   500,
  HOLD_MS:       7000,
  IDLE_AFTER:     300,
};

function AgentTerminal() {
  const SCENARIOS = window.SENSEI_SCENARIOS || [];
  const [sIdx, setSIdx]     = React.useState(0);
  const [phase, setPhase]   = React.useState("idle");
  const [typed, setTyped]   = React.useState(0);
  const [revealed, setRev]  = React.useState(0);
  const [direction, setDir] = React.useState(1); // for slide animation key

  const scenario = SCENARIOS[sIdx] || SCENARIOS[0];
  const totalChars = React.useMemo(
    () => scenario.segments.reduce((s, x) => s + x.text.length, 0),
    [scenario]
  );

  // ── State machine ──
  React.useEffect(() => {
    if (!scenario) return;
    let timer;
    if (phase === "idle") {
      timer = setTimeout(() => setPhase("typing"), SCHEDULE.IDLE_AFTER);
    }
    else if (phase === "typing") {
      if (typed < totalChars) {
        timer = setTimeout(() => setTyped(c => c + 1), SCHEDULE.TYPE_CHAR_MS);
      } else {
        timer = setTimeout(() => setPhase("accepted"), SCHEDULE.AFTER_TYPING);
      }
    }
    else if (phase === "accepted") {
      timer = setTimeout(() => setPhase("thinking"), SCHEDULE.AFTER_ACCEPT);
    }
    else if (phase === "thinking") {
      timer = setTimeout(() => setPhase("checking"), SCHEDULE.THINKING);
    }
    else if (phase === "checking") {
      if (revealed < scenario.statuses.length) {
        timer = setTimeout(() => setRev(r => r + 1), SCHEDULE.CHECK_STAGGER);
      } else {
        timer = setTimeout(() => setPhase("answer"), SCHEDULE.AFTER_CHECKS);
      }
    }
    else if (phase === "answer") {
      timer = setTimeout(() => setPhase("hold"), SCHEDULE.HOLD_MS);
    }
    else if (phase === "hold") {
      // Advance to next scenario
      timer = setTimeout(() => {
        setDir(d => d + 1);
        setTyped(0);
        setRev(0);
        setSIdx(i => (i + 1) % SCENARIOS.length);
        setPhase("idle");
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [phase, typed, revealed, scenario, totalChars, SCENARIOS.length]);

  // Render user message with progressive typing
  const renderMessage = () => {
    let remaining = typed;
    const out = [];
    scenario.segments.forEach((seg, i) => {
      if (remaining <= 0 && seg.text.length > 0) return;
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

  const showCursor   = phase === "typing";
  const showAccepted = ["accepted", "thinking", "checking", "answer", "hold"].includes(phase);
  const showThinking = phase === "thinking";
  const showChecks   = ["checking", "answer", "hold"].includes(phase);
  const showAnswer   = ["answer", "hold"].includes(phase);

  return (
    <div className="terminal">
      <div className="terminal__chrome">
        <div className="terminal__dots"><span /><span /><span /></div>
        <div className="terminal__title">sensei · ticket #{scenario.ticket}</div>
        <span className="terminal__pill"><span className="dot" />live</span>
      </div>

      {/* Role label — small, indicates which Sensei agent is active */}
      <div className="terminal__role">
        <SenseiMark />
        <span>{scenario.role}</span>
        <span className="terminal__progress" aria-hidden="true">
          {SCENARIOS.map((_, i) => (
            <span
              key={i}
              className={`tp__dot${i === sIdx ? " tp__dot--on" : ""}`}
            />
          ))}
        </span>
      </div>

      <div className="terminal__body" key={direction}>
        {/* User message */}
        {phase !== "idle" && (
          <div className="msg">
            <div className="msg__avatar msg__avatar--user">АМ</div>
            <div className="msg__body">
              <div className="msg__who">{scenario.who}</div>
              <div className={`msg__text${showCursor ? " msg__text--typing" : ""}`}>
                {renderMessage()}
              </div>
            </div>
          </div>
        )}

        {/* Sensei working */}
        {showAccepted && (
          <div className="msg msg--enter">
            <div className="msg__avatar msg__avatar--sensei"><SenseiMark /></div>
            <div className="msg__body">
              <div className="msg__who">Sensei · принял</div>
              {showThinking && (
                <div className="thinking">
                  читаю CRM, OSS/BSS, NMS, биллинг
                  <span className="dots"><span /><span /><span /></span>
                </div>
              )}
              {showChecks && (
                <div className="checks">
                  {scenario.statuses.slice(0, revealed).map((label, i) => (
                    <div key={i} className="check check--in">
                      <span className="check__mark">✓</span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final result */}
        {showAnswer && (
          <div className="msg msg--enter">
            <div className="msg__avatar msg__avatar--sensei"><SenseiMark /></div>
            <div className="msg__body">
              <div className="msg__who">Sensei · ответ в тикет</div>
              <ResultCard result={scenario.result} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Renders either a KV-rows card, a bullet list, or both — plus an optional note.
function ResultCard({ result }) {
  return (
    <div className="task-card task-card--in">
      {result.rows && result.rows.map((row, i) => (
        <div key={i} className="task-card__row">
          <span>{row.label}</span>
          <span className={row.ok ? "ok" : row.accent ? "accent-v" : ""}>
            {row.value}
          </span>
        </div>
      ))}
      {result.bullets && (
        <div className="task-card__bullets">
          {result.bullets.map((b, i) => (
            <div key={i} className="task-card__bullet">
              <span className="task-card__dot" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}
      {result.note && (
        <div className="task-card__note">{result.note}</div>
      )}
    </div>
  );
}

// Mini brand mark used as the Sensei avatar inside the terminal.
function SenseiMark() {
  return (
    <svg
      width="26" height="26" viewBox="0 0 32 32"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="12" fill="none"
              stroke="rgba(255,255,255,0.45)" strokeWidth="1"
              strokeDasharray="1.8 2.4" />
      <circle cx="16" cy="16" r="8" fill="none"
              stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      <text
        x="16" y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Outfit, ui-sans-serif, sans-serif"
        fontSize="28"
        fontWeight="900"
        fill="#fff"
        letterSpacing="-0.04em"
      >S</text>
    </svg>
  );
}

Object.assign(window, { Hero });

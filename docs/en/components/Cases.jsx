// Cases — English version.

const CASES = [
  {
    num: "01",
    title: "AI Task Analyst",
    role: "AI Task Analyst",
    short: "Analyzes long comment chains in tasks. Delivers the essence, status, and next step — right inside the ticket.",
    context: "Internet provider. High volume of technical tasks, complex comment threads.",
    problem: [
      "50–100+ comments in one task",
      "15–30 minutes to get into context",
      "The essence gets lost in long threads",
    ],
    ai: [
      "Analyzes the entire task thread",
      "Highlights the essence, what's been done, current status, next step",
      "Forms a structured summary right in the task",
      "Suggests questions to resolve for quick ticket closure",
    ],
    integrations: ["Task tracker (Jira / analog)", "Internal messaging", "Knowledge bases"],
    results: [
      { value: "< 2 min",  label: "to enter a task instead of 30 minutes" },
      { value: ">90%",     label: "employee adoption rate" },
      { value: "−93%",     label: "time reduction to get into context" },
    ],
    changed: "Employees work not with 'raw noise', but with an already analyzed task.",
    saving: {
      formula: "100 tasks/day × 20 min saved = 700 hrs/mo × $40/hr",
      result: "$28,000/mo",
    },
  },
  {
    num: "02",
    title: "AI Modernization Engineer",
    role: "AI Modernization Engineer",
    short: "Checks the technical feasibility of connecting a subscriber to a high-tier plan — in minutes, across the full equipment chain.",
    context: "Provider. Task: determine if a subscriber can be upgraded to a higher tariff.",
    problem: [
      "Manually trace the entire equipment chain",
      "Check switches and uplink load",
      "Verify tariff and parameters",
      "Tens of minutes + 3–4 departments per task",
    ],
    ai: [
      "Builds the equipment chain from subscriber to core",
      "Checks equipment models",
      "Analyzes uplink load",
      "Forms verdict: can connect / replacement needed / impossible",
    ],
    integrations: ["Network systems", "Equipment data", "Load monitoring"],
    results: [
      { value: "~2,000",       label: "tasks/mo automated" },
      { value: "2 days → 1 hr", label: "time to verdict" },
      { value: "4 → 1",        label: "departments in process" },
    ],
    changed: "The engineer gets a ready technical conclusion, not a research task.",
    saving: {
      formula: "2,000 tasks/mo × 1 hr saved × $40/hr",
      result: "$80,000/mo",
    },
  },
  {
    num: "03",
    title: "AI NOC Engineer",
    role: "AI NOC Engineer",
    short: "Analyzes network incidents on its own: diagnostics, probable cause, and ready recommendations in the ticket.",
    context: "Internet provider with a large amount of equipment and subscribers. Constant flow of network events and incidents.",
    problem: [
      "Incidents detected after the fact",
      "Engineers respond manually",
      "Diagnostics: port checks, error analysis, data correlation",
      "High NOC load",
    ],
    ai: [
      "Analyzes data from switches",
      "Detects errors and anomalies",
      "Automatically creates tasks and determines probable cause",
      "Conducts initial diagnostics",
      "Provides recommendations to the engineer",
    ],
    integrations: ["Monitoring systems", "Switches and equipment", "Task tracker", "Internal infrastructure"],
    results: [
      { value: "< 5 min",   label: "to incident detection" },
      { value: "×8 faster", label: "initial diagnostics" },
      { value: "−60%",      label: "NOC engineer load reduction" },
    ],
    changed: "The engineer no longer 'searches for the problem' — they receive an already analyzed incident with a recommendation.",
    saving: {
      formula: "600 incidents/mo × 2 hrs manual diagnostics × $40/hr",
      result: "$48,000/mo",
    },
  },
  {
    num: "04",
    title: "AI Network & Subscriber Analyst",
    role: "AI Network & Subscriber Analyst",
    short: "Answers operational questions about the network, subscribers, and equipment — without compiling reports.",
    context: "Company with a large volume of data: network, subscribers, finances, equipment load.",
    problem: [
      "A simple question 'what's happening in the network?' requires collecting data from multiple systems",
      "Manual aggregation",
      "Manual analysis",
      "An analyst spends hours on each request",
    ],
    ai: [
      "Answers queries: subscriber location, network load, device count, port status",
      "Analyzes node load and bottlenecks",
      "Forecasts overloads and problems",
      "Works with subscriber data: balance, activity, disconnection forecast",
    ],
    integrations: ["Billing / CRM", "Network systems", "Databases", "Internal analytics"],
    results: [
      { value: "< 30 sec",    label: "response to operational query" },
      { value: "−70%",        label: "analyst load reduction" },
      { value: "×5 queries",  label: "handled without additional resources" },
    ],
    changed: "Before: 'compile a report'. Now: 'ask a question and get an answer'.",
    saving: {
      formula: "10 analysts × 80 hrs/mo saved × $40/hr",
      result: "$32,000/mo",
    },
  },
  {
    num: "05",
    title: "AI Network Configurator",
    role: "AI Network Configurator",
    short: "Generates ready network configs for the task — with cross-checking against working nodes.",
    context: "Configuration of network equipment when connecting subscribers and making network changes.",
    problem: [
      "Configs are created manually",
      "High risk of errors",
      "Need to account for current settings and cross-check with working configs",
      "Takes up engineer's time",
    ],
    ai: [
      "Generates ready configs for the task",
      "Automatically selects the port and accounts for equipment parameters",
      "Compares with existing configurations, shows diff",
      "Prepares recommendations",
    ],
    integrations: ["Network equipment", "Configuration data", "Internal infrastructure"],
    results: [
      { value: "×10 faster",  label: "equipment setup" },
      { value: "−80% errors", label: "thanks to diff checking" },
      { value: "100% templates", label: "to a single standard" },
    ],
    changed: "The engineer doesn't write the config manually — they review and apply the ready solution.",
    saving: {
      formula: "800 configs/mo × 1.5 hrs saved × $40/hr",
      result: "$48,000/mo",
    },
  },
];

function CaseCard({ caseData, onOpen }) {
  return (
    <button type="button" className="case-card" onClick={() => onOpen(caseData)} style={{ "--num-bg": "var(--primary)" }}>
      <div className="case-card__top">
        <span className="case-card__eyebrow">Case {caseData.num}</span>
        <span className="case-card__role">{caseData.role}</span>
      </div>
      <h3 className="case-card__title">{caseData.title}</h3>
      <p className="case-card__short">{caseData.short}</p>
      <span className="case-card__more">
        Learn more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className="case-card__bignum" aria-hidden="true">{caseData.num}</span>
    </button>
  );
}

function CaseModal({ caseData, onClose }) {
  const scrollRef = React.useRef(null);
  const thumbRef  = React.useRef(null);
  const trackRef  = React.useRef(null);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  React.useEffect(() => {
    const scroll = scrollRef.current;
    const thumb  = thumbRef.current;
    const track  = trackRef.current;
    if (!scroll || !thumb || !track) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroll;
      const trackH = track.clientHeight;
      if (scrollHeight <= clientHeight) { thumb.style.display = "none"; return; }
      thumb.style.display = "";
      const thumbH = Math.max(32, (clientHeight / scrollHeight) * trackH);
      const maxTop = trackH - thumbH;
      const top    = maxTop > 0 ? (scrollTop / (scrollHeight - clientHeight)) * maxTop : 0;
      thumb.style.height = thumbH + "px";
      thumb.style.top    = top    + "px";
    };

    let dragging = false, startY = 0, startST = 0;
    const onDown = (e) => { dragging = true; startY = e.clientY; startST = scroll.scrollTop; e.preventDefault(); };
    const onMove = (e) => {
      if (!dragging) return;
      const { scrollHeight, clientHeight } = scroll;
      const delta = e.clientY - startY;
      const maxTop = track.clientHeight - thumb.offsetHeight;
      scroll.scrollTop = startST + (delta / maxTop) * (scrollHeight - clientHeight);
    };
    const onUp = () => { dragging = false; };
    const onTrackClick = (e) => {
      if (e.target === thumb) return;
      const rect = track.getBoundingClientRect();
      const { scrollHeight, clientHeight } = scroll;
      const clickY = e.clientY - rect.top - thumb.offsetHeight / 2;
      const ratio  = Math.max(0, Math.min(1, clickY / (track.clientHeight - thumb.offsetHeight)));
      scroll.scrollTop = ratio * (scrollHeight - clientHeight);
    };

    scroll.addEventListener("scroll", update, { passive: true });
    thumb.addEventListener("mousedown", onDown);
    track.addEventListener("click", onTrackClick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    const ro = new ResizeObserver(update);
    ro.observe(scroll);
    update();

    return () => {
      scroll.removeEventListener("scroll", update);
      thumb.removeEventListener("mousedown", onDown);
      track.removeEventListener("click", onTrackClick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      ro.disconnect();
    };
  }, [caseData]);

  if (!caseData) return null;
  const c = caseData;

  return ReactDOM.createPortal(
    <div
      className="case-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={`Case ${c.num}: ${c.title}`}
    >
      <div className="case-modal__sheet">

        <div className="case-modal__header">
          <div className="case-modal__header-meta">
            <span className="case-detail__eyebrow">Case {c.num}</span>
            <h2 className="case-detail__title">{c.title}</h2>
          </div>
          <button type="button" className="case-modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="case-modal__body">

          <aside className="case-modal__left">
            <p className="case-detail__role">Role: <b>{c.role}</b></p>
            <p className="case-detail__short">{c.short}</p>
            <div className="case-detail__insight">
              <span className="case-detail__spark" aria-hidden="true" />
              AI gathers context, identifies root causes, and proposes a solution.
            </div>
            <section className="case-detail__context">
              <div className="case-detail__context-label">Context</div>
              <p>{c.context}</p>
            </section>

            <div className="case-cta">
              <p className="case-cta__label">Want to implement this at your company?</p>
              <button
                className="case-cta__btn"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const form = document.getElementById("form");
                    if (form) form.scrollIntoView({ behavior: "smooth" });
                  }, 180);
                }}
              >
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </aside>

          <div className="case-modal__right">
            <div className="case-modal__right-scroll" ref={scrollRef}>

              <div className="case-detail__grid">
                <article className="case-block case-block--problem">
                  <h3 className="case-block__title"><span className="case-block__num">1</span>Problem</h3>
                  <ul>{c.problem.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </article>
                <article className="case-block case-block--ai">
                  <h3 className="case-block__title"><span className="case-block__num">2</span>What AI Does</h3>
                  <ul className="case-block__check">{c.ai.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </article>
              </div>

              <section className="case-section">
                <h3 className="case-section__title"><span className="case-section__num">3</span>Integrations</h3>
                <div className="case-chain">
                  {c.integrations.map((it, i) => (
                    <React.Fragment key={it}>
                      {i > 0 && <CaseFlowArrow small />}
                      <div className="case-chain__node">{it}</div>
                    </React.Fragment>
                  ))}
                </div>
              </section>

              <section className="case-section">
                <h3 className="case-section__title"><span className="case-section__num">4</span>Results</h3>
                <div className="case-results">
                  {c.results.map((r, i) => (
                    <article key={i} className="case-metric">
                      <span className="case-metric__value">{r.value}</span>
                      <span className="case-metric__label">{r.label}</span>
                    </article>
                  ))}
                </div>
              </section>

              {c.saving && (
                <div className="case-saving">
                  <div className="case-saving__head">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v2m0 8v2M9.5 9.5C9.5 8.12 10.62 7 12 7s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2.5 2.5-1 .5-2.5 1-2.5 2.5 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Economic Impact
                  </div>
                  <p className="case-saving__formula">{c.saving.formula}</p>
                  <div className="case-saving__bottom">
                    <span className="case-saving__label">Monthly savings</span>
                    <span className="case-saving__result">{c.saving.result}</span>
                  </div>
                </div>
              )}

              <section className="case-section case-section--quote">
                <h3 className="case-section__title"><span className="case-section__num">5</span>What Changed</h3>
                <blockquote className="case-quote">
                  <span className="case-quote__mark" aria-hidden="true">"</span>
                  {c.changed}
                </blockquote>
              </section>

            </div>

            <div className="case-modal__scroll-track" ref={trackRef}>
              <div className="case-modal__scroll-thumb" ref={thumbRef} />
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}

function CaseFlowArrow({ small }) {
  return <span className={"case-flow__arrow" + (small ? " case-flow__arrow--sm" : "")} aria-hidden="true">→</span>;
}

function Cases() {
  const [active, setActive] = React.useState(null);

  React.useEffect(() => {
    const tryOpen = () => {
      const m = window.location.hash.match(/^#case-(\d{1,2})$/);
      if (!m) return;
      const num = String(parseInt(m[1], 10)).padStart(2, "0");
      const found = CASES.find(x => x.num === num);
      if (found) setActive(found);
    };
    tryOpen();
    window.addEventListener("hashchange", tryOpen);
    return () => window.removeEventListener("hashchange", tryOpen);
  }, []);

  return (
    <section className="section" id="case-studies">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Cases</span>
          <h2>What <em>Sensei</em> already does in telecom</h2>
          <p className="section__sub">
            Five roles in which the AI employee replaces routine: from incident analysis
            and technical checks to configs and network and subscriber analytics.
          </p>
        </div>
        <div className="case-grid">
          {CASES.map(c => <CaseCard key={c.num} caseData={c} onOpen={setActive} />)}
        </div>
      </div>
      {active && <CaseModal caseData={active} onClose={() => setActive(null)} />}
    </section>
  );
}
Object.assign(window, { Cases });

// How-it-works — English version.

const STEPS = [
  { step: "01", title: "Assign a Task",
    desc: "Through a ticket, service desk, messenger, or voice. The familiar way for the team.",
    chips: ["Ticket", "Messenger", "Voice"] },
  { step: "02", title: "Sensei Connects",
    desc: "To your internal systems — inside the company's secure perimeter.",
    chips: ["CRM", "OSS/BSS", "NMS", "NetBox", "Billing"] },
  { step: "03", title: "Analyzes Context",
    desc: "Collects data, checks regulations, evaluates parameters. Data stays inside.",
    panel: "100% of data stays inside your infrastructure" },
  { step: "04", title: "Returns the Result",
    desc: "Ready answer to a ticket, report, letter, or card. Critical actions require human confirmation.",
    chips: ["Answer", "Report", "Card", "Document"] },
];

const PERIMETER = [
  { label: "Air-gapped",
    desc: "Works without internet access — Sensei lives entirely within your perimeter." },
  { label: "RBAC",
    desc: "Role-based access control — each agent acts strictly within its assigned permissions." },
  { label: "Audit",
    desc: "Logging of all prompts and actions — the event stream goes to your SIEM." },
];

const STANDARDS = [
  // FZ-152, FZ-187, GOST 57580 are Russian-specific — not shown in EN version
  { code: "ISO 27001",   desc: "ISMS" },
  { code: "SOC 2",       desc: "Type II" },
  { code: "OWASP ASVS",  desc: "Level 2" },
];

const FAQS = [
  {
    q: "Where does customer and employee data go?",
    a: "Nowhere. Sensei works in your on-premise perimeter. No outgoing connections to the external internet, no external LLM providers, no telemetry from us.",
  },
  {
    q: "Which LLMs are used and where do they run?",
    a: "Locally deployed open-source models on your hardware. We support Llama 3, Qwen within the perimeter. External API services (OpenAI, Anthropic) are not used.",
  },
  {
    q: "What can Sensei do autonomously?",
    a: "Only what is permitted by your regulations. By default — reading and preparing a response. Any changes in the system require human confirmation or explicit permission in the policy.",
  },
  {
    q: "How is Sensei's access to systems controlled?",
    a: "Standard service account with minimum privileges. Access to CRM, OSS/BSS, NMS is assigned by your admin on a least-privilege basis. Revoked with one click.",
  },
  {
    q: "Can every action be tracked?",
    a: "Yes. Full audit log for every request: which systems were queried, what data was read, what changes were proposed or made. The log integrates with your SIEM.",
  },
  {
    q: "How is the platform updated? What about the delivery pipeline?",
    a: "Images are delivered according to your regulations — DEV → STAGE → PROD. No forced updates. Each release passes your security checks before deployment.",
  },
];

function FAQItem({ q, a }) {
  return (
    <details className="faq">
      <summary className="faq__q">
        <span>{q}</span>
        <span className="faq__chev" aria-hidden="true" />
      </summary>
      <p className="faq__a">{a}</p>
    </details>
  );
}

function Flow() {
  const outerRef    = React.useRef(null);
  const frameRef    = React.useRef(null);
  const securityRef = React.useRef(null);
  const [litCount, setLitCount] = React.useState(1);

  const STEP_BUDGET  = 280;
  const TOTAL_BUDGET = STEPS.length * STEP_BUDGET;

  React.useEffect(() => {
    const outer    = outerRef.current;
    const frame    = frameRef.current;
    const security = securityRef.current;
    if (!outer || !frame || !security) return;

    const setHeight = () => {
      outer.style.minHeight = `${frame.offsetHeight + security.offsetHeight + TOTAL_BUDGET}px`;
    };
    requestAnimationFrame(setHeight);
    window.addEventListener("resize", setHeight);

    const reset = (el) => { el.style.position = el.style.top = el.style.left = el.style.right = ""; };

    const onScroll = () => {
      const into = -outer.getBoundingClientRect().top;
      const fH = frame.offsetHeight;
      const sH = security.offsetHeight;
      outer.style.minHeight = `${fH + sH + TOTAL_BUDGET}px`;

      if (into < 0) { reset(frame); reset(security); setLitCount(0); return; }

      if (into >= TOTAL_BUDGET) {
        reset(frame); reset(security);
        frame.style.position    = "absolute"; frame.style.top = `${TOTAL_BUDGET}px`; frame.style.left = frame.style.right = "0";
        security.style.position = "absolute"; security.style.top = `${TOTAL_BUDGET + fH}px`; security.style.left = security.style.right = "0";
        setLitCount(STEPS.length);
        return;
      }

      frame.style.position    = "fixed"; frame.style.top = "0"; frame.style.left = frame.style.right = "0";
      security.style.position = "fixed"; security.style.top = `${fH}px`; security.style.left = security.style.right = "0";
      setLitCount(Math.min(Math.floor(into / STEP_BUDGET) + 1, STEPS.length));
    };

    const ro = new ResizeObserver(onScroll);
    ro.observe(security);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setHeight);
      outer.style.minHeight = "";
      reset(frame); reset(security);
    };
  }, []);

  const active  = Math.max(0, litCount - 1);
  const fillPct = Math.min(100, (litCount / STEPS.length) * 100);

  return (
    <section id="how-it-works" className="flow-outer-section section" ref={outerRef}>

      <div className="flow-sticky-frame" ref={frameRef}>
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">How It Works</span>
            <h2>Simple. Fast. <em>Secure.</em></h2>
            <p className="section__sub">Four steps from task to ready result.</p>
          </div>
          <div className="flow">
            <div className="flow__progress" style={{ width: `${fillPct}%` }} />
            {STEPS.map((s, i) => {
              const lit = i < litCount;
              return (
                <div key={s.step} className={"flow__step" + (lit ? " lit" : "") + (i === active ? " active" : "")}>
                  <div className="flow__dot">{s.step}</div>
                  <div className="flow__body">
                    <h3 className="flow__title">{s.title}</h3>
                    <p className="flow__desc">{s.desc}</p>
                    {s.chips && <div className="flow__chips">{s.chips.map(c => <span key={c} className="flow__chip">{c}</span>)}</div>}
                    {s.panel && <div className="flow__panel">{s.panel}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flow-security" ref={securityRef}>
        <div className="container">
          <div className="perimeter">
            <div className="perimeter__head">
              <span className="perimeter__eyebrow">Closed Perimeter</span>
              <h3 className="perimeter__title">
                Everything your security team needs — <em>already built into the platform</em>
              </h3>
            </div>
            <div className="perimeter__grid">
              {PERIMETER.map((p) => (
                <div key={p.label} className="perimeter__card">
                  <span className="perimeter__label">{p.label}</span>
                  <p className="perimeter__desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sec-standards">
            <div className="sec-standards__head">
              <span className="sec-standards__label">Standards Compliance</span>
              <p className="sec-standards__sub">
                Sensei architecture is designed to meet the requirements of
                international information security standards.
              </p>
            </div>
            <div className="sec-standards__grid">
              {STANDARDS.map(s => (
                <div key={s.code} className="std">
                  <span className="std__code">{s.code}</span>
                  <span className="std__desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sec-faq" id="faq">
            <div className="sec-faq__head">
              <span className="section__eyebrow">Frequently Asked Questions</span>
              <h3><em>FAQ</em></h3>
              <p className="section__sub">
                If your security team still has open questions — we are ready to
                provide an architecture document and conduct a security review.
              </p>
            </div>
            <div className="sec-faq__grid">
              {FAQS.map((qa, i) => <FAQItem key={i} {...qa} />)}
            </div>
            <div className="faq-cta">
              <p className="faq-cta__label">Still have questions?</p>
              <p className="faq-cta__sub">We'll walk you through the architecture, conduct a security review, and answer everything personally.</p>
              <button
                className="faq-cta__btn"
                onClick={() => {
                  const form = document.getElementById("form");
                  if (form) form.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Schedule a Demo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Flow });

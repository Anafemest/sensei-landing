// CTA + Footer — English version.

const WEBHOOK_URL = "https://robot.icerock.dev/webhook/73704b14-4228-46b7-93ce-94317856a02b";

// Persistent fallback client ID (used when Yandex Metrica is unavailable).
function getLocalClientId() {
  const KEY = "sensei_client_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = Date.now().toString() + Math.floor(Math.random() * 1e9).toString();
    localStorage.setItem(KEY, id);
  }
  return id;
}

// Returns YM clientId if the counter is loaded, otherwise falls back to localStorage.
function getYMClientId() {
  return new Promise((resolve) => {
    try {
      if (typeof window.ym === "function") {
        const timer = setTimeout(() => resolve(getLocalClientId()), 600);
        window.ym(108165202, "getClientID", (id) => {
          clearTimeout(timer);
          resolve(id || getLocalClientId());
        });
      } else {
        resolve(getLocalClientId());
      }
    } catch {
      resolve(getLocalClientId());
    }
  });
}

// International phone formatter — E.164, max 15 digits.
//
// +1  (NANP)          → +1 (XXX) XXX-XXXX          [11 digits]
// +7  (Russia / KZ)   → +7 (XXX) XXX-XX-XX          [11 digits]
// +XX / +XXX (all EU) → +XXX XXX XXX [XXX[X]]       [10–13 digits]
//   last group is whatever digits remain (1–4), so both
//   12-digit (+44 … 10 local) and 13-digit (+351 … 9 local) numbers
//   format cleanly without truncation.
function formatIntlPhone(digits) {
  if (!digits) return "";
  const d = digits.slice(0, 15); // E.164 hard cap

  if (d[0] === "1") {
    // NANP: +1 (NXX) NXX-XXXX  — last group is 4 digits
    let f = "+1";
    if (d.length > 1) f += " (" + d.slice(1, 4);
    if (d.length >= 5) f += ") " + d.slice(4, 7);
    if (d.length >= 8) f += "-" + d.slice(7, 11); // 4-digit last group
    return f;
  }

  if (d[0] === "7") {
    // Russia / KZ: +7 (XXX) XXX-XX-XX
    let f = "+7";
    if (d.length > 1) f += " (" + d.slice(1, 4);
    if (d.length >= 5) f += ") " + d.slice(4, 7);
    if (d.length >= 8) f += "-" + d.slice(7, 9);
    if (d.length >= 10) f += "-" + d.slice(9, 11);
    return f;
  }

  // Everything else: CC is 2–3 digits; group the rest as 3-3-3-[1…4].
  // We don't know where CC ends, so we take first 3 chars as CC area
  // and split remaining digits in groups of 3 (last group 1–4).
  // Examples:
  //   +44  2079460958  (12 dig) → +442 079 460 958
  //   +351 912345678   (12 dig) → +351 912 345 678
  //   +49  15112345678 (13 dig) → +491 511 234 5678
  let f = "+" + d.slice(0, 3);
  if (d.length >  3) f += " " + d.slice(3, 6);
  if (d.length >  6) f += " " + d.slice(6, 9);
  if (d.length >  9) f += " " + d.slice(9);   // all remaining (1–6 chars)
  return f;
}

function CTA() {
  const [sent, setSent]       = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const [name, setName]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [task, setTask]       = React.useState("");
  const [phone, setPhone]     = React.useState("");

  // Pre-fill task from block 05 (CustomTaskCard) via localStorage + custom event.
  React.useEffect(() => {
    const saved = localStorage.getItem("sensei_custom_task_en");
    if (saved) setTask(saved);
    const onTaskChange = (e) => setTask(e.detail);
    window.addEventListener("sensei-task-change-en", onTaskChange);
    return () => window.removeEventListener("sensei-task-change-en", onTaskChange);
  }, []);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    setPhone(formatIntlPhone(digits));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrored(false);

    // Payload mirrors the old-site structure so the existing n8n mappings work.
    const ymClientId = await getYMClientId();
    const now = new Date().toISOString();
    const payload = {
      source: "sensei-landing",
      form: {
        id:   "en-lead-form",
        name: "",
        fields: {
          name:    name,
          company: "",
          role:    "",
          email:   email,
          phone:   phone.replace(/\D/g, ""),
          usecase: task || "",
        },
      },
      seo: {
        page: {
          title:     document.title,
          url:       window.location.href,
          pathname:  window.location.pathname,
          search:    window.location.search,
          hash:      window.location.hash,
          hostname:  window.location.hostname,
          language:  navigator.language,
          canonical: window.location.origin + window.location.pathname,
        },
        referrer: {
          value:    document.referrer || "",
          hostname: (() => { try { return document.referrer ? new URL(document.referrer).hostname : ""; } catch { return ""; } })(),
        },
      },
      analytics: {
        yandexMetrica: {
          counterId: "108165202",
          clientId:  ymClientId,
        },
      },
      technical: {
        submittedAt: now,
        timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent:   navigator.userAgent,
        language:    navigator.language,
        languages:   Array.from(navigator.languages || [navigator.language]),
        screen:   { width: screen.width,      height: screen.height },
        viewport: { width: window.innerWidth, height: window.innerHeight },
      },
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (res.ok) { setSent(true); }
      else        { setErrored(true); }
    } catch {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="cta" id="form">
      <div className="container">
        <div className="cta__shell">
          <div className="cta__grid">
            <div>
              <span className="hero__eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>
                Get Started
              </span>
              <h2>Request a Demonstration</h2>
              <p className="cta__lead">
                Leave your contacts — we'll prepare an implementation scenario for your
                processes and show how Sensei solves your business tasks.
              </p>
              <div className="cta__benefits">
                <Benefit icon={<ILock />} title="On-premise, no data export"
                         sub="Data stays within your perimeter" />
                <Benefit icon={<IZap />}  title="Pilot in 2–4 weeks"
                         sub="Quick launch on the first process" />
                <Benefit icon={<ITrend />} title="Measurable result"
                         sub="Effect visible from the first process" />
              </div>
            </div>

            <div className="form-panel">
              <div className={`form-panel__success${sent ? " show" : ""}`}>
                <b>Thank you!</b> Your request has been received — we'll be in touch shortly.
              </div>
              <form onSubmit={handleSubmit}>
                <label><span>Name</span>
                  <input required type="text" placeholder="What's your name?"
                    value={name} onChange={e => setName(e.target.value)} /></label>
                <label><span>Email</span>
                  <input required type="email" placeholder="work@company.com"
                    value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label><span>Phone</span>
                  <input required type="tel" placeholder="+___ ___ ___ ____"
                    value={phone} onChange={handlePhoneChange} /></label>
                <label>
                  <span>Your task <em style={{ fontStyle:"normal", opacity:.55, fontWeight:400 }}>— optional</em></span>
                  <textarea
                    placeholder="Describe the process you want to automate"
                    rows={3}
                    value={task}
                    onChange={e => setTask(e.target.value)}
                  />
                </label>
                <p className="form-panel__promise">
                  We'll call within an hour and prepare a scenario for your process.
                </p>
                {errored && (
                  <p style={{ color:"#e05", fontSize:"13px", margin:"-4px 0 8px" }}>
                    Could not send your request. Please try again or email us directly.
                  </p>
                )}
                <button className="form-panel__submit" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Submit Request"}
                </button>
                <p className="form-panel__fineprint">
                  By submitting the form, you agree to our{" "}
                  <a href="privacy/">privacy policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ icon, title, sub }) {
  return (
    <div className="cta__benefit">
      <div className="cta__benefit-icon">{icon}</div>
      <div><p>{title}</p><small>{sub}</small></div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand"><Brand size={24} /></div>
            <p className="footer__about">
              An AI-based virtual employee for process automation
              inside the company's secure perimeter.
            </p>
          </div>
          <div className="footer__col">
            <p className="footer__title">Product</p>
            <a href="#xforms">Solutions</a>
            <a href="#what-is">Platform</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#case-studies">Cases</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Company</p>
            <a href="#faq">FAQ</a>
            <a href="#team">Team</a>
            <a href="#testimonials">Reviews</a>
          </div>
          <div className="footer__col">
            <p className="footer__title">Contacts</p>
            <a href="#form">Contact via form</a>
            <div className="footer__contact-group footer__contact-group--inline">
              <span className="footer__contact-label">Email us:</span>
              <a href="mailto:hello@sensei.works" className="footer__contact-link">hello@sensei.works</a>
            </div>
            <div className="footer__contact-group footer__contact-group--inline">
              <span className="footer__contact-label">Call us:</span>
              <div className="footer__phones">
                <a href="tel:+79139072017" className="footer__contact-link">+7 (913) 907 2017</a>
                <a href="tel:+79266298201" className="footer__contact-link">+7 (926) 629 8201</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Sensei. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { CTA, Footer });

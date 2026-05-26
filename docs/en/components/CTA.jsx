// CTA + Footer — English version.

function CTA() {
  const [sent, setSent] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  // Simple international phone formatter
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    const digits = value.replace(/\D/g, "");
    if (!digits) { setPhone(""); return; }
    let formatted = "+" + digits;
    if (digits.length > 1)  formatted = "+" + digits.slice(0, 1) + " (" + digits.slice(1, 4);
    if (digits.length >= 5) formatted += ") " + digits.slice(4, 7);
    if (digits.length >= 8) formatted += "-" + digits.slice(7, 9);
    if (digits.length >= 10) formatted += "-" + digits.slice(9, 11);
    setPhone(formatted);
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
                <b>Thank you!</b> Your request has been received, we'll contact you shortly.
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label><span>Name</span>
                  <input required type="text" placeholder="What's your name?" /></label>
                <label><span>Email</span>
                  <input required type="email" placeholder="work@company.com" /></label>
                <label><span>Phone</span>
                  <input
                    required type="tel"
                    placeholder="+1 (___) ___-____"
                    value={phone}
                    onChange={handlePhoneChange}
                  /></label>
                <p className="form-panel__promise">
                  We'll call within an hour and prepare a scenario for your process.
                </p>
                <button className="form-panel__submit" type="submit">
                  Submit Request
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

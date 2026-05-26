// Transformations — English version.

const XFORMS = [
  { num: "01", title: "Technical Feasibility Check",
    desc: "Sensei collects data from OSS/BSS, checks ports and routes, and forms a ready answer to the ticket.",
    before: "2-3 days", after: "10 min" },
  { num: "02", title: "L1 Incident Analysis",
    desc: "Context gathering, prioritization, recommendations — automatically. The engineer gets a ready action plan.",
    before: "40 min", after: "5 min" },
  { num: "03", title: "Subscriber Service Routine",
    desc: "Customer card, request history, response preparation — without switching between systems.",
    before: "200+ hrs/mo", after: "20 hrs" },
  { num: "04", title: "Windows Needed per Task",
    desc: "Sensei navigates the systems itself and returns the result to your familiar interface.",
    before: "8 systems", after: "1 chat" },
];

function CustomTaskCard() {
  const [task, setTask] = React.useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem("sensei_custom_task_en");
    if (saved) setTask(saved);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setTask(value);
    localStorage.setItem("sensei_custom_task_en", value);
  };

  const handleSubmit = () => {
    const form = document.getElementById("form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article className="xform xform--custom" style={{ "--i": 4 }}>
      <div className="xform__head">
        <div className="xform__num">05</div>
        <h3 className="xform__title">Your Task</h3>
      </div>
      <p className="xform__desc">Describe your task and we'll explain how Sensei can help solve it</p>
      <textarea
        className="xform__textarea"
        placeholder="Write the task you want to automate..."
        value={task}
        onChange={handleChange}
        rows={4}
      />
      <button className="xform__submit" onClick={handleSubmit}>
        Tell me about the solution
      </button>
    </article>
  );
}

function Transformations() {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const head = section.querySelector(".section__head");
    const stack = section.querySelector(".xforms-stack");
    const cards = stack ? [...stack.querySelectorAll(".xform")] : [];
    const lastCard = cards[cards.length - 1];
    const HEAD_TOP = 110;
    let stackTop = HEAD_TOP;

    const updateStackTop = () => {
      stackTop = HEAD_TOP + head.offsetHeight + 32;
      section.style.setProperty("--xforms-stack-top", `${stackTop}px`);
    };
    updateStackTop();
    window.addEventListener("resize", updateStackTop);

    const onScroll = () => {
      if (!lastCard) return;
      const wrap = head.parentElement;
      const wrapBottom = wrap.getBoundingClientRect().bottom;
      const lastI = cards.length - 1;
      const lastCardStickyTop = stackTop + lastI * 32;
      const threshold = lastCardStickyTop + lastCard.offsetHeight;
      if (wrapBottom < threshold) {
        const delta = threshold - wrapBottom;
        head.style.top = `${HEAD_TOP - delta}px`;
        cards.forEach((card, idx) => { card.style.top = `${stackTop + idx * 32 - delta}px`; });
      } else {
        head.style.top = "";
        cards.forEach(c => { c.style.top = ""; });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateStackTop);
      if (head) head.style.top = "";
      cards.forEach(c => { c.style.top = ""; });
    };
  }, []);

  return (
    <section className="section xforms-section" id="xforms" ref={sectionRef}>
      <div className="container">
        <div className="xforms-wrap">
          <div className="section__head">
            <span className="section__eyebrow">Problems → Solutions</span>
            <h2><span style={{ whiteSpace: "nowrap" }}>What business processes can you</span><br /><em>optimize with Sensei</em></h2>
            <p className="section__sub">
              Every day engineers and operators spend hours on routine tasks that Sensei
              completes in minutes — within your regulations, under your audit.
            </p>
          </div>
          <div className="xforms-stack">
            {XFORMS.map((x, i) => (
              <article key={x.num} className="xform" style={{ "--i": i }}>
                <div className="xform__head">
                  <div className="xform__num">{x.num}</div>
                  <h3 className="xform__title">{x.title}</h3>
                </div>
                <p className="xform__desc">{x.desc}</p>
                <div className="kpi">
                  <div className="kpi__part">
                    <span className="kpi__label">Before</span>
                    <span className="kpi__before">{x.before}</span>
                  </div>
                  <span className="kpi__arrow">→</span>
                  <div className="kpi__part right">
                    <span className="kpi__label">After</span>
                    <span className="kpi__after">{x.after}</span>
                  </div>
                </div>
              </article>
            ))}
            <CustomTaskCard />
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Transformations });

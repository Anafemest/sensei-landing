// Testimonials — English version.

const QUOTES = [
  {
    text: "Technical checks that used to take engineers two to three days are now completed in 10 minutes. Sensei works inside our perimeter — no questions arose from the information security department.",
    photo: "https://i.pravatar.cc/240?u=anton-mironov-cto",
    initials: "AM",
    name: "Anton Mironov",
    role: "Director of Technology",
    company: "SevenSky",
  },
  {
    text: "We launched the pilot in three weeks. From the first week — reduced load on subscriber department operators. The on-premise model resolved all security questions.",
    photo: "https://i.pravatar.cc/240?u=irina-zakharova-cx",
    initials: "IZ",
    name: "Irina Zakharova",
    role: "Head of CX Department",
    company: "Formula Internet",
  },
  {
    text: "Integration with NMS was faster than expected. L1 incidents are analyzed automatically — engineers receive a ready action plan, not a pile of data for manual review.",
    photo: "https://i.pravatar.cc/240?u=sergey-tkachenko-noc",
    initials: "ST",
    name: "Sergey Tkachenko",
    role: "Head of Operations",
    company: "LUBNET",
  },
  {
    text: "We reduced system switches from 8 to 1. One chat — result ready. Saving hundreds of man-hours per month on routine tasks.",
    photo: "https://i.pravatar.cc/240?u=natalia-klimova-ops",
    initials: "NK",
    name: "Natalia Klimova",
    role: "COO",
    company: "ECK Telecom",
  },
];

function Quote({ q }) {
  return (
    <article className="quote">
      <svg className="quote__mark" width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <path d="M0 28V18.7C0 12.5 1.2 7.7 3.5 4.2 5.9.8 9.7-.7 14.7-.4l1 4.4c-3.2.4-5.5 1.7-6.8 4-1.3 2.3-1.8 5.2-1.6 8.8H15V28H0zm21 0V18.7c0-6.2 1.2-11 3.5-14.5C26.9.8 30.7-.7 35.7-.4l1 4.4c-3.2.4-5.5 1.7-6.8 4-1.3 2.3-1.8 5.2-1.6 8.8H36V28H21z"
              fill="currentColor"/>
      </svg>
      <p className="quote__text">{q.text}</p>
      <div className="quote__author">
        <div className="quote__avatar">
          <img src={q.photo} alt={q.name} loading="lazy"
            onError={(e) => {
              const wrap = e.currentTarget.parentElement;
              if (wrap) { wrap.classList.add("quote__avatar--fallback"); wrap.textContent = q.initials; }
            }}
          />
        </div>
        <div className="quote__person">
          <div className="quote__name">{q.name}</div>
          <div className="quote__role">{q.role}, <b>{q.company}</b></div>
        </div>
      </div>
    </article>
  );
}

function Testimonials() {
  const scrollerRef = React.useRef(null);
  const state = React.useRef({ paused: false, dragging: false, x0: 0, sl0: 0, moved: 0 });

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf, last = performance.now();
    const SPEED = 32;
    const tick = (now) => {
      const dt = (now - last) / 1000; last = now;
      if (!state.current.paused && !state.current.dragging) el.scrollLeft += SPEED * dt;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => { state.current.paused = true; };
    const onLeave = () => { state.current.paused = false; };
    const onDown  = (e) => { state.current.dragging = true; state.current.x0 = e.clientX; state.current.sl0 = el.scrollLeft; state.current.moved = 0; el.classList.add("quotes--dragging"); try { el.setPointerCapture(e.pointerId); } catch (_) {} };
    const onMove  = (e) => { if (!state.current.dragging) return; const dx = e.clientX - state.current.x0; state.current.moved = Math.abs(dx); el.scrollLeft = state.current.sl0 - dx; };
    const onUp    = (e) => { if (!state.current.dragging) return; state.current.dragging = false; el.classList.remove("quotes--dragging"); try { el.releasePointerCapture(e.pointerId); } catch (_) {} };
    const onClick = (e) => { if (state.current.moved > 5) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const items = [...QUOTES, ...QUOTES];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Client Reviews</span>
          <h2>What they say after deploying <em>Sensei AI Agent</em></h2>
          <p className="section__sub">
            Stories from telecom operators who have integrated Sensei into their processes —
            from technical checks to subscriber service.
          </p>
        </div>
        <div className="quotes" ref={scrollerRef}>
          {items.map((q, i) => <Quote key={i} q={q} />)}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Testimonials });

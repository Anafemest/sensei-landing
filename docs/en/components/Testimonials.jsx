// Testimonials — English version.

const QUOTES = [
  {
    text: "Network fault diagnostics that used to occupy our NOC team for days now resolve in under 15 minutes. Sensei sits entirely within our infrastructure — our compliance team signed off without a single objection.",
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
    initials: "MB",
    name: "Markus Brenner",
    role: "VP of Network Operations",
    company: "TLV",
  },
  {
    text: "We went from pilot to production in four weeks. Call-centre ticket volume dropped by 40% in the first month — Sensei handles routine subscriber queries before they even reach an agent.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SL",
    name: "Sophie Leclercq",
    role: "Head of Customer Experience",
    company: "EuLink",
  },
  {
    text: "OSS/BSS integration was smoother than any vendor tool we have deployed in the past five years. Incident correlation across three systems now happens automatically — engineers get a clear action plan, not raw logs.",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    initials: "RC",
    name: "Rafael Costa",
    role: "Director of Technology",
    company: "Televo",
  },
  {
    text: "The on-premise deployment model was the deciding factor for us. Data sovereignty is non-negotiable in our region, and Sensei delivered exactly that — no external API calls, no telemetry leaving our perimeter.",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    initials: "AE",
    name: "Anna Eriksson",
    role: "Chief Information Security Officer",
    company: "Eurion",
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

    // ── Auto-scroll loop (rAF) ──
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

    // ── Pause on hover (desktop) ──
    const onEnter = () => { state.current.paused = true; };
    const onLeave = () => { state.current.paused = false; };

    // ── Mouse / stylus drag (pointer events, touch handled separately) ──
    const onDown = (e) => {
      if (e.pointerType === "touch") return;
      state.current.dragging = true; state.current.x0 = e.clientX;
      state.current.sl0 = el.scrollLeft; state.current.moved = 0;
      el.classList.add("quotes--dragging");
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      if (!state.current.dragging) return;
      const dx = e.clientX - state.current.x0;
      state.current.moved = Math.abs(dx); el.scrollLeft = state.current.sl0 - dx;
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") return;
      if (!state.current.dragging) return;
      state.current.dragging = false; el.classList.remove("quotes--dragging");
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    // ── Touch drag (iOS / Android) ──
    let tx0 = 0, ty0 = 0, tsl0 = 0, tDir = null;
    const onTouchStart = (e) => {
      tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY;
      tsl0 = el.scrollLeft; tDir = null;
      state.current.moved = 0; state.current.paused = true;
    };
    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - tx0;
      const dy = e.touches[0].clientY - ty0;
      if (tDir === null) tDir = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      if (tDir === "h") {
        e.preventDefault();
        state.current.dragging = true;
        state.current.moved = Math.abs(dx);
        el.scrollLeft = tsl0 - dx;
      }
    };
    const onTouchEnd = () => {
      state.current.dragging = false; state.current.paused = false; tDir = null;
    };

    const onClick = (e) => { if (state.current.moved > 5) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener("pointerenter",  onEnter);
    el.addEventListener("pointerleave",  onLeave);
    el.addEventListener("pointerdown",   onDown);
    el.addEventListener("pointermove",   onMove);
    el.addEventListener("pointerup",     onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("touchstart",    onTouchStart, { passive: true });
    el.addEventListener("touchmove",     onTouchMove,  { passive: false });
    el.addEventListener("touchend",      onTouchEnd);
    el.addEventListener("touchcancel",   onTouchEnd);
    el.addEventListener("click",         onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter",  onEnter);
      el.removeEventListener("pointerleave",  onLeave);
      el.removeEventListener("pointerdown",   onDown);
      el.removeEventListener("pointermove",   onMove);
      el.removeEventListener("pointerup",     onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("touchstart",    onTouchStart);
      el.removeEventListener("touchmove",     onTouchMove);
      el.removeEventListener("touchend",      onTouchEnd);
      el.removeEventListener("touchcancel",   onTouchEnd);
      el.removeEventListener("click",         onClick, true);
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

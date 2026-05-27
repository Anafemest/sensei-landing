// Testimonials — client quotes for social proof.
// 2×2 grid, large quote on top, avatar+author below.

const QUOTES = [
  {
    text: "Техпроверки, которые занимали у инженеров два-три дня, теперь закрываются за 10 минут. Sensei работает внутри нашего контура — вопросов к ИБ не возникло.",
    photo: "https://randomuser.me/api/portraits/men/42.jpg",
    initials: "АМ",
    name: "Антон Миронов",
    role: "Директор по технологиям",
    company: "СевенСкай",
  },
  {
    text: "Пилот запустили за три недели. С первой недели — снижение нагрузки на операторов абонентского отдела. On-premise закрыл все вопросы безопасности.",
    photo: "https://randomuser.me/api/portraits/women/31.jpg",
    initials: "ИЗ",
    name: "Ирина Захарова",
    role: "Руководитель CX-департамента",
    company: "Формула интернета",
  },
  {
    text: "Интеграция с NMS прошла быстрее ожиданий. Инциденты L1 разбираются автоматически — инженеры получают готовый план, а не кипу данных для ручного анализа.",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    initials: "СТ",
    name: "Сергей Ткаченко",
    role: "Начальник службы эксплуатации",
    company: "LUBNET",
  },
  {
    text: "Сократили переключения между системами с 8 до 1. Один чат — результат готов. Экономим сотни человеко-часов в месяц на рутине.",
    photo: "https://randomuser.me/api/portraits/women/58.jpg",
    initials: "НК",
    name: "Наталья Климова",
    role: "Операционный директор",
    company: "ECK Telecom",
  },
];

function Quote({ q }) {
  return (
    <article className="quote">
      <svg className="quote__mark" width="36" height="28" viewBox="0 0 36 28"
           fill="none" aria-hidden="true">
        <path d="M0 28V18.7C0 12.5 1.2 7.7 3.5 4.2 5.9.8 9.7-.7 14.7-.4l1 4.4c-3.2.4-5.5 1.7-6.8 4-1.3 2.3-1.8 5.2-1.6 8.8H15V28H0zm21 0V18.7c0-6.2 1.2-11 3.5-14.5C26.9.8 30.7-.7 35.7-.4l1 4.4c-3.2.4-5.5 1.7-6.8 4-1.3 2.3-1.8 5.2-1.6 8.8H36V28H21z"
              fill="currentColor"/>
      </svg>
      <p className="quote__text">{q.text}</p>
      <div className="quote__author">
        <div className="quote__avatar">
          <img
            src={q.photo}
            alt={q.name}
            loading="lazy"
            onError={(e) => {
              // External avatar service blocked — fall back to initials
              // with the same purple gradient as the original design.
              const wrap = e.currentTarget.parentElement;
              if (wrap) {
                wrap.classList.add("quote__avatar--fallback");
                wrap.textContent = q.initials;
              }
            }}
          />
        </div>
        <div className="quote__person">
          <div className="quote__name">{q.name}</div>
          <div className="quote__role">
            {q.role}, <b>{q.company}</b>
          </div>
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
    const SPEED = 32; // px/s
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!state.current.paused && !state.current.dragging) {
        el.scrollLeft += SPEED * dt;
      }
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
      state.current.dragging = true;
      state.current.x0 = e.clientX;
      state.current.sl0 = el.scrollLeft;
      state.current.moved = 0;
      el.classList.add("quotes--dragging");
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      if (!state.current.dragging) return;
      const dx = e.clientX - state.current.x0;
      state.current.moved = Math.abs(dx);
      el.scrollLeft = state.current.sl0 - dx;
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") return;
      if (!state.current.dragging) return;
      state.current.dragging = false;
      el.classList.remove("quotes--dragging");
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    // ── Touch drag (iOS / Android) ──
    // Uses native touch events so pointer-event quirks on iOS don't matter.
    // touchmove is non-passive so we can preventDefault() on horizontal swipes
    // and prevent the page from drifting sideways while the user scrolls cards.
    let tx0 = 0, ty0 = 0, tsl0 = 0, tDir = null;
    const onTouchStart = (e) => {
      tx0  = e.touches[0].clientX;
      ty0  = e.touches[0].clientY;
      tsl0 = el.scrollLeft;
      tDir = null;
      state.current.moved  = 0;
      state.current.paused = true;
    };
    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - tx0;
      const dy = e.touches[0].clientY - ty0;
      if (tDir === null) tDir = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      if (tDir === "h") {
        e.preventDefault();                    // block page from scrolling sideways
        state.current.dragging = true;
        state.current.moved    = Math.abs(dx);
        el.scrollLeft          = tsl0 - dx;
      }
    };
    const onTouchEnd = () => {
      state.current.dragging = false;
      state.current.paused   = false;
      tDir = null;
    };

    // Cancel any link/click that fires as a side-effect of a drag.
    const onClickCapture = (e) => {
      if (state.current.moved > 5) { e.preventDefault(); e.stopPropagation(); }
    };

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
    el.addEventListener("click",         onClickCapture, true);

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
      el.removeEventListener("click",         onClickCapture, true);
    };
  }, []);

  // Duplicate the list so the auto-scroll can wrap seamlessly: when
  // scrollLeft passes half the total width, we snap back by half — the
  // user sees the next copy of card 1 with no visible jump.
  const items = [...QUOTES, ...QUOTES];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Отзывы клиентов</span>
          <h2>Что говорят после внедрения <em>ИИ-агента Sensei</em></h2>
          <p className="section__sub">
            Истории от телеком-операторов, которые внедрили Sensei в свои
            процессы — от техпроверок до абонентского сервиса.
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

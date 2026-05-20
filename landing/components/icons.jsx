// Inline SVG icons used across the landing — Lucide style.

const Ico = ({ children, size = 22, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);

const IArrow  = (p) => <Ico {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Ico>;
const IShield = (p) => <Ico {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></Ico>;
const IKey    = (p) => <Ico {...p}><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></Ico>;
const IScroll = (p) => <Ico {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></Ico>;
const ILock   = (p) => <Ico {...p}><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Ico>;
const IZap    = (p) => <Ico {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></Ico>;
const ITrend  = (p) => <Ico {...p}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></Ico>;
const IClock  = (p) => <Ico {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ico>;
const ILayout = (p) => <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></Ico>;
const IMsg    = (p) => <Ico {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Ico>;
const INet    = (p) => <Ico {...p}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></Ico>;
const IUsers  = (p) => <Ico {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Ico>;
const ICheck  = (p) => <Ico {...p}><path d="M20 6 9 17l-5-5"/></Ico>;
const ITicket = (p) => <Ico {...p}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></Ico>;

Object.assign(window, {
  IArrow, IShield, IKey, IScroll, ILock, IZap, ITrend, IClock,
  ILayout, IMsg, INet, IUsers, ICheck, ITicket,
});

// Brand mark + wordmark — a small AI-flavored glyph with a rotating
// satellite dot to feel "alive". Use <Brand /> wherever you'd otherwise
// write "Sensei." in markup.

function Brand({ size = 28, className = "" }) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <svg
        className="brand-mark"
        width={size} height={size}
        viewBox="0 0 32 32"
        aria-hidden="true">
        
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b78aff" />
            <stop offset="55%" stopColor="#6a35f4" />
            <stop offset="100%" stopColor="#2f0d89" />
          </linearGradient>
          <radialGradient id="brandGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(183,138,255,0.55)" />
            <stop offset="100%" stopColor="rgba(183,138,255,0)" />
          </radialGradient>
        </defs>

        {/* Soft outer aura */}
        <circle cx="16" cy="16" r="16" fill="url(#brandGlow)" />

        {/* Outer perimeter ring */}
        <circle cx="16" cy="16" r="13" fill="none"
        stroke="rgba(106,53,244,0.32)" strokeWidth="1"
        strokeDasharray="1.8 2.6" />

        {/* Inner orbit */}
        <circle cx="16" cy="16" r="9" fill="none"
        stroke="rgba(106,53,244,0.55)" strokeWidth="1" />

        {/* Agent core */}
        <circle cx="16" cy="16" r="5" fill="url(#brandGrad)" />
        {/* Specular highlight */}
        <circle cx="14.4" cy="14" r="1.4" fill="rgba(255,255,255,0.55)" />

        {/* Satellite — rotates around the core */}
        <g className="brand-mark__sat">
          <circle cx="25" cy="16" r="1.7" fill="#b78aff" />
        </g>
      </svg>
      <span className="brand-word">
        Sensei<span className="brand-word__dot" style={{ color: "rgb(57, 86, 235)" }}>.</span>
      </span>
    </span>);

}

Object.assign(window, { Brand });
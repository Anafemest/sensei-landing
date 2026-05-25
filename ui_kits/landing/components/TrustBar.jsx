// Marquee strip of trust statements just under the hero.

function TrustBar() {
  // Duplicate items so the marquee loop is seamless.
  const items = [...trustItems, ...trustItems];
  return (
    <div className="trust-bar" id="audience">
      <div className="trust-bar__track">
        {items.map((item, i) => (
          <span key={i} className="trust-bar__item">{item}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TrustBar });

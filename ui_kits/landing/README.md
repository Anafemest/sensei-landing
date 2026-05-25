# Sensei — Landing UI Kit

A hi-fi React recreation of the Sensei marketing landing page (`sensei-landing-main/`, the Astro source). It runs entirely client-side via `<script type="text/babel">`, no build step.

## Run

Open `index.html` in any modern browser. That's it.

## Files

```
index.html         Mount point — loads React/Babel and stitches sections together.
styles.css         Distilled production stylesheet (subset of the site's global.css).
components/
  icons.jsx        Lucide-style stroke icons (currentColor, 2px, round caps/joins).
  data.jsx         Content data — trust items, pains, how-it-works, industries, etc.
  SiteHeader.jsx   Fixed nav, shrinks on scroll. Mobile menu omitted (use CSS).
  Hero.jsx         Hero (with stand-in CSS "orb" for the Three.js scene) + HeroSummary block.
  TrustBar.jsx     50s marquee strip.
  Services.jsx     5 service cards + featured Sensei tile + dark callout below.
  Pains.jsx        Sticky pain stack — scrolling activates the topmost visible card.
  Bridge.jsx       "Было / Стало с Sensei" block, connected by an arrow.
  HowItWorks.jsx   4-step timeline; click a step to activate it.
  Industries.jsx   Split block with purple panel and clickable industry tags.
  Security.jsx     3 designer-variant security tiles with S-NN index pills.
  LeadForm.jsx     The dark demo-footer form with fake submit + success state.
  SiteFooter.jsx   Dark navy footer with 4 columns.
```

## What's faithful

- All colors, gradients, radii, shadows, and easing come from the live production tokens (`sensei-landing-main/src/styles/tokens.css`).
- Section composition order matches `src/pages/index.astro`.
- All Russian copy is copied verbatim from `src/content/home.ts` and the Astro components.
- The pain-stack sticky behaviour, timeline activation, and form success path are functionally close to the originals.

## What's stylised (and the trade-offs)

- **3D hero scene → CSS orb.** Production renders a `three.js` particle/sphere via `three-hero.ts`. The kit ships a multi-layered radial-gradient orb that animates float + slow rotation. The orb is decorative; replace with a real Three.js mount if you need pixel parity.
- **Network-bg canvas → omitted.** Production has a fixed-position WebGL particle network at 50% opacity behind the page (`#network-bg`, `network-bg.ts`). Omitted here — the hero gradient carries enough visual weight at the kit scale.
- **Lenis smooth-scroll → native scroll.** Production wraps everything in Lenis with custom easing. Skipped — scroll-into-view, sticky positioning and IntersectionObserver-driven reveals work fine without it.
- **Counter animations → static numbers.** Production counts each KPI from 0 on enter. The static values still read correctly; add a counter hook if you want the motion.
- **Mobile menu → nav hidden under 1080px.** Production has a hamburger toggle and a full-screen overlay; the kit currently hides the nav at narrow widths.

## Reusing pieces

Every component reads from `window` globals (icons, data) — so individual sections can be swapped in/out of `App` without breaking anything. The CSS imports `../../colors_and_type.css`, so the same tokens drive both the kit and any other prototype in this project.

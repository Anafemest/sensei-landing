# Sensei Design System

> ИИ-сотрудник внутри контура компании — Sensei is a Russian-language B2B AI platform that places a "virtual employee" inside an enterprise's secure perimeter, automating telecom and back-office processes (technical checks, incidents, billing, KYC/AML, etc.) across CRM, OSS/BSS, NMS and ticketing systems.

This folder is the reusable design system for Sensei — typography, color, motion, components and a high-fidelity recreation of the marketing site. Drop it into any prototype, mock or production project that needs to look and feel like Sensei.

---

## Sources

This system was built from two upstream sources, both attached to the project but **not redistributed here**:

| Source | What it is | How to access |
|---|---|---|
| `Sensei — Design System & Landing.fig` | Figma file with tokens, atoms and one landing layout (4 pages, 24 frames). Includes Design-Tokens, Components, Landing-Page, Backlog. | Mounted Figma virtual filesystem — paths under `/Design-Tokens/`, `/Components/`, `/Landing-Page/`. |
| `sensei-landing-main/` | Astro 5 + Tailwind static site (the production marketing landing). Russian copy, `tokens.css`, `global.css`, structured content under `src/content/`. | Mounted under `sensei-landing-main/` via File System Access. |

The codebase is the **source of truth** when Figma and code disagree (the Figma pseudocode was reconstructed from a binary and approximates a few things). Both confirm the same tokens.

---

## What's in this folder

```
README.md                  ← you are here — context, content & visual rules, iconography
SKILL.md                   ← agent skill entrypoint (Claude Code compatible)
colors_and_type.css        ← CSS custom properties: colors, type scale, radii, shadows, easing
preview/                   ← design-system review cards (palettes, type specimens, components)
assets/                    ← logos, og-image, illustrations
ui_kits/
  landing/                 ← high-fidelity recreation of the marketing site (Astro → static HTML)
    index.html             ← landing-page preview, full home flow
    components/*.jsx       ← per-section React components
slides/                    ← (not created — no slide template provided)
```

Open any HTML file in this folder to see the design system rendered. The cards in `preview/` are also surfaced in the **Design System tab** of this project.

---

## Brand at a glance

- **Name:** Sensei (with a period — `Sensei.`)
- **Tagline:** "Виртуальный сотрудник внутри контура компании" (A virtual employee inside your company's perimeter)
- **Audience:** Russian telecom operators and large enterprise (finance, healthcare, retail, logistics, manufacturing). Decision-makers + engineering.
- **Primary language:** Russian. All product copy, nav, CTAs, form labels are Russian. English appears only in technical terms (KYC/AML, on-premise, OSS/BSS, SLA, NetBox).
- **Personality:** Professional, technical, confident. Reassuring on security. No emoji, no informality, no marketing fluff.

---

## CONTENT FUNDAMENTALS

### Voice & tone
Sensei addresses a sophisticated B2B buyer who is allergic to fluff. Copy is **calm, declarative, technical, and outcome-oriented**. It assumes the reader knows what a "тикет," "контур," "регламент" or "OSS/BSS" is and doesn't over-explain. Every section earns its place by promising a measurable improvement (minutes vs. days, hours saved per month, % of routine eliminated).

### Casing
- Russian sentence-case throughout, including H1/H2 ("Просто. Быстро. Безопасно.", not "Просто. быстро. безопасно.").
- Proper nouns and product name stay capitalised: **Sensei**, **NetBox**, **OSS/BSS**, **CRM**, **NMS**.
- Eyebrow labels above sections are ALL CAPS in code but rendered with `text-transform: uppercase` and tight letter-spacing (e.g. `ПРОБЛЕМЫ И РЕШЕНИЯ`).

### Pronouns
- **"Вы" (formal you)** to the customer. Never "ты." Examples: «Вы ставите задачу», «Вы получаете готовый результат».
- **"Мы"** for the Sensei team. «Мы создаём ИИ-инструменты», «Мы разрабатываем решения».
- The product itself is referenced in 3rd person as **Sensei** (no quotes, no italics). «Sensei подключается к вашим системам.»

### Sentence patterns
- Short sentences, often one clause. Periods, not commas, are the default joiner.
- **Three-word section heads** are a recurring rhythmic device: «Просто. Быстро. Безопасно.»
- **Before/after pairs** are the dominant content shape — pain → outcome, "Было" → "Стало". Numbers are concrete: «2-3 дня → 10 мин», «40 мин → 5 мин», «8 систем → 1 чат».
- **Bulleted capability lists** are 3–5 items, all phrased as noun phrases or verb-initiated actions: «Проверка техвозможности», «Автоматический сбор контекста», «Обработка типовых инцидентов».

### Numbers, units, arrows
- Numbers are written as digits, including "01", "02", "03", "04" for step labels (always two-digit, with leading zero).
- Time units stay in Russian: `мин`, `ч`, `дн`, `дня/дней`.
- The right-arrow `→` is the workhorse glyph: separates before/after KPIs, ends CTA buttons, links sections («Сценарии →»).

### Emoji & symbols
- **No emoji.** Anywhere. This is enforced in the iconography section below.
- A small number of geometric Unicode glyphs (`▣ ◔ ☻ ⚗ ◐`) appear once, as decorative service-card icons in `content/home.ts`. Treat them as a quirk of the existing site; for new work prefer the Lucide SVGs already used in `LeadForm.astro` and the security cards.

### Examples

> «Решаем реальные задачи телекома за минуты, а не дни.»

> «Sensei подключается к вашим системам. Все интеграции внутри защищённого контура вашей компании.»

> «100% данных остаётся внутри вашей инфраструктуры»

> «Sensei — главный фокус, но подход масштабируется на любую отрасль.»

---

## VISUAL FOUNDATIONS

### Color
A purple-led palette with deep ink + a single teal "safe" accent. There is **one signature purple** (`#6a35f4`, used 89× in Figma) — every other shade is a darker/lighter shift of it. Cool-blue accents (`#3158e9`, `#4e67ff`) appear sparingly. There is **no warm color in the brand** — no orange, no red, no yellow. Status comes from teal (`--safe #0f766e`) for "data stays in your perimeter" affordances and from `--muted` ink for everything else.

Light sections use `--surface #fff` or `--surface-2 #e9eef7`. Dark sections use a near-black-to-purple gradient (`--grad-hero-bg`, `--grad-dark-bg`) — the hero, the demo footer, the "platform of a new generation" callout. Internal pages (`page-main--internal`) put a glassmorphic hero panel (white, 6% alpha, 1px white-14 border, blur 10) over the dark gradient.

### Typography
**Inter** for everything. Weights in use: 400 (body), 500 (small labels), 600/700 (UI labels, buttons), 800 (h2/h3), 800/900 (h1). The Figma file shows "Segoe UI" because Inter wasn't embedded in the binary, but `tailwind.config.mjs` and `global.css` both target an Inter-led stack with Segoe UI as a system fallback. **In this design system we use Inter as the canonical face** (loaded from Google Fonts in `colors_and_type.css`).

Heading sizes are fluid (`clamp(3rem, 6vw, 5.1rem)` for h1) and headlines run **negative letter-spacing −0.04em** to look tight and confident. Body is `1.05rem` at `line-height: 1.6`, muted (`#5f667f`) by default. Numbers use `font-variant-numeric: tabular-nums` so KPI before/after pairs line up.

### Spacing & layout
Container is `min(1200px, 100% - 48px)` for content; a wider `1360px` shell wraps the header. Sections are `padding: 86px 0`. Cards are `padding: 32–36px`. Radii cluster around **14 / 20 / 30 / 34px** — small for buttons/chips/inputs, larger for cards and hero panels. No square corners anywhere.

### Backgrounds
- **Light pages:** plain `--surface` or `--surface-2`.
- **Hero & dark blocks:** layered `radial-gradient`s in purples and lavenders over a diagonal linear gradient, near-black → deep purple → magenta. Several layers of small high-alpha radials create the "starburst" highlight you see behind the hero.
- **Internal page hero:** the same dark gradient with three radials, plus a glassmorphic content panel (`rgba(255,255,255,0.06)` + 10px blur + 1px white border).
- **Network bg canvas:** a fixed-position WebGL canvas at 50% opacity sits behind everything (`#network-bg`). It animates a particle network. Decorative; never carries content.
- Hand-drawn illustrations: **none.** Repeating patterns/textures: **none.** Photography: **none in the marketing landing** — the only raster image is the og-image fallback.

### Animation & motion
- **Easing:** `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` and `--ease-out-quart` are used everywhere. Linear easing is forbidden by convention.
- **Reveals:** sections fade up 30px on scroll (`[data-reveal]` → `.revealed`, 0.7s ease-out-expo). Staggered children use `data-reveal-delay="1|2|3|4"` (0.1s steps).
- **Hover lifts:** cards `translateY(-3px to -6px)` and gain a deeper shadow. Buttons `translateY(-2px)` + stronger glow. Sticky pain-stack cards "pop" with `translateY(-8px) scale(1.015)` when active.
- **Counters:** KPI numbers ("10 мин", "5 мин") count up from 0 when scrolled into view.
- **Marquee:** trust bar items scroll horizontally at 50s/loop, paused under `prefers-reduced-motion`.
- **Hero 3D:** a Three.js scene (`three-hero.ts`) and a Lenis smooth-scroll layer add subtle parallax. Decorative.

### Hover & press states
- **Buttons:** primary lifts (`-2px`) + shadow deepens; secondary brightens border and adds 8% white wash; ghost gains a 4% purple wash and a purple border.
- **Cards:** translate up 3–6px, border darkens from `rgba(106,53,244,0.12)` to `0.24–0.34`, shadow grows.
- **Links in nav:** color shifts from `rgba(243,245,255,0.9)` to pure `#fff`.
- **Inputs focus:** `border-color: var(--primary)` + a 3px outer ring `rgba(106,53,244,0.10)`.
- **Press states are not explicitly styled** — `:active` falls through to the hover state. (Flag: could be added as `transform: translateY(0); transition-duration: 0.1s` to give buttons a more tactile feel.)

### Borders, shadows, elevation
Borders are **always purple-tinted at low alpha**: `rgba(106,53,244,0.12)` for default, `0.24–0.30` for focus / hover. Dark sections use white at `0.10–0.16`. There is no neutral grey border anywhere.

Three elevations:
1. `--shadow-card` — `0 12px 40px rgba(106,53,244,0.08)` — every card.
2. `--shadow-form` — `0 24px 80px rgba(106,53,244,0.12)` — the lead form, primary panels.
3. `--shadow-glow` — `0 12px 22px rgba(106,53,244,0.32)` — only on the primary button and floating accent dots, where the shadow is meant to feel like a glow.

The dark section's lead form has `box-shadow: 0 20px 56px rgba(12, 7, 50, 0.3)` — same idea, darker tint.

### Transparency & blur
Used **only** in two places:
- The hero metric tiles: `background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(12px)`.
- The internal-page hero panel: `rgba(255,255,255,0.06)` + `backdrop-filter: blur(10px)`.

Never use blur on light backgrounds.

### Capsules vs. protection gradients
"Eyebrow" section labels use a 28×3px gradient bar (`--grad-primary`) as the protection device, not a full pill. Filter chips (`<span class="chip">`) are full pills (`border-radius: 14px`, purple `8%` tint). Tag pills on dark backgrounds are white-92% with purple-600 text. The 404 code is a full `border-radius: 999px` pill with a subtle purple wash + border + glow.

### Imagery vibe
None in production — but where placeholder imagery is needed in mocks, lean **cool, technical, low-saturation, no people**. Network diagrams, OSS/BSS dashboards, terminal screenshots. Never warm photography. Never AI-rendered humans.

### Corner radii decision tree
- Buttons, chips, inputs, status pills → **14px** (`--radius-sm`)
- KPI tiles, small cards → **20px** (`--radius-md`)
- Service cards, pain cards, primary content cards → **30px** (`--radius-lg`)
- Hero panel, dark section blocks, big featured cards → **34px** (`--radius-xl`)
- Avatar/dot indicators → **999px** (`--radius-pill`)

### Cards
Default light card: `--surface` background, 1px `--border` (purple 12% alpha), `--radius-lg` (30px), `--shadow-card`, padding `32px`. On hover: `translateY(-3px)`, border to `0.24` alpha, shadow grows to `0 16px 48px rgba(106,53,244,0.12)`. Some cards (security tiles in `--designer` variant) layer two radial gradients in the corners plus an inner highlight (`inset 0 1px 0 rgba(255,255,255,0.8)`) to feel embossed.

### Layout rules — fixed elements
- Header is `position: fixed; top: 12px` and shrinks to a pill-rounded dark bar when scrolled. Background changes from transparent (on homepage) to `#141d4b` (on internal pages or once scrolled).
- The lead-form section is full-bleed (`demo-footer-wrap`) and ignores the page container — its dark gradient runs edge to edge.
- The Three.js network canvas is `position: fixed; inset: 0; z-index: 0; opacity: 0.5` — sits behind every page.

---

## ICONOGRAPHY

Sensei has **no proprietary icon font**. Icons are inline SVGs, drawn in the **Lucide** vocabulary (24×24 viewBox, 2px stroke, round caps and joins, no fill). Examples sit in `src/content/home.ts` (`arrowRight`, `shield`, `key`, `scroll`) and `src/components/blocks/LeadForm.astro` (`lock`, `bolt`, `chart`).

This system follows the codebase's existing approach:

- **Use Lucide icons by default** — they match the existing SVGs pixel-perfect and are CDN-available. The UI kit pulls them from `https://unpkg.com/lucide-static@latest` when needed.
- **Stroke icons only** — 2px, currentColor stroke, no fills, round caps. Avoid filled icons; they feel off-brand against the airy purple typography.
- **No emoji.** Never as a section icon, never inline in copy. The five Unicode glyphs (`▣ ◔ ☻ ⚗ ◐`) in `content/home.ts` are legacy decorative dingbats and should be replaced with Lucide equivalents in new work (flagged as a substitution opportunity).
- **Logo:** the wordmark is **set in type** — `Sensei` in Inter 800/22px white, followed by a purple `.`. There is no separate logomark image. The only raster brand asset is the OG image (`assets/og-image.png`) and its SVG twin (`assets/og-image.svg`).

### Icon container conventions
When an icon sits inside a UI affordance, it gets a square-rounded container:
- **48×48px** + `border-radius: 14px` + 8% purple bg + purple stroke — service cards.
- **56×56px** + `border-radius: 18px` + soft purple gradient bg — security tiles.
- **62×62px** + `border-radius: 18px` + dual-radial + 1px purple border + inset white highlight — security tiles in the "designer" variant.
- **44×44px** + `border-radius: 12px` + white bg + accent-blue stroke — demo footer benefit icons.

### Number badges
The pain-section numbers (`01`, `02`, `03`, `04`) are **rendered as their own iconography**: 44×44 squares with `border-radius: 14px`, `--grad-primary` background, white 800-weight digit. They double as visual rhythm markers between content blocks.

---

## Manifest / Index

| Path | What |
|---|---|
| [`README.md`](./README.md) | This file. Brand context, content rules, visual foundations, iconography. |
| [`SKILL.md`](./SKILL.md) | Agent skill entrypoint, Claude-Code compatible. |
| [`colors_and_type.css`](./colors_and_type.css) | CSS custom properties — drop into any page. |
| [`assets/og-image.png`](./assets/og-image.png) | Open-graph fallback image. |
| [`assets/og-image.svg`](./assets/og-image.svg) | OG image as SVG (editable). |
| [`preview/*.html`](./preview/) | Review cards for the Design System tab. |
| [`ui_kits/landing/index.html`](./ui_kits/landing/index.html) | Landing-page recreation (single product surface in scope). |

### What's NOT included (yet)
- No mobile / native app surface — Sensei is a marketing landing, no app exists in the provided sources.
- No slide template — no decks were provided.
- No icon SVG sprite — the system uses inline Lucide SVGs straight from the source code.
- No dark-theme variant of cards — the codebase has a `page-main--internal` mode that flips the hero dark but keeps cards light. Documented in Visual Foundations.

### Font substitution flag

The Figma binary reports **Segoe UI** as its top font (because Inter wasn't embedded). The codebase (`tailwind.config.mjs`, `global.css`) ships an Inter-led stack with Segoe UI as a system fallback, and OG image text uses **Manrope**. **This system canonicalises Inter** as the brand face (loaded from Google Fonts). If the brand team has a self-hosted Inter (or wants Manrope-on-OG to win), drop the `.woff2` files into `fonts/` and update `colors_and_type.css`.

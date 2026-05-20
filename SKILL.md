---
name: sensei-design
description: Use this skill to generate well-branded interfaces and assets for Sensei, either for production or throwaway prototypes / mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Sensei is a Russian-language B2B AI platform — a virtual employee that lives inside an enterprise's secure perimeter and automates telecom and back-office processes.
user-invocable: true
---

# Sensei design skill

Read the [`README.md`](./README.md) file within this skill, and explore the other available files. It carries the brand context, content rules (Russian, formal "Вы," no emoji, before/after KPI cadence), visual foundations (single-purple palette, Inter typography, purple-tinted shadows, fluid clamp-based type), and iconography conventions (Lucide stroke icons, no proprietary set).

Key files at a glance:

| File | What it is |
|---|---|
| `README.md` | Full brand brief — content fundamentals, visual foundations, iconography. |
| `colors_and_type.css` | CSS custom properties for colors, type, radii, shadows, easing. Drop into any page. |
| `preview/*.html` | One-glance review cards for every token cluster and component. |
| `ui_kits/landing/` | High-fidelity React recreation of the marketing landing page with reusable section components. |
| `assets/` | Brand assets: OG image (PNG + SVG). The wordmark is type-set, not an image. |

If creating **visual artifacts** (slides, mocks, throwaway prototypes, marketing pages):

- Copy `colors_and_type.css` into the new file's directory and `<link>` to it. Don't redeclare tokens.
- Copy any `assets/` you need (logos, OG images) into the new file's directory.
- Lift section patterns from `ui_kits/landing/components/*.jsx`. The kit's components (`Hero`, `Services`, `Pains`, `HowItWorks`, `Industries`, `Security`, `LeadForm`, etc.) are factored to be portable — they read content data from `window` globals, so dropping them into a new prototype is mostly a matter of providing the data.
- Russian copy is the default. Use formal "Вы". Write in the cadence described in README — declarative, technical, three-word section heads (`Просто. Быстро. Безопасно.`), before/after KPI pairs.

If working on **production code** (extending the actual Astro site under `sensei-landing-main/`):

- Match the existing tokens in `src/styles/tokens.css` exactly — do not invent new colors or radii.
- Section components live in `src/components/home/` and `src/components/layout/`. New marketing pages should compose existing sections wherever possible.
- Stroke icons use the Lucide vocabulary (24×24, 2px stroke, `currentColor`). For new icons, copy the JSX from `src/content/home.ts:homeSvg` or pull from the upstream Lucide library.

## When invoked without other guidance

Ask what to build or design. Probe:

1. **Output type** — landing section, full page, slide deck, mock-up, social asset?
2. **Audience** — engineering buyer? operations manager? executive sponsor?
3. **Tone** — feature announcement, security reassurance, case study, sales follow-up?
4. **Language** — Russian (default) or English (rare; for international decks)?
5. **Length & density** — single hero block? full long-scroll? slide count?

Then act as the design expert: produce HTML artifacts that drop into this project, **or** production code (Astro components) that match the existing patterns.

## Hard rules — do not break

- **No emoji.** Anywhere. The 5 Unicode dingbats in `content/home.ts` are legacy; replace them, don't propagate them.
- **No new colors.** If you need a tint that's not in the system, use `color-mix()` over a defined token rather than introducing a new hex value.
- **No hand-rolled SVG illustrations** of devices, people, or product UIs. The brand has no illustration library; use placeholders or real screenshots instead.
- **Purple-tinted shadows only.** Never grey shadows. `--shadow-card`, `--shadow-form`, `--shadow-glow` are the only three elevations.
- **Inter for type.** Don't introduce Manrope, Roboto, or system stacks. (The OG image uses Manrope — that's an intentional exception, flagged in README.)
- **All section heading patterns:** eyebrow label (gradient bar + uppercase tracking +0.07em) → H2 with one `<span>` in primary → optional supporting paragraph in `--muted`.

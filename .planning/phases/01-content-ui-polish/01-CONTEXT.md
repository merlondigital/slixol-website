# Phase 1: Content & UI Polish - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

The site looks and reads correctly — no brand casing issues, no wrong dashes, CTA feels premium, partners grid is visually clean, footer easter egg is not hair-trigger. This phase covers 7 requirements: CONT-01, CONT-02, HERO-01, HERO-02, PART-01, PART-02, FOOT-01.

</domain>

<decisions>
## Implementation Decisions

### Hero CTA Style
- Remove 3D glass effect entirely (gradient, inset shadows, outer glow span)
- Replace with flat magenta background (solid #ef34ff or similar, no gradient)
- Hover: border glow effect (border transitions to white/30, subtle magenta box-shadow appears) + keep existing scale(1.03)
- Remove the pulsing outer glow span (`absolute -inset-1 rounded-full bg-magenta/30 blur-lg`)
- Keep the arrow icon but simplify — remove the circle background, just the bare SVG arrow

### Partners Grid Fix
- Lower grid pattern opacity from 0.08 to 0.04 in `.bg-grid-pattern` CSS class
- Add `relative z-10` to the logo marquee rows so they visually sit above the grid
- Add top and bottom border to the section: `border-t border-b border-white/8`

### Brand Casing Scope
- All user-facing text "Slixol" → "slixol" lowercase (headings, body, labels, metadata titles, OG tags)
- Logo image alt tags stay as-is (these are image descriptions, not brand text)
- Exception: component names in code (SlixolModel, etc.) stay PascalCase — these are code identifiers

### Claude's Discretion
- Exact magenta shade for flat CTA background
- Hover transition duration and easing
- Grid opacity fine-tuning (0.04 is starting point, adjust if needed)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Button.tsx` — shared button component with variants, but Hero CTA is a custom `motion.a` (not using Button)
- `AnimatedText` — used in PartnerLogos for heading/subtitle
- `SectionLabel` — used in PartnerLogos

### Established Patterns
- Framer Motion `whileHover` and `whileTap` on interactive elements
- `useHydrated()` hook for SSR-safe animations
- CSS custom classes in `globals.css` for shared visual patterns

### Integration Points
- `Hero.tsx:70-106` — CTA button, needs full restyle (remove glow span, simplify glass shell)
- `PartnerLogos.tsx:49` — section has `bg-grid-pattern` class
- `globals.css:146-151` — `.bg-grid-pattern` definition (opacity 0.08)
- `Footer.tsx:66-87` — overscroll logic (already has 3x counter, but may trigger too easily)
- Brand casing: `layout.tsx` (metadata), `PartnerLogos.tsx:63`, `SlixolModel.tsx:143`, `Footer.tsx:190`, `FAQ.tsx:25`, `not-found.tsx:9`, `koszonjuk/page.tsx:6`
- Em-dashes: scattered across FAQ.tsx, Culture.tsx, and other content components

</code_context>

<specifics>
## Specific Ideas

- Client specifically said the 3D CTA button "feels weird" — wants something that reacts on hover instead of looking perpetually 3D
- Client said the partners grid feels like the grid is "in front of" the logos, not behind them
- Client said the grid has a border on top but not on bottom — wants consistency
- Footer overscroll: client says it triggers on first scroll attempt despite code showing 3x threshold — investigate if there's a bug or sensitivity issue

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

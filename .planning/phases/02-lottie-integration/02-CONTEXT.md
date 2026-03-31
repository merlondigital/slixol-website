# Phase 2: Lottie Integration - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Case study cards show purposeful animated visuals instead of image placeholders, without performance regression. Covers CASE-01 (Lottie animations) and CASE-02 (lazy loading).

</domain>

<decisions>
## Implementation Decisions

### Lottie Player Library
- Use `lottie-react` (wrapper around lottie-web/light) — lightweight, React-native API, widely maintained
- Import only the SVG renderer (not canvas/html) to minimize bundle
- Alternative considered: `@lottiefiles/dotlottie-react` — heavier, more features than needed

### Asset Setup
- Extract 4 Lottie JSON files from LOTTIE-20260330T192746Z-3-001.zip to `public/lottie/`
- Name them: `case-1.json`, `case-2.json`, `case-3.json`, `case-4.json`
- Each is ~6-8KB, 1080x1080, 30fps, 4-second loops

### Integration Pattern
- Replace `<ImagePlaceholder>` in CaseStudies.tsx with a Lottie component
- Use `useInView` from framer-motion (already in project) for lazy loading — only fetch+render when section enters viewport
- Lottie files loaded via dynamic import or fetch, NOT statically bundled
- Each case study card gets a `lottieFile` property mapping to its JSON file

### Claude's Discretion
- Exact aspect ratio for Lottie container (currently `aspect-[4/3]` on ImagePlaceholder)
- Whether to create a reusable LottieAnimation component or inline
- Lottie animation speed and loop configuration
- Hover interaction on Lottie (pause/play, speed change, etc.) — optional

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ImagePlaceholder.tsx` — currently renders a gray placeholder, will be replaced
- `useHydrated()` — for SSR-safe rendering
- Framer Motion `useInView` — already used in Consultation.tsx for Calendly lazy loading

### Established Patterns
- Lazy loading pattern in Consultation.tsx: `useInView` with `margin: "0px 0px 2000px 0px"` for early preload
- All components use `"use client"` — Lottie player is inherently client-side
- Dynamic imports via `next/dynamic` used at page level

### Integration Points
- `CaseStudies.tsx:158` — `<ImagePlaceholder className="aspect-[4/3] w-full" />` — replace with Lottie
- `CaseStudies.tsx:10-18` — `CaseStudy` interface needs `lottieFile` field
- `CaseStudies.tsx:20-69` — `caseStudies` array needs file mapping per entry
- `public/lottie/` — new directory for Lottie JSON files

</code_context>

<specifics>
## Specific Ideas

- Client said the 4 Lottie files are "neutrális jelentéssel" (neutral meaning) — they're geometric/abstract, not client-specific
- Client wants to "kipróbálni" (try out) the Lottie approach — if it works visually, keep it

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

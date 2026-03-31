---
phase: 02-lottie-integration
plan: "01"
subsystem: ui
tags: [lottie, lottie-react, animation, framer-motion, lazy-loading]

# Dependency graph
requires: []
provides:
  - "lottie-react installed as runtime dependency"
  - "4 Lottie JSON files in public/lottie/ (case-1 through case-4)"
  - "LottieAnimation.tsx: reusable lazy-loading Lottie wrapper"
  - "CaseStudies.tsx: wired with per-card Lottie animation (ImagePlaceholder removed)"
affects: []

# Tech tracking
tech-stack:
  added: [lottie-react, lottie-web]
  patterns:
    - "fetch-based JSON loading from /public — keeps animation data out of JS bundle"
    - "useInView with 800px margin for viewport-triggered lazy fetch"
    - "Silent error catch in useEffect fetch — blank area acceptable over crash"

key-files:
  created:
    - "public/lottie/case-1.json"
    - "public/lottie/case-2.json"
    - "public/lottie/case-3.json"
    - "public/lottie/case-4.json"
    - "src/app/components/ui/LottieAnimation.tsx"
  modified:
    - "src/app/components/CaseStudies.tsx"
    - "package.json"
    - "package-lock.json"

key-decisions:
  - "lottie-react chosen as Lottie player (lightweight, React-native, maintained)"
  - "fetch() pattern over static import — JSON files stay out of JS bundle (CASE-02 compliance)"
  - "800px preload margin — balanced between performance and seamless UX"
  - "aspect-square (1:1) instead of aspect-[4/3] — matches 1080x1080 animation dimensions"
  - "loop=true autoplay=true — 4-second geometric loops, always playing"
  - "No hover interaction on Lottie — deferred per project CONTEXT.md"

patterns-established:
  - "LottieAnimation pattern: useInView trigger + fetch in useEffect = lazy-loaded Lottie"
  - "Placeholder div shown while fetching (matches card background), no spinner"

requirements-completed: [CASE-01, CASE-02]

# Metrics
duration: 2min
completed: 2026-03-31
---

# Phase 02 Plan 01: Lottie Integration Summary

**lottie-react installed with 4 case study animations lazy-loaded via fetch+useInView, replacing ImagePlaceholder in all CaseStudies cards**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-31T08:39:27Z
- **Completed:** 2026-03-31T08:41:53Z
- **Tasks:** 2 of 3 (awaiting human-verify checkpoint)
- **Files modified:** 8

## Accomplishments
- Installed lottie-react + lottie-web as runtime dependencies
- Extracted 4 Lottie JSON files (5–8KB each) from ZIP to public/lottie/
- Created LottieAnimation.tsx with viewport-triggered lazy fetch — JSON never bundled
- Updated CaseStudies.tsx: all 4 cards now reference per-card Lottie files, ImagePlaceholder removed
- TypeScript passes clean, no new lint errors

## Task Commits

1. **Task 1: Install lottie-react and extract Lottie JSON files** - `cf0f699` (feat)
2. **Task 2: Create LottieAnimation component and wire into CaseStudies** - `6882164` (feat)

_Task 3 is a human-verify checkpoint — no commit._

## Files Created/Modified
- `public/lottie/case-1.json` — Lottie animation for VPT Caravan card (8.4KB)
- `public/lottie/case-2.json` — Lottie animation for Hydropool card (5.4KB)
- `public/lottie/case-3.json` — Lottie animation for Ariston card (6.0KB)
- `public/lottie/case-4.json` — Lottie animation for REHM card (8.3KB)
- `src/app/components/ui/LottieAnimation.tsx` — Reusable lazy Lottie wrapper (useInView + fetch)
- `src/app/components/CaseStudies.tsx` — ImagePlaceholder replaced by LottieAnimation, lottieFile field added
- `package.json` / `package-lock.json` — lottie-react added to dependencies

## Decisions Made
- **fetch() over static import:** Ensures JSON files are served from /public and not bundled into the JS entry chunk — direct CASE-02 compliance
- **800px preload margin:** Large enough to preload before card enters view, small enough to not fetch everything at page load
- **aspect-square:** Lottie files are 1080x1080 — 1:1 ratio avoids distortion
- **Silent error handling:** On fetch failure the card shows a blank dark area, no crash or broken UI

## Deviations from Plan

None — plan executed exactly as written. Pre-existing lint error in `useHydrated.ts` (setState in effect) is out of scope and was not touched.

## Issues Encountered

Pre-existing ESLint error in `src/app/hooks/useHydrated.ts` (react-hooks/set-state-in-effect). This is out of scope — not caused by our changes, not fixed here.

## Known Stubs

None. All 4 LottieAnimation instances reference real JSON files in /public. Animations will render on scroll into viewport.

## Next Phase Readiness

- Human verification required: scroll to Case Studies section in browser and confirm all 4 Lottie animations play
- If animations display correctly, plan is fully complete (CASE-01 + CASE-02 satisfied)
- No blockers for Phase 03

---
*Phase: 02-lottie-integration*
*Completed: 2026-03-31*

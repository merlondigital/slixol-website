---
phase: 03-mobile-ux
plan: 02
subsystem: ui
tags: [react, framer-motion, tailwind, scroll, mobile, animation]

# Dependency graph
requires: []
provides:
  - Mobile scroll-pod showcase in SlixolModel replacing tap-to-expand accordion
  - 5-dot progress indicator tracking activePod state
  - Scroll-driven activePod detection via getBoundingClientRect + viewport center
affects: [03-mobile-ux]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Scroll-driven pod activation via getBoundingClientRect viewport-center proximity
    - Animated dot indicator: active pill (w-5 h-2 bg-blue), inactive circle (w-2 h-2 opacity-30)
    - data-pod-index attribute as scroll target selector

key-files:
  created: []
  modified:
    - src/app/components/SlixolModel.tsx

key-decisions:
  - "All 5 pod cards always visible (no collapse) — user scrolls to advance active state, closest to viewport center wins"
  - "AnimatePresence removed — no longer needed after accordion removal"
  - "Pre-existing useHydrated.ts lint error left in-scope deferred (out of scope for this plan)"

patterns-established:
  - "Scroll proximity pattern: querySelectorAll('[data-pod-index]'), loop over rects, track min abs(elCenter - viewportCenter)"

requirements-completed: [MOB-02]

# Metrics
duration: 2min
completed: 2026-03-31
---

# Phase 03 Plan 02: SlixolModel Mobile Scroll-Pod Summary

**Mobile accordion replaced with viewport-center scroll-driven pod showcase: 5 always-visible cards + animated 5-dot indicator tracking activePod via getBoundingClientRect proximity**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-31T09:12:00Z
- **Completed:** 2026-03-31T09:14:39Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Removed `mobileExpanded` state and `handleMobileToggle` accordion toggle function
- Added `activePod` (number, default 0) driven by window scroll + resize events
- 5-dot mini progress indicator above pod list: active = blue pill (w-5 h-2), inactive = dim circle (w-2 h-2, opacity-30) — animated via Framer Motion
- All 5 pod cards always visible; active card gets `border-blue/30 + bg-dark-surface + blue service tags`; inactive cards are `opacity-60 + elevated-card + dim tags`
- `data-pod-index` attributes enable clean scroll target querying without coupling to DOM structure
- Desktop radial X-diagram completely unchanged (`hidden lg:block` wrapper untouched)

## Task Commits

1. **Task 1: Build scroll-pod mobile section (MOB-02)** - `ca54e8b` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `src/app/components/SlixolModel.tsx` - Replaced mobile accordion with scroll-pod layout; removed AnimatePresence; added activePod state + mobileContainerRef + scroll useEffect

## Decisions Made
- All 5 pods stay visible at all times (no sticky/snap scrolling) — simplest implementation matching client brief "egymás után bemutatjuk az 5 témát"
- Closest pod to viewport center (50%) wins `activePod` — matches HowWeWork pattern
- `AnimatePresence` removed entirely since it was only used by the accordion `exit` animation

## Deviations from Plan

None - plan executed exactly as written.

The plan note about `transition-all duration-400` was already addressed in the plan itself (use `duration-300` instead), which was followed.

## Issues Encountered

Pre-existing `useHydrated.ts` lint error (`react-hooks/set-state-in-effect`) exists in the repo and is unrelated to this plan's changes. `SlixolModel.tsx` itself passes lint with zero errors. Logged as out-of-scope; not fixed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- MOB-02 complete. SlixolModel mobile experience matches client request.
- Phase 03 plan 03 (Services mobile scroll activation) can proceed independently.

## Self-Check: PASSED

- FOUND: src/app/components/SlixolModel.tsx
- FOUND: .planning/phases/03-mobile-ux/03-02-SUMMARY.md
- FOUND commit: ca54e8b

---
*Phase: 03-mobile-ux*
*Completed: 2026-03-31*

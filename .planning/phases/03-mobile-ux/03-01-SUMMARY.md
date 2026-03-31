---
phase: 03-mobile-ux
plan: 01
subsystem: frontend-animations
tags: [mobile, marquee, services, scroll, animation, css]
dependency_graph:
  requires: []
  provides: [mobile-marquee-speed, mobile-service-card-scroll-activation]
  affects: [MarqueeStrip, Services, ServiceCard]
tech_stack:
  added: []
  patterns: [scroll-event-listener, mobile-width-guard, css-media-query-override]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - src/app/components/ServiceCard.tsx
decisions:
  - Mobile marquee speed via CSS media query (max-width:767px) — CSS-only, no JS overhead
  - Scroll activation self-contained in ServiceCard (no prop drilling, no Services.tsx changes)
  - effectiveActive = isHovered || scrollActive — unified visual state for hover and scroll
  - Width guard (window.innerWidth >= 768) prevents scroll activation on desktop
metrics:
  duration: 87s
  completed: 2026-03-31T08:54:21Z
  tasks_completed: 2
  files_modified: 2
---

# Phase 03 Plan 01: Mobile Marquee Speed + Service Card Scroll Activation Summary

**One-liner:** CSS media query speeds up marquee to 6s on mobile; ServiceCard gains self-contained scroll-driven activation (blue border + dot pattern) guarded to < 768px.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Marquee mobile speed (MOB-01) | 1a9065c | src/app/globals.css |
| 2 | Services scroll activation (MOB-03) | f694d8d | src/app/components/ServiceCard.tsx |

## What Was Built

### Task 1: Marquee CSS Override

Added `@media (max-width: 767px) { .animate-marquee { animation-duration: 6s; } }` to `globals.css`. Positioned after `.animate-marquee-reverse` and before the `prefers-reduced-motion` block, so:
- Mobile users see all 3 unique marquee words within ~2 seconds
- Desktop 40s speed unchanged
- `prefers-reduced-motion: reduce` still takes priority (overrides both)

### Task 2: ServiceCard Scroll Activation

Updated `ServiceCard.tsx` with:
- `cardRef` (useRef) attached to outermost `motion.div`
- `scrollActive` state set by a scroll+resize listener
- Width guard: `if (window.innerWidth >= 768) { setScrollActive(false); return; }` — desktop never triggers scroll activation
- Trigger threshold: `rect.top >= 0 && rect.top < window.innerHeight * 0.6` — same pattern as HowWeWork.tsx
- `effectiveActive = isHovered || scrollActive` drives all visual blue states: border color, box shadow, background, left accent line, dot pattern overlay, list item animation
- `ServiceCardProps` interface unchanged — no new external props, fully self-contained
- Desktop hover behavior preserved exactly

## Deviations from Plan

None - plan executed exactly as written. The plan offered two approaches (isActive prop vs self-contained scrollActive) and explicitly preferred the self-contained approach. Implemented as specified.

## Known Stubs

None.

## Verification

- `npx tsc --noEmit` — clean (0 errors)
- `npm run build` — compiled successfully, 7 static pages generated
- Pre-existing lint errors in SlixolModel.tsx (AnimatePresence undefined) and useHydrated.ts (setState in effect) are out of scope — not introduced by this plan

## Self-Check: PASSED

Files exist:
- src/app/globals.css — FOUND
- src/app/components/ServiceCard.tsx — FOUND

Commits exist:
- 1a9065c — feat(03-01): mobile marquee speed override via CSS media query
- f694d8d — feat(03-01): scroll-based service card activation on mobile

---
phase: 02-lottie-integration
verified: 2026-03-31T09:15:00Z
status: human_needed
score: 3/3 automated must-haves verified
human_verification:
  - test: "All 4 case study cards display their assigned Lottie animation (not a grey placeholder)"
    expected: "Each card shows a looping geometric animation matching its brand — no grey placeholder box visible"
    why_human: "Rendering requires a browser with JavaScript enabled; cannot verify Lottie rendering without a live DOM"
  - test: "Lottie JSON files are fetched lazily — appear in Network tab only when case studies section is near viewport"
    expected: "On page load with Network tab open, case-1.json through case-4.json are NOT fetched until user scrolls near the Esettanulmanyok section"
    why_human: "useInView scroll trigger + fetch behavior is runtime-only; cannot be verified by static analysis"
  - test: "No console errors when animations load"
    expected: "Zero errors or warnings in DevTools console related to lottie-react or fetch"
    why_human: "Runtime console output is not observable without a browser"
---

# Phase 2: Lottie Integration Verification Report

**Phase Goal:** Case study cards show purposeful animated visuals instead of image placeholders, without performance regression
**Verified:** 2026-03-31T09:15:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 4 case study cards display a Lottie animation (not a grey placeholder) | ? HUMAN | `LottieAnimation` wired to real `src` props; rendering requires browser |
| 2 | Animations only render/load after the case studies section scrolls into viewport | ? HUMAN | `useInView` + `fetch()` in `useEffect` pattern confirmed in code; actual trigger requires runtime |
| 3 | Lottie JSON files are served from /public, not bundled in the JS entry chunk | ✓ VERIFIED | `fetch(src)` inside `useEffect` — JSON never statically imported; files exist in `public/lottie/` |

**Score:** 1/3 fully verifiable programmatically (truth 3). Truths 1 and 2 require human browser verification.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `public/lottie/case-1.json` | Lottie data for VPT Caravan | ✓ VERIFIED | 8,391 bytes, valid Lottie v5.9.4, 1080x1080, 6 layers |
| `public/lottie/case-2.json` | Lottie data for Hydropool | ✓ VERIFIED | 5,447 bytes, valid Lottie v5.9.4, 1080x1080, 4 layers |
| `public/lottie/case-3.json` | Lottie data for Ariston | ✓ VERIFIED | 6,041 bytes, valid Lottie v5.9.4, 1080x1080, 4 layers |
| `public/lottie/case-4.json` | Lottie data for REHM | ✓ VERIFIED | 8,311 bytes, valid Lottie v5.9.4, 1080x1080, 7 layers |
| `src/app/components/ui/LottieAnimation.tsx` | Reusable lazy Lottie wrapper | ✓ VERIFIED | `"use client"`, `useInView` with 800px margin, `fetch()` in `useEffect`, renders `<Lottie>` on data load |
| `src/app/components/CaseStudies.tsx` | Case studies with Lottie per card | ✓ VERIFIED | `lottieFile: string` in interface, 4 entries with `/lottie/case-N.json`, `LottieAnimation` rendered at line 163 |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `CaseStudies.tsx` | `LottieAnimation.tsx` | `import LottieAnimation from "./ui/LottieAnimation"` | ✓ WIRED | Line 6 of CaseStudies.tsx; used at line 163 with `src={c.lottieFile}` |
| `LottieAnimation.tsx` | `public/lottie/*.json` | `fetch(src)` inside `useEffect` | ✓ WIRED | Lines 20-22: `fetch(src).then(r => r.json()).then(data => setAnimationData(data))` |
| `LottieAnimation.tsx` | `lottie-react` | `import Lottie from "lottie-react"` | ✓ WIRED | Line 5; `lottie-react@^2.4.1` in `package.json` dependencies, installed in `node_modules` |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `LottieAnimation.tsx` | `animationData` | `fetch(src)` where `src = c.lottieFile` | Yes — `c.lottieFile` is `/lottie/case-N.json`, files exist and are valid JSON (8KB, non-trivial Lottie structure) | ✓ FLOWING |
| `CaseStudies.tsx` | `c.lottieFile` | Module-level `caseStudies[]` constant | Yes — 4 entries each with concrete non-empty path string | ✓ FLOWING |

No hollow props: `src={c.lottieFile}` resolves to `/lottie/case-1.json` through `/lottie/case-4.json` — none are `null`, `""`, or `[]`.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Lottie JSON files are valid | `node -e "JSON.parse(...)"` on all 4 files | All parse successfully, all 1080x1080 | ✓ PASS |
| TypeScript compiles clean | `npx tsc --noEmit` | No output (exit 0) | ✓ PASS |
| No new lint errors in phase-2 files | `npm run lint` scoped to LottieAnimation.tsx and CaseStudies.tsx | Zero errors/warnings in phase-2 files | ✓ PASS |
| Lottie render in browser (lazy trigger) | Requires live browser | N/A | ? SKIP — routed to human verification |

Note: The single lint error (`react-hooks/set-state-in-effect`) is in `src/app/hooks/useHydrated.ts` — pre-existing, documented in SUMMARY as out-of-scope, not introduced by this phase.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| CASE-01 | 02-01-PLAN.md | Case study cards display Lottie animations instead of ImagePlaceholder | ✓ SATISFIED (runtime pending) | `ImagePlaceholder` removed from CaseStudies.tsx (zero matches); `LottieAnimation` wired to all 4 cards with real JSON paths |
| CASE-02 | 02-01-PLAN.md | Lottie files are lazy-loaded (not loaded until section approaches viewport) | ✓ SATISFIED (runtime pending) | `fetch(src)` called only inside `useEffect` guarded by `isInView` (800px margin); JSON files not statically imported anywhere |

No orphaned requirements: REQUIREMENTS.md maps only CASE-01 and CASE-02 to Phase 2. Both are claimed by 02-01-PLAN.md.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/app/hooks/useHydrated.ts` | 12 | `setState` called synchronously in effect | ⚠️ Warning | Pre-existing, out-of-scope for this phase — does not affect Lottie integration |

No anti-patterns found in phase-2 files (`LottieAnimation.tsx`, `CaseStudies.tsx`). No TODO/FIXME, no empty returns, no hardcoded empty data.

---

### Human Verification Required

#### 1. Lottie Animations Visible in All 4 Cards

**Test:** Start dev server (`npm run dev`), navigate to http://localhost:3000, scroll to the "Esettanulmányok" section
**Expected:** Each of the 4 cards (VPT Caravan, Hydropool, Ariston, REHM) shows a looping geometric animation — no grey placeholder box
**Why human:** Lottie rendering requires JavaScript execution in a browser DOM; `animationData` is `null` until `fetch()` resolves and `useEffect` fires

#### 2. Lazy Loading Confirmed via Network Tab

**Test:** Open DevTools > Network tab, filter by Fetch/XHR, reload the page. Scroll slowly from the top toward the case studies section.
**Expected:** `case-1.json` through `case-4.json` do NOT appear in the Network tab until the case studies section is within 800px of the viewport
**Why human:** `useInView` scroll trigger behavior is a runtime Intersection Observer event; cannot be simulated by static analysis

#### 3. No Console Errors

**Test:** With DevTools Console open, load and scroll the page
**Expected:** Zero errors or warnings related to lottie-react, fetch failures, or hydration mismatches from the new components
**Why human:** Runtime console output is not observable without a live browser

---

### Gaps Summary

No code gaps found. All automated checks pass:

- 4 Lottie JSON files exist, are valid, and are non-trivially sized (5-8KB each, real animation layers)
- `LottieAnimation.tsx` is substantive (not a stub): `useInView` trigger, `fetch()` pattern, conditional render of `<Lottie>` vs placeholder
- `CaseStudies.tsx` fully wired: `ImagePlaceholder` removed, `LottieAnimation` imported and used at all 4 card render sites
- Data flows from module-level constants through `src` prop to `fetch()` — no empty values in the chain
- `lottie-react@^2.4.1` installed as a runtime dependency
- TypeScript and ESLint both clean for phase-2 files

The only remaining verification is visual/behavioral, requiring a live browser session.

---

_Verified: 2026-03-31T09:15:00Z_
_Verifier: Claude (gsd-verifier)_

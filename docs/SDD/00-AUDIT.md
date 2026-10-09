# Phase 0 — Repository and product audit

**Date:** 2026-10-09  
**Branch:** `feat/sdd-decade-20261009` (branched from `main`)  
**Status:** Static source inspection complete; dynamic browser testing and local build remain unverified.

## Source of truth
- Repository: https://github.com/Krev1/monograph-portfolio
- Production: https://krev1.vercel.app/
- Reference video (user-supplied): https://www.youtube.com/watch?v=mA9z6rS1uMc
- Reference image: user-supplied front photograph (white/beige face, dark circular lens, silver bezel, green indicator, six colored side lenses).
- Earlier blueprint: `docs/DECADE-DRIVER-BLUEPRINT.md`.
- *Video could not be independently played through the available retrieval route.* Do not claim frame-accurate correspondence until reviewed in a suitable video-capable browser.

## Repository inventory (verified by GitHub connector)
| File | Role | Finding |
|---|---|---|
| `package.json` | Dependencies/scripts | Next ^15.5, React ^19.1, TypeScript ^5.7, lucide-react; only dev/build/start scripts |
| `tsconfig.json` | Type checks | `strict: true`, noEmit; Next plugin |
| `src/app/page.tsx` | Home | Renders `DecadeExperience` |
| `src/app/layout.tsx` | Metadata | `robots.index=false` intentionally; language `en` |
| `src/components/decade-experience.tsx` | Main application | ~20KB monolithic client component; pointer event handlers, audio synthesis, Henshin timeouts, ability cards |
| `src/components/decadriver-model.tsx` | Mechanical visual | Separate original SVG face/rotor/tricolor side-light groups |
| `src/app/globals.css` | Styling/motion | Many stacked legacy overrides; hard to reason about specificity and responsive positioning |
| `src/data/site.ts` | Project truth | Three repository-backed projects; SpendWise unfinished; contact URLs not fully configured |
| `README.md` | Onboarding | Describes obsolete multi-section portfolio and resume flow |
| `docs/DECADE-DRIVER-BLUEPRINT.md` | Original design draft | A simpler early state model; must be superseded with verified current design |

## Deployment evidence
GitHub combined-commit status for `577808345f5958424041e4d90785d9fb9fd2b75f` returned Vercel `success` on 2026-10-09. This indicates a successful deployment status for that commit, **not** verified pointer interaction or visual equivalence to the reference.

Earlier production builds failed with TypeScript TS2367 due to overlapping `phase` checks; later commits addressed that error. Prevent recurrence with strict type checks in CI.

Vercel connector permissions in previous attempts returned 403 for workspace `tmtri0910-6726`; direct build logs may remain inaccessible. Use GitHub commit statuses as supporting evidence only, not a replacement for build logs or browser QA.

## Architectural shortcomings — prioritized
**P0**
1. No explicit automated test suite or CI quality gate in `package.json` (only `dev`, `build`, `start`).
2. Gesture/state/animation/rendering/content all live in one `"use client"` component, leading to unsafe coupled transitions.
3. Transient states `opening`, `closing`, `cardDragging`, `inserting`, `reopening` absent or implied, despite blueprint describing mechanical behavior.
4. Project stage currently renders during `transforming` as well as `active`. This risks revealing detailed content before completing Henshin.
5. Multiple overlays and pointer targets may not line up at mobile widths. Needs in-browser coordinate validation.
6. User-provided video has not been reviewed frame-by-frame; actual cam/gearing linkage, asymmetry and sound timings are unverified.

**P1**
7. Old CSS builds up overrides; duplicated rules complicate rendering and performance.
8. Project/card abilities are hardcoded in view component rather than typed source-of-truth.
9. Rendering lacks explicit placeholders for reference uncertainty; visuals are original interpretation, not an accurate licensed replica.
10. Missing documented accessibility and responsive tests; touch and keyboard handlers exist but are unverified.
11. `README.md` is outdated; contact and résumé placeholders must not surface incorrectly.

**P2**
12. No visual regression baselines, performance budget results, or targeted gesture telemetry.
13. Original synthesized WebAudio is opt-in (good) but tests for suspend/resume/device compatibility are absent.

## Technology decision
**Phase 1:** retain Next.js/React/TypeScript; rebuild interaction around a pure, testable reducer and constrained SVG component transforms. SVG is preferable at this stage because there is an existing model and no validated rigged 3D asset.  
**Review gate:** if real cam/hinge geometry cannot read believably in 2D after mechanics tests and recorded previews, prototype a GLB/R3F alternative on a feature branch with performance measurements. Do not introduce Three.js by default.

## Risk register
| ID | Severity | Risk | Mitigation |
|---|---|---|---|
| R01 | Critical | Compile fails after edits | TypeScript/Next build gates |
| R02 | High | Wrong direction or stuck gesture | Pure transition tests, pointer capture/cancel tests |
| R03 | High | Incorrect mechanical resemblance | Reference evidence sheet; geometry review |
| R04 | High | Accessibility dead-end | Keyboard equivalent and readable status updates |
| R05 | High | Multiple-card insertion | state guards and reducer invariants |
| R06 | High | Motion discomfort | reduced-motion variant preserving steps |
| R07 | Medium | Poor mobile drop hit area | screen-coordinate E2E tests |
| R08 | Medium | Copyright/style fidelity confusion | original assets, accurate attribution, rights review |
| R09 | Medium | Unverified claims about AI project | project evidence audit |

## Exit criteria for this audit
- Current files inventoried; risks prioritized: **done (source inspection)**.
- Known Vercel status checked: **done for named commit**, not complete production QA.
- Original video analyzed frame-by-frame: **blocked** until direct access.
- Build/gesture tests executed: **not yet done**.
- Production must remain unchanged until preview passes acceptance gates.

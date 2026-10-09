# Product Requirements Document — KREV1 DECADE DRIVER

**Version:** 0.1 draft, 2026-10-09  
**Owner:** KREV1  
**Status:** Initial specification; needs mechanical reference review and preview sign-off.

## 1. Product vision
Build a single-page, interactive technical portfolio with a Decadriver-inspired mechanical device as the mandatory interface to project details. The site must communicate both UI/UX sensibility and software/AI engineering discipline through the interaction rather than a conventional scrolling marketing site.

**Product thesis:** The main card is the project identity; skill cards show *documented contribution*; transformation is a deliberate, coherent act.

## 2. Audience and jobs to be done
- **Recruiter / hiring manager:** Understand project maturity, technical skills, evidence and links after completing a concise device interaction.
- **Design/engineering peer:** Evaluate gesture interaction, code quality, visual system and coherent transitions.
- **Portfolio owner:** Add verified projects/abilities as data without rewriting mechanical controls.
- **Touch/keyboard/assistive-tech user:** Complete the same logical sequence with a usable alternative interaction.

## 3. Experience invariants
1. One primary homepage; there is no direct project detail list or hidden skip route.
2. Closed/open/loaded/transforming/active/ejecting behavior must be coherent and observable.
3. Content remains hidden until Henshin completion, not just button click.
4. Card cannot be swapped without reopen/eject.
5. Two handles respond symmetrically: left outward = negative X, right outward = positive X; close gesture opposite.
6. Opening rotates central reader toward an exposed top card slot; closing returns it.
7. Driver docks at viewport bottom center after Henshin while the project stage becomes readable.
8. Skills/tools must be project-specific and evidence-based.
9. No copied audio/logo/video assets. All visible illustrations are original unless rights are cleared.
10. Sound is optional and initially off; motion accommodations never remove necessary logical steps.

## 4. MVP scope
- Three repository-backed main cards: SpendWise AI, Learn, KREV1 Portfolio.
- High-fidelity 2D layered SVG mechanical driver with responsive grip hit targets.
- Mouse/touch drag, keyboard equivalent, snap, card-slot hit detection and ejection.
- Single source-of-truth finite state machine with transition guards.
- Deterministic Henshin timeline and post-transformation docking.
- Ability cards, project stage, repository links, truthful progress status.
- CI checks, unit tests, E2E interaction matrix, visual regression checkpoints.

## 5. Explicit non-goals
- Official Kamen Rider merchandise/site.
- Exact copyrighted movie audio/footage, official Rider symbols or character art.
- Multiplayer, payment, employee-operated vending/café workflow or revenue features.
- Full 3D until technical feasibility review passes.
- Automatic publishing of unverified personal details, resume or claims of completed AI systems.
- Permanent retention of project state without a validated need.

## 6. Non-functional expectations
| ID | Expectation |
|---|---|
| NFR-01 | Next.js build and TypeScript strict typecheck pass |
| NFR-02 | Supports pointer, touch, keyboard; no input trap |
| NFR-03 | Honors prefers-reduced-motion for animation duration/intensity |
| NFR-04 | Responsive at 320, 375, 768, 1440, and 1920px |
| NFR-05 | No unlicensed brand assets or audio embedded by default |
| NFR-06 | Interactive device readable at minimum 320px viewport |
| NFR-07 | No page crash on gesture cancellation or rapid repeated input |
| NFR-08 | Project details remain correct even after repeated swaps |
| NFR-09 | Primary interactive graphics efficiently rendered; target responsive 60fps on capable desktop, measured not assumed |
| NFR-10 | Testable reducer and maintainable component boundaries |

## 7. Definition of an acceptable user journey
1. Land on idle; see project card deck and closed Driver.
2. Pull appropriate side grip outward at least the open threshold (or keyboard equivalent).
3. Central face rotates and top slot becomes visibly ready.
4. Drag one vertical project card down to the slot, snap it into the reader.
5. Push a grip inward to close; until fully closed, content is not revealed.
6. Henshin animation finishes; Driver docks; chosen project appears.
7. Choose several ability cards; inspect tools and actual contributions.
8. Reopen Driver; pull existing card up; choose and insert another; complete new Henshin.
9. Repeat without stale state, duplicate active project or inaccessible controls.

## 8. Success and failure metrics
- 100% transition acceptance tests pass locally and in CI preview.
- 100% smoke tests cover all 3 projects and a swap.
- Build, type check and automated tests green before merge.
- No blocking errors in the browser console during automated runs.
- All user-facing text supported by `src/data/site.ts` or verified repository content.
- Interaction instructions legible; accessibility test records keyboard sequence completed.
- Visual quality judged against approved reference screenshots at closed/open/loaded/active.

**Measurement note:** Actual user completion rate, FPS, TTI and satisfaction must be measured via testing; no numbers are asserted yet.

## 9. Product questions requiring explicit sign-off
- How closely should visuals reproduce original Decadriver, given fan-project versus professional portfolio and asset-rights constraints?
- What exact rotating linkage is visible in reference video at each milestone?
- Are ability cards activated through an independent small reader slot or by selection in the active project stage? MVP: selection, future reader possible.
- Should music exist? MVP: optional original synthesized SFX only.

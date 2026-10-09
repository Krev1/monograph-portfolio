# Decade Driver verification — 2026-10-09

## Scope and baseline

Source baseline: `577808345f5958424041e4d90785d9fb9fd2b75f` on `Krev1/monograph-portfolio`.
Story: homepage → open linked handles → vertically insert one project card → inward close → bounded Henshin → active project / ability evidence → reopen with retained card → eject → next project.

## Local quality gates

| Gate                | Actual result                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `npm test`          | **27 tests passed**, 2 suites. Includes a 10,000-event invariant walk.                                                     |
| `npm run typecheck` | Passed with strict TypeScript.                                                                                             |
| `npm run build`     | Passed with Next.js **15.5.27**; homepage statically rendered.                                                             |
| Initial load        | Build reports **115 kB** first-load JS for `/`; no WebGL model, external font or remote request is required for discovery. |
| `npm audit`         | **0 vulnerabilities** after pinning compatible PostCSS **8.5.29**.                                                         |
| Controller cleanup  | A specific scheduled deadline is cleared on unmount; stale run IDs cannot complete a different transition.                 |

Tests exercise guarded loading, wrong direction/travel, cancellation after threshold, cancelled valid-looking card drops, pointer ownership, lost capture, window blur, reduced motion, keyboard/tap equivalence, timed reveal, retained card identity and project switching. Synthetic pointer events test the input controller; they do not constitute physical touchscreen certification.

## Browser evidence

Inspected the production build in the Chromium-based Codex browser. No console errors or warnings were returned during the tested flow. The project stage is absent during the observed transforming state and appears afterward; focus moves to its heading. The AI Baselines ability shows the real repository-pinned implementation link and explicitly identifies unfinished production ML work.

Both a desktop pointer cycle and a 320px pointer insertion / keyboard closure cycle succeeded. Reopening removed the active stage, kept card 001, and Arrow Up ejection returned the device to an empty open state. The automated controller suite separately completes a second cycle with Learn and verifies its title.

| Viewport   | Horizontal overflow                      | Minimum tested handle size                         | Deck bottom → rotor top     |
| ---------- | ---------------------------------------- | -------------------------------------------------- | --------------------------- |
| 320 × 760  | None                                     | 60.8 × 54 px                                       | Visually separated          |
| 390 × 844  | None                                     | 74.1 × 65.8 px                                     | 397.4 → 497.5 px            |
| 768 × 1024 | None                                     | 132.7 × 116.1 px                                   | 435.0 → 593.8 px            |
| 1280 × 720 | None                                     | 152.9 × 133.8 px                                   | 332.0 → 345.7 px            |
| 320 × 568  | None; vertical scrolling on short screen | 60.8 × 54 px                                       | 337.2 → 363.8 px            |
| 1440 × 900 | None                                     | Native pointer opening/insertion/closure exercised | Visual separation confirmed |

The initial card/Driver overlap found during QA was corrected by removing redundant lower instructions and adapting deck height to short viewports. The right grip's three material indicators were corrected to their own hardware position. Screen captures accompany the delivered review artifacts.

## Traceability

Final layout refinement: the active stage scrolls in a bounded region above the dock, rather than behind a fixed Driver. Desktop 1440 × 900 measured stage bottom 667.5 px / Driver top 704.1 px. Mobile 320 × 568 measured stage bottom 402.2 px / Driver top 463.5 px, with document height exactly 568 px and no horizontal overflow. Ability selection brings its panel into this independent scroll region. This layout refinement was locally built and visually checked; its remote checks run on the subsequent review commit.

R01/R06/R09/R12: reducer and controller tests. R03/R04/R05: geometry/controller tests and native browser gestures. R07/R11: milestone and reduced-motion tests. R02/R13: viewport geometry plus visual inspection. R08: project source inspection and evidenced ability interaction. R10: keyboard/tap tests, live status, focus handoff and measured target sizes. R14: local gates above; remote delivery is recorded below.

## Content and reference audit

- SpendWise inspected at `e2221c7de66d0ac676cf3d6936d64c65a930e045`.
- Learn inspected at `134c0128b05e38f143b22bd86e3a3f7557f655e4`.
- Official Toei photo and Bandai manual support the mechanics. The requested YouTube video could not be fetched; video-specific timing remains unverified.
- Original SVG marks, concept visuals and oscillator tones ship with the site. Official reference images/manuals are research inputs only.

## Remote delivery

Target: existing GitHub repository, review branch `feat/decade-driver-sdd`, draft PR against `main`. Production is not automatically merged or replaced.
Vercel project identity was verified through CLI: `tmtri0910-6726/monograph-portfolio`, ID `prj_41vnhMHlpz149ZGqy91SwyFAxjux`, Node 24, Next.js preset. The connector's scoped project-detail request returned 403; the explicitly scoped CLI read succeeded.

Review source commit: `e6d9f6d93d0af2545d4e684ed55b10bd1f10e983`.

- [Draft PR #1](https://github.com/Krev1/monograph-portfolio/pull/1) is open against `main`.
- [Pull request CI run](https://github.com/Krev1/monograph-portfolio/actions/runs/37878798416) and [branch CI run](https://github.com/Krev1/monograph-portfolio/actions/runs/37878785236) both completed with **success**. These include clean-install type checking, all 27 tests and the production build on Linux / Node 24.
- [Vercel preview](https://monograph-portfolio-nhtggpefq-tmtri0910-6726.vercel.app) is **READY**; its build log identifies branch `feat/decade-driver-sdd`, commit `e6d9f6d`, Next.js 15.5.27 and a completed 32-second build. The GitHub Vercel status is **success**.
- An authenticated `vercel curl` read of this exact preview returned **HTTP 200**. Its initial markup is idle and does not mount the project stage.
- Native browser UI testing used the matching local production build. The remote preview redirects an unauthenticated browser to Vercel login; remote UI testing in that browser has not been claimed. The preview link requires Vercel access.
- `main` and the production alias were not merged or promoted. This record documents the tested review source; subsequent evidence-only changes do not alter the implementation.

## Remaining verification limits

Safari/Firefox, physical mobile touchscreen behavior, screen-reader sessions and measured performance on low-end hardware have not been tested in this session. Reduced motion and multi-pointer recovery are covered by automated controller tests. No claim of full WCAG conformance or real-device certification is made.

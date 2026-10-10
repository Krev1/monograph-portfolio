# Decade Driver verification — 2026-10-09

## Scope and baseline

The original implementation evidence is retained below. The current hardware fidelity revision and its new measurements are recorded at the end of this document.

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

## User-requested visual fidelity revision — 2026-10-09

Specified before editing in `docs/VISUAL-FIDELITY.md`, against review commit `02c04693cb08d4ff3523eea8a69b0f2a764caad7`. The hardware now has a wider curved ivory shell, smaller open graphite grips, thin center band, muted translucent color pods, jewel facets, screws, bevels, rail ribs, fine brushed annulus and a reflective lens. Nine small original glyphs replace the repeated star pattern. The card mouth belongs to the rotor and reaches the top on clockwise opening; its closed appearance is concealed. Grip travel now corresponds to 62/940 of the measured scene width, so pointer travel follows the hardware rather than an unrelated distance.

Local gates: all **27 tests** pass after the geometry change; TypeScript passes. The production build reports **117 kB** first-load JavaScript (14.3 kB route) with no additional rendering dependency. The React review confirms a memoized hardware component, instance-unique SVG IDs, unchanged pointer ownership and deadline cleanup, native controls, focus handoffs and reduced-motion equivalents.

Native browser gestures on 390 × 844 completed open → vertical insertion of card 003 → inward closure → active portfolio. A pointer reopen at 320 × 568 removed the stage and preserved card 003. Ability selection automatically brings the panel into the bounded stage. The updated mobile stage shows its description and result above the larger dock. Short initial screens use vertical scrolling and reserve space below the deck for the Driver.

| Viewport   | Deck bottom → hardware top | Handle dimensions / result                             |
| ---------- | -------------------------- | ------------------------------------------------------ |
| 320 × 568  | 337.2 → 367.2 px           | No horizontal overflow; initial document height 650 px |
| 390 × 640  | 369.4 → 399.4 px           | No horizontal overflow; initial document height 710 px |
| 320 × 760  | 365.2 → 452.3 px           | 64.0 × 71.1 px                                         |
| 390 × 844  | 397.4 → 486.3 px           | 78.0 × 86.6 px                                         |
| 768 × 1024 | 435.0 → 549.7 px           | 147.5 × 163.8 px                                       |
| 1280 × 720 | 332.0 → 343.6 px           | 144.0 × 159.9 px                                       |
| 1440 × 900 | 435.0 → 448.0 px           | 172.0 × 191.0 px                                       |

Active 320 × 568: document height remains 568 px; handles are 60.2 × 66.8 px, and the hardware starts at 428.8 px. The stage has been extended safely toward the dock after this measurement. Final production-build screenshots and exact-head CI/preview checks are supplied with the updated delivery report.

F01–F04/F07: photographed closed/open/loaded hardware and directed cycle. F05: existing controller/reducer suite plus native gestures. F06: viewport table, bounded stage and ability selection. F08: production build, type check and source review. The video remains unavailable; exact film mechanics/timing and physical-device tests are not claimed.

## Seated card / circular lens revision — 2026-10-09

Specified before editing in `docs/CARD-READER-FIDELITY.md`, against `1593ec0ebf936b5d0697ebeacb73a4f29011f438`. This section supersedes the earlier protruding-card implementation. The newly supplied YouTube video `1io0g-4Sz3A` was played and inspected around 3:01 and 3:37–3:47; the seated card is enclosed with a small visible section in the upper groove, and its symbol appears on the circular lens. Earlier unavailable-video statements refer to the original `mA9z6rS1uMc` reference, not this new video.

The full original card is drawn behind the casing. Its only seated view is a 65×53 SVG aperture in the left horizontal groove; it rotates to the top when open. A recessed rim, inner shadow and retaining lip hide the card edges. External card artwork exists only during insertion or extraction. The shared ledger, brackets and monogram paths supply both the deck cards and the lens. Reading completes before the lens identifies the card, while project disclosure remains gated by Henshin. The lens symbol counter-rotates with the face and remains upright. Extraction keeps the identity until successful completion; cancellation returns the same card to its enclosed position.

**Local gates:** 31/31 tests pass, including all three card identities before Henshin, through closure/activation/reopening, and clearing after extraction. Cancelled extraction restores the recessed card and its symbol. TypeScript passes. Production build succeeds: 15 kB route / 118 kB first-load JavaScript. No rendering dependency was added. React review: reusable typed symbol paths, memoized hardware, unique SVG definition IDs, retained pointer ownership/deadline cleanup, native keyboard/tap controls and reduced-motion rules.

**Native browser evidence:** The production build completed a desktop pointer opening → downward SpendWise insertion → inward closure → active project. The loaded state had no external transient card; its ledger symbol was visible before Henshin. Reopening retained it, and pulling upward from the groove cleared both displays. Learn changed the lens to brackets. At 390×844, native upward extraction and downward insertion of KREV1 succeeded, and the monogram appeared in the lens. Keyboard closure at 320×568 retained that monogram after Henshin. No console warnings/errors were returned during the tested flow.

| Viewport | Open groove target | Result |
| --- | --- | --- |
| 1440×900 | 120.4×87.5 CSS px | Fully enclosed loaded card; native complete cycle; no horizontal overflow |
| 390×844 | 70.2×44 CSS px | Native extraction and insertion; correct monogram; no horizontal overflow |
| 320×568 | 54.9×44 CSS px | Enclosed card; short-screen scrolling; no horizontal overflow |

Active 320×568: stage bottom 400.8 px, hardware top 428.8 px; the card strip stays inside the left groove and the symbol remains centered. The disabled ejection target is scaled with the active dock; reopening restores its measured open size before extraction is enabled.

C01/C03: open and closed production screenshots plus clipped SVG aperture. C02/C04: three-card controller tests and native switching/extraction. C05/C06: native gestures, regression tests and target measurements above. C07: local gates; exact revision remote checks are recorded in the delivered report. Physical touchscreen devices and other browser engines remain outside the observed test coverage.

## Programming-language face marks — 2026-10-09

Specified before editing in `docs/LANGUAGE-MARKS.md`, against `447117d990ef22485eaf897501ccdc12cf3ae9c4`. All nine old face glyphs are replaced with original typographic marks: PY, JS, TS, C++, C#, JAVA, GO, RS and KT. Compact outline, square, hexagonal and gear badges use dark graphite and ivory. Labels occupy the same nine face regions; small outward adjustments reserve room around the silver annulus. This decorative motif does not add proficiency claims or change evidenced project abilities.

L01/L02: final desktop closed screenshot shows all nine language labels. Conservative distance from each label's screen bounding box to the outer annulus is positive: 4.0–16.5 CSS px at 1440×900. C# was moved outward during QA and now clears it by 7.6 px. The 320×568 closed view has all nine marks and no horizontal overflow; these small hardware inscriptions are decorative rather than primary reading content.

L03: the open reader rotates all marks clockwise with the ivory shell. Inserting KREV1 still produces the centered upright monogram, with card 003 enclosed and no external transient card in the loaded state. Open and closed screenshots were saved from the final local production build; no browser console warnings/errors were observed.

L04: strict TypeScript and production build pass; route JavaScript is 14.8 kB / 118 kB first load. No dependency, external logo image or runtime request was added. Existing mechanical tests run in exact-revision CI; no redundant decorative-mark unit tests were introduced. Remote delivery results are recorded in the accompanying report.

## Card proportions / two-part construction — 2026-10-09

Specified before editing in `docs/CARD-DRIVER-PROPORTIONS.md`, against `6b18cb3fdbe3cb14a37bb531d79b7b797d3aa7a4`. The user directed the video study to 1:15–1:50. At approximately 1:17 the grip carrier is shown without the front reader; at approximately 1:42 detached ivory reading units are shown separately. Bandai's ver.2 specification supplies the 59:86 card aspect ratio and approximate 59/202 card-to-body width calibration, with the version distinction recorded in the specification.

The deck, pointer ghost and reader now share `CardArtwork` and a typed 236×344 physical plane. The same scene scale determines all card dimensions. Pickup preserves the actual pointer anchor; alignment holds the card at the reader entrance before insertion. Extraction converts screen movement to the reader coordinate system. Resize cancels a held gesture before updating the physical scale; the observer disconnects on unmount. The rear carrier and front reader are separate drawing groups. Wider graphite carrier shoulders expose the mounting layer when the ivory reader rotates. The accepted recessed aperture, central project symbol and nine language marks are retained.

**Local gates:** all 35 regression tests pass, including original card position at pickup, two screen scales for exact extraction travel, resize cancellation, shared artwork and observer cleanup. Strict TypeScript and production build pass: 15.7 kB route / 118 kB first-load JavaScript. No rendering dependency or external asset was added. React review confirms stable instance IDs, memoized hardware, cleaned-up observer/listeners, retained pointer ownership/run-token guards and native keyboard/tap controls.

**Final production browser flow:** native desktop handle opening, downward SpendWise insertion, inward closure, Henshin, keyboard reopening and native upward extraction completed successfully. Reading showed ledger in the lens and no external card once loaded; completed extraction cleared both card and lens. At 390×844 native insertion of card 003 produced the monogram. At 320×568 keyboard closure preserved it; the active stage ends at 400.8 px and the hardware starts at 428.8 px, with document height 568 px. No console warnings/errors were observed.

| Viewport | Card W×H (CSS px) | Deck bottom → carrier caption top | Horizontal overflow |
| --- | --- | --- | --- |
| 1440×900 | 171.2×249.5 | 484.5 → 505.4 | None |
| 1280×720 | 120.0×174.9 | 366.9 → 430.6 | None |
| 768×1024 | 180.8×263.5 | 498.5 → 532.7 | None |
| 390×844 | 97.9×142.7 | 360.7 → 464.3 | None |
| 320×760 | 80.3×117.1 | 335.1 → 430.3 | None |
| 390×640 | 97.9×142.7 | 332.7 → 340.7 | None |
| 320×568 | 80.3×117.1 | 307.1 → 315.1 | None |

At these sizes, measured card width differs from `actual scene width × 236/940` by less than 0.02 CSS px; aspect ratio rounds to 0.6860. The open aperture hit target remains 57.6×44 px at 320×568 and 70.2×44 px at 390×844.

Landscape 844×390 keeps a 360px scene and 90.4×131.7px cards rather than shrinking them below usable size. The initial page scrolls vertically (590px document); opening brings both cards and Driver into view. A complete keyboard cycle was exercised. In the final active layout, stage bottom is 263.4 px, hardware top 273.4 px, handle targets 50.4×56.0 px and document height 390 px. The project stage scrolls independently above the larger landscape dock.

P01/P02: measured common scale, reused SVG artwork, pickup/extraction/resize tests and native pointer cycle. P03: fixed carrier transform `none`, reader quarter-turn matrix and open screenshot. P04: full regression suite and actual read/reopen/extract flow. P05: responsive table, short-screen scrolling and bounded stage. P06: local gates; remote results are recorded in the delivered report. Measurements are frontend calibration, not exact physical toy dimensions or certification on real touchscreen hardware.

## Fixed carrier branding / lens card entry — 2026-10-09

Specified in `docs/CARRIER-BRANDING-LENS-ENTRY.md` against `2404bf936b45fcb9ffe90fc9a78ac8c75d09c36f`. KREV1 now belongs to a fixed foreground retaining lip of the grip carrier. Its engraved lettering has clearer contrast. The previous rotating nameplate is removed from the ivory reader. The card is seated at x=330 so its small colored portion remains visible below the lip through the agreed groove.

During insertion, the same physical card artwork passes under the lens reflections, clipped to its 85-unit circular aperture. An inner shadow gives the appearance of passing beneath the glass. The shared 620ms insertion duration supplies both the controller deadline and CSS; the moving image fades before the recognized emblem appears. The 374-unit entry travel accounts for the deeper seated position, while screen-based extraction still uses the unchanged 344-unit physical card height. Card proportions, state guards, directed Henshin and original project content remain intact.

QA found `prefers-reduced-motion: reduce` is true in the current browser. Default Device setting continues to honor it. The optional controls now offer Animation: Device setting / Full motion / Reduced motion. Choosing Full motion explicitly enables the normal animation/timeline without changing any OS preference; Reduced motion still preserves every mechanical step. The original user-facing tab was left available and separate background QA avoided interfering with its ongoing interaction.

**Local gates:** 36/36 tests and strict TypeScript pass. The three card lifecycle cases verify the matching lens passage throughout the 620ms reading deadline, no early closure/project reveal, passage cleanup and subsequent emblem identity. An additional test verifies Full motion on a reduced-motion device and switching back. Existing resize, pickup, extraction, cancellation, multi-pointer and deadline-cleanup coverage passes. Production build succeeds: 16 kB route / 119 kB first-load JavaScript, with no additional runtime dependency or external asset.

**Native production browser evidence:** At 1440×900 the carrier brand's box is identical before and after opening: x=598.85, y=549.30, width=242.29, height=21.76 CSS px. Its closest physical assembly is `carrier`. In Full motion, the inserted SpendWise card was captured sliding inside the lens; its motion progressed from approximately -370.7 to -5 SVG units with visible opacity up to 0.88. At loaded, the passage and external card are absent and the ledger symbol is present. A complete close/Henshin/reopen/eject cycle succeeded and cleared the lens afterward. A background native cycle verified Learn passage/card 002 followed by brackets; Reduced motion insertion of KREV1 produced the monogram and cleared the passage. No console warnings/errors were returned in the tested background flow.

Responsive checks at 390×844 and 320×568 retain all nine language marks, the carrier branding, enclosed card and correct monogram, with no horizontal overflow. The final 320px screenshot accompanies the desktop evidence. The animated GIF is assembled from 11 real native browser capture frames plus a steady final frame, cropped to the Driver; playback timing is illustrative and includes a final hold for review. A full-page mid-insertion PNG is also supplied. No paused/faked app state or substituted card artwork was used.

B01: fixed coordinates/assembly ownership and closed/open views. B02/B03: actual captured movement, circular clipping, native card changes and three-card tests. B04/B07: deadline guards, reduced/full motion tests and native selector usage. B05: mobile and desktop evidence. B06: local gates; exact-revision remote delivery is recorded in the supplied report.

## Continuous card mechanics / rear carrier branding — 2026-10-09

Specified before implementation in `CONTINUOUS-CARD-MECHANICS.md` against `29dd4b42ea271f98f86209e1607da1f81278241c`. This revision supersedes the earlier foreground lip, fading passage and independent upright lens emblem. The user's current request and the 2:40–4:50 reference study require the nameplate to be covered by the reader, and the actual card print to move/turn inside the lens.

The deck retains its original front artwork. The reader side reuses the physical outline, identity and accent, with a colored top barcode and a central printed emblem oriented for the closed Driver. This one SVG definition supplies the groove, temporary external card and glass views. The lens surface and its `use` node survive the insertion/seated boundary; only phase metadata changes. There is no opacity crossfade or independent recognition image. Extraction translates the same print beyond the aperture, and cancellation restores the committed position. The lens has no counter-rotation. Reflections, inner shadow and blended light remain above the physical print. Front-side project title lettering is kept off the central reader-side viewing region.

The current browser still advertises reduced motion. Full motion is now the requested default; the optional selector also offers Device setting and Reduced motion. A validated, versioned local-storage choice survives reload. Invalid or denied storage falls back to the visible motion without blocking the controller. No OS preference changes.

KREV1 is engraved on the fixed rear carrier plate, painted before the rotating reader. The plate occupies SVG y=51–78 so it is exposed above the closed reader, while the open reader naturally covers the lettering. At 1280×720 the brand box stays at x=555.07, y=461.19, w=169.86, h=14.75 CSS px between closed/open, with transform `none`. SVG paint order places the brand before the reader; closed/open screenshots show the required occlusion.

**Local gates:** 38/38 tests pass; strict TypeScript and production build pass, with 16.2 kB route / 119 kB first load. Existing all-card lifecycle cases now check one shared card source and the same lens/use nodes through insertion, seating and extraction. Additional cases cover saved-mode remount, invalid storage and storage denial. Automatic reduced mode still passes the shortened full cycle and timer cleanup. React review confirms stable unique SVG IDs, memoized hardware, client-only storage access, unchanged pointer/run guards, native controls and listener cleanup. No new runtime dependency or remote asset.

**Native production browser:** Default Full motion is present despite the device media query being reduced. Actual insertion captures maintain opacity 1 and one card source while translation progresses from -360.93 to 0 SVG units. Fourteen real captures include the settled frame. Five closure captures show reader rotation from about 87.3° through intermediate positions to 0°, while the lens layer has transform `none`; the printing therefore turns with its reader. The resulting 19-frame GIF shows insertion followed by closure, with illustrative review holds. Full/Reduced selections survive actual reloads. A complete SpendWise keyboard close/Henshin/reopen/eject flow succeeds. Real pointer drag inserts Learn, and real upward drag clears it. All three card identities were observed under the lens.

**Responsive:** At 320×568 KREV1 is enclosed, all nine marks remain, no horizontal overflow, and the extraction target is 57.59×44px. Its active stage has bottom 408.66px, stays above the dock, and the document height is 568px. At 390×844 Learn is enclosed, all nine marks remain, no overflow, and the target is 70.19×44px. No warnings/errors were returned in the tested browser flow. These are desktop browser viewport checks, not physical touch-device certification.

M01: default mode and native saved-choice reloads, persistence/fallback tests. M02: shared source/node tests and actual insertion/extraction captures. M03: intermediate reader matrices and zero independent lens transform. M04: paint order, invariant brand position and actual occlusion images. M05: full regression suite, native pointer/keyboard cycles and all-card identities. M06: mobile measurements and screenshots. M07: local gates; exact-revision CI/preview/archive evidence is appended to the delivered report.

## Recessed entry / integrated carrier / empty closure — 2026-10-09

Specified before implementation in `RECESSED-ENTRY-EMPTY-CLOSURE.md`, against `7613859d7922f4435caae463d817193bceef7302`. The user's two annotations identify the raised silver entry bar and separate carrier plate. The silver slot group is removed; the existing dark groove has inset depth edges, a curved entry contour and subtle alignment guides. Its viewing aperture is x=294–373, y=235–288; it still exposes only the small top portion of the same seated card. The transparent input target starts at 4% of the scene height, aligned with the physical entry plane. Visible INSERT/EJECT captions and the alignment button overlay are removed; native accessible labels, focus styling and state instructions remain.

The carrier is now one connected graphite silhouette from its crown through the shoulders to the base. KREV1 is engraved on a flush crown face, without the former independent plate outline or shadow. It remains fixed behind the reader and is naturally occluded open. Closed/open screenshots show the integrated crown and recessed mouth.

The FSM accepts handle operations from empty `open` as well as loaded/closed states. `open` is a committed handle origin; cancellation restores openness 1 and no card. Completed empty closing returns `idle`, while loaded closing still enters Henshin. Closing invariants distinguish these two valid origins. Inward directions, labels, pointer leases and optional Close controls use the same rule. Open controls cannot accidentally toggle an already-open reader. Card dragging/insertion still excludes handle operations. Short inward motion asks the user to push farther.

**Local gates:** 42/42 tests, strict TypeScript and production build pass; route 16.2 kB / 119 kB first load. New coverage verifies empty closure without Henshin, reopening and inserting afterward, Full/Reduced tap equivalents, partial/foreign-pointer/lost-capture recovery and stale callbacks. The 10,000-event invariant walk and all existing three-card, continuous-surface, resize, timeline, storage and project-reveal tests pass. React review finds no new effect/listener, dependency or external asset; the memoized hardware, stable SVG IDs and native controls remain.

**Native production browser:** At 1280×720 a short inward pointer drag restores empty `open`, openness 1, with the correct push instruction. A full inward drag reaches `idle` without a card, stage or Henshin identity. A captured keyboard closure shows the reader at approximately 87.3°, 74.1°, 47.2°, 24.8°, 10.5°, 2.2° and 0°; every observed frame lacks card/project content, and completion is idle. Reduced-motion tap Open/Close also returns idle. A real pointer cycle inserts SpendWise into the new aperture, closes through Henshin, reopens/extracts, then closes empty successfully. The raised slot group is absent and the input target has no visible text. The GIF uses eight native screenshots with illustrative review holds.

At 320×568 and 390×844 the viewport has no horizontal overflow, all nine marks remain, and targets are respectively 57.59×44px and 70.19×44px. Both native empty-close cycles succeed; right-handle arrow directions were exercised at 320px. A loaded KREV1 card remains enclosed in the 320px view. No console warnings/errors were returned. Temporary viewport settings were reset. These are browser viewport checks rather than real-touch hardware certification.

E01/E02: actual open/closed images and physical drawing layers. E03/E04: pointer, keyboard, reduced/tap cycles, recovery/stale tests and generated invariant walk. E05: full regression suite and real loaded cycle followed by empty closure. E06: mobile measurements and screenshots. E07: local gates; exact-revision remote delivery is appended to the supplied report.

## Card feedback / Henshin accent / electronic reader audio — 2026-10-09

Specified before implementation in `CARD-FEEDBACK-HENSHIN-AUDIO.md`, against `3a27366ae054bb581854011b9722f5eae9f1796b`. The dimming request was implemented for the matching deck card, as stated in the initial interpretation and optional clarification. Its occupied class begins with accepted insertion, survives reopening/cancelled extraction, and clears on completed extraction. The physical reader print retains its existing continuity. An accessible description identifies the occupied card without changing button names.

One selected-card accent drives the Henshin ring, scanner, glass activation gradient, identification and glow. Native desktop captures verify SpendWise rgb(255,62,165)/#ff3ea5, Learn rgb(156,99,255)/#9c63ff and KREV1 rgb(255,141,202)/#ff8dca across the lettering, ring and glass. All were captured while actually transforming, with identity opacity above 0.7; no paused or forced state. A comparison image crops these real screenshots.

The former short oscillator list is replaced by an owned Web Audio graph and action-specific score. It layers seeded filtered noise, frequency sweeps, stereo barcode pulses, bass impact, detuned arpeggios/resolution, a quiet waiting pulse and short robotic announcements. Four original mono 24kHz PCM16 voice files total 87,978 bytes; each is under 0.65s and peaks at 0.82. Their local stock-speech generation, processing and hashes are documented in `public/audio/PROVENANCE.md`. The sequence uses the [Bandai development note](https://toy.bandai.co.jp/ja/topics/01_17247/) as a pacing reference. No film/toy sample or actor clone is shipped.

Audio is opt-in. Context creation/resume occurs in the Sound button gesture; announcement fetching/decoding starts then. Failed audio/announcement loading never gates the state machine. Explicit sample curves sustain speech through its final syllable and taper cue edges. Mute, conflicting cues, hidden pages and unmount stop owned scheduled/looping sources; disposal aborts loads and closes once. State deadlines remain independent of audio.

**Local gates:** 48/48 tests, strict TypeScript and production build pass; route 18.4 kB / 121 kB first load. Existing three-card lifecycle cases now verify occupancy, matching accents, cancellation and restoration. Six audio cases cover bounded scores, correct announcement identity, future-source stop/disconnect, waiting/mute/disposal, offline asset fallback, PCM validity and opt-in/controller deadline independence. All empty-close, pointer, resize, storage, continuous-surface and 10,000-event invariant tests pass. React review confirms lazy context construction, client-only audio access, stable memoized hardware and listener cleanup. No runtime dependency added; the four small original audio assets are the only new runtime files.

**Native browser:** With Learn loaded, the selected card has opacity 0.24 and grayscale(0.35)/saturate(0.55)/blur(0.45px); other disabled cards have opacity 0.72 and their ordinary shadow. After extraction all occupied classes clear; once the normal 180ms transition settles, all three cards have opacity 1 and ordinary shadows. A Sound On read/close cycle and mid-Henshin mute complete without warnings/errors. The observed resource inventory includes all four local announcement WAVs. Matching-color native cycles completed for all three cards. Empty closure still returns idle. At 320×568 KREV1 is enclosed, exactly one deck card is marked occupied, no horizontal overflow and the target remains 44px high. Temporary viewport settings were reset.

**Audio review artifact:** `driver-reader-henshin-v9.wav` renders the same score/scheduler and voice assets offline: insertion, latch and SpendWise Henshin. It is stereo 44.1kHz, 2.702s, peak 0.1782 and RMS 0.02785, with finite samples and no clipping. This is a review rendering rather than a recording of browser output; the live browser adds its compressor and loaded-state waiting loop. Voice data is explicitly resampled in the scratch renderer to avoid the legacy renderer's endpoint issue. The scratch rendering dependency is outside the app and is not shipped. Subjective similarity and speaker output levels are not certified.

A01: actual opacity/filter measurements and lifecycle assertions. A02: three native colors and source assertions. A03: action score, original assets, native enabled cycle/resource inventory and rendered sample. A04: lifecycle/fallback/deadline tests and actual mid-sequence mute. A05: complete regression suite and native cycles. A06: local gates and provenance; exact-revision remote delivery is appended to the supplied report.


## 2026-10-10: arrival, closed-card selection and reader sound

Specification: ENTRY-CARD-SELECTION-AUDIO.md. Initial deck cards are enabled; a native click on Learn while idle opens then inserts it, never loading through a closed reader. Open-reader stationary taps and a native downward drag of SpendWise both load correctly; extraction then allows another card. Five new regression cases cover all three initial selections, open pointer tap, and invalid/cancelled/moved-and-returned drags with trailing-click suppression. Existing guarded flow, 10,000-event invariants, physical surface, pointer/resize, storage, audio cancellation and empty close still pass. Total: 53/53 tests; strict TypeScript and production build pass. Route: 18.8kB / 121kB first-load JS; no new runtime dependency.

The pink rectangular slot focus/border and handle border overlays are removed. Native computed styles show outline none and transparent borders; no dx-slot-ready element remains. Keyboard focus uses pale groove lighting and underlined handle text. Native Learn Henshin with Sound On reaches the active project without warnings/errors; Sound is then muted. The new score leaves room for stock-speech leading-phoneme repetitions, scanning pulses and metallic resolution; insertion 900ms, Henshin 2400ms. Four original PCM assets total 137,642 bytes with peak 0.82 and hashes in public/audio/PROVENANCE.md. The offline score sample is 3.901 seconds, stereo, finite, peak 0.17465/RMS 0.02301; no subjective listening claim.

Native QA found a clipped parent could swallow the first early tap during arrival; clip now belongs only to non-interactive SVG artwork while the button hit area stays unclipped. Retest at 320x568 during is-entering=true: first KREV1 click loads card003, pageWidth=320 with no overflow, slotHeight=44. Reduced-motion reload shows animation none and opacity1 for all arrival layers. Full motion is restored afterward. Native empty open→close ends idle without Henshin. One-shot arrival delays are 80/220/360ms for the cards, with 650ms reveal; Driver reveal is 850ms after220ms. 80 actual native captures span1644ms; the delivery GIF uses17 sampled frames from that sequence, with no simulated animation.

Evidence delivered: driver-no-pink-frames-v10.png, driver-entry-mobile-v10.png, driver-arrival-v10.gif, driver-reader-henshin-v10.wav. Video opened as Kamen Rider Decade All Henshin (10:45); observed frames and on-screen KAMENRIDE/KUUGA identity documented in the specification. No transcript/audio perception is available; no soundtrack was downloaded or actor voice cloned.


## 2026-10-10: GSAP, Lenis and selected React Bits

Approved after component research; baseline4d5fc5925b9d202f7d479394560b582d8c958f7d. gsap3.15.0, @gsap/react2.1.2 and lenis1.3.26 are pinned. GlareHover, SplitText and AnimatedContent are adapted from official React Bits revisiond86fccbd477786f94ca7eb891fbe0ec039d3cd3b; supplied license/provenance retained in src/components/react-bits. No Motion runtime is added. Specification: ANIMATION-LIBRARY-INTEGRATION.md.

GSAP/useGSAP now renders one-shot arrival and the visual Henshin clock; the controller has a separate run-token deadline, with no render callback required to advance states. CSS arrival/stage animation ownership is removed. A paused-global-renderer test still reaches the active project exactly at2400ms and restores dock1→0 on reopening. Four scoped-scroll cases verify panel-only options, GSAP seconds→Lenis milliseconds, ticker/source teardown, repeated cycle cleanup, native/reduced fallback and ignored calls after destroy. All58 tests pass; strict TypeScript and production build succeed. npm audit during install reports0 vulnerabilities. Current route73.3kB /176kB first-load JS, compared with18.8kB /121kB baseline; this is roughly55kB more initial JavaScript, with no speed/performance improvement claimed.

Native desktop: keyboard-focus glare overlay has pointer-events:none and border0. Closed SpendWise click loads correctly; project has Lenis on the section only,11 GSAP split characters and two AnimatedContent regions; html has no Lenis class. Native wheel changes panel scrollTop0→465 while window scrollY remains0. Keyboard Python activation scrolls within the same panel; final panelBottom513 lies within stageBottom541. Content regions reach opacity1. Reopening/extracting removes all Lenis elements, resets dock0, and leaves card artwork inline filters empty. Native downward Learn drag succeeds, and Sound On GSAP Henshin reaches Learn without warnings/errors. The150 actual native frames span3488ms and show violet identity/ring plus docking and project reveal; the delivery GIF samples26 frames. Sound is muted afterward.

Native320x568: first KREV1 click while is-entering=true loads and activates card003; button hit clip remains none, pageWidth320, Lenis stays on the panel,14 split characters and dock1. Switching to Reduced motion removes all Lenis elements, returns native scroll, restores plain title without split characters and sets both content regions opacity1. Returning Full, reopening/extracting and empty closing ends idle; no pink guide remains and slot target is44px. Full motion and normal viewport are restored. No browser warnings/errors were captured. These are native browser observations at a responsive viewport, not physical-phone hardware benchmarks.

Evidence: driver-glare-v11.png, project-lenis-ability-v11.png, project-split-text-v11.png, project-libraries-mobile-v11.png and driver-gsap-henshin-v11.gif. Final small changes harden native-scroll stale callbacks and update the portfolio tech list; all58 tests/build pass again.


## Permanent lens aperture correction

Final public screenshot review found the conditional printed-card group referenced an obsolete lens clip identifier while the actual SVG definitions used the new identifier, so the card could become visibly unclipped. The print now lives inside a permanently mounted outer lens-aperture group, analogous to the fixed groove aperture. The moving/retained card surface owns no clip URL. This preserves its DOM identity and physical movement while keeping the aperture independent of card phase. A new all-three-project regression verifies the same85-radius aperture/reference across insertion, activation, reopening and extraction. All59 tests and strict production build pass. Native local KREV1 after Henshin confirms a matching existing clip definition, inner card parent is the aperture, no child clip reference and no transient card; screenshot review confirms the rectangular print no longer leaks outside the silver lens. Bundle size remains73.3kB /176kB.


## 2026-10-10: reference-grounded detailed audio pack

Baseline26c9594928a2c7b1c9658239434a9bb9d4ec8a8e. Both supplied videos were accessed anonymously and decoded locally with FFmpeg7.1 for STFT/onset analysis. CSM authored English captions were exported and used to distinguish normal Kamenride from Attackride/Final Formride and unreadable-card triple beeps. Measured error-tone groups around2273Hz at227.56/227.82/228.09s are excluded from valid standby. Mixed valid-card spectra guide timbre; local faster-whisper/base is unreliable on processed belt speech and is not treated as confirmed wording. Reference media remain local scratch and are not shipped.

Local Piper1.8.0 stock LibriTTS-R medium speaker2 generates new speech, shaped with20-band vocoding,136Hz carrier, pitch/comb/saturation processing. Category and normal project names remain plain, matching ordinary Kamenride rather than applying finisher stutters everywhere. Five original mono voice WAVs and eight original stereo Foley/loop WAVs,24kHz PCM16, total627,446 bytes under /audio/v12/. Attribution/model card and exact hashes are recorded in public/audio/PROVENANCE.md and v12/manifest.json. This is a local model/DSP generation path; Descript was discoverable but not connected, and no paid API was used.

Audio now has separate owned Foley, serialized speech, holding-loop and movement-grain lanes. Open/close are distinct. Closing preserves category speech; recognition waits for it in fast cycles. New open/extraction/ability/mute cancels obsolete speech. Movement gain follows actual travel then decays90ms during a hold; release/cancel tears it down. Hidden pages stop all lanes and cannot restart queued insertion audio as the mechanical deadline advances. Asset decode only warms cache, never starts an old cue. Procedural fallback remains.

63/63 tests, strict TypeScript and production build pass. New coverage includes stereo PCM/sample score bounds, closure/category/queued-name sequencing, movement decay/cancellation and hidden-page queued insertion, alongside all prior permanent aperture/state/gesture/resize/GSAP/Lenis checks. Current route74.1kB /177kB first-load JS, roughly1kB above the preceding audio revision; the new sound pack is fetched only after Sound On. No Python/model dependency is added to the application runtime.

Three full-cycle preview WAVs use the same DriverAudio class/scheduler/assets in an offline Web Audio graph: each6.281s, stereo44.1kHz, finite, peak0.31764 and RMS approximately0.052. They include movement/open, insertion/category, holding, close/project name/Henshin, Attack Ride ability and reopening/extraction. They are offline renders rather than live browser recordings; numerical peaks and analysis do not certify subjective film-match accuracy.

Native localhost: asset inventory observes all13 versioned WAVs after Sound On. A real outward handle drag, KREV1 insertion→closure→active project, ability activation, reopen/extract, Learn insertion and mid-Henshin Sound Off complete without warnings/errors. Lens aperture still resolves to its existing definition and the project panel retains Lenis.

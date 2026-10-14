# Carrier branding and card entry through the lens

Revision history: the foreground nameplate, fading lens passage and default automatic motion below are superseded by [Continuous card mechanics](CONTINUOUS-CARD-MECHANICS.md), following the user's later correction.

Date: 2026-10-09. Baseline: `2404bf936b45fcb9ffe90fc9a78ac8c75d09c36f`.
Recorded before initial implementation for the user's correction that KREV1 belongs to the handle carrier and request for visible card sliding inside the circular lens. The motion-choice supplement was added during QA after observing the browser's reduced-motion preference.

## Design and state contract

- KREV1 is engraved on a fixed foreground retaining plate belonging to the carrier. Its screen position and orientation remain unchanged while the ivory reading unit rotates. Remove the previous rotating wordmark and its plate from the reader.
- Keep the fixed plate above the language marks, with its lower edge at SVG y=94. Seat the physical card slightly deeper (x=330) so its small colored section is visible below the retaining plate through the existing groove when open. The card dimensions remain 236×344 and all previously accepted materials and language marks are retained.
- During `inserting`, reuse the actual project card artwork and physical motion underneath the circular lens. Clip it to the 85-unit lens aperture, with the glass reflections and inner shadow above it. The card moves downward on the open reader's vertical axis.
- Make the read-in animation 620ms so the lens movement is perceptible. One shared duration supplies the controller deadline and CSS. Fade the passing card near the end, then display the recognized project symbol with a short opacity transition.
- In `loaded` and subsequent states, retain the recognized symbol and the small seated-card segment. No full card stays outside the hardware. Project content remains hidden until the existing Henshin sequence completes.
- Empty, dragging, invalid-drop and cancelled-drag states show no lens card passage. Cancellation/ejection/reopening retain the existing guards and identity rules. Reduced motion keeps the short 60ms insertion deadline and suppresses movement through existing rules.

- Browser inspection found the current preview browser advertises reduced motion. Add an Animation selector to the existing optional controls: Device setting (default), Full motion, Reduced motion. Explicit Full motion enables the normal timeline and CSS even on a reduced-motion device. No OS setting is modified; both modes preserve every mechanical step.

This is a proposed optical reading visualization using original project artwork, not a claim that the physical toy displays a full card through its glass.

## Acceptance

| ID  | Requirement                                                                                            | Verification                                                 |
| --- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| B01 | KREV1 belongs to the carrier, stays horizontal and keeps its position during opening                   | Closed/open browser coordinates and screenshots              |
| B02 | The inserted card visibly slides inside the circular glass, with no spill onto the annulus             | Mid-insertion screenshot, circular clipping and native cycle |
| B03 | The passage uses the correct card identity, disappears after reading, then the matching emblem appears | Three-card controller tests and browser                      |
| B04 | Project content and inward closure remain gated while reading; reduced motion and recovery still work  | Regression tests                                             |
| B05 | Groove card segment, language marks and fixed label remain clear at 320/390/1440px                     | Responsive browser screenshots                               |
| B06 | Types, tests and production build pass; no external asset or dependency added                          | Local gates and exact-revision remote checks                 |

B07: Full motion can be selected on a reduced-motion device; switching modes preserves step guards. Verify with native controls and an integration test.

Results are recorded after implementation in `VERIFICATION.md`.

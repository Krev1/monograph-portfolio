# Continuous card mechanics and rear carrier branding

Date: 2026-10-09. Baseline: `29dd4b42ea271f98f86209e1607da1f81278241c`.
Recorded before implementation for the user's report that insertion is invisible, request for the lens contents to rotate with the reader, and correction that the reader must cover KREV1 when open.

## Evidence and correction

The supplied [video](https://www.youtube.com/watch?v=1io0g-4Sz3A&t=160s) was inspected between 2:40 and 4:50, including repeat playback of insertion and closure. Around 3:37 the W card's colored top strip and symbol are visible through the upper groove and circular glass. Around 3:40 the symbol turns with the reader. Around 4:45 a white card produces a white/pink surface beneath the illuminated glass. These support one physical card surface behind two viewing apertures. Internal sensors and transmission details were not inspected.

The current native browser reports reduced motion. Automatic mode reduces insertion to 60ms and CSS motion to almost zero, explaining the missing effect. The user explicitly requests the visible motion: use Full motion as this experience's default, retain Device setting and Reduced motion choices, and persist only a validated animation choice in local storage. Do not change device preferences. Storage denial must not break the cycle.

## Design contract

- A single reader-side SVG card definition supplies the transient card, recessed groove and circular lens for every phase. All three views share translation, size and card identity. No fading card is replaced by an independently placed emblem.
- Keep the approved front artwork on deck cards. The reader side has the same physical outline, project identity and accent, with its printed symbol positioned so it is centered at (500,257) when seated. Orient that printing for the closed Driver; it turns with the actual card when opening/closing. The drag ghost uses the reader side as it aligns with the mouth.
- Keep the 620ms normal insertion and guarded deadline. Preserve the same card DOM/source at the seated boundary. During extraction, the card print leaves the lens physically; cancellation restores it. Remove counter-rotation, recognition crossfade and lens-passage opacity animation.
- Glass reflections, inner shadow and light remain above the card; light blends with the printed surface. Only clipped areas expose the seated card. Project content still mounts only after Henshin completes.
- Place the fixed carrier nameplate behind the reader. Its coordinates and orientation do not change with openness. Move the engraving into the exposed top of the closed carrier, above the closed reader edge. The quarter-turn reader naturally covers the lettering through SVG paint order; do not rotate or artificially fade the label.
- Persist a small versioned motion setting containing only `auto`, `full` or `reduced`; ignore malformed values and catch blocked storage. Full is the fallback. Explicit reduced motion retains all required steps.

## Acceptance

| ID  | Requirement                                                                                                   | Evidence                                          |
| --- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| M01 | Full motion is visible on first load on the current reduced-motion browser; chosen mode survives reload       | Native browser and controller tests               |
| M02 | The same card surface moves through the groove and lens, stays at the end position, and retracts through both | Native motion captures and identity/source tests  |
| M03 | Lens printing turns 90 degrees with the reader; closure/reopening does not counter-rotate it                  | Browser transform measurements and captured cycle |
| M04 | KREV1 is fixed on the rear carrier, visible closed and occluded open                                          | Paint-order checks and closed/open screenshots    |
| M05 | Cancellation, one-card guards, keyboard/tap, all three identities and delayed project reveal still work       | Complete regression suite and native cycle        |
| M06 | Desktop and mobile retain readable marks, enclosed seated cards and usable targets                            | Responsive browser checks                         |
| M07 | Type checks, tests and production build pass; review preview matches the delivered revision                   | Local gates and remote checks                     |

Results are recorded after implementation in `VERIFICATION.md`.

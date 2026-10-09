# Seated card and circular reader specification

Revision history: the independently recognized, counter-rotated lens emblem below is superseded by [Continuous card mechanics](CONTINUOUS-CARD-MECHANICS.md). The current card print rotates and retracts with its physical card.

Date: 2026-10-09. Baseline: `1593ec0ebf936b5d0697ebeacb73a4f29011f438`.
Recorded before implementation for the user's two annotated screenshots.

## Reference study

**Verified:** The newly supplied [CSM Decade Driver demonstration](https://www.youtube.com/watch?v=1io0g-4Sz3A), inspected in the browser around 3:01 and 3:37–3:47, shows the distinction between a card still entering the reader and a fully seated card. At 3:37 the open reader encloses the card; a small yellow section remains visible in its upper groove, and an illuminated card symbol occupies the circular lens. The two user annotations specify the left black window in the closed orientation and the circular lens as the requested display areas. The earlier, different reference video remains unavailable; this observation concerns the newly supplied video.

**Inferred:** The window is a view through the casing to the inserted card. Dimensions are estimated from the supplied website screenshot, rather than measured from physical hardware. In the existing SVG coordinate system its inner aperture is x=302–367, y=235–288. The clockwise quarter-turn carries that window to the top of the open reader.

**Proposed:** Use the existing original KREV1 card designs and their ledger, brackets and monogram symbols. Draw the complete card behind the casing; clip its seated appearance to the small aperture. A transient card may emerge during actual insertion or upward extraction, but no external card remains in a settled loaded state. Display the matching original symbol under the circular lens glass immediately after reading completes, before Henshin. Counter-rotate the symbol to keep it upright while the mechanical reader rotates. Preserve the established sequence and directed Henshin timeline.

## Design and state contract

- One project identity supplies the deck card, recessed card segment and lens symbol.
- The aperture rotates with the face. Its frame, inner shadow and retaining lip occlude the card edges and communicate depth.
- `inserting`: card moves downward into the open reader; lens has not yet identified it.
- `loaded`, `closing`, `transforming`, `active`, `reopening`: card stays fully seated; lens retains its symbol. Project content still appears only after Henshin completes.
- `ejecting`: upward movement can expose the card. The symbol persists until successful extraction finishes. Cancellation restores the seated card and its identity.
- Empty, invalid-drop and cancelled-drag states show an empty groove and dark lens.
- The insertion/ejection hit target stays aligned with the upper groove at full open, at least 44×44 CSS pixels. It must not cover the card with a persistent label.
- Use reusable SVG paths, existing state/run guards and Pointer Events. No new renderer, remote runtime asset or official logo/audio is introduced.

## Acceptance and evidence

| ID  | Requirement                                                                                                  | Verification                                                 |
| --- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| C01 | After loading, no card protrudes outside the casing; only the small aperture exposes it                      | Open and closed browser screenshots; SVG clipping inspection |
| C02 | Lens shows the inserted card's ledger / brackets / monogram, including before Henshin                        | Integration tests for all three cards; browser screenshots   |
| C03 | The small window travels with the rotor; the lens symbol stays centered and upright                          | Open/closed native pointer cycle; SVG bounds                 |
| C04 | Reopen/cancel preserves identity; completed extraction clears both displays; no early project disclosure     | Existing and additional integration tests                    |
| C05 | Native drag/drop and upward extraction remain usable; keyboard/tap equivalents and reduced motion still work | Browser pointer/keyboard cycles, regression tests            |
| C06 | At 320–390px the card stays enclosed, target is at least 44px and there is no horizontal overflow            | Responsive browser measurement and screenshot                |
| C07 | Type checks, complete test suite and production build pass                                                   | Local results; exact revision CI and preview                 |

Results are recorded in `VERIFICATION.md` after implementation.

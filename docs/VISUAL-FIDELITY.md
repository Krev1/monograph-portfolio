# Driver visual fidelity revision

Date: 2026-10-09. User request: make the existing Driver resemble the reference more closely and add detail. Baseline review commit: `02c04693cb08d4ff3523eea8a69b0f2a764caad7`.

## Study and decisions — recorded before implementation

The official [Toei product photograph](https://www.kamen-rider-official.com/zukan/items/272), already downloaded and inspected, is the visual reference. The previous SVG has a tall octagonal face, oversized solid grips, repeated star marks and strongly luminous colored pods. The photograph instead shows a broad curved ivory face, compact open grips, a thinner midline, small different black marks, muted translucent pods and a polished silver annulus around a reflective dark lens.

**Verified:** silhouette, visible face/grip arrangement, color order green–pink–blue on both sides, upper green jewel, dark horizontal band, silver annulus and dark lens. The Bandai manual supports outward grip travel, clockwise quarter-turn, downward insertion and inward closure.

**Inferred:** bevels, highlight positions, depth layers and surface finish are drawn from the photograph, not measured dimensions. The card mouth is on the left edge in the closed orientation and reaches the top after clockwise rotation.

**Proposed:** original black technology glyphs replace official Rider emblems; KREV1 replaces the wordmark. A layered SVG with gradients, fine patterns and independently moving parts supplies depth without adding WebGL. No official image, logo or recorded sound is shipped. Film-specific motion still cannot be checked against the unavailable requested video.

## Acceptance

| ID  | Required result                                                                                                                | Verification                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| F01 | Wider curved ivory face, smaller open grips and thin dark center band visibly approach the reference silhouette                | Closed desktop and mobile screenshots         |
| F02 | Separate shell depth, bevels, grip cavities, fasteners, rail ribs, brushed silver ring and reflective black lens               | Close-up screenshot                           |
| F03 | Small distinct original marks lie on the ivory area; muted green/pink/blue pods remain ordered on both sides                   | Visual comparison                             |
| F04 | Slot rotates with reader to the top; outward travel exposes the mechanical rails; loaded card enters behind the rotor          | Open/loaded screenshots and pointer cycle     |
| F05 | Pointer progress moves hardware immediately; cancel, keyboard, ejection, switching and reduced motion remain valid             | Existing controller/reducer tests and browser |
| F06 | At 320px controls remain at least 44px, stage clears the larger dock, deck clears the rotor and no horizontal overflow appears | Responsive browser measurements               |
| F07 | Status lights, scan and energy use the existing directed Henshin timeline; standby hardware stays mostly unlit                 | Browser and timeline regression tests         |
| F08 | Build/type checks pass; no additional rendering dependency or remote runtime asset                                             | Build and source review                       |

The finite state machine and evidence-bound project descriptions remain the foundation. Layout and hit targets must use the new SVG viewport; artwork changes may not create an invisible or displaced card drop zone.

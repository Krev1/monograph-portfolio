# Card / Driver proportions and two-part construction

Date: 2026-10-09. Baseline: `6b18cb3fdbe3cb14a37bb531d79b7b797d3aa7a4`.
Recorded before implementation for the user's request to correct relative card/Driver sizes and study 1:15–1:50 of the reference video.

## Reference study

**Verified from the requested video:** Around 1:17 the carrier with both grips is shown without the front reading unit. Around 1:42 the detached ivory reading units and their circular lenses are shown separately. These are two assemblies: the fixed/sliding carrier and the removable rotating card reader. They are represented as separate drawing groups; this revision does not introduce an unrequested dismantling interaction.

**Verified from [Bandai's CSM Decadriver ver.2 specifications](https://toy.bandai.co.jp/ja/series/rider/item/01_2817/):** Rider Cards are approximately W59×H86 mm, and the Driver body is W202×H97×D88 mm. This establishes a 59:86 card aspect ratio and card-to-body width ratio of approximately 0.292. These are ver.2 specifications, rather than measured dimensions of the earlier model in the supplied video.

**Inferred / proposed:** The existing front-view SVG's closed hardware spans about 812 units inside a 940-unit viewport. A nominal card plane of 236×344 units preserves 59:86 and gives 236/812≈0.291. This is a web drawing calibration, not an engineering model. Camera perspective in the video prevents exact dimensional measurement.

## Problem and design

The previous deck uses 164×200 px cards, its desktop drag ghost is 145×200 px, and its internal SVG card is 116×170 units. Mobile and short-screen overrides add further sizes. The same physical card therefore changes width and shape while being picked up and inserted.

Use one typed geometry contract: viewport 940×435, card 236×344, and reusable card artwork with viewBox 118×172. Deck, ghost and reader use the same artwork and physical scale. Derive display dimensions from the actual Driver scene width, including responsive changes. Pointer extraction converts screen travel into reader units so the card follows the hand.

If a resize changes the scene width during a held gesture, cancel that gesture and restore its committed origin before applying the new scale. This prevents stale pointer coordinates from moving a resized card or handle incorrectly.

Keep the card seated behind the casing, visible only through the previously agreed 65×53 aperture. Insertion/extraction may expose the full-size card temporarily. Its project symbol still appears upright in the central lens after reading and survives reopening/cancellation.

Draw the rear carrier as a fixed graphite frame with mounting seams and independently sliding grips. The ivory reading unit remains a separate rotating foreground group. Reveal the carrier shoulders when the reader opens, while retaining the approved lens, material palette and nine programming-language marks.

Adapt the desktop Driver size and deck spacing together so three true-scale cards fit above the mechanism. Mobile cards remain at least 44px wide; short screens reserve space using the new physical card height. The active project retains its bounded stage and dock.

## Acceptance

| ID  | Requirement                                                                                                       | Evidence                                                |
| --- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| P01 | Deck and drag ghost have aspect ratio 59:86 and the same dimensions as the reader card at the current scene scale | Browser measurements and shared geometry/artwork review |
| P02 | No abrupt size change at pickup/insertion; aligned card stays vertical; extraction follows screen travel          | Native pointer cycle and controller tests               |
| P03 | Fixed graphite carrier and rotating ivory reader are separate assemblies; shoulders/seam are visible when open    | Closed/open screenshots and DOM group inspection        |
| P04 | Loaded card remains enclosed; correct lens identity; cancel/reopen/eject still behave correctly                   | Existing regression tests and browser cycle             |
| P05 | No deck/reader collision or horizontal overflow at 320, 390, 768 and 1440px, including short screens              | Responsive measurements and screenshots                 |
| P06 | Type checks, complete regression suite and production build pass; no new rendering dependency                     | Local gates and exact-revision remote checks            |

Results are recorded after implementation in `VERIFICATION.md`.

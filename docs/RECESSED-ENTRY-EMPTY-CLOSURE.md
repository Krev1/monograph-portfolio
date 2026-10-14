# Recessed card entry, integrated carrier and empty closure

Date: 2026-10-09. Baseline: `7613859d7922f4435caae463d817193bceef7302`.
Recorded before implementation for the user's two annotated screenshots and report that an empty Driver cannot close.

## Requested result

- Remove the raised silver bar above the open reader. Show a recessed card guide within the existing dark groove instead. Keep the real insertion/extraction target and accessibility without adding a visible button over the hardware.
- Join the KREV1 engraving into the carrier's continuous graphite crown and shoulders. Remove the separate plate outline and drop shadow. It remains fixed behind the reader and covered when the reader opens.
- An open empty Driver closes through the same inward handle motion as a loaded Driver. Empty closure returns to idle, without Henshin, project content or a card identity. A loaded closure retains the existing transformation.

## State and drawing contract

Use the existing `closing` state for both cases. Add `open` as an allowed handle origin. Cancelled/short empty closure restores `open` at openness 1; a committed closure completes at `idle` with no card. Keep run-token checks, capture ownership and invalid-drop guards. Handle labels, arrow directions and optional close controls must recognize an open empty reader. Opening controls must not act as a toggle while already open.

Make the rear carrier one connected silhouette from the crown to the existing shoulders/base. Paint the engraving on a flush face with a small highlight, behind the reader. Replace the external slot group with recessed rim/depth edges in the card window. The small seated-card view and lens use the same physical card source and motion as before. Remove visible INSERT/EJECT captions from the transparent hit target; current state instructions and native accessible labels explain the operation. Keep targets at least 44px high.

## Acceptance

| ID  | Requirement                                                                                             | Evidence                                          |
| --- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| E01 | Open reader has an inset guide, without the raised silver bar or label overlay                          | Desktop/mobile screenshots                        |
| E02 | KREV1 belongs to one connected rear carrier and is naturally covered open                               | Closed/open images and SVG layer inspection       |
| E03 | Empty closure works with pointer, keyboard and tap controls; ends idle with no Henshin                  | Reducer/controller tests and native browser cycle |
| E04 | Partial, cancelled or foreign-pointer empty closure cannot commit; stale callbacks cannot reopen/reveal | Recovery tests and adversarial invariant walk     |
| E05 | Loaded insertion/close/Henshin/reopen/extract, all card identities and reduced motion still work        | Complete regression suite and browser             |
| E06 | No horizontal overflow at 320/390px; card target remains usable                                         | Responsive browser measurements                   |
| E07 | Type checks, build, CI and exact-revision preview/archive pass                                          | Delivery record                                   |

This revision supersedes any earlier requirement that an empty open Driver cannot close. Project discovery still requires a card and the complete Henshin sequence.

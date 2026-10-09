# Programming-language marks around the lens

Date: 2026-10-09. Baseline: `447117d990ef22485eaf897501ccdc12cf3ae9c4`.
Recorded before implementation for the user's nine circled face symbols.

## Requirement and design

Replace all nine decorative glyphs around the silver annulus with recognizable programming-language names or abbreviations. The user explicitly permits logos, abbreviations or symbols; use original typographic marks rather than external image assets.

Clockwise from upper left: Python (`PY`), JavaScript (`JS`), TypeScript (`TS`), C++ (`C++`), C# (`C#`), Java (`JAVA`), Go (`GO`), Rust (`RS`), Kotlin (`KT`). This is a decorative programming-language motif, not a claim of proficiency in every language. Project ability descriptions remain evidence-bound.

Keep all marks in the same nine regions on the ivory shell, with small outward adjustments for badge clearance. Dark engraved-style typography and compact square, hexagonal, outlined and gear-shaped badges match the hardware material. Marks are upright when closed and rotate with the mechanical face when opened. The central lens continues to display the inserted project card's identity.

## Acceptance

| ID  | Required result                                                                               | Evidence                                    |
| --- | --------------------------------------------------------------------------------------------- | ------------------------------------------- |
| L01 | All nine old glyphs replaced by the selected language marks                                   | Source review and closed browser screenshot |
| L02 | Marks remain small, dark and readable without crossing the silver ring or covering the groove | Desktop detail and 320px visual inspection  |
| L03 | Marks move with the rotor; seated card and central lens remain correct                        | Open/loaded browser screenshot              |
| L04 | No new dependency or runtime asset; type checks and production build pass                     | Build and exact revision CI                 |

Visual inspection is sufficient for this decorative change; existing mechanical regression tests remain in CI.

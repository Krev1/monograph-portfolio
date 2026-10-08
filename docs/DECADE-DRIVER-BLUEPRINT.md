# KREV1 — DECADE DRIVER: Single-Page Interaction Blueprint

**Status:** build specification / phase 1 implemented with React state and pointer gestures.  
**Visual direction:** black #07060C, deep violet #180B29, neon magenta #FF3EA5, violet #9C63FF, cream-white #F8EEF6.  
**Core principle:** No ordinary list of projects. The wearer must operate the Driver to reveal each project. Inspired by transformation-card interfaces; all shapes, marks, graphics and sounds must be original rather than copied from licensed Kamen Rider material.

## Experience architecture
- **One homepage:** no separate About, Resume, GitHub section or project listing.
- **Idle / locked:** vertical project cards hover above the closed central Driver; hint says drag its handle horizontally.
- **Open:** swipe driver handle left or right at least 65px (mouse/touch). Shell opens along the chosen axis and exposes a vertical card slot.
- **Insertion:** drag a card from the overhead deck downward and release over the slot. Validate upward-origin-to-downward travel and slot hit area. Snap card vertically into the device. Other cards cannot be inserted while occupied.
- **Close / henshin:** drag handle at least 65px *opposite* to opening direction. Lock shutters, scan card, run Henshin flash and asynchronously transition to active when the animation ends.
- **Active:** Driver docks horizontally, centered and flush to bottom. Project name, facts, source link, conceptual visual and ability cards appear in center viewport. No normal close/skip.
- **Reopen:** drag docked Driver horizontally; project stage disappears and card remains physically inserted.
- **Eject:** swipe inserted card *upward* at least 55px to remove it. The deck returns. Insert next card and close opposite to the new open direction to transform again.
- **Keyboard/touch fallback:** arrow keys on Driver operate opening/closing, Enter or Space on a project card inserts when open, ArrowUp on inserted slot ejects. Same state-machine operations, no shortcut to content. Ensure reduced-motion preference shortens visual effects but never skips an interaction.

## State machine
| From | Input | To |
| --- | --- | --- |
| locked | horizontal gesture | open |
| open | project card dropped on slot | loaded |
| loaded | reverse horizontal gesture | transforming |
| transforming | animation end (~1050ms) | active |
| active | horizontal gesture | reopened |
| reopened | swipe card upward | open |
| open | another project card dropped | loaded |

Guard against a close gesture without a card or insertion with an occupied slot. Card changes always require eject. No "view without transformation" entry point.

## Interaction geometry
- Horizontal handle drag activation: minimum 65 px in X with `touch-action:none` on handle.
- Vertical card insertion: at least 50 px down, pointer released in the Driver slot hit target; card ghost tracks pointer.
- Ejection: at least 55 px up on slot.
- Motion: shutter transforms 500ms; card snap 450ms; Henshin ~1050ms; driver docking 650ms; ability-card reveal 250ms.
- Gate animation completion by state rather than relying solely on CSS `animationend` (which may be suppressed by reduced motion).
- Reflows for phone and desktop; focus states and instructions in Vietnamese/English.

## Project evidence integrity
**SPENDWISE AI:** work-in-progress Python/CSV transaction tooling, prototype baseline research and testing; *not* a shipped trained AI system.  
**LEARN:** Python self-study exercises and documented learning track.  
**KREV1 PORTFOLIO:** Next.js / TypeScript / GitHub-backed portfolio and interaction system.

Ability-card text must only describe technology and roles actually supported by repository evidence; visuals in the active stage are **concept art**, not app screenshots or completed-feature claims. External source URL links remain accessible after transformation.

## QA acceptance tests
1. Idle project details hidden until Henshin.
2. Horizontal grip drag opens either direction, vertical-only movement does nothing.
3. Drop outside slot or without downward drag does not insert.
4. Closing in same direction as open does nothing; opposite direction Henshin succeeds.
5. Henshin populates correct project and docks Driver to lower viewport edge.
6. Can't switch project without reopening + ejecting.
7. Ability modules correspond to the selected project; switching resets modules.
8. Touch, keyboard and prefers-reduced-motion preserve entire interaction sequence.
9. 320px width, 768px width and desktop display correctly; stage content scrolls if tall.
10. No reference artwork, copied logos or sampled transformation audio.

## Follow-up
Visual browser QA and production build must be checked against the Vercel deployment after the GitHub changes are built. Next-level physical realism could use 3D models and original sound assets, but these are not prerequisites for this web prototype.

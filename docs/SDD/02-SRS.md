# Software Requirements Specification (SRS)

**Version:** 0.1 draft  
**Requirement conventions:** FR = functional, NFR = non-functional, AC = acceptance criterion, T = test case. Each FR has guards.

## Functional requirements
| ID | Requirement | Precondition | Trigger / Input | Observable result | Acceptance |
|---|---|---|---|---|---|
| FR-001 | Show idle experience | Initial load | Load / refresh | Closed Driver, three cards, instructions, no project detail | AC-001 |
| FR-002 | Open Driver from either side | idle or active | Outward handle drag ≥65px or keyboard analogue | Central reader turns, grips extend, slot opens | AC-002 |
| FR-003 | Reject insufficient/invalid drag | idle/active/loaded | Short drag, wrong axis, pointercancel | Restore previous state; no accidental activation | AC-003 |
| FR-004 | Insert selected project card | open, no project loaded | Vertical card drag into slot, >50px travel; keyboard equivalent | Project ID stored, snap feedback, loaded state | AC-004 |
| FR-005 | Reject invalid/duplicate insertion | not open, occupied or drop outside | Drag/drop | No card change; return gesture ghost | AC-005 |
| FR-006 | Close loaded Driver | loaded | Inward handle travel ≥65px / keyboard analogue | Reader rotates back; initiate Henshin once | AC-006 |
| FR-007 | Block transformation without card | idle/open | Inward control without loaded card | No project details or Henshin | AC-007 |
| FR-008 | Execute Henshin | valid close | Timed transition | Scan/light/flash sequenced; no detail before completion | AC-008 |
| FR-009 | Present project and dock Driver | transforming completed | Timeline complete | Project stage visible, device fixed bottom center | AC-009 |
| FR-010 | Activate project ability | active | Ability card click/keyboard | Selected ability detail + real tool/contribution | AC-010 |
| FR-011 | Reopen from active | active | Handle outward drag | Stage exits; same card remains in exposed reader | AC-011 |
| FR-012 | Eject existing card | reopened | Upward drag ≥55px / ArrowUp | Ejection visual; project cleared; open ready for insertion | AC-012 |
| FR-013 | Replace project | open after eject | Insert a different valid card, then close | Correct new stage/modules; old details cleared | AC-013 |
| FR-014 | Optional original SFX | any input state | Enable audio then actuate valid events | Mapped synthesized audio; default off | AC-014 |
| FR-015 | Accessible equivalent controls | all operative states | Keyboard/focus/aria status | Same logical sequence without pointer drag | AC-015 |
| FR-016 | Responsive experience | all | Resize/orientation change | Full driver, card deck and stage remain usable | AC-016 |
| FR-017 | Source links | active | Open repository link | Correct verified URL in separate safe tab | AC-017 |
| FR-018 | Reset safely after interruption | transient states | Pointer cancel, loss of focus, animation disruption | No stuck grip, duplicate activation, or orphan project | AC-018 |

## Detail: guards and postconditions
- **open:** allowed from idle or active; project ID unchanged if opening from active.
- **card insertion:** allowed only from `open` while `projectId===null`.
- **closing:** allowed only with loaded card; inward relative to physical handle side, not arbitrary opposite global direction.
- **Henshin:** may only fire once per loaded-card close sequence; duplicate pointerup ignored.
- **stage:** never renders while state is `transforming`.
- **ejection:** only when reopened; project ID cleared after controlled eject transition.
- **ability:** only in active; selection resets on project change.
- **audio:** never required for interaction or state progression.

## Non-functional requirements
| ID | Criterion | Validation |
|---|---|---|
| NFR-001 | Strict TypeScript with no TS2367 and no unchecked unsafe casts | `npx tsc --noEmit` |
| NFR-002 | Production Next build succeeds | `npm run build` |
| NFR-003 | Main state reducer unit tested at every transition boundary | Unit suite |
| NFR-004 | No runtime crashes in mouse, touch emulation and keyboard flows | E2E |
| NFR-005 | Responsive 320–1920px without unreachable controls | E2E screenshot + coordinates |
| NFR-006 | Reduced motion retains mandatory actions | CSS/media and E2E |
| NFR-007 | Original/unlicensed assets flagged for review before commercial use | asset inventory |
| NFR-008 | Interactive stage sensible under high zoom and screenreader | manual accessibility checks |
| NFR-009 | CI required on feature branch, preview QA before main merge | workflow and status |
| NFR-010 | Rendered project claims backed by repository evidence | content audit |

## Traceability anchors
| Acceptance | Requirement IDs | Test IDs |
|---|---|---|
| AC-001/002/003 | FR-001/002/003 | T-001, T-002, T-003 |
| AC-004/005 | FR-004/005 | T-004, T-005 |
| AC-006/007/008/009 | FR-006/007/008/009 | T-006, T-007, T-008, T-009 |
| AC-010/011/012/013 | FR-010/011/012/013 | T-010, T-011, T-012, T-013 |
| AC-014/015/016/017/018 | FR-014/015/016/017/018 | T-014, T-015, T-016, T-017, T-018 |

## Priority
**P0:** FR-001 through FR-013, FR-015, FR-018; NFR-001 through NFR-005.  
**P1:** FR-014/016/017; NFR-006 through NFR-010.

All listed ACs are **proposed**, not verified. See `07-ACCEPTANCE.md` for live implementation evidence.

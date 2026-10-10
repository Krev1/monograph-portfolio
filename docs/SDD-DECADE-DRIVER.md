# KREV1 — Decade Driver specification

Date: 2026-10-09. Baseline: `577808345f5958424041e4d90785d9fb9fd2b75f`.
This specification precedes implementation. The supplied prompt stops at section 8; accessibility below completes its stated keyboard/touch/reduced-motion requirements.

The subsequent user-requested hardware fidelity revision is specified in [VISUAL-FIDELITY.md](VISUAL-FIDELITY.md). Its layered curved shell, open grips and rotating slot retain the same state and input contracts below.

## Reference study and evidence boundaries

- **Verified:** [Toei's Decadriver entry](https://www.kamen-rider-official.com/zukan/items/272) explicitly describes pulling both side handles to rotate the buckle, loading a card, and pushing the handles to release energy. Its official photograph shows an ivory face, silver annulus, black lens, green upper jewel, lateral graphite grips and green/pink/blue circular details.
- **Verified:** [Bandai DX manual, page 2](https://bandainamco-bcpombucket1.s3.amazonaws.com/docs/answers/url/4549660315445.pdf), visually inspected, shows outward handles, clockwise buckle rotation, card insertion downward with barcode uppermost, inward handles, reader response at insertion and transformation response after closure. The illustrated orientation changes by a quarter turn.
- **Inferred:** the illustrated rotation is approximately 90 degrees; exact travel, gear ratios, materials and tolerances cannot be established from a product photo/manual. The drawing uses perspective rather than engineering dimensions.
- **Unavailable:** [requested video](https://www.youtube.com/watch?v=mA9z6rS1uMc) was throttled by the fetch tool. No film timing or video-specific movement is claimed. User stills/timecodes would enable additional fidelity review, but official sources support implementation now.
- **Proposed:** either handle controls the mechanically linked pair on the web; normalized travel 0..1 rotates the central reader 0..90 degrees. This is a usability adaptation, not a claim that one physical handle independently opens the toy.
- **Proposed:** drag threshold .72, slot attraction, 1500 ms directed timeline, original project emblems and oscillator sounds. No official logo, image or sampled audio enters the shipped assets. Fan concept attribution appears in the footer.

Closed shape: a wide, shallow belt with lateral grips and a taller ivory buckle. The silver ring and lens remain visible while the whole central assembly rotates. The open card mouth sits on the upper edge of the rotated assembly. The vertical card travels downward, leaving a small exposed tab; closing rotates the assembly back and retains card identity. Timing is web-authored, not film-verified.

## Requirements and acceptance map

| ID  | Behavior                                                            | Acceptance                                                                                                                   | Evidence planned             |
| --- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| R01 | Single primary experience, three project cards above central Driver | No project description, ability or project repository link exists before completed Henshin                                   | browser + reducer            |
| R02 | Silver/ivory/graphite hardware with distinct original marks         | Separate grip and rotor groups; accent lights limited to status                                                              | desktop/mobile screenshots   |
| R03 | Pointer-driven opening/closing                                      | Both grips and rotor follow progress immediately; insufficient/cancelled travel restores origin                              | unit + pointer browser tests |
| R04 | Exclusive gestures                                                  | First pointer owns interaction; second pointer ignored; cancellation/lost capture cannot commit                              | unit + browser cancellation  |
| R05 | Vertical card drag                                                  | Ghost follows pointer; modest movement tilt; aligns near mouth; valid downward drop inserts; invalid drop returns            | geometry + browser           |
| R06 | One card, open-only insertion                                       | Insert animation then loaded; no transformation until inward handle lock                                                     | reducer + browser            |
| R07 | Directed Henshin                                                    | Lock 0–150, scan 150–300, energy 300–550, identity 550–850, dock 850–1500, reveal only at completion                         | timeline tests + browser     |
| R08 | Active project and abilities                                        | Actual year/category/status/contribution/outcomes, conceptual visual identified, repository and source evidence after reveal | content audit + browser      |
| R09 | Mechanical project change                                           | Outward reopen deactivates stage, card remains, upward ejection returns open, next cycle activates one project               | reducer + browser            |
| R10 | Accessible equivalent                                               | Native buttons, arrow/Enter controls, optional tap controls, live instructions, focus handoff; no skipped logical steps      | keyboard + axe               |
| R11 | Reduced motion                                                      | Same states/guards; short bounded transitions, no energy sweep; completes without animationend                               | reducer + browser            |
| R12 | Stable completion                                                   | Run IDs reject stale callbacks; timeout and visibility catch-up complement RAF; cleanup on unmount                           | unit + lifecycle review      |
| R13 | Responsive                                                          | 320/390/768/1440 widths, touch targets >=44 px, scrollable active stage clear of dock                                        | responsive browser           |
| R14 | Reproducible delivery                                               | Lockfile, type check, unit suite, production build and CI; publish review branch/PR                                          | logs + GitHub checks         |

## Architecture decision

Keep Next.js App Router/React/TypeScript. An SVG scene is sufficient for a front-view quarter-turn and linked handle travel; no perspective camera, model assets or WebGL are needed. 3D is deferred until a measured depth/rotation requirement warrants its network and GPU costs. Original SVG/CSS render without third-party assets. System fonts keep the page usable offline.

- `src/lib/driver-machine.ts`: pure finite state machine, guards, bounded progress, run-token validation and invariants.
- `src/lib/driver-geometry.ts`: travel, attraction and downward-drop/ejection checks independent of the view.
- `src/lib/driver-timeline.ts`: named milestones and deterministic time-to-phase mapping.
- `src/data/driver-projects.ts`: complete project/card/ability types with pinned repository evidence.
- `src/components/decade-experience.tsx`: pointer lease, capture/cancellation, keyboard/tap equivalence, bounded controller, focus and optional audio.
- `src/components/decadriver-model.tsx`: original SVG hardware; CSS variables rotate/move independently without remounting.
- `src/components/project-stage.tsx`: revealed content and evidence-bound abilities.

No request, authentication or token is required for the transformation. Verified, versioned static project content is deliberate: a live GitHub feed cannot prove feature completeness and would make entry dependent on network availability. Public source links preserve verification. Existing unused legacy components can remain unimported; only `/` is rendered.

The active project stage scrolls independently within the viewport above the dock. Selecting an ability brings its evidence panel into that region without moving the Driver. This avoids a fixed device covering readable project content and preserves keyboard scrolling through the focusable stage.

## Formal state transition table

Model fields: state, cardId, draggingId, openness, settling, origin, run. One pointer lease belongs to the controller; run identifies each bounded animation. Unknown/unsafe events return the unchanged model.

| Current                   | Event / guard                       | Side effect and next                                 | Animation                      | Recovery                     |
| ------------------------- | ----------------------------------- | ---------------------------------------------------- | ------------------------------ | ---------------------------- |
| idle                      | HANDLE_START                        | opening, origin idle                                 | gesture 0→1                    | cancel/subthreshold→idle     |
| active                    | HANDLE_START / card present         | reopening, origin active; stage immediately unmounts | gesture 0→1                    | cancel→active with same card |
| loaded                    | HANDLE_START / card present         | closing, origin loaded                               | gesture 1→0                    | cancel→loaded                |
| open                      | HANDLE_START / slot empty           | closing, origin open                                 | gesture 1→0                    | cancel→open, no card          |
| opening/reopening/closing | HANDLE_MOVE / not settling          | clamp openness, same state                           | immediate linked motion        | ignore foreign pointer       |
| opening/reopening/closing | HANDLE_RELEASE / threshold          | mark settling, run++                                 | snap to endpoint               | no new gestures              |
| opening                   | COMPLETE / run matches, settling    | open                                                 | bounded snap                   | stale completion ignored     |
| reopening                 | COMPLETE / run matches, settling    | loaded, preserve card                                | bounded snap                   | stale completion ignored     |
| closing                   | COMPLETE / card + matching run      | transforming, run++                                  | directed 1500 ms               | stale completion ignored     |
| closing                   | COMPLETE / no card + matching run   | idle, clear origin and settling                      | bounded mechanical closure     | no Henshin or content        |
| idle/active/loaded/open   | HANDLE_KEY                          | same opening/reopening/closing states, settling      | bounded full-travel equivalent | same guards                  |
| open                      | CARD_START / known card, slot empty | cardDragging, draggingId                             | pointer ghost                  | cancel→open                  |
| cardDragging              | CARD_DROP / valid geometry          | inserting, cardId=draggingId, run++                  | downward lock                  | invalid→open                 |
| open                      | INSERT_KEY / known card, slot empty | inserting, cardId, run++                             | same downward lock             | unsafe insertion ignored     |
| inserting                 | COMPLETE / run matches              | loaded                                               | card-set feedback              | stale ignored                |
| transforming              | COMPLETE / run matches              | active                                               | dock final + stage reveal      | stale ignored                |
| loaded                    | EJECT_START                         | ejecting, not settling                               | pointer lift                   | cancel/subthreshold→loaded   |
| ejecting                  | EJECT_RELEASE / threshold           | settling, run++                                      | upward return                  | no new gestures              |
| loaded                    | EJECT_KEY                           | ejecting, settling, run++                            | equivalent return              | same card guard              |
| ejecting                  | COMPLETE / run matches, settling    | open, cardId=null                                    | deck restores                  | stale ignored                |

Invariants: cardId is null before loading; only one cardId exists; active/transforming/loaded/reopening/ejecting require a card. Closing comes either from loaded with its card or from open with no card. Empty closure returns idle without Henshin. No content mounts unless active; insertion requires empty open slot; any cancellation preserves the original committed position/card; transitions cannot accept a second gesture; project identity cannot change without ejection. Assertions and generated event walks test these properties. Empty closure was added by the later user correction recorded in `RECESSED-ENTRY-EMPTY-CLOSURE.md`.

## Input, feedback and accessibility

Handles: drag left handle left/right handle right to open, reverse to close. Arrow keys express the same direction; Enter/Space starts the current operation and still passes through transitional states. Deck Enter/Space inserts only when open. Loaded card ArrowUp ejects. Escape cancels a live gesture. Optional visible tap controls expose open, insert via deck, close and eject individually.

Each pointer captures its ID and owns one lease. Release and cancellation are separate. Card drop requires downward travel and overlap with mouth; cancelled gestures never synthesize drops. Scale-aware handle travel adapts to the dock and phone. Native button targets remain at least 44 px even if artwork is smaller. Focus moves to the next appropriate control; active heading receives focus after reveal. Status is an atomic polite live region. Color is accompanied by text and progress labels. Reduced motion retains the steps but suppresses sweeping effects and shortens settling/controller duration.

Optional sound defaults off, uses Web Audio oscillators after a user action, catches unavailable audio, and closes on unmount. No autoplay/media download. Motion never flashes repeatedly. The hardware, glow and text share one timeline; project reveal never depends on CSS animationend.

## Data integrity

SpendWise and Learn are read from their actual repositories before mapping. Pin source links to inspected commits. SpendWise v0.2 requirements describe future multi-account/deep-learning work; present Python domain/CSV, synthetic seed/grouped split and rule/Dummy prototypes are the evidence. No production ML, real-user metrics or complete finance UI is claimed. Learn's lesson/guide materials demonstrate ongoing learning, not certification or completion. Portfolio descriptions refer to the implemented Driver and its tests.

## Release and verification

Run unit tests and type check, then production build, then browser tests against that build. Cover pointer/keyboard, cancellation, switching, wrong-direction travel, wrong drop, touch/reduced motion and 320px overflow. Add CI gates with minimal read permissions. Create a review branch and draft PR; do not merge automatically. Record actual CI/deployment states, source SHA, logs and screenshots in `docs/VERIFICATION.md`. Vercel scope access may limit build-log inspection; do not present local success as production deployment success.

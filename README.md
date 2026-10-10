# KREV1 — DECADE DRIVER PORTFOLIO

A single-page portfolio discovered through an original mechanical card reader. Choose a card to open and load automatically, or pull a handle and drag a card into the reader; push inward to transform, then explore the project and its evidenced ability cards. Reopen and pull the card upward to change projects.

Built with Next.js App Router, React, TypeScript, SVG, CSS, GSAP and Lenis. GlareHover, SplitText and AnimatedContent are adapted from the selected React Bits TypeScript/CSS sources; their license and provenance are retained in src/components/react-bits. An unofficial fan concept informed by official Decadriver references; artwork, project emblems and optional synthesized sounds are original. No official image, logo or sampled transformation audio is shipped.

## Run and verify

Node.js 24 and npm:

```sh
npm ci
npm test
npm run typecheck
npm run build
npm start
```

For development, use `npm run dev`. The production site is connected to the existing Vercel project; feature branches produce review previews when Git integration permits them. CI runs type checks, tests and a production build.

## Controls

| Operation         | Pointer                                                                       | Keyboard                                           |
| ----------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| Open / reopen     | Pull left handle left, or right handle right                                  | Focus handle; use outward arrow, Enter or Space    |
| Insert            | Click a card while closed to open/load; tap or drag into the groove when open | Enter / Space on a card; closed Driver opens first |
| Close / transform | Push either handle inward                                                     | Use inward arrow, Enter or Space                   |
| Eject             | Pull the exposed card upward while open                                       | Arrow Up / Enter on loaded card                    |
| Cancel            | Release short of the lock; cancelled capture restores origin                  | Escape during a drag                               |

Optional **Keyboard & tap controls** exposes equivalent operations one step at a time. Animation defaults to Full motion and remembers your choice; Device setting follows the device preference and Reduced motion shortens effects while preserving every logical step. Sound defaults off. GSAP coordinates visual arrival/Henshin independently of the mechanical deadlines. Lenis smooths only the inner project panel; native touch and Reduced motion stay direct. Card glare and staggered project text/content reveals preserve native button hit areas.

Enable **Sound** for the original electronic reader sequence: robotic card announcements, barcode sweep, waiting texture, latch and layered transformation. Voices preload only after enabling sound; missing audio never blocks the Driver. The occupied deck card is dimmed until extraction. Henshin's ring, scanner, glass light and identification use that card's accent.

An empty open Driver can also close. It returns to standby; transformation and project content require an inserted card.

## Specification and evidence

- [Specification, research and transition table](docs/SDD-DECADE-DRIVER.md)
- [Visual fidelity revision and acceptance](docs/VISUAL-FIDELITY.md)
- [Seated card, groove and circular lens specification](docs/CARD-READER-FIDELITY.md)
- [Programming-language marks on the ivory face](docs/LANGUAGE-MARKS.md)
- [Physical card proportions and two-part Driver](docs/CARD-DRIVER-PROPORTIONS.md)
- [Fixed carrier branding and card passage under the lens](docs/CARRIER-BRANDING-LENS-ENTRY.md)
- [Continuous card mechanics, rotating lens print and rear carrier branding](docs/CONTINUOUS-CARD-MECHANICS.md)
- [Recessed entry, integrated carrier and empty closure](docs/RECESSED-ENTRY-EMPTY-CLOSURE.md)
- [Card feedback, Henshin colors and electronic reader audio](docs/CARD-FEEDBACK-HENSHIN-AUDIO.md)
- [One-shot arrival, closed-driver card selection and reader rhythm](docs/ENTRY-CARD-SELECTION-AUDIO.md)
- [GSAP, Lenis and selected React Bits integration](docs/ANIMATION-LIBRARY-INTEGRATION.md)
- [Original announcement provenance](public/audio/PROVENANCE.md)
- [Verification and delivery record](docs/VERIFICATION.md)
- `src/lib/driver-machine.ts`: pure guarded transitions and run tokens
- `src/lib/driver-geometry.ts`: scale-aware gestures and slot attraction
- `src/lib/driver-timeline.ts`: one directed Henshin timeline
- `src/data/driver-projects.ts`: complete types and repository-pinned evidence
- `tests/`: state-machine, geometry, timeline and controller tests

SpendWise is in progress: Python transaction / CSV tooling and synthetic baseline experiments are implemented; its complete web application and production ML pipeline are future work. Learn is an ongoing public study track. Concept visuals are labeled and do not represent completed product screenshots. Static audited content keeps project discovery independent of GitHub rate limits; source links enable verification.

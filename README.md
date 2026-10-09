# KREV1 — DECADE DRIVER PORTFOLIO

A single-page portfolio discovered through an original mechanical card reader. Pull a handle, insert a project card, push inward to transform, then explore the project and its evidenced ability cards. Reopen and pull the card upward to change projects.

Built with Next.js App Router, React, TypeScript, SVG and CSS. An unofficial fan concept informed by official Decadriver references; artwork, project emblems and optional synthesized sounds are original. No official image, logo or sampled transformation audio is shipped.

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

| Operation         | Pointer                                                      | Keyboard                                        |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| Open / reopen     | Pull left handle left, or right handle right                 | Focus handle; use outward arrow, Enter or Space |
| Insert            | Drag a deck card downward into the highlighted mouth         | Enter / Space on a card after opening           |
| Close / transform | Push either handle inward                                    | Use inward arrow, Enter or Space                |
| Eject             | Pull the exposed card upward while open                      | Arrow Up / Enter on loaded card                 |
| Cancel            | Release short of the lock; cancelled capture restores origin | Escape during a drag                            |

Optional **Keyboard & tap controls** exposes equivalent operations one step at a time. Reduced motion shortens effects and preserves every logical step. Sound defaults off.

## Specification and evidence

- [Specification, research and transition table](docs/SDD-DECADE-DRIVER.md)
- [Verification and delivery record](docs/VERIFICATION.md)
- `src/lib/driver-machine.ts`: pure guarded transitions and run tokens
- `src/lib/driver-geometry.ts`: scale-aware gestures and slot attraction
- `src/lib/driver-timeline.ts`: one directed Henshin timeline
- `src/data/driver-projects.ts`: complete types and repository-pinned evidence
- `tests/`: state-machine, geometry, timeline and controller tests

SpendWise is in progress: Python transaction / CSV tooling and synthetic baseline experiments are implemented; its complete web application and production ML pipeline are future work. Learn is an ongoing public study track. Concept visuals are labeled and do not represent completed product screenshots. Static audited content keeps project discovery independent of GitHub rate limits; source links enable verification.

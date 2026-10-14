# Production release — V19

Website: [https://krev1.vercel.app/](https://krev1.vercel.app/)

This source incorporates the previously deployed V19 snapshot, including the centered desktop composition, viewport-sized opening layout, side notes, enlarged proportional cards and Driver, corrected card occlusion, click flight, logo heartbeat and hover cleanup.

- Deployment: `dpl_CM9DERWqRGN16iUTnwmztPF7NKsk`
- Exact deployment: https://monograph-portfolio-5wqsgy1kb-tmtri0910-6726.vercel.app
- Deployed source manifest SHA-256: `e779812f1dbbaf3e638c55ec31494207a8679c38a6d5178ec93bdff4b26145a9`
- This GitHub sync adds the live-site link and documentation to the deployed implementation.

Validation: production build passed locally and on Vercel; the public page and its expected layout/effect assets returned HTTP 200. The latest controller/state/geometry/timeline suite has 70 passing checks. Offline SVG checks confirm the layer order at 20%, 50% and 90% insertion. These checks do not replace live browser interaction testing; browser tooling was unavailable for the later local visual revisions.

The selected soundtrack is still pending. `src/lib/driver-background-music.ts` has a null source, so no background track is fetched or played. Original V13 effects remain included with provenance under `public/audio/v13/`.

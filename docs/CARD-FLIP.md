# Card flip interaction

Initial page entry reveals the three cards from their reader backs to their fronts with720ms flips and140ms staggering. Nested transforms separate arrival from selection, so choosing a card cancels arrival cleanly. Native buttons and hidden SVG artwork preserve accessible card names.

Pointer down flips a card face-down without committing insertion. Open-reader drag uses the same two faces on the captured ghost. Click/keyboard selection flips before the physical reader card moves: the first31% of the900ms insertion hides reader print, then the card slides for the remaining interval; the deck copy fades after the flip. Mechanical deadlines and audio score remain unchanged. Invalid drop, cancellation, Escape and completed extraction restore the deck front. Reduced motion switches faces directly.

Verification:66 tests pass, TypeScript/build pass. Integration cases cover two faces, initial entry cancellation on hold, hold without insertion, cancelled hold, invalid drag restoration and all prior Driver/audio/gesture flows. Local native browser snapshots show a partially flipped arriving deck and a face-down selected KREV1 card while the reader groove is still empty.

# Reference-grounded reader audio rebuild

User request:2026-10-10. Baseline26c9594928a2c7b1c9658239434a9bb9d4ec8a8e.

## Evidence and tools

Both supplied YouTube references were accessed anonymously for signal analysis: e-6vh4FWuOw (645.341s) and1io0g-4Sz3A (363.021s). Reference audio remains in local work scratch, not the shipped application. FFmpeg7.1 decodes the recordings, SciPy/STFT measures timing/frequency candidates, and faster-whisper1.2.1/base runs local ASR. ASR on electronically processed voices is unreliable and is not treated as verified text. The CSM video's authored English captions distinguish Kamenride/Attackride/Final Formride and identify triple beeps as unreadable-card feedback. Narrowband triple beeps near227.56/227.82/228.09s measure around2273Hz and are therefore excluded from normal standby/valid-card sounds. Valid-card windows160–169s,204–214s and232–239s have broad speech/effect energy around750–1313Hz and2.5–3.2kHz; these mixture measurements guide timbre rather than certify isolated belt frequencies.

Plugin discovery found Descript, not connected, and no ElevenLabs entry. The completed independent path uses local models/tools without a paid API or account. Piper1.8.0 + the stock en_US-libritts_r-medium model (speaker2) create new announcements; model card attributes LibriTTS-R/CC BY4.0. No film/toy voice recording is shipped or actor clone trained. Generic neural speech is shaped with a20-band vocoder, lower pitch, comb reflections and saturation. Normal Kamenride uses a category plus plain name; repeated initials in the captions belong to Final Formride and are not applied to every ordinary transformation. Retain attribution/provenance and record exact file hashes.

## Accepted behavior

- Distinguish open and close latch sounds. Opening/reopening, closure, card insertion, transformation, ability activation and extraction have separate layered Foley/scan assets.
- Add movement-dependent friction while a handle/card extraction gesture is actually moving. Decay its gain when movement stops; stop it on release/cancel, mute, hidden page and teardown.
- Use a quiet electronic holding texture for a loaded reader; never use the reference's invalid-card triple beep for valid cards.
- Keep speech separate from Foley. Closing does not cut off the category announcement. In fast/reduced cycles, serialize the project announcement after the category rather than overlap two voices. New opening/extraction/ability/mute cancels obsolete pending speech. No late decode result starts an old cue.
- Preload original PCM assets only after Sound On. Keep procedural fallback effects when assets fail. Static generated assets live under /audio/v12/ so browser caches cannot substitute the previous pack.
- Preserve mechanical state guards,900ms insertion,2400ms Henshin, GSAP/Lenis/React Bits integration and permanent circular lens aperture. Audio never gates visual completion.
- Render an audible full-cycle preview from the same scheduler/assets; verify finite PCM, bounded peaks, mixed levels, all asset availability, cue sequencing, future-source cancellation and native Sound On/mute interaction. Similarity remains a user-listening judgment; measurements do not certify an exact film match.

# Inserted-card feedback, card-colored Henshin and electronic reader audio

Date: 2026-10-09. Baseline: `3a27366ae054bb581854011b9722f5eae9f1796b`.
Recorded before implementation for the user's request for a dimmed inserted card, Henshin matching its color, and Decade-style audio.

## Design contract

- Assumption for the ambiguous dimming request: mark the matching card in the deck as occupied/dimmed after insertion is accepted. The assistant has asked whether this instead means the print inside the glass; any reply overrides this assumption. Keep the physical card source clear and continuous. Only the occupied deck card gets the stronger opacity/desaturation/soft blur; invalid/cancelled drops do not dim it. Completed extraction restores it; cancelled extraction and reopening retain occupancy. Add an accessible occupied-card description without changing existing button names.
- Derive a single transformation accent from the selected card: SpendWise #ff3ea5, Learn #9c63ff, KREV1 #ff8dca. Use it for the energy ring/glow, scanner, glass illumination, HENSHIN lettering and identification accents. Preserve neutral hardware colors and the established 1500ms timeline. Empty closure remains uncolored standby with no transformation.
- Replace the short beep array with an owned Web Audio engine: mechanical latch/servo, barcode scan, quiet waiting texture, reader announcement, project-name announcement and layered transformation pulse/arpeggio/resolution. Ability/extraction get related short cues. Audio uses its own scheduling and never gates the FSM.
- [Bandai's development note](https://toy.bandai.co.jp/ja/topics/01_17247/) describes insertion → reader announcement → waiting → latch → card-name announcement → transformation, with overlapping transitions in ver.2 to reproduce the film's pacing. Use this sequencing as the creative reference; these original synthesized effects are not claimed to be an exact toy recording.
- Generate brief generic robotic announcements from local Windows stock speech, then process them into small mono WAV assets: Kamen ride; Spend Wise; Learn; Krev One. No actor voice cloning or extracted film/toy recording. Record provenance and generation settings.
- Audio stays off until the existing Sound button is enabled. Create/resume the context in that user gesture; preload/decode only then. Failed asset/audio initialization leaves the mechanical cycle functional. Mute, newer conflicting cues, hidden tabs and unmount stop scheduled/looping sources and prevent late announcements. Bound output gain and clip tails. Keep original code-generated FX available even if announcements fail to load.

## Acceptance

| ID  | Requirement                                                                                                          | Evidence                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| A01 | The occupied deck card is distinctly dimmed; other cards retain their ordinary disabled look; extraction restores it | All-card controller cases and native CSS measurements         |
| A02 | Ring, scan, glass and HENSHIN identification use the matching color                                                  | Tests, actual mid-transformation captures for all accents     |
| A03 | New original layered cues and robotic announcements are audible and follow actual actions                            | Native Sound On cycle, rendered audio sample and asset checks |
| A04 | Muting/disposal cancels pending audio; loading failure and audio-off do not affect state deadlines                   | Audio lifecycle and controller tests                          |
| A05 | Empty closure, continuous card motion, cancellation, responsive controls and project reveal remain guarded           | Complete regression suite and native cycle                    |
| A06 | Tests, types, build, exact-revision preview/archive pass; original audio assets have recorded provenance             | Delivery record                                               |

Technical references: [OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext), [scheduled source stop](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/stop), and [DynamicsCompressorNode](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode).

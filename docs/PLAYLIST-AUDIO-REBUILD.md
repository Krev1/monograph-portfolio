# V13 � playlist-informed original Driver sound

Reference: [Kamen Rider Decade Henshin Sound playlist](https://www.youtube.com/playlist?list=PL8fr9oxKtrRmprlWZtbvJLWNNwFPXgz-X),21 entries by Masaki Yamato. The description identifies Kamen Rider Legends / Decade Flash Belt, so this is a fan simulation reference, not an authenticated film sound master. Decade (XGVBDRZbljw), Kuuga (ABY8B8CNat0) and Kiva (T6qFls-xUqk) were decoded for local signal analysis only.

Measured Decade steady section11�15s: strongest envelope autocorrelation candidate1.21s (normalised correlation0.506), spectral clusters267/964/1307/1597/1869/2092/2643/3141/4195Hz. These are mixture measurements, not certified individual sound stems. Automatic speech transcription is unreliable and was not used to certify actor identity or exact wording.

Original synthesis uses four alternating tone clusters in a1.21s quiet waiting loop, resonant optical insertion, and a2.37s transformation with precharge, scanner lock, barcode bursts, descending metallic ribbon and armour impact. Frequencies inform original oscillators; no reference PCM or actor clone is shipped. Voice is stock Piper speaker2,0.82 resampling speed,117Hz vocoder carrier with70% dry /30% vocoded mix; less modulation and saturation retain more speech clarity. Open/close/movement/extraction retain the prior original Foley. The Attack Ride window increases to0.84s to include the entire0.8238s file.

All13 current assets are versioned under /audio/v13/. PCM16,24kHz, mono voice/stereo effects,661422 bytes total. Standby gain0.18, mechanical timings remain unchanged. Sound is off until enabled; cancellation, hidden-page handling and procedural fallback remain.

Verification:64 tests, strict TypeScript and Next.js production build pass. Route74.1kB /177kB first-load JS. Three full cycles were rendered using the same DriverAudio scheduler and shipped files:6.281s, stereo44.1kHz, peak0.3405, RMS0.0532�0.0533. No non-finite samples or clipping. These are technical checks, not a subjective listening certification; perceived closeness must be judged by the listener.

Descript's earlier EQ candidate was not substituted: its agent cannot listen or generate new effects. This revision instead uses new playlist measurements and original DSP.

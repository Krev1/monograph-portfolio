# V13 — playlist-informed original Driver sound

Reference: [Kamen Rider Decade Henshin Sound playlist](https://www.youtube.com/playlist?list=PL8fr9oxKtrRmprlWZtbvJLWNNwFPXgz-X),21 entries by Masaki Yamato. The description identifies Kamen Rider Legends / Decade Flash Belt, so this is a fan simulation reference, not an authenticated film sound master. Decade (XGVBDRZbljw), Kuuga (ABY8B8CNat0) and Kiva (T6qFls-xUqk) were decoded for local signal analysis only.

Measured Decade steady section11–15s: strongest envelope autocorrelation candidate1.21s (normalised correlation0.506), spectral clusters267/964/1307/1597/1869/2092/2643/3141/4195Hz. These are mixture measurements, not certified individual sound stems. Automatic speech transcription is unreliable and was not used to certify actor identity or exact wording.

Original synthesis uses four alternating tone clusters in a1.21s quiet waiting loop, resonant optical insertion, and a2.37s transformation with precharge, scanner lock, barcode bursts, descending metallic ribbon and armour impact. Frequencies inform original oscillators; no reference PCM or actor clone is shipped. Voice is stock Piper speaker2,0.82 resampling speed,117Hz vocoder carrier with70% dry /30% vocoded mix; less modulation and saturation retain more speech clarity. Open/close/movement/extraction retain the prior original Foley. The Attack Ride window increases to0.84s to include the entire0.8238s file.

All13 current assets are versioned under /audio/v13/. PCM16,24kHz, mono voice/stereo effects,661422 bytes total. Standby gain0.18, mechanical timings remain unchanged. Sound is off until enabled; cancellation, hidden-page handling and procedural fallback remain.

Verification:64 tests, strict TypeScript and Next.js production build pass. Route74.1kB /177kB first-load JS. Three full cycles were rendered using the same DriverAudio scheduler and shipped files:6.281s, stereo44.1kHz, peak0.3405, RMS0.0532–0.0533. No non-finite samples or clipping. These are technical checks, not a subjective listening certification; perceived closeness must be judged by the listener.

Descript's earlier EQ candidate was not substituted: its agent cannot listen or generate new effects. This revision instead uses new playlist measurements and original DSP.

Stock model attribution: Piper/Rhasspy, LibriTTS-R dataset, [model card](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/libritts_r/medium/MODEL_CARD), [CC BY4.0](https://creativecommons.org/licenses/by/4.0/). Model and tools stay outside the app.

| File | Seconds | Channels | Bytes | SHA-256 |
| --- | --- | --- | --- | --- |
| 001.wav | 0.6777 | 1 | 32576 | 522230635efea15eba9d75b6ae6758ebc62c9fd09ea518eae666ecbb2cfec825 |
| 002.wav | 0.5075 | 1 | 24402 | 108e23ae5e63112a9dbcfedeb0395dc47dfd72735aa3780e890edbf5fe00a3c4 |
| 003.wav | 0.544 | 1 | 26158 | b75e0e88137a0c400e58c7ae247c97497962877814e3f078ffabc03244ebaba3 |
| ability.wav | 0.25 | 2 | 24044 | bf13aca6e50e19f34d13c5c1bc214dcc87225a330bd21ab4a0766d707f3c2fb6 |
| attack.wav | 0.8238 | 1 | 39588 | 975c3807129c99cd93ef54962b5a01e2c6669fd352e37c1ea2f889cf9d1b226f |
| close.wav | 0.175 | 2 | 16844 | 8c9b75e747a3170c5718b36b7a93d7aed73342dced91741e84627ab928e210a1 |
| eject.wav | 0.265 | 2 | 25484 | c35476339d64d59ae4f3312e77d4bad25c66cb804d79289e0fd4d85319e26f26 |
| henshin.wav | 2.37 | 2 | 227564 | 84013f31b0f8953f662877fa32cd01d961858603ba8da120ae7cde995f702067 |
| insert.wav | 0.32 | 2 | 30764 | deb38798db77028ba3300b1f948cedff6801aa4cf36d07d97ad1d36bb5cd4f2f |
| move.wav | 0.5 | 2 | 48044 | 3f1dd90388aef83cc34b15b3b7a838b7d9715c9c0e2e645d9ed353eff04d231d |
| open.wav | 0.175 | 2 | 16844 | ca9286dd94ef83dc57e5ae7dceba12efa14a816a00392b2e8e7cdc888c7ffdef |
| ride.wav | 0.6846 | 1 | 32906 | ad2cf50cc15f0db6993cb46d1bd3cb5ed022d6d9e6cc26f3c25ec7bf7e74da3d |
| standby.wav | 1.21 | 2 | 116204 | 460e7c8f084df4eca8fb8467014d51652a82e99d9c773af164092e8997893322 |

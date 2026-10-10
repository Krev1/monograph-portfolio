# V12 reference-grounded original reader audio

Rebuilt2026-10-10 using local FFmpeg7.1, SciPy1.18.1, faster-whisper1.2.1 and piper-tts1.8.0. No remote paid generation API is required by the website.

References: https://www.youtube.com/watch?v=1io0g-4Sz3A and https://www.youtube.com/watch?v=e-6vh4FWuOw. Their audio was decoded locally for timing/spectral analysis; reference recordings stay in work scratch and are not app assets. The CSM authored captions identify normal Kamenride, Attackride and Final Formride. Triple beep groups at3:47 and later indicate unreadable cards, so those patterns are excluded from valid-reader standby. Automatic ASR is unreliable for the processed device speech and is not treated as verified wording.

Speech: stock Piper en_US-libritts_r-medium, speakerId2 (not a cloned actor), English text `Kah men Ride!`, `Spend Wise!`, `Learn!`, `Krev One!`, `Attack Ride!`. Synth settings: length_scale0.8, noise_scale0.35, noise_w_scale0.45. Processing: silence trim,24kHz resampling,0.90 pitch/speed shift,140–5600Hz band limit,20-band vocoder with136Hz pulse carrier,58% dry/42% vocoded blend,91Hz light modulation, saturation/quantization and8/19ms comb reflections. Ordinary category/name readouts stay plain; Final Formride initial repetition is not applied to ordinary Henshin. Speech peak0.82.

Model/dataset attribution: Piper voice collection by Rhasspy/Michael Hansen; LibriTTS-R medium model card: https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/libritts_r/medium/MODEL_CARD. Dataset: https://www.openslr.org/141/; the supplied model card identifies CC BY4.0: https://creativecommons.org/licenses/by/4.0/. Model/engine remain generation tools outside the web app.

Effects: original deterministic DSP (seed0xdecade) creates separate stereo24kHz PCM16 opening/closing latches, paper friction/optical chirp, quiet holding texture, movement grain, layered FM/barcode/sub-bass/impact Henshin, ability scan and extraction. Normal FX peaks≤0.76. Each asset uses edge tapers and short stereo room reflections. All13 assets load only after Sound On under versioned /audio/v12/ URLs. Procedural fallback remains. Speech and Foley have separate owned lanes; closing preserves category speech, fast recognition serializes names, and mute/open/extract/new ability/hidden page/unmount cancel stale audio.

| File | Seconds | Channels | Bytes | SHA-256 |
| --- | --- | --- | --- | --- |
| ride.wav | 0.6238 | 1 | 29984 | d0bbc6ebfc736f42845591c417cecb2f4325fb1dea2e01be8e28e36aeb44cc2c |
| 001.wav | 0.6175 | 1 | 29684 | 44e2aba8a87c076100cba682d301379f3eda20b1b2b09f3526cb5857856209c5 |
| 002.wav | 0.4623 | 1 | 22236 | 0315e132674bdf5444815bbe2136e33e7314233bab1ac1fbee8ffca000f5e2c3 |
| 003.wav | 0.4957 | 1 | 23836 | b716c5393ef67394d95394de1bb6315edb2cd3fec86db5dc7ce488576dbc1d2e |
| attack.wav | 0.7506 | 1 | 36074 | 6f09e7d037cc97f6533f0101c86a0115cdf28e041cde66f746a863ed066b3272 |
| open.wav | 0.175 | 2 | 16844 | ca9286dd94ef83dc57e5ae7dceba12efa14a816a00392b2e8e7cdc888c7ffdef |
| close.wav | 0.175 | 2 | 16844 | 8c9b75e747a3170c5718b36b7a93d7aed73342dced91741e84627ab928e210a1 |
| insert.wav | 0.32 | 2 | 30764 | e98096f45d70abc6c26252a042e6abc713717a7215bcbf40bbe59afa26c5a634 |
| standby.wav | 1 | 2 | 96044 | 240f8e972432fb0f07375c419d94db73e8ec65e13e91ad07a75e8ef1860046d0 |
| move.wav | 0.5 | 2 | 48044 | 3f1dd90388aef83cc34b15b3b7a838b7d9715c9c0e2e645d9ed353eff04d231d |
| henshin.wav | 2.37 | 2 | 227564 | cea2c8134ac929a5c53d5c5e1d212d3a5d7b60f2c96b4457be7d1b11128c02fd |
| ability.wav | 0.25 | 2 | 24044 | 39710d3997ade69ed75fccd924f0dcec04fc4fe294b8d635d898fca3d9aa4a85 |
| eject.wav | 0.265 | 2 | 25484 | c35476339d64d59ae4f3312e77d4bad25c66cb804d79289e0fd4d85319e26f26 |

Total new sound pack: 627446 bytes. Original earlier files remain for older cached deployments; current code uses the versioned pack.

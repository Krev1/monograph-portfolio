import type { ProjectId } from "./driver-machine";

export type DriverSound = "snap" | "insert" | "henshin" | "ability" | "eject";
export type VoiceId = "ride" | ProjectId;
type CueBase = { at: number; duration: number; gain: number; pan?: number };
export type SoundCue = CueBase &
  (
    | {
        kind: "tone";
        waveform: OscillatorType;
        from: number;
        to: number;
        detune?: number;
      }
    | {
        kind: "noise";
        filter: BiquadFilterType;
        from: number;
        to: number;
        q: number;
      }
    | { kind: "voice"; voice: VoiceId }
  );
export const DRIVER_VOICES: Record<VoiceId, string> = {
  ride: "/audio/ride.wav",
  "001": "/audio/001.wav",
  "002": "/audio/002.wav",
  "003": "/audio/003.wav",
};

export function driverSoundScore(
  sound: DriverSound,
  cardId: ProjectId | null = null,
): SoundCue[] {
  const base = cardId === "002" ? 164.81 : cardId === "003" ? 174.61 : 146.83;
  const tone = (
    at: number,
    duration: number,
    from: number,
    to: number,
    gain: number,
    waveform: OscillatorType = "triangle",
    pan = 0,
  ): Extract<SoundCue, { kind: "tone" }> => ({
    kind: "tone",
    at,
    duration,
    from,
    to,
    gain,
    waveform,
    pan,
  });
  const noise = (
    at: number,
    duration: number,
    from: number,
    to: number,
    gain: number,
    q = 2,
    pan = 0,
  ): SoundCue => ({
    kind: "noise",
    at,
    duration,
    from,
    to,
    gain,
    filter: "bandpass",
    q,
    pan,
  });
  switch (sound) {
    case "snap":
      return [
        noise(0, 0.045, 3800, 1900, 0.2, 1),
        tone(0.008, 0.14, 165, 52, 0.16, "sine"),
        tone(0.03, 0.12, 1600, 430, 0.04, "square"),
      ];
    case "insert":
      return [
        noise(0, 0.075, 3100, 6500, 0.12, 3),
        tone(0.012, 0.095, 2300, 720, 0.085, "square", -0.2),
        ...Array.from({ length: 8 }, (_, i) =>
          tone(
            0.015 + i * 0.012,
            0.009,
            1800 + i * 260,
            2200 + i * 210,
            0.045,
            "square",
            i % 2 ? 0.4 : -0.4,
          ),
        ),
        {
          kind: "voice",
          voice: "ride",
          at: 0.105,
          duration: 0.76,
          gain: 0.48,
        },
      ];
    case "henshin": {
      const cues: SoundCue[] = [
        noise(0, 0.065, 5400, 1400, 0.17, 1),
        tone(0, 0.19, 155, 44, 0.15, "sine"),
        tone(0.018, 0.075, 2100, 620, 0.07, "square"),
        noise(1.08, 0.55, 700, 6800, 0.07, 4),
        tone(1.05, 0.83, 240, 4600, 0.035, "sawtooth", 0.25),
      ];
      if (cardId)
        cues.push({
          kind: "voice",
          voice: cardId,
          at: 0.14,
          duration: 0.98,
          gain: 0.52,
        });
      const notes = [4, 2, 4, 3, 6, 3, 6, 4, 8, 4, 8, 6];
      notes.forEach((ratio, i) =>
        cues.push(
          tone(
            1.04 + i * 0.068,
            0.053,
            base * ratio,
            base * ratio * 1.22,
            0.065,
            "square",
            i % 2 ? 0.3 : -0.3,
          ),
        ),
      );
      [1, 1.1892, 1.4983, 2].forEach((ratio, i) =>
        cues.push({
          ...tone(
            1.92,
            0.45,
            base * ratio,
            base * ratio,
            0.065,
            "sawtooth",
            (i - 1.5) * 0.15,
          ),
          detune: i % 2 ? 7 : -7,
        }),
      );
      cues.push(
        noise(1.92, 0.4, 6400, 450, 0.06, 1),
        tone(1.92, 0.45, base / 2, base / 2, 0.15, "sine"),
      );
      return cues;
    }
    case "ability":
      return [
        tone(0, 0.11, base * 4, base * 4, 0.085, "square", -0.3),
        tone(0.1, 0.18, base * 6, base * 6, 0.07, "triangle", 0.3),
        noise(0.05, 0.13, 2600, 5100, 0.05, 6),
      ];
    case "eject":
      return [
        noise(0, 0.19, 4600, 500, 0.09, 4),
        tone(0, 0.2, 2200, 310, 0.06, "sawtooth"),
        noise(0.205, 0.055, 2700, 900, 0.15, 1),
        tone(0.2, 0.07, 130, 60, 0.09, "sine"),
      ];
  }
}

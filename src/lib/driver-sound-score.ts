import type { ProjectId } from "./driver-machine";

export type DriverSound =
  "open" | "close" | "insert" | "henshin" | "ability" | "eject";
export type VoiceId = "ride" | "attack" | ProjectId;
export type SampleId = DriverSound | "standby" | "move";
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
    | { kind: "sample"; sample: SampleId }
  );
export const DRIVER_VOICES: Record<VoiceId, string> = {
  ride: "/audio/v12/ride.wav",
  attack: "/audio/v12/attack.wav",
  "001": "/audio/v12/001.wav",
  "002": "/audio/v12/002.wav",
  "003": "/audio/v12/003.wav",
};
export const DRIVER_SAMPLES: Record<SampleId, string> = {
  open: "/audio/v12/open.wav",
  close: "/audio/v12/close.wav",
  insert: "/audio/v12/insert.wav",
  henshin: "/audio/v12/henshin.wav",
  ability: "/audio/v12/ability.wav",
  eject: "/audio/v12/eject.wav",
  standby: "/audio/v12/standby.wav",
  move: "/audio/v12/move.wav",
};
export const DRIVER_ASSETS = { ...DRIVER_VOICES, ...DRIVER_SAMPLES };

export function driverSoundScore(
  sound: DriverSound,
  cardId: ProjectId | null = null,
  sampleAvailable = false,
): SoundCue[] {
  const speech: SoundCue[] =
    sound === "insert"
      ? [{ kind: "voice", voice: "ride", at: 0.11, duration: 0.76, gain: 0.66 }]
      : sound === "henshin" && cardId
        ? [
            {
              kind: "voice",
              voice: cardId,
              at: 0.14,
              duration: 1.02,
              gain: 0.66,
            },
          ]
        : sound === "ability"
          ? [
              {
                kind: "voice",
                voice: "attack",
                at: 0.035,
                duration: 0.8,
                gain: 0.62,
              },
            ]
          : [];
  if (sampleAvailable) {
    const durations = {
      open: 0.16,
      close: 0.16,
      insert: 0.32,
      henshin: 2.37,
      ability: 0.25,
      eject: 0.265,
    };
    return [
      {
        kind: "sample",
        sample: sound,
        at: 0,
        duration: durations[sound],
        gain: sound === "henshin" ? 0.68 : 0.58,
      },
      ...speech,
    ];
  }
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
    case "open":
      return [
        noise(0, 0.06, 1900, 5800, 0.17, 2),
        tone(0.006, 0.14, 320, 110, 0.12, "sine"),
        tone(0.035, 0.09, 790, 1310, 0.055, "triangle"),
      ];
    case "close":
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
        ...speech,
      ];
    case "henshin": {
      const cues: SoundCue[] = [
        noise(0, 0.065, 5400, 1400, 0.17, 1),
        tone(0, 0.19, 155, 44, 0.15, "sine"),
        tone(0.018, 0.075, 2100, 620, 0.07, "square"),
        noise(1.08, 0.55, 700, 6800, 0.07, 4),
        tone(1.05, 0.83, 240, 4600, 0.035, "sawtooth", 0.25),
      ];
      cues.push(...speech);
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
        ...speech,
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

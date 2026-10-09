import { clamp } from "./driver-machine";
export const CARD_INSERT_DURATION = 620;
export const HENSHIN_DURATION = 1500;
export function henshinFrame(elapsed: number, reduced = false) {
  if (reduced)
    return {
      phase: "recognize",
      scan: 0,
      energy: 0,
      identity: 0,
      dock: clamp(elapsed / 100),
    };
  return {
    phase:
      elapsed < 150
        ? "lock"
        : elapsed < 300
          ? "scan"
          : elapsed < 550
            ? "energize"
            : elapsed < 850
              ? "identify"
              : "dock",
    scan: clamp((elapsed - 150) / 150),
    energy:
      elapsed >= 300 && elapsed < 1100
        ? Math.sin(clamp((elapsed - 300) / 800) * Math.PI)
        : 0,
    identity:
      elapsed >= 550 && elapsed < 1100
        ? Math.sin(clamp((elapsed - 550) / 550) * Math.PI)
        : 0,
    dock: clamp((elapsed - 850) / 650),
  };
}

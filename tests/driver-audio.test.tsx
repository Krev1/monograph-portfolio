import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { DriverAudio, scheduleDriverSound } from "../src/lib/driver-audio";
import { DRIVER_VOICES, driverSoundScore } from "../src/lib/driver-sound-score";
import DecadeExperience from "../src/components/decade-experience";

class Param {
  value = 0;
  setValueAtTime = vi.fn();
  exponentialRampToValueAtTime = vi.fn();
  linearRampToValueAtTime = vi.fn();
  setValueCurveAtTime = vi.fn();
}
class Node {
  gain = new Param();
  frequency = new Param();
  detune = new Param();
  Q = new Param();
  pan = new Param();
  threshold = new Param();
  knee = new Param();
  ratio = new Param();
  attack = new Param();
  release = new Param();
  type = "";
  buffer: AudioBuffer | null = null;
  onended: (() => void) | null = null;
  connect = vi.fn();
  disconnect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}
class Context {
  currentTime = 0;
  sampleRate = 24000;
  destination = new Node();
  sources: Node[] = [];
  resume = vi.fn(async () => {});
  close = vi.fn(async () => {});
  createGain = () => new Node();
  createBiquadFilter = () => new Node();
  createStereoPanner = () => new Node();
  createDynamicsCompressor = () => new Node();
  createOscillator = () => {
    const node = new Node();
    this.sources.push(node);
    return node;
  };
  createBufferSource = this.createOscillator;
  createBuffer = (_channels: number, length: number, rate: number) => ({
    duration: length / rate,
    getChannelData: () => new Float32Array(length),
  });
  decodeAudioData = vi.fn(
    async () => this.createBuffer(1, 12000, 24000) as unknown as AudioBuffer,
  );
}
let instances: Context[];
beforeEach(() => {
  instances = [];
  vi.stubGlobal(
    "AudioContext",
    class extends Context {
      constructor() {
        super();
        instances.push(this);
      }
    },
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      arrayBuffer: async () => new ArrayBuffer(8),
    })),
  );
  window.localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Original reader audio", () => {
  it("has bounded layered cues and the selected card's announcement", () => {
    for (const sound of [
      "snap",
      "insert",
      "henshin",
      "ability",
      "eject",
    ] as const) {
      for (const card of ["001", "002", "003"] as const) {
        const score = driverSoundScore(sound, card);
        for (const cue of score) {
          expect(cue.at).toBeGreaterThanOrEqual(0);
          expect(cue.duration).toBeGreaterThan(0);
          expect(cue.at + cue.duration + 0.02).toBeLessThanOrEqual(1.5);
          expect(cue.gain).toBeGreaterThan(0);
          expect(cue.gain).toBeLessThanOrEqual(0.52);
        }
        if (sound === "henshin")
          expect(
            score.filter((cue) => cue.kind === "voice").map((cue) => cue.voice),
          ).toEqual([card]);
      }
    }
    expect(
      driverSoundScore("henshin", null).some((cue) => cue.kind === "voice"),
    ).toBe(false);
    expect(
      driverSoundScore("henshin", "001").filter((cue) => cue.kind !== "voice")
        .length,
    ).toBeGreaterThan(12);
  });
  it("stops future and active sources and disconnects their graph", () => {
    const context = new Context();
    const handle = scheduleDriverSound(
      context as unknown as BaseAudioContext,
      context.destination as unknown as AudioNode,
      driverSoundScore("henshin", "001"),
    );
    expect(context.sources.length).toBeGreaterThan(12);
    expect(
      context.sources.some((source) => source.start.mock.calls[0][0] > 1),
    ).toBe(true);
    handle.stop();
    context.sources.forEach((source) => {
      expect(source.stop).toHaveBeenLastCalledWith(0);
      expect(source.disconnect).toHaveBeenCalled();
      expect(source.onended).toBeNull();
    });
  });
  it("mute stops waiting/cues and dispose aborts resources without late playback", async () => {
    const context = new Context();
    const engine = new DriverAudio(context as unknown as AudioContext);
    await engine.unlock();
    expect(fetch).toHaveBeenCalledTimes(4);
    engine.setStandby(true);
    engine.play("henshin", "002");
    engine.mute();
    const count = context.sources.length;
    context.sources.forEach((source) => expect(source.stop).toHaveBeenCalled());
    engine.play("henshin", "001");
    expect(context.sources).toHaveLength(count);
    engine.dispose();
    engine.dispose();
    expect(context.close).toHaveBeenCalledTimes(1);
    await engine.unlock();
    expect(context.resume).toHaveBeenCalledTimes(1);
  });
  it("failed announcements still allow the synthesized effects", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Offline"));
    const context = new Context(),
      engine = new DriverAudio(context as unknown as AudioContext);
    await engine.unlock();
    engine.play("insert", "001");
    expect(context.sources.length).toBeGreaterThan(8);
    engine.dispose();
  });
  it("ships brief, finite original PCM announcements", () => {
    for (const url of Object.values(DRIVER_VOICES)) {
      const file = readFileSync(new URL("../public" + url, import.meta.url));
      expect(file.toString("ascii", 0, 4)).toBe("RIFF");
      expect(file.toString("ascii", 8, 12)).toBe("WAVE");
      expect(file.readUInt16LE(20)).toBe(1);
      expect(file.readUInt16LE(22)).toBe(1);
      expect(file.readUInt32LE(24)).toBe(24000);
      expect(file.readUInt16LE(34)).toBe(16);
      expect(file.length).toBeLessThan(32000);
      for (let i = 44; i < file.length; i += 2)
        expect(Math.abs(file.readInt16LE(i)) / 32768).toBeLessThanOrEqual(
          0.821,
        );
    }
  });
  it("audio stays opt-in and mute/unmount never hold the transformation deadline", async () => {
    vi.useFakeTimers();
    const view = render(<DecadeExperience />);
    expect(instances).toHaveLength(0);
    expect(fetch).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /SOUND OFF/ }));
    await act(async () => {
      await Promise.resolve();
    });
    expect(instances).toHaveLength(1);
    const handle = screen.getByRole("button", { name: /^Left handle/ });
    fireEvent.keyDown(handle, { key: "ArrowLeft" });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(180);
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Insert LEARN project card" }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(620);
    });
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(180);
    });
    fireEvent.click(screen.getByRole("button", { name: /SOUND ON/ }));
    expect(document.querySelector("main")!.getAttribute("data-state")).toBe(
      "transforming",
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });
    expect(document.querySelector("main")!.getAttribute("data-state")).toBe(
      "active",
    );
    view.unmount();
    expect(instances[0].close).toHaveBeenCalledTimes(1);
  });
});

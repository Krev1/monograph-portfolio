import type { ProjectId } from "./driver-machine";
import { DRIVER_ASSETS, driverSoundScore } from "./driver-sound-score";
import type {
  DriverSound,
  SoundCue,
  VoiceId,
  SampleId,
} from "./driver-sound-score";

export type VoiceBuffers = Partial<Record<VoiceId | SampleId, AudioBuffer>>;
export type SoundHandle = { stop: () => void };

// The same graph scheduler is used live and for the review audio rendering.
export function scheduleDriverSound(
  context: BaseAudioContext,
  output: AudioNode,
  cues: SoundCue[],
  voices: VoiceBuffers = {},
  onEnded?: () => void,
): SoundHandle {
  const active = new Map<AudioScheduledSourceNode, AudioNode[]>();
  const start = context.currentTime + 0.012;
  function own(source: AudioScheduledSourceNode, nodes: AudioNode[]) {
    active.set(source, nodes);
    source.onended = () => {
      nodes.forEach((node) => node.disconnect());
      active.delete(source);
      if (!active.size) onEnded?.();
    };
  }
  for (const cue of cues) {
    const asset =
      cue.kind === "voice"
        ? voices[cue.voice]
        : cue.kind === "sample"
          ? voices[cue.sample]
          : undefined;
    if ((cue.kind === "voice" || cue.kind === "sample") && !asset) continue;
    let source: OscillatorNode | AudioBufferSourceNode;
    const nodes: AudioNode[] = [];
    let duration = cue.duration;
    if (cue.kind === "tone") {
      const oscillator = context.createOscillator();
      oscillator.type = cue.waveform;
      oscillator.frequency.setValueAtTime(cue.from, start + cue.at);
      oscillator.frequency.exponentialRampToValueAtTime(
        cue.to,
        start + cue.at + duration,
      );
      oscillator.detune.value = cue.detune ?? 0;
      source = oscillator;
    } else {
      const bufferSource = context.createBufferSource();
      if (cue.kind === "voice" || cue.kind === "sample") {
        bufferSource.buffer = asset!;
        duration = Math.min(cue.duration, bufferSource.buffer.duration);
      } else {
        const buffer = context.createBuffer(
          1,
          Math.ceil(duration * context.sampleRate),
          context.sampleRate,
        );
        const samples = buffer.getChannelData(0);
        let seed = 0xdecade ^ Math.round(cue.at * 1000);
        for (let i = 0; i < samples.length; i++) {
          seed ^= seed << 13;
          seed ^= seed >>> 17;
          seed ^= seed << 5;
          samples[i] = (seed >>> 0) / 2147483648 - 1;
        }
        bufferSource.buffer = buffer;
      }
      source = bufferSource;
    }
    nodes.push(source);
    let tail: AudioNode = source;
    if (cue.kind === "noise") {
      const filter = context.createBiquadFilter();
      filter.type = cue.filter;
      filter.Q.value = cue.q;
      filter.frequency.setValueAtTime(cue.from, start + cue.at);
      filter.frequency.exponentialRampToValueAtTime(
        cue.to,
        start + cue.at + duration,
      );
      tail.connect(filter);
      tail = filter;
      nodes.push(filter);
    }
    const gain = context.createGain();
    const time = start + cue.at;
    const attack = Math.min(0.012, duration * 0.2);
    const envelope = new Float32Array(64);
    for (let i = 0; i < envelope.length; i++) {
      const position = (i / (envelope.length - 1)) * duration;
      if (position < attack)
        envelope[i] = 0.0001 * Math.pow(cue.gain / 0.0001, position / attack);
      else if (cue.kind === "voice" || cue.kind === "sample") {
        // Sustain speech to its final syllable, with a short edge taper.
        envelope[i] =
          position < duration - attack
            ? cue.gain
            : Math.max(0.0001, (cue.gain * (duration - position)) / attack);
      } else if (position < duration * 0.55)
        envelope[i] = cue.gain * (1 - (0.28 * position) / (duration * 0.55));
      else
        envelope[i] =
          cue.gain *
          0.72 *
          Math.pow(
            0.0001 / (cue.gain * 0.72),
            (position - duration * 0.55) / (duration * 0.45),
          );
    }
    gain.gain.setValueCurveAtTime(envelope, time, duration);
    tail.connect(gain);
    tail = gain;
    nodes.push(gain);
    if (context.createStereoPanner) {
      const pan = context.createStereoPanner();
      pan.pan.value = cue.pan ?? 0;
      tail.connect(pan);
      tail = pan;
      nodes.push(pan);
    }
    tail.connect(output);
    own(source, nodes);
    source.start(time);
    source.stop(time + duration + 0.008);
  }
  return {
    stop() {
      for (const [source, nodes] of active) {
        try {
          source.stop(context.currentTime);
        } catch {
          /* Already ended. */
        }
        nodes.forEach((node) => node.disconnect());
        source.onended = null;
      }
      active.clear();
    },
  };
}

type LoopHandle = SoundHandle & {
  source: AudioBufferSourceNode;
  gain: GainNode;
};

export class DriverAudio {
  private context: AudioContext;
  private master: GainNode;
  private limiter: DynamicsCompressorNode;
  private voices: VoiceBuffers = {};
  private requests = new AbortController();
  private loading: Promise<unknown> | null = null;
  private cue: SoundHandle | null = null;
  private speech = new Set<SoundHandle>();
  private speechUntil = 0;
  private readerSpeech = false;
  private standby: LoopHandle | null = null;
  private mechanism: LoopHandle | null = null;
  private previousProgress = 0;
  private previousMoveTime = 0;
  private enabled = false;
  private disposed = false;
  constructor(context = new AudioContext()) {
    this.context = context;
    this.master = context.createGain();
    this.master.gain.value = 0.62;
    this.limiter = context.createDynamicsCompressor();
    this.limiter.threshold.value = -12;
    this.limiter.knee.value = 8;
    this.limiter.ratio.value = 4;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.11;
    this.master.connect(this.limiter);
    this.limiter.connect(context.destination);
  }
  async unlock() {
    if (this.disposed) return;
    this.enabled = true;
    await this.context.resume();
    if (this.disposed || !this.enabled) return;
    if (!this.loading)
      this.loading = Promise.allSettled(
        Object.entries(DRIVER_ASSETS).map(async ([key, url]) => {
          const response = await fetch(url, { signal: this.requests.signal });
          if (!response.ok) throw new Error("Reader audio unavailable");
          const buffer = await this.context.decodeAudioData(
            await response.arrayBuffer(),
          );
          if (!this.disposed) this.voices[key as VoiceId | SampleId] = buffer;
        }),
      );
    await this.loading;
  }
  private stopSpeech() {
    this.speech.forEach((handle) => handle.stop());
    this.speech.clear();
    this.speechUntil = 0;
    this.readerSpeech = false;
  }
  play(sound: DriverSound, cardId: ProjectId | null = null) {
    if (!this.enabled || this.disposed) return;
    this.cue?.stop();
    this.cue = null;
    this.setStandby(false);
    this.setMechanism(false, 0);
    // Only a just-read category may finish across closure/recognition.
    if (
      !((sound === "close" && cardId) || sound === "henshin") ||
      !this.readerSpeech
    )
      this.stopSpeech();
    const score = driverSoundScore(sound, cardId, !!this.voices[sound]);
    this.cue = scheduleDriverSound(
      this.context,
      this.master,
      score.filter((cue) => cue.kind !== "voice"),
      this.voices,
    );
    const voiceCues = score.filter(
      (cue): cue is Extract<SoundCue, { kind: "voice" }> =>
        cue.kind === "voice" && !!this.voices[cue.voice],
    );
    if (!voiceCues.length) return;
    const shift =
      sound === "henshin"
        ? Math.max(
            0,
            this.speechUntil -
              this.context.currentTime -
              voiceCues[0].at +
              0.015,
          )
        : 0;
    const queued = voiceCues.map((cue) => ({ ...cue, at: cue.at + shift }));
    let handle: SoundHandle;
    handle = scheduleDriverSound(
      this.context,
      this.master,
      queued,
      this.voices,
      () => {
        this.speech.delete(handle);
        if (!this.speech.size) {
          this.speechUntil = 0;
          this.readerSpeech = false;
        }
      },
    );
    this.speech.add(handle);
    this.readerSpeech = sound === "insert";
    this.speechUntil =
      this.context.currentTime +
      0.012 +
      Math.max(
        ...queued.map(
          (cue) =>
            cue.at + Math.min(cue.duration, this.voices[cue.voice]!.duration),
        ),
      );
  }
  private loop(sample: "standby" | "move", volume: number): LoopHandle {
    const source = this.context.createBufferSource();
    if (this.voices[sample]) source.buffer = this.voices[sample]!;
    else {
      const buffer = this.context.createBuffer(
        1,
        this.context.sampleRate,
        this.context.sampleRate,
      );
      const values = buffer.getChannelData(0);
      for (let i = 0; i < values.length; i++) {
        const time = i / this.context.sampleRate,
          phase = (time * 8) % 1;
        const edge = Math.min(1, phase * 16, (1 - phase) * 16);
        values[i] =
          sample === "standby"
            ? Math.sin(
                2 * Math.PI * (Math.floor(time * 8) % 2 ? 1313 : 1195) * time,
              ) *
              edge *
              Math.exp(-phase * 4)
            : (Math.sin(2 * Math.PI * 1723 * time) +
                Math.sin(2 * Math.PI * 3181 * time)) *
              0.25;
      }
      source.buffer = buffer;
    }
    source.loop = true;
    const gain = this.context.createGain();
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(this.master);
    source.start();
    return {
      source,
      gain,
      stop: () => {
        try {
          source.stop();
        } catch {}
        source.disconnect();
        gain.disconnect();
      },
    };
  }
  setStandby(on: boolean) {
    if (!on || !this.enabled || this.disposed) {
      this.standby?.stop();
      this.standby = null;
      return;
    }
    if (!this.standby) this.standby = this.loop("standby", 0.18);
  }
  setMechanism(on: boolean, progress: number) {
    if (!on || !this.enabled || this.disposed) {
      this.mechanism?.stop();
      this.mechanism = null;
      return;
    }
    const now = this.context.currentTime;
    if (!this.mechanism) {
      this.mechanism = this.loop("move", 0.0001);
      this.previousProgress = progress;
      this.previousMoveTime = now;
      return;
    }
    const speed =
      Math.abs(progress - this.previousProgress) /
      Math.max(0.016, now - this.previousMoveTime);
    this.previousProgress = progress;
    this.previousMoveTime = now;
    const volume = Math.max(0.0001, Math.min(0.14, speed * 0.04));
    this.mechanism.source.playbackRate.setValueAtTime(
      0.85 + Math.min(1.5, progress) * 0.25,
      now,
    );
    this.mechanism.gain.gain.cancelScheduledValues(now);
    this.mechanism.gain.gain.setValueAtTime(volume, now);
    this.mechanism.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  }
  stopAll() {
    this.cue?.stop();
    this.cue = null;
    this.stopSpeech();
    this.setStandby(false);
    this.setMechanism(false, 0);
  }
  mute() {
    this.enabled = false;
    this.stopAll();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.mute();
    this.requests.abort();
    this.voices = {};
    this.master.disconnect();
    this.limiter.disconnect();
    void this.context.close().catch(() => {});
  }
}

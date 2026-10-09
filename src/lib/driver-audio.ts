import type { ProjectId } from "./driver-machine";
import { DRIVER_VOICES, driverSoundScore } from "./driver-sound-score";
import type { DriverSound, SoundCue, VoiceId } from "./driver-sound-score";

export type VoiceBuffers = Partial<Record<VoiceId, AudioBuffer>>;
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
    if (cue.kind === "voice" && !voices[cue.voice]) continue;
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
      if (cue.kind === "voice") {
        bufferSource.buffer = voices[cue.voice]!;
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
      else if (cue.kind === "voice") {
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

export class DriverAudio {
  private context: AudioContext;
  private master: GainNode;
  private limiter: DynamicsCompressorNode;
  private voices: VoiceBuffers = {};
  private requests = new AbortController();
  private loading: Promise<unknown> | null = null;
  private cue: SoundHandle | null = null;
  private standby: SoundHandle | null = null;
  private enabled = false;
  private disposed = false;
  constructor(context = new AudioContext()) {
    this.context = context;
    this.master = context.createGain();
    this.master.gain.value = 0.58;
    this.limiter = context.createDynamicsCompressor();
    this.limiter.threshold.value = -14;
    this.limiter.knee.value = 8;
    this.limiter.ratio.value = 5;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.12;
    this.master.connect(this.limiter);
    this.limiter.connect(context.destination);
  }
  async unlock() {
    if (this.disposed) return;
    this.enabled = true;
    await this.context.resume();
    if (!this.loading)
      this.loading = Promise.allSettled(
        Object.entries(DRIVER_VOICES).map(async ([key, url]) => {
          const response = await fetch(url, { signal: this.requests.signal });
          if (!response.ok) throw new Error("Reader announcement unavailable");
          const buffer = await this.context.decodeAudioData(
            await response.arrayBuffer(),
          );
          if (!this.disposed) this.voices[key as VoiceId] = buffer;
        }),
      );
    await this.loading;
  }
  play(sound: DriverSound, cardId: ProjectId | null = null) {
    if (!this.enabled || this.disposed) return;
    this.cue?.stop();
    this.cue = null;
    if (sound !== "ability") this.setStandby(false);
    this.cue = scheduleDriverSound(
      this.context,
      this.master,
      driverSoundScore(sound, cardId),
      this.voices,
    );
  }
  setStandby(on: boolean) {
    if (!on || !this.enabled || this.disposed) {
      this.standby?.stop();
      this.standby = null;
      return;
    }
    if (this.standby) return;
    const pulse = this.context.createBufferSource();
    const buffer = this.context.createBuffer(
      1,
      this.context.sampleRate,
      this.context.sampleRate,
    );
    const samples = buffer.getChannelData(0);
    // Alternating scanner pulses with silent gaps, rather than a continuous hum.
    const notes = [587.33, 0, 880, 0, 587.33, 880, 1174.66, 0];
    for (let i = 0; i < samples.length; i++) {
      const time = i / this.context.sampleRate;
      const position = (time * 8) % 1;
      const frequency = notes[Math.floor(time * 8)];
      const edge = Math.min(1, position * 16, (1 - position) * 16);
      samples[i] =
        Math.sin(2 * Math.PI * frequency * time) *
        edge *
        Math.exp(-position * 4);
    }
    pulse.buffer = buffer;
    pulse.loop = true;
    const gain = this.context.createGain();
    gain.gain.value = 0.045;
    pulse.connect(gain);
    gain.connect(this.master);
    pulse.start();
    this.standby = {
      stop: () => {
        try {
          pulse.stop();
        } catch {}
        pulse.disconnect();
        gain.disconnect();
      },
    };
  }
  stopAll() {
    this.cue?.stop();
    this.cue = null;
    this.setStandby(false);
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

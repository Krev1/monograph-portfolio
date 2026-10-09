"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { driverProjects } from "@/data/driver-projects";
import type { PortfolioProject } from "@/data/driver-projects";
import { driverReducer, initialDriver } from "@/lib/driver-machine";
import type { ProjectId } from "@/lib/driver-machine";
import {
  attractCard,
  handleProgress,
  SNAP_THRESHOLD,
  validDrop,
} from "@/lib/driver-geometry";
import { henshinFrame, HENSHIN_DURATION } from "@/lib/driver-timeline";
import DecadriverModel from "./decadriver-model";
import ProjectStage, { CardEmblem } from "./project-stage";

type Lease = { pointerId: number; target: HTMLButtonElement } & (
  | {
      kind: "handle";
      x: number;
      side: -1 | 1;
      closing: boolean;
      travel: number;
    }
  | { kind: "card"; x: number; y: number; previousX: number; cardId: ProjectId }
  | { kind: "eject"; y: number; travel: number }
);
type Ghost = {
  cardId: ProjectId;
  x: number;
  y: number;
  tilt: number;
  aligned: boolean;
};
type Sound = "snap" | "insert" | "henshin" | "ability" | "eject";
const tones: Record<Sound, number[]> = {
  snap: [180, 280],
  insert: [440, 660, 880],
  henshin: [130, 220, 440, 660, 880],
  ability: [520, 780],
  eject: [440, 260],
};
function CardFace({ project }: { project: PortfolioProject }) {
  return (
    <>
      <span className="card-top">
        <b>K / {project.id}</b>
        <span>PROJECT CARD</span>
      </span>
      <span className="card-emblem">
        <CardEmblem emblem={project.mainCard.emblem} />
      </span>
      <strong>
        {project.title === "KREV1 PORTFOLIO" ? "KREV1" : project.title}
      </strong>
      <span className="card-bottom">
        <span>{project.mainCard.code}</span>
        <i aria-hidden="true" />
      </span>
    </>
  );
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function DecadeExperience() {
  const [model, dispatch] = useReducer(driverReducer, initialDriver);
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [lift, setLift] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [abilityId, setAbilityId] = useState<string | null>(null);
  const [tapControls, setTapControls] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notice, setNotice] = useState("");
  const reduced = useReducedMotion();
  const lease = useRef<Lease | null>(null);
  const modelRef = useRef(model);
  modelRef.current = model;
  const sceneRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const previousState = useRef(model.state);
  const soundedRun = useRef(-1);
  const selected = driverProjects.find(
    (project) => project.id === model.cardId,
  );
  const moving =
    ["opening", "closing", "reopening"].includes(model.state) &&
    !model.settling;
  const handlesReady = ["idle", "active", "loaded"].includes(model.state);
  const frame = henshinFrame(elapsed, reduced);
  const dock =
    model.state === "active"
      ? 1
      : model.state === "reopening"
        ? 1 - model.openness
        : model.state === "transforming"
          ? frame.dock
          : 0;
  function sound(type: Sound) {
    if (!soundEnabled) return;
    try {
      const context = audioRef.current ?? new AudioContext();
      audioRef.current = context;
      void context.resume().catch(() => {});
      tones[type].forEach((frequency, index) => {
        const start = context.currentTime + index * 0.075;
        const oscillator = context.createOscillator(),
          gain = context.createGain();
        oscillator.type = type === "snap" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.025, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.11);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.12);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      });
    } catch {
      /* Optional audio does not affect the mechanical cycle. */
    }
  }
  const soundRef = useRef(sound);
  soundRef.current = sound;
  useEffect(
    () => () => {
      if (audioRef.current) void audioRef.current.close().catch(() => {});
    },
    [],
  );

  // A run token and deadline complement RAF; CSS animationend is never required.
  useEffect(() => {
    const transforming = model.state === "transforming";
    if (!transforming) setElapsed(0);
    if (!transforming && !model.settling) return;
    const duration = reduced
      ? transforming
        ? 100
        : 60
      : transforming
        ? HENSHIN_DURATION
        : model.state === "inserting"
          ? 320
          : model.state === "ejecting"
            ? 280
            : 180;
    const start = performance.now();
    let raf = 0,
      done = false;
    const finish = () => {
      if (!done) {
        done = true;
        cancelAnimationFrame(raf);
        dispatch({ type: "COMPLETE", run: model.run, state: model.state });
      }
    };
    const tick = () => {
      if (done) return;
      const time = performance.now() - start;
      if (transforming) setElapsed(Math.min(time, duration));
      if (time >= duration) finish();
      else if (transforming) raf = requestAnimationFrame(tick);
    };
    if (transforming) setElapsed(0);
    if (soundedRun.current !== model.run) {
      soundedRun.current = model.run;
      soundRef.current(
        transforming
          ? "henshin"
          : model.state === "inserting"
            ? "insert"
            : model.state === "ejecting"
              ? "eject"
              : "snap",
      );
    }
    const timer = window.setTimeout(finish, duration);
    if (transforming) raf = requestAnimationFrame(tick);
    const visible = () => {
      if (document.visibilityState === "visible") {
        cancelAnimationFrame(raf);
        tick();
      }
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      done = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [model.state, model.settling, model.run, reduced]);
  useEffect(() => {
    const previous = previousState.current;
    previousState.current = model.state;
    if (model.state !== "active") setAbilityId(null);
    if (model.state === "open")
      firstCardRef.current?.focus({ preventScroll: true });
    if (model.state === "loaded")
      (previous === "reopening" ? slotRef : leftRef).current?.focus({
        preventScroll: true,
      });
    if (model.state === "active") {
      window.scrollTo({ top: 0, behavior: "instant" });
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [model.state]);
  function releaseLease() {
    const held = lease.current;
    lease.current = null;
    if (held)
      try {
        if (held.target.hasPointerCapture(held.pointerId))
          held.target.releasePointerCapture(held.pointerId);
      } catch {
        /* Capture was already released. */
      }
  }
  function cancelGesture(pointerId?: number) {
    const held = lease.current;
    if (!held || (pointerId !== undefined && pointerId !== held.pointerId))
      return;
    releaseLease();
    setGhost(null);
    setLift(0);
    dispatch({
      type:
        held.kind === "handle"
          ? "HANDLE_CANCEL"
          : held.kind === "card"
            ? "CARD_CANCEL"
            : "EJECT_CANCEL",
    });
    setNotice("Gesture cancelled. The previous position is restored.");
  }
  const cancelRef = useRef(cancelGesture);
  cancelRef.current = cancelGesture;
  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && lease.current) {
        event.preventDefault();
        cancelRef.current();
      }
    };
    window.addEventListener("keydown", escape);
    const blur = () => cancelRef.current();
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("blur", blur);
    };
  }, []);
  function capture(event: PointerEvent<HTMLButtonElement>, held: Lease) {
    event.preventDefault();
    lease.current = held;
    setNotice("");
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* Synthetic tests may not support capture. */
    }
  }
  function startHandle(event: PointerEvent<HTMLButtonElement>, side: -1 | 1) {
    if (
      lease.current ||
      !handlesReady ||
      event.button !== 0 ||
      event.isPrimary === false
    )
      return;
    capture(event, {
      kind: "handle",
      pointerId: event.pointerId,
      target: event.currentTarget,
      x: event.clientX,
      side,
      closing: model.state === "loaded",
      travel: Math.max(
        28,
        (sceneRef.current?.getBoundingClientRect().width ?? 600) * 0.11,
      ),
    });
    dispatch({ type: "HANDLE_START" });
  }
  function startCard(
    event: PointerEvent<HTMLButtonElement>,
    cardId: ProjectId,
  ) {
    if (
      lease.current ||
      tapControls ||
      model.state !== "open" ||
      event.button !== 0 ||
      event.isPrimary === false
    )
      return;
    capture(event, {
      kind: "card",
      pointerId: event.pointerId,
      target: event.currentTarget,
      cardId,
      x: event.clientX,
      y: event.clientY,
      previousX: event.clientX,
    });
    setGhost({
      cardId,
      x: event.clientX,
      y: event.clientY,
      tilt: 0,
      aligned: false,
    });
    dispatch({ type: "CARD_START", cardId });
  }
  function startEject(event: PointerEvent<HTMLButtonElement>) {
    if (
      lease.current ||
      model.state !== "loaded" ||
      event.button !== 0 ||
      event.isPrimary === false
    )
      return;
    capture(event, {
      kind: "eject",
      pointerId: event.pointerId,
      target: event.currentTarget,
      y: event.clientY,
      travel: Math.max(
        35,
        (slotRef.current?.getBoundingClientRect().width ?? 90) * 0.8,
      ),
    });
    dispatch({ type: "EJECT_START" });
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const held = lease.current;
    if (!held || event.pointerId !== held.pointerId) return;
    if (held.kind === "handle") {
      const progress = handleProgress(
        held.x,
        event.clientX,
        held.side,
        held.closing,
        held.travel,
      );
      dispatch({
        type: "HANDLE_MOVE",
        openness: held.closing ? 1 - progress : progress,
      });
    } else if (held.kind === "card") {
      const attraction = attractCard(
        { x: event.clientX, y: event.clientY },
        slotRef.current?.getBoundingClientRect() ?? null,
        held.previousX,
      );
      setGhost({ cardId: held.cardId, ...attraction });
      held.previousX = event.clientX;
    } else
      setLift(Math.max(0, Math.min(held.travel * 1.5, held.y - event.clientY)));
  }
  function end(event: PointerEvent<HTMLButtonElement>) {
    const held = lease.current;
    if (!held || event.pointerId !== held.pointerId) return;
    releaseLease();
    setGhost(null);
    if (held.kind === "handle") {
      const committed =
        handleProgress(
          held.x,
          event.clientX,
          held.side,
          held.closing,
          held.travel,
        ) >= SNAP_THRESHOLD;
      dispatch({ type: "HANDLE_RELEASE", committed });
      if (!committed) setNotice("Pull farther to reach the mechanical lock.");
    } else if (held.kind === "card") {
      const slot = slotRef.current?.getBoundingClientRect() ?? null;
      const aligned = attractCard(
        { x: event.clientX, y: event.clientY },
        slot,
        held.previousX,
      );
      const valid = validDrop({ x: held.x, y: held.y }, aligned, slot);
      dispatch({ type: "CARD_DROP", valid });
      if (!valid)
        setNotice("Card returned. Drag downward into the highlighted slot.");
    } else {
      const committed = held.y - event.clientY >= held.travel * SNAP_THRESHOLD;
      dispatch({ type: "EJECT_RELEASE", committed });
      setLift(0);
      if (!committed) setNotice("Pull the card farther upward to release it.");
    }
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, side: -1 | 1) {
    if (
      !handlesReady ||
      lease.current ||
      (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
    )
      return;
    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    if (direction === (model.state === "loaded" ? -side : side)) {
      setNotice("");
      dispatch({ type: "HANDLE_KEY" });
    } else
      setNotice(
        model.state === "loaded"
          ? "Push this handle inward to close."
          : "Pull this handle outward to open.",
      );
  }
  function insertKey(cardId: ProjectId) {
    if (!lease.current) {
      setNotice("");
      dispatch({ type: "INSERT_KEY", cardId });
    }
  }
  const status = {
    idle: "PULL SIDE HANDLES TO OPEN",
    opening: "OPENING — PULL TO THE LOCK",
    open: "INSERT PROJECT CARD",
    cardDragging: ghost?.aligned
      ? "SLOT ALIGNED — RELEASE TO INSERT"
      : "DRAG CARD DOWN TO THE READER",
    inserting: "READING PROJECT CARD",
    loaded: "CARD SET — PUSH HANDLES IN",
    closing: "CLOSING — PUSH TO THE LOCK",
    transforming: "HENSHIN — PROJECT RECOGNIZED",
    active: "PROJECT ACTIVE — REOPEN TO CHANGE CARD",
    reopening: "REOPENING — CARD RETAINED",
    ejecting: "PULL CARD UP TO EJECT",
  }[model.state];
  const step =
    model.state === "idle" || model.state === "opening"
      ? 1
      : model.state === "open" || model.state === "cardDragging"
        ? 2
        : model.state === "loaded" ||
            model.state === "inserting" ||
            model.state === "closing"
          ? 3
          : model.state === "transforming"
            ? 4
            : 5;
  const deckVisible = !["active", "transforming", "reopening"].includes(
    model.state,
  );
  const sceneStyle = {
    "--open": model.openness,
    "--dock": dock,
    "--energy": model.state === "transforming" ? frame.energy : 0,
    "--scan": model.state === "transforming" ? frame.scan : 0,
    "--lift": lift + "px",
  } as CSSProperties;
  const pointerHandlers = {
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: (event: PointerEvent<HTMLButtonElement>) =>
      cancelGesture(event.pointerId),
    onLostPointerCapture: (event: PointerEvent<HTMLButtonElement>) =>
      cancelGesture(event.pointerId),
  };
  return (
    <main
      className={
        "experience state-" + model.state + (reduced ? " reduced-motion" : "")
      }
      data-state={model.state}
    >
      <header className="experience-header">
        <a className="wordmark" href="/" aria-label="KREV1 home">
          KREV<span>1</span>
          <i />
        </a>
        <span className="header-label">DECADE / PROJECT DRIVER</span>
        <div className="header-actions">
          <button
            type="button"
            aria-pressed={soundEnabled}
            onClick={() => setSoundEnabled((value) => !value)}
          >
            SOUND {soundEnabled ? "ON" : "OFF"}
            <span aria-hidden="true">{soundEnabled ? "◖))" : "◖"}</span>
          </button>
          <a
            href="https://github.com/Krev1"
            target="_blank"
            rel="noreferrer"
            aria-label="Krev1 on GitHub"
          >
            GITHUB ↗
          </a>
        </div>
      </header>
      <div className="system-line">
        <span>INTERACTIVE PORTFOLIO</span>
        <div className="step-track" aria-label={"Step " + step + " of 5"}>
          {[1, 2, 3, 4, 5].map((number) => (
            <i key={number} className={number <= step ? "lit" : ""} />
          ))}
        </div>
        <span>0{step} / 05</span>
      </div>
      <div
        className="instruction"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="instruction-dot" />
        <strong>{status}</strong>
        <p>
          {notice ||
            (model.state === "idle"
              ? "Hold either handle. Pull outward."
              : model.state === "open"
                ? "Choose a card. Keep it vertical. Drag down."
                : model.state === "loaded"
                  ? "Close to transform, or pull the card upward to eject."
                  : model.state === "active"
                    ? "Explore the abilities. Your next project starts at the Driver."
                    : "The mechanism follows your movement.")}
        </p>
      </div>
      {deckVisible && (
        <section className="project-deck" aria-label="Project card deck">
          <div className="deck-caption">
            <span>PROJECT ARCHIVE</span>
            <span>THREE CARDS / THREE WORLDS</span>
          </div>
          <div className="project-card-row">
            {driverProjects.map((project, index) => (
              <button
                key={project.id}
                ref={index === 0 ? firstCardRef : undefined}
                type="button"
                className={
                  "project-card" +
                  (ghost?.cardId === project.id ? " is-held" : "")
                }
                style={
                  { "--card-accent": project.mainCard.accent } as CSSProperties
                }
                disabled={
                  !(
                    model.state === "open" ||
                    (model.state === "cardDragging" &&
                      model.draggingId === project.id)
                  )
                }
                aria-label={"Insert " + project.title + " project card"}
                aria-describedby="input-help"
                onPointerDown={(event) => startCard(event, project.id)}
                {...pointerHandlers}
                onClick={(event) => {
                  if (event.detail === 0 || tapControls) insertKey(project.id);
                }}
              >
                <CardFace project={project} />
              </button>
            ))}
          </div>
        </section>
      )}
      {model.state === "active" && selected && (
        <ProjectStage
          project={selected}
          abilityId={abilityId}
          headingRef={headingRef}
          onAbility={(id) => {
            if (modelRef.current.state === "active") {
              sound("ability");
              setAbilityId(id);
            }
          }}
        />
      )}
      <div
        ref={sceneRef}
        className={
          "driver-scene" +
          (moving ? " is-tracking" : "") +
          (ghost?.aligned ? " slot-aligned" : "")
        }
        style={sceneStyle}
        data-testid="driver-scene"
      >
        <div className="driver-caption" aria-hidden="true">
          <span>KREV1 / DEVICE 01</span>
          <span>
            {model.cardId ? "CARD " + model.cardId + " SET" : "READER STANDBY"}
          </span>
        </div>
        <div className="driver-hardware">
          {selected && (
            <div
              className={
                "loaded-card" +
                (model.state === "inserting" ? " card-inserting" : "") +
                (model.state === "ejecting" && model.settling
                  ? " card-ejecting"
                  : "")
              }
              style={
                { "--card-accent": selected.mainCard.accent } as CSSProperties
              }
              aria-hidden="true"
            >
              <CardFace project={selected} />
            </div>
          )}
          <DecadriverModel
            activated={
              model.state === "active" || model.state === "transforming"
            }
          />
          <div className="energy-ring" aria-hidden="true" />
          <button
            ref={slotRef}
            type="button"
            className="card-mouth"
            aria-label={
              model.cardId
                ? "Eject loaded project card. Pull up or press Arrow Up"
                : "Project card insertion slot"
            }
            aria-describedby="input-help"
            disabled={
              !(
                model.state === "loaded" ||
                (model.state === "ejecting" && !model.settling)
              )
            }
            onPointerDown={startEject}
            {...pointerHandlers}
            onKeyDown={(event) => {
              if (
                event.key === "ArrowUp" &&
                model.state === "loaded" &&
                !lease.current
              ) {
                event.preventDefault();
                setNotice("");
                dispatch({ type: "EJECT_KEY" });
              }
            }}
            onClick={(event) => {
              if (event.detail === 0 && model.state === "loaded") {
                setNotice("");
                dispatch({ type: "EJECT_KEY" });
              }
            }}
          >
            <span aria-hidden="true">
              {model.cardId ? "↑ CARD SET" : "↓ INSERT"}
            </span>
          </button>
          {([-1, 1] as const).map((side) => (
            <button
              ref={side === -1 ? leftRef : undefined}
              key={side}
              type="button"
              className={"handle handle-" + (side === -1 ? "left" : "right")}
              aria-label={
                (side === -1 ? "Left" : "Right") +
                " handle. " +
                (model.state === "loaded" || model.state === "closing"
                  ? "Push inward to close"
                  : "Pull outward to open")
              }
              aria-describedby="input-help"
              disabled={!handlesReady && !moving}
              onPointerDown={(event) => startHandle(event, side)}
              {...pointerHandlers}
              onKeyDown={(event) => handleKey(event, side)}
              onClick={(event) => {
                if (event.detail === 0 && handlesReady && !lease.current) {
                  setNotice("");
                  dispatch({ type: "HANDLE_KEY" });
                }
              }}
            >
              <span aria-hidden="true">
                {model.state === "loaded" || model.state === "closing"
                  ? side === -1
                    ? "PUSH →"
                    : "← PUSH"
                  : side === -1
                    ? "← PULL"
                    : "PULL →"}
              </span>
            </button>
          ))}
        </div>
        <p className="device-help" aria-hidden="true">
          {model.state === "active"
            ? "PULL TO REOPEN"
            : moving
              ? Math.round(model.openness * 100) + "% / MECHANICAL TRAVEL"
              : model.state === "open" || model.state === "cardDragging"
                ? "VERTICAL READER / READY"
                : "LINKED HANDLES / QUARTER-TURN READER"}
        </p>
      </div>
      {model.state === "transforming" && (
        <div
          className="transformation-identity"
          aria-hidden="true"
          style={{ opacity: frame.identity }}
        >
          <span>PROJECT / {model.cardId}</span>
          <strong>HENSHIN</strong>
          <b>{selected?.title}</b>
        </div>
      )}
      {ghost && (
        <div
          className="drag-card project-card"
          style={
            {
              left: ghost.x,
              top: ghost.y,
              "--tilt": ghost.tilt + "deg",
              "--card-accent": driverProjects.find(
                (project) => project.id === ghost.cardId,
              )!.mainCard.accent,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          <CardFace
            project={driverProjects.find(
              (project) => project.id === ghost.cardId,
            )!}
          />
        </div>
      )}
      <div className="input-controls">
        <button
          type="button"
          className="controls-toggle"
          aria-expanded={tapControls}
          aria-controls="tap-controls"
          onClick={() => setTapControls((value) => !value)}
        >
          {tapControls ? "HIDE" : "KEYBOARD & TAP"} CONTROLS{" "}
          <span aria-hidden="true">{tapControls ? "−" : "+"}</span>
        </button>
        <p id="input-help" className="sr-only">
          Pull the left handle with Arrow Left or the right with Arrow Right.
          When loaded, reverse the arrow to close. Enter or Space performs the
          current handle operation. On an open Driver, Enter on a project card
          inserts it. Arrow Up or Enter on the loaded card ejects it. Escape
          cancels a drag.
        </p>
        {tapControls && (
          <div className="tap-controls" id="tap-controls">
            <p>
              Same sequence, one step at a time. Use the cards above to insert
              after opening.
            </p>
            <button
              type="button"
              disabled={!handlesReady || model.state === "loaded"}
              onClick={() => {
                setNotice("");
                dispatch({ type: "HANDLE_KEY" });
              }}
            >
              {model.state === "active" ? "Reopen Driver" : "Open Driver"}
            </button>
            <button
              type="button"
              disabled={model.state !== "loaded"}
              onClick={() => {
                setNotice("");
                dispatch({ type: "HANDLE_KEY" });
              }}
            >
              Push handles in
            </button>
            <button
              type="button"
              disabled={model.state !== "loaded"}
              onClick={() => {
                setNotice("");
                dispatch({ type: "EJECT_KEY" });
              }}
            >
              Pull card up
            </button>
          </div>
        )}
      </div>
      <footer className="experience-footer">
        <span>© 2026 KREV1</span>
        <span>UNOFFICIAL FAN CONCEPT / ORIGINAL ART & SOUND</span>
      </footer>
    </main>
  );
}

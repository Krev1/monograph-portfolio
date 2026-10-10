import { describe, expect, it } from "vitest";
import {
  driverReducer as reduce,
  driverInvariants,
  initialDriver,
} from "../src/lib/driver-machine";
import type { DriverModel, DriverEvent } from "../src/lib/driver-machine";
import {
  attractCard,
  handleProgress,
  validDrop,
} from "../src/lib/driver-geometry";
import { henshinFrame } from "../src/lib/driver-timeline";
const complete = (model: DriverModel) =>
  reduce(model, { type: "COMPLETE", run: model.run, state: model.state });
const open = () => complete(reduce(initialDriver, { type: "HANDLE_KEY" }));
const loaded = () =>
  complete(reduce(open(), { type: "INSERT_KEY", cardId: "001" }));
const active = () =>
  complete(complete(reduce(loaded(), { type: "HANDLE_KEY" })));
describe("Driver invariants and recovery", () => {
  it("requires open + insertion + inward lock + finished Henshin", () => {
    expect(reduce(initialDriver, { type: "INSERT_KEY", cardId: "001" })).toBe(
      initialDriver,
    );
    const emptyClose = reduce(open(), { type: "HANDLE_KEY" });
    expect(emptyClose.state).toBe("closing");
    expect(driverInvariants(emptyClose)).toBe(true);
    expect(complete(emptyClose).state).toBe("idle");
    expect(complete(emptyClose).cardId).toBeNull();
    let state = reduce(loaded(), { type: "HANDLE_KEY" });
    expect(state.state).toBe("closing");
    state = complete(state);
    expect(state.state).toBe("transforming");
    expect(complete(state).state).toBe("active");
  });
  it("keeps real-time progress bounded and cancels opening", () => {
    let state = reduce(initialDriver, { type: "HANDLE_START" });
    state = reduce(state, { type: "HANDLE_MOVE", openness: 0.5 });
    expect(state.openness).toBe(0.5);
    expect(reduce(state, { type: "HANDLE_MOVE", openness: 50 }).openness).toBe(
      1,
    );
    expect(reduce(state, { type: "HANDLE_CANCEL" }).state).toBe("idle");
    expect(
      reduce(state, { type: "HANDLE_RELEASE", committed: false }).openness,
    ).toBe(0);
  });
  it("restores open after a cancelled empty closure and rejects its stale completion", () => {
    const held = reduce(open(), { type: "HANDLE_START" });
    expect(held.origin).toBe("open");
    expect(reduce(held, { type: "INSERT_KEY", cardId: "001" })).toBe(held);
    const partial = reduce(held, { type: "HANDLE_MOVE", openness: 0.4 });
    const cancelled = reduce(partial, { type: "HANDLE_CANCEL" });
    expect(cancelled).toMatchObject({
      state: "open",
      openness: 1,
      cardId: null,
    });
    expect(
      reduce(partial, { type: "HANDLE_RELEASE", committed: false }),
    ).toMatchObject({ state: "open", openness: 1, cardId: null });
    const closed = reduce(cancelled, { type: "HANDLE_KEY" });
    const reopening = reduce(complete(closed), { type: "HANDLE_KEY" });
    expect(
      reduce(reopening, {
        type: "COMPLETE",
        state: "closing",
        run: closed.run,
      }),
    ).toBe(reopening);
    expect(complete(reopening).state).toBe("open");
    expect(driverInvariants(reopening)).toBe(true);
  });
  it("rejects insertion while occupied and preserves the card after reopen cancellation", () => {
    expect(reduce(loaded(), { type: "INSERT_KEY", cardId: "002" }).cardId).toBe(
      "001",
    );
    const reopened = reduce(active(), { type: "HANDLE_START" });
    expect(reduce(reopened, { type: "HANDLE_CANCEL" }).state).toBe("active");
    expect(
      complete(reduce(reopened, { type: "HANDLE_RELEASE", committed: true }))
        .cardId,
    ).toBe("001");
  });
  it("retains card on close and ejection cancellation", () => {
    expect(
      reduce(reduce(loaded(), { type: "HANDLE_START" }), {
        type: "HANDLE_CANCEL",
      }).cardId,
    ).toBe("001");
    const state = reduce(loaded(), { type: "EJECT_START" });
    expect(complete(state)).toBe(state);
    expect(reduce(state, { type: "EJECT_CANCEL" }).state).toBe("loaded");
    expect(
      reduce(state, { type: "EJECT_RELEASE", committed: false }).cardId,
    ).toBe("001");
  });
  it("switches only after reopen and committed ejection", () => {
    let state = complete(reduce(active(), { type: "HANDLE_KEY" }));
    expect(state.state).toBe("loaded");
    state = complete(reduce(state, { type: "EJECT_KEY" }));
    expect(state.cardId).toBeNull();
    state = complete(reduce(state, { type: "INSERT_KEY", cardId: "002" }));
    state = complete(complete(reduce(state, { type: "HANDLE_KEY" })));
    expect(state.cardId).toBe("002");
    expect(state.state).toBe("active");
  });
  it("rejects unknown cards and stale timer callbacks", () => {
    expect(reduce(open(), { type: "INSERT_KEY", cardId: "forged" }).state).toBe(
      "open",
    );
    const state = reduce(open(), { type: "INSERT_KEY", cardId: "001" });
    expect(
      reduce(state, {
        type: "COMPLETE",
        state: "inserting",
        run: state.run - 1,
      }),
    ).toBe(state);
    expect(reduce(state, { type: "HANDLE_START" })).toBe(state);
  });
  it("cancels drag and restores invalid drops", () => {
    const state = reduce(open(), { type: "CARD_START", cardId: "001" });
    expect(reduce(state, { type: "CARD_CANCEL" }).cardId).toBeNull();
    expect(reduce(state, { type: "CARD_DROP", valid: false }).state).toBe(
      "open",
    );
    expect(reduce(state, { type: "CARD_DROP", valid: true }).state).toBe(
      "inserting",
    );
  });
  it("maintains invariants over 10,000 adversarial events", () => {
    let state = initialDriver,
      seed = 17;
    for (let i = 0; i < 10000; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const events: DriverEvent[] = [
        { type: "HANDLE_START" },
        { type: "HANDLE_KEY" },
        { type: "HANDLE_MOVE", openness: (seed % 200) / 100 - 0.5 },
        { type: "HANDLE_RELEASE", committed: true },
        { type: "HANDLE_CANCEL" },
        { type: "INSERT_KEY", cardId: "001" },
        { type: "CARD_START", cardId: "002" },
        { type: "CARD_DROP", valid: Boolean(seed % 2) },
        { type: "CARD_CANCEL" },
        { type: "EJECT_KEY" },
        { type: "EJECT_START" },
        { type: "EJECT_RELEASE", committed: true },
        { type: "EJECT_CANCEL" },
        { type: "COMPLETE", state: state.state, run: state.run },
        { type: "COMPLETE", state: "transforming", run: state.run - 2 },
      ];
      state = reduce(state, events[seed % events.length]);
      expect(driverInvariants(state)).toBe(true);
    }
  });
});
describe("Scale-aware geometry", () => {
  const slot = {
    left: 400,
    right: 500,
    top: 450,
    bottom: 510,
    width: 100,
    height: 60,
  };
  it("uses mirrored outward and inward directions", () => {
    expect(handleProgress(100, 0, -1, false, 100)).toBe(1);
    expect(handleProgress(100, 200, 1, false, 100)).toBe(1);
    expect(handleProgress(100, 200, -1, true, 100)).toBe(1);
    expect(handleProgress(100, 0, 1, true, 100)).toBe(1);
    expect(handleProgress(100, 200, -1, false, 100)).toBe(0);
  });
  it("requires downward travel and slot overlap", () => {
    expect(validDrop({ x: 450, y: 200 }, { x: 450, y: 470 }, slot)).toBe(true);
    expect(validDrop({ x: 450, y: 480 }, { x: 450, y: 470 }, slot)).toBe(false);
    expect(validDrop({ x: 450, y: 200 }, { x: 300, y: 470 }, slot)).toBe(false);
    expect(validDrop({ x: 450, y: 200 }, { x: 450, y: 470 }, null)).toBe(false);
  });
  it("aligns vertical near the reader and limits free-flight tilt", () => {
    expect(attractCard({ x: 480, y: 470 }, slot, 100)).toEqual({
      x: 450,
      y: 470,
      tilt: 0,
      aligned: true,
    });
    expect(attractCard({ x: 100, y: 100 }, slot, 0).tilt).toBe(7);
  });
});
describe("Directed timeline", () => {
  it.each([
    [0, "lock"],
    [240, "scan"],
    [480, "energize"],
    [880, "identify"],
    [1360, "dock"],
  ])("maps %i ms to %s", (time, phase) => {
    expect(henshinFrame(Number(time)).phase).toBe(phase);
  });
  it("does not dock before recognition and ends exactly", () => {
    expect(henshinFrame(1280).dock).toBe(0);
    expect(henshinFrame(2400).dock).toBe(1);
    expect(henshinFrame(2400).identity).toBe(0);
  });
  it("reduced motion has no energy sweep and reaches the same dock", () => {
    expect(henshinFrame(100, true)).toMatchObject({
      dock: 1,
      energy: 0,
      identity: 0,
    });
  });
});

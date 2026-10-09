import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import DecadeExperience from "../src/components/decade-experience";
import { CARD_INSERT_DURATION } from "../src/lib/driver-timeline";
const advance = async (time: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(time);
  });
};
const left = () => screen.getByRole("button", { name: /^Left handle/ });
const card = (name = "SPENDWISE AI") =>
  screen.getByRole("button", { name: "Insert " + name + " project card" });
const state = () => document.querySelector("main")!.getAttribute("data-state");
async function open() {
  fireEvent.keyDown(left(), { key: "ArrowLeft" });
  await advance(180);
}
async function load() {
  await open();
  fireEvent.click(card());
  await advance(CARD_INSERT_DURATION);
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(window.matchMedia).mockImplementation(
    () =>
      ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList,
  );
});
describe("Controller integration", () => {
  it("tap controls preserve opening, insertion and closing before reveal", async () => {
    render(<DecadeExperience />);
    fireEvent.click(screen.getByRole("button", { name: /KEYBOARD & TAP/ }));
    fireEvent.click(screen.getByRole("button", { name: "Push handles in" }));
    expect(state()).toBe("idle");
    fireEvent.click(screen.getByRole("button", { name: "Open Driver" }));
    expect(state()).toBe("opening");
    await advance(180);
    fireEvent.pointerDown(card(), {
      pointerId: 1,
      pointerType: "touch",
      clientX: 100,
      clientY: 200,
    });
    expect(state()).toBe("open");
    fireEvent.click(card(), { detail: 1 });
    expect(state()).toBe("inserting");
    await advance(CARD_INSERT_DURATION);
    fireEvent.click(screen.getByRole("button", { name: "Push handles in" }));
    await advance(180);
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await advance(1500);
    expect(state()).toBe("active");
  });
  it("losing window focus cancels a held gesture", () => {
    render(<DecadeExperience />);
    fireEvent.pointerDown(left(), { pointerId: 1, clientX: 200 });
    fireEvent.pointerMove(left(), { pointerId: 1, clientX: 100 });
    fireEvent.blur(window);
    expect(state()).toBe("idle");
  });
  it("reveals content only after the complete keyboard cycle, then activates an evidenced ability", async () => {
    render(<DecadeExperience />);
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await load();
    expect(state()).toBe("loaded");
    fireEvent.keyDown(left(), { key: "ArrowRight" });
    expect(state()).toBe("closing");
    await advance(180);
    expect(state()).toBe("transforming");
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await advance(1499);
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await advance(1);
    expect(state()).toBe("active");
    expect(screen.getByTestId("project-stage")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /TOOL.*PYTHON/ }));
    expect(
      screen
        .getByRole("link", { name: /Transaction domain/ })
        .getAttribute("href"),
    ).toContain("e2221c7");
  });
  it("pointer cancellation cannot open even after crossing the threshold", () => {
    render(<DecadeExperience />);
    const handle = left();
    fireEvent.pointerDown(handle, { pointerId: 1, clientX: 200 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 });
    expect(state()).toBe("opening");
    fireEvent.pointerCancel(handle, { pointerId: 1, clientX: 100 });
    expect(state()).toBe("idle");
    fireEvent.pointerUp(handle, { pointerId: 1, clientX: 100 });
    expect(state()).toBe("idle");
  });
  it("ignores a second finger and wrong pointer cancellation", () => {
    render(<DecadeExperience />);
    const handle = left();
    fireEvent.pointerDown(handle, { pointerId: 1, clientX: 200 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 180 });
    const progress = screen
      .getByTestId("driver-scene")
      .style.getPropertyValue("--open");
    fireEvent.pointerDown(handle, { pointerId: 2, clientX: 200 });
    fireEvent.pointerMove(handle, { pointerId: 2, clientX: 0 });
    fireEvent.pointerCancel(handle, { pointerId: 2 });
    expect(
      screen.getByTestId("driver-scene").style.getPropertyValue("--open"),
    ).toBe(progress);
    expect(state()).toBe("opening");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(state()).toBe("idle");
  });
  it("cancelled card drops cannot commit, while a real downward drop does", async () => {
    render(<DecadeExperience />);
    await open();
    const slot = screen.getByRole("button", {
      name: "Project card insertion slot",
    });
    vi.spyOn(slot, "getBoundingClientRect").mockReturnValue({
      left: 400,
      right: 500,
      top: 450,
      bottom: 510,
      width: 100,
      height: 60,
    } as DOMRect);
    const project = card();
    fireEvent.pointerDown(project, {
      pointerId: 1,
      clientX: 100,
      clientY: 200,
    });
    fireEvent.pointerMove(project, {
      pointerId: 1,
      clientX: 450,
      clientY: 470,
    });
    fireEvent.pointerCancel(project, {
      pointerId: 1,
      clientX: 450,
      clientY: 470,
    });
    expect(state()).toBe("open");
    fireEvent.pointerUp(project, { pointerId: 1, clientX: 450, clientY: 470 });
    expect(state()).toBe("open");
    fireEvent.pointerDown(project, {
      pointerId: 1,
      clientX: 100,
      clientY: 200,
    });
    fireEvent.pointerUp(project, { pointerId: 1, clientX: 450, clientY: 470 });
    expect(state()).toBe("inserting");
    await advance(CARD_INSERT_DURATION);
    expect(state()).toBe("loaded");
  });
  it("wrong closing direction and lost capture keep the same loaded card", async () => {
    render(<DecadeExperience />);
    await load();
    const handle = left();
    fireEvent.pointerDown(handle, { pointerId: 1, clientX: 200 });
    fireEvent.pointerUp(handle, { pointerId: 1, clientX: 100 });
    expect(state()).toBe("loaded");
    fireEvent.pointerDown(handle, { pointerId: 1, clientX: 200 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 300 });
    fireEvent.lostPointerCapture(handle, { pointerId: 1 });
    expect(state()).toBe("loaded");
    expect(screen.getByTestId("seated-card").getAttribute("data-card-id")).toBe(
      "001",
    );
    expect(screen.getByTestId("lens-emblem").getAttribute("data-emblem")).toBe(
      "ledger",
    );
  });
  it("reopens and ejects before activating a different project", async () => {
    render(<DecadeExperience />);
    await load();
    fireEvent.keyDown(left(), { key: "ArrowRight" });
    await advance(180);
    await advance(1500);
    fireEvent.keyDown(left(), { key: "ArrowLeft" });
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await advance(180);
    expect(state()).toBe("loaded");
    fireEvent.keyDown(screen.getByRole("button", { name: /Eject loaded/ }), {
      key: "ArrowUp",
    });
    await advance(280);
    expect(state()).toBe("open");
    fireEvent.click(card("LEARN"));
    await advance(CARD_INSERT_DURATION);
    fireEvent.keyDown(left(), { key: "ArrowRight" });
    await advance(180);
    await advance(1500);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("LEARN");
  });
  it("completes reduced motion without animationend and cancels timers on unmount", async () => {
    vi.mocked(window.matchMedia).mockImplementation(
      () =>
        ({
          matches: true,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );
    const view = render(<DecadeExperience />);
    fireEvent.keyDown(left(), { key: "ArrowLeft" });
    await advance(60);
    fireEvent.click(card());
    await advance(60);
    fireEvent.keyDown(left(), { key: "ArrowRight" });
    await advance(60);
    await advance(99);
    expect(state()).toBe("transforming");
    await advance(1);
    expect(state()).toBe("active");
    const scheduled = vi.spyOn(window, "setTimeout"),
      cleared = vi.spyOn(window, "clearTimeout");
    fireEvent.keyDown(left(), { key: "ArrowLeft" });
    const deadline =
      scheduled.mock.results[scheduled.mock.results.length - 1].value;
    view.unmount();
    expect(cleared).toHaveBeenCalledWith(deadline);
    await advance(5000);
    expect(document.querySelector("main")).toBeNull();
  });
});

describe("Recessed card reader", () => {
  it("allows full lens motion on a reduced-motion device without skipping the reading state", async () => {
    vi.mocked(window.matchMedia).mockImplementation(
      () =>
        ({
          matches: true,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );
    render(<DecadeExperience />);
    expect(
      document.querySelector("main")!.classList.contains("reduced-motion"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /KEYBOARD & TAP/ }));
    const animation = screen.getByRole("combobox", { name: "Animation" });
    fireEvent.change(animation, { target: { value: "full" } });
    expect(
      document.querySelector("main")!.classList.contains("full-motion"),
    ).toBe(true);
    expect(
      document.querySelector("main")!.classList.contains("reduced-motion"),
    ).toBe(false);
    await open();
    fireEvent.click(card());
    await advance(CARD_INSERT_DURATION / 2);
    expect(state()).toBe("inserting");
    expect(
      screen.getByTestId("lens-card-slide").getAttribute("data-card-id"),
    ).toBe("001");
    expect(screen.queryByTestId("project-stage")).toBeNull();
    await advance(CARD_INSERT_DURATION / 2);
    expect(state()).toBe("loaded");
    expect(screen.queryByTestId("lens-card-slide")).toBeNull();
    expect(screen.getByTestId("lens-emblem").getAttribute("data-emblem")).toBe(
      "ledger",
    );
    fireEvent.change(animation, { target: { value: "reduced" } });
    expect(
      document.querySelector("main")!.classList.contains("reduced-motion"),
    ).toBe(true);
  });
  it.each([
    ["SPENDWISE AI", "001", "ledger"],
    ["LEARN", "002", "brackets"],
    ["KREV1 PORTFOLIO", "003", "monogram"],
  ])(
    "reads %s into the lens before Henshin and retains it through reopening",
    async (name, id, emblem) => {
      render(<DecadeExperience />);
      expect(screen.queryByTestId("lens-emblem")).toBeNull();
      await open();
      fireEvent.click(card(name));
      expect(state()).toBe("inserting");
      expect(screen.queryByTestId("lens-emblem")).toBeNull();
      expect(screen.getByTestId("transient-card")).toBeTruthy();
      expect(
        screen.getByTestId("lens-card-slide").getAttribute("data-card-id"),
      ).toBe(id);
      await advance(CARD_INSERT_DURATION - 1);
      expect(state()).toBe("inserting");
      expect(screen.queryByTestId("lens-emblem")).toBeNull();
      expect(screen.queryByTestId("project-stage")).toBeNull();
      fireEvent.keyDown(left(), { key: "ArrowRight" });
      expect(state()).toBe("inserting");
      await advance(1);
      expect(screen.queryByTestId("lens-card-slide")).toBeNull();
      expect(screen.queryByTestId("transient-card")).toBeNull();
      expect(
        screen.getByTestId("reader-card-window").getAttribute("data-card-id"),
      ).toBe(id);
      const identity = () => {
        expect(
          screen.getByTestId("lens-emblem").getAttribute("data-card-id"),
        ).toBe(id);
        expect(
          screen.getByTestId("lens-emblem").getAttribute("data-emblem"),
        ).toBe(emblem);
      };
      identity();
      expect(screen.queryByTestId("project-stage")).toBeNull();
      fireEvent.keyDown(left(), { key: "ArrowRight" });
      identity();
      await advance(180);
      identity();
      await advance(1500);
      identity();
      fireEvent.keyDown(left(), { key: "ArrowLeft" });
      identity();
      await advance(180);
      expect(state()).toBe("loaded");
      identity();
      fireEvent.keyDown(screen.getByRole("button", { name: /Eject loaded/ }), {
        key: "ArrowUp",
      });
      identity();
      await advance(280);
      expect(state()).toBe("open");
      expect(screen.queryByTestId("lens-emblem")).toBeNull();
      expect(screen.queryByTestId("seated-card")).toBeNull();
    },
  );
  it("cancelled extraction restores the enclosed card and its lens identity", async () => {
    render(<DecadeExperience />);
    await load();
    const slot = screen.getByRole("button", { name: /Eject loaded/ });
    fireEvent.pointerDown(slot, { pointerId: 1, clientY: 450 });
    fireEvent.pointerMove(slot, { pointerId: 1, clientY: 370 });
    expect(state()).toBe("ejecting");
    expect(screen.getByTestId("transient-card")).toBeTruthy();
    expect(
      screen.getByTestId("driver-scene").style.getPropertyValue("--card-pull"),
    ).not.toBe("0");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(state()).toBe("loaded");
    expect(screen.queryByTestId("transient-card")).toBeNull();
    expect(
      screen.getByTestId("driver-scene").style.getPropertyValue("--card-pull"),
    ).toBe("0");
    expect(screen.getByTestId("lens-emblem").getAttribute("data-card-id")).toBe(
      "001",
    );
    expect(screen.getByTestId("seated-card").getAttribute("data-card-id")).toBe(
      "001",
    );
  });
});

describe("Physical card scale", () => {
  it("preserves the card's original position and proportions when picked up", async () => {
    render(<DecadeExperience />);
    await open();
    const project = card();
    vi.spyOn(project, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 200,
      right: 218,
      bottom: 372,
      width: 118,
      height: 172,
    } as DOMRect);
    fireEvent.pointerDown(project, {
      pointerId: 1,
      clientX: 130,
      clientY: 245,
    });
    const ghost = document.querySelector<HTMLDivElement>(".drag-card")!;
    expect(ghost.style.left).toBe("159px");
    expect(ghost.style.top).toBe("372px");
    expect(ghost.querySelector("svg")!.getAttribute("viewBox")).toBe(
      "0 0 118 172",
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(state()).toBe("open");
  });
  it.each([470, 940])(
    "keeps extracted card travel equal to pointer travel at scene width %s",
    async (width) => {
      render(<DecadeExperience />);
      await load();
      const scene = screen.getByTestId("driver-scene");
      vi.spyOn(scene, "getBoundingClientRect").mockReturnValue({
        width,
      } as DOMRect);
      const slot = screen.getByRole("button", { name: /Eject loaded/ });
      fireEvent.pointerDown(slot, { pointerId: 1, clientY: 450 });
      fireEvent.pointerMove(slot, { pointerId: 1, clientY: 410 });
      const pull = Number(scene.style.getPropertyValue("--card-pull"));
      const fullTravel = parseFloat(
        document
          .querySelector("main")!
          .style.getPropertyValue("--physical-card-travel"),
      );
      expect((pull * fullTravel * width) / 940).toBeCloseTo(40);
      fireEvent.pointerCancel(slot, { pointerId: 1 });
      expect(state()).toBe("loaded");
      expect(
        screen.getByTestId("lens-emblem").getAttribute("data-card-id"),
      ).toBe("001");
    },
  );
  it("rescales all cards and cancels a held gesture when the scene resizes, then disconnects on unmount", async () => {
    let resized:
      ((entries: { contentRect: { width: number } }[]) => void) | undefined;
    const observe = vi.fn(),
      disconnect = vi.fn();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: typeof resized) {
          resized = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    try {
      const view = render(<DecadeExperience />);
      const scene = screen.getByTestId("driver-scene");
      expect(observe).toHaveBeenCalledWith(scene);
      act(() => resized!([{ contentRect: { width: 940 } }]));
      const main = document.querySelector("main")!;
      expect(main.style.getPropertyValue("--project-card-width")).toBe("236px");
      expect(main.style.getPropertyValue("--project-card-height")).toBe(
        "344px",
      );
      await open();
      fireEvent.pointerDown(card(), {
        pointerId: 1,
        clientX: 100,
        clientY: 200,
      });
      expect(state()).toBe("cardDragging");
      expect(
        document.querySelector(".drag-card svg")!.getAttribute("viewBox"),
      ).toBe(card().querySelector("svg")!.getAttribute("viewBox"));
      act(() => resized!([{ contentRect: { width: 470 } }]));
      expect(state()).toBe("open");
      expect(document.querySelector(".drag-card")).toBeNull();
      expect(main.style.getPropertyValue("--project-card-width")).toBe("118px");
      expect(main.style.getPropertyValue("--project-card-height")).toBe(
        "172px",
      );
      view.unmount();
      expect(disconnect).toHaveBeenCalledOnce();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

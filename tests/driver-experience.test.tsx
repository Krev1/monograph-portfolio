import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import DecadeExperience from "../src/components/decade-experience";
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
  await advance(320);
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
    await advance(320);
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
    await advance(320);
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
    expect(document.querySelector(".loaded-card")!.textContent).toContain(
      "SPENDWISE AI",
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
    await advance(320);
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

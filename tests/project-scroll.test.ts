import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  add: vi.fn(),
  remove: vi.fn(),
  update: vi.fn(),
  instances: [] as {
    options: Record<string, unknown>;
    raf: ReturnType<typeof vi.fn>;
    scrollTo: ReturnType<typeof vi.fn>;
    resize: ReturnType<typeof vi.fn>;
    on: ReturnType<typeof vi.fn>;
    destroy: ReturnType<typeof vi.fn>;
  }[],
}));
vi.mock("gsap", () => ({
  gsap: { ticker: { add: mocks.add, remove: mocks.remove } },
}));
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: mocks.update },
}));
vi.mock("lenis", () => ({
  default: class {
    raf = vi.fn();
    scrollTo = vi.fn();
    resize = vi.fn();
    on = vi.fn();
    destroy = vi.fn();
    constructor(public options: Record<string, unknown>) {
      mocks.instances.push(this);
    }
  },
}));
import { createProjectScroll } from "../src/lib/project-scroll";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.instances.length = 0;
  vi.stubGlobal("ResizeObserver", class {});
});
afterEach(() => vi.unstubAllGlobals());

describe("Scoped project scrolling", () => {
  it("binds one loop to the panel, synchronizes milliseconds and stops on teardown", () => {
    const panel = document.createElement("section"),
      content = document.createElement("div");
    const scrolling = createProjectScroll(panel, content, false);
    const instance = mocks.instances[0];
    expect(instance.options).toMatchObject({
      wrapper: panel,
      content,
      autoRaf: false,
      syncTouch: false,
    });
    expect(panel.dataset.scrollEngine).toBe("lenis");
    expect(instance.on).toHaveBeenCalledWith("scroll", mocks.update);
    const update = mocks.add.mock.calls[0][0];
    update(1.25);
    expect(instance.raf).toHaveBeenCalledWith(1250);
    scrolling.scrollTo(240);
    scrolling.resize();
    expect(instance.scrollTo).toHaveBeenCalledWith(240, { duration: 0.45 });
    expect(instance.resize).toHaveBeenCalledOnce();
    scrolling.destroy();
    scrolling.destroy();
    scrolling.scrollTo(400);
    scrolling.resize();
    expect(mocks.remove).toHaveBeenCalledExactlyOnceWith(update);
    expect(instance.destroy).toHaveBeenCalledOnce();
    expect(instance.scrollTo).toHaveBeenCalledOnce();
    expect(instance.resize).toHaveBeenCalledOnce();
    expect(panel.dataset.scrollEngine).toBeUndefined();
    expect(document.documentElement.classList.contains("lenis")).toBe(false);
  });
  it.each([true, false])(
    "keeps reduced/unsupported scrolling native (reduced=%s)",
    (reduced) => {
      if (!reduced) vi.stubGlobal("ResizeObserver", undefined);
      const panel = document.createElement("section"),
        content = document.createElement("div");
      const scrolling = createProjectScroll(panel, content, reduced);
      scrolling.scrollTo(260);
      expect(panel.scrollTop).toBe(260);
      expect(panel.dataset.scrollEngine).toBe("native");
      expect(mocks.instances).toHaveLength(0);
      expect(mocks.add).not.toHaveBeenCalled();
      scrolling.destroy();
      scrolling.scrollTo(500);
      expect(panel.scrollTop).toBe(260);
      expect(panel.dataset.scrollEngine).toBeUndefined();
    },
  );
  it("repeated project cycles remove each loop rather than stacking subscriptions", () => {
    const panel = document.createElement("section"),
      content = document.createElement("div");
    const first = createProjectScroll(panel, content, false);
    first.destroy();
    const second = createProjectScroll(panel, content, false);
    second.destroy();
    expect(mocks.add).toHaveBeenCalledTimes(2);
    expect(mocks.remove.mock.calls.map((call) => call[0])).toEqual(
      mocks.add.mock.calls.map((call) => call[0]),
    );
    mocks.instances.forEach((instance) =>
      expect(instance.destroy).toHaveBeenCalledOnce(),
    );
  });
});

import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
class TestPointerEvent extends MouseEvent {
  readonly pointerId: number;
  readonly isPrimary: boolean;
  readonly pointerType: string;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerId = init.pointerId ?? 1;
    this.isPrimary = init.isPrimary ?? true;
    this.pointerType = init.pointerType ?? "mouse";
  }
}
Object.defineProperty(window, "PointerEvent", { value: TestPointerEvent });
HTMLElement.prototype.setPointerCapture = () => {};
HTMLElement.prototype.hasPointerCapture = () => true;
HTMLElement.prototype.releasePointerCapture = () => {};
window.scrollTo = () => {};
window.matchMedia = vi.fn().mockImplementation(() => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
}));

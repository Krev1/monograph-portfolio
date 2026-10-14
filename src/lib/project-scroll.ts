import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ProjectScroll = {
  scrollTo: (top: number) => void;
  resize: () => void;
  destroy: () => void;
};

export function createProjectScroll(
  wrapper: HTMLElement,
  content: HTMLElement,
  reduced: boolean,
): ProjectScroll {
  if (reduced || typeof ResizeObserver === "undefined") {
    let destroyed = false;
    wrapper.dataset.scrollEngine = "native";
    return {
      scrollTo: (top) => {
        if (!destroyed) wrapper.scrollTop = Math.max(0, top);
      },
      resize: () => {},
      destroy: () => {
        if (destroyed) return;
        destroyed = true;
        delete wrapper.dataset.scrollEngine;
      },
    };
  }
  const lenis = new Lenis({
    wrapper,
    content,
    autoRaf: false,
    lerp: 0.12,
    smoothWheel: true,
    syncTouch: false,
    overscroll: false,
    // The app has already resolved Full / Device / Reduced motion preferences.
    respectReducedMotion: false,
  });
  wrapper.dataset.scrollEngine = "lenis";
  lenis.on("scroll", ScrollTrigger.update);
  const update = (seconds: number) => lenis.raf(seconds * 1000);
  gsap.ticker.add(update);
  let destroyed = false;
  return {
    scrollTo(top) {
      if (!destroyed) lenis.scrollTo(Math.max(0, top), { duration: 0.45 });
    },
    resize() {
      if (!destroyed) lenis.resize();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      gsap.ticker.remove(update);
      lenis.destroy();
      delete wrapper.dataset.scrollEngine;
    },
  };
}

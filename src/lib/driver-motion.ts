"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { DriverState } from "./driver-machine";
import { henshinFrame, HENSHIN_DURATION } from "./driver-timeline";

gsap.registerPlugin(useGSAP);

export function useDriverMotion({
  scope,
  entering,
  reduced,
  state,
  run,
  openness,
}: {
  scope: RefObject<HTMLElement | null>;
  entering: boolean;
  reduced: boolean;
  state: DriverState;
  run: number;
  openness: number;
}) {
  useGSAP(
    () => {
      if (!scope.current || !entering || reduced) return;
      const cards = scope.current.querySelectorAll(
        ".project-card-entry .card-artwork",
      );
      const hardware = scope.current.querySelector(".driver-arrival");
      const timeline = gsap.timeline();
      timeline.fromTo(
        cards,
        { opacity: 0.08, filter: "blur(6px)", clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0 0)",
          duration: 0.65,
          stagger: 0.14,
          ease: "power3.out",
          clearProps: "opacity,filter,clipPath",
        },
        0.08,
      );
      if (hardware)
        timeline.fromTo(
          hardware,
          { opacity: 0.08, filter: "blur(12px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            clearProps: "opacity,filter",
          },
          0.22,
        );
    },
    { scope, dependencies: [entering, reduced], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const scene = scope.current?.querySelector<HTMLElement>(".driver-scene");
      if (!scene) return;
      const identity = scope.current?.querySelector<HTMLElement>(
        ".transformation-identity",
      );
      const dock =
        state === "active" ? 1 : state === "reopening" ? 1 - openness : 0;
      // Reapply the current endpoint after the preceding context reverts.
      gsap.set(scene, { "--dock": dock, "--energy": 0, "--scan": 0 });
      if (identity) gsap.set(identity, { opacity: 0 });
      if (state !== "transforming") return;
      const duration = reduced ? 100 : HENSHIN_DURATION;
      const clock = { elapsed: 0 };
      const energy = gsap.quickSetter(scene, "--energy");
      const scan = gsap.quickSetter(scene, "--scan");
      const position = gsap.quickSetter(scene, "--dock");
      const identify = identity ? gsap.quickSetter(identity, "opacity") : null;
      const render = () => {
        const frame = henshinFrame(clock.elapsed, reduced);
        energy(frame.energy);
        scan(frame.scan);
        position(frame.dock);
        identify?.(frame.identity);
      };
      const start = performance.now();
      const timeline = gsap.timeline().to(clock, {
        elapsed: duration,
        duration: duration / 1000,
        ease: "none",
        onUpdate: render,
      });
      const visibility = () => {
        if (document.visibilityState === "hidden") timeline.pause();
        else {
          timeline.time(
            Math.min(duration, performance.now() - start) / 1000,
            false,
          );
          render();
          timeline.play();
        }
      };
      document.addEventListener("visibilitychange", visibility);
      return () => document.removeEventListener("visibilitychange", visibility);
    },
    { scope, dependencies: [state, run, reduced], revertOnUpdate: true },
  );
}

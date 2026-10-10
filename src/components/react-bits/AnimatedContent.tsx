"use client";
// Adapted from React Bits (c) 2026 David Haz; see REACT-BITS-LICENSE.md.
// The panel scroller and visible fallback preserve this application's input flow.
import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedContent({
  children,
  scroller,
  reduced,
  className = "",
  distance = 12,
  duration = 0.4,
}: {
  children: ReactNode;
  scroller: RefObject<HTMLElement | null>;
  reduced: boolean;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  useGSAP(
    () => {
      if (!ref.current || !scroller.current || reduced) return;
      const element = ref.current;
      const tween = gsap.fromTo(
        element,
        { opacity: 0.18, y: distance },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          paused: true,
          clearProps: "opacity,transform",
        },
      );
      animation.current = tween;
      const trigger = ScrollTrigger.create({
        trigger: element,
        scroller: scroller.current,
        start: "top 95%",
        once: true,
        onEnter: () => tween.play(),
      });
      return () => {
        trigger.kill();
        animation.current = null;
      };
    },
    {
      scope: ref,
      dependencies: [reduced, distance, duration],
      revertOnUpdate: true,
    },
  );
  const finish = () => animation.current?.progress(1);
  return (
    <div
      ref={ref}
      className={className}
      data-motion-component="AnimatedContent"
      onFocusCapture={finish}
      onPointerDownCapture={finish}
    >
      {children}
    </div>
  );
}

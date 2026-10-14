"use client";
// Adapted from React Bits (c) 2026 David Haz; see REACT-BITS-LICENSE.md.
// State-triggered span retains the host heading's semantics and focus ref.
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(GSAPSplitText, useGSAP);

export default function SplitText({
  text,
  reduced,
}: {
  text: string;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let live = true;
    const ready = () => {
      if (live) setFontsReady(true);
    };
    if (!document.fonts || document.fonts.status === "loaded") ready();
    else void document.fonts.ready.then(ready);
    return () => {
      live = false;
    };
  }, []);
  useGSAP(
    () => {
      if (
        !ref.current ||
        !fontsReady ||
        reduced ||
        typeof ResizeObserver === "undefined"
      )
        return;
      const split = GSAPSplitText.create(ref.current, {
        type: "chars,words",
        smartWrap: true,
        charsClass: "split-char",
        wordsClass: "split-word",
      });
      const tween = gsap.fromTo(
        split.chars,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.025,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
      );
      return () => {
        tween.kill();
        split.revert();
      };
    },
    {
      scope: ref,
      dependencies: [text, fontsReady, reduced],
      revertOnUpdate: true,
    },
  );
  return (
    <span
      ref={ref}
      className="project-title-letters"
      data-motion-component="SplitText"
    >
      {text}
    </span>
  );
}

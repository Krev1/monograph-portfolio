"use client";

import type { ReactNode } from "react";

// Lightweight spotlight surface; hover writes CSS variables without React updates.
export default function SpotlightSurface({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  return (
    <div className="spotlight-surface" onPointerMove={(event) => {
      if (!enabled || event.buttons || event.pointerType === "touch") return;
      const surface = event.currentTarget;
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
      surface.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
    }}>
      {children}
    </div>
  );
}

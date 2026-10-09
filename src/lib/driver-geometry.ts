import { clamp } from "./driver-machine";

export type Point = { x: number; y: number };
export type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
export const SNAP_THRESHOLD = 0.72;

export function handleProgress(
  startX: number,
  currentX: number,
  side: -1 | 1,
  closing: boolean,
  travel: number,
) {
  const outward = (currentX - startX) * side;
  return clamp((closing ? -outward : outward) / Math.max(28, travel));
}

export function validDrop(
  start: Point,
  end: Point,
  slot: Bounds | null,
): boolean {
  if (!slot || end.y - start.y < 32) return false;
  return (
    end.x >= slot.left - 18 &&
    end.x <= slot.right + 18 &&
    end.y >= slot.top - 22 &&
    end.y <= slot.bottom + 22
  );
}

export function attractCard(
  point: Point,
  slot: Bounds | null,
  previousX: number,
) {
  if (!slot)
    return {
      ...point,
      tilt: Math.max(-7, Math.min(7, (point.x - previousX) * 0.3)),
      aligned: false,
    };
  const center = {
    x: (slot.left + slot.right) / 2,
    y: (slot.top + slot.bottom) / 2,
  };
  const aligned =
    Math.abs(point.x - center.x) < Math.max(72, slot.width) &&
    Math.abs(point.y - center.y) < 110;
  return {
    x: aligned ? center.x : point.x,
    y: point.y,
    tilt: aligned ? 0 : Math.max(-7, Math.min(7, (point.x - previousX) * 0.3)),
    aligned,
  };
}

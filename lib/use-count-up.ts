"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  duration = 600,
  enabled = true
): number {
  const [value, setValue] = useState(enabled ? 0 : target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, enabled]);

  return value;
}

export function parseNumericValue(value: string | number): {
  numeric: number;
  suffix: string;
  isPercent: boolean;
} {
  if (typeof value === "number") {
    return { numeric: value, suffix: "", isPercent: false };
  }
  const match = value.match(/^(\d+(?:\.\d+)?)(%?)$/);
  if (!match) return { numeric: 0, suffix: value, isPercent: false };
  return {
    numeric: Number(match[1]),
    suffix: match[2] ?? "",
    isPercent: match[2] === "%",
  };
}

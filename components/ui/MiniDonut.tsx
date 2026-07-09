"use client";

import { useEffect, useState } from "react";

interface MiniDonutProps {
  percent: number;
  size?: number;
  animate?: boolean;
}

export function MiniDonut({ percent, size = 56, animate = false }: MiniDonutProps) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const targetOffset = c - (percent / 100) * c;
  const [offset, setOffset] = useState(animate ? c : targetOffset);

  useEffect(() => {
    if (!animate) {
      setOffset(targetOffset);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOffset(targetOffset);
      return;
    }
    const timer = requestAnimationFrame(() => setOffset(targetOffset));
    return () => cancelAnimationFrame(timer);
  }, [animate, targetOffset, percent]);

  return (
    <svg width={size} height={size} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={6}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#3B82F6"
        strokeWidth={6}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#F97316"
        strokeWidth={6}
        strokeDasharray={c}
        strokeDashoffset={offset === c ? c : c - (percent / 100) * c * 0.35}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        opacity={0.5}
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}

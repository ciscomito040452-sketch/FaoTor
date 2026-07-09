"use client";

import { useEffect, useState } from "react";

interface MiniBarChartProps {
  values: number[];
  height?: number;
  className?: string;
  variant?: "default" | "severe";
  animate?: boolean;
}

export function MiniBarChart({
  values,
  height = 48,
  className = "",
  variant = "default",
  animate = false,
}: MiniBarChartProps) {
  const max = Math.max(...values, 1);
  const width = values.length * 12;
  const [mounted, setMounted] = useState(!animate);
  const valuesKey = values.join(",");

  useEffect(() => {
    if (!animate) return;
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, [animate, valuesKey]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      {values.map((v, i) => {
        const barH = (v / max) * (height - 4);
        const color =
          variant === "severe"
            ? "#F97316"
            : i % 2 === 0
              ? "#3B82F6"
              : "#93C5FD";
        return (
          <rect
            key={i}
            x={i * 12 + 1}
            y={height - (mounted ? barH : 0)}
            width={8}
            height={mounted ? barH : 0}
            rx={2}
            fill={color}
            opacity={0.85}
            style={{
              transition: `y 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms, height 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}

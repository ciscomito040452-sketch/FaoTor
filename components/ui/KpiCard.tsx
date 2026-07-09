"use client";

import { motion } from "framer-motion";
import { MiniBarChart } from "./MiniBarChart";
import { MiniDonut } from "./MiniDonut";
import { MiniSparkline } from "./MiniSparkline";
import { TrendBadge } from "./TrendBadge";
import { Card } from "./Card";
import { AnimatedCounter } from "./AnimatedCounter";
import { useReducedMotion } from "@/lib/motion";

type ChartType = "bar" | "donut" | "sparkline" | "none";

interface KpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  trend?: number | null;
  chartType?: ChartType;
  chartData?: number[];
  donutPercent?: number;
  barVariant?: "default" | "severe";
  active?: boolean;
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  caption,
  trend,
  chartType = "bar",
  chartData = [],
  donutPercent = 0,
  barVariant = "default",
  active,
  onClick,
}: KpiCardProps) {
  const reduced = useReducedMotion();
  const parsed =
    typeof value === "string" && value.endsWith("%")
      ? { numeric: parseInt(value, 10) || 0, suffix: "%", isPercent: true }
      : { numeric: typeof value === "number" ? value : 0, suffix: "", isPercent: false };

  const displayValue =
    parsed.suffix === "%" ? (
      <AnimatedCounter value={parsed.numeric} suffix="%" />
    ) : (
      <AnimatedCounter value={parsed.numeric} />
    );

  const content = (
    <>
      <p className="text-[13px] text-slate-600">{label}</p>
      {caption && (
        <p className="mt-0.5 text-[11px] text-slate-400">{caption}</p>
      )}
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[28px] font-bold leading-none text-slate-900">
            {displayValue}
          </p>
          {trend != null && (
            <div className="mt-2">
              <TrendBadge value={trend} />
            </div>
          )}
        </div>
        {chartType === "bar" && chartData.length > 0 && (
          <MiniBarChart values={chartData} variant={barVariant} animate />
        )}
        {chartType === "donut" && <MiniDonut percent={donutPercent} animate />}
        {chartType === "sparkline" && chartData.length > 0 && (
          <MiniSparkline values={chartData} />
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={reduced ? undefined : { y: -2, scale: 1.01 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`bento-card w-full p-5 text-left transition-shadow hover:shadow-md ${
          active
            ? "border-brand-blue shadow-[0_0_0_2px_#3b82f6]"
            : ""
        }`}
      >
        {content}
      </motion.button>
    );
  }

  return <Card padding="md">{content}</Card>;
}

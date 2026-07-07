"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import {
  computeUrgencyScore,
  resolveRainChancePercent,
  resolveRainForecast,
} from "@/lib/mock-weather";
import { RiskBadge } from "@/components/RiskBadge";
import {
  METRIC_CELL_RAIN,
  METRIC_CELL_RISK,
  METRIC_CELL_URGENCY,
  METRIC_FOCUS_PANEL,
} from "@/lib/risk-colors";
import { RainMetricIcon, RiskMetricIcon, UrgencyIcon } from "@/components/shared/MetricIcons";

interface MetricFocusBlockProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
  rainChancePercent?: number;
  scoreLabel: string;
  className?: string;
}

function urgencyAccent(score: number): string {
  if (score >= 85) return "text-brand-orange-dark";
  if (score >= 70) return "text-brand-orange";
  return "text-slate-900";
}

export function MetricFocusBlock({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
  rainChancePercent,
  scoreLabel,
  className = "",
}: MetricFocusBlockProps) {
  const { t } = useApp();
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainPercent = resolveRainChancePercent(rain, rainChancePercent);

  return (
    <div className={`${METRIC_FOCUS_PANEL} ${className}`}>
      <div
        className={`${METRIC_CELL_URGENCY} row-span-2 flex min-w-0 flex-col justify-center border-r border-slate-200/80 px-2 py-2`}
      >
        <div className="flex items-center gap-0.5">
          <UrgencyIcon className="text-brand-orange" />
          <p className="text-[9px] font-semibold text-slate-500 sm:text-[10px]">
            {t("dashboard.cardUrgencyLabel")}
          </p>
        </div>
        <p
          className={`mt-0.5 text-[22px] font-bold leading-none tabular-nums tracking-tight sm:text-[26px] ${urgencyAccent(urgency)}`}
        >
          {urgency}
        </p>
      </div>

      <div
        className={`${METRIC_CELL_RISK} flex min-w-0 flex-col justify-center border-b border-slate-200/80 px-1.5 py-1.5 sm:px-2`}
      >
        <div className="flex items-center gap-0.5">
          <RiskMetricIcon />
          <p className="truncate text-[8px] font-semibold text-slate-500 sm:text-[9px]">
            {scoreLabel}
          </p>
        </div>
        <p className="mt-0.5 text-[15px] font-bold leading-none tabular-nums text-slate-900 sm:text-[16px]">
          {riskScore}
        </p>
        <div className="mt-0.5">
          <RiskBadge level={riskLevel} compact />
        </div>
      </div>

      <div
        className={`${METRIC_CELL_RAIN} flex min-w-0 flex-col justify-center px-1.5 py-1.5 sm:px-2`}
      >
        <div className="flex items-center gap-0.5">
          <RainMetricIcon level={rain} />
          <p className="hidden truncate text-[8px] font-semibold text-slate-500 sm:inline sm:text-[9px]">
            {t("weather.rainChance")}
          </p>
        </div>
        <div className="mt-0.5 flex items-baseline gap-0.5">
          <p className="text-[15px] font-bold leading-none tabular-nums text-slate-900 sm:text-[16px]">
            {rainPercent}
          </p>
          <span className="text-[10px] font-semibold text-slate-500">%</span>
        </div>
      </div>
    </div>
  );
}

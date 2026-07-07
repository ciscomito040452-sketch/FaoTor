"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import {
  computeUrgencyScore,
  resolveRainChancePercent,
  resolveRainForecast,
} from "@/lib/mock-weather";
import { getRiskLabel } from "@/lib/labels";
import { ScoreRing } from "@/components/ui/ScoreRing";
import {
  METRIC_CELL_RAIN,
  METRIC_CELL_RISK,
  METRIC_CELL_URGENCY,
  METRIC_FOCUS_PANEL,
  RISK_BADGE,
  urgencyRingColor,
} from "@/lib/risk-colors";
import { RainMetricIcon, RiskMetricIcon } from "@/components/shared/MetricIcons";

interface MetricFocusBlockProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
  rainChancePercent?: number;
  scoreLabel: string;
  className?: string;
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
  const { locale, t } = useApp();
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainPercent = resolveRainChancePercent(rain, rainChancePercent);
  const riskLevelLabel = getRiskLabel(riskLevel, locale);
  const riskLevelClass = RISK_BADGE[riskLevel].text;

  return (
    <div className={`${METRIC_FOCUS_PANEL} ${className}`}>
      <div
        className={`${METRIC_CELL_URGENCY} flex flex-col items-center justify-center border-r border-slate-200/80 px-3 py-2.5`}
      >
        <ScoreRing
          value={urgency}
          size={56}
          strokeColor={urgencyRingColor(urgency)}
          label={t("dashboard.cardUrgencyLabel")}
        />
      </div>

      <div className="grid min-w-0 grid-rows-2">
        <div
          className={`${METRIC_CELL_RISK} flex min-w-0 flex-col justify-center border-b border-slate-200/80 px-3 py-2.5`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1">
              <RiskMetricIcon />
              <p className="truncate text-[10px] font-semibold text-slate-500">
                {scoreLabel}
              </p>
            </div>
            <p className="shrink-0 text-[18px] font-bold leading-none tabular-nums text-slate-900">
              {riskScore}
            </p>
          </div>
          <p className={`mt-1 truncate text-[10px] font-semibold ${riskLevelClass}`}>
            {riskLevelLabel}
          </p>
        </div>

        <div
          className={`${METRIC_CELL_RAIN} flex min-w-0 items-center justify-between gap-2 px-3 py-2.5`}
        >
          <div className="flex min-w-0 items-center gap-1">
            <RainMetricIcon level={rain} />
            <p className="truncate text-[10px] font-semibold text-slate-500">
              {t("weather.rainChance")}
            </p>
          </div>
          <p className="shrink-0 text-[18px] font-bold leading-none tabular-nums text-slate-900">
            {rainPercent}
            <span className="text-[12px] font-semibold text-slate-500">%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

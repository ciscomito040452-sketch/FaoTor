"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import {
  computeUrgencyScore,
  resolveRainChancePercent,
  resolveRainForecast,
} from "@/lib/mock-weather";
import { getRiskLabel, getUrgencyTierLabel } from "@/lib/labels";
import { getUrgencyTier } from "@/lib/urgency-levels";
import { MetricPercentValue } from "@/components/shared/MetricPercentValue";
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

const METRIC_ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_3.25rem] gap-x-1.5 px-2.5";

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
  const urgencyTier = getUrgencyTier(urgency);
  const urgencyTierLabel = getUrgencyTierLabel(urgencyTier, locale);
  const urgencyTierClass =
    urgencyTier === "high"
      ? "text-brand-orange-dark"
      : urgencyTier === "medium"
        ? "text-brand-orange"
        : "text-slate-500";

  return (
    <div className={`${METRIC_FOCUS_PANEL} ${className}`}>
      <div
        className={`${METRIC_CELL_URGENCY} flex items-center justify-center border-r border-slate-200/80 px-1.5 py-2`}
      >
        <ScoreRing
          value={urgency}
          size={46}
          strokeColor={urgencyRingColor(urgency)}
          label={urgencyTierLabel}
          labelClassName={`max-w-[78px] text-center font-semibold leading-tight ${urgencyTierClass}`}
          compact
          showPercent
        />
      </div>

      <div className="grid min-w-0 grid-rows-2 overflow-hidden">
        <div
          className={`${METRIC_CELL_RISK} ${METRIC_ROW_GRID} grid-rows-[auto_auto] gap-y-0.5 border-b border-slate-200/80 py-2`}
        >
          <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-1">
            <RiskMetricIcon />
            <p className="text-[11px] font-semibold leading-tight text-slate-600">
              {scoreLabel}
            </p>
          </div>
          <div className="col-start-2 row-start-1 self-center justify-self-end">
            <MetricPercentValue value={riskScore} />
          </div>
          <p
            className={`col-span-2 row-start-2 text-[10px] font-semibold leading-tight ${riskLevelClass}`}
          >
            {riskLevelLabel}
          </p>
        </div>

        <div
          className={`${METRIC_CELL_RAIN} ${METRIC_ROW_GRID} items-center py-2`}
        >
          <div className="flex min-w-0 items-center gap-1">
            <RainMetricIcon level={rain} />
            <p className="text-[11px] font-semibold leading-tight text-slate-600">
              {t("weather.rainChance")}
            </p>
          </div>
          <div className="justify-self-end">
            <MetricPercentValue value={rainPercent} />
          </div>
        </div>
      </div>
    </div>
  );
}

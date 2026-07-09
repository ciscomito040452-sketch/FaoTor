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
  METRIC_FOCUS_PANEL_LIST,
  RISK_BADGE,
  urgencyRingColor,
} from "@/lib/risk-colors";
import { RainMetricIcon, RiskMetricIcon } from "@/components/shared/MetricIcons";

const METRIC_ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_2.75rem] gap-x-1 px-2.5";

interface MetricFocusBlockProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
  rainChancePercent?: number;
  scoreLabel: string;
  className?: string;
  /** list = fluid width inside ReportCard; default = fixed 284px panel */
  variant?: "default" | "list";
}

export function MetricFocusBlock({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
  rainChancePercent,
  scoreLabel,
  className = "",
  variant = "default",
}: MetricFocusBlockProps) {
  const { locale, t } = useApp();
  const isList = variant === "list";
  const panelClass = isList ? METRIC_FOCUS_PANEL_LIST : METRIC_FOCUS_PANEL;
  const ringSize = isList ? 40 : 46;
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
    <div className={`${panelClass} ${className}`}>
      <div
        className={`${METRIC_CELL_URGENCY} flex min-h-[72px] flex-col items-center justify-center border-r border-slate-200/80 px-1 py-2`}
      >
        <ScoreRing
          value={urgency}
          size={ringSize}
          strokeColor={urgencyRingColor(urgency)}
          label={urgencyTierLabel}
          labelClassName={`text-center font-semibold leading-tight ${urgencyTierClass} ${
            isList ? "max-w-[64px]" : "max-w-[78px]"
          }`}
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
          <div className="flex min-w-0 items-center gap-0.5">
            <RainMetricIcon level={rain} className="shrink-0" />
            <p
              className={`font-semibold leading-none text-slate-600 whitespace-nowrap ${
                isList ? "text-[10px]" : "text-[11px]"
              }`}
            >
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

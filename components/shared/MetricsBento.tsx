"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import {
  computeUrgencyScore,
  getRainBonus,
  resolveRainChancePercent,
  resolveRainForecast,
} from "@/lib/mock-weather";
import { getRainLabel } from "@/lib/labels";
import { RiskBadge } from "@/components/RiskBadge";
import {
  METRIC_CELL_RAIN,
  METRIC_CELL_RISK,
  METRIC_CELL_URGENCY,
  METRIC_STRIP,
} from "@/lib/risk-colors";
import { RainMetricIcon, RiskMetricIcon, UrgencyIcon } from "@/components/shared/MetricIcons";

export type MetricsBentoVariant = "compact" | "panel" | "inline" | "stacked";

interface MetricsBentoProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
  rainChancePercent?: number;
  scoreLabel: string;
  variant?: MetricsBentoVariant;
  className?: string;
}

function urgencyAccent(score: number): string {
  if (score >= 85) return "text-brand-orange-dark";
  if (score >= 70) return "text-brand-orange";
  return "text-slate-900";
}

function stripSizes(variant: MetricsBentoVariant) {
  if (variant === "panel") {
    return {
      cell: "py-2.5",
      score: "text-[22px]",
      label: "text-[10px]",
      sub: "text-[9px]",
    };
  }
  if (variant === "compact" || variant === "stacked") {
    return {
      cell: "py-2",
      score: "text-[20px]",
      label: "text-[10px]",
      sub: "text-[9px]",
    };
  }
  return {
    cell: "py-1.5",
    score: "text-[18px]",
    label: "text-[9px]",
    sub: "text-[8px]",
  };
}

export function MetricsBento({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
  rainChancePercent,
  scoreLabel,
  variant = "compact",
  className = "",
}: MetricsBentoProps) {
  const { locale, t } = useApp();
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainBonus = getRainBonus(rain);
  const rainPercent = resolveRainChancePercent(rain, rainChancePercent);
  const levelLabel = getRainLabel(rain, locale);
  const sizes = stripSizes(variant);
  const showRainMeta = variant !== "inline";
  const showUrgencyHint =
    (variant === "panel" || variant === "stacked") && rainBonus > 0;
  const stripClass =
    variant === "stacked"
      ? "grid grid-cols-1 divide-y divide-slate-200/80 overflow-hidden rounded-xl ring-1 ring-slate-200/70"
      : METRIC_STRIP;

  return (
    <div className={`${stripClass} ${className}`}>
      <div className={`${METRIC_CELL_URGENCY} ${sizes.cell} min-w-0`}>
        <div className="flex items-center gap-1">
          <UrgencyIcon className="text-brand-orange" />
          <p className={`${sizes.label} font-semibold text-slate-500`}>
            {t("dashboard.cardUrgencyLabel")}
          </p>
        </div>
        <p className={`${sizes.score} mt-0.5 font-bold leading-none tabular-nums ${urgencyAccent(urgency)}`}>
          {urgency}
        </p>
        {showUrgencyHint && (
          <p className={`${sizes.sub} mt-1 font-medium text-brand-orange`}>
            {t("weather.rainBonus").replace("{n}", String(rainBonus))}
          </p>
        )}
      </div>

      <div className={`${METRIC_CELL_RISK} ${sizes.cell} min-w-0`}>
        <div className="flex items-center gap-1">
          <RiskMetricIcon />
          <p className={`${sizes.label} font-semibold text-slate-500`}>{scoreLabel}</p>
        </div>
        <p className={`${sizes.score} mt-0.5 font-bold leading-none tabular-nums text-slate-900`}>
          {riskScore}
        </p>
        {showRainMeta && (
          <div className="mt-1">
            <RiskBadge level={riskLevel} compact />
          </div>
        )}
      </div>

      <div className={`${METRIC_CELL_RAIN} ${sizes.cell} min-w-0`}>
        <div className="flex items-center gap-1">
          <RainMetricIcon level={rain} />
          <p className={`${sizes.label} font-semibold text-slate-500`}>
            {t("weather.rainChance")}
          </p>
        </div>
        <div className="mt-0.5 flex items-baseline gap-0.5">
          <p className={`${sizes.score} font-bold leading-none tabular-nums text-slate-900`}>
            {rainPercent}
          </p>
          <span className="text-[11px] font-semibold text-slate-500">%</span>
        </div>
        {showRainMeta && (
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-md bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
              <RainMetricIcon level={rain} />
              {levelLabel}
            </span>
            {variant === "panel" && (
              <span className={`${sizes.sub} text-slate-400`}>
                {t("weather.apiSource")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import {
  computeUrgencyScore,
  getRainBonus,
  resolveRainChancePercent,
  resolveRainForecast,
} from "@/lib/mock-weather";
import { getRainLabel, getRiskLabel, getUrgencyTierLabel } from "@/lib/labels";
import { getUrgencyTier } from "@/lib/urgency-levels";
import { MetricPercentValue } from "@/components/shared/MetricPercentValue";
import { ScoreRing } from "@/components/ui/ScoreRing";
import {
  METRIC_CELL_RAIN,
  METRIC_CELL_RISK,
  METRIC_CELL_URGENCY,
  METRIC_STRIP,
  RISK_BADGE,
  riskBarFillClass,
  riskBarTrackClass,
  riskMetricValueClass,
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
      cell: "px-3 py-2.5",
      score: "text-[22px]",
      label: "text-[10px]",
      sub: "text-[9px]",
    };
  }
  if (variant === "compact" || variant === "stacked") {
    return {
      cell: "px-2.5 py-2",
      score: "text-[20px]",
      label: "text-[10px]",
      sub: "text-[9px]",
    };
  }
  return {
    cell: "px-2 py-1.5",
    score: "text-[18px]",
    label: "text-[9px]",
    sub: "text-[8px]",
  };
}

function urgencyBarColor(score: number): string {
  if (score >= 85) return "bg-brand-orange-dark";
  if (score >= 70) return "bg-brand-orange";
  return "bg-slate-400";
}

function urgencyRingStroke(score: number): string {
  if (score >= 85) return "#EA580C";
  if (score >= 70) return "#F97316";
  return "#94A3B8";
}

function MetricScoreBar({
  value,
  fillClass,
  trackClass = "bg-slate-200/70",
  markers,
}: {
  value: number;
  fillClass: string;
  trackClass?: string;
  markers?: number[];
}) {
  const width = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`relative h-1.5 w-full overflow-hidden rounded-full ${trackClass}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {markers?.map((mark) => (
        <div
          key={mark}
          className="absolute bottom-0 top-0 z-10 w-px bg-white/60"
          style={{ left: `${mark}%` }}
          aria-hidden
        />
      ))}
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function PanelSupportCard({
  bgClass,
  icon,
  label,
  value,
  valueClassName,
  chip,
  barFillClass,
  barTrackClass,
}: {
  bgClass: string;
  icon: ReactNode;
  label: string;
  value: number;
  valueClassName?: string;
  chip?: ReactNode;
  barFillClass: string;
  barTrackClass?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg px-3.5 py-2.5 ring-1 ring-inset ring-slate-200/70 ${bgClass}`}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="truncate whitespace-nowrap text-[13px] font-semibold leading-tight text-slate-600">
          {label}
        </p>
      </div>

      <div className="mt-1.5 flex flex-1 flex-col">
        <div className="flex items-end gap-1">
          <span
            className={`text-[26px] font-bold leading-none tabular-nums ${
              valueClassName ?? "text-slate-900"
            }`}
          >
            {value}
          </span>
          <span className="pb-0.5 text-[13px] font-semibold text-slate-500">%</span>
        </div>
        {chip && <div className="mt-1">{chip}</div>}
        <div className="mt-auto pt-2">
          <MetricScoreBar
            value={value}
            fillClass={barFillClass}
            trackClass={barTrackClass}
          />
        </div>
      </div>
    </div>
  );
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

  if (variant === "panel") {
    const riskValueClass = riskMetricValueClass(riskLevel);
    const rainValueClass =
      rain === "สูง" ? "text-sky-800" : rain === "ปานกลาง" ? "text-sky-700" : "text-sky-600";

    return (
      <div
        className={`grid grid-cols-1 gap-2 rounded-xl bg-transparent p-2 md:grid-cols-12 md:grid-rows-2 md:items-stretch ${className}`}
      >
        <div
          className={`flex h-full min-h-0 flex-col rounded-lg px-3.5 py-3 ring-1 ring-inset ring-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${METRIC_CELL_URGENCY} md:col-span-7 md:row-span-2`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <UrgencyIcon />
              <p className="text-[16px] font-semibold text-slate-600">
                {t("dashboard.cardUrgencyLabel")}
              </p>
            </div>
            <span
              className={`inline-flex max-w-full shrink-0 items-center justify-center rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-slate-200/80 ${urgencyTierClass}`}
            >
              {urgencyTierLabel}
            </span>
          </div>

          <div className="flex flex-1 items-center gap-3 py-1">
            <ScoreRing
              value={urgency}
              size={68}
              compact
              showPercent
              strokeColor={urgencyRingStroke(urgency)}
            />
            <div className="min-w-0 flex-1">
              <div className={`flex items-end gap-0.5 ${urgencyAccent(urgency)}`}>
                <span className="text-[34px] font-bold leading-none tabular-nums">
                  {urgency}
                </span>
                <span className="pb-1 text-[15px] font-semibold text-slate-500">%</span>
              </div>
              <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500">
                {t("detail.urgencyFormula")}
              </p>
              {rainBonus > 0 ? (
                <span className="mt-1.5 inline-flex max-w-full items-center rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-brand-orange ring-1 ring-slate-200/80">
                  {t("weather.rainBonus").replace("{n}", String(rainBonus))}
                </span>
              ) : null}
            </div>
          </div>

          <div className="pt-1">
            <MetricScoreBar
              value={urgency}
              fillClass={urgencyBarColor(urgency)}
              trackClass="bg-slate-200/70"
              markers={[40, 70]}
            />
          </div>
        </div>

        <div className="h-full md:col-span-5 md:row-span-1">
          <PanelSupportCard
            bgClass={METRIC_CELL_RISK}
            icon={<RiskMetricIcon />}
            label={scoreLabel}
            value={riskScore}
            valueClassName={riskValueClass}
            chip={
              <span
                className={`inline-flex max-w-full items-center rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-slate-200/80 ${riskLevelClass}`}
              >
                {riskLevelLabel}
              </span>
            }
            barFillClass={riskBarFillClass(riskLevel)}
            barTrackClass={riskBarTrackClass()}
          />
        </div>

        <div className="h-full md:col-span-5 md:row-span-1">
          <PanelSupportCard
            bgClass={METRIC_CELL_RAIN}
            icon={<RainMetricIcon level={rain} />}
            label={t("weather.rainChance")}
            value={rainPercent}
            valueClassName={rainValueClass}
            barFillClass={
              rain === "สูง"
                ? "bg-sky-600"
                : rain === "ปานกลาง"
                  ? "bg-sky-500"
                  : "bg-sky-400"
            }
            barTrackClass="bg-sky-200/60"
            chip={
              <>
                <span className="inline-flex w-fit max-w-full items-center justify-center gap-1 rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
                  <RainMetricIcon level={rain} />
                  {levelLabel}
                </span>
                <p className="mt-0.5 text-[9px] leading-tight text-slate-400">
                  {t("weather.apiSource")}
                </p>
              </>
            }
          />
        </div>
      </div>
    );
  }

  const sizes = stripSizes(variant);
  const showRainMeta = variant !== "inline";
  const showUrgencyHint =
    (variant === "stacked") && rainBonus > 0;
  const stripClass =
    variant === "stacked"
      ? "grid grid-cols-1 divide-y divide-slate-200/80 overflow-hidden rounded-xl ring-1 ring-slate-200/70"
      : METRIC_STRIP;

  return (
    <div className={`${stripClass} ${className}`}>
      <div className={`${METRIC_CELL_URGENCY} ${sizes.cell} min-w-0`}>
        <div className="flex items-center gap-1">
          <UrgencyIcon />
          <p className={`${sizes.label} font-semibold text-slate-500`}>
            {t("dashboard.cardUrgencyLabel")}
          </p>
        </div>
        <p
          className={`${sizes.score} mt-1 font-bold leading-none tabular-nums ${urgencyAccent(urgency)}`}
        >
          {urgency}
          <span className="text-[0.62em] font-semibold text-slate-500">%</span>
        </p>
        <p className={`${sizes.sub} mt-1 font-semibold ${urgencyTierClass}`}>
          {urgencyTierLabel}
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
          <p className={`${sizes.label} font-semibold text-slate-500`}>
            {scoreLabel}
          </p>
        </div>
        <p className={`${sizes.score} mt-1 font-bold leading-none tabular-nums ${riskMetricValueClass(riskLevel)}`}>
          {riskScore}
          <span className="text-[0.62em] font-semibold text-slate-500">%</span>
        </p>
        {showRainMeta && (
          <p className={`${sizes.sub} mt-1 font-semibold ${riskLevelClass}`}>
            {riskLevelLabel}
          </p>
        )}
      </div>

      <div className={`${METRIC_CELL_RAIN} ${sizes.cell} min-w-0`}>
        <div className="flex items-center gap-1">
          <RainMetricIcon level={rain} />
          <p className={`${sizes.label} truncate whitespace-nowrap font-semibold text-slate-500`}>
            {t("weather.rainChance")}
          </p>
        </div>
        <div className="mt-1">
          <MetricPercentValue value={rainPercent} align="left" />
        </div>
        {showRainMeta && (
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-md bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
              <RainMetricIcon level={rain} />
              {levelLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

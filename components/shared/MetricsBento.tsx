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
          className="absolute bottom-0 top-0 z-10 w-px bg-white/80"
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
  barFillClass,
  barTrackClass,
  footer,
}: {
  bgClass: string;
  icon: ReactNode;
  label: string;
  value: number;
  valueClassName?: string;
  barFillClass: string;
  barTrackClass?: string;
  footer: ReactNode;
}) {
  return (
    <div
      className={`flex min-h-[90px] flex-col rounded-lg px-3 py-1.5 ring-1 ring-inset ring-slate-200/70 ${bgClass}`}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="truncate text-[12px] font-semibold leading-tight text-slate-600">
          {label}
        </p>
      </div>

      <div className="mt-0.5 flex justify-center px-1">
        <MetricPercentValue
          value={value}
          size="sm"
          align="center"
          className={valueClassName}
        />
      </div>

      <div className="mt-0.5 px-1">
        <MetricScoreBar
          value={value}
          fillClass={barFillClass}
          trackClass={barTrackClass}
        />
      </div>

      <div className="mt-0.5 min-h-[18px] space-y-0.5 text-center">{footer}</div>
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
    return (
      <div
        className={`grid grid-cols-1 gap-1 rounded-xl bg-white/60 p-2 ring-1 ring-slate-200/85 md:grid-cols-12 md:grid-rows-2 ${className}`}
      >
        <div
          className={`flex min-h-[168px] flex-col rounded-lg px-3 py-2 ring-1 ring-inset ring-orange-200/70 shadow-[0_8px_18px_rgba(234,88,12,0.08)] ${METRIC_CELL_URGENCY} md:col-span-7 md:row-span-2`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <UrgencyIcon className="text-brand-orange" />
              <p className="text-[13px] font-semibold text-slate-700">
                {t("dashboard.cardUrgencyLabel")}
              </p>
            </div>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${urgencyTierClass}`}>
              {urgencyTierLabel}
            </span>
          </div>

          <div className="mt-1.5 grid grid-cols-[72px_minmax(0,1fr)] items-center gap-2.5">
            <ScoreRing
              value={urgency}
              size={70}
              compact
              showPercent
              strokeColor={urgencyRingStroke(urgency)}
            />
            {rainBonus > 0 ? (
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-brand-orange">
                  {t("weather.rainBonus").replace("{n}", String(rainBonus))}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-1">
            <MetricScoreBar
              value={urgency}
              fillClass={urgencyBarColor(urgency)}
              trackClass="bg-orange-200/55"
              markers={[40, 70]}
            />
          </div>
        </div>

        <div className="md:col-span-5 md:row-span-1">
          <PanelSupportCard
            bgClass={METRIC_CELL_RISK}
            icon={<RiskMetricIcon />}
            label={scoreLabel}
            value={riskScore}
            barFillClass={
              riskLevel === "อุดตันหนัก"
                ? "bg-brand-orange-dark"
                : riskLevel === "เริ่มอุดตัน"
                  ? "bg-brand-orange"
                  : "bg-slate-400"
            }
            footer={
              <p className={`text-[11px] font-semibold leading-tight ${riskLevelClass}`}>
                {riskLevelLabel}
              </p>
            }
          />
        </div>

        <div className="md:col-span-5 md:row-span-1">
          <PanelSupportCard
            bgClass={METRIC_CELL_RAIN}
            icon={<RainMetricIcon level={rain} />}
            label={t("weather.rainChance")}
            value={rainPercent}
            barFillClass={
              rain === "สูง"
                ? "bg-sky-600"
                : rain === "ปานกลาง"
                  ? "bg-sky-500"
                  : "bg-sky-400"
            }
            barTrackClass="bg-sky-200/60"
            footer={
              <>
                <span className="inline-flex w-fit max-w-full items-center justify-center gap-1 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
                  <RainMetricIcon level={rain} />
                  {levelLabel}
                </span>
                <p className="text-[9px] leading-tight text-slate-400">
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
          <UrgencyIcon className="text-brand-orange" />
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
        <p className={`${sizes.score} mt-1 font-bold leading-none tabular-nums text-slate-900`}>
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
          <p className={`${sizes.label} font-semibold text-slate-500`}>
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

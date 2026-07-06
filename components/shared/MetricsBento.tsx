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
  BENTO_CELL_RAIN,
  BENTO_CELL_RISK,
  BENTO_CELL_URGENCY,
  BENTO_HERO,
  BENTO_TRAY,
} from "@/lib/risk-colors";

export type MetricsBentoVariant = "compact" | "panel" | "inline";

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

function RainCloudIcon({ level, size = 14 }: { level: RainForecast; size?: number }) {
  const iconClass =
    level === "สูง"
      ? "text-sky-600"
      : level === "ปานกลาง"
        ? "text-slate-500"
        : "text-slate-400";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={iconClass}
      aria-hidden
    >
      <path
        d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.8A3.5 3.5 0 0 0 7 18z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {level === "สูง" && (
        <>
          <path d="M10 20v2M14 20v2M12 21v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function UrgencyCell({
  score,
  rainBonus,
  layout,
}: {
  score: number;
  rainBonus: number;
  layout: "hero" | "stack";
}) {
  const { t } = useApp();
  const accent = urgencyAccent(score);

  if (layout === "hero") {
    return (
      <div className={`${BENTO_HERO} col-span-2 px-3 py-2.5`}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-semibold text-slate-700">
            {t("report.urgencyScore")}
          </p>
          <p className={`text-[28px] font-bold leading-none tabular-nums ${accent}`}>
            {score}
          </p>
        </div>
        <p className="mt-1 text-[10px] font-medium text-slate-500">
          {t("detail.urgencyFormula")}
          {rainBonus > 0 && (
            <span className="ml-1 font-semibold text-brand-orange">
              · {t("weather.rainBonus").replace("{n}", String(rainBonus))}
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={`${BENTO_CELL_URGENCY} flex min-h-[76px] min-w-0 flex-col p-2.5`}>
      <p className="text-[10px] font-semibold text-slate-500">
        {t("dashboard.cardUrgencyLabel")}
      </p>
      <p className={`mt-1 text-[22px] font-bold leading-none tabular-nums ${accent}`}>
        {score}
      </p>
      <p className="mt-auto pt-1 text-[9px] leading-snug text-slate-500">
        {rainBonus > 0
          ? t("weather.rainBonus").replace("{n}", String(rainBonus))
          : t("detail.urgencyFormula")}
      </p>
    </div>
  );
}

function RiskCell({
  score,
  riskLevel,
  scoreLabel,
  layout,
}: {
  score: number;
  riskLevel: RiskLevel;
  scoreLabel: string;
  layout: "stack" | "compact";
}) {
  const { t } = useApp();
  const label = layout === "stack" ? t("dashboard.cardRiskLabel") : scoreLabel;

  return (
    <div className={`${BENTO_CELL_RISK} flex min-h-[76px] min-w-0 flex-col p-2.5`}>
      <p className="text-[10px] font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-[22px] font-bold leading-none tabular-nums text-slate-900">
        {score}
      </p>
      <div className="mt-auto pt-1">
        <RiskBadge level={riskLevel} compact />
      </div>
    </div>
  );
}

function RainCell({
  level,
  percent,
}: {
  level: RainForecast;
  percent: number;
}) {
  const { locale, t } = useApp();
  const levelLabel = getRainLabel(level, locale);

  return (
    <div className={`${BENTO_CELL_RAIN} flex min-h-[76px] min-w-0 flex-col p-2.5`}>
      <p className="text-[10px] font-semibold text-slate-500">
        {t("weather.rainChance")}
      </p>
      <div className="mt-1 flex items-baseline gap-0.5">
        <p className="text-[22px] font-bold leading-none tabular-nums text-slate-900">
          {percent}
        </p>
        <span className="text-[13px] font-semibold text-slate-500">%</span>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
        <span className="inline-flex items-center gap-0.5 rounded-md bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
          <RainCloudIcon level={level} size={10} />
          {levelLabel}
        </span>
        <span className="text-[9px] text-slate-400">{t("weather.apiSource")}</span>
      </div>
    </div>
  );
}

function StackedBentoGrid({
  urgency,
  rainBonus,
  riskScore,
  riskLevel,
  scoreLabel,
  rain,
  rainPercent,
}: {
  urgency: number;
  rainBonus: number;
  riskScore: number;
  riskLevel: RiskLevel;
  scoreLabel: string;
  rain: RainForecast;
  rainPercent: number;
}) {
  return (
    <div className={`${BENTO_TRAY} grid grid-cols-2 gap-2`}>
      <UrgencyCell score={urgency} rainBonus={rainBonus} layout="hero" />
      <RiskCell score={riskScore} riskLevel={riskLevel} scoreLabel={scoreLabel} layout="compact" />
      <RainCell level={rain} percent={rainPercent} />
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
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainBonus = getRainBonus(rain);
  const rainPercent = resolveRainChancePercent(rain, rainChancePercent);

  if (variant === "inline") {
    return (
      <div className={`${BENTO_TRAY} grid grid-cols-3 gap-2 ${className}`}>
        <UrgencyCell score={urgency} rainBonus={rainBonus} layout="stack" />
        <RiskCell score={riskScore} riskLevel={riskLevel} scoreLabel={scoreLabel} layout="stack" />
        <RainCell level={rain} percent={rainPercent} />
      </div>
    );
  }

  return (
    <div className={className}>
      <StackedBentoGrid
        urgency={urgency}
        rainBonus={rainBonus}
        riskScore={riskScore}
        riskLevel={riskLevel}
        scoreLabel={scoreLabel}
        rain={rain}
        rainPercent={rainPercent}
      />
    </div>
  );
}

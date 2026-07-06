"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { computeUrgencyScore, getRainBonus, resolveRainForecast } from "@/lib/mock-weather";
import { getRainLabel } from "@/lib/labels";
import { RiskBadge } from "@/components/RiskBadge";
import { BENTO_HERO, BENTO_SURFACE } from "@/lib/risk-colors";

export type MetricsBentoVariant = "compact" | "panel" | "inline";

interface MetricsBentoProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
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
      ? "text-brand-orange"
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
  layout: "hero" | "horizontal" | "inline";
}) {
  const { t } = useApp();
  const accent = urgencyAccent(score);

  if (layout === "hero") {
    return (
      <div className={`${BENTO_HERO} col-span-2 px-3 py-2.5`}>
        <div className="flex items-center justify-between gap-2">
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

  if (layout === "horizontal") {
    return (
      <div className={`${BENTO_SURFACE} px-3 py-2.5`}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-600">
              {t("report.urgencyScore")}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-slate-500">
              {rainBonus > 0
                ? t("weather.rainBonus").replace("{n}", String(rainBonus))
                : t("detail.urgencyFormula")}
            </p>
          </div>
          <p className={`text-[26px] font-bold leading-none tabular-nums ${accent}`}>
            {score}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${BENTO_SURFACE} min-w-0 px-2 py-2`}>
      <p className={`text-[18px] font-bold leading-none tabular-nums ${accent}`}>
        {score}
      </p>
      <p className="mt-1 text-[10px] font-semibold text-slate-600">
        {t("dashboard.cardUrgencyLabel")}
      </p>
      <p className="mt-0.5 truncate text-[9px] text-slate-500">
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
  layout: "compact" | "horizontal" | "inline";
}) {
  const { t } = useApp();

  if (layout === "horizontal") {
    return (
      <div className={`${BENTO_SURFACE} px-3 py-2.5`}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-600">{scoreLabel}</p>
            <div className="mt-1">
              <RiskBadge level={riskLevel} compact />
            </div>
          </div>
          <p className="text-[26px] font-bold leading-none tabular-nums text-slate-900">
            {score}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${BENTO_SURFACE} min-w-0 px-2.5 py-2`}>
      <p className="text-[22px] font-bold leading-none tabular-nums text-slate-900">
        {score}
      </p>
      <p className="mt-1 text-[10px] font-semibold text-slate-600">
        {layout === "inline" ? t("dashboard.cardRiskLabel") : scoreLabel}
      </p>
      <div className="mt-1">
        <RiskBadge level={riskLevel} compact />
      </div>
    </div>
  );
}

function RainCell({
  level,
  layout,
}: {
  level: RainForecast;
  layout: "compact" | "horizontal" | "inline";
}) {
  const { locale, t } = useApp();
  const label = getRainLabel(level, locale);

  if (layout === "horizontal") {
    return (
      <div className={`${BENTO_SURFACE} px-3 py-2.5`}>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-600">
              {t("report.rainForecast")}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-slate-400">
              {t("weather.apiSource")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <RainCloudIcon level={level} size={16} />
            <span className="text-[22px] font-bold leading-none text-slate-900">
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${BENTO_SURFACE} min-w-0 px-2.5 py-2`}>
      <div className="flex items-center gap-1">
        <RainCloudIcon level={level} size={14} />
        <p className="text-[18px] font-bold leading-none text-slate-900">{label}</p>
      </div>
      <p className="mt-1 text-[10px] font-semibold text-slate-600">
        {t("report.rainForecast")}
      </p>
      <p className="mt-0.5 truncate text-[9px] text-slate-400">
        {t("weather.apiSource")}
      </p>
    </div>
  );
}

export function MetricsBento({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
  scoreLabel,
  variant = "compact",
  className = "",
}: MetricsBentoProps) {
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainBonus = getRainBonus(rain);

  if (variant === "inline") {
    return (
      <div className={`mt-2.5 grid grid-cols-3 gap-1.5 ${className}`}>
        <UrgencyCell score={urgency} rainBonus={rainBonus} layout="inline" />
        <RiskCell score={riskScore} riskLevel={riskLevel} scoreLabel={scoreLabel} layout="inline" />
        <RainCell level={rain} layout="inline" />
      </div>
    );
  }

  if (variant === "panel") {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        <UrgencyCell score={urgency} rainBonus={rainBonus} layout="horizontal" />
        <RiskCell score={riskScore} riskLevel={riskLevel} scoreLabel={scoreLabel} layout="horizontal" />
        <RainCell level={rain} layout="horizontal" />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <UrgencyCell score={urgency} rainBonus={rainBonus} layout="hero" />
      <RiskCell score={riskScore} riskLevel={riskLevel} scoreLabel={scoreLabel} layout="compact" />
      <RainCell level={rain} layout="compact" />
    </div>
  );
}

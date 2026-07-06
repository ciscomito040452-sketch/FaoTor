"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { computeUrgencyScore, getRainBonus, resolveRainForecast } from "@/lib/mock-weather";
import { RiskBadge } from "@/components/RiskBadge";
import { RainForecastChip } from "@/components/shared/RainForecastChip";

interface ReportInsightStripProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore?: number;
  rainForecast?: RainForecast;
}

export function ReportInsightStrip({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
}: ReportInsightStripProps) {
  const { t } = useApp();
  const rain = resolveRainForecast(rainForecast);
  const urgency = urgencyScore ?? computeUrgencyScore(riskScore, rain);
  const rainBonus = getRainBonus(rain);

  const riskTone =
    riskLevel === "อุดตันหนัก"
      ? "bg-brand-orange-soft/60 border-brand-orange/20"
      : riskLevel === "เริ่มอุดตัน"
        ? "bg-brand-orange-soft/40 border-brand-orange/15"
        : "bg-slate-50 border-slate-100";

  const urgencyTone =
    urgency >= 70
      ? "bg-brand-orange-soft border-brand-orange/25"
      : "bg-brand-blue-soft/60 border-brand-blue/20";

  return (
    <div className="mt-2.5 grid grid-cols-3 gap-1.5">
      <div className={`min-w-0 rounded-xl border px-2 py-2 ${riskTone}`}>
        <p className="text-[18px] font-bold leading-none tabular-nums text-slate-900">
          {riskScore}
        </p>
        <p className="mt-1 text-[10px] font-semibold text-slate-600">
          {t("dashboard.cardRiskLabel")}
        </p>
        <div className="mt-1">
          <RiskBadge level={riskLevel} compact />
        </div>
      </div>

      <div className={`min-w-0 rounded-xl border px-2 py-2 ${urgencyTone}`}>
        <p className="text-[18px] font-bold leading-none tabular-nums text-slate-900">
          {urgency}
        </p>
        <p className="mt-1 text-[10px] font-semibold text-slate-600">
          {t("dashboard.cardUrgencyLabel")}
        </p>
        <p className="mt-1 truncate text-[9px] font-medium text-slate-500">
          {rainBonus > 0
            ? t("weather.rainBonus").replace("{n}", String(rainBonus))
            : t("detail.urgencyFormula")}
        </p>
      </div>

      <RainForecastChip level={rain} variant="compact" />
    </div>
  );
}

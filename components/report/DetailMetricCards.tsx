"use client";

import type { RainForecast, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";
import { getRainBonus } from "@/lib/mock-weather";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { RainForecastChip } from "@/components/shared/RainForecastChip";
import {
  RISK_METRIC_BG,
  RISK_RING,
  urgencyRingColor,
} from "@/lib/risk-colors";

interface DetailMetricCardsProps {
  riskScore: number;
  riskLevel: RiskLevel;
  urgencyScore: number;
  rainForecast: RainForecast;
  scoreLabel: string;
  compact?: boolean;
}

export function DetailMetricCards({
  riskScore,
  riskLevel,
  urgencyScore,
  rainForecast,
  scoreLabel,
  compact = false,
}: DetailMetricCardsProps) {
  const { t } = useApp();
  const ringSize = compact ? 56 : 72;
  const rainBonus = getRainBonus(rainForecast);
  const layoutClass = compact
    ? "flex flex-col gap-2.5"
    : "grid grid-cols-1 gap-2.5 sm:grid-cols-3";

  return (
    <div className={layoutClass}>
      <div
        className={`flex flex-col items-center rounded-[14px] border border-slate-100 p-3 ${RISK_METRIC_BG[riskLevel]}`}
      >
        <p className="w-full text-[12px] font-semibold text-slate-700">{scoreLabel}</p>
        <div className="mt-2 flex flex-col items-center">
          <ScoreRing
            value={riskScore}
            size={ringSize}
            strokeColor={RISK_RING[riskLevel]}
          />
          <div className="mt-2">
            <RiskBadge level={riskLevel} compact />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col items-center rounded-[14px] border border-slate-100 p-3 ${
          urgencyScore >= 70 ? "bg-brand-orange-soft" : "bg-brand-blue-soft"
        }`}
      >
        <p className="w-full text-[12px] font-semibold text-slate-700">
          {t("report.urgencyScore")}
        </p>
        <div className="mt-2 flex flex-col items-center">
          <ScoreRing
            value={urgencyScore}
            size={ringSize}
            strokeColor={urgencyRingColor(urgencyScore)}
          />
          <p className="mt-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-700">
            {t("detail.urgencyFormula")}
          </p>
          {rainBonus > 0 && (
            <p className="mt-1 text-[10px] font-semibold text-brand-orange-dark">
              {t("weather.rainBonus").replace("{n}", String(rainBonus))}
            </p>
          )}
        </div>
      </div>

      <RainForecastChip level={rainForecast} variant="detail" />
    </div>
  );
}

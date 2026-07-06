"use client";

import { useApp } from "@/lib/app-context";
import { getRainLabel } from "@/lib/labels";
import type { RainForecast } from "@/lib/types";

interface UrgencyBadgeProps {
  score: number;
  rain?: RainForecast;
  compact?: boolean;
}

export function UrgencyBadge({ score, rain, compact }: UrgencyBadgeProps) {
  const { t, locale } = useApp();
  const high = score >= 70;

  return (
    <div
      className={`rounded-[12px] border border-slate-100 p-4 dark:border-slate-100 ${
        high ? "bg-risk-red-bg/50" : "bg-slate-50 dark:bg-slate-100/10"
      }`}
    >
      <p className="text-[13px] text-slate-600">{t("report.urgencyScore")}</p>
      <p
        className={`font-bold leading-none text-slate-900 ${
          compact ? "mt-1 text-[28px]" : "mt-2 text-[40px]"
        }`}
      >
        {score}
      </p>
      {rain && (
        <p className="mt-2 text-[13px] text-slate-600">
          {t("report.rainForecast")}: {getRainLabel(rain, locale)}
        </p>
      )}
    </div>
  );
}

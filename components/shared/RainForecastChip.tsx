"use client";

import { useApp } from "@/lib/app-context";
import { getRainLabel } from "@/lib/labels";
import type { RainForecast } from "@/lib/types";

interface RainForecastChipProps {
  level: RainForecast;
  variant?: "compact" | "detail";
  showApiHint?: boolean;
  className?: string;
}

const levelStyles: Record<RainForecast, { bg: string; text: string; icon: string }> = {
  สูง: {
    bg: "bg-brand-orange-soft/80 border-brand-orange/25",
    text: "text-brand-orange-dark",
    icon: "text-brand-orange",
  },
  ปานกลาง: {
    bg: "bg-slate-50 border-slate-200/80",
    text: "text-slate-700",
    icon: "text-slate-500",
  },
  ต่ำ: {
    bg: "bg-slate-50 border-slate-200/80",
    text: "text-slate-600",
    icon: "text-slate-400",
  },
};

function RainCloudIcon({ level, size }: { level: RainForecast; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={levelStyles[level].icon}
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
      {level === "ปานกลาง" && (
        <path d="M11 20h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function RainForecastChip({
  level,
  variant = "compact",
  showApiHint = true,
  className = "",
}: RainForecastChipProps) {
  const { locale, t } = useApp();
  const styles = levelStyles[level];
  const isDetail = variant === "detail";
  const iconSize = isDetail ? 22 : 16;

  return (
    <div
      className={`flex flex-col rounded-xl border ${styles.bg} ${
        isDetail ? "p-4" : "px-2.5 py-2"
      } ${className}`}
    >
      <div className={`flex items-center gap-1.5 ${isDetail ? "justify-center" : ""}`}>
        <RainCloudIcon level={level} size={iconSize} />
        <span
          className={`font-bold tabular-nums text-slate-900 ${
            isDetail ? "text-[28px] leading-none" : "text-[18px] leading-none"
          }`}
        >
          {getRainLabel(level, locale)}
        </span>
      </div>
      <p
        className={`font-semibold text-slate-600 ${
          isDetail ? "mt-2 text-center text-[12px]" : "mt-1 text-[10px]"
        }`}
      >
        {t("report.rainForecast")}
      </p>
      {showApiHint && (
        <p
          className={`font-medium ${styles.text} ${
            isDetail ? "mt-1.5 text-center text-[11px]" : "mt-1 truncate text-[9px]"
          }`}
        >
          {t("weather.apiSource")}
        </p>
      )}
      {isDetail && (
        <p className="mt-2 text-center text-[10px] text-slate-400">
          {t("weather.fetchedAt")}
        </p>
      )}
    </div>
  );
}

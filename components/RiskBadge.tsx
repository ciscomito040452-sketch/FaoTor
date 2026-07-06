"use client";

import type { RiskLevel } from "@/lib/types";
import { RISK_BADGE } from "@/lib/risk-colors";
import { getRiskLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { ShieldDropletIcon } from "./ShieldDropletIcon";

export function RiskBadge({
  level,
  compact = false,
}: {
  level: RiskLevel;
  compact?: boolean;
}) {
  const { locale } = useApp();
  const style = RISK_BADGE[level];
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold leading-none ${style.bg} ${style.text} ${
        compact
          ? "gap-0.5 px-2 py-0.5 text-[11px]"
          : "gap-1.5 px-3 py-1.5 text-[15px]"
      }`}
    >
      <ShieldDropletIcon
        className={compact ? "h-3 w-3 shrink-0" : "shrink-0"}
      />
      {getRiskLabel(level, locale)}
    </span>
  );
}

"use client";

import type { RiskLevel } from "@/lib/types";
import { getRiskLabel } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { ShieldDropletIcon } from "./ShieldDropletIcon";

const STYLES: Record<RiskLevel, { bg: string; text: string }> = {
  ปกติ: { bg: "bg-slate-100", text: "text-slate-600" },
  เริ่มอุดตัน: { bg: "bg-brand-orange-soft", text: "text-brand-orange" },
  อุดตันหนัก: { bg: "bg-risk-red-bg", text: "text-risk-red-text" },
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const { locale } = useApp();
  const style = STYLES[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] font-semibold leading-none ${style.bg} ${style.text}`}
    >
      <ShieldDropletIcon className="shrink-0" />
      {getRiskLabel(level, locale)}
    </span>
  );
}

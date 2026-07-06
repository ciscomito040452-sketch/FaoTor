"use client";

import dynamic from "next/dynamic";
import type { Report, RiskLevel } from "@/lib/types";
import { useApp } from "@/lib/app-context";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center bg-slate-50 text-[13px] text-slate-600 dark:bg-slate-100/10 lg:h-[min(72vh,640px)]">
        …
      </div>
    ),
  }
);

const PIN_COLORS: Record<RiskLevel, string> = {
  ปกติ: "#4E5768",
  เริ่มอุดตัน: "#8A5A00",
  อุดตันหนัก: "#B3261E",
};

interface MapPreviewCardProps {
  title: string;
  caption: string;
  reports: Report[];
  selectedId?: string | null;
  pinCount?: number;
  onPinClick: (report: Report) => void;
}

export function MapPreviewCard({
  title,
  caption,
  reports,
  selectedId,
  pinCount,
  onPinClick,
}: MapPreviewCardProps) {
  const { t } = useApp();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:bg-[var(--color-surface)]">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[17px] font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-[13px] text-slate-600">{caption}</p>
          </div>
          {pinCount != null && (
            <span className="shrink-0 rounded-full bg-brand-blue-soft px-3 py-1 text-[13px] font-semibold text-brand-blue">
              {pinCount} {t("dashboard.mapPins")}
            </span>
          )}
        </div>
      </div>
      <div className="relative isolate z-0 min-h-0 flex-1 overflow-hidden">
        <LeafletMap
          reports={reports}
          selectedId={selectedId}
          onPinClick={onPinClick}
          className="h-[360px] w-full lg:h-[min(72vh,640px)]"
        />
      </div>
      <div className="flex flex-wrap gap-4 border-t border-slate-100 px-5 py-3">
        {(
          [
            ["ปกติ", t("dashboard.mapLegendNormal")],
            ["เริ่มอุดตัน", t("dashboard.mapLegendPartial")],
            ["อุดตันหนัก", t("dashboard.mapLegendSevere")],
          ] as const
        ).map(([level, label]) => (
          <span key={level} className="flex items-center gap-2 text-[13px] text-slate-600">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: PIN_COLORS[level] }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

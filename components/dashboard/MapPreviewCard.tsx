"use client";

import dynamic from "next/dynamic";
import type { Report } from "@/lib/types";
import { useApp } from "@/lib/app-context";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex min-h-[240px] items-center justify-center bg-slate-50 text-[13px] text-slate-600 dark:bg-slate-100/10">
        …
      </div>
    ),
  }
);

const LEGEND_COLORS = ["#4E5768", "#8A5A00", "#B3261E"] as const;

interface MapPreviewCardProps {
  title: string;
  caption: string;
  reports: Report[];
  selectedId?: string | null;
  pinCount?: number;
  onPinClick: (report: Report) => void;
  onViewSelectedDetail?: () => void;
}

export function MapPreviewCard({
  title,
  caption,
  reports,
  selectedId,
  pinCount,
  onPinClick,
  onViewSelectedDetail,
}: MapPreviewCardProps) {
  const { t } = useApp();
  const selectedReport = reports.find((r) => r.id === selectedId) ?? null;

  return (
    <div
      id="dashboard-map"
      className="flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:bg-[var(--color-surface)]"
    >
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[17px] font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-[13px] text-slate-600">{caption}</p>
            {selectedReport && (
              <p className="mt-2 text-[12px] font-medium text-brand-blue">
                {t("dashboard.mapSelectedHint").replace("{location}", selectedReport.location)}
                {onViewSelectedDetail && (
                  <button
                    type="button"
                    onClick={onViewSelectedDetail}
                    className="ml-2 font-semibold underline underline-offset-2 hover:text-brand-blue-dark"
                  >
                    {t("dashboard.mapViewDetail")}
                  </button>
                )}
              </p>
            )}
          </div>
          {pinCount != null && (
            <span className="shrink-0 rounded-full bg-brand-blue-soft px-3 py-1 text-[13px] font-semibold text-brand-blue">
              {pinCount} {t("dashboard.mapPins")}
            </span>
          )}
        </div>
      </div>
      <div className="relative isolate z-0 min-h-[min(42vh,360px)] flex-1 overflow-hidden lg:min-h-[280px]">
        <LeafletMap
          reports={reports}
          selectedId={selectedId}
          onPinClick={onPinClick}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="flex flex-wrap gap-4 border-t border-slate-100 px-5 py-3">
        {([
          t("dashboard.mapLegendNormal"),
          t("dashboard.mapLegendPartial"),
          t("dashboard.mapLegendSevere"),
        ] as const).map((label, idx) => (
          <span key={label} className="flex items-center gap-2 text-[13px] text-slate-600">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: LEGEND_COLORS[idx] }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

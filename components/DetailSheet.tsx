"use client";

import { useEffect } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import {
  ReportDetailContent,
  type ReportDetailLabels,
} from "@/components/ReportDetailContent";

interface DetailSheetProps {
  report: Report | null;
  onClose: () => void;
  onSave: (id: string, status: ReportStatus) => void;
  onViewOnMap?: (report: Report) => void;
  labels: ReportDetailLabels;
}

export function DetailSheet({
  report,
  onClose,
  onSave,
  onViewOnMap,
  labels,
}: DetailSheetProps) {
  useEffect(() => {
    if (!report) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [report]);

  if (!report) return null;

  function handleSave(id: string, status: ReportStatus) {
    onSave(id, status);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-end justify-center lg:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label={labels.close ?? "Close"}
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(92dvh,92vh)] w-full max-w-lg flex-col overflow-hidden rounded-t-[16px] bg-white shadow-xl dark:bg-[var(--color-surface)] lg:rounded-[16px]">
        <div className="flex justify-center px-6 pb-1 pt-3">
          <span className="h-1.5 w-14 rounded-full bg-slate-200" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-2 [touch-action:pan-y]">
          <ReportDetailContent
            report={report}
            labels={labels}
            onSave={handleSave}
            onClose={onClose}
            onViewOnMap={onViewOnMap}
            compact
          />
        </div>
      </div>
    </div>
  );
}

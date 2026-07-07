"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import {
  ReportDetailContent,
  type ReportDetailLabels,
} from "@/components/ReportDetailContent";
import { StatusActionBar } from "@/components/report/StatusActionBar";

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
  const [status, setStatus] = useState<ReportStatus>(
    report?.status ?? "รอดำเนินการ"
  );

  useEffect(() => {
    if (!report) return;
    setStatus(report.status);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [report]);

  if (!report) return null;

  function handleSave() {
    onSave(report!.id, status);
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
        <div className="flex shrink-0 justify-center px-6 pb-1 pt-3">
          <span className="h-1.5 w-14 rounded-full bg-slate-200" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-4 pt-2 [touch-action:pan-y]">
          <ReportDetailContent
            report={report}
            labels={labels}
            onSave={handleSave}
            onClose={onClose}
            onViewOnMap={onViewOnMap}
            compact
            imageVariant="panel"
            showSaveButton={false}
            showStatusSection={false}
            status={status}
            onStatusChange={setStatus}
          />
        </div>
        <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 dark:bg-[var(--color-surface)]">
          <StatusActionBar
            status={status}
            onStatusChange={setStatus}
            onSave={handleSave}
            changeStatusLabel={labels.changeStatus}
            saveLabel={labels.save}
          />
        </div>
      </div>
    </div>
  );
}

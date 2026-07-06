"use client";

import type { Report, ReportStatus } from "@/lib/types";
import {
  ReportDetailContent,
  type ReportDetailLabels,
} from "@/components/ReportDetailContent";
import { useApp } from "@/lib/app-context";

interface ReportDetailPanelProps {
  report: Report | null;
  labels: ReportDetailLabels;
  onClose: () => void;
  onSave: (id: string, status: ReportStatus) => void;
}

export function ReportDetailPanel({
  report,
  labels,
  onClose,
  onSave,
}: ReportDetailPanelProps) {
  const { t } = useApp();

  function handleSave(id: string, status: ReportStatus) {
    onSave(id, status);
  }

  if (!report) {
    return (
      <div className="rounded-[16px] border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center dark:bg-slate-100/5">
        <p className="text-[15px] font-semibold text-slate-600">
          {t("dashboard.selectReport")}
        </p>
        <p className="mt-1 text-[13px] text-slate-400">
          {t("dashboard.selectReportHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[min(40vh,360px)] overflow-y-auto rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-slate-100 dark:bg-[var(--color-surface)]">
      <ReportDetailContent
        report={report}
        labels={labels}
        onSave={handleSave}
        onClose={onClose}
        compact
      />
    </div>
  );
}

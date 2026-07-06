"use client";

import type { Report, ReportStatus } from "@/lib/types";
import {
  ReportDetailContent,
  type ReportDetailLabels,
} from "@/components/ReportDetailContent";
import { useApp } from "@/lib/app-context";
import { Card } from "@/components/ui/Card";

interface ReportDetailPanelProps {
  report: Report | null;
  labels: ReportDetailLabels;
  onClose: () => void;
  onSave: (id: string, status: ReportStatus) => void;
  onViewOnMap?: (report: Report) => void;
}

export function ReportDetailPanel({
  report,
  labels,
  onClose,
  onSave,
  onViewOnMap,
}: ReportDetailPanelProps) {
  const { t } = useApp();

  function handleSave(id: string, status: ReportStatus) {
    onSave(id, status);
  }

  if (!report) {
    return (
      <Card
        padding="lg"
        className="flex h-full min-h-[280px] items-center justify-center text-center"
      >
        <div>
          <p className="text-[15px] font-semibold text-slate-600">
            {t("dashboard.selectReport")}
          </p>
          <p className="mt-1 text-[13px] text-slate-400">
            {t("dashboard.selectReportHint")}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <Card padding="none" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto px-5 py-5">
          <ReportDetailContent
            report={report}
            labels={labels}
            onSave={handleSave}
            onClose={onClose}
            onViewOnMap={onViewOnMap}
            compact
          />
        </div>
      </Card>
    </div>
  );
}

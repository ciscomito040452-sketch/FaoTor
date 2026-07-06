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
      <Card padding="lg" className="flex min-h-[280px] items-center justify-center text-center">
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
    <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain">
      <Card padding="lg">
        <p className="mb-4 text-[15px] font-semibold text-slate-900">
          {t("dashboard.detailTitle")}
        </p>
        <ReportDetailContent
          report={report}
          labels={labels}
          onSave={handleSave}
          onClose={onClose}
          compact
        />
      </Card>
    </div>
  );
}

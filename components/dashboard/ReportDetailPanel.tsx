"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import {
  ReportDetailContent,
  type ReportDetailLabels,
} from "@/components/ReportDetailContent";
import { StatusActionBar } from "@/components/report/StatusActionBar";
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
  const [status, setStatus] = useState<ReportStatus>(
    report?.status ?? "รอดำเนินการ"
  );

  useEffect(() => {
    if (report) setStatus(report.status);
  }, [report]);

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
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto px-4 py-3.5">
          <ReportDetailContent
            report={report}
            labels={labels}
            onSave={onSave}
            onClose={onClose}
            onViewOnMap={onViewOnMap}
            compact
            layout="split"
            imageVariant="panel"
            metricsVariant="panel"
            showSaveButton={false}
            showStatusSection={false}
            status={status}
            onStatusChange={setStatus}
          />
        </div>
        <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3">
          <StatusActionBar
            status={status}
            onStatusChange={setStatus}
            onSave={() => onSave(report.id, status)}
            changeStatusLabel={labels.changeStatus}
            saveLabel={labels.save}
            compact
          />
        </div>
      </Card>
    </div>
  );
}

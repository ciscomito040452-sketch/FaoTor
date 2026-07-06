"use client";

import { useEffect, useState } from "react";
import type { Report, ReportStatus } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";
import { StatusSegmented } from "./StatusSegmented";

interface DetailSheetProps {
  report: Report | null;
  onClose: () => void;
  onSave: (id: string, status: ReportStatus) => void;
}

export function DetailSheet({ report, onClose, onSave }: DetailSheetProps) {
  const [status, setStatus] = useState<ReportStatus>("รอดำเนินการ");

  useEffect(() => {
    if (report) setStatus(report.status);
  }, [report]);

  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="ปิด"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[16px] bg-white p-6 sm:rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={report.imageUrl}
          alt={report.location}
          className="mb-4 w-full rounded-[12px] object-cover"
        />
        <p className="text-[13px] text-slate-600">ตำแหน่ง</p>
        <p className="mt-1 text-[17px] font-semibold text-slate-900">
          {report.location}
        </p>
        <div className="mt-4">
          <RiskBadge level={report.riskLevel} />
        </div>
        <p className="mt-4 text-[15px] text-slate-600">{report.reason}</p>

        <p className="mb-3 mt-6 text-[13px] text-slate-600">เปลี่ยนสถานะ</p>
        <StatusSegmented value={status} onChange={setStatus} />

        <button
          type="button"
          onClick={() => {
            onSave(report.id, status);
            onClose();
          }}
          className="mt-6 h-[50px] w-full rounded-[12px] bg-blue-500 text-[17px] font-semibold text-white hover:bg-blue-700"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

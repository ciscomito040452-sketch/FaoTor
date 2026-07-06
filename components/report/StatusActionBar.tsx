"use client";

import type { ReportStatus } from "@/lib/types";
import { StatusSegmented } from "@/components/StatusSegmented";
import { Button } from "@/components/ui/Button";

interface StatusActionBarProps {
  status: ReportStatus;
  onStatusChange: (status: ReportStatus) => void;
  onSave: () => void;
  changeStatusLabel: string;
  saveLabel: string;
}

export function StatusActionBar({
  status,
  onStatusChange,
  onSave,
  changeStatusLabel,
  saveLabel,
}: StatusActionBarProps) {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-semibold text-slate-700">{changeStatusLabel}</p>
      <StatusSegmented value={status} onChange={onStatusChange} />
      <Button variant="primary" className="w-full" onClick={onSave}>
        {saveLabel}
      </Button>
    </div>
  );
}

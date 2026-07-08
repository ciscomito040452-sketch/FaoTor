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
  showStatus?: boolean;
  compact?: boolean;
}

export function StatusActionBar({
  status,
  onStatusChange,
  onSave,
  changeStatusLabel,
  saveLabel,
  showStatus = true,
  compact = false,
}: StatusActionBarProps) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {showStatus && (
        <>
          <p
            className={`font-semibold text-slate-700 ${
              compact ? "text-[12px]" : "text-[13px]"
            }`}
          >
            {changeStatusLabel}
          </p>
          <StatusSegmented value={status} onChange={onStatusChange} />
        </>
      )}
      <Button
        variant="primary"
        className={compact ? "h-10 w-full text-[15px]" : "w-full"}
        onClick={onSave}
      >
        {saveLabel}
      </Button>
    </div>
  );
}

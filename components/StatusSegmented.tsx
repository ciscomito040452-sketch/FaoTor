"use client";

import type { ReportStatus } from "@/lib/types";
import { getStatusLabel, STATUS_OPTIONS } from "@/lib/labels";
import { useApp } from "@/lib/app-context";

interface StatusSegmentedProps {
  value: ReportStatus;
  onChange: (status: ReportStatus) => void;
}

export function StatusSegmented({ value, onChange }: StatusSegmentedProps) {
  const { locale } = useApp();

  return (
    <div className="flex rounded-[12px] bg-slate-100 p-1">
      {STATUS_OPTIONS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[44px] flex-1 rounded-[10px] px-2 text-[13px] font-semibold transition sm:text-[15px] ${
              selected
                ? "bg-white text-brand-blue shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                : "text-slate-600"
            }`}
          >
            {getStatusLabel(option, locale)}
          </button>
        );
      })}
    </div>
  );
}

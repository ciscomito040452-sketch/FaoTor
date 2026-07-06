import type { ReportStatus } from "@/lib/types";

const OPTIONS: ReportStatus[] = [
  "รอดำเนินการ",
  "กำลังแก้ไข",
  "แก้ไขแล้ว",
];

interface StatusSegmentedProps {
  value: ReportStatus;
  onChange: (status: ReportStatus) => void;
}

export function StatusSegmented({ value, onChange }: StatusSegmentedProps) {
  return (
    <div className="flex rounded-[12px] bg-slate-100 p-1">
      {OPTIONS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[44px] flex-1 rounded-[10px] px-2 text-[13px] font-semibold transition sm:text-[15px] ${
              selected
                ? "bg-white text-blue-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                : "text-slate-600"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

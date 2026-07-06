"use client";

export type Filter = "all" | "pending" | "inProgress" | "severe";

interface FilterTabsProps {
  value: Filter;
  onChange: (value: Filter) => void;
  labels: {
    all: string;
    pending: string;
    inProgress: string;
    severe: string;
  };
  counts: {
    all: number;
    pending: number;
    inProgress: number;
    severe: number;
  };
}

export function FilterTabs({ value, onChange, labels, counts }: FilterTabsProps) {
  const options: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: labels.all, count: counts.all },
    { key: "pending", label: labels.pending, count: counts.pending },
    { key: "inProgress", label: labels.inProgress, count: counts.inProgress },
    { key: "severe", label: labels.severe, count: counts.severe },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition ${
              active
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-2 py-0.5 text-[12px] ${
                active ? "bg-white/20 text-white" : "bg-white text-slate-600"
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

interface StepIndicatorProps {
  current: 1 | 2 | 3 | 4;
  labels: [string, string, string, string];
}

export function StepIndicator({ current, labels }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center gap-1 sm:gap-2">
      {labels.map((label, index) => {
        const step = (index + 1) as 1 | 2 | 3 | 4;
        const done = step < current;
        const active = step === current;

        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ${
                done || active
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {done ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M2.5 7l3 3 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            <span
              className={`text-center text-[10px] font-semibold sm:text-[11px] ${
                active ? "text-blue-500" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

"use client";

interface StepIndicatorProps {
  current: 1 | 2 | 3 | 4;
  labels: [string, string, string, string];
}

export function StepIndicator({ current, labels }: StepIndicatorProps) {
  const progress =
    labels.length > 1 ? ((current - 1) / (labels.length - 1)) * 100 : 0;

  return (
    <div className="relative mb-8 px-3 sm:px-6">
      <div
        className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px] overflow-hidden rounded-full bg-slate-200"
        aria-hidden
      >
        <div
          className="h-full rounded-full bg-brand-orange transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {labels.map((label, index) => {
          const step = (index + 1) as 1 | 2 | 3 | 4;
          const done = step < current;
          const active = step === current;

          return (
            <div
              key={label}
              className="flex w-[25%] max-w-[5.5rem] flex-col items-center gap-2"
            >
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ring-4 ring-white ${
                  done
                    ? "bg-brand-orange text-white"
                    : active
                      ? "bg-brand-blue text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
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
                className={`text-center text-[10px] font-semibold leading-tight sm:text-[11px] ${
                  active
                    ? "text-brand-blue"
                    : done
                      ? "text-brand-orange"
                      : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

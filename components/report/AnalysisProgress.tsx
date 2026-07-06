"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface AnalysisProgressProps {
  title: string;
  steps: [string, string, string];
  onComplete: () => void;
}

export function AnalysisProgress({ title, steps, onComplete }: AnalysisProgressProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setActiveStep(index);
          setProgress(((index + 1) / steps.length) * 100);
        }, index * 900)
      );
    });

    timers.push(
      setTimeout(() => {
        onComplete();
      }, steps.length * 900 + 400)
    );

    return () => timers.forEach(clearTimeout);
  }, [steps, onComplete]);

  return (
    <div className="rounded-[16px] border border-slate-100 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
      <div className="mb-6 flex items-center justify-center gap-3">
        <LoadingSpinner />
        <span className="text-[17px] font-semibold text-slate-900">{title}</span>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-3">
        {steps.map((step, index) => {
          const done = index < activeStep;
          const active = index === activeStep;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-[15px] ${
                done || active ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                  done
                    ? "bg-blue-500 text-white"
                    : active
                      ? "border-2 border-blue-500 text-blue-500"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6l2.5 2.5L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

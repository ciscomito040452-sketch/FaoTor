"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { springTransition, useReducedMotion } from "@/lib/motion";

interface AnalysisProgressProps {
  title: string;
  steps: [string, string, string];
  onComplete: () => void;
}

export function AnalysisProgress({ title, steps, onComplete }: AnalysisProgressProps) {
  const reduced = useReducedMotion();
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
    <div className="animate-scale-in rounded-[16px] border border-slate-100 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-[var(--color-surface)]">
      <div className="mb-6 flex items-center justify-center gap-3">
        <LoadingSpinner />
        <span className="text-[17px] font-semibold text-slate-900">{title}</span>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-blue"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <ul className="space-y-3">
        {steps.map((step, index) => {
          const done = index < activeStep;
          const active = index === activeStep;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-[15px] transition-colors duration-300 ${
                done || active ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <motion.span
                animate={
                  done
                    ? { scale: [0, 1.2, 1] }
                    : active
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                }
                transition={springTransition(reduced)}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                  done
                    ? "bg-brand-blue text-white"
                    : active
                      ? "border-2 border-brand-blue text-brand-blue ring-2 ring-brand-blue/20"
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
              </motion.span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

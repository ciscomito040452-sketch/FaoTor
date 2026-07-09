"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

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
  const reduced = useReducedMotion();
  const options: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: labels.all, count: counts.all },
    { key: "pending", label: labels.pending, count: counts.pending },
    { key: "inProgress", label: labels.inProgress, count: counts.inProgress },
    { key: "severe", label: labels.severe, count: counts.severe },
  ];

  return (
    <div className="relative mb-4 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.key;
        const severeActive = active && option.key === "severe";
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`relative inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-colors ${
              active
                ? severeActive
                  ? "text-white"
                  : "text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {active && !reduced && (
              <motion.span
                layoutId="filter-pill"
                className={`absolute inset-0 rounded-full ${
                  severeActive ? "bg-rose-600" : "bg-brand-blue"
                }`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {active && reduced && (
              <span
                className={`absolute inset-0 rounded-full ${
                  severeActive ? "bg-rose-600" : "bg-brand-blue"
                }`}
              />
            )}
            <span className="relative">{option.label}</span>
            <span
              className={`relative rounded-full px-2 py-0.5 text-[12px] ${
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

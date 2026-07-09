"use client";

import type { ReportStatus } from "@/lib/types";
import { motion } from "framer-motion";
import { getStatusLabel, STATUS_OPTIONS } from "@/lib/labels";
import { useApp } from "@/lib/app-context";
import { springTransition, useReducedMotion } from "@/lib/motion";

interface StatusSegmentedProps {
  value: ReportStatus;
  onChange: (status: ReportStatus) => void;
}

export function StatusSegmented({ value, onChange }: StatusSegmentedProps) {
  const { locale } = useApp();
  const reduced = useReducedMotion();

  return (
    <div className="relative flex rounded-[12px] bg-slate-100 p-1">
      {STATUS_OPTIONS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`relative min-h-[40px] flex-1 whitespace-nowrap rounded-[10px] px-1.5 text-[12px] font-semibold leading-none xl:min-h-[44px] xl:px-2 xl:text-[13px] ${
              selected ? "text-brand-blue" : "text-slate-600"
            }`}
          >
            {selected && !reduced && (
              <motion.span
                layoutId="status-segment-pill"
                className="absolute inset-0 rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                transition={springTransition(reduced)}
              />
            )}
            {selected && reduced && (
              <span className="absolute inset-0 rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]" />
            )}
            <motion.span
              className="relative"
              whileTap={reduced ? undefined : { scale: 0.97 }}
            >
              {getStatusLabel(option, locale)}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}

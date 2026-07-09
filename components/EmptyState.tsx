"use client";

import { motion } from "framer-motion";
import { ShieldDropletIcon } from "./ShieldDropletIcon";
import { useApp } from "@/lib/app-context";
import { motionTransition, useReducedMotion } from "@/lib/motion";

interface EmptyStateProps {
  title?: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  hint,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { t } = useApp();
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTransition(reduced)}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={
          reduced
            ? undefined
            : { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }
        className="mb-4"
      >
        <ShieldDropletIcon className="h-12 w-12 text-slate-400" />
      </motion.div>
      <p className="text-[17px] font-semibold text-slate-600">
        {title ?? t("dashboard.empty")}
      </p>
      <p className="mt-2 max-w-xs text-[17px] text-slate-600">
        {hint ?? t("dashboard.emptyHint")}
      </p>
      {actionLabel && onAction && (
        <motion.button
          type="button"
          onClick={onAction}
          whileTap={reduced ? undefined : { scale: 0.97 }}
          className="mt-4 text-[15px] font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/app-context";
import { motionTransition, toastVariants, useReducedMotion } from "@/lib/motion";

const variantStyles = {
  default:
    "bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900",
  success:
    "bg-emerald-700/95 text-white",
  error:
    "bg-risk-red-text/95 text-white",
};

export function Toast() {
  const { toast, dismissToast } = useApp();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          className="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-3rem)] max-w-md -translate-x-1/2 lg:bottom-8"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          transition={motionTransition(reduced)}
        >
          <button
            type="button"
            onClick={dismissToast}
            className={`flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-center text-[15px] font-semibold shadow-lg backdrop-blur-md ${variantStyles[toast.variant]}`}
          >
            {toast.variant === "success" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 9l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            {toast.message}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

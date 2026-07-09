"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  backdropVariants,
  sheetPanelVariants,
  springTransition,
  useReducedMotion,
} from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";

interface AnimatedSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  align?: "bottom" | "center";
  closeLabel?: string;
}

export function AnimatedSheet({
  open,
  onClose,
  children,
  className = "",
  panelClassName = "",
  align = "bottom",
  closeLabel = "Close",
}: AnimatedSheetProps) {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const mobile = align === "bottom" && isMobile;

  return (
    <AnimatePresence>
      {open && (
        <div
          className={`fixed inset-0 z-[1200] flex ${
            mobile ? "items-end justify-center" : "items-center justify-center"
          } ${className}`}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={closeLabel}
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springTransition(reduced)}
          />
          <motion.div
            className={`relative z-10 ${panelClassName}`}
            variants={sheetPanelVariants(mobile)}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springTransition(reduced)}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUpVariants, motionTransition, useReducedMotion } from "@/lib/motion";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onDismiss, 220);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeUpVariants}
          transition={motionTransition(reduced)}
          className="animate-shake rounded-[12px] bg-risk-red-bg px-4 py-3 text-[15px] text-risk-red-text"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

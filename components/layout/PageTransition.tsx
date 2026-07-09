"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { pageVariants, useReducedMotion } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        transition={reduced ? { duration: 0 } : undefined}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

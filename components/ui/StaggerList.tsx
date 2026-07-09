"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  listItemVariants,
  motionTransition,
  popLayoutTransition,
  staggerChildren,
  useReducedMotion,
} from "@/lib/motion";

interface StaggerListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  mode?: "sync" | "wait" | "popLayout";
}

export function StaggerList<T>({
  items,
  getKey,
  renderItem,
  className = "",
  mode = "popLayout",
}: StaggerListProps<T>) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <AnimatePresence mode={mode}>
        {items.map((item, index) => (
          <motion.div
            key={getKey(item)}
            layout
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              ...popLayoutTransition(reduced),
              ...staggerChildren(Math.min(index, 19)),
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function StaggerReveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...motionTransition(reduced),
        ...staggerChildren(index),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

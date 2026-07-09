"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUpVariants, motionTransition, staggerChildren, useReducedMotion } from "@/lib/motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  index?: number;
}

export function FadeIn({
  children,
  index = 0,
  className,
  ...props
}: FadeInProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeUpVariants}
      transition={{
        ...motionTransition(reduced),
        ...staggerChildren(index),
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

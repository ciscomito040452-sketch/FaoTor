"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

export const MOTION = {
  spring: { type: "spring", stiffness: 420, damping: 32 } satisfies Transition,
  tween: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } satisfies Transition,
  stagger: 0.06,
} as const;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function staggerChildren(index: number, base = MOTION.stagger) {
  return { delay: Math.min(index, 20) * base };
}

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const sheetPanelVariants = (mobile: boolean): Variants => ({
  hidden: mobile
    ? { y: "100%", opacity: 1 }
    : { scale: 0.96, opacity: 0, y: 8 },
  visible: mobile
    ? { y: 0, opacity: 1 }
    : { scale: 1, opacity: 1, y: 0 },
  exit: mobile
    ? { y: "100%", opacity: 1 }
    : { scale: 0.96, opacity: 0, y: 8 },
});

export const toastVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export const scaleFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export function motionTransition(reduced: boolean): Transition {
  return reduced ? { duration: 0 } : MOTION.tween;
}

export function springTransition(reduced: boolean): Transition {
  return reduced ? { duration: 0 } : MOTION.spring;
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
};

export function popLayoutTransition(reduced: boolean): Transition {
  return reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 500, damping: 38 };
}

export const pageEnterTransition = (reduced: boolean): Transition =>
  reduced
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] };

export const pageExitTransition = (reduced: boolean): Transition =>
  reduced ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 1, 1] };

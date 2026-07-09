"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "orange";

interface MotionButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-md",
  secondary:
    "border-2 border-brand-orange text-brand-orange bg-white hover:bg-brand-orange-soft",
  orange:
    "bg-brand-orange text-white hover:bg-brand-orange-dark hover:shadow-md",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100",
};

export function MotionButton({
  variant = "primary",
  className = "",
  children,
  disabled,
  onClick,
  type = "button",
}: MotionButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={reduced ? undefined : { y: -1, scale: 1.01 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-[12px] px-5 text-[15px] font-semibold transition-shadow disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

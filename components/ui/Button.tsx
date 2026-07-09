import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "orange";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
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

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`pressable inline-flex min-h-[48px] items-center justify-center rounded-[12px] px-5 text-[15px] font-semibold transition-shadow disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  variant?: "default" | "danger" | "warning";
  active?: boolean;
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  variant = "default",
  active = false,
  onClick,
}: StatCardProps) {
  const accent =
    variant === "danger" && value > 0
      ? "border-l-[3px] border-l-risk-red-text"
      : variant === "warning" && value > 0
        ? "border-l-[3px] border-l-brand-orange"
        : "";

  const className = `rounded-[16px] border border-slate-100 bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-slate-200 lg:p-5 dark:bg-[var(--color-surface)] ${accent} ${
    active ? "ring-2 ring-brand-blue ring-offset-1" : ""
  }`;

  const content = (
    <>
      <p className="text-[13px] text-slate-600">{label}</p>
      <p className="mt-1 text-[26px] font-semibold leading-[1.35] text-slate-900 lg:mt-2 lg:text-[28px]">
        {value}
      </p>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`w-full ${className}`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

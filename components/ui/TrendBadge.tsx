interface TrendBadgeProps {
  value: number;
  label?: string;
}

export function TrendBadge({ value, label }: TrendBadgeProps) {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-semibold ${
        positive
          ? "bg-brand-orange-soft text-brand-orange"
          : "bg-brand-blue-soft text-brand-blue"
      }`}
    >
      {positive ? "+" : ""}
      {value.toFixed(1)}%
      {label && <span className="ml-1 font-normal text-slate-600">{label}</span>}
    </span>
  );
}

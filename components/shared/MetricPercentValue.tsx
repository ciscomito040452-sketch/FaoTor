interface MetricPercentValueProps {
  value: number;
  className?: string;
  size?: "sm" | "lg";
  align?: "left" | "right" | "center";
}

/** Percent value — shared formatting for list cards and detail bento */
export function MetricPercentValue({
  value,
  className = "",
  size = "sm",
  align = "right",
}: MetricPercentValueProps) {
  const numClass = size === "lg" ? "text-[24px]" : "text-[15px]";
  const pctClass = size === "lg" ? "text-[13px]" : "text-[10px]";
  const widthClass = size === "lg" ? "w-full" : "w-[3.25rem]";
  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "center"
        ? "justify-center"
        : "justify-end";

  return (
    <span
      className={`inline-flex ${widthClass} shrink-0 items-baseline ${justifyClass} tabular-nums`}
    >
      <span
        className={`${numClass} font-bold leading-none ${className || "text-slate-900"}`}
      >
        {value}
      </span>
      <span className={`${pctClass} font-semibold leading-none text-slate-500`}>
        %
      </span>
    </span>
  );
}

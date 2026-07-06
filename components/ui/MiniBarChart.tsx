interface MiniBarChartProps {
  values: number[];
  height?: number;
  className?: string;
  variant?: "default" | "severe";
}

export function MiniBarChart({
  values,
  height = 48,
  className = "",
  variant = "default",
}: MiniBarChartProps) {
  const max = Math.max(...values, 1);
  const width = values.length * 12;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      {values.map((v, i) => {
        const barH = (v / max) * (height - 4);
        const color =
          variant === "severe"
            ? "#F97316"
            : i % 2 === 0
              ? "#3B82F6"
              : "#93C5FD";
        return (
          <rect
            key={i}
            x={i * 12 + 1}
            y={height - barH}
            width={8}
            height={barH}
            rx={2}
            fill={color}
            opacity={0.85}
          />
        );
      })}
    </svg>
  );
}

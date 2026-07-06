interface MiniBarChartProps {
  values: number[];
  height?: number;
  className?: string;
}

export function MiniBarChart({
  values,
  height = 48,
  className = "",
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
        const color = i % 2 === 0 ? "#3B82F6" : "#F97316";
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

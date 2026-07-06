import type { RiskLevel } from "@/lib/types";

const COLORS: Record<RiskLevel, string> = {
  ปกติ: "text-slate-600",
  เริ่มอุดตัน: "text-brand-orange",
  อุดตันหนัก: "text-risk-red-text",
};

interface RiskScoreProps {
  score: number;
  level: RiskLevel;
  label?: string;
  size?: "md" | "lg";
}

export function RiskScore({ score, level, label, size = "md" }: RiskScoreProps) {
  return (
    <div>
      {label && (
        <p className="mb-1 text-[13px] text-slate-600">{label}</p>
      )}
      <p
        className={`font-semibold leading-[1.35] ${COLORS[level]} ${
          size === "lg" ? "text-[48px]" : "text-[28px]"
        }`}
      >
        {score}
      </p>
    </div>
  );
}

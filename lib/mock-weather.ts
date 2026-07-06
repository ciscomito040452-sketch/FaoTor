import type { RainForecast } from "./types";

export const DEFAULT_RAIN_FORECAST = "ปานกลาง" as const satisfies RainForecast;

export function resolveRainForecast(rain?: RainForecast): RainForecast {
  return rain ?? DEFAULT_RAIN_FORECAST;
}

/** จำลองพยากรณ์ฝน — คืนค่าสุ่มแบบมีน้ำหนัก */
export function getRainForecast(): RainForecast {
  const roll = Math.random();
  if (roll < 0.35) return "สูง";
  if (roll < 0.7) return "ปานกลาง";
  return "ต่ำ";
}

/** โบนัสคะแนนจากระดับฝน — ใช้แสดงใน UI ว่า urgency รวมข้อมูล Weather API */
export function getRainBonus(rain: RainForecast): number {
  if (rain === "สูง") return 25;
  if (rain === "ปานกลาง") return 12;
  return 0;
}

/** คำนวณคะแนนความเร่งด่วน mock จาก risk + ฝน */
export function computeUrgencyScore(
  riskScore: number,
  rain: RainForecast
): number {
  return Math.min(100, Math.round(riskScore * 0.75 + getRainBonus(rain)));
}

import type { RainForecast } from "./types";

/** จำลองพยากรณ์ฝน — คืนค่าสุ่มแบบมีน้ำหนัก */
export function getRainForecast(): RainForecast {
  const roll = Math.random();
  if (roll < 0.35) return "สูง";
  if (roll < 0.7) return "ปานกลาง";
  return "ต่ำ";
}

/** คำนวณคะแนนความเร่งด่วน mock จาก risk + ฝน */
export function computeUrgencyScore(
  riskScore: number,
  rain: RainForecast
): number {
  const rainBonus = rain === "สูง" ? 25 : rain === "ปานกลาง" ? 12 : 0;
  return Math.min(100, Math.round(riskScore * 0.75 + rainBonus));
}

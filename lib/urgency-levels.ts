/** ระดับความเร่งด่วนจากคะแนน 0–100 (แสดงเป็น %)
 *  ≥70 เร่งด่วนมาก · 40–69 ปานกลาง · <40 ปกติ
 */
export type UrgencyTier = "high" | "medium" | "low";

export function getUrgencyTier(score: number): UrgencyTier {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

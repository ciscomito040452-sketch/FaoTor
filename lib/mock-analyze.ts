import type { AnalyzeResult, RiskLevel } from "./types";

const ANALYSIS_POOL: AnalyzeResult[] = [
  {
    riskLevel: "อุดตันหนัก",
    riskScore: 89,
    reason:
      "พบขยะสะสมหนาแน่นบริเวณตะแกรงรับน้ำ มีใบไม้และถุงพลาสติกอุดตัน ควรลอกท่อโดยเร็ว",
  },
  {
    riskLevel: "เริ่มอุดตัน",
    riskScore: 62,
    reason:
      "มีตะกอนใบไม้และคราบสกปรกเริ่มสะสม ยังระบายน้ำได้แต่ควรติดตามและลอกท่อในระยะใกล้",
  },
  {
    riskLevel: "ปกติ",
    riskScore: 18,
    reason:
      "ท่อระบายน้ำสะอาด ไม่พบสิ่งกีดขวางที่เห็นได้ชัด สภาพอยู่ในเกณฑ์ปกติ",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** จำลอง Gemini Vision — หน่วง 2-3 วินาที แล้วสุ่มผลวิเคราะห์ */
export async function mockAnalyzeImage(
  _imageDataUrl: string
): Promise<AnalyzeResult> {
  await delay(2000 + Math.random() * 1500);

  // สุ่มแบบมีน้ำหนัก — demo มักได้ระดับกลางถึงสูง
  const weights = [0.2, 0.45, 0.35];
  const roll = Math.random();
  let index = 0;
  if (roll < weights[0]) index = 2;
  else if (roll < weights[0] + weights[1]) index = 1;
  else index = 0;

  return ANALYSIS_POOL[index];
}

export function riskLevelToScore(level: RiskLevel): number {
  switch (level) {
    case "อุดตันหนัก":
      return 85 + Math.floor(Math.random() * 15);
    case "เริ่มอุดตัน":
      return 45 + Math.floor(Math.random() * 25);
    case "ปกติ":
      return 5 + Math.floor(Math.random() * 25);
  }
}

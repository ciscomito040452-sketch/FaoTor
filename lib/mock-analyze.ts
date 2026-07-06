import type { AnalyzeResult, RiskLevel } from "./types";
import { computeUrgencyScore, getRainForecast } from "./mock-weather";

const ANALYSIS_POOL: Record<
  RiskLevel,
  { riskScore: number; reason: string }
> = {
  อุดตันหนัก: {
    riskScore: 89,
    reason:
      "พบขยะสะสมหนาแน่นบริเวณตะแกรงรับน้ำ มีใบไม้และถุงพลาสติกอุดตัน ควรลอกท่อโดยเร็ว",
  },
  เริ่มอุดตัน: {
    riskScore: 62,
    reason:
      "มีตะกอนใบไม้และคราบสกปรกเริ่มสะสม ยังระบายน้ำได้แต่ควรติดตามและลอกท่อในระยะใกล้",
  },
  ปกติ: {
    riskScore: 18,
    reason:
      "ท่อระบายน้ำสะอาด ไม่พบสิ่งกีดขวางที่เห็นได้ชัด สภาพอยู่ในเกณฑ์ปกติ",
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Heuristic จากขนาด base64 หรือ path รูปตัวอย่าง */
function imageBias(imageDataUrl: string): number {
  if (imageDataUrl.includes("drain-severe")) return 0.5;
  if (imageDataUrl.includes("drain-partial")) return 0.15;
  if (imageDataUrl.includes("drain-normal")) return -0.4;

  const len = imageDataUrl.length;
  if (len > 800_000) return 0.35;
  if (len > 400_000) return 0.2;
  if (len > 150_000) return 0.05;
  return -0.15;
}

function pickLevel(bias: number): RiskLevel {
  const roll = Math.random() + bias;
  if (roll < 0.25) return "ปกติ";
  if (roll < 0.6) return "เริ่มอุดตัน";
  return "อุดตันหนัก";
}

export async function mockAnalyzeImage(
  imageDataUrl: string
): Promise<AnalyzeResult> {
  await delay(2000 + Math.random() * 1500);

  const bias = imageBias(imageDataUrl);
  const riskLevel = pickLevel(bias);
  const base = ANALYSIS_POOL[riskLevel];
  const variance = Math.floor(Math.random() * 8) - 4;
  const riskScore = Math.min(
    100,
    Math.max(5, base.riskScore + variance + Math.round(bias * 20))
  );
  const rainForecast = getRainForecast();
  const urgencyScore = computeUrgencyScore(riskScore, rainForecast);

  return {
    riskLevel,
    riskScore,
    urgencyScore,
    rainForecast,
    reason: base.reason,
  };
}

export type RiskLevel = "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก";

export type ReportStatus = "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว";

export type RainForecast = "สูง" | "ปานกลาง" | "ต่ำ";

export interface Report {
  id: string;
  imageUrl: string;
  location: string;
  district?: string;
  lat?: number;
  lng?: number;
  /** @deprecated ใช้ lat/lng แทน — รองรับข้อมูลเก่าใน localStorage */
  mapX?: number;
  mapY?: number;
  riskLevel: RiskLevel;
  riskScore: number;
  urgencyScore?: number;
  rainForecast?: RainForecast;
  rainChancePercent?: number;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface AnalyzeResult {
  riskLevel: RiskLevel;
  riskScore: number;
  urgencyScore: number;
  rainForecast: RainForecast;
  rainChancePercent?: number;
  reason: string;
}

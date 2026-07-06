export type RiskLevel = "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก";

export type ReportStatus = "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว";

export interface Report {
  id: string;
  imageUrl: string;
  location: string;
  riskLevel: RiskLevel;
  riskScore: number;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface AnalyzeResult {
  riskLevel: RiskLevel;
  riskScore: number;
  reason: string;
}

import { sampleImageForRisk } from "./sample-images";
import { computeUrgencyScore } from "./mock-weather";
import type { Report } from "./types";

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function seed(
  partial: Omit<Report, "urgencyScore" | "imageUrl"> & {
    urgencyScore?: number;
    imageUrl?: string;
  }
): Report {
  const rain = partial.rainForecast ?? "ปานกลาง";
  return {
    ...partial,
    imageUrl: partial.imageUrl ?? sampleImageForRisk(partial.riskLevel),
    urgencyScore:
      partial.urgencyScore ?? computeUrgencyScore(partial.riskScore, rain),
  };
}

export const SEED_REPORTS: Report[] = [
  seed({
    id: "seed-1",
    location: "ซอยลาดพร้าว 42",
    district: "วังทองหลาง",
    lat: 13.8167,
    lng: 100.5989,
    riskLevel: "อุดตันหนัก",
    riskScore: 91,
    rainForecast: "สูง",
    reason: "พบขยะสะสมหนาแน่นบริเวณตะแกรงรับน้ำ มีใบไม้และถุงพลาสติกอุดตัน ควรลอกท่อโดยเร็ว",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(1),
  }),
  seed({
    id: "seed-2",
    location: "หมู่บ้านสุขใจ ซอย 3",
    district: "บางกะปิ",
    lat: 13.6671,
    lng: 100.6431,
    riskLevel: "อุดตันหนัก",
    riskScore: 86,
    rainForecast: "สูง",
    reason: "ตะแกรงท่อถูกปิดบังด้วยขยะอินทรีย์และคราบตะกอน ระบายน้ำได้ช้ามาก",
    status: "กำลังแก้ไข",
    createdAt: hoursAgo(3),
  }),
  seed({
    id: "seed-3",
    location: "ถนนพหลโยธิน กม.8",
    district: "หลักสี่",
    lat: 13.8942,
    lng: 100.5677,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 62,
    rainForecast: "ปานกลาง",
    reason: "มีตะกอนใบไม้และคราบสกปรกเริ่มสะสม ยังระบายน้ำได้แต่ควรติดตาม",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(5),
  }),
  seed({
    id: "seed-4",
    location: "ซอยรามคำแหง 24",
    district: "หัวหมาก",
    lat: 13.7563,
    lng: 100.6419,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 55,
    rainForecast: "ปานกลาง",
    reason: "พบใบไม้และเศษพลาสติกสะสมบางส่วน ยังไม่กระทบการระบายน้ำมาก",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(8),
  }),
  seed({
    id: "seed-5",
    location: "ชุมชนคลองแสนแสบ แยก 7",
    district: "ห้วยขวาง",
    lat: 13.7792,
    lng: 100.5882,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 48,
    rainForecast: "ต่ำ",
    reason: "มีคราบตะกอนเริ่มเกาะตามรางระบายน้ำ แนะนำตรวจซ้ำหลังฝนตก",
    status: "กำลังแก้ไข",
    createdAt: hoursAgo(12),
  }),
  seed({
    id: "seed-6",
    location: "ซอยอ่อนนุช 46",
    district: "สวนหลวง",
    lat: 13.7192,
    lng: 100.6489,
    riskLevel: "ปกติ",
    riskScore: 18,
    rainForecast: "ต่ำ",
    reason: "ท่อระบายน้ำสะอาด ไม่พบสิ่งกีดขวางที่เห็นได้ชัด",
    status: "แก้ไขแล้ว",
    createdAt: hoursAgo(20),
  }),
  seed({
    id: "seed-7",
    location: "ตลาดนัดจตุจักร โซน B",
    district: "จตุจักร",
    lat: 13.7998,
    lng: 100.5501,
    riskLevel: "อุดตันหนัก",
    riskScore: 88,
    rainForecast: "สูง",
    reason: "ขยะจากตลาดสะสมบริเวณท่อระบายน้ำหลัก มีความเสี่ยงน้ำท่วมขังเมื่อฝนตกหนัก",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(26),
  }),
  seed({
    id: "seed-8",
    location: "หมู่บ้านเพอร์เฟค พาร์ค ซอย 2",
    district: "บางนา",
    lat: 13.6684,
    lng: 100.6097,
    riskLevel: "ปกติ",
    riskScore: 12,
    rainForecast: "ต่ำ",
    reason: "สภาพท่อปกติ ไม่พบสิ่งกีดขวาง",
    status: "แก้ไขแล้ว",
    createdAt: hoursAgo(36),
  }),
  seed({
    id: "seed-9",
    location: "ซอยสุขุมวิท 71",
    district: "วัฒนา",
    lat: 13.7056,
    lng: 100.5867,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 51,
    rainForecast: "ปานกลาง",
    reason: "พบใบไม้แห้งและดินตะกอนบางส่วน ควรลอกท่อในระยะใกล้",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(48),
  }),
  seed({
    id: "seed-10",
    location: "ชุมชนคลองเตย ซอย 12",
    district: "คลองเตย",
    lat: 13.7225,
    lng: 100.5665,
    riskLevel: "อุดตันหนัก",
    riskScore: 84,
    rainForecast: "สูง",
    reason: "ขยะพลาสติกและถุงอุดตันท่อหลัก น้ำขังเป็นประจำทุกฤดูฝน",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(72),
  }),
];

export const MOCK_MODE = true;

export const SAMPLE_IMAGES = [
  "/samples/drain-severe.svg",
  "/samples/drain-partial.svg",
  "/samples/drain-normal.svg",
] as const;

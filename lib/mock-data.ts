import { sampleImageForRisk } from "./sample-images";
import type { Report } from "./types";

function daysAgo(days: number, hour = 10): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function seed(
  partial: Omit<Report, "imageUrl"> & {
    imageUrl?: string;
  }
): Report {
  return {
    ...partial,
    imageUrl: partial.imageUrl ?? sampleImageForRisk(partial.riskLevel),
  };
}

/**
 * Seed dates span 14 days so KPI trends compare real baselines.
 * Scores are varied per report (risk / rain % / urgency) for believable demo data.
 * Snapshot: total 10 · pending 4 · severe 4 · resolved 2 · in progress 4
 */
export const SEED_REPORTS: Report[] = [
  // Previous window (days 7–13 ago)
  seed({
    id: "seed-2",
    location: "หมู่บ้านสุขใจ ซอย 3",
    district: "บางกะปิ",
    lat: 13.6671,
    lng: 100.6431,
    riskLevel: "อุดตันหนัก",
    riskScore: 76,
    urgencyScore: 82,
    rainForecast: "สูง",
    rainChancePercent: 74,
    reason: "ตะแกรงท่อถูกปิดบังด้วยขยะอินทรีย์และคราบตะกอน ระบายน้ำได้ช้ามาก",
    status: "กำลังแก้ไข",
    createdAt: daysAgo(13),
  }),
  seed({
    id: "seed-8",
    location: "หมู่บ้านเพอร์เฟค พาร์ค ซอย 2",
    district: "บางนา",
    lat: 13.6684,
    lng: 100.6097,
    riskLevel: "ปกติ",
    riskScore: 11,
    urgencyScore: 8,
    rainForecast: "ต่ำ",
    rainChancePercent: 18,
    reason: "สภาพท่อปกติ ไม่พบสิ่งกีดขวาง",
    status: "แก้ไขแล้ว",
    createdAt: daysAgo(12),
  }),
  seed({
    id: "seed-10",
    location: "ชุมชนคลองเตย ซอย 12",
    district: "คลองเตย",
    lat: 13.7225,
    lng: 100.5665,
    riskLevel: "อุดตันหนัก",
    riskScore: 83,
    urgencyScore: 87,
    rainForecast: "สูง",
    rainChancePercent: 82,
    reason: "ขยะพลาสติกและถุงอุดตันท่อหลัก น้ำขังเป็นประจำทุกฤดูฝน",
    status: "รอดำเนินการ",
    createdAt: daysAgo(10),
  }),
  seed({
    id: "seed-3",
    location: "ถนนพหลโยธิน กม.8",
    district: "หลักสี่",
    lat: 13.8942,
    lng: 100.5677,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 64,
    urgencyScore: 60,
    rainForecast: "ปานกลาง",
    rainChancePercent: 52,
    reason: "มีตะกอนใบไม้และคราบสกปรกเริ่มสะสม ยังระบายน้ำได้แต่ควรติดตาม",
    status: "รอดำเนินการ",
    createdAt: daysAgo(9),
  }),
  // Current window (days 0–6 ago)
  seed({
    id: "seed-6",
    location: "ซอยอ่อนนุช 46",
    district: "สวนหลวง",
    lat: 13.7192,
    lng: 100.6489,
    riskLevel: "ปกติ",
    riskScore: 19,
    urgencyScore: 14,
    rainForecast: "ต่ำ",
    rainChancePercent: 22,
    reason: "ท่อระบายน้ำสะอาด ไม่พบสิ่งกีดขวางที่เห็นได้ชัด",
    status: "แก้ไขแล้ว",
    createdAt: daysAgo(6),
  }),
  seed({
    id: "seed-7",
    location: "ตลาดนัดจตุจักร โซน B",
    district: "จตุจักร",
    lat: 13.7998,
    lng: 100.5501,
    riskLevel: "อุดตันหนัก",
    riskScore: 87,
    urgencyScore: 89,
    rainForecast: "สูง",
    rainChancePercent: 79,
    reason: "ขยะจากตลาดสะสมบริเวณท่อระบายน้ำหลัก มีความเสี่ยงน้ำท่วมขังเมื่อฝนตกหนัก",
    status: "รอดำเนินการ",
    createdAt: daysAgo(5),
  }),
  seed({
    id: "seed-9",
    location: "ซอยสุขุมวิท 71",
    district: "วัฒนา",
    lat: 13.7056,
    lng: 100.5867,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 49,
    urgencyScore: 49,
    rainForecast: "ปานกลาง",
    rainChancePercent: 41,
    reason: "พบใบไม้แห้งและดินตะกอนบางส่วน ควรลอกท่อในระยะใกล้",
    status: "กำลังแก้ไข",
    createdAt: daysAgo(4),
  }),
  seed({
    id: "seed-4",
    location: "ซอยรามคำแหง 24",
    district: "หัวหมาก",
    lat: 13.7563,
    lng: 100.6419,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 57,
    urgencyScore: 55,
    rainForecast: "ปานกลาง",
    rainChancePercent: 48,
    reason: "พบใบไม้และเศษพลาสติกสะสมบางส่วน ยังไม่กระทบการระบายน้ำมาก",
    status: "กำลังแก้ไข",
    createdAt: daysAgo(3),
  }),
  seed({
    id: "seed-5",
    location: "ชุมชนคลองแสนแสบ แยก 7",
    district: "ห้วยขวาง",
    lat: 13.7792,
    lng: 100.5882,
    riskLevel: "เริ่มอุดตัน",
    riskScore: 44,
    urgencyScore: 33,
    rainForecast: "ต่ำ",
    rainChancePercent: 28,
    reason: "มีคราบตะกอนเริ่มเกาะตามรางระบายน้ำ แนะนำตรวจซ้ำหลังฝนตก",
    status: "กำลังแก้ไข",
    createdAt: daysAgo(2),
  }),
  seed({
    id: "seed-1",
    location: "ซอยลาดพร้าว 42",
    district: "วังทองหลาง",
    lat: 13.8167,
    lng: 100.5989,
    riskLevel: "อุดตันหนัก",
    riskScore: 91,
    urgencyScore: 93,
    rainForecast: "สูง",
    rainChancePercent: 88,
    reason: "พบขยะสะสมหนาแน่นบริเวณตะแกรงรับน้ำ มีใบไม้และถุงพลาสติกอุดตัน ควรลอกท่อโดยเร็ว",
    status: "รอดำเนินการ",
    createdAt: daysAgo(1),
  }),
];

export const MOCK_MODE = true;

export const SAMPLE_IMAGES = [
  "/samples/drain-severe.svg",
  "/samples/drain-partial.svg",
  "/samples/drain-normal.svg",
] as const;

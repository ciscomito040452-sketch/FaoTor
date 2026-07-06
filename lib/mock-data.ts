import type { Report } from "./types";

// รูป placeholder สำหรับ seed data — ใช้ gradient แทนรูปจริง
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1621451537827-643fa430553c?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop",
];

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export const SEED_REPORTS: Report[] = [
  {
    id: "seed-1",
    imageUrl: PLACEHOLDER_IMAGES[0],
    location: "ซอยลาดพร้าว 42",
    riskLevel: "อุดตันหนัก",
    riskScore: 87,
    reason: "พบขยะสะสมหนาแน่นบริเวณตะแกรงรับน้ำ มีใบไม้และถุงพลาสติกอุดตัน",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(2),
  },
  {
    id: "seed-2",
    imageUrl: PLACEHOLDER_IMAGES[1],
    location: "หมู่บ้านสุขใจ ซอย 3",
    riskLevel: "เริ่มอุดตัน",
    riskScore: 58,
    reason: "มีตะกอนใบไม้และคราบสกปรกเริ่มสะสม ยังระบายน้ำได้แต่ควรติดตาม",
    status: "รอดำเนินการ",
    createdAt: hoursAgo(5),
  },
  {
    id: "seed-3",
    imageUrl: PLACEHOLDER_IMAGES[2],
    location: "ถนนพหลโยธิน กม.8",
    riskLevel: "ปกติ",
    riskScore: 15,
    reason: "ท่อระบายน้ำสะอาด ไม่พบสิ่งกีดขวางที่เห็นได้ชัด",
    status: "แก้ไขแล้ว",
    createdAt: hoursAgo(24),
  },
];

export const MOCK_MODE = true;

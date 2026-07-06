# MOCKUP_SCOPE.md — ขอบเขต Mock-up Demo (v3)

**สถานะปัจจุบัน:** โปรเจกต์อยู่ในโหมด **Mock-up v3 (KARO UI)** สำหรับอัดวิดีโอส่งรอบคัดเลือก ไม่ใช่ Full Stack จริง

อ่านไฟล์นี้ก่อน `TASKS.md` และ `TECH_STACK.md` เมื่อทำงานในโหมด Mock-up

---

## เป้าหมาย

สร้าง **Prototype pitch-ready** ที่ดูและใช้งานได้เหมือนแอปจริง — พอสำหรับ:

1. อัดวิดีโอ demo ครบ story (ปัญหา → รายงาน → AI → เจ้าหน้าที่ → Phase 2 roadmap)
2. Deploy บน Vercel โดยไม่ต้องตั้ง env
3. Pitch ว่า "Phase 2 จะเชื่อม AI/DB จริง"

---

## ทำ (In Scope) — v3

| หมวด | รายละเอียด |
|------|-----------|
| UI หลัก | `/`, `/report`, `/dashboard`, `/about`, `/line` |
| Design System | KARO-inspired v3 — ฟ้า-ส้ม, bento grid, top nav |
| Mini charts | SVG inline ใน KPI (ไม่ใช้ chart library) |
| แผนที่ | Leaflet + OpenStreetMap (mock) |
| Flow ครบ | อัปโหลด → AI mock → Dashboard → เปลี่ยนสถานะ |
| ข้อมูลจำลอง | Seed 10+ รายการ + localStorage + reset |
| i18n | TH/EN ครบ |
| Responsive | Top nav desktop; bottom nav mobile |

## Responsive Rules (v3)

| Breakpoint | พฤติกรรม |
|------------|----------|
| Mobile `< lg` | Top bar ย่อ + bottom nav; detail sheet จากล่าง |
| Desktop `lg+` | Top nav เต็ม + pill tabs; dashboard bento grid |

## ไม่ทำ (Out of Scope)

| หมวด | เหตุผล |
|------|--------|
| Firebase, Gemini, API routes | Phase 2 |
| Chart library (Recharts ฯลฯ) | ใช้ SVG เท่านั้น |
| LINE SDK deploy จริง | Teaser UI |
| Login, Export CSV จริง | Mock ปุ่มได้ |

---

## ไฟล์ Mock Layer

```
lib/mock-analyze.ts    → จำลอง Gemini Vision (smart)
lib/mock-weather.ts    → จำลองพยากรณ์ฝน
lib/mock-data.ts       → Seed data
lib/reports-store.tsx  → localStorage
lib/labels.ts          → i18n สำหรับ risk/status
```

---

## เกณฑ์สำเร็จ Mock-up v2 (วิดีโอ)

1. อัปโหลดรูปท่อ → AI ตอบระดับความเสี่ยง (จำลอง)
2. Dashboard อัปเดตตามรายงานที่ส่ง
3. เปลี่ยนสถานะได้และเห็นผลทันที
4. แผนที่กด pin เปิดรายละเอียดได้
5. หน้า `/line` เล่า Phase 2 ได้โดยไม่ deploy LINE จริง

**บวก:** สลับ EN/TH ครบ, ใช้ได้ดีบนมือถือ (Reporter) และ PC (Officer)

---

## คำพูดตอน Pitch

> "รอบคัดเลือกเราใช้ Mock-up ที่ UI และ flow ครบ — Phase 2 หลังผ่านรอบจะเชื่อม Gemini + Firestore จริง โดยไม่เปลี่ยนหน้าตาแอป"

---

## ลำดับงานสำหรับ Agent

1. อ่าน `MOCKUP_SCOPE.md` (ไฟล์นี้)
2. อ่าน `UI_UX_SPEC.md` ก่อนแตะ component
3. ทำ UI/UX ก่อน — อย่า setup Firebase/Gemini
4. ทดสอบ `npm run build` ก่อน push
5. ห้าม commit `API key.txt` หรือ `.env.local`

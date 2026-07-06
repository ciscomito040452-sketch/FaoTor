# MOCKUP_SCOPE.md — ขอบเขต Mock-up Demo (v2)

**สถานะปัจจุบัน:** โปรเจกต์อยู่ในโหมด **Mock-up v2 สำหรับอัดวิดีโอส่งรอบคัดเลือก** ไม่ใช่ Full Stack จริง

อ่านไฟล์นี้ก่อน `TASKS.md` และ `TECH_STACK.md` เมื่อทำงานในโหมด Mock-up

---

## เป้าหมาย

สร้าง **Prototype pitch-ready** ที่ดูและใช้งานได้เหมือนแอปจริง — พอสำหรับ:

1. อัดวิดีโอ demo ครบ story (ปัญหา → รายงาน → AI → เจ้าหน้าที่ → Phase 2 roadmap)
2. Deploy บน Vercel โดยไม่ต้องตั้ง env
3. Pitch ว่า "Phase 2 จะเชื่อม AI/DB จริง"

---

## ทำ (In Scope) — v2

| หมวด | รายละเอียด |
|------|-----------|
| UI หลัก | `/`, `/report`, `/dashboard`, `/about`, `/line` |
| Flow ครบ | อัปโหลด → AI mock → ขอบคุณ → Dashboard → เปลี่ยนสถานะ |
| Design System | ตาม `UI_UX_SPEC.md` |
| ข้อมูลจำลอง | Seed 10+ รายการ + localStorage + reset ใน Settings |
| Smart mock AI | `mock-analyze.ts` — bias จากขนาด/ความมืดรูป + urgency score |
| แผนที่ interactive | SVG mock — pin จาก reports, กดเปิด detail |
| Urgency + ฝน mock | `mock-weather.ts` + UrgencyBadge (Big Number) |
| LINE Bot teaser | `/line` — chat flow จำลอง (ไม่ใช่ LINE SDK) |
| i18n ครบ | risk/status/toast/story ผ่าน locale JSON |
| Dark mode | Settings toggle |
| Demo tools | รีเซ็ตข้อมูล, รูปตัวอย่าง, ลิงก์ LINE |
| Responsive | แยก mobile / iPad / PC (ดูด้านล่าง) |

---

## Responsive Rules

| Breakpoint | ขนาด | พฤติกรรม |
|------------|------|----------|
| Mobile | `< md` | Bottom nav; `/report` สูงสุด 480px จัดกลาง; detail sheet จากล่าง |
| iPad | `md–lg` | Bottom nav; dashboard stats 2+1; map บน list ล่าง |
| PC | `lg+` | Side nav ซ้าย; dashboard 2-column (map 40% + list 60%); detail modal กลางจอ |

อ้างอิง `UI_UX_SPEC.md` §3: `/report` max 480px, `/dashboard` max 1024px

---

## ไม่ทำ (Out of Scope)

| หมวด | เหตุผล |
|------|--------|
| Firebase, Gemini, API routes | Phase 2 |
| Leaflet / Google Maps จริง | Phase 2 |
| LINE SDK deploy จริง | Teaser UI เท่านั้น |
| Login, Gamification, กราฟสถิติ | Phase 2 / ขัด UI spec |

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

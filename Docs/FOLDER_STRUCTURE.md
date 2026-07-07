# **FOLDER\_STRUCTURE.md**

### **โครงสร้างไฟล์ของโปรเจกต์เฝ้าท่อ (FaoTor)**

วางไฟล์ตามโครงสร้างนี้เท่านั้น ถ้าจำเป็นต้องสร้างโฟลเดอร์ใหม่นอกเหนือจากนี้ ให้ถามก่อน (ตามกฎใน AGENT.md)

**โหมดปัจจุบัน:** Mock-up v3 — โครงสร้างด้านล่างสะท้อนโค้ดจริงใน repo

---

## **1\. โครงสร้างทั้งหมด (ปัจจุบัน)**

```
faotor/
├── app/
│   ├── layout.tsx              # Root layout, providers, fonts
│   ├── page.tsx                # Landing
│   ├── globals.css             # Tailwind v4 @theme (ไม่มี tailwind.config.ts)
│   ├── report/page.tsx         # อัปโหลดรูป + mock AI
│   ├── dashboard/page.tsx      # Officer dashboard
│   ├── about/page.tsx          # Vision + Phase roadmap
│   └── line/page.tsx           # LINE bot teaser (mock)
│
├── components/
│   ├── UploadForm.tsx          # Report wizard
│   ├── dashboard/              # ReportCard, LeafletMap, KPI helpers
│   ├── report/                 # PhotoUploadZone, LocationMapPicker, ...
│   ├── ui/                     # Card, Button, KpiCard, ...
│   ├── shell/                  # TopNav, MobileBottomNav
│   ├── layout/                 # AppShell
│   └── shared/                 # Toast, MetricsBento, badges
│
├── lib/
│   ├── mock-analyze.ts         # จำลอง Gemini Vision
│   ├── mock-weather.ts         # จำลองพยากรณ์ฝน
│   ├── mock-data.ts            # Seed reports
│   ├── reports-store.tsx       # localStorage CRUD
│   ├── dashboard-analytics.ts  # KPI / trend helpers
│   ├── app-context.tsx         # i18n, theme, toast
│   ├── locales/                # th.json, en.json
│   ├── fonts.ts                # next/font/google
│   └── types.ts
│
├── public/
│   ├── samples/                # drain-severe|partial|normal.svg
│   └── logo.svg
│
├── scripts/
│   └── smoke-check.mjs         # Route + locale smoke test
│
├── Docs/                       # SRS, MOCKUP_SCOPE, TASKS, ...
├── AGENT.md
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

---

## **2\. Phase 2 (planned — ยังไม่มีใน repo)**

```
app/api/analyze/route.ts        # Gemini Vision
app/api/reports/route.ts        # Firestore CRUD
lib/gemini.ts
lib/firebase.ts
lib/firestore.ts
.env.local                      # API keys (gitignored)
```

---

## **3\. คำอธิบายแต่ละโฟลเดอร์**

| โฟลเดอร์ | หน้าที่ | กฎการวางไฟล์ |
| ----- | ----- | ----- |
| `app/` | หน้าเว็บ (App Router) | หน้าใหม่ใช้ `app/ชื่อ/page.tsx` |
| `components/` | UI ที่ใช้ซ้ำ | PascalCase, แยกตาม domain (`dashboard/`, `report/`) |
| `lib/` | Logic, mock layer, context | หน้าเว็บไม่เรียก external API ตรง — ผ่าน `lib/` |
| `public/` | Static assets | รูป demo ใน `samples/`; รูป user เก็บใน localStorage (mock) |
| `scripts/` | เครื่องมือ dev/smoke | ไม่ import ใน production bundle |

---

## **4\. เอกสารที่ Agent ควรอ่าน**

1. `AGENT.md` — กฎการทำงาน  
2. `Docs/MOCKUP_SCOPE.md` — scope โหมดปัจจุบัน  
3. `Docs/FaoTor_SRS.md` — Requirement เต็ม  
4. `Docs/DEMO_RECORDING.md` — ก่อนอัดวิดีโอ  
5. `Docs/FOLDER_STRUCTURE.md` — ไฟล์นี้

---

## **5\. ข้อห้าม**

* ห้ามสร้างโฟลเดอร์ `pages/` — ใช้ `app/` Router เท่านั้น  
* ห้ามสร้าง Component ปนใน `app/` — ใช้ `components/`  
* ห้ามสร้าง `server/` หรือ `backend/` แยก — Phase 2 ใช้ `app/api/` ใน Next.js

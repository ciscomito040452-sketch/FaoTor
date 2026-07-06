# Dashboard List Workspace UX — Design Spec

**Date:** 2026-07-06  
**Scope:** (1) Officer Workspace list (2) Report photo step (3) Map pin scroll (4) Detail sheet/panel + metrics/AI + view on map  
**Status:** Approved for planning

---

## Problem

รายการรายงาน (`ReportCard`) ใช้ layout แบบ `[รูป] [flex-1 ข้อความ] [ScoreRing]` ทำให้บล็อกข้อความขยายเต็มความกว้าง — **ชื่อสถานที่อยู่ซ้าย วงคะแนนอยู่ขวาสุด** เกิดพื้นที่ว่างกลางการ์ด อ่านยาก รู้สึกเล็กและไม่เป็นระบบ

อาการเสริม:
- หัวข้อ section (`listTitle`) ไม่เด่นพอเมื่อเทียบ KPI/ปฏิทิน
- Badge สถานะ/ความเสี่ยงเล็ก สีเทาเยอะ ไม่ช่วยสแกนงานเร็ว
- การ์ดขาดข้อมูล officer ใช้ตัดสินใจ (ความเร่งด่วน, สัญญาณว่าเลือกอยู่)
- Toolbar + filter แยกจากหัวข้อ ไม่รู้สึกเป็น “command center” เดียวกัน

---

## Goals

1. **ชื่อ + คะแนนอยู่ใกล้กัน** — สแกนได้ในหนึ่งสายตา
2. **หัวข้อและ hierarchy ชัด** — location > district > meta
3. **สี KARO** — ส้มสำหรับความเสี่ยงสูง, ฟ้าสำหรับเลือก/active, ลดเทาเปล่าๆ
4. **ครบสำหรับ mock officer** — แสดง urgency + rain hint บนการ์ด (ถ้ามีข้อมูล)
5. **ไม่เปลี่ยน flow** — คลิกการ์ด → detail, filter, sort, scroll เดิม

---

## Approaches Considered

| # | แนวทาง | ข้อดี | ข้อเสีย |
|---|--------|-------|---------|
| A | **Title band** — วงคะแนนชิดแถวชื่อ (แนะนำ) | แก้ dead zone ตรงจุด, ยังมี ring | ต้องจัดแถวใหม่ |
| B | **Score chip** — ตัวเลขใน pill แทน ring ใน list | กะทัดรัดมาก | ไม่สอดคล้อง detail panel |
| C | **Vertical card** — รูปเต็มความกว้าง + ข้อมูลใต้ | อ่านง่าย mobile | สูงขึ้น, scroll มากขึ้น |

**เลือก A** — เก็บ ScoreRing แต่ย้ายไปแถวเดียวกับชื่อ

---

## Layout — ReportCard v2

```
┌──────────────────────────────────────────────────┐
│ ┌────┐  ซอยลาดพร้าว 42          ╭───╮           │
│ │ 📷 │  วังทองหลาง               │ 91│  ← ring   │
│ └────┘                           ╰───╯           │
│        [อุดตันหนัก] [รอดำเนินการ]  · เร่งด่วน 88  │
│        1 ชม.ที่แล้ว                    ›         │
└──────────────────────────────────────────────────┘
```

**โครงสร้าง:**
- แถว 1: รูป thumbnail (72px) + คอลัมน์ข้อมูล
- ในคอลัมน์: แถวย่อย `justify-between` = (ชื่อ+เขต) | ScoreRing `shrink-0`
- แถว 2: RiskBadge + Status pill + urgency text (ถ้ามี)
- แถว 3: เวลา + chevron เมื่อ selected/hover

**Selected / Priority:**
- Selected: ขอบฟ้า + พื้น `brand-blue-soft/50` + แถบซ้าย 3px ฟ้า
- Priority (คิวด่วน): แถบซ้ายส้ม (มีอยู่แล้ว — ปรับให้ไม่ชน selected)

**Thumbnail:** ขอบ 2px ตามระดับความเสี่ยง (ส้ม = หนัก, เทา = ปกติ)

---

## List Section Chrome

**Component ใหม่:** `ListWorkspaceHeader`
- หัวข้อ `text-[22px] font-bold` + แถบ accent สีฟ้า 4px
- Subtitle + pill จำนวนผลลัพธ์ (`แสดง N รายการ`)
- รวม toolbar + filter ในกล่องเดียว `bg-slate-50/80 rounded-[16px] p-4` เพื่อลดความรู้สึกแยกส่วน

**FilterTabs:** tab `อุดตันหนัก` เมื่อ active ใช้ `brand-orange` แทนฟ้า (สื่อความหมาย)

---

## Data Shown on Card (mock-safe)

| Field | แสดงเมื่อ | รูปแบบ |
|-------|-----------|--------|
| riskScore | เสมอ | ScoreRing 40px |
| urgencyScore | มีค่า | ข้อความ `เร่งด่วน {n}` สีส้มถ้า ≥70 |
| rainForecast | = สูง | ไอคอนฝน + ข้อความสั้น |
| queueRank | มีค่า | badge `#n` หน้าชื่อ |

---

## Out of Scope

- เปลี่ยน detail panel ขวา
- เพิ่มฟีเจอร์ assign officer / export / notes
- Chart library หรือ animation หนัก

---

## Success Criteria — Dashboard List

1. ไม่มีช่องว่างกว้างระหว่างชื่อกับวงคะแนน
2. อ่านชื่อ + คะแนน + สถานะได้ภายใน 2 วินาทีต่อการ์ด
3. หัวข้อ "รายการรายงาน" เด่นชัดกว่าเดิม
4. กดหมุดแผนที่ → scroll ลง workspace ได้
5. `npm run build` ผ่าน, mobile list ใช้การ์ดแบบเดียวกัน

---

## Problem — Map Pin ไม่พาไปดูรายละเอียด

กดหมุดบนแผนที่ความเสี่ยง → แผนที่ `flyTo` ซูมเข้า แต่ **หน้าไม่เลื่อนลง** ไป workspace (list + detail) เพราะ `scrollIntoView` ถูกเรียกเฉพาะเมื่อเลือกจากคิว ไม่ใช่แผนที่

ปัจจัยเสริม: แผนที่สูง ~72vh บัง workspace ที่อยู่ด้านล่าง

## Design — Map → Detail flow

1. **Bug fix:** `selectSource === "map"` → `workspaceRef.scrollIntoView` (+ scroll การ์ดใน list)
2. **Timing:** หน่วง ~500ms หลัง flyTo แล้วค่อย scroll
3. **Layout:** ลดความสูงแผนที่ desktop เป็น ~400px / 42vh
4. **Affordance:** แถบใต้หัวแผนที่เมื่อเลือกจุด — "ดูรายละเอียดด้านล่าง ↓"

## Success Criteria — Map

1. กดหมุด → เห็น workspace + detail (desktop) หรือ list highlight + sheet (mobile)
2. เลือกจาก list โดยตรง → ไม่กระโดดทั้งหน้า
3. แผนที่ยังซูม/เลื่อนได้ตามปกติ

---

## Problem — Detail Sheet เลื่อนไม่ได้

เปิดรายละเอียดบน mobile (`DetailSheet`) → `body.overflow = hidden` แต่ scroll ภายใน sheet ล้มเหลวเมื่อเนื้อหายาว → ผู้ใช้ติดใน modal จนกว่าจะปิด

## Design — Detail Sheet v2

- แยก scroll region (`flex-1 min-h-0 overflow-y-auto`)
- Drag handle + ปุ่ม X
- Sticky ปุ่มบันทึก (optional)
- Panel desktop: `max-h` + scroll ภายใน

## Design — Metrics + AI

- คะแนน: ring ใหญ่ขึ้น, label ชัด, stack แนวตั้งบน mobile
- AI: left border accent + gradient + ตัวอักษรใหญ่ขึ้น

## Design — ดูบนแผนที่ (แนะนำเพิ่ม)

**ควรมี** — ปุ่มหลักใน `ReportDetailContent` ใต้ข้อมูลสถานที่

| องค์ประกอบ | ที่อยู่ |
|------------|--------|
| ปุ่ม `ดูบนแผนที่` | ReportDetailContent (primary action รอง) |
| Mini map ย่อ | ใต้รูปท่อใน detail (optional wow) |
| flyTo + scroll | dashboard page handler → `#dashboard-map` |

Flow: detail → scroll ขึ้นแผนที่ → ซูมหมุด — ปิด loop กับ map → detail

## Success Criteria — Detail

1. เลื่อนดูเนื้อหา + กดบันทึกได้บน mobile
2. คะแนนและ AI อ่านง่ายกว่าเดิม
3. กดดูบนแผนที่ → เห็นตำแหน่งจุดบนแผนที่ใหญ่

---

## Problem — Report Photo Upload (ขั้นที่ 1)

ใน [`PhotoUploadZone.tsx`](../../components/report/PhotoUploadZone.tsx) เมื่อผู้ใช้กด **ตัวอย่างท่อ** (`onSampleSelect`) รูป preview เต็มกรอบ — ไอคอนกล้องและข้อความ `photoHint` หายไป ทำให้รู้สึกว่า **อัปโหลดรูปจริงไม่ได้** แม้จริงๆ กดกรอบแล้วเปิด file picker ได้ (`onSelect`)

อาการ:
- ไม่มีปุ่ม/ข้อความ "อัปโหลดรูปของฉัน" หรือ "เปลี่ยนรูป" หลังเลือกตัวอย่าง
- ตัวอย่างกับรูปจริงดูเหมือนกัน — ไม่รู้ว่ากำลังใช้ demo หรือรูปตัวเอง
- ปุ่มตัวอย่างอยู่ใต้กรอบ ไม่มีคำอธิบายว่าเป็น **ทางลัด demo** ไม่ใช่ขั้นตอนบังคับ

---

## Design — PhotoUploadZone v2 (แนะนำ)

```
┌─────────────────────────────────────────┐
│  [  preview รูป  ]                     │
│  ┌ overlay เมื่อมีรูป ─────────────┐   │
│  │ 📷  แตะเพื่อเปลี่ยนรูป          │   │
│  └──────────────────────────────────┘   │
│  [ป้าย: ตัวอย่าง demo] (ถ้าเป็น sample) │
├─────────────────────────────────────────┤
│  [ ถ่าย/เลือกรูปจากเครื่อง ]  ← ปุ่มหลัก │
├─────────────────────────────────────────┤
│  ลองดูตัวอย่าง (ไม่บังคับ)              │
│  [อุดตันหนัก] [เริ่มอุดตัน] [ปกติ]      │
└─────────────────────────────────────────┘
```

**กฎ:**
1. ปุ่ม **ถ่าย/เลือกรูป** แสดงเสมอ (primary outline หรือ secondary) — ไม่พึ่งแค่กดกรอบ
2. เมื่อมี preview: overlay บางๆ + ไอคอนกล้อง + `report.changePhoto`
3. แยก section ตัวอย่าง — หัวข้อย่อย `report.sampleSection` ขนาดเล็ก สีเทา
4. ติด badge `report.sampleBadge` เมื่อ preview มาจาก `SAMPLE_IMAGES`
5. `UploadForm` ติดตาม `previewSource: 'none' | 'file' | 'sample'` เพื่อแสดง badge และ reset file input เมื่อเลือก sample

**Out of scope:** เปลี่ยน mock-analyze logic, ขั้นวิเคราะห์/ผลลัพธ์

---

## Success Criteria — Report Upload

1. หลังกดตัวอย่าง ผู้ใช้เห็นปุ่มอัปโหลดรูปจริงทันที
2. รู้ว่ากำลังใช้รูปตัวอย่าง (badge) vs รูปจากเครื่อง
3. กดปุ่มอัปโหลด → เปิด file picker ได้เสมอ
4. Flow เดิม: มีรูป + ปักหมุดแผนที่ → ส่งวิเคราะห์

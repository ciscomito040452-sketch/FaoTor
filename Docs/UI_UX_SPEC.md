# **UI\_UX\_SPEC.md**

### **Design System — โปรเจกต์เฝ้าท่อ (FaoTor)**

เอกสารนี้คือมาตรฐานภาพและการใช้งานของทุกหน้าในระบบ

---

## **v3 — KARO-Inspired (มีผลตั้งแต่ 2026-07-06)**

อัปเดตสำหรับ redesign ทั้งระบบ — อ้างอิง `Docs/superpowers/specs/2026-07-06-faotor-karo-ui-v3-design.md`

### สีหลัก v3

| Token | Hex | ใช้ที่ไหน |
| ----- | ----- | ----- |
| brand-blue | #3B82F6 | ปุ่มหลัก, tab active |
| brand-orange | #F97316 | accent รอง, trend badge |
| surface-page | #F3F4F6 | พื้นหลังหน้า |
| surface-card | #FFFFFF | การ์ด bento |

### กฎ v3

1. **Bento cards** — `rounded-[20px]`, shadow `0 1px 3px rgba(0,0,0,0.06)`
2. **Top nav** แทน side nav (desktop + mobile bottom nav)
3. **Mini charts** — SVG inline ใน KPI เท่านั้น (ห้าม chart library)
4. **Risk แดง** — เฉพาะ badge/pin ไม่ทาพื้นทั้งการ์ด
5. ฟอนต์และ spacing เดิม (IBM Plex Sans Thai, 8pt grid)

### Dashboard Officer Workspace

- **ไม่มี** ปุ่มรายงานใหม่ / ส่งออก CSV (เป็นหน้าที่ผู้รายงาน)
- List + Detail อยู่ใน **Card เดียว** — grid `1fr / minmax(340px,480px)` บน desktop
- Detail panel: `sticky top-20`, `max-h-[calc(100vh-6rem)]`, scroll ภายใน panel เท่านั้น
- List scroll แยกใน `max-h-[min(520px,55vh)]` — ไม่ scroll ทั้งหน้าเมื่อเลือกจาก list
- คิวงาน: แสดง pending สูงสุด 8 รายการ, scroll ในกรอบ, ลิงก์ "ดูทั้งหมด" → filter pending
- ปฏิทิน: selected day ใช้ **inset border** ภายใน cell (ไม่ใช้ ring offset) และเว้นช่อง `gap-1` เพื่อไม่ให้เลขวันทับกัน

### Report Insight Strip (2026-07-07)

- ทุก **ReportCard** แสดง 3 สัญญาณผ่าน `MetricFocusBlock`; **ResultCard** และ detail ใช้ `MetricsBento`
- พยากรณ์ฝนแสดง micro-label `Weather API · Demo`
- ความเร่งด่วนแสดง caption `+{n} จากฝน` เมื่อมี rain bonus
- Status pill อยู่มุมขวาบนการ์ด — สีตามสถานะ (slate / blue / green)

### Metrics Bento v3.1 (2026-07-07)

- **ลำดับ:** Urgency (hero บน mobile) → Risk → Rain
- **พื้น:** `BENTO_TRAY` slate-100 + cell ขาว แยก accent ด้วย `border-t-2`
- **Rain:** แสดง **% โอกาสฝนตก** เป็นตัวเลขหลัก + chip ระดับ (สูง/ปานกลาง/ต่ำ) + Weather API hint
- **Panel:** hero + 2-col (ไม่ใช้ 3-col แนวนอนแคบ)
- **AI card:** ไม่ใช้ `border-l-4` ฟ้า

### Metrics Bento v3.2 (2026-07-07)

- Rain cell: `85%` + chip ระดับ + `weather.rainChance` label
- Typed cells: urgency (orange top), risk (slate top), rain (sky top + sky-50/40 bg)
- List card: metrics ใน tray + `border-t` คั่นจาก header

### Metric Strip v3.3 (2026-07-07)

- **รูปแบบเดียวทุกที่:** แถบ 3 ช่อง `[⚡ เร่งด่วน | 🛡 ความเสี่ยง | ☁ %ฝน]` — ไม่มี gray tray, ไม่มี hero row, ไม่มี `border-t-2`
- **Token:** `METRIC_STRIP` (divide-x + ring) + cell tint: urgency `orange-50/40`, risk `white`, rain `sky-50/50`
- **ไอคอน:** `MetricIcons` — bolt / shield / cloud
- **Variant:** `inline` (list card กระชับ), `compact` (ResultCard), `panel` (detail + rain chip + API hint)
- **ReportCard:** strip ใต้ meta โดยตรง, thumb 56px, padding ลดลง

### ReportCard v4 — Horizontal Focus (2026-07-07)

- **แถวเดียว 4 โซน:** `[ภาพ | หัวข้อ+รายละเอียด | MetricFocusBlock | Status pill]`
- **MetricFocusBlock:** hero **Urgency** ซ้าย (ตัวเลขใหญ่) + **Risk** / **Rain %** stacked ขวา
- **Token:** `METRIC_FOCUS_PANEL` + cell tint เดิม (`METRIC_CELL_*`)
- **Status:** ชิดขวาสุด แนวตั้งกลาง — ไม่ปนกับชื่อสถานที่
- Detail/ResultCard ยังใช้ `MetricsBento` (ไม่เปลี่ยน)

### ReportCard v4.1 — Spacing + ScoreRing (2026-07-07)

- **Grid layout:** `72px | text (max 200px) | MetricFocusBlock | Status` — ลดช่องว่างกลางการ์ด
- **Thumb:** 72×72px `rounded-[14px]` เท่าความสูงการ์ด
- **MetricFocusBlock:** Urgency ใช้ `ScoreRing` size 56; Risk/Rain ตัวเลข 18px + spacing `px-3 py-2.5`
- **Risk level:** ข้อความสีตาม `RISK_BADGE` แทน compact badge ใน cell แคบ
- **Panel:** `min-w-[168px] min-h-[72px]` ไม่จำกัด `max-width` แคบ

### ReportCard v4.2 — Flex pack (2026-07-07)

- **Layout:** `flex gap-2.5` แทน grid `1fr` — ชื่อ/metrics/status ติดกัน ไม่มี dead zone กลางการ์ด
- **Text:** `max-w-[160px] shrink` ไม่ใช้ `flex-1`
- **Metrics + Status:** กลุ่มเดียว `flex gap-2 shrink-0`

### Detail image balance (2026-07-07)

- **`imageVariant`:** แยกจาก `compact` — `panel` = `aspect-[16/10] max-h-[220px] min-h-[160px]`
- **Workspace:** `xl:grid-cols-[1.05fr_0.95fr]` detail กว้างขึ้น ~45%
- **ReportDetailPanel + DetailSheet:** ใช้ `imageVariant="panel"`

### Detail Sheet Sticky Footer (2026-07-07)

- Mobile `DetailSheet` + desktop `ReportDetailPanel`: **StatusSegmented + Save** อยู่ footer คงที่ ไม่ scroll
- Header chip สะท้อน status ที่เลือก (live update)
- Metrics ผ่าน `MetricsBento` (ไม่ใช้ ScoreRing ใหญ่ใน compact)

---

## เอกสารเวอร์ชันก่อน (v1/v2)

เนื้อหาด้านล่างเป็น spec เดิม — บางข้อ (ห้ามกราฟ, side nav) **ถูกแทนที่โดย v3**

---

## **0\. แนวคิดการออกแบบ (Design Philosophy)**

สกัดมาจากโลโก้ที่ผู้ใช้ออกแบบไว้แล้ว:

* **สีฟ้า Gradient** \= คลื่นน้ำ \+ Shield ป้องกัน → ใช้เป็นสีหลักของ Action ทั้งหมด  
* **เทาเข้ม/Slate** \= ตะแกรงท่อระบายน้ำ → ใช้เป็นสีของ Text/โครงสร้าง สื่อความมั่นคงเป็นทางการ  
* **พื้นขาวสะอาด** \= ไม่มีลูกเล่นรบกวน

**หลักการ 4 ข้อที่ยึดตลอดทั้งระบบ:**

1. **ใช้สีให้น้อยที่สุดเท่าที่จำเป็น** — สีอื่นนอกจาก Brand Blue/Slate จะปรากฏเฉพาะ Risk Badge เท่านั้น ที่อื่นห้ามมีสีแปลกปลอม  
2. **ตัวเลข/ข้อความใหญ่แทนกราฟ** — ไม่มี Chart, Donut, Progress Bar ที่ไหนในระบบ ใช้ "Big Number" แบบ Apple Health แทนทุกครั้งที่ต้องโชว์ข้อมูลเชิงปริมาณ  
3. **ไม่มี Emoji ที่ไหนในระบบเด็ดขาด** — รวมถึง Error Message และ Empty State ด้วย  
4. **ทุกจุดที่กดต้องใหญ่และกดง่าย** — ปุ่ม/แถวข้อมูลสูงไม่ต่ำกว่า 50px (มากกว่ามาตรฐาน Apple ที่ 44px เพราะกลุ่มผู้ใช้ Reporter อาจเป็นผู้สูงอายุในชุมชน)

---

## **1\. ระบบสี (Color System)**

### **1.1 Brand Blue (สกัดจาก Gradient ในโลโก้)**

| Token | Hex | ใช้ที่ไหน |
| ----- | ----- | ----- |
| blue-50 | \#EAF2FE | พื้นหลังอ่อนๆของ Card ที่ต้องการเน้นเล็กน้อย |
| blue-100 | \#CFE1FC | พื้นหลัง Badge/Tag สถานะปกติ |
| blue-500 | \#2F6FED | สีหลัก (Primary) — ปุ่มหลัก, Link, Icon Active |
| blue-700 | \#1B4FBE | Hover/Pressed State ของปุ่มหลัก |
| blue-900 | \#123B8F | Text บนพื้นหลังสีฟ้าอ่อน (ต้องคอนทราสต์พออ่านง่าย) |

### **1.2 Slate (สกัดจากตะแกรงท่อในโลโก้)**

| Token | Hex | ใช้ที่ไหน |
| ----- | ----- | ----- |
| slate-50 | \#F6F7F9 | พื้นหลังหน้าเว็บ (Background) |
| slate-100 | \#E9EBEF | เส้นแบ่ง (Divider), Border ของ Card |
| slate-400 | \#9AA3B2 | Text รอง (Secondary), Icon ที่ไม่ Active |
| slate-600 | \#4E5768 | Text หลักของ Label/Caption |
| slate-900 | \#1B2130 | Text หลักของ Title/Body (ไม่ใช้สีดำสนิท \#000) |

### **1.3 สีเตือนสำหรับ Risk Badge เท่านั้น (ห้ามใช้ที่อื่น)**

ตัดสินใจแล้วว่า **ต้องมีสีเตือนแยกจาก Brand** เพราะระดับ "อุดตันหนัก" คือข้อมูลที่ต้อง Action ทันที ถ้าใช้สีฟ้า-เทาล้วนจะกลืนไปกับ UI ทั่วไป เจ้าหน้าที่อาจมองข้าม — นี่คือจุดเดียวที่อนุญาตให้มีสีนอกจาก Brand

| ระดับความเสี่ยง | สี Background (Tint) | สี Text/Icon | Hex |
| ----- | ----- | ----- | ----- |
| ปกติ | slate-100 | slate-600 | ไม่ต้องเตือน ใช้สีเรียบ |
| เริ่มอุดตัน | \#FFF3DC | \#8A5A00 | Amber — โทนเดียวกับ iOS systemOrange |
| อุดตันหนัก | \#FDE7E7 | \#B3261E | Red — โทนเดียวกับ iOS systemRed |

### **1.4 Dark Mode (Default ปิดไว้ก่อน เปิดผ่าน Settings)**

| Token | Light | Dark |
| ----- | ----- | ----- |
| Background หน้า | slate-50 \#F6F7F9 | \#14161B |
| Background Card | \#FFFFFF | \#1E2128 |
| Text หลัก | slate-900 \#1B2130 | \#F1F2F5 |
| Text รอง | slate-600 \#4E5768 | \#A6ADBB |
| Brand Blue (Action) | blue-500 \#2F6FED | \#5B92F5 (สว่างขึ้นเพื่อคอนทราสต์บนพื้นเข้ม) |
| Border/Divider | slate-100 \#E9EBEF | \#2C3038 |

---

## **2\. ตัวอักษร (Typography)**

### **2.1 Font Family**

| บทบาท | Font | เหตุผล |
| ----- | ----- | ----- |
| ภาษาไทย | **IBM Plex Sans Thai** | เป็นฟอนต์ Geometric สมัยใหม่ ออกแบบมาให้ Latin+Thai ใช้ร่วมกันได้สมดุล ให้ความรู้สึกทางการแต่ไม่แข็งเกินไป (ฟรีผ่าน Google Fonts) |
| ภาษาอังกฤษ/ตัวเลข | **Inter** | รูปทรงใกล้เคียง SF Pro ที่ใช้ใน iOS มากที่สุดในฟอนต์ที่ใช้ได้ฟรี ให้ความรู้สึก "แอป Apple" ตามที่ต้องการ |

font-family: 'IBM Plex Sans Thai', 'Inter', \-apple-system, sans-serif;

### **2.2 Type Scale (อิงจาก iOS Human Interface Guidelines)**

| ระดับ | ขนาด | Weight | ใช้ที่ไหน |
| ----- | ----- | ----- | ----- |
| Large Title | 34px | 700 (Bold) | หัวข้อหลักบนสุดของแต่ละหน้า เช่น "รายงานท่อระบายน้ำ" |
| Title 1 | 28px | 600 | ตัวเลขใหญ่ใน Stat Card |
| Title 2 | 22px | 600 | หัวข้อ Section ย่อย |
| Headline | 17px | 600 | Label ของ List Row, ชื่อปุ่ม |
| Body | 17px | 400 | เนื้อหาข้อความทั่วไป |
| Callout | 15px | 400 | ข้อความรองใน Card |
| Caption | 13px | 400 | Timestamp, Hint ใต้ Input |

**กฎเสริม:** Large Title ใช้ letter-spacing: \-0.02em (ตัวอักษรชิดกันนิดหน่อยแบบ iOS) ทุกระดับใช้ line-height: 1.35

---

## **3\. Layout & Spacing**

* ใช้ระบบ 8pt Grid: ระยะห่างที่อนุญาตมีแค่ 4, 8, 12, 16, 24, 32, 48px เท่านั้น ห้ามใช้เลขอื่น  
* **Corner Radius (ต้องสม่ำเสมอทั้งระบบ):**

| Element | Radius |
| ----- | ----- |
| Card | 16px |
| ปุ่ม/Input | 12px |
| Badge/Pill | 9999px (กลมเต็ม) |
| Thumbnail รูปเล็ก | 8px |

* **Container:** หน้า /report (มือถือ) กว้างสูงสุด 480px จัดกลาง — หน้า /dashboard (คอม) กว้างสูงสุด 1024px จัดกลาง  
* **Shadow:** ใช้เบาที่สุดเท่านั้น 0 1px 2px rgba(0,0,0,0.04) สำหรับ Card — ห้ามใช้ Shadow เข้มหรือ Glow เพราะขัดกับความ Premium/Formal

---

## **4\. Component Spec**

### **4.1 ปุ่ม (Button)**

| ประเภท | Background | Text | สูง | ใช้ที่ไหน |
| ----- | ----- | ----- | ----- | ----- |
| Primary | blue-500 | ขาว | 50px | Action หลักของหน้า เช่น "ส่งรายงาน" |
| Secondary | โปร่งใส ขอบ slate-100 1px | slate-900 | 50px | Action รอง เช่น "ส่งรายงานอีกจุด" |
| Disabled | slate-100 | slate-400 | 50px | ปุ่มที่ยังกดไม่ได้ (เช่น ยังไม่เลือกรูป) |

ปุ่มทั้งหมด border-radius: 12px, font: Headline (17px/600), กว้างเต็ม Container (Full-width) บนมือถือ

### **4.2 Input Field**

* สูง 50px, border-radius: 12px, ขอบ slate-100 1px, Focus แล้วขอบเปลี่ยนเป็น blue-500 2px  
* Label อยู่เหนือ Input เสมอ (Caption, สี slate-600) — ไม่ใช้ Placeholder แทน Label เพราะผู้ใช้บางส่วนอาจสับสน

### **4.3 Risk Badge (Signature Component ของระบบ)**

รูปทรง Pill (radius: 9999px) มีไอคอน "Shield+หยดน้ำ" ขนาดเล็ก (16px) วางซ้ายของ Text เสมอ ไอคอนนี้คือ Element เดียวที่ดึงมาจากโลโก้มาใช้ซ้ำในทุกจุดที่แสดงระดับความเสี่ยง เพื่อให้ผู้ใช้จดจำและเชื่อมโยงกับ Brand ได้ทันทีที่เห็น

\[🛡️ไอคอน\] อุดตันหนัก

(หมายเหตุ: ไอคอนเป็น SVG ไม่ใช่ Emoji — วาดจากทรง Shield+หยดน้ำในโลโก้ ไม่ใช่สัญลักษณ์สำเร็จรูป)

Padding แนวนอน 12px แนวตั้ง 6px, font: Callout (15px/600)

### **4.4 Stat Card (สำหรับ Dashboard)**

แทนที่กราฟ/โดนัททั้งหมดด้วย "ตัวเลขใหญ่" แบบ Apple Health:

┌─────────────────────┐  
│  รายงานทั้งหมด        │  ← Caption, slate-600  
│                      │  
│  128                 │  ← Title 1, 28px/600, slate-900  
└─────────────────────┘

Background ขาว, radius: 16px, Border slate-100 1px, Padding 20px

### **4.5 List Row (สำหรับรายการรายงานใน Dashboard)**

แบบ Apple Settings/Mail — แถวสูงไม่ต่ำกว่า 64px:

\[รูป Thumbnail 8px\]  ซอยลาดพร้าว 42          \[Badge: อุดตันหนัก\]  \>  
                      2 ชม.ที่แล้ว

* Thumbnail 48x48px radius: 8px  
* Title \= Headline (17px/600) สี slate-900  
* Subtitle \= Caption สี slate-600  
* เส้นแบ่งแถว slate-100 1px เฉพาะด้านล่าง (Hairline)  
* ทั้งแถวกดได้ (Tap Target เต็มแถว) เปิด Detail Sheet

### **4.6 Segmented Control (เปลี่ยนสถานะงาน)**

ใช้แทน Dropdown เพราะกดง่ายกว่าและเห็นตัวเลือกครบในตาเดียว (สไตล์ iOS):

┌───────────────┬───────────────┬───────────────┐  
│ รอดำเนินการ    │  กำลังแก้ไข    │   แก้ไขแล้ว    │  
└───────────────┴───────────────┴───────────────┘

Container Background slate-100, ปุ่มที่เลือก Background ขาว \+ Shadow เบา \+ Text blue-500, ปุ่มที่ไม่เลือก Text slate-600

### **4.7 Toggle Switch (Dark Mode)**

สไตล์ iOS Switch มาตรฐาน — เปิด \= blue-500, ปิด \= slate-100

### **4.8 Empty State**

\[ไอคอน Shield+หยดน้ำ สีเทาอ่อน ขนาดใหญ่\]

ยังไม่มีรายงาน  
เมื่อชุมชนส่งรายงานเข้ามา รายการจะปรากฏที่นี่

Headline \+ Body สี slate-600, จัดกลางแนวตั้งของพื้นที่ว่าง ไม่มี Emoji

### **4.9 Loading State**

Spinner วงกลมหมุน สี blue-500 ขนาด 24px \+ Text ข้างๆ กำลังวิเคราะห์ภาพ... (Callout, slate-600) — ไม่ใช้ Skeleton Screen เพื่อความเรียบง่าย

### **4.10 Error/Alert**

แบนเนอร์บนสุดของหน้า Background \#FDE7E7 (ใช้สีเดียวกับ Risk Badge ระดับอุดตันหนัก เพื่อความสอดคล้อง) Text \#B3261E หายไปเองใน 4 วินาที

---

## **5\. Screen Spec**

### **5.1 หน้า /report (มือถือเป็นหลัก — กลุ่มเป้าหมาย: ชุมชน)**

\[Large Title\] รายงานท่อระบายน้ำ

┌─────────────────────────┐  
│                         │  
│   แตะเพื่อถ่ายรูป/เลือกรูป  │  ← กรอบ Dashed border, สูง 200px  
│                         │     หลังเลือกแล้วรูปเต็มกรอบ  
└─────────────────────────┘

\[Label\] ตำแหน่ง  
\[Input\] เช่น ซอยลาดพร้าว 42

\[ปุ่ม Primary เต็มความกว้าง\] ส่งรายงาน

**หลังกดส่ง (Loading → Result):**

\[Spinner\] กำลังวิเคราะห์ภาพ...

↓ (2-4 วินาทีถัดมา)

┌─────────────────────────┐  
│  \[Badge\] อุดตันหนัก        │  
│  "พบขยะสะสมหนาแน่น       │  ← reason จาก AI, Callout  
│   บริเวณตะแกรงรับน้ำ"      │  
└─────────────────────────┘

\[ปุ่ม Secondary\] ส่งรายงานอีกจุด

### **5.2 หน้า /dashboard (คอมเป็นหลัก แต่ Responsive ได้ — กลุ่มเป้าหมาย: เจ้าหน้าที่)**

\[Large Title\] แดชบอร์ดเจ้าหน้าที่

┌──────────┐ ┌──────────┐ ┌──────────┐  
│ ทั้งหมด    │ │ รอดำเนินการ│ │ อุดตันหนัก │   ← Stat Card 3 อัน แถวเดียว  
│   128    │ │    34    │ │    12    │  
└──────────┘ └──────────┘ └──────────┘

\[รายการรายงาน เรียงตามความเสี่ยงมาก→น้อย\]  
┌────────────────────────────────────────┐  
│ \[รูป\] ซอยลาดพร้าว 42    \[อุดตันหนัก\]  \>  │  
│       2 ชม.ที่แล้ว                        │  
├────────────────────────────────────────┤  
│ \[รูป\] หมู่บ้านสุขใจ      \[เริ่มอุดตัน\]  \>  │  
│       5 ชม.ที่แล้ว                        │  
└────────────────────────────────────────┘

**กดแถว → เปิด Detail Sheet:**

\[รูปเต็ม\]  
ตำแหน่ง: ซอยลาดพร้าว 42  
\[Badge: อุดตันหนัก\] "พบขยะสะสมหนาแน่น..."

เปลี่ยนสถานะ:  
┌───────────────┬───────────────┬───────────────┐  
│ รอดำเนินการ ✓  │  กำลังแก้ไข    │   แก้ไขแล้ว    │  
└───────────────┴───────────────┴───────────────┘

\[ปุ่ม Primary\] บันทึก

### **5.3 Settings (ภาษา \+ Dark Mode)**

เข้าถึงผ่านไอคอน ⚙ มุมขวาบนของทุกหน้า เปิดเป็น Sheet เลื่อนขึ้นจากด้านล่าง:

\[List Row\] ภาษา                    ไทย  \>  
\[List Row\] รูปแบบสี                 Light  \>

---

## **6\. รองรับหลายภาษา (i18n)**

* Default ภาษา: **ไทย** ตามที่กำหนด  
* โครงสร้างไฟล์แปล: lib/locales/th.json และ lib/locales/en.json

Key แปลใช้ชื่อตาม Namespace ของหน้า เช่น:  
 {  "report.title": "รายงานท่อระบายน้ำ",  "report.photoPlaceholder": "แตะเพื่อถ่ายรูป/เลือกรูป",  "dashboard.statTotal": "ทั้งหมด"}

*   
* **ห้ามเพิ่ม Library i18n ใหม่ (เช่น next-intl)** โดยไม่แจ้งก่อน — ใช้ React Context ธรรมดาโหลด JSON ตามที่ระบุ เพื่อไม่ให้ขัดกับ TECH\_STACK.md ที่ปิด Scope Dependency ไว้แล้ว

---

## **7\. Do's and Don'ts (สรุปกฎเหล็ก)**

| ✅ ทำ | ❌ ห้ามทำ |
| ----- | ----- |
| ใช้ Big Number แทนข้อมูลเชิงปริมาณ | ใช้ Chart, Donut, Progress Bar ที่ไหนเลย |
| ใช้ Risk Badge (Shield+หยดน้ำ) ทุกจุดที่โชว์ความเสี่ยง | ใช้ Emoji ที่ไหนในระบบ รวม Error/Empty State |
| จำกัดสีแค่ Blue/Slate \+ สีเตือน 2 สีใน Badge เท่านั้น | เพิ่มสีอื่นนอกเหนือจากที่ระบุไว้ในเอกสารนี้ |
| ปุ่ม/แถวสูงอย่างน้อย 50px | ทำปุ่ม/พื้นที่กดขนาดเล็กกว่า 44px |
| Corner Radius ตามตารางหมวด 3 เท่านั้น | ใช้ Radius อื่นที่ไม่ตรงกับระบบ |


# **FOLDER\_STRUCTURE.md**

### **โครงสร้างไฟล์ของโปรเจกต์เฝ้าท่อ (FaoTor)**

วางไฟล์ตามโครงสร้างนี้เท่านั้น ถ้าจำเป็นต้องสร้างโฟลเดอร์ใหม่นอกเหนือจากนี้ ให้ถามก่อน (ตามกฎใน AGENT.md)

---

## **1\. โครงสร้างทั้งหมด**

faotor/  
├── app/  
│   ├── layout.tsx  
│   ├── page.tsx                  \# หน้าแรก (ลิงก์ไปหน้า report / dashboard)  
│   ├── globals.css  
│   ├── report/  
│   │   └── page.tsx              \# หน้าอัปโหลดรูปท่อ (ฝั่งชุมชน) \- FR-101,102,103  
│   ├── dashboard/  
│   │   └── page.tsx              \# หน้ารายการความเสี่ยง (ฝั่งเจ้าหน้าที่) \- FR-105,106  
│   └── api/  
│       ├── analyze/  
│       │   └── route.ts          \# เรียก Gemini Vision API \- FR-102  
│       └── reports/  
│           └── route.ts          \# CRUD ข้อมูลรายงานกับ Firestore \- FR-104  
│  
├── components/  
│   ├── UploadForm.tsx            \# ฟอร์มอัปโหลดรูป \+ กรอกตำแหน่ง  
│   ├── RiskBadge.tsx             \# แสดงระดับความเสี่ยง (ปกติ/เริ่มอุดตัน/อุดตันหนัก)  
│   ├── ReportTable.tsx           \# ตารางรายการรายงานใน Dashboard  
│   └── StatusButton.tsx          \# ปุ่มเปลี่ยนสถานะงาน  
│  
├── lib/  
│   ├── gemini.ts                 \# ตั้งค่า Gemini API Client  
│   ├── firebase.ts               \# ตั้งค่า Firebase App (Firestore \+ Storage)  
│   └── firestore.ts              \# ฟังก์ชันอ่าน/เขียนข้อมูล reports  
│  
├── public/  
│   └── (ไฟล์ Static เช่น Logo — ถ้ามี)  
│  
├── .env.local                    \# เก็บ API Key (ห้าม Commit ขึ้น GitHub)  
├── .gitignore  
├── package.json  
├── tailwind.config.ts  
├── tsconfig.json  
│  
├── FaoTor\_SRS.md                 \# เอกสาร Requirement หลัก  
├── AGENT.md                      \# กฎการทำงานของ AI Agent  
├── TECH\_STACK.md                 \# เทคโนโลยีที่ใช้  
└── FOLDER\_STRUCTURE.md           \# ไฟล์นี้

---

## **2\. คำอธิบายแต่ละโฟลเดอร์**

| โฟลเดอร์ | หน้าที่ | กฎการวางไฟล์ |
| ----- | ----- | ----- |
| `app/` | หน้าเว็บและ API Route ทั้งหมด | ไฟล์หน้าเว็บใหม่ ต้องอยู่ในรูปแบบ `app/ชื่อหน้า/page.tsx` เท่านั้น |
| `components/` | UI Component ที่ใช้ซ้ำได้ | Component ใหม่ต้องตั้งชื่อไฟล์แบบ PascalCase เช่น `MapPin.tsx` |
| `lib/` | โค้ดเชื่อมต่อ Service ภายนอก (Gemini, Firebase) | ห้ามเรียก Gemini/Firebase ตรงจากหน้าเว็บ ต้องผ่านไฟล์ใน `lib/` เท่านั้น เพื่อให้แก้ Config ที่เดียวได้ |
| `public/` | ไฟล์ Static | รูปภาพ Logo/Icon เท่านั้น ห้ามเก็บรูปที่ผู้ใช้อัปโหลด (รูปอัปโหลดเก็บใน Firebase Storage) |

---

## **3\. เอกสารประกอบโปรเจกต์ (Root Level)**

ไฟล์ `.md` ทั้ง 4 ไฟล์ที่อยู่ Root ให้ Agent อ่านตามลำดับนี้เมื่อเริ่มงานใหม่ทุกครั้ง:

1. `AGENT.md` — กฎการทำงาน  
2. `FaoTor_SRS.md` — Requirement ว่าต้องทำอะไร  
3. `TECH_STACK.md` — ต้องใช้เทคโนโลยีอะไร  
4. `FOLDER_STRUCTURE.md` — ไฟล์นี้ ต้องวางไฟล์ตรงไหน

---

## **4\. ข้อห้าม**

* ห้ามสร้างโฟลเดอร์ `pages/` (Next.js แบบเก่า) — โปรเจกต์นี้ใช้ `app/` Router เท่านั้น  
* ห้ามสร้างไฟล์ Component ปนอยู่ใน `app/` — Component ที่ใช้ซ้ำต้องอยู่ใน `components/` เท่านั้น  
* ห้ามสร้างโฟลเดอร์ `server/` หรือ `backend/` แยกต่างหาก — ตาม TECH\_STACK.md ใช้ Next.js API Route ใน `app/api/` พอ
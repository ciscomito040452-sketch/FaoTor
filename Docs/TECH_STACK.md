# **TECH\_STACK.md**

### **เทคโนโลยีที่ใช้ในโปรเจกต์เฝ้าท่อ (FaoTor)**

ห้ามเพิ่ม Library/Service ใหม่นอกจากที่ระบุในไฟล์นี้โดยไม่ถามก่อน (ตามกฎใน AGENT.md)

---

## **1\. สรุปภาพรวม**

| Layer | เทคโนโลยีที่เลือกใช้ | เหตุผลที่เลือก |
| ----- | ----- | ----- |
| Frontend \+ Backend | **Next.js** (React Framework, App Router) | รวม Frontend กับ API Route ไว้ในโปรเจกต์เดียว ไม่ต้องแยก Deploy Server ต่างหาก ประหยัดเวลา Setup |
| ภาษาหลัก | **JavaScript/TypeScript** | Next.js ใช้ภาษานี้เป็นหลัก และ AI Vibe Coding เขียนได้แม่นยำ |
| AI Vision | **Gemini API (Free Tier)** — โมเดล gemini-2.5-flash หรือ gemini-flash-lite | วิเคราะห์ภาพท่อ ไม่มีค่าใช้จ่าย ตามงบ 0 บาท |
| Database | **Firebase Firestore** | ไม่ต้องตั้ง Server Database เอง มี Free Tier เพียงพอสำหรับ Demo |
| เก็บรูปภาพ | **Firebase Storage** | ใช้คู่กับ Firestore ได้ทันที ไม่ต้องผูก Service เพิ่ม |
| Hosting/Deploy | **Vercel (Free Tier)** | Deploy Next.js ได้ในคลิกเดียว ได้ URL จริงไปใส่ในวิดีโอ Demo |
| Styling | **Tailwind CSS** | เขียน UI เร็ว ไม่ต้องเขียน CSS แยกไฟล์ |
| Animation | **Framer Motion** + CSS motion tokens | Page transitions, sheets, stagger lists, KPI count-up (Mock-up v3) |
| Fonts | **Self-hosted** IBM Plex Sans Thai + Inter (`lib/fonts.ts`, `public/fonts/`) | ไม่พึ่ง Google Fonts ตอน runtime |

---

## **2\. รายละเอียดแต่ละ Layer**

### **2.1 Frontend \+ Backend: Next.js**

* ใช้ **App Router** (ไม่ใช่ Pages Router แบบเก่า)  
* หน้าเว็บหลักที่ต้องมี (ตาม SRS Phase 1):  
  * /report — หน้าอัปโหลดรูปท่อ (ฝั่งชุมชน)  
  * /dashboard — หน้ารายการความเสี่ยง (ฝั่งเจ้าหน้าที่)  
* API Route ที่ต้องมี:  
  * /api/analyze — รับรูป ส่งต่อไป Gemini Vision API แล้วส่งผลกลับ  
  * /api/reports — บันทึก/ดึงข้อมูลรายงานจาก Firestore

### **2.2 AI Vision: Gemini API**

* ใช้ Package @google/generative-ai (SDK ทางการของ Google)  
* **ต้องใช้ Free Tier เท่านั้น** — ห้ามเปิด Billing ในโปรเจกต์ Google Cloud นี้ เพราะการเปิด Billing จะทำให้ Free Tier หายไปทันที  
* เก็บ API Key ไว้ใน Environment Variable ชื่อ GEMINI\_API\_KEY ห้าม Hardcode ในโค้ด

### **2.3 Database: Firebase Firestore**

* Collection หลัก: reports

โครงสร้างข้อมูลต่อ 1 Document (ตาม Data Model ใน SRS):  
 {  imageUrl: string,  location: string,  riskLevel: "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก",  riskScore: number,  status: "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว",  createdAt: timestamp}

* 

### **2.4 Hosting: Vercel**

* เชื่อมกับ GitHub Repo แล้ว Deploy อัตโนมัติทุกครั้งที่ Push  
* ต้องตั้งค่า Environment Variable บน Vercel ให้ตรงกับ Local (GEMINI\_API\_KEY, Firebase Config)

---

## **3\. Environment Variables ที่ต้องมี**

สร้างไฟล์ .env.local (ห้าม Commit ขึ้น GitHub เด็ดขาด — ต้องมีใน .gitignore)

GEMINI\_API\_KEY=  
NEXT\_PUBLIC\_FIREBASE\_API\_KEY=  
NEXT\_PUBLIC\_FIREBASE\_PROJECT\_ID=  
NEXT\_PUBLIC\_FIREBASE\_STORAGE\_BUCKET=

---

## **4\. ห้ามใช้ (Explicitly Not Allowed)**

* ห้ามใช้ Database อื่นที่ไม่ใช่ Firestore (เช่น MongoDB, MySQL, Supabase) — เพิ่มความซับซ้อนโดยไม่จำเป็น  
* ห้ามใช้ AI Vision API ตัวอื่น (Claude Vision, GPT Vision) ในโค้ดจริง — มีค่าใช้จ่าย ใช้ได้แค่ตอนทดสอบเทียบผลลัพธ์เท่านั้น  
* ห้ามสร้าง Backend แยกต่างหาก (เช่น Express Server อีกตัว) — Next.js API Route พอสำหรับ Scope นี้  
* ห้ามใช้ CSS Framework อื่นนอกจาก Tailwind (เช่น Bootstrap, Material UI) เพื่อความสอดคล้องของ UI

---

## **5\. คำสั่งเริ่มต้นโปรเจกต์ (สำหรับ Agent อ้างอิง)**

npx create-next-app@latest faotor \--typescript \--tailwind \--app  
cd faotor  
npm install @google/generative-ai firebase


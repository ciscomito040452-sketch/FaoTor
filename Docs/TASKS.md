# **TASKS.md**

### **Task Checklist — โปรเจกต์เฝ้าท่อ (FaoTor) Phase 1 (MVP)**

อ้างอิงจาก `Docs/FaoTor_SRS.md` (FR-101 ถึง FR-106) และ `Docs/UI_UX_SPEC.md` (สี/ฟอนต์/Component ทุกจุด)

**วิธีใช้กับ Cursor:** สั่งให้ทำทีละ Task เท่านั้น อย่าโยนหลาย Task พร้อมกัน เมื่อ Agent ทำ Task หนึ่งเสร็จและทดสอบผ่านแล้ว ค่อยติ๊กเสร็จแล้วไป Task ต่อไป ห้ามข้ามลำดับ เพราะ Task หลังอ้างอิงจาก Task ก่อนหน้า

**หลักการเรื่อง UI:** ทุก Task ที่สร้าง Component หรือหน้าเว็บ ต้องเปิด `Docs/UI_UX_SPEC.md` อ่าน Section ที่ระบุไว้ในแต่ละ Task ก่อนเขียนโค้ด ไม่ใช่ใช้ Default ของ Tailwind เอง

---

## **Task 0 — Setup โปรเจกต์ (ทำก่อนสิ่งอื่นทั้งหมด)**

* \[ \] 0.1 สร้างโปรเจกต์ Next.js ตามคำสั่งใน `Docs/TECH_STACK.md` หมวด 5  
* \[ \] 0.2 สร้างโฟลเดอร์/ไฟล์เปล่าตามโครงสร้างใน `Docs/FOLDER_STRUCTURE.md` (components/, lib/, app/report/, app/dashboard/, app/api/analyze/, app/api/reports/)  
* \[ \] 0.3 สร้าง Firebase Project ใหม่ (ผ่านหน้าเว็บ Firebase Console) เปิดใช้ Firestore \+ Storage  
* \[ \] 0.4 สร้าง Gemini API Key (ผ่าน Google AI Studio — Free Tier)  
* \[ \] 0.5 สร้างไฟล์ `.env.local` ใส่ Key ทั้งหมดตาม `Docs/TECH_STACK.md` หมวด 3  
* \[ \] 0.6 เพิ่ม `.env.local` ลงใน `.gitignore`  
* \[ \] 0.7 เขียน `lib/firebase.ts` เชื่อมต่อ Firebase (Firestore \+ Storage)  
* \[ \] 0.8 เขียน `lib/gemini.ts` เชื่อมต่อ Gemini API Client  
* \[ \] 0.9 รัน `npm run dev` ทดสอบว่าเปิดเว็บ Localhost ได้ ไม่มี Error  
* \[ \] 0.10 ตั้งค่า Design Token ตาม `Docs/UI_UX_SPEC.md`:  
  * เพิ่ม Font `IBM Plex Sans Thai` \+ `Inter` ผ่าน Google Fonts ใน `app/layout.tsx`  
  * เพิ่มสีทั้งหมดในหมวด 1 (Brand Blue, Slate, สีเตือน) ลงใน `tailwind.config.ts` เป็น Custom Color  
  * เพิ่ม Border Radius ตามหมวด 3 ลงใน `tailwind.config.ts`

**เช็คก่อนไป Task ต่อไป:** เปิด `localhost:3000` เห็นหน้าเว็บ Next.js เปล่าๆได้จริง ฟอนต์ภาษาไทยแสดงเป็น IBM Plex Sans Thai (ไม่ใช่ฟอนต์ Default ของเบราว์เซอร์)

---

## **Task 1 — หน้าอัปโหลดรูป (FR-101)**

อ้างอิง Layout จาก `Docs/UI_UX_SPEC.md` หมวด 5.1 และ Component จากหมวด 4.1-4.2

* \[ \] 1.1 สร้าง `components/UploadForm.tsx` — กรอบเลือกรูป (Dashed border สูง 200px ตามหมวด 5.1) \+ Input ตำแหน่ง (สูง 50px, Label อยู่บน ตามหมวด 4.2) \+ ปุ่ม Primary "ส่งรายงาน" (สูง 50px ตามหมวด 4.1)  
* \[ \] 1.2 นำ `UploadForm` ไปใส่ใน `app/report/page.tsx` พร้อม Large Title "รายงานท่อระบายน้ำ" (34px/700 ตามหมวด 2.2)  
* \[ \] 1.3 ทำให้เลือกรูปแล้ว Preview ภาพเต็มกรอบก่อนกดส่งได้

**เช็คก่อนไป Task ต่อไป:** เข้า `/report` เลือกรูปจากมือถือ/คอม แล้วเห็น Preview รูปบนหน้าเว็บได้จริง

---

## **Task 2 — เชื่อม Gemini Vision API (FR-102)**

* \[ \] 2.1 เขียน `app/api/analyze/route.ts` รับรูป (Base64 หรือ File) ส่งไป Gemini Vision API  
* \[ \] 2.2 เขียน Prompt ให้ Gemini ตอบกลับเป็นระดับความเสี่ยง 3 ระดับ: "ปกติ" / "เริ่มอุดตัน" / "อุดตันหนัก" พร้อมคะแนน 0-100  
* \[ \] 2.3 ทดสอบยิง API ด้วยรูปท่อจริง 2-3 รูป (ทั้งรูปสะอาดและรูปอุดตัน) ดูว่าผลลัพธ์สมเหตุสมผล  
* \[ \] 2.4 เชื่อม `UploadForm` ให้เรียก `/api/analyze` ตอนกดปุ่ม "ส่งรายงาน"

**เช็คก่อนไป Task ต่อไป:** อัปโหลดรูปจริง 1 รูป แล้วเห็นผลระดับความเสี่ยงตอบกลับมาบนหน้าเว็บจริง (ไม่ใช่ค่า Mock)

---

## **Task 3 — แสดงผลความเสี่ยงให้ผู้รายงานเห็น (FR-103)**

อ้างอิง Component จาก `Docs/UI_UX_SPEC.md` หมวด 4.3 (Risk Badge คือ Signature Component ของระบบ — ต้องทำตาม Spec เป๊ะๆ ห้ามใช้สีเขียว/เหลือง/แดงแบบทั่วไป)

* \[ \] 3.1 วาดไอคอน SVG "Shield+หยดน้ำ" ขนาด 16px (อ้างอิงทรงจากโลโก้โปรเจกต์) เก็บไว้ใช้ซ้ำ  
* \[ \] 3.2 สร้าง `components/RiskBadge.tsx` — ทรง Pill (`radius: 9999px`) \+ ไอคอนจาก 3.1 \+ Text ตามสี 3 ระดับในหมวด 1.3 (ปกติ \= Slate, เริ่มอุดตัน \= Amber, อุดตันหนัก \= Red)  
* \[ \] 3.3 แสดง `RiskBadge` พร้อม Card แสดง `reason` จาก AI (ตาม Layout ผลลัพธ์ในหมวด 5.1) ทันทีหลัง Gemini วิเคราะห์เสร็จ ในหน้า `/report`

**เช็คก่อนไป Task ต่อไป:** ส่งรูปแล้วเห็น Badge รูปทรง Pill พร้อมไอคอน Shield+หยดน้ำ และสีตรงตามระดับความเสี่ยงจาก Gemini

---

## **Task 4 — บันทึกข้อมูลลง Database (FR-104)**

* \[ \] 4.1 เขียน `lib/firestore.ts` — ฟังก์ชัน `createReport()` บันทึกข้อมูลตาม Data Model ใน SRS  
* \[ \] 4.2 อัปโหลดรูปขึ้น Firebase Storage แล้วเก็บ URL ไว้ใน Firestore (ไม่เก็บไฟล์รูปตรงใน Database)  
* \[ \] 4.3 เขียน `app/api/reports/route.ts` method POST — รับข้อมูลจาก Frontend แล้วเรียก `createReport()`  
* \[ \] 4.4 เชื่อมหน้า `/report` ให้เรียก `/api/reports` (POST) หลังจากได้ผลวิเคราะห์จาก Task 2

**เช็คก่อนไป Task ต่อไป:** ส่งรายงานแล้วเปิด Firebase Console เห็นข้อมูลถูกบันทึกจริงใน Firestore

---

## **Task 5 — หน้า Dashboard แสดงรายการ (FR-105)**

อ้างอิง Component จาก `Docs/UI_UX_SPEC.md` หมวด 4.4 (Stat Card), 4.5 (List Row) และ Layout รวมหมวด 5.2 — **ห้ามทำเป็นตาราง (Table) แบบทั่วไป** ต้องเป็น List Row สไตล์ Apple Settings ตาม Spec

* \[ \] 5.1 เขียน `app/api/reports/route.ts` method GET — ดึงรายการทั้งหมดจาก Firestore เรียงตาม `riskScore` มาก→น้อย  
* \[ \] 5.2 สร้าง `components/StatCard.tsx` — แสดงตัวเลขใหญ่ (Title 1, 28px/600) \+ Label (Caption) ตามหมวด 4.4 **ห้ามใช้กราฟ/โดนัทเด็ดขาด**  
* \[ \] 5.3 สร้าง `components/ReportTable.tsx` (List Row ไม่ใช่ Table) — Thumbnail 48x48px \+ ตำแหน่ง (Headline) \+ Timestamp (Caption) \+ RiskBadge จาก Task 3 \+ Chevron ตามหมวด 4.5  
* \[ \] 5.4 นำ `StatCard` (3 อัน: ทั้งหมด/รอดำเนินการ/อุดตันหนัก) \+ `ReportTable` ไปใส่ใน `app/dashboard/page.tsx` ตาม Layout หมวด 5.2 เรียกข้อมูลจาก `/api/reports` (GET)

**เช็คก่อนไป Task ต่อไป:** เข้า `/dashboard` เห็น Stat Card 3 อันด้านบน \+ List รายการด้านล่างเรียงลำดับความเสี่ยงถูกต้อง ไม่มีกราฟหรือตารางแบบทั่วไป

---

## **Task 6 — เปลี่ยนสถานะผ่าน Detail Sheet (FR-106)**

อ้างอิง Component จาก `Docs/UI_UX_SPEC.md` หมวด 4.6 (Segmented Control) และ Layout Detail Sheet ในหมวด 5.2 — **เปลี่ยนจากปุ่มเดี่ยวเป็น Segmented Control 3 ตัวเลือก** ตาม Spec ล่าสุด ไม่ใช่ปุ่มกดวนแบบเดิม

* \[ \] 6.1 เขียน `app/api/reports/route.ts` method PATCH — อัปเดต `status` ของรายงานตาม id  
* \[ \] 6.2 สร้าง `components/StatusSegmented.tsx` — Segmented Control 3 ช่อง "รอดำเนินการ / กำลังแก้ไข / แก้ไขแล้ว" ตามหมวด 4.6  
* \[ \] 6.3 สร้าง Detail Sheet (เลื่อนขึ้นจากด้านล่างเมื่อกดแถวใน `ReportTable`) แสดงรูปเต็ม \+ ตำแหน่ง \+ RiskBadge \+ `StatusSegmented` \+ ปุ่ม Primary "บันทึก" ตาม Layout หมวด 5.2  
* \[ \] 6.4 เชื่อม Detail Sheet ให้เปิดเมื่อกดแถวใน `ReportTable` และเรียก PATCH ตอนกด "บันทึก"

**เช็คก่อนไป Task ต่อไป:** กดแถวใน Dashboard เปิด Detail Sheet ได้ เปลี่ยน Segmented Control แล้วกดบันทึก สถานะเปลี่ยนจริงและอัปเดตให้เห็นทันทีโดยไม่ต้อง Refresh หน้า

---

## **Task 7 — UI Polish: Empty/Loading/Error State (ตาม UI\_UX\_SPEC หมวด 4.8-4.10)**

Task นี้ทำให้ App "ดูสมบูรณ์" สำหรับถ่ายวิดีโอ ไม่กระทบ Logic หลัก แต่กระทบความน่าเชื่อถือตอน Demo

* \[ \] 7.1 สร้าง Empty State ในหน้า `/dashboard` (ไอคอน Shield+หยดน้ำ สีเทา \+ "ยังไม่มีรายงาน") ตามหมวด 4.8 — แสดงเมื่อยังไม่มีข้อมูลใน Firestore  
* \[ \] 7.2 สร้าง Loading Spinner (สี `blue-500` \+ "กำลังวิเคราะห์ภาพ...") ตามหมวด 4.9 — แสดงระหว่างรอ Gemini ตอบกลับใน Task 2  
* \[ \] 7.3 สร้าง Error Banner (Background สีแดงอ่อนตามหมวด 4.10) แสดงเมื่อ Gemini วิเคราะห์ไม่ได้ (เช่น รูปไม่ชัด) — หายไปเองใน 4 วินาที

**เช็คก่อนไป Task ต่อไป:** ลบข้อมูลทั้งหมดใน Firestore ชั่วคราวแล้วเปิด `/dashboard` ดู Empty State, ลองส่งรูปเบลอๆดู Error Banner, ลองส่งรูปจริงดู Loading Spinner ว่าแสดงถูกจังหวะ

---

## **Task 8 — (Optional) ภาษาไทย/อังกฤษ \+ Dark Mode**

Task นี้เป็น **Nice-to-have** ตาม UI\_UX\_SPEC หมวด 5.3 และ 6 — ทำได้ถ้าเวลาเหลือหลัง Task 7 เท่านั้น ไม่กระทบ Success Criteria หลักใน SRS

* \[ \] 8.1 สร้าง `lib/locales/th.json` และ `lib/locales/en.json` ตามโครงสร้าง Key ในหมวด 6  
* \[ \] 8.2 สร้าง Context ภาษาอย่างง่าย (React Context) ครอบทั้งแอป — **ห้ามเพิ่ม Library ใหม่อย่าง next-intl** ตามกฎในหมวด 6  
* \[ \] 8.3 สร้างหน้า Settings Sheet ตาม Layout หมวด 5.3 (List Row เลือกภาษา \+ สลับ Dark Mode)  
* \[ \] 8.4 ทำ Dark Mode Color ตามตารางหมวด 1.4 ผ่าน Tailwind `dark:` class

**เช็คก่อนไป Task ต่อไป:** กดเปลี่ยนภาษาแล้ว Text ทั้งหน้าเปลี่ยนจริง กดสลับ Dark Mode แล้วสีเปลี่ยนตามตารางหมวด 1.4

---

## **Task 9 — เก็บงานก่อนถ่ายวิดีโอ**

* \[ \] 9.1 Deploy ขึ้น Vercel ให้ได้ URL จริง  
* \[ \] 9.2 ทดสอบทั้ง Flow ตั้งแต่ต้นจนจบผ่าน URL จริง (ไม่ใช่ Localhost) อย่างน้อย 2 รอบ  
* \[ \] 9.3 เช็ค `.env.local` ไม่หลุดขึ้น GitHub (เปิด Repo บนเว็บดูให้แน่ใจ)  
* \[ \] 9.4 ถ่ายวิดีโอ Demo ตาม Success Criteria ใน `Docs/FaoTor_SRS.md` หมวด 7

---

## **หมายเหตุ**

ถ้าเวลาไม่พอ ให้ดูลำดับความสำคัญใน `Docs/AGENT.md` หมวด 6 — **Task 0-6 คือ Core ที่ขาดไม่ได้** ส่วน Task 7 (Empty/Loading/Error State) ควรทำถ้าเวลาเหลือเพราะกระทบความน่าเชื่อถือตอน Demo มาก ส่วน Task 8 (ภาษา/Dark Mode) ตัดออกได้ก่อนโดยไม่กระทบ Success Criteria หลักเลย


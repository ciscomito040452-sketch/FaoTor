# **API\_CONTRACT.md**

### **รูปแบบ Request/Response ของ API ทั้งหมด — โปรเจกต์เฝ้าท่อ (FaoTor)**

ไฟล์นี้คือ "สัญญา" ระหว่าง Frontend กับ Backend — ห้ามเปลี่ยนชื่อ Field หรือโครงสร้างโดยไม่แก้ไฟล์นี้ก่อน เพื่อกันไม่ให้ Frontend กับ Backend ต่อกันไม่ติดเวลา Cursor เขียนคนละรอบ

---

## **1\. POST /api/analyze**

วิเคราะห์ภาพท่อด้วย Gemini Vision API (ยังไม่บันทึกลง Database — แค่วิเคราะห์อย่างเดียว)

### **Request**

{  
  "imageBase64": "string (รูปภาพแบบ Base64)"  
}

### **Response (สำเร็จ — Status 200\)**

{  
  "riskLevel": "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก",  
  "riskScore": 0,  
  "reason": "string (คำอธิบายสั้นๆจาก AI ว่าทำไมให้คะแนนนี้)"  
}

### **Response (ผิดพลาด — Status 400/500)**

{  
  "error": "string (ข้อความอธิบายปัญหา เช่น 'รูปไม่ชัดเจน กรุณาถ่ายใหม่')"  
}

**หมายเหตุ:** riskScore เป็นตัวเลข 0-100 (0 \= ปกติที่สุด, 100 \= อุดตันหนักที่สุด)

---

## **2\. POST /api/reports**

บันทึกรายงานใหม่ลง Firestore (เรียกหลังจากได้ผลจาก /api/analyze แล้ว)

### **Request**

{  
  "imageUrl": "string (URL รูปจาก Firebase Storage ไม่ใช่ Base64)",  
  "location": "string (ชื่อสถานที่/พิกัดที่ผู้ใช้กรอก)",  
  "riskLevel": "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก",  
  "riskScore": 0  
}

### **Response (สำเร็จ — Status 201\)**

{  
  "id": "string (Document ID ที่ Firestore สร้างให้)",  
  "status": "รอดำเนินการ",  
  "createdAt": "string (ISO Timestamp)"  
}

**หมายเหตุ:** status ตอนสร้างใหม่ต้องเป็น "รอดำเนินการ" เสมอ ห้ามให้ Frontend กำหนดค่านี้เอง

---

## **3\. GET /api/reports**

ดึงรายการรายงานทั้งหมด สำหรับหน้า Dashboard

### **Request**

ไม่มี Body (Query Parameter เผื่ออนาคต แต่ Phase 1 ไม่ใช้)

### **Response (สำเร็จ — Status 200\)**

{  
  "reports": \[  
    {  
      "id": "string",  
      "imageUrl": "string",  
      "location": "string",  
      "riskLevel": "ปกติ" | "เริ่มอุดตัน" | "อุดตันหนัก",  
      "riskScore": 0,  
      "status": "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว",  
      "createdAt": "string (ISO Timestamp)"  
    }  
  \]  
}

**หมายเหตุ:** Backend ต้อง Sort ตาม riskScore มาก→น้อยให้เสร็จก่อนส่งกลับ (Frontend ไม่ต้อง Sort เอง)

---

## **4\. PATCH /api/reports**

อัปเดตสถานะของรายงาน (ใช้ตอนกดปุ่มเปลี่ยนสถานะใน Dashboard)

### **Request**

{  
  "id": "string (Document ID ที่จะแก้)",  
  "status": "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว"  
}

### **Response (สำเร็จ — Status 200\)**

{  
  "id": "string",  
  "status": "รอดำเนินการ" | "กำลังแก้ไข" | "แก้ไขแล้ว"  
}

### **Response (ผิดพลาด — Status 404\)**

{  
  "error": "ไม่พบรายงานที่ต้องการแก้ไข"  
}

---

## **5\. กฎรวมของทุก API**

* ทุก Response ที่ Error ต้องมี Field error เป็น string เสมอ (Frontend จะเช็ค Field นี้เพื่อโชว์ข้อความให้ผู้ใช้)  
* ชื่อ Field ทั้งหมดเป็น camelCase เท่านั้น (เช่น riskLevel ไม่ใช่ risk\_level)  
* ค่า riskLevel ต้องเป็น 1 ใน 3 ค่านี้เท่านั้น: "ปกติ", "เริ่มอุดตัน", "อุดตันหนัก" — ห้ามมีค่าอื่น  
* ค่า status ต้องเป็น 1 ใน 3 ค่านี้เท่านั้น: "รอดำเนินการ", "กำลังแก้ไข", "แก้ไขแล้ว"


# React Map Dashboard

แดชบอร์ดแผนที่สำหรับติดตามยานพาหนะและจุดส่งของ แสดงผลบน Google Maps

## Tech Stack

- React 19
- Vite 8
- Ant Design
- google-map-react + Supercluster

## Features

### แผนที่ (Google Maps)
- แสดง map กรุงเทพพร้อม markers 65 จุด (40 ยานพาหนะ + 25 จุดส่งของ)
- Cluster — zoom ออก markers รวมกลุ่มเป็นตัวเลข กดแตกออกได้
- กด marker แสดง popup รายละเอียด (คนขับ, ทะเบียน, ความเร็ว, ที่อยู่ ฯลฯ)
- Animations — pulse สำหรับรถ active, bounce ตอนเลือก, cluster หายใจ

### Sidebar
- ค้นหาด้วยชื่อ, ชื่อคนขับ, ทะเบียน, ที่อยู่
- Filter ตามประเภท (ยานพาหนะ / จุดส่งของ)
- Filter ตามสถานะ (Active, Idle, Offline, Open, Closed)
- กดรายการใน list เพื่อเลือก marker บน map

## Prerequisites

- Node.js 20.19+ หรือ 22.12+ (project นี้มี `.nvmrc` กำหนดไว้ที่ v22.12.0)

ถ้าใช้ nvm สามารถสลับ version ได้ด้วย:

```bash
nvm use
```

## Getting Started

```bash
# ติดตั้ง dependencies
npm install

# รัน dev server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ http://localhost:5173

## Scripts

| คำสั่ง | รายละเอียด |
| --- | --- |
| `npm run dev` | รัน dev server |
| `npm run build` | build สำหรับ production |
| `npm run preview` | preview production build |
| `npm run lint` | ตรวจสอบ code ด้วย ESLint |

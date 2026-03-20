# React Map Dashboard

แดชบอร์ดแผนที่สำหรับติดตามยานพาหนะและจุดส่งของ แสดงผลบน Google Maps

## Tech Stack

- React 19
- Vite 8
- Ant Design
- google-map-react + Supercluster

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

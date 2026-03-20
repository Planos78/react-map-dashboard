const driverNames = [
  "สมชาย ใจดี", "สมหญิง รักดี", "วิชัย สุขสันต์", "ประยุทธ์ เร็วดี", "มานะ ตั้งใจ",
  "สมศรี มั่นคง", "วิทยา ก้าวหน้า", "สุภาพ อ่อนโยน", "กิตติ ฉลาด", "อนันต์ แข็งแรง",
  "พิชัย กล้าหาญ", "สุรีย์ สดใส", "ธนา มั่งมี", "ชัยวัฒน์ รุ่งเรือง", "สมบัติ ดีเลิศ",
  "ปรีชา เก่งกาจ", "วรรณา สวยงาม", "สุชาติ ขยัน", "อรุณ ทองดี", "มนัส สุขใจ",
];

const streets = [
  "ถ.สุขุมวิท", "ถ.สีลม", "ถ.สาทร", "ถ.พระราม 4", "ถ.เพชรบุรี",
  "ถ.รัชดาภิเษก", "ถ.ลาดพร้าว", "ถ.พหลโยธิน", "ถ.วิภาวดี", "ถ.อโศก",
  "ถ.เจริญกรุง", "ถ.เยาวราช", "ถ.ราชดำริ", "ถ.วิทยุ", "ถ.นราธิวาส",
];

const plates = [
  "กข", "คง", "จฉ", "ชซ", "ณด", "ตถ", "ทธ", "นบ", "ปผ", "พฟ",
  "มย", "รล", "วศ", "สห", "อฮ",
];

// Fixed destination locations for routes
const destinations = [
  { lat: 13.7563, lng: 100.5018, name: "เซ็นทรัลเวิลด์" },
  { lat: 13.7469, lng: 100.5349, name: "สยามพารากอน" },
  { lat: 13.7248, lng: 100.4930, name: "ไอคอนสยาม" },
  { lat: 13.7650, lng: 100.5381, name: "จตุจักร" },
  { lat: 13.7200, lng: 100.5200, name: "คลองเตย" },
  { lat: 13.7580, lng: 100.5650, name: "ลาดพร้าว" },
  { lat: 13.7370, lng: 100.5602, name: "อโศก" },
  { lat: 13.7178, lng: 100.5147, name: "สาทร" },
  { lat: 13.7800, lng: 100.5500, name: "บางซื่อ" },
  { lat: 13.6900, lng: 100.5400, name: "บางนา" },
];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateVehicles(count) {
  const categories = ["truck", "van", "motorcycle"];
  const statuses = ["active", "active", "active", "idle", "idle", "offline"];
  const result = [];

  for (let i = 1; i <= count; i++) {
    const cat = randomPick(categories);
    const prefix = cat === "truck" ? "Truck" : cat === "van" ? "Van" : "Bike";
    const status = randomPick(statuses);
    const dest = randomPick(destinations);

    result.push({
      id: i,
      name: `${prefix}-${String(i).padStart(3, "0")}`,
      type: "vehicle",
      category: cat,
      lat: randomBetween(13.68, 13.82),
      lng: randomBetween(100.45, 100.62),
      status,
      speed: status === "active" ? Math.floor(randomBetween(15, 80)) : 0,
      driver: randomPick(driverNames),
      plate: `${randomPick(plates)} ${Math.floor(randomBetween(1000, 9999))}`,
      lastUpdate: "2026-03-21 10:30:00",
      destination: status !== "offline" ? { lat: dest.lat, lng: dest.lng, name: dest.name } : null,
    });
  }
  return result;
}

function generateDeliveryPoints(count, startId) {
  const statuses = ["open", "open", "open", "closed"];
  const result = [];

  for (let i = 0; i < count; i++) {
    const isWarehouse = i < 5;
    const status = randomPick(statuses);

    result.push({
      id: startId + i,
      name: isWarehouse ? `คลังสินค้า ${String.fromCharCode(65 + i)}` : `จุดส่ง ${randomPick(streets).replace("ถ.", "")}${i}`,
      type: "delivery",
      category: isWarehouse ? "warehouse" : "dropoff",
      lat: randomBetween(13.68, 13.82),
      lng: randomBetween(100.45, 100.62),
      status,
      address: `${Math.floor(randomBetween(1, 999))} ${randomPick(streets)} กรุงเทพฯ`,
      contact: `02-${Math.floor(randomBetween(100, 999))}-${Math.floor(randomBetween(1000, 9999))}`,
      packages: status === "open" ? Math.floor(randomBetween(5, 120)) : 0,
    });
  }
  return result;
}

export const vehicles = generateVehicles(40);
export const deliveryPoints = generateDeliveryPoints(25, 1001);
export const allMarkers = [...vehicles, ...deliveryPoints];

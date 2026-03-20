export default function InfoPopup({ item, onClose }) {
  if (!item) return null;

  const isVehicle = item.type === "vehicle";

  return (
    <div className="absolute top-4 right-4 z-20 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      <div
        className={`px-4 py-3 text-white font-semibold flex items-center justify-between ${
          isVehicle ? "bg-indigo-600" : "bg-teal-600"
        }`}
      >
        <span>{item.name}</span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-500 w-20">สถานะ</span>
          <StatusBadge status={item.status} />
        </div>

        {isVehicle ? (
          <>
            <InfoRow label="คนขับ" value={item.driver} />
            <InfoRow label="ทะเบียน" value={item.plate} />
            <InfoRow label="ความเร็ว" value={`${item.speed} km/h`} />
            <InfoRow label="อัพเดท" value={item.lastUpdate} />
          </>
        ) : (
          <>
            <InfoRow label="ที่อยู่" value={item.address} />
            <InfoRow label="ติดต่อ" value={item.contact} />
            <InfoRow label="พัสดุ" value={`${item.packages} ชิ้น`} />
          </>
        )}

        <div className="pt-2 text-xs text-gray-400">
          📍 {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="font-medium text-gray-500 w-20 shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    idle: "bg-yellow-100 text-yellow-700",
    offline: "bg-red-100 text-red-700",
    open: "bg-blue-100 text-blue-700",
    closed: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100"}`}
    >
      {status}
    </span>
  );
}

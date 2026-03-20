export default function Sidebar({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange,
  markers,
  onMarkerClick,
  selectedId,
}) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
        <h1 className="text-xl font-bold text-white">🗺️ Map Dashboard</h1>
        <p className="text-indigo-200 text-sm mt-1">Vehicle & Delivery Tracking</p>
      </div>

      {/* Search */}
      <div className="p-4 space-y-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="🔍 ค้นหา ชื่อ, คนขับ, ทะเบียน..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทั้งหมด</option>
            <option value="vehicle">ยานพาหนะ</option>
            <option value="delivery">จุดส่งของ</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => onFilterStatusChange(e.target.value)}
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="offline">Offline</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Marker List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 text-xs text-gray-500 font-medium px-4">
          แสดง {markers.length} รายการ
        </div>
        {markers.map((item) => (
          <MarkerListItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onClick={() => onMarkerClick(item)}
          />
        ))}
        {markers.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            ไม่พบข้อมูล
          </div>
        )}
      </div>
    </div>
  );
}

const categoryIcons = {
  truck: "🚛",
  van: "🚐",
  motorcycle: "🏍️",
  warehouse: "🏭",
  dropoff: "📦",
};

const statusDot = {
  active: "bg-green-500",
  idle: "bg-yellow-500",
  offline: "bg-red-500",
  open: "bg-blue-500",
  closed: "bg-gray-500",
};

function MarkerListItem({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
        isSelected ? "bg-indigo-50 border-l-4 border-l-indigo-500" : ""
      }`}
    >
      <span className="text-xl">{categoryIcons[item.category] || "📍"}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-gray-800 truncate">
          {item.name}
        </div>
        <div className="text-xs text-gray-500 truncate">
          {item.type === "vehicle" ? item.driver : item.address}
        </div>
      </div>
      <div className={`w-2.5 h-2.5 rounded-full ${statusDot[item.status]}`} />
    </button>
  );
}

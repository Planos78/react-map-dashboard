const statusColors = {
  active: "bg-green-500",
  idle: "bg-yellow-500",
  offline: "bg-red-500",
  open: "bg-blue-500",
  closed: "bg-gray-500",
};

const typeIcons = {
  truck: "🚛",
  van: "🚐",
  motorcycle: "🏍️",
  warehouse: "🏭",
  dropoff: "📦",
};

export default function Marker({ item, onClick, isSelected }) {
  const icon = typeIcons[item.category] || "📍";
  const color = statusColors[item.status] || "bg-gray-400";

  return (
    <div
      className="relative cursor-pointer group"
      onClick={() => onClick(item)}
    >
      <div
        className={`
          flex items-center justify-center
          w-10 h-10 rounded-full
          border-2 border-white shadow-lg
          text-lg
          transition-transform duration-200
          ${isSelected ? "scale-125 ring-2 ring-blue-400" : "hover:scale-110"}
          ${color}
        `}
      >
        {icon}
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 shadow" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {item.name}
      </div>
    </div>
  );
}

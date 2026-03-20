import { useEffect, useState } from "react";

const statusColors = {
  active: "#22c55e",
  idle: "#eab308",
  offline: "#ef4444",
  open: "#3b82f6",
  closed: "#9ca3af",
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
  const color = statusColors[item.status] || "#9ca3af";
  const isActive = item.status === "active";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        position: "relative",
        cursor: "pointer",
        transform: `translate(-50%, -100%) ${mounted ? "scale(1)" : "scale(0)"}`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: isSelected ? 100 : 1,
      }}
    >
      {/* Pulse ring for active vehicles */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 40,
            height: 40,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: color,
            animation: "pulse-ring 2s ease-out infinite",
            opacity: 0.3,
          }}
        />
      )}

      {/* Main marker */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "3px solid #fff",
          boxShadow: isSelected
            ? `0 0 0 4px ${color}, 0 4px 20px rgba(0,0,0,0.4)`
            : "0 2px 12px rgba(0,0,0,0.3)",
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          fontSize: 20,
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isSelected ? "scale(1.3)" : "scale(1)",
          animation: isSelected ? "bounce-marker 0.6s ease" : "none",
        }}
      >
        {icon}
      </div>

      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: 10,
          height: 10,
          background: "#fff",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.15)",
        }}
      />

      {/* Hover label */}
      <div
        className="marker-label"
        style={{
          position: "absolute",
          top: -36,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 6,
          opacity: isSelected ? 1 : 0,
          transition: "opacity 0.2s",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {item.name}
        {item.speed > 0 && ` · ${item.speed} km/h`}
      </div>
    </div>
  );
}

export function ClusterMarker({ count, onClick }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const size = Math.min(70, 40 + Math.log2(count) * 8);
  const color = count > 20 ? "#ef4444" : count > 10 ? "#f59e0b" : "#4f46e5";

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        cursor: "pointer",
        transform: `translate(-50%, -50%) ${mounted ? "scale(1)" : "scale(0)"}`,
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size + 16,
          height: size + 16,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: color,
          opacity: 0.15,
          animation: "cluster-breathe 3s ease-in-out infinite",
        }}
      />

      {/* Inner circle */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          border: "3px solid #fff",
          boxShadow: `0 4px 20px ${color}66`,
          color: "#fff",
          fontWeight: 800,
          fontSize: size > 50 ? 18 : 14,
          letterSpacing: -0.5,
          transition: "transform 0.3s ease",
        }}
      >
        {count}
      </div>
    </div>
  );
}

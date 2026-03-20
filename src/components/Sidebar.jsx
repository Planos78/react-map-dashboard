import { Input, Select, List, Badge, Typography, Space, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const categoryIcons = {
  truck: "🚛",
  van: "🚐",
  motorcycle: "🏍️",
  warehouse: "🏭",
  dropoff: "📦",
};

const statusColors = {
  active: "green",
  idle: "gold",
  offline: "red",
  open: "blue",
  closed: "default",
};

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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#fff",
        }}
      >
        <Title level={4} style={{ margin: 0, color: "#fff" }}>
          🗺️ Map Dashboard
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
          Vehicle & Delivery Tracking
        </Text>
      </div>

      {/* Filters */}
      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <Input
            placeholder="ค้นหา ชื่อ, คนขับ, ทะเบียน..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
          <Space style={{ width: "100%" }}>
            <Select
              value={filterType}
              onChange={onFilterTypeChange}
              style={{ flex: 1, minWidth: 130 }}
              options={[
                { label: "ทั้งหมด", value: "all" },
                { label: "ยานพาหนะ", value: "vehicle" },
                { label: "จุดส่งของ", value: "delivery" },
              ]}
            />
            <Select
              value={filterStatus}
              onChange={onFilterStatusChange}
              style={{ flex: 1, minWidth: 130 }}
              options={[
                { label: "ทุกสถานะ", value: "all" },
                { label: "Active", value: "active" },
                { label: "Idle", value: "idle" },
                { label: "Offline", value: "offline" },
                { label: "Open", value: "open" },
                { label: "Closed", value: "closed" },
              ]}
            />
          </Space>
        </Space>
      </div>

      {/* Count */}
      <div style={{ padding: "8px 16px" }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          แสดง {markers.length} รายการ
        </Text>
      </div>

      {/* Marker List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {markers.length === 0 ? (
          <Empty description="ไม่พบข้อมูล" style={{ marginTop: 40 }} />
        ) : (
          <List
            dataSource={markers}
            renderItem={(item) => (
              <List.Item
                onClick={() => onMarkerClick(item)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: selectedId === item.id ? "#f0f0ff" : "transparent",
                  borderLeft: selectedId === item.id ? "3px solid #4f46e5" : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (selectedId !== item.id) e.currentTarget.style.background = "#fafafa";
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== item.id) e.currentTarget.style.background = "transparent";
                }}
              >
                <List.Item.Meta
                  avatar={
                    <span style={{ fontSize: 22 }}>
                      {categoryIcons[item.category] || "📍"}
                    </span>
                  }
                  title={<Text ellipsis style={{ fontSize: 13 }}>{item.name}</Text>}
                  description={
                    <Text type="secondary" ellipsis style={{ fontSize: 12 }}>
                      {item.type === "vehicle" ? item.driver : item.address}
                    </Text>
                  }
                />
                <Badge color={statusColors[item.status]} />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}

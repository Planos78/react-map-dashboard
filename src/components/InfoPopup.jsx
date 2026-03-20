import { Card, Descriptions, Tag, Button, Divider } from "antd";
import { CloseOutlined, CarOutlined, EnvironmentOutlined, ClockCircleOutlined, DashboardOutlined } from "@ant-design/icons";

const statusConfig = {
  active: { color: "green", label: "Active" },
  idle: { color: "gold", label: "Idle" },
  offline: { color: "red", label: "Offline" },
  open: { color: "blue", label: "Open" },
  closed: { color: "default", label: "Closed" },
};

export default function InfoPopup({ item, onClose, showRoute, onToggleRoute, routeInfo }) {
  if (!item) return null;

  const isVehicle = item.type === "vehicle";
  const status = statusConfig[item.status] || { color: "default", label: item.status };
  const hasDestination = isVehicle && item.destination;

  return (
    <div style={{ position: "absolute", top: 16, right: 16, zIndex: 20, width: 320 }}>
      <Card
        title={item.name}
        size="small"
        extra={
          <Button type="text" icon={<CloseOutlined />} size="small" onClick={onClose} />
        }
        styles={{
          header: {
            background: isVehicle ? "#4f46e5" : "#0d9488",
            color: "#fff",
          },
        }}
      >
        <Descriptions column={1} size="small" colon={false}>
          <Descriptions.Item label="สถานะ">
            <Tag color={status.color}>{status.label}</Tag>
          </Descriptions.Item>

          {isVehicle ? (
            <>
              <Descriptions.Item label="คนขับ">{item.driver}</Descriptions.Item>
              <Descriptions.Item label="ทะเบียน">{item.plate}</Descriptions.Item>
              <Descriptions.Item label="ความเร็ว">{item.speed} km/h</Descriptions.Item>
              <Descriptions.Item label="อัพเดท">{item.lastUpdate}</Descriptions.Item>
            </>
          ) : (
            <>
              <Descriptions.Item label="ที่อยู่">{item.address}</Descriptions.Item>
              <Descriptions.Item label="ติดต่อ">{item.contact}</Descriptions.Item>
              <Descriptions.Item label="พัสดุ">{item.packages} ชิ้น</Descriptions.Item>
            </>
          )}
        </Descriptions>

        {hasDestination && (
          <>
            <Divider style={{ margin: "12px 0" }} />
            <div style={{ marginBottom: 8 }}>
              <EnvironmentOutlined style={{ color: "#4f46e5", marginRight: 6 }} />
              <span style={{ fontSize: 13, color: "#666" }}>
                จุดหมาย: <strong>{item.destination.name}</strong>
              </span>
            </div>
            <Button
              type={showRoute ? "default" : "primary"}
              icon={<CarOutlined />}
              block
              onClick={onToggleRoute}
            >
              {showRoute ? "ซ่อนเส้นทาง" : "แสดงเส้นทาง"}
            </Button>

            {showRoute && routeInfo && (
              <div
                style={{
                  marginTop: 10,
                  padding: 12,
                  background: "linear-gradient(135deg, #f0f0ff, #e8e8ff)",
                  borderRadius: 8,
                  border: "1px solid #d9d9ff",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <DashboardOutlined style={{ color: "#4f46e5", marginRight: 6 }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{routeInfo.distance}</span>
                  </div>
                  <div>
                    <ClockCircleOutlined style={{ color: "#4f46e5", marginRight: 6 }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{routeInfo.duration}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>
          📍 {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
        </div>
      </Card>
    </div>
  );
}

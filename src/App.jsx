import { useState, useMemo } from "react";
import { ConfigProvider, Layout } from "antd";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import { allMarkers } from "./data/mockData";

const { Sider, Content } = Layout;

export default function App() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredMarkers = useMemo(() => {
    return allMarkers.filter((item) => {
      if (filterType !== "all" && item.type !== filterType) return false;
      if (filterStatus !== "all" && item.status !== filterStatus) return false;
      if (search) {
        const q = search.toLowerCase();
        const searchable = [item.name, item.driver, item.plate, item.address]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [search, filterType, filterStatus]);

  const handleMarkerClick = (item) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4f46e5",
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider width={320} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
          <Sidebar
            search={search}
            onSearchChange={setSearch}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            markers={filteredMarkers}
            onMarkerClick={handleMarkerClick}
            selectedId={selectedItem?.id}
          />
        </Sider>
        <Content>
          <MapView
            markers={filteredMarkers}
            selectedItem={selectedItem}
            onMarkerClick={handleMarkerClick}
            onClose={() => setSelectedItem(null)}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import { allMarkers } from "./data/mockData";

export default function App() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredMarkers = useMemo(() => {
    return allMarkers.filter((item) => {
      // Type filter
      if (filterType !== "all" && item.type !== filterType) return false;

      // Status filter
      if (filterStatus !== "all" && item.status !== filterStatus) return false;

      // Search
      if (search) {
        const q = search.toLowerCase();
        const searchable = [
          item.name,
          item.driver,
          item.plate,
          item.address,
        ]
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
    <div className="flex h-screen bg-gray-100">
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
      <MapView
        markers={filteredMarkers}
        selectedItem={selectedItem}
        onMarkerClick={handleMarkerClick}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

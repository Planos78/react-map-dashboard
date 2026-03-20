import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import InfoPopup from "./InfoPopup";

const BANGKOK_CENTER = { lat: 13.7400, lng: 100.5300 };

export default function MapView({ markers, selectedItem, onMarkerClick, onClose }) {
  return (
    <div className="relative flex-1 h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "" }}
        defaultCenter={BANGKOK_CENTER}
        defaultZoom={13}
        options={{
          styles: mapStyles,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
        }}
      >
        {markers.map((item) => (
          <Marker
            key={item.id}
            lat={item.lat}
            lng={item.lng}
            item={item}
            onClick={onMarkerClick}
            isSelected={selectedItem?.id === item.id}
          />
        ))}
      </GoogleMapReact>

      <InfoPopup item={selectedItem} onClose={onClose} />

      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <div className="absolute bottom-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-sm shadow">
          ⚠️ ยังไม่ได้ตั้ง VITE_GOOGLE_MAPS_API_KEY ใน .env — Map อาจแสดงไม่ครบ
        </div>
      )}
    </div>
  );
}

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

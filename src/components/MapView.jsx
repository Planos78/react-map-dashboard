import { useState, useRef, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Marker, { ClusterMarker } from "./Marker";
import InfoPopup from "./InfoPopup";
import { Alert } from "antd";

const BANGKOK_CENTER = { lat: 13.74, lng: 100.53 };

export default function MapView({ markers, selectedItem, onMarkerClick, onClose }) {
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(13);
  const [bounds, setBounds] = useState(null);

  const points = markers.map((item) => ({
    type: "Feature",
    properties: { cluster: false, item },
    geometry: { type: "Point", coordinates: [item.lng, item.lat] },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 80, maxZoom: 17 },
  });

  const handleChange = useCallback(({ zoom: z, bounds: b }) => {
    setZoom(z);
    setBounds([b.nw.lng, b.se.lat, b.se.lng, b.nw.lat]);
  }, []);

  const handleClusterClick = useCallback((clusterId, lat, lng) => {
    if (!supercluster || !mapRef.current) return;
    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(clusterId), 20);
    mapRef.current.setZoom(expansionZoom);
    mapRef.current.panTo({ lat, lng });
  }, [supercluster]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={BANGKOK_CENTER}
        defaultZoom={13}
        onChange={handleChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => { mapRef.current = map; }}
        options={{
          styles: mapStyles,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: count } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                lat={lat}
                lng={lng}
                count={count}
                onClick={() => handleClusterClick(cluster.id, lat, lng)}
              />
            );
          }

          const item = cluster.properties.item;
          return (
            <Marker
              key={item.id}
              lat={lat}
              lng={lng}
              item={item}
              onClick={onMarkerClick}
              isSelected={selectedItem?.id === item.id}
            />
          );
        })}
      </GoogleMapReact>

      <InfoPopup item={selectedItem} onClose={onClose} />

      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 10 }}>
          <Alert
            message="ยังไม่ได้ตั้ง VITE_GOOGLE_MAPS_API_KEY ใน .env — Map อาจแสดงไม่ครบ"
            type="warning"
            showIcon
          />
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

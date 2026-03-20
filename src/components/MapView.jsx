import { useState, useRef, useCallback, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import Marker, { ClusterMarker } from "./Marker";
import InfoPopup from "./InfoPopup";
import { Alert } from "antd";

const BANGKOK_CENTER = { lat: 13.74, lng: 100.53 };

export default function MapView({
  markers,
  selectedItem,
  onMarkerClick,
  onClose,
  showRoute,
  onToggleRoute,
}) {
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [zoom, setZoom] = useState(13);
  const [bounds, setBounds] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

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

  const handleClusterClick = useCallback(
    (clusterId, lat, lng) => {
      if (!supercluster || !mapRef.current) return;
      const expansionZoom = Math.min(
        supercluster.getClusterExpansionZoom(clusterId),
        20
      );
      mapRef.current.setZoom(expansionZoom);
      mapRef.current.panTo({ lat, lng });
    },
    [supercluster]
  );

  // Draw / clear route
  useEffect(() => {
    if (!mapRef.current || !mapsRef.current) return;

    const maps = mapsRef.current;

    // Clear previous route
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
      setRouteInfo(null);
    }

    if (!showRoute || !selectedItem?.destination) return;

    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#4f46e5",
        strokeWeight: 5,
        strokeOpacity: 0,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1",
              strokeOpacity: 1,
              strokeWeight: 4,
              scale: 4,
            },
            offset: "0",
            repeat: "20px",
          },
          {
            icon: {
              path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
              strokeOpacity: 1,
              strokeColor: "#4f46e5",
              fillColor: "#4f46e5",
              fillOpacity: 1,
              scale: 3,
            },
            offset: "50%",
            repeat: "200px",
          },
        ],
      },
    });

    directionsRenderer.setMap(mapRef.current);
    directionsRendererRef.current = directionsRenderer;

    directionsService.route(
      {
        origin: { lat: selectedItem.lat, lng: selectedItem.lng },
        destination: {
          lat: selectedItem.destination.lat,
          lng: selectedItem.destination.lng,
        },
        travelMode: maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          const leg = result.routes[0].legs[0];
          setRouteInfo({
            distance: leg.distance.text,
            duration: leg.duration.text,
            destName: selectedItem.destination.name,
          });

          // Animate dashes
          let count = 0;
          const interval = setInterval(() => {
            count += 1;
            const icons = directionsRenderer.get("directions")?.routes?.[0];
            if (!icons) {
              clearInterval(interval);
              return;
            }
            directionsRenderer.setOptions({
              polylineOptions: {
                strokeOpacity: 0,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      strokeWeight: 4,
                      scale: 4,
                    },
                    offset: (count % 20) + "px",
                    repeat: "20px",
                  },
                  {
                    icon: {
                      path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      strokeOpacity: 1,
                      strokeColor: "#4f46e5",
                      fillColor: "#4f46e5",
                      fillOpacity: 1,
                      scale: 3,
                    },
                    offset: "50%",
                    repeat: "200px",
                  },
                ],
              },
            });
          }, 80);

          // Store interval for cleanup
          directionsRenderer._animInterval = interval;

          // Fit bounds
          const b = result.routes[0].bounds;
          mapRef.current.fitBounds(b, { top: 80, bottom: 80, left: 80, right: 400 });
        }
      }
    );

    return () => {
      if (directionsRendererRef.current?._animInterval) {
        clearInterval(directionsRendererRef.current._animInterval);
      }
    };
  }, [showRoute, selectedItem]);

  const handleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    mapsRef.current = maps;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={BANGKOK_CENTER}
        defaultZoom={13}
        onChange={handleChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        options={{
          styles: mapStyles,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: count,
          } = cluster.properties;

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

      <InfoPopup
        item={selectedItem}
        onClose={onClose}
        showRoute={showRoute}
        onToggleRoute={onToggleRoute}
        routeInfo={routeInfo}
      />

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

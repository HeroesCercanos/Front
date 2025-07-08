
"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapSelectorProps {
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const LocationMarker = ({ onSelectLocation }: MapSelectorProps) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelectLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position === null ? null : <Marker position={position} icon={customIcon} />;
};

const MapSelector = ({ onSelectLocation }: MapSelectorProps) => {
  return (
    <MapContainer
      center={[-38.4161, -63.6167]} // Argentina
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelectLocation={onSelectLocation} />
    </MapContainer>
  );
};

export default MapSelector;



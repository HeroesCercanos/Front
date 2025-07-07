"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Icono personalizado para el marcador (opcional)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapSelectorProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const LocationMarker = ({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
};

export const MapSelector = ({ onLocationSelect }: MapSelectorProps) => {
  return (
    <div className="h-60 w-full rounded overflow-hidden border border-gray-300">
      <MapContainer center={[-30.2534, -57.6362]} zoom={14} scrollWheelZoom={true} className="h-full w-full z-0">

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

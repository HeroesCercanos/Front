"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapSelectorProps {
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const defaultPosition = { lat: -30.2531, lng: -57.6362 }; // Monte Caseros

const MapSelector = ({ onSelectLocation }: MapSelectorProps) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>(defaultPosition);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        onSelectLocation(coords);
      },
      (err) => {
        console.error("No se pudo obtener la ubicación del usuario", err);
        onSelectLocation(defaultPosition);
      }
    );
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(coords);
        onSelectLocation(coords);
      },
    });

    return (
      <Marker position={[position.lat, position.lng]} icon={customIcon} />
    );
  };

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapSelector;







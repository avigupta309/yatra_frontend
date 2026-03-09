/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { BusInfo } from "../../types";
import React, { useEffect } from "react";

interface mapCoordinatedProps {
  busFeatures: BusInfo | null;
}
// Fix default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const Map: React.FC<mapCoordinatedProps> = ({
  busFeatures,
}: mapCoordinatedProps) => {
  const position: [number, number] =
    busFeatures?.lattitude && busFeatures?.longititude
      ? [busFeatures.lattitude, busFeatures.longititude]
      : [1, 2];
  console.log(busFeatures?.lattitude, busFeatures?.longititude);

  return (
    <div className="h-96 w-full p-2 bg-gray-300 shadow-md rounded-lg">
      {" "}
      <MapContainer
        className="h-full w-full rounded-lg"
        center={position}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={position} />
        <Marker position={position}>
          <Popup>
            <div className="text-blue-600 font-bold text-lg">City Express</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

function RecenterMap({ center }: { center: [number, number]}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default Map;

import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface coordinatesProps {
  latitude: number;
  longitude: number;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<coordinatesProps>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchLatLng() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/mobile/reveiveLatLng",
          { params: { id } },
        );
        setCoordinates(response.data);
      } catch (error) {
        console.log("cannot get latlng");
      }
    }
    // setInterval(fetchLatLng, 3000);
    fetchLatLng();
  }, [id]);
  const position: [number, number] =
    coordinates?.latitude && coordinates?.longitude
      ? [coordinates.latitude, coordinates.longitude]
      : [27.7172, 85.324];

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

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default Map;

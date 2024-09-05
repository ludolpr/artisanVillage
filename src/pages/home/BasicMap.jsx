import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Icônes personnalisées (commentées pour l'instant)
// const escapeIcon = new L.Icon({
//   iconUrl: require("../images/pingEscapeGame2.png"),
//   iconSize: [41, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   shadowSize: [41, 41],
// });

// const aroundIcon = new L.Icon({
//   iconUrl: require("../images/pingAround2.png"),
//   iconSize: [41, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
//   shadowSize: [41, 41],
// });

const BasicMap = () => {
  const [center, setCenter] = React.useState({ lat: 48.005417, lng: 0.201853 });
  const ZOOM_LEVEL = 10.2;

  return (
    <div>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{
          height: "550px",
          width: "750px",
          border: "2px",
          borderRadius: "150px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      </MapContainer>
    </div>
  );
};

export default BasicMap;

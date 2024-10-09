import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { api } from "../../services/baseUrl";
import { useNavigate } from "react-router-dom";

// Icônes personnalisées
const artisanIcon = new L.Icon({
  iconUrl: require("../../assets/images/pingEscapeGame2.png"),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const BasicMap = () => {
  const [center, setCenter] = React.useState({ lat: 48.005417, lng: 0.201853 });
  const ZOOM_LEVEL = 10.2;
  const [error, setError] = React.useState(null);
  const [artisans, setArtisans] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArtisans = () => {
      api
        .get("/company")
        .then((response) => {
          setArtisans(response.data);
          setError("");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des artisans:", error);
          setError("Erreur lors de la récupération des artisans.");
        });
    };

    fetchArtisans();
  }, []);

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
        {artisans.map((artisan) => (
          <Marker
            key={artisan.id}
            position={[artisan.lat, artisan.long]}
            icon={artisanIcon}
          >
            <Popup>
              <div className="p-2 rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  {/* Image de l'entreprise */}
                  <img
                    src={`http://127.0.0.1:8000/storage/uploads/companies/${artisan.picture_company}`}
                    alt={artisan.name_company}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  {/* Nom de l'entreprise */}
                </div>
                <h3
                  className=" font-bold cursor-pointer"
                  onClick={() => navigate(`/showsheet/${artisan.id}`)}
                >
                  {artisan.name_company}
                </h3>
                <p className="">{artisan.description}</p>
                <div className=" text-gray-600 mt-2">
                  <span className="font-semibold">Adresse:</span>{" "}
                  {artisan.address}
                </div>
                <div className=" text-gray-600">
                  <span className="font-semibold">Contact:</span>{" "}
                  {artisan.phone}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BasicMap;

import React, { useState, useEffect, useContext } from "react";
import { api } from "../../services/baseUrl";
import { ThemeContext } from "../../hooks/ThemeContext";
import { useNavigate } from "react-router-dom";

const MidContainer = () => {
  const [latestFiches, setLatestFiches] = useState([]);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestFiches = () => {
      api
        .get("/company/latestid")
        .then((response) => {
          // Assurez-vous d'afficher uniquement les deux derniers posts
          setLatestFiches(response.data.slice(0, 2));
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des fiches:", error);
        });
    };

    fetchLatestFiches();
  }, []);

  return (
    <div className="relative imgMidContainer h-full bg-fixed bg-cover bg-center  flex flex-col items-center py-12 px-4 lg:px-8 space-y-8">
      <h2 className="card1  opacity-80  mt-10 text-center py-4 bg-opacity-80  p-6 rounded-lg shadow-md">
        Découvrez les talents locaux, trouvez l'artisan créatif près de chez
        vous.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mt-8">
        {latestFiches.map((fiche, index) => (
          <div
            key={fiche.id}
            className={`shadow-xl rounded-lg p-6  col  ${
              index % 2 === 0 ? "gradient3" : "gradient2"
            }`}
          >
            <h3
              className="  mb-4 font-bold cursor-pointer"
              onClick={() => navigate(`/showsheet/${fiche.id}`)}
            >
              {fiche.name_company}
            </h3>
            <p className="  mb-10">{fiche.description_company}</p>
            <img
              src={`https://api.artisanvillage.fr/storage/uploads/companies/${fiche.picture_company}`}
              alt={fiche.name_company}
              className="w-full h-48 lg:h-64 flex-col p-2 object-cover rounded-lg shadow-lg "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MidContainer;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import artisanPlaceholder from "../../assets/images/worker1.jpg";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";

const Index = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const { user, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company");
        setArtisans(response.data || []);
        setError("");
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Error fetching companies.");
      }
    };

    fetchCompanies();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artisan?")) {
      return;
    }

    try {
      await api.delete(`/company/${id}`);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting artisan:", error);
      setError("Error deleting artisan.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-[#9a7d6b] mb-8">
          Liste des Artisans
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.length > 0 ? (
            artisans.map((artisan) => (
              <div
                key={artisan.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={
                    artisan.picture_company
                      ? `http://127.0.0.1:8000/storage/uploads/companies/${artisan.picture_company}`
                      : artisanPlaceholder
                  }
                  alt={artisan.name_company}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Link to={`/showsheet/${artisan.id}`}>
                    <h3 className="text-xl font-bold text-[#9a7d6b] mb-2 hover:underline">
                      {artisan.name_company}
                    </h3>
                  </Link>
                  <p className="text-gray-700 mb-4">
                    {artisan.description_company}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      {artisan.zipcode}, {artisan.town}
                    </p>
                  </div>
                  {isAuthenticated && user.id === artisan.user_id && (
                    <div className="flex justify-end mt-4">
                      <Link
                        to={`/edit/${artisan.id}`}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        Edition
                      </Link>
                      <button
                        onClick={() => handleDelete(artisan.id)}
                        className="text-red-500 hover:underline"
                      >
                        Suppression
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Pas de données</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

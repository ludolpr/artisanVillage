import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artisanPlaceholder from "../../assets/images/worker1.jpg";

const Index = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    // Simulez la récupération des données des artisans
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          name_company: "Artisan A",
          description_company: "Expert en menuiserie et charpenterie.",
          picture_company: null,
          zipcode: "75001",
          town: "Paris",
        },
        {
          id: 2,
          name_company: "Artisan B",
          description_company: "Créateur de meubles uniques.",
          picture_company: artisanPlaceholder,
          zipcode: "69001",
          town: "Lyon",
        },
      ];
      setArtisans(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-[#9a7d6b] mb-8">
          Liste des artisans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={artisan.picture_company || artisanPlaceholder}
                alt={artisan.name_company}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <Link to={`/artisan/${artisan.id}`}>
                  <h3 className="text-xl font-bold text-[#9a7d6b] mb-2 hover:underline">
                    {artisan.name_company}
                  </h3>
                </Link>
                <p className="text-gray-700 mb-4">
                  {artisan.description_company}
                </p>
                <div className="text-sm text-gray-500">
                  <p>
                    {artisan.zipcode}, {artisan.town}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

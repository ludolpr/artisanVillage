import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import artisanPlaceholder from "../../assets/images/worker1.jpg";
import productPlaceholder from "../../assets/images/products.jpg";

const Products = () => {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simuler la récupération des données de l'artisan et de ses produits
    const fetchArtisanData = async () => {
      // Exemple de données simulées
      const artisanData = {
        id: id,
        name_company: "Artisan A",
        description_company: "Expert en menuiserie et charpenterie.",
        picture_company: artisanPlaceholder,
        zipcode: "75001",
        town: "Paris",
      };

      const productData = [
        {
          id: 1,
          name_product: "Table en bois",
          picture_product: productPlaceholder,
          price: 299.99,
          description_product: "Table en bois massif fait main.",
          id_company: id,
          id_category: 1,
        },
        {
          id: 2,
          name_product: "Chaise design",
          picture_product: productPlaceholder,
          price: 149.99,
          description_product: "Chaise design avec assise confortable.",
          id_company: id,
          id_category: 1,
        },
      ];

      setArtisan(artisanData);
      setProducts(productData);
    };

    fetchArtisanData();
  }, [id]);

  if (!artisan) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="w-full max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <img
            src={artisan.picture_company || artisanPlaceholder}
            alt={artisan.name_company}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-[#9a7d6b] mb-4">
              {artisan.name_company}
            </h2>
            <p className="text-gray-700 mb-6">{artisan.description_company}</p>
            <div className="text-sm text-gray-500">
              <p>
                {artisan.zipcode}, {artisan.town}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#9a7d6b] mb-4">Produits</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.picture_product || productPlaceholder}
                alt={product.name_product}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold text-[#9a7d6b] mb-2">
                  {product.name_product}
                </h4>
                <p className="text-gray-700 mb-4">
                  {product.description_product}
                </p>
                <div className="text-sm text-gray-500">
                  <p>Prix: {product.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

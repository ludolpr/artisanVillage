import React, { useState, useEffect } from "react";
import { api } from "../../services/baseUrl";
import LoadingSpinner from "../../components/globals/LoadingSpinner";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = ({ userId }) => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyProduct = async () => {
      try {
        const companyResponse = await api.get(`/company/${id}`);
        setCompany(companyResponse.data);

        const productResponse = await api.get("/product");
        const filteredProducts = productResponse.data.filter(
          (product) => product.id_company === companyResponse.data.id
        );
        setProducts(filteredProducts);

        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProduct();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (products.length === 0) {
    return <p className="text-center">Pas de produit trouvé</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {products.length > 1 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 transition-transform transform hover:scale-105"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/uploads/products/${product.picture_product}`}
                  alt={product.name_product}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    Nom du produit: {product.name_product}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Description: {product.description_product}
                  </p>
                  <p className="text-md font-bold text-gray-600">
                    {product.price} €
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div
          key={products[0].id}
          className="p-4 transition-transform transform hover:scale-105"
        >
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/storage/uploads/products/${products[0].picture_product}`}
              alt={products[0].name_product}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {products[0].name_product}
              </h3>
              <p className="text-sm text-gray-500">
                {products[0].description_product}
              </p>
              <p className="text-md font-bold text-gray-600">
                {products[0].price} €
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

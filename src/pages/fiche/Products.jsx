import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../../services/baseUrl";
import productPlaceholder from "../../assets/images/products.jpg";
import addProductImage from "../../assets/images/addproduct.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../../hooks/UserContext";
import Modal from "react-modal";

const Products = ({ userId }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFiche, setHasFiche] = useState(false);
  const [ficheId, setFicheId] = useState(null);
  const { user, isAuthenticated } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name_product: "",
    picture_product: "",
    price: "",
    description_product: "",
    id_category: "",
  });

  useEffect(() => {
    const fetchCategories = () => {
      api.get("/category").then((response) => {
        setCategories(response.data);
      });
    };

    fetchCategories();
  }, []);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      // Ne prend que le premier fichier si plusieurs sont sélectionnés
      picture_product: e.target.files[0],
    });
  };
  const handleCategoryChange = (e) => {
    setNewProduct((prev) => ({ ...prev, id_category: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...newProduct, id_company: ficheId };
    // Add logic to send `productData` to the backend API
    console.log("Submitting product:", productData);
    handleModalClose(); // Close the modal after submission
  };

  useEffect(() => {
    const fetchUserFiche = () => {
      if (isAuthenticated && user && user.id) {
        api
          .get("/company")
          .then((response) => {
            const companies = response.data;
            const userFiche = companies.find(
              (company) => company.id_user === user.id
            );

            if (userFiche) {
              setFicheId(userFiche.id);
              setHasFiche(true);
            } else {
              setHasFiche(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching company data:", error);
            setHasFiche(false);
          });
      }
    };

    fetchUserFiche();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchArtisanProducts = () => {
      api
        .get(`/product/${id}`)
        .then((response) => {
          const productData = response.data.map((product) => ({
            name_product: product.name_product,
            picture_product: product.picture_product || productPlaceholder,
            price: product.price,
            description_product: product.description_product,
            id_category: product.id_category,
            category_name: product.category.name_category,
            id_company: product.id_company,
          }));
          setProducts(productData);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    fetchArtisanProducts();
  }, [id, userId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    focusOnSelect: true,
    pauseOnFocus: true,
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-[#f5f5f5] p-4 w-full">
      {hasFiche && (
        <img
          src={addProductImage}
          alt="Ajouter un produit"
          className="cursor-pointer w-16 h-auto rounded-lg shadow-lg"
          onClick={handleAddProductClick}
        />
      )}

      {/* Modal for adding a product */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Ajouter un produit"
        className="modal-container fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du produit:
              </label>
              <input
                type="text"
                name="name_product"
                value={newProduct.name_product}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description_product"
                value={newProduct.description_product}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo du produit:
              </label>
              <input
                type="file"
                name="picture_product"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select
                name="id_category"
                value={newProduct.id_category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name_category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix en euros:
              </label>
              <input
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Ajouter
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={handleModalClose}
              >
                Fermer
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Right side: Carousel to display products */}
      <div className="w-full lg:w-3/4">
        <h3 className="text-2xl font-bold text-[#9a7d6b] mb-4 text-center">
          Produits
        </h3>

        {products.length > 0 ? (
          <Slider {...settings}>
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={product.picture_product}
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
                    <p>Catégorie: {product.category_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-lg text-center text-gray-500">
            Aucun produit disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;

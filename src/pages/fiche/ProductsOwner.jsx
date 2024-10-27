import React, { useState, useEffect } from "react";
import { api } from "../../services/baseUrl";
import { FaEdit, FaTrashAlt, FaFilter } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import addProduct from "../../assets/images/addproduct.jpg";
import AddProductForm from "./AddProductForm";

const ProductsOwner = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyResponse = await api.get(`/company/${id}`);
        setCompany(companyResponse.data);

        const productstagsResponse = await api.get(`/productstags`);
        const filteredProducts = productstagsResponse.data.data.filter(
          (product) => product.id_company === companyResponse.data.id
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching company or products:", error);
        setError("Erreur lors du chargement des données.");
      }
    };

    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.get("/category"),
          api.get("/tag"),
        ]);
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Error fetching categories or tags:", error);
      }
    };

    fetchCompanyData();
    fetchCategoriesAndTags();
  }, [id]);

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`, {
      state: { categories, tags, idCompany: company.id },
    });
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await api.delete(`/product/${productId}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Erreur lors de la suppression du produit.");
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      !selectedCategory || product.id_category === Number(selectedCategory);
    const isTagMatch =
      !selectedTag ||
      (Array.isArray(product.tags) &&
        product.tags.some((tag) => tag.id === Number(selectedTag)));
    return isCategoryMatch && isTagMatch;
  });

  return (
    <div className="gradient w-full max-w-6xl mx-auto mt-10">
      <div className="card1 flex justify-between items-center p-4  shadow-md">
        <img
          src={addProduct}
          alt="Ajouter un produit"
          className="m-4  cursor-pointer w-16 h-auto rounded-lg shadow-lg"
          onClick={() => setShowAddProductForm(true)}
        />
        <h2 className=" font-bold ">Liste des produits</h2>
        <div className="flex items-center space-x-2">
          <FaFilter className="" />
          <select
            className=" border-2   rounded-lg p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category}
              </option>
            ))}
          </select>
          <select
            className=" border-2   rounded-lg p-2"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name_tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card1 mb-2  mt-2 flex justify-between items-center p-4 border-t-2 "
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://api.artisanvillage.fr/storage/uploads/products/${product.picture_product}`}
                  alt={product.name_product}
                  className="w-16 h-16 object-cover border-2  rounded-lg"
                />
                <div>
                  <span className=" ">
                    Nom du produit: {product.name_product}
                  </span>
                  <span className="block  ">
                    Description: {product.description_product}
                  </span>
                  <div className="mt-2">
                    <span className="  font-semibold">Tags: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="card2  px-2 py-1 rounded-full "
                        >
                          {tag.name_tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className=" p-2 rounded-lg button3"
                  onClick={() => handleEdit(product.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className=" p-2 rounded-lg button3"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center ">Pas de produits trouvés</p>
        )}
      </div>

      {showAddProductForm && company && (
        <AddProductForm
          categories={categories}
          tags={tags}
          idCompany={company.id}
          onClose={() => setShowAddProductForm(false)}
          onSave={(newProduct) => {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setShowAddProductForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductsOwner;

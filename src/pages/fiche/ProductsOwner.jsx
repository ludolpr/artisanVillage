import React, { useState, useEffect } from "react";
import { api } from "../../services/baseUrl";
import { FaEdit, FaTrashAlt, FaFilter } from "react-icons/fa";
import EditProductOwner from "./EditProductOwner";
import addProduct from "../../assets/images/addproduct.jpg";
import AddProductForm from "./AddProductForm";
import { useParams } from "react-router-dom";

const ProductsOwner = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  // id fetch from params in url
  const { id } = useParams();

  useEffect(() => {
    // Fetch company details and products
    const fetchCompanyData = async () => {
      try {
        const companyResponse = await api.get(`/company/${id}`);
        setCompany(companyResponse.data);

        const productstagsResponse = await api.get("/productstags");
        // console.log(
        //   "productstagsResponse:",
        //   productstagsResponse.data.data,
        //   "test de console log pour récupérer les tags associés aux produits"
        // );

        // Assuming each product has a 'tags' property which is an array of tags
        productstagsResponse.data.data.forEach((product) => {
          console.log(
            `Product: ${product.name_product}, Tags: ${product.tags.join(", ")}`
          );
        });

        const filteredProducts = productstagsResponse.data.data.filter(
          (product) => product.id_company === companyResponse.data.id
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching company or products:", error);
        setError("Erreur lors du chargement des données.");
      }
    };

    // Fetch categories and tags
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

  const handleEdit = (product) => {
    setEditingProduct(product);
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

  // Filter products by category or tag
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
    <div className="w-full max-w-6xl mx-auto mt-10">
      {/* Header with Filter */}
      <div className="flex justify-between items-center p-4 bg-white border-2 border-[#9a7d6b] shadow-md">
        {/* Add Product Button */}
        <img
          src={addProduct}
          alt="Ajouter un produit"
          className="m-4 cursor-pointer w-16 h-auto rounded-lg shadow-lg"
          onClick={() => setShowAddProductForm(true)}
        />
        <h2 className="text-2xl font-bold text-[#9a7d6b]">
          Liste des produits
        </h2>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-[#9a7d6b]" />
          <select
            className="bg-white border-2 border-[#9a7d6b] text-[#9a7d6b] rounded-lg p-2"
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
            className="bg-white border-2 border-[#9a7d6b] text-[#9a7d6b] rounded-lg p-2"
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

      {/* Product List */}
      <div className="bg-white border-2 border-[#9a7d6b] shadow-md mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 border-t-2 border-[#9a7d6b]"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://127.0.0.1:8000/storage/uploads/products/${product.picture_product}`}
                  alt={product.name_product}
                  className="w-16 h-16 object-cover border-2 border-[#9a7d6b] rounded-lg"
                />
                {/* <div>
                  <span className="text-lg text-[#9a7d6b]">
                    Nom du produit: {product.name_product}
                  </span>
                  <span className="block text-lg text-[#9a7d6b]">
                    Description: {product.description_product}
                  </span>
                </div> */}
                <div>
                  <span className="text-lg text-[#9a7d6b]">
                    Nom du produit: {product.name_product}
                  </span>
                  <span className="block text-lg text-[#9a7d6b]">
                    Description: {product.description_product}
                  </span>
                  <div className="mt-2">
                    <span className="text-sm text-[#9a7d6b] font-semibold">
                      Tags:{" "}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-gray-200 text-[#9a7d6b] px-2 py-1 rounded-full text-xs"
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
                  className="bg-[#d9b99b] hover:bg-[#9a7d6b] text-white p-2 rounded-lg"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-[#d9b99b] hover:bg-[#9a7d6b] text-white p-2 rounded-lg"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-[#9a7d6b]">
            Pas de produits trouvés
          </p>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductOwner
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updatedProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            setEditingProduct(null);
          }}
        />
      )}

      {/* Add Product Form */}
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

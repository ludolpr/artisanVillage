import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";

const ProductList = ({ refreshKey }) => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name_product: "",
    picture_product: null,
    price: "",
    description_product: "",
    id_category: "",
    id_company: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        setProducts(response.data || []);
      } catch (error) {
        setError("Erreur lors de la récupération des produits.");
      }
    };
    fetchProducts();
  }, [refreshKey]);

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormData({ ...product });
    setPreviewImage(
      `https://api.artisanvillage.fr/storage/uploads/products/${product.picture_product}`
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, picture_product: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveEdit = async (productId) => {
    try {
      const updateFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        updateFormData.append(key, value);
      });
      updateFormData.append("_method", "PUT");

      await api.post(`/product/${productId}`, updateFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...formData } : product
        )
      );
      setEditingProductId(null);
      setSuccessMessage("Produit modifié avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification du produit."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setFormData({
      name_product: "",
      picture_product: null,
      price: "",
      description_product: "",
      id_category: "",
      id_company: "",
    });
    setPreviewImage(null);
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/product/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setSuccessMessage("Produit supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression du produit."
      );
    }
  };

  return (
    <div className="card1 p-6 rounded-lg shadow-md">
      <h2 className="font-bold mb-4">Liste des produits</h2>
      {error && <div className="decline p-4 rounded mb-4">{error}</div>}
      {successMessage && (
        <div className="added p-4 rounded mb-4">{successMessage}</div>
      )}
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product.id}
              className="card2 mb-2 p-4 rounded flex items-center justify-between"
            >
              {editingProductId === product.id ? (
                <EditingProductForm
                  formData={formData}
                  previewImage={previewImage}
                  handleFileChange={handleFileChange}
                  setFormData={setFormData}
                  onSave={() => handleSaveEdit(product.id)}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <ProductItem product={product} />
              )}
              <div className="flex space-x-2">
                {editingProductId === product.id ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleEditClick(product)}
                    className="btn btn-edit"
                  >
                    Editer
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-delete"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Aucun produit trouvé.</li>
        )}
      </ul>
    </div>
  );
};

const EditingProductForm = ({
  formData,
  previewImage,
  handleFileChange,
  setFormData,
  onSave,
  onCancel,
}) => (
  <form className="flex flex-col">
    <input
      type="text"
      name="name_product"
      value={formData.name_product}
      onChange={(e) =>
        setFormData({ ...formData, name_product: e.target.value })
      }
      className="border p-2 rounded mb-2"
      placeholder="Nom du produit"
    />
    <textarea
      name="description_product"
      value={formData.description_product}
      onChange={(e) =>
        setFormData({ ...formData, description_product: e.target.value })
      }
      className="border p-2 rounded mb-2"
      placeholder="Description"
    />
    <input type="file" onChange={handleFileChange} className="mb-2" />
    {previewImage && <img src={previewImage} alt="Preview" className="mb-2" />}
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      className="border p-2 rounded mb-2"
      placeholder="Prix"
    />
    <button type="button" onClick={onSave} className="btn btn-save">
      Enregistrer
    </button>
    <button type="button" onClick={onCancel} className="btn btn-cance mt-2">
      Annuler
    </button>
  </form>
);

const ProductItem = ({ product }) => (
  <div>
    <h3>{product.name_product}</h3>
    <p>{product.description_product}</p>
    <p>{product.price} €</p>
    <img
      src={`https://api.artisanvillage.fr/storage/uploads/products/${product.picture_product}`}
      alt={product.name_product}
      className="w-1/2"
    />
  </div>
);

export default ProductList;

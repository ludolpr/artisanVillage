import React, { useState, useEffect } from "react";
import { api } from "../../services/baseUrl";
import { useNavigate, useParams } from "react-router-dom";

const EditProductOwner = ({ categories = [], tags = [], onClose, onSave }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tagFields, setTagFields] = useState([{ value: "" }]);
  const [picture, setPicture] = useState(null);
  const [existingPicture, setExistingPicture] = useState(""); // For displaying current product image

  const navigate = useNavigate();
  const { id } = useParams(); // Assuming `id` is used for fetching product data

  useEffect(() => {
    // Fetch product data when component mounts or id changes
    api
      .get(`/productstags/${id}`)
      .then((response) => {
        const product = response.data;
        console.log("productstags", product.data);

        setNameProduct(product.nameProduct || "");
        setPrice(product.price || "");
        setDescription(product.description_product || "");
        setCategory(product.id_category || "");
        setExistingPicture(product.picture_product || "");

        // Set tags if they exist
        if (product.tags) {
          setTagFields(
            product.tags.map((tag) => ({ value: tag })) || [{ value: "" }]
          );
        } else {
          setTagFields([{ value: "" }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleTagChange = (index, value) => {
    const newTagFields = [...tagFields];
    newTagFields[index].value = value;
    setTagFields(newTagFields);
  };

  const handleAddTagField = () => {
    setTagFields([...tagFields, { value: "" }]);
  };

  const handleRemoveTagField = (index) => {
    const newTagFields = tagFields.filter((_, i) => i !== index);
    setTagFields(newTagFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_product", nameProduct);
    formData.append("price", price);
    formData.append("description_product", description);
    formData.append("id_category", category);
    formData.append("_method", "PUT");
    formData.append("tags", tagFields.map((tag) => tag.value).join(","));
    if (picture) formData.append("picture_product", picture);

    api
      .post(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onSave(response.data);
        navigate(`/`);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 mt-10">Éditer le produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nom du produit</label>
            <input
              type="text"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Prix</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image du produit</label>
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
              className="w-full"
            />
            {existingPicture && (
              <div className="mt-2">
                <img
                  src={existingPicture}
                  alt="Current product"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tags</label>
            {tagFields.map((field, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={field.value}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Sélectionner un tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name_tag}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveTagField(index)}
                  className="ml-2 bg-[#d9b99b] text-white px-2 py-1 rounded-lg"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTagField}
              className="bg-[#d9b99b] text-white px-4 py-2 rounded-lg"
            >
              Ajouter un tag
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#9a7d6b] text-white m-2 px-4 py-2 rounded-lg"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#d9b99b] text-white m-2 px-4 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductOwner;

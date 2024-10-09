import React, { useState } from "react";
import { api } from "../../services/baseUrl";
import { useParams, useNavigate } from "react-router-dom";

const AddProductForm = ({ categories, tags, onClose, onSave, idCompany }) => {
  // Receive idCompany as a prop
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tagFields, setTagFields] = useState([{ value: "" }]);
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
    formData.append("name_product", name);
    formData.append("price", price);
    formData.append("description_product", description);
    formData.append("id_category", category);
    formData.append("tags", tagFields.map((tag) => tag.value).join(","));
    formData.append("picture_product", picture);
    formData.append("id_company", idCompany);

    api
      .post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onSave(response.data);
        navigate(`/`);
      })
      .catch((error) => console.error("Error saving product:", error));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center  bg-gray-700 bg-opacity-50">
      <div className="card1 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className=" font-bold mb-4 mt-10">Ajouter un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nom du produit</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border  rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border  rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2">Prix</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border  rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2">Image du produit</label>
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2"
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
            <label className="block  mb-2">Tags</label>
            {tagFields.map((field, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={field.value}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="w-full border  rounded-lg p-2"
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
                  className="ml-2 bg-[#d9b99b]  px-2 py-1 rounded-lg"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTagField}
              className="bg-[#d9b99b]  px-4 py-2 rounded-lg"
            >
              Ajouter un tag
            </button>
          </div>
          <div className="flex justify-end ">
            <button type="submit" className="  m-2 px-4 py-2 rounded-lg">
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="  m-2 px-4 py-2 rounded-lg mr-2"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

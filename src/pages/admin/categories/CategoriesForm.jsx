import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";

const CategoriesForm = ({ category, onSuccess, mode }) => {
  const [formData, setFormData] = useState({
    name_category: "",
    description_category: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({
        name_category: category.name_category,
        description_category: category.description_category,
      });
    } else {
      setFormData({ name_category: "", description_category: "" });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (mode === "edit" && category) {
        await api.put(`/category/${category.id}`, formData);
        setMessage("Catégorie modifiée avec succès !");
      } else {
        await api.post("/category", formData);
        setMessage("Catégorie ajoutée avec succès !");
      }
      onSuccess();
    } catch (err) {
      console.error("Erreur lors de l'envoi des données:", err);
      setError("Erreur lors de l'envoi des données.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        {mode === "edit"
          ? "Modifier la catégorie"
          : "Créer une nouvelle catégorie"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name_category">
          Nom de la catégorie
        </label>
        <input
          type="text"
          id="name_category"
          name="name_category"
          value={formData.name_category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 mb-2"
          htmlFor="description_category"
        >
          Description de la catégorie
        </label>
        <textarea
          id="description_category"
          name="description_category"
          value={formData.description_category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          rows="3"
        />
      </div>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-[#9a7d6b] text-white px-4 py-2 rounded hover:bg-[#8b6d59]"
      >
        {mode === "edit"
          ? "Sauvegarder les modifications"
          : "Créer la catégorie"}
      </button>
    </form>
  );
};

export default CategoriesForm;

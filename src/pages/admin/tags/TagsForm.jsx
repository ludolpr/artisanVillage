import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";

const TagsForm = ({ tag, onSuccess, mode }) => {
  const [formData, setFormData] = useState({ name_tag: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (tag) {
      setFormData({ name_tag: tag.name_tag });
    } else {
      setFormData({ name_tag: "" });
    }
  }, [tag]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (mode === "edit" && tag) {
        await api.put(`/tag/${tag.id}`, formData);
        setMessage("Tag modifié avec succès !");
      } else {
        await api.post("/tag", formData);
        setMessage("Tag ajouté avec succès !");
      }
      onSuccess();
    } catch (err) {
      console.error("Erreur lors de l'envoi des données:", err);
      setError("Erreur lors de l'envoi des données.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        {mode === "edit" ? "Modifier le tag" : "Créer un nouveau tag"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name_tag">
          Nom du tag
        </label>
        <input
          type="text"
          id="name_tag"
          name="name_tag"
          value={formData.name_tag}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      {message && <div className="added mb-4">{message}</div>}
      {error && <div className="decline mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-[#9a7d6b] text-white px-4 py-2 rounded hover:bg-[#8b6d59]"
      >
        {mode === "edit" ? "Sauvegarder les modifications" : "Créer le tag"}
      </button>
    </form>
  );
};

export default TagsForm;

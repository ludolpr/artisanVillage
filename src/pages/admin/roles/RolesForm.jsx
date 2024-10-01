import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";

const RolesForm = ({ role, onSuccess, mode }) => {
  const [formData, setFormData] = useState({ name_role: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (role) {
      setFormData({ name_role: role.name_role });
    } else {
      setFormData({ name_role: "" });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (mode === "edit" && role) {
        await api.put(`/role/${role.id}`, formData);
        setMessage("Rôle modifié avec succès !");
      } else {
        await api.post("/role", formData);
        setMessage("Rôle ajouté avec succès !");
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
        {mode === "edit" ? "Modifier le rôle" : "Créer un nouveau rôle"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name_role">
          Nom du rôle
        </label>
        <input
          type="text"
          id="name_role"
          name="name_role"
          value={formData.name_role}
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
        {mode === "edit" ? "Sauvegarder les modifications" : "Créer le rôle"}
      </button>
    </form>
  );
};

export default RolesForm;

import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";

const CompaniesForm = ({ company, onSuccess, mode }) => {
  const [formData, setFormData] = useState({
    name_company: "",
    description_company: "",
    picture_company: null, // Changement pour null au lieu d'une chaîne vide
    zipcode: "",
    phone: "",
    address: "",
    siret: "",
    town: "",
    lat: "",
    long: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (company) {
      setFormData({
        name_company: company.name_company,
        description_company: company.description_company,
        picture_company: company.picture_company,
        zipcode: company.zipcode,
        phone: company.phone,
        address: company.address,
        siret: company.siret,
        town: company.town,
        lat: company.lat,
        long: company.long,
      });
    } else {
      setFormData({
        name_company: "",
        description_company: "",
        picture_company: null, // Changement pour null au lieu d'une chaîne vide
        zipcode: "",
        phone: "",
        address: "",
        siret: "",
        town: "",
        lat: "",
        long: "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, picture_company: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "picture_company") {
          data.append(key, formData[key]);
        } else {
          data.append(key, formData[key] || "");
        }
      });
      data.append("id_user", userId);
      if (mode === "edit" && company) {
        await api.put(`/company/${company.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Compagnie modifiée avec succès !");
      } else {
        await api.post("/company", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Compagnie ajoutée avec succès !");
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
          ? "Modifier la compagnie"
          : "Créer une nouvelle compagnie"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name_company">
          Nom de la compagnie
        </label>
        <input
          type="text"
          id="name_company"
          name="name_company"
          value={formData.name_company}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 mb-2"
          htmlFor="description_company"
        >
          Description de la compagnie
        </label>
        <textarea
          id="description_company"
          name="description_company"
          value={formData.description_company}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="picture_company">
          URL de l'image ou télécharger une image
        </label>
        <input
          type="file"
          id="picture_company"
          name="picture_company"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="zipcode">
          Code postal
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="phone">
          Téléphone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="address">
          Adresse
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="siret">
          SIRET
        </label>
        <input
          type="text"
          id="siret"
          name="siret"
          value={formData.siret}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="town">
          Ville
        </label>
        <input
          type="text"
          id="town"
          name="town"
          value={formData.town}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="lat">
          Latitude
        </label>
        <input
          type="text"
          id="lat"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="long">
          Longitude
        </label>
        <input
          type="text"
          id="long"
          name="long"
          value={formData.long}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
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
          : "Créer la compagnie"}
      </button>
    </form>
  );
};

export default CompaniesForm;

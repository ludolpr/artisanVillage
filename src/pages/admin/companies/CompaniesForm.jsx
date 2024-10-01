import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { useNavigate } from "react-router-dom";

const CompaniesForm = ({ company, onSuccess, mode }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name_company: "",
    description_company: "",
    picture_company: null,
    zipcode: "",
    phone: "",
    address: "",
    siret: "",
    town: "",
    lat: "",
    long: "",
  });

  // Fonction pour gérer les changements dans les champs de texte et mettre à jour l'état formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Fonction pour gérer le changement de fichier lors du téléchargement de l'image de l'entreprise
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      // Ne prend que le premier fichier si plusieurs sont sélectionnés
      picture_company: e.target.files[0],
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    // Empêche le comportement par défaut de soumission du formulaire
    e.preventDefault();

    // Construire l'adresse complète en utilisant l'adresse, le code postal et la ville
    const completeAddress = `${formData.address}, ${formData.zipcode}, ${formData.town}`;

    try {
      // Récupérer les coordonnées géographiques (latitude et longitude) depuis l'API Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${completeAddress}`
      );
      const data = await response.json();

      if (data.length > 0) {
        // Si l'adresse est trouvée, on met à jour lat et long dans formData
        const updatedFormData = {
          ...formData,
          lat: data[0].lat,
          long: data[0].lon,
        };

        // Créer un objet FormData pour l'envoi des données au backend
        const formDataToSend = new FormData();
        Object.keys(updatedFormData).forEach((key) => {
          formDataToSend.append(key, updatedFormData[key]);
        });

        // Envoyer les données au backend Laravel via l'API
        await api.post("/company", formDataToSend, {
          headers: {
            // Spécifie que les données envoyées sont multipart/form-data
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/");

        alert("Fiche créée avec succès !");
      } else {
        alert("Impossible de trouver les coordonnées pour cette adresse.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        {mode === "edit"
          ? "Modifier la compagnie"
          : "Créer une nouvelle compagnie"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name_company">
          Nom de l'entreprise
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
          Description de l'entreprise
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
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          accept="image/*"
          required
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
        <label className="block text-gray-700 mb-2" htmlFor="phone">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      {message && <div className="added mb-4">{message}</div>}
      {error && <div className="decline mb-4">{error}</div>}
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

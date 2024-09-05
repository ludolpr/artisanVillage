import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const CompaniesList = ({ onCompanySelect, onEdit, onDelete, refreshKey }) => {
  const [companies, setCompanies] = useState([]);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [formData, setFormData] = useState({
    name_company: "",
    description_company: "",
    picture_company: "",
    zipcode: "",
    phone: "",
    address: "",
    siret: "",
    town: "",
    lat: "",
    long: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company");
        setCompanies(response.data || []);
        setError("");
      } catch (error) {
        console.error("Erreur lors de la récupération des compagnies:", error);
        setError("Erreur lors de la récupération des compagnies.");
      }
    };

    fetchCompanies();
  }, [refreshKey]);

  const handleEditClick = (company) => {
    setEditingCompanyId(company.id);
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
  };

  const handleSaveEdit = async (companyId) => {
    try {
      await api.put(`/company/${companyId}`, formData);
      setCompanies(
        companies.map((company) =>
          company.id === companyId ? { ...company, ...formData } : company
        )
      );
      setEditingCompanyId(null);
      setSuccessMessage("Compagnie modifiée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la modification de la compagnie:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification de la compagnie."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
    setFormData({
      name_company: "",
      description_company: "",
      picture_company: "",
      zipcode: "",
      phone: "",
      address: "",
      siret: "",
      town: "",
      lat: "",
      long: "",
    });
  };

  const handleDelete = async (companyId) => {
    try {
      await api.delete(`/company/${companyId}`);
      setCompanies(companies.filter((company) => company.id !== companyId));
      setSuccessMessage("Compagnie supprimée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de la compagnie:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la compagnie."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        Liste des compagnies
      </h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      <ul>
        {companies.length > 0 ? (
          companies.map((company) => (
            <li
              key={company.id}
              className="mb-2 p-4 bg-[#d9b99b] rounded flex items-center justify-between cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            >
              {editingCompanyId === company.id ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={formData.name_company}
                    onChange={(e) =>
                      setFormData({ ...formData, name_company: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Nom de la compagnie"
                  />
                  <textarea
                    value={formData.description_company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description_company: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Description de la compagnie"
                    rows="3"
                  />
                  <input
                    type="text"
                    value={formData.picture_company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        picture_company: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="URL de l'image"
                  />
                  <input
                    type="text"
                    value={formData.zipcode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipcode: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Code postal"
                  />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Téléphone"
                  />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Adresse"
                  />
                  <input
                    type="text"
                    value={formData.siret}
                    onChange={(e) =>
                      setFormData({ ...formData, siret: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="SIRET"
                  />
                  <input
                    type="text"
                    value={formData.town}
                    onChange={(e) =>
                      setFormData({ ...formData, town: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Ville"
                  />
                  <input
                    type="text"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData({ ...formData, lat: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Latitude"
                  />
                  <input
                    type="text"
                    value={formData.long}
                    onChange={(e) =>
                      setFormData({ ...formData, long: e.target.value })
                    }
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded mb-2"
                    placeholder="Longitude"
                  />
                  <button
                    onClick={() => handleSaveEdit(company.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                    aria-label={`Save ${company.name_company}`}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Cancel ${company.name_company}`}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <div
                    className="flex-1"
                    onClick={() => onCompanySelect(company)}
                  >
                    <div className="font-bold">{company.name_company}</div>
                    <div>{company.description_company}</div>
                    <div>
                      {company.zipcode}, {company.town}
                    </div>
                    <div>{company.phone}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(company)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Edit ${company.name_company}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Delete ${company.name_company}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>Aucune compagnie disponible</li>
        )}
      </ul>
    </div>
  );
};

export default CompaniesList;

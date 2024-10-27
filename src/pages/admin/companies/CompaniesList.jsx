import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const CompaniesList = ({ onCompanySelect, onDelete, refreshKey }) => {
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
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company");
        setCompanies(response.data || []);
        setError("");
      } catch (error) {
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
    setPreviewImage(
      `https://api.artisanvillage.fr/public/storage/uploads/companies/${company.picture_company}`
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, picture_company: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveEdit = async (companyId) => {
    try {
      const updateFormData = new FormData();
      Object.keys(formData).forEach((key) =>
        updateFormData.append(key, formData[key])
      );
      updateFormData.append("_method", "PUT");

      await api.post(`/company/${companyId}`, updateFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCompanies(
        companies.map((company) =>
          company.id === companyId ? { ...company, ...formData } : company
        )
      );
      setEditingCompanyId(null);
      setSuccessMessage("Compagnie modifiée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
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
    setPreviewImage(null);
  };

  const handleDelete = async (companyId) => {
    try {
      await api.delete(`/company/${companyId}`);
      setCompanies(companies.filter((company) => company.id !== companyId));
      setSuccessMessage("Compagnie supprimée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la compagnie."
      );
    }
  };

  return (
    <div className="card1 p-6 rounded-lg shadow-md">
      <h2 className=" font-bold mb-4 ">Liste des entreprises</h2>
      {error && <div className="decline p-4 rounded mb-4">{error}</div>}
      {successMessage && (
        <div className="added p-4 rounded mb-4">{successMessage}</div>
      )}
      <ul>
        {companies.length > 0 ? (
          companies.map((company) => (
            <li
              key={company.id}
              className="mb-4 p-4 card2 rounded-lg flex items-center justify-between"
            >
              {editingCompanyId === company.id ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={formData.name_company}
                    onChange={(e) =>
                      setFormData({ ...formData, name_company: e.target.value })
                    }
                    className="w-full px-3 py-2 mb-2 border rounded"
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
                    className="w-full px-3 py-2 mb-2 border rounded"
                    placeholder="Description de la compagnie"
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 mb-2 border rounded"
                    accept="image/*"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Prévisualisation"
                      className="w-32 h-32 object-cover rounded mt-2"
                    />
                  )}
                  {/* Add other input fields for the rest of formData fields */}
                </div>
              ) : (
                <div className="flex items-center">
                  <img
                    src={`https://api.artisanvillage.fr/storage/uploads/companies/${company.picture_company}`}
                    alt={company.name_company}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                  <span
                    onClick={() => onCompanySelect(company)}
                    className="pointer-events-none"
                  >
                    {company.name_company} - {company.town}
                  </span>
                </div>
              )}
              <div className="flex space-x-2">
                {editingCompanyId === company.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(company.id)}
                      className="added button3"
                      aria-label={`Save ${company.name_company}`}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="decline button3"
                      aria-label={`Cancel ${company.name_company}`}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(company)}
                      className="button3"
                      aria-label={`Edit ${company.name_company}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="button3"
                      aria-label={`Delete ${company.name_company}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
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

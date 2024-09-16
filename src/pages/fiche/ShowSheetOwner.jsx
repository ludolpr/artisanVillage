import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";
import artisanPlaceholder from "../../assets/images/worker1.jpg";
// import Products from "./Products";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import ProductOwner from "./ProductsOwner";
import LoadingSpinner from "../../components/globals/LoadingSpinner";
const ShowSheetOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(UserContext);

  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchCompany = () => {
      api
        .get(`/company/${id}`)
        .then((response) => {
          setCompany(response.data);
          setFormData({
            name_company: response.data.name_company,
            picture_company: response.data.picture_company,
            description_company: response.data.description_company,
            address: response.data.address,
            town: response.data.town,
            zipcode: response.data.zipcode,
            phone: response.data.phone,
            siret: response.data.siret,
          });
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching company:", error);
          setError("Error fetching company.");
          setLoading(false);
        });
    };

    fetchCompany();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name_company: company.name_company,
      picture_company: company.picture_company,
      description_company: company.description_company,
      address: company.address,
      town: company.town,
      zipcode: company.zipcode,
      phone: company.phone,
      siret: company.siret,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture_company: e.target.files[0],
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const completeAddress = `${formData.address}, ${formData.zipcode}, ${formData.town}`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${completeAddress}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const updatedFormData = {
        ...formData,
        lat: data[0].lat,
        long: data[0].lon,
      };

      const formDataToSend = new FormData();
      Object.keys(updatedFormData).forEach((key) => {
        formDataToSend.append(key, updatedFormData[key]);
      });
      formDataToSend.append("_method", "PUT");

      await api
        .post(`/company/${id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setCompany(response.data);
          setIsEditing(false);
          navigate(`/sheet`);
        })
        .catch((error) => {
          console.error("Error updating company:", error);
          setError("Error updating company.");
        });
    } else {
      console.error("Address not found.");
      setError("Address not found.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      api
        .delete(`/company/${id}`)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting company:", error);
          setError("Error deleting company.");
        });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!company) {
    return <div className="text-center">No company data available</div>;
  }

  const isOwner = isAuthenticated && user?.id === company.id_user;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden mb-6">
        <div className="lg:w-1/2">
          <img
            src={
              company.picture_company
                ? `http://127.0.0.1:8000/storage/uploads/companies/${company.picture_company}`
                : artisanPlaceholder
            }
            alt={company.name_company}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 p-6">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="name_company"
                value={formData.name_company}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Nom de société"
              />
              <input
                type="file"
                name="picture_company"
                onChange={handleFileChange}
                className="block w-full mb-4 p-2 border rounded"
              />
              <textarea
                name="description_company"
                value={formData.description_company}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Description"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Adresse"
              />
              <input
                type="text"
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Ville"
              />
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Code postal"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Téléphone"
              />
              <input
                type="text"
                name="siret"
                value={formData.siret}
                onChange={handleChange}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Numéro SIRET"
              />
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleSave}
                  className="bg-[#d9b99b] text-white p-3 rounded-lg shadow hover:bg-[#9a7d6b] transition flex items-center"
                >
                  <FaCheck className="mr-2" />
                  Enregistrer
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-[#9a7d6b] text-white p-3 rounded-lg shadow hover:bg-[#d9b99b] transition flex items-center"
                >
                  <FaTimes className="mr-2" />
                  Retour
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-semibold text-[#9a7d6b] mb-4">
                {company.name_company}
              </h2>
              <p className="text-gray-700 mb-4">
                {company.description_company}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <p className="text-gray-500">Adresse: {company.address}</p>
                <p className="text-gray-500">Ville: {company.town}</p>
                <p className="text-gray-500">Code postal: {company.zipcode}</p>
                <p className="text-gray-500">
                  Numéro de téléphone: {company.phone}
                </p>
                <p className="text-gray-500">Numéro SIRET: {company.siret}</p>
              </div>
              {isOwner && (
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={handleEdit}
                    className="bg-[#d9b99b] text-white p-3 rounded-lg shadow hover:bg-[#9a7d6b] transition flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edition
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-[#9a7d6b] text-white p-3 rounded-lg shadow hover:bg-[#d9b99b] transition flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-[#9a7d6b] mb-4">Produits</h3>
        <ProductOwner />
      </div>
    </div>
  );
};

export default ShowSheetOwner;

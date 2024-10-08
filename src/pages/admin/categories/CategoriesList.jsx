import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const CategoriesList = ({ onCategorySelect, onEdit, onDelete, refreshKey }) => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {

      const response = api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
        setError("")
        console.log("data here:" + response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);

        setError(error);
      });
    };

    fetchCategories();
  }, [refreshKey]);

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setNewCategoryName(category.name_category);
    setNewCategoryDescription(category.description_category);
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      await api.put(`/category/${categoryId}`, {
        name_category: newCategoryName,
        description_category: newCategoryDescription,
      });
      setCategories(
        categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                name_category: newCategoryName,
                description_category: newCategoryDescription,
              }
            : category
        )
      );
      setEditingCategoryId(null);
      setSuccessMessage("Catégorie modifiée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la modification de la catégorie:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification de la catégorie."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setNewCategoryName("");
    setNewCategoryDescription("");
  };

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/category/${categoryId}`);
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
      setSuccessMessage("Catégorie supprimée avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la catégorie."
      );
    }
  };

  return (
    <div className="card1 p-6 rounded-lg shadow-md">
      <h2 className=" font-bold mb-4 ">Liste des catégories</h2>
      {error && <div className="decline p-4 rounded mb-4">{error}</div>}
      {successMessage && (
        <div className="added p-4 rounded mb-4">{successMessage}</div>
      )}
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category.id}
              className=" card2 mb-2 p-4 rounded flex items-center justify-between cursor-pointer  "
            >
              {editingCategoryId === category.id ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border   rounded mb-2"
                  />
                  <textarea
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="w-full px-3 py-2 border   rounded"
                    rows="3"
                  />
                </div>
              ) : (
                <div className="pointer-events-none">
                  <div onClick={() => onCategorySelect(category)}>
                    {category.name_category}
                  </div>
                  <div className="">{category.description_category}</div>
                </div>
              )}
              <div className="flex space-x-2">
                {editingCategoryId === category.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="added "
                      aria-label={`Save ${category.name_category}`}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className=""
                      aria-label={`Cancel ${category.name_category}`}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="button3"
                      aria-label={`Edit ${category.name_category}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="button3"
                      aria-label={`Delete ${category.name_category}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Aucune catégorie disponible</li>
        )}
      </ul>
    </div>
  );
};

export default CategoriesList;

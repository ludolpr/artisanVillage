import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const TagsList = ({ onTagSelect, onEdit, onDelete, refreshKey }) => {
  const [tags, setTags] = useState([]);
  const [editingTagId, setEditingTagId] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tag");
        setTags(response.data || []);
        setError("");
      } catch (error) {
        console.error("Erreur lors de la récupération des tags:", error);
        setError("Erreur lors de la récupération des tags.");
      }
    };

    fetchTags();
  }, [refreshKey]);

  const handleEditClick = (tag) => {
    setEditingTagId(tag.id);
    setNewTagName(tag.name_tag);
  };

  const handleSaveEdit = async (tagId) => {
    try {
      await api.put(`/tag/${tagId}`, { name_tag: newTagName });
      setTags(
        tags.map((tag) =>
          tag.id === tagId ? { ...tag, name_tag: newTagName } : tag
        )
      );
      setEditingTagId(null);
      setSuccessMessage("Tag modifié avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la modification du tag:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification du tag."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setNewTagName("");
  };

  const handleDelete = async (tagId) => {
    try {
      await api.delete(`/tag/${tagId}`);
      setTags(tags.filter((tag) => tag.id !== tagId));
      setSuccessMessage("Tag supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression du tag:", error);
      setError(
        error.response?.data?.message || "Erreur lors de la suppression du tag."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Liste des tags</h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      <ul>
        {tags.length > 0 ? (
          tags.map((tag) => (
            <li
              key={tag.id}
              className="mb-2 p-4 bg-[#d9b99b] rounded flex items-center justify-between cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            >
              {editingTagId === tag.id ? (
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                />
              ) : (
                <span className="pointer-events-none" onClick={() => onTagSelect(tag)}>{tag.name_tag}</span>
              )}
              <div className="flex space-x-2">
                {editingTagId === tag.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(tag.id)}
                      className="text-green-500 hover:text-green-700"
                      aria-label={`Save ${tag.name_tag}`}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Cancel ${tag.name_tag}`}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(tag)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Edit ${tag.name_tag}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Delete ${tag.name_tag}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Aucun tag disponible</li>
        )}
      </ul>
    </div>
  );
};

export default TagsList;
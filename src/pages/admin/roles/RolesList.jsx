import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const RolesList = ({ onRoleSelect, onEdit, onDelete, refreshKey }) => {
  const [roles, setRoles] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/role");
        setRoles(response.data || []);
        setError("");
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
        setError("Erreur lors de la récupération des rôles.");
      }
    };

    fetchRoles();
  }, [refreshKey]);

  const handleEditClick = (role) => {
    setEditingRoleId(role.id);
    setNewRoleName(role.name_role);
  };

  const handleSaveEdit = async (roleId) => {
    try {
      await api.put(`/role/${roleId}`, { name_role: newRoleName });
      setRoles(
        roles.map((role) =>
          role.id === roleId ? { ...role, name_role: newRoleName } : role
        )
      );
      setEditingRoleId(null);
      setSuccessMessage("Rôle modifié avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la modification du rôle:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification du rôle."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingRoleId(null);
    setNewRoleName("");
  };

  const handleDelete = async (roleId) => {
    try {
      await api.delete(`/role/${roleId}`);
      setRoles(roles.filter((role) => role.id !== roleId));
      setSuccessMessage("Rôle supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression du rôle:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression du rôle."
      );
    }
  };

  return (
    <div className="card1 p-6 rounded-lg shadow-md">
      <h2 className="   font-bold mb-4">Liste des rôles</h2>
      {error && <div className="decline p-4 rounded mb-4">{error}</div>}
      {successMessage && (
        <div className="added p-4 rounded mb-4">{successMessage}</div>
      )}
      <ul>
        {roles.length > 0 ? (
          roles.map((role) => (
            <li
              key={role.id}
              className="card2 mb-2 p-4 rounded flex items-center justify-between cursor-pointer "
            >
              {editingRoleId === role.id ? (
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-3 py-2 border text-black  rounded"
                />
              ) : (
                <span
                  className="pointer-events-none"
                  onClick={() => onRoleSelect(role)}
                >
                  {role.name_role}
                </span>
              )}
              <div className="flex space-x-2">
                {editingRoleId === role.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(role.id)}
                      className="added "
                      aria-label={`Save ${role.name_role}`}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="decline"
                      aria-label={`Cancel ${role.name_role}`}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(role)}
                      className="button3"
                      aria-label={`Edit ${role.name_role}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="button3"
                      aria-label={`Delete ${role.name_role}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Aucun rôle disponible</li>
        )}
      </ul>
    </div>
  );
};

export default RolesList;

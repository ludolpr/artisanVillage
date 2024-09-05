import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const UsersList = ({ onUserSelect, onEdit, onDelete, refreshKey }) => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setError("");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
        setError("Erreur lors de la récupération des utilisateurs.");
      }
    };

    fetchUsers();
  }, [refreshKey]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setNewUserName(user.name_user);
  };

  const handleSaveEdit = async (userId) => {
    try {
      await api.put(`/users/${userId}`, { name_user: newUserName });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, name_user: newUserName } : user
        )
      );
      setEditingUserId(null);
      setSuccessMessage("Utilisateur modifié avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification de l'utilisateur."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewUserName("");
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setSuccessMessage("Utilisateur supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'utilisateur."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        Liste des utilisateurs
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
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="mb-2 p-4 bg-[#d9b99b] rounded flex items-center justify-between cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            >
              {editingUserId === user.id ? (
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                />
              ) : (
                <span onClick={() => onUserSelect(user)}>{user.name_user}</span>
              )}
              <div className="flex space-x-2">
                {editingUserId === user.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(user.id)}
                      className="text-green-500 hover:text-green-700"
                      aria-label={`Save ${user.name_user}`}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Cancel ${user.name_user}`}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Edit ${user.name_user}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-[#d9b99b] hover:text-[#9a7d6b]"
                      aria-label={`Delete ${user.name_user}`}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Aucun utilisateur disponible</li>
        )}
      </ul>
    </div>
  );
};

export default UsersList;

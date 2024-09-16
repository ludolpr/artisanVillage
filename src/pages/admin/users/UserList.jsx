import React, { useState, useEffect } from "react";
import { api } from "../../../services/baseUrl";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import userImage from "../../../assets/images/user.png";

const UsersList = ({ onUserSelect, onDelete, refreshKey }) => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newNameUser, setNewNameUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      api
        .get("/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    fetchUsers();
  }, [refreshKey]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setNewNameUser(user.name_user);
    setNewEmail(user.email);
    setNewPicture(user.picture_user);
    setNewRoleName(user.id_role);
    setPreviewImage(
      `http://127.0.0.1:8000/public/storage/uploads/users/${user.picture_user}`
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPicture(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveEdit = async (userId) => {
    if (!newNameUser || !newEmail) {
      setError("Le nom et l'email sont requis.");
      return;
    }

    const formData = new FormData();
    formData.append("name_user", newNameUser);
    formData.append("email", newEmail);
    formData.append("id_role", newRoleName);
    formData.append("_method", "PUT");
    if (newPicture) {
      formData.append("picture_user", newPicture);
    }

    api
      .post(`/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  name_user: newNameUser,
                  email: newEmail,
                  id_role: newRoleName,
                  picture_user: newPicture
                    ? newPicture.name
                    : user.picture_user,
                }
              : user
          )
        );
        setEditingUserId(null);
        setSuccessMessage("Utilisateur modifié avec succès.");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        setError(
          error.response?.data?.message || "Erreur lors de la modification."
        );
      });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewNameUser("");
    setNewEmail("");
    setNewPicture(null);
    setNewRoleName(1);
    setPreviewImage(null);
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      setSuccessMessage("Utilisateur supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      if (onDelete) onDelete();
    } catch (error) {
      setError(
        error.response?.data?.message || "Erreur lors de la suppression."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
          Liste des utilisateurs
        </h2>
        {error && (
          <div className="bg-red-200 text-red-800 p-4 rounded mb-4">
            {error}
          </div>
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
                  <div className="w-full">
                    <input
                      type="text"
                      value={newNameUser}
                      onChange={(e) => setNewNameUser(e.target.value)}
                      className="w-full px-3 py-2 mb-2 border text-black border-gray-300 rounded"
                      placeholder="Nom"
                    />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 mb-2 border text-black border-gray-300 rounded"
                      placeholder="Email"
                    />
                    <select
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-3 py-2 mb-2 border text-black border-gray-300 rounded"
                    >
                      <option value="1">Utilisateur</option>
                      <option value="2">Artisan</option>
                      <option value="3">Administrateur</option>
                    </select>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 mb-2 border text-black border-gray-300 rounded"
                      accept="image/*"
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Prévisualisation"
                        className="w-32 h-32 object-cover rounded mt-2"
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center pointer-events-none">
                    <img
                      src={`http://127.0.0.1:8000/storage/uploads/users/${user.picture_user}`}
                      alt={user.name_user}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                    <span onClick={() => onUserSelect(user)}>
                      {user.name_user} -{" "}
                      {user.id_role === 1
                        ? "Utilisateur"
                        : user.id_role === 2
                        ? "Artisan"
                        : "Administrateur"}
                    </span>
                  </div>
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
    </form>
  );
};

export default UsersList;

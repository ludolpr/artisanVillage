import React, { useEffect, useState, useContext } from "react";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";

import userImage from "../../assets/images/user.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const profileImage =
    user && user.picture_user
      ? `http://127.0.0.1:8000/storage/uploads/users/${user.picture_user}`
      : userImage;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/currentuser");
        setUser(response.data.data.user);
        setFormData(response.data.data.user);
        setError("");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
        setError("Erreur lors de la récupération de l'utilisateur:");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture_user: e.target.files[0],
    });
  };

  const handleSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    const formDataWithMethod = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataWithMethod.append(key, formData[key])
    );
    if (passwordData.newPassword) {
      formDataWithMethod.append("password", passwordData.newPassword);
    }
    formDataWithMethod.append("_method", "PUT");

    try {
      const response = await api.post(`/users/${user.id}`, formDataWithMethod, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data.data.user);
      setEditMode(false);
      setError("");
      setPasswordError("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      setError("Erreur lors de la mise à jour de l'utilisateur:");
    }
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/users/${user.id}`);
      alert("Profil supprimé avec succès !");
      // Add any additional actions needed after deletion (like logging out or redirecting)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setError("Erreur lors de la suppression de l'utilisateur:");
    }
  };

  if (!user) {
    return <div>Veuillez vous connecter pour éditer votre profil.</div>;
  }

  // Helper to handle verified status display
  const emailStatus = user.email_verified_at
    ? "text-green-600"
    : "text-red-600";

  // Reusable component for user details
  const UserDetails = ({ user, emailStatus }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#9a7d6b] mb-4">
        Profil Utilisateur
      </h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Nom d'utilisateur:
        </h3>
        <p className="text-gray-600">{user.name_user || "votre nom ici"}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
        <p className={`text-gray-600 ${emailStatus}`}>
          {user.email} {user.email_verified_at ? "(vérifié)" : "(non vérifié)"}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Rôle:</h3>
        <p className="text-gray-600">
          {user.id_role === 1
            ? "Utilisateur"
            : user.id_role === 2
            ? "Artisan"
            : "Administrateur"}
        </p>
      </div>
      {isAuthenticated && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaEdit className="mr-2" />
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded flex items-center"
          >
            <FaTrash className="mr-2" />
            Supprimer
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="relative">
          <img
            src={profileImage}
            alt={user.name_user}
            className="w-64 h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xl p-4">
            {user.name_user || "votre nom ici"}
          </div>
        </div>

        {editMode ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#9a7d6b] mb-4">
              Modifier Profil
            </h2>
            {/* Form inputs for edit mode */}
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Nom d'utilisateur:
              </label>
              <input
                type="text"
                name="name_user"
                value={formData.name_user || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Photo de profil:
              </label>
              <input
                type="file"
                name="picture_user"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            {/* Password change */}
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Nouveau mot de passe:
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Confirmer le mot de passe:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            {passwordError && (
              <div className="text-red-500 mb-4">{passwordError}</div>
            )}
            {isAuthenticated && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Sauvegarder
                </button>
              </div>
            )}

            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        ) : (
          <UserDetails user={user} emailStatus={emailStatus} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;

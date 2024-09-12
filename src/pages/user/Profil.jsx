import React, { useEffect, useState } from "react";
import placeholderImage from "../../assets/images/user.png";
import { api } from "../../services/baseUrl";
import userImage from "../../assets/images/user.png";
import { ImageUp } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const profileImage = user.picture_user
    ? `http://127.0.0.1:8000/storage/uploads/users/${user.picture_user}`
    : userImage;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/currentuser");
        console.log(response.data.data.user);

        setUser(response.data.data.user);
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
            <p
              className={`text-gray-600 ${
                user.email_verified_at ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.email}{" "}
              {user.email_verified_at ? "(vérifié)" : "(non vérifié)"}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Rôle:</h3>
            <p className="text-gray-600">
              {user.id_role === 1
                ? "Utilisateur"
                : user.id_role === 2
                ? "Artisan"
                : user.id_role === 3
                ? "Administrateur"
                : "votre rôle"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import auth from "../services/token"; // Importation des fonctions pour gérer le token
import { api } from "../services/baseUrl";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Ajouter un état pour le rôle
  const [error, setError] = useState(null);
  const token = auth.getToken();

  useEffect(() => {
    const fetchUser = async () => {
      // Si le token a expiré, on évite l'appel à l'API et on réinitialise les états
      if (!auth.getExpiryTime()) {
        setError("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("access_token");
        setUser(null);
        setRole(null);
        return;
      }

      try {
        // Récupération des informations utilisateur à partir de l'API
        const response = await api.get("/currentuser", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userData = response.data.data.user;
        // console.log("Response user data:", userData); // Debugging: Show user data

        // Update user and role information directly from the API
        setUser(userData);
        // Use role from API instead of token
        setRole(userData.id_role);
      } catch (error) {
        // If the user is not authorized or the session has expired
        if (error.response && error.response.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("access_token");
          setUser(null);
          setRole(null);
        } else {
          setError("Erreur lors de la récupération des données utilisateur.");
        }
      }
    };

    // Immediate call to verify role and user information
    fetchUser();

    // Added an event listener to monitor page refreshes
    window.addEventListener("focus", fetchUser);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("focus", fetchUser);
    };
  }, [token]);

  const isAuthenticated = !!user;

  const login = (userData, userRole) => {
    // Debug: Show role on login
    // console.log("Login role passed:", userRole);
    // Update role on login
    setUser(userData);
    setRole(userRole);
  };

  return (
    <UserContext.Provider value={{ user, role, login, isAuthenticated, error }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };

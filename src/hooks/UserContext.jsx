import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/currentuser",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("access_token");
          setUser(null);
        } else {
          setError("Erreur lors de la récupération des données utilisateur.");
        }
      } finally {
        console.log("impossible de connecter l'utilisateur");
      }
    };

    fetchUser();
  }, [token]);

  const isAuthenticated = !!user;

  const login = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, isAuthenticated, error }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  // get token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  function getToken() {
    return localStorage.getItem("access_token");
  }

  let getDecodedToken = () => {
    if (getToken()) {
      return jwtDecode(localStorage.getItem("access_token"));
    } else {
      return false;
    }
  };

  let getExpiryTime = () => {
    if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())) {
      return true;
    } else {
      return localStorage.removeItem("access_token");
    }
  };

  let getRoles = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getExpiryTime()) {
      // la valeur de base est un tableau dans un string, on le parse pour faire sauter le string et
      // on le tostring pour faire sauter le tableau, comme ça on a seulement la valeur
      return JSON.parse(getDecodedToken().role).toString();
    } else {
      return false;
    }
  };

  let getEmail = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getExpiryTime()) {
      return getDecodedToken().email;
    } else {
      return false;
    }
  };

  let loggedAndAdmin = () => {
    // Check si il y a un token valide et check si le rôle est celui d'un admin, répond true quand c'est vrai
    return !!(getExpiryTime() && getRoles() === "administrateur");
  };

  // login and logout functions
  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    // auth context provider
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, getRoles }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

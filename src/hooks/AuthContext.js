import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
// import Auth from "../services/token";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  // const token = Auth.getToken();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // login and logout functions
  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    setLoading(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    // setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  return (
    // auth context provider
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

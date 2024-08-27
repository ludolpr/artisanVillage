import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const token = localStorage.getItem("access_token");

  const { token } = useContext(AuthContext);
  useEffect(() => {
    fetchUser();
  }, [token]);
  console.log(" Token from AuthContext 1:", token);

  const [validationError, setValidationError] = useState({});

  const fetchUser = async () => {
    if (!token) {
      console.error("Token non disponible");
      return;
    }
    console.log(" Token from AuthContext 2:", token);

    await axios
      .get("http://127.0.0.1:8000/api/currentuser", {
        authorization: `Bearer ${token}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
    console.log(" Token from AuthContext 3:", token);
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };

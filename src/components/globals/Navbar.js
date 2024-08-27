import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import { UserContext } from "../../hooks/UserContext";

const NavLinks = () => {
  const { isAuthenticated, logout, getRoles } = useContext(AuthContext);
  const user = useContext(UserContext);

  const role = getRoles();

  return (
    <>
      {!isAuthenticated ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink className="primary-500 pl-2 pr-2" to="/register">
            S'enregistrer
          </NavLink>
        </>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          {role === 2 && <NavLink to="/dashboard">Dashboard</NavLink>}
          <span>Bonjour, {user ? user.name : "Utilisateur"}</span>
        </>
      )}
    </>
  );
};

export default NavLinks;

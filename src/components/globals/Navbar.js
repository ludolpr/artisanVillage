import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../hooks/ThemeContext";
import { AuthContext } from "../../hooks/AuthContext";
import { UserContext } from "../../hooks/UserContext";
import { Menu, X, Moon, Sun, Eye } from "lucide-react";
import Auth from "../../services/token";

const NavLinks = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = useContext(UserContext);

  const role = Auth.getRoles();
  console.log("mon user: " + user);

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
          <span>Bonjour, {user ? user.name_user : "Utilisateur"}</span>
          {role == 2 ? <NavLink to="/dashboard">Dashboard</NavLink> : ""}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, theme } = useContext(ThemeContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="flex w-1/3 justify-end">
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
          <button onClick={() => toggleTheme()}>
            {theme === "dark" ? (
              <Sun />
            ) : theme === "light" ? (
              <Moon />
            ) : (
              <Eye />
            )}
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Navbar;

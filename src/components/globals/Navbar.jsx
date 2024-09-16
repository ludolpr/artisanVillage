import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import { Menu, X, Moon, Sun, Eye } from "lucide-react";
import auth from "../../services/token";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { user, isAuthenticated, loading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const role = auth.getRoles();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-brown-500">
        {/* Connexion/Enregistrement/Deconnexion */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <NavLink className="m-2" to="/login">
                Connexion
              </NavLink>
              <NavLink
                className="secondary pl-2 pr-2 bg-light-brown"
                to="/register"
              >
                S'enregistrer
              </NavLink>
            </>
          ) : (
            <>
              <span>Bonjour, {user.name_user || "Utilisateur"}</span>
              {role == 3 && (
                <NavLink className="m-2" to="/dashboard">
                  Panel admin
                </NavLink>
              )}
              <button className="m-2" onClick={logout}>
                Déconnexion
              </button>
            </>
          )}
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <Sun />
            ) : theme === "dark" ? (
              <Moon />
            ) : (
              <Eye />
            )}
          </button>
        </div>

        {/* Menu burger pour mobile */}
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* Menu déroulant pour mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-brown-500 flex flex-col items-center md:hidden">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink
                className="secondary bg-[primary] pl-2 pr-2"
                to="/register"
              >
                S'enregistrer
              </NavLink>
            </>
          ) : (
            <>
              <span className="m-2">
                Bonjour, {user.name_user || "Utilisateur"}
              </span>
              <NavLink className="m-2" to="/fiche">
                Fiche artisans
              </NavLink>
              {role >= 1 && (
                <NavLink className="m-2" to="/createfiche">
                  Déposer une fiche
                </NavLink>
              )}

              <NavLink className="m-2" to="/contact">
                Contact
              </NavLink>
              {/* {role >= 1 && (
                <NavLink className="m-2" to="/profil">
                  Profil
                </NavLink>
              )} */}
              {role === 3 && (
                <NavLink to="/dashboard" className="m-2">
                  Panel admin
                </NavLink>
              )}
              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <Sun />
                ) : theme === "dark" ? (
                  <Moon />
                ) : (
                  <Eye />
                )}
              </button>
              <button className="m-2" onClick={logout}>
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

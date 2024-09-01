import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import { Menu, X, Moon, Sun, Eye } from "lucide-react";
import auth from "../../services/token";

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="flex w-1/3 justify-end">
        <div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="hidden w-full justify-between md:flex">
          <div>
            {!isAuthenticated ? (
              <>
                <NavLink className="m-2" to="/login">
                  Connexion
                </NavLink>
                <NavLink className="primary-500 pl-2 pr-2" to="/register">
                  S'enregistrer
                </NavLink>
              </>
            ) : (
              <>
                <div>
                  <span>Bonjour, {user.name_user || "Utilisateur"}</span>
                  {role == 2 && (
                    <NavLink className="m-2" to="/dashboard">
                      Dashboard
                    </NavLink>
                  )}
                  <button className="m-2" onClick={logout}>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
          <button onClick={toggleTheme}>
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
          <div>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink className="primary-500 pl-2 pr-2" to="/register">
                  S'enregistrer
                </NavLink>
              </>
            ) : (
              <>
                <span>Bonjour, {user.name_user || "Utilisateur"}</span>
                {role == 2 && <NavLink to="/dashboard">Dashboard</NavLink>}
                <button className="m-2" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

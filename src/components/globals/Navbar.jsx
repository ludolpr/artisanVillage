import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import { Menu, X, Moon, Sun, Eye } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { api } from "../../services/baseUrl";

const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { user, isAuthenticated, loading, role } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hasFiche, setHasFiche] = useState(false);
  const [ficheId, setFicheId] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const fetchUserFiche = () => {
    if (isAuthenticated && user && user.id) {
      api
        .get("/company")
        .then((response) => {
          const companies = response.data;
          const userFiche = companies.find(
            (company) => company.id_user === user.id
          );
          if (userFiche) {
            setFicheId(userFiche.id);
            setHasFiche(true);
          } else {
            setHasFiche(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setHasFiche(false);
        });
    }
  };

  React.useEffect(() => {
    fetchUserFiche();
  }, [isAuthenticated, user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="flex items-center justify-between p-4 w-full">
      {/* Hamburger Menu - Visible only on small screens */}
      <div>
        <div className="flex justify-end ">
          <div className="lg:hidden ">
            <button
              className="flex items-center button3"
              onClick={toggleNavbar}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Full menu in Hamburger for mobile */}
        {isOpen && (
          <div className="menu-overlay top-16 left-0 right-0 z-50 flex flex-col lg:hidden w-full items-center space-y-4 p-4">
            <div className="flex flex-wrap justify-between items-center w-full">
              <NavLink className="m-2" to="/" onClick={closeNavbar}>
                Accueil
              </NavLink>
              <NavLink className="m-2" to="/sheet" onClick={closeNavbar}>
                Fiche artisans
              </NavLink>
              {role == 1 && (
                <NavLink className="m-2" to="/creerfiche" onClick={closeNavbar}>
                  Déposer une fiche
                </NavLink>
              )}
              {role >= 1 && (
                <NavLink className="m-2" to="/profil" onClick={closeNavbar}>
                  Profil
                </NavLink>
              )}
              <button
                className="flex button3 items-end mr-2 transition-transform duration-300 ease-in-out"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Sun />
                ) : theme === "dark" ? (
                  <Moon />
                ) : (
                  <Eye />
                )}
              </button>
            </div>

            <div className="flex flex-wrap justify-between items-center w-full">
              <NavLink className="m-2" to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
              {hasFiche && ficheId && role >= 2 && (
                <NavLink
                  className="m-2"
                  to={`/showsheetowner/${ficheId}`}
                  onClick={closeNavbar}
                >
                  Votre fiche d'entreprise
                </NavLink>
              )}
              {!isAuthenticated ? (
                <>
                  <NavLink className="m-2" to="/login" onClick={closeNavbar}>
                    Connexion
                  </NavLink>
                  <NavLink className="m-2" to="/register" onClick={closeNavbar}>
                    S'enregistrer
                  </NavLink>
                </>
              ) : (
                <>
                  <span>Bonjour, {user.name_user || "Utilisateur"}</span>
                  {role == 3 && (
                    <NavLink
                      className="m-2"
                      to="/dashboard"
                      onClick={closeNavbar}
                    >
                      Panel admin
                    </NavLink>
                  )}
                  <button className="m-2 button3" onClick={logout}>
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div>
          {/* Right-side navigation (hidden on mobile, visible on larger screens) */}
          <div className="hidden lg:flex items-center space-x-4 ">
            {!isAuthenticated ? (
              <>
                <NavLink className="m-2" to="/login">
                  Connexion
                </NavLink>
                <NavLink className="pl-2 pr-2" to="/register">
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
                <button className="m-2 button3" onClick={logout}>
                  Déconnexion
                </button>
              </>
            )}
            <button
              className="transition-all duration-300 button3"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun />
              ) : theme === "dark" ? (
                <Moon />
              ) : (
                <Eye />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

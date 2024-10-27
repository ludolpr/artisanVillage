import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";

const NavbarLeft = () => {
  const [hasFiche, setHasFiche] = useState(false);
  const [ficheId, setFicheId] = useState(null);
  const { user, isAuthenticated, role } = useContext(UserContext);
  console.log("role :" + role);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
            setLoading(true);
          })
          .catch((error) => {
            console.error("Error fetching company data:", error);
            setHasFiche(false);
            setLoading(false);
          });
      }
    };

    fetchUserFiche();
  }, [isAuthenticated, user]);

  return (
    <div className="hidden lg:flex flex-1 justify-center space-x-4">
      <NavLink className="m-2" to="/sheet">
        Fiche artisans
      </NavLink>
      {role == 1 && (
        <NavLink className="m-2" to="/creerfiche">
          Déposer une fiche
        </NavLink>
      )}
      {role >= 1 && (
        <NavLink className="m-2" to="/profil">
          Profil
        </NavLink>
      )}
      <NavLink className="m-2" to="/contact">
        Contact
      </NavLink>
      {hasFiche && ficheId && role >= 2 && (
        <NavLink className="m-2" to={`/showsheetowner/${ficheId}`}>
          Votre fiche d'entreprise
        </NavLink>
      )}
    </div>
  );
};

export default NavbarLeft;

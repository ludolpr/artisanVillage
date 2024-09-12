import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import auth from "../../services/token";
import { api } from "../../services/baseUrl";
import { UserContext } from "../../hooks/UserContext";

const NavbarLeft = () => {
  const [hasFiche, setHasFiche] = useState(false);
  const [ficheId, setFicheId] = useState(null);
  const { user, isAuthenticated } = useContext(UserContext);
  const role = auth.getRoles();

  useEffect(() => {
    const fetchUserFiche = () => {
      if (isAuthenticated && user && user.id) {
        api
          .get("/company")
          .then((response) => {
            const companies = response.data;

            // Find the fiche that matches the current user
            const userFiche = companies.find(
              (company) => company.id_user === user.id
            );
            // console.log("fiche id et user id:" + userFiche.id, user.id);

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

    fetchUserFiche();
  }, [isAuthenticated, user]);
  // console.log("mon user : " + user);
  // console.log("fiche id :" + ficheId);
  console.log("role :" + role);

  return (
    <div className="hidden md:flex flex-1 justify-center space-x-4">
      <NavLink className="m-2" to="/sheet">
        Fiche artisans
      </NavLink>

      {role == 1 && (
        <NavLink className="m-2" to="/createsheet">
          Déposer une fiche
        </NavLink>
      )}

      <NavLink className="m-2" to="/profil">
        Profil
      </NavLink>

      <NavLink className="m-2" to="/contact">
        Contact
      </NavLink>

      {hasFiche && ficheId && role >= 2 && (
        <NavLink className="m-2" to={`/showsheet/${ficheId}`}>
          Ma fiche
        </NavLink>
      )}
    </div>
  );
};

export default NavbarLeft;

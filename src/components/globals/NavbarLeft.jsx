import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLeft = () => {
  return (
    <div className="hidden md:flex flex-1 justify-center space-x-4">
      <NavLink className="m-2" to="/fiche">
        Fiche artisans
      </NavLink>
      <NavLink className="m-2" to="/createfiche">
        Déposer une fiche
      </NavLink>
      <NavLink className="m-2" to="/profil">
        Profil
      </NavLink>
      <NavLink className="m-2" to="/contact">
        Contact
      </NavLink>
    </div>
  );
};

export default NavbarLeft;

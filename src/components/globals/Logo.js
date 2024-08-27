import React from "react";
import logoImage from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
const Logo = () => {
  return (
    <div className="logo w-16 h-16">
      <NavLink to="/">
        <img src={logoImage} alt="logo" />
      </NavLink>
    </div>
  );
};

export default Logo;

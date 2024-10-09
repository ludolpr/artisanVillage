import React from "react";
import logoImage from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
const Logo = () => {
  return (
    <div className=" w-16 h-16 hidden lg:block">
      <NavLink to="/">
        <img src={logoImage} alt="logo" className="hidden lg:block" />
      </NavLink>
    </div>
  );
};

export default Logo;

import React, { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import Logo from "./Logo";
import Navbar from "./Navbar";
import NavbarLeft from "./NavbarLeft";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className={`row top-0 z-20 flex w-100 items-center justify-between  mx-auto flex-wrap`}
    >
      <div className="flex items-center space-x-4">
        <Logo />
        <NavbarLeft />
      </div>
      <div className="flex justify-end mr-5">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;





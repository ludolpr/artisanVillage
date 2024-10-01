import React, { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import Logo from "./Logo";
import Navbar from "./Navbar";
import NavbarLeft from "./NavbarLeft";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className={`top-0 z-20 flex w-full items-center justify-between mx-auto flex-wrap`}
    >
      <div className="flex items-center">
        <Logo />
        <NavbarLeft />
      </div>
      <div className="flex mr-5">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

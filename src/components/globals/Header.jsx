import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import NavbarLeft from "./NavbarLeft";

const Header = () => {
  return (
    <header className=" secondary-500 row   sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between break-before-auto ">
      <div className="flex row items-center">
        <Logo />
        <NavbarLeft />
      </div>
      <div className="flex row mr-5">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

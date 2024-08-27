import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" secondary-500  text-white sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between break-before-auto ">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;

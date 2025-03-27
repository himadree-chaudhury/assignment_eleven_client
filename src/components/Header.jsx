import React from "react";
import "../index.css";
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <img className="w-10" src={logo} alt="driveXpress logo" />
        <h1 className="title-style ">driveXpress</h1>
      </div>
      <p className="">This is Header</p>
    </div>
  );
};

export default Header;

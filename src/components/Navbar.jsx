import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import WebTitle from "./WebTitle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Function to toggle mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      transition: "color ease-in-out",
      duration: "1s",
      ...(isActive && {
        backgroundImage: "linear-gradient(to right, #3ec7ae, #8f8fde,#9571d6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }),
    };
  };
  const links = (
    <>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/allcar"
      >
        Available Cars
      </NavLink>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/addcar"
      >
        Add Car
      </NavLink>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/mycars"
      >
        My Cars
      </NavLink>
      <NavLink
        style={navLinkStyles}
        onClick={() => setIsMenuOpen(false)}
        to="/mybookings"
      >
        My Bookings
      </NavLink>
      <NavLink>Logout</NavLink>
    </>
  );

  return (
    <div>
      <nav className="flex-centric justify-between gap-5 px-3 xl:px-5 font-button shadow-md dark:shadow-text-secondary bg-background-light dark:bg-background-dark fixed w-full z-10 top-0 left-0">
        <WebTitle />
        <div className="flex-centric gap-5 **:text-lg **:hover:text-text-secondary **:dark:hover:text-text-secondary-dark hidden lg:flex">
          {links}
        </div>

        <div className="flex-centric gap-3">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-300`}
          >
            {isDark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-md cursor-pointer ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors lg:hidden flex`}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
      <div
        className={`transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden mt-16 lg:mt-0`}
      >
        <div className="flex flex-col items-start space-y-2 mt-4 text-lg px-8">
          {links}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

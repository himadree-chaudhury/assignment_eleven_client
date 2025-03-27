import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex gap-5 p-4">
      <Link to="/">Home</Link>
      <Link to="/allcar">All car</Link>
      <Link to="/addcar">Add car</Link>
      <Link to="/cardetails">Car details</Link>
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 bg-ash dark:bg-gray-700 rounded"
      >
        Toggle Dark
      </button>
    </div>
  );
};

export default Navbar;

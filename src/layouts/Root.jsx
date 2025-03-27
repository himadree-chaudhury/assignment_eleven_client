import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="dark:bg-background-dark dark:text-light transition-all duration-200">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;

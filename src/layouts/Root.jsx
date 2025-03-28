import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark dark:text-text-primary-dark selection:bg-primary transition-all duration-200 overflow-hidden">
      <Navbar />
      {/* Main Content Container */}
      <div className="flex flex-col min-h-screen">
        <main className="grow lg:mt-16">
          {/* Dynamic Content Container */}
          <Outlet></Outlet>
        </main>

        {/* Footer Component */}
        <Footer/>
      </div>
    </div>
  );
};

export default Root;

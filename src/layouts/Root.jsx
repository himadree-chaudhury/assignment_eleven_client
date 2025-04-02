import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark dark:text-text-primary-dark selection:bg-primary overflow-hidden transition-all duration-200 selection:text-white">
      <Navbar />
      {/* Main Content Container */}
      <div className="flex min-h-screen flex-col">
        <main className="mt-16 grow">
          {/* Dynamic Content Container */}
          <Outlet></Outlet>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
};

export default Root;

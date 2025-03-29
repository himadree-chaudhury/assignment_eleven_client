import React from "react";
import banner from "../assets/cover.png";
import underline from "../assets/underline.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="md:relative">
      <div className="flex justify-center md:justify-end">
        <img
          src={banner}
          alt="driveXpress Banner"
          className="md:w-[60%] object-cover"
        />
      </div>
      <div className="md:absolute top-5">
        <h1 className="font-bold text-[min(10vw,40px)] p-5 md:p-10  pb-5 md:pb-0 ">
          Find, Book, and <br /> rental car in&nbsp;
          <div className="relative text-primary inline">
            Easy&nbsp;
            <div className="absolute right-3 top-12">
              <img src={underline} alt="" />
            </div>
          </div>
          <br className="hidden md:block" />
          steps !
        </h1>
        <div className="p-5 md:pl-10">
          <p className="pb-5 text-text-secondary dark:text-text-secondary-dark">
            Get or add a car whereever <br /> and whenever you need
          </p>
          <Link className="btn-primary" to="/allcar">Explore Cars</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

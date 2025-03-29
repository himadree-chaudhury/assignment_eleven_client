import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/cover.png";
import underline from "../assets/underline.png";

const Banner = () => {
  return (
    <div className="md:relative border section-layout">
      <div className="flex justify-center md:justify-end">
        <img
          src={banner}
          alt="driveXpress Banner"
          className="md:w-[60%] xl:w-[40%] object-cover"
        />
      </div>
      <div className="md:absolute top-5">
        <h1 className="font-bold text-[min(8vw,50px)] p-5 lg:p-10 pb-0">
          Find, Book, and <br /> rental car in&nbsp;
          <div className="relative text-primary inline">
            Easy&nbsp;
            <div className="absolute right-10 top-14">
              <img src={underline} alt="Underline" />
            </div>
          </div>
          <br className="hidden md:block" />
          steps !
        </h1>
        <div className="p-5 lg:p-0 lg:pl-10">
          <p className="pb-5 text-subtle">
            Get or add a car whereever <br /> and whenever you need
          </p>
          <Link className="btn-primary" to="/allcar">Explore Cars</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

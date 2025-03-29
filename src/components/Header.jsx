import React from "react";
import CarSearch from "./CarSearch";
import Banner from "./Banner";
import car1 from "../assets/mazda.png";
import car2 from "../assets/mg.png";
import car3 from "../assets/ford.png";
import car4 from "../assets/honda.png";
import car5 from "../assets/hyundai.png";
import car6 from "../assets/kia.png";
import car7 from "../assets/lexus.png";
import car8 from "../assets/bmw.png";

const Header = () => {
  return (
    <header>
      <section>
        <div>
          <Banner />
        </div>
        <div className="*:w-20 *:object-cover grid grid-cols-4 md:grid-cols-8 items-center justify-items-center  *:hover:scale-105 *:transition-transform *:duration-100 border section-layout">
          <img src={car1} alt="" />
          <img src={car2} alt="" />
          <img src={car3} alt="" />
          <img src={car4} alt="" />
          <img src={car5} alt="" />
          <img src={car6} alt="" />
          <img src={car7} alt="" />
          <img src={car8} alt="" />
        </div>
      </section>
      {/* <p className="">This is Header</p>
      <div className="flex-centric gap-5">
        <button className="btn-primary">Click me</button>
        <button className="btn-secondary">Click me</button>
        <button className="btn-accent">Click me</button>
      </div> */}

      {/* <blockquote className="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
        When you look&nbsp;
        <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
          <span className="relative text-white dark:text-gray-950">
            {" "}
            annoyed{" "}
          </span>
        </span>
        &nbsp;all the time, people think that you're busy.
      </blockquote>
      <CarSearch />

      <section className="grid grid-cols-2">
        <details className="border border-transparent ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
        <details className="border border-transparent open:border-black/10 ">
          <summary className="text-sm leading-6 font-semibold text-gray-900 select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
      </section> */}
    </header>
  );
};

export default Header;

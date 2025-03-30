import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
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
  const initialOrder = [car1, car2, car3, car4, car5, car6, car7, car8];
  const [order, setOrder] = useState(initialOrder);

const spring = {
  type: "tween",
  damping: 20,
  stiffness: 300,
};

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5 ); // Randomize order
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(shuffle); // Shuffle the order randomly
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header>
      <div>
        <div>
          <Banner />
        </div>
        <div className="relative grid grid-cols-4 md:grid-cols-8 justify-items-center items-center gap-2 p-4">
          <AnimatePresence>
            {order.map((car) => (
              <motion.img
                key={car}
                src={car}
                alt={car}
                layout
                transition={spring}
                className="w-20 object-cover"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* <p className="">This is Header</p> */}
      {/* <div className="flex-centric gap-5">
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

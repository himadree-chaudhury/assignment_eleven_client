import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Banner from "./ui/Banner";
import car1 from "../assets/mazda.png";
import car2 from "../assets/mg.png";
import car3 from "../assets/ford.png";
import car4 from "../assets/honda.png";
import car5 from "../assets/hyundai.png";
import car6 from "../assets/kia.png";
import car7 from "../assets/lexus.png";
import car8 from "../assets/bmw.png";

const Header = () => {
  // *Data States
  const initialOrder = [car1, car2, car3, car4, car5, car6, car7, car8];
  const [order, setOrder] = useState(initialOrder);

  // *Randomize The Array Order
  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // *Shuffle The Image Order Every 2 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(shuffle);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // *Animation Variants
  const spring = {
    type: "tween",
    damping: 20,
    stiffness: 300,
  };
  return (
    <header>
      <div>
        {/* Display Banner */}
        <div>
          <Banner />
        </div>
        <div className="relative grid grid-cols-4 items-center justify-items-center gap-2 p-4 md:grid-cols-8">
          {/* Cars Image */}
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
    </header>
  );
};

export default Header;

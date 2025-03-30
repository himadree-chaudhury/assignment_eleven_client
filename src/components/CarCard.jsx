import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import car from "../assets/Marcedes Benz.png";
import arrow from "../assets/arrow.png";
import passenger from "../assets/passenger.png";
import gear from "../assets/gear-shift.png";
import ac from "../assets/ac.png";
import fuel from "../assets/fuel.png";
import distance from "../assets/distance.png";

const CarCard = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="relative rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-2">
        <div className="">
          <motion.img
            src={car}
            alt=""
            className="object-cover rounded-t-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>
        <p className="text-xs">Added 2days ago</p>
        <div className="flex-centric justify-between py-3">
          <div>
            <h3>Marcedes Benz</h3>
            <p className="font-eye-catchy">SUV</p>
          </div>
          <div className="flex-centric">
            <img src={passenger} alt="Total Rent Count" className="mr-2 w-4" />
            <p>15</p>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center justify-items-start border-b border-b-text-secondary-dark pb-2">
          <div className="flex-centric">
            <img src={gear} alt="Gear" className="mr-2 w-4" />
            <p>Automatic</p>
          </div>
          <div className="flex-centric">
            <img src={ac} alt="Gear" className="mr-2 w-4" />
            <p>Air Conditioning</p>
          </div>
          <div className="flex-centric">
            <img src={fuel} alt="Gear" className="mr-2 w-4" />
            <p>Diseal</p>
          </div>
          <div className="flex-centric">
            <img src={distance} alt="Gear" className="mr-2 w-4" />
            <p>5500</p>
          </div>
        </div>
        <div className="flex-centric justify-between p-2">
          <p className="font-semibold">$1200 /day</p>
          <motion.div whileHover={{ x: 3 }}>
            <Link className="text-primary font-semibold">
              Rent Now
              <img
                src={arrow}
                alt="arrow"
                className="rotate-90 inline w-3 ml-2"
              />
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ scale: 0.95 }}
        animate={{
          scale: 1,
          background: [
            "linear-gradient(90deg, #28b4df, #8f97ef)",
            "linear-gradient(90deg, #8f97ef, #6b54e6)",
            "linear-gradient(90deg, #6b54e6, #28b4df)",
          ],
          backgroundSize: "200% 200%",
        }}
        transition={{
          scale: { duration: 0.3, type: "spring" },
          background: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          },
        }}
        className="absolute top-1 right-1 rounded-full px-2 py-0.5 text-white font-medium text-xs shadow-sm"
      >
        Available
      </motion.p>
      {/* <motion.p
        initial={{ scale: 0.95 }}
        animate={{
          scale: [1, 0.98, 1],
          backgroundColor: "#f3f4f6", // Light gray background
          color: "#6b7280", // Gray text
          borderColor: "#e5e7eb", // Light border
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          backgroundColor: { duration: 0.2 },
        }}
        className="absolute top-1 right-1 rounded-full border px-2 py-0.5 font-medium text-xs"
      >
        Unavailable
      </motion.p> */}
    </motion.div>
  );
};

export default CarCard;

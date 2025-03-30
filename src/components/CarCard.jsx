import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import carImg from "../assets/Marcedes Benz.png";
import arrow from "../assets/arrow.png";
import passenger from "../assets/passenger.png";
import gear from "../assets/gear-shift.png";
import ac from "../assets/ac.png";
import fuel from "../assets/fuel.png";
import distance from "../assets/distance.png";

const CarCard = ({ layout = "grid", carData }) => {
  return (
    <div className={`relative ${layout === "grid" ? "h-full" : ""}`}>
      {/* Availability Badge - Always visible */}
      {carData.avaibality ? (
        <motion.div
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
          className={`absolute z-10 ${
            layout === "grid" ? "top-3 left-3" : "top-4 left-4"
          } rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm`}
        >
          Available
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{
            scale: [1, 0.98, 1],
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            borderColor: "#e5e7eb",
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            backgroundColor: { duration: 0.2 },
          }}
          className={`absolute z-10 ${
            layout === "grid" ? "top-3 left-3" : "top-4 left-4"
          } rounded-full border px-3 py-1 text-xs font-semibold shadow-sm`}
        >
          Unavailable
        </motion.div>
      )}

      <motion.div
        className="h-full"
        whileHover={{
          scale: layout === "grid" ? 1.03 : 1.01,
          boxShadow:
            layout === "grid"
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Link
          to={`/cardetails/${carData.id}`}
          className={`${layout === "list" ? "flex flex-col sm:flex-row" : "block"} h-full`}
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full ${
              layout === "list" ? "flex flex-col sm:flex-row w-full" : ""
            }`}
          >
            {/* Image Section - Updated for mobile responsiveness */}
            <div
              className={`${
                layout === "list"
                  ? "w-full sm:w-1/3 sm:min-w-[200px]"
                  : "w-full"
              }`}
            >
              <motion.img
                src={carImg}
                alt={carData.name}
                className={`object-cover w-full ${
                  layout === "list"
                    ? "h-48 sm:h-full rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                    : "rounded-t-lg"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>

            {/* Content Section - Updated for mobile responsiveness */}
            <div
              className={`p-4 ${
                layout === "list"
                  ? "w-full sm:w-2/3 flex flex-col justify-between"
                  : ""
              }`}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Added {carData.added}
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        {carData.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {carData.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={passenger}
                      alt="Passengers"
                      className="w-4 h-4 mr-2"
                    />
                    <span className="text-sm">
                      {carData.passengers} Bookings
                    </span>
                  </div>
                </div>

                <div
                  className={`my-3 ${
                    layout === "list"
                      ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3"
                      : "grid grid-cols-2 gap-2"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={distance}
                      alt="Distance"
                      className="w-4 h-4 mr-2"
                    />
                    <span className="text-sm">{carData.distance} km</span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={gear}
                      alt="Transmission"
                      className="w-4 h-4 mr-2"
                    />
                    <span className="text-sm">Automatic</span>
                  </div>
                  <div className="flex items-center">
                    <img src={ac} alt="AC" className="w-4 h-4 mr-2" />
                    <span className="text-sm">Air Conditioning</span>
                  </div>
                  <div className="flex items-center">
                    <img src={fuel} alt="Fuel" className="w-4 h-4 mr-2" />
                    <span className="text-sm">Diesel</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-bold dark:text-white">
                  ${carData.price}
                  <span className="text-sm font-normal"> /day</span>
                </p>
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center text-primary dark:text-blue-400"
                >
                  <span className="font-medium">Rent Now</span>
                  <img
                    src={arrow}
                    alt="arrow"
                    className="rotate-90 w-3 h-3 ml-2"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default CarCard;

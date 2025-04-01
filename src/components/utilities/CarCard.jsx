import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { checkAvailability } from "./dateUtilities";
import {
  FiArrowRight,
  FiCloudSnow,
  FiDroplet,
  FiMap,
  FiSettings,
  FiUserPlus,
} from "react-icons/fi";

const CarCard = ({ layout = "grid", carData }) => {
  // Time Calculation
  const getTimeAgo = (dateString) => {
    return `${formatDistanceToNow(new Date(dateString), { addSuffix: true })}`;
  };

  return (
    <div className={`relative ${layout === "grid" ? "h-full" : ""}`}>
      {/* Availability Badge - Always visible */}
      {checkAvailability(carData.pickupDate, carData.returnDate) ? (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{
            scale: [1, 0.98, 1],
            background: [
              "linear-gradient(90deg, #28b4df, #0078a6)",
              "linear-gradient(90deg, #9a5ae6, #6a2dbf)",
              "linear-gradient(90deg, #845ae6, #5429b3)",
            ],
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
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
            scale: 1,
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            borderColor: "#e5e7eb",
          }}
          transition={{
            scale: {
              duration: 0.3,
              type: "spring",
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
          to={`/cardetails/${carData._id}`}
          className={`${layout === "list" ? "flex flex-col sm:flex-row" : "block"} h-full`}
        >
          <div
            className={`card h-full ${
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
                src={carData.photoURL}
                alt={carData.name}
                className={`object-cover p-3 w-full ${
                  layout === "list"
                    ? "h-48 sm:h-full rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                    : "h-48 rounded-t-lg"
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
                      Added{" "}
                      {carData.dateAdded
                        ? getTimeAgo(carData.dateAdded)
                        : "Recently"}
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
                    <FiUserPlus className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {carData.rent_count} Bookings
                    </span>
                  </div>
                </div>

                <div
                  className={`my-3 *:gap-2 *:flex *:items-center *:text-sm ${
                    layout === "list"
                      ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3"
                      : "grid grid-cols-2 gap-2"
                  }`}
                >
                  <div>
                    <FiMap className="w-4 h-4" />
                    <span>{carData.distanceTravelled} km</span>
                  </div>
                  <div>
                    <FiSettings className="w-4 h-4" />
                    <span>{carData.transmission}</span>
                  </div>
                  <div>
                    <FiCloudSnow className="w-4 h-4" />
                    <span>Air Conditioning</span>
                  </div>
                  <div>
                    <FiDroplet className="w-4 h-4" />
                    <span>{carData.fuelType}</span>
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
                  className="flex items-center gap-1 text-primary"
                >
                  <span className="font-medium">Rent Now</span>
                  <FiArrowRight />
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

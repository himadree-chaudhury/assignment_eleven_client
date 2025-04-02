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
              layout === "list" ? "flex w-full flex-col sm:flex-row" : ""
            }`}
          >
            {/* Image Section */}
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
                className={`w-full object-cover p-3 ${
                  layout === "list"
                    ? "h-48 rounded-3xl sm:h-full"
                    : "h-48 rounded-t-3xl"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>

            {/* Content Section */}
            <div
              className={`p-4 ${
                layout === "list"
                  ? "flex w-full flex-col justify-between sm:w-2/3"
                  : ""
              }`}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Added&nbsp;
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
                    <FiUserPlus className="text-primary mr-2 h-4 w-4" />
                    <span className="text-sm">
                      {carData.rent_count} Bookings
                    </span>
                  </div>
                </div>

                <div
                  className={`my-3 *:flex *:items-center *:gap-2 *:text-sm ${
                    layout === "list"
                      ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3"
                      : "grid grid-cols-2 gap-2"
                  }`}
                >
                  <div>
                    <FiMap className="text-primary h-4 w-4" />
                    <span>{carData.distanceTravelled} km</span>
                  </div>
                  <div>
                    <FiSettings className="text-primary h-4 w-4" />
                    <span>{carData.transmission}</span>
                  </div>
                  <div>
                    <FiCloudSnow className="text-primary h-4 w-4" />
                    <span>Air Conditioning</span>
                  </div>
                  <div>
                    <FiDroplet className="text-primary h-4 w-4" />
                    <span>{carData.fuelType}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                <p className="text-lg font-bold dark:text-white">
                  ${carData.price}
                  <span className="text-sm font-normal"> /day</span>
                </p>
                <motion.div
                  whileHover={{ x: 3 }}
                  className="text-primary flex items-center gap-1"
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

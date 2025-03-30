import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiStar,
  FiUsers,
  FiDroplet,
  FiCalendar,
} from "react-icons/fi";
// Replace FiGauge with another appropriate icon - we'll use FiSettings for transmission
import { FiSettings } from "react-icons/fi";
import carImg from "../assets/Marcedes Benz.png";

const CarDetails = () => {
  const { id } = useParams();

  // Mock car data - in a real app, you'd fetch this based on the ID
  const car = {
    id: 1,
    name: "Mercedes Benz GLE",
    type: "Luxury SUV",
    price: 1200,
    rating: 4.8,
    passengers: 5,
    fuelType: "Diesel",
    mileage: "8.5 kmpl",
    transmission: "Automatic",
    year: 2022,
    features: [
      "Panoramic Sunroof",
      "Heated Seats",
      "360° Camera",
      "Apple CarPlay",
      "Adaptive Cruise Control",
      "Parking Assist",
    ],
    description:
      "The Mercedes-Benz GLE combines luxury with versatility, offering premium comfort and advanced technology in a sophisticated SUV package. Perfect for both city driving and long journeys.",
    added: "2 days ago",
    distance: 5500,
    availability: false,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Back Button */}
      <motion.div
        className="p-4"
        whileHover={{ x: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          to="/allcars"
          className="flex items-center text-primary dark:text-blue-400"
        >
          <FiArrowLeft className="mr-2" />
          Back to Cars
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        {/* Car Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{car.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{car.type}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="font-semibold dark:text-white">
                {car.rating}
              </span>
              <span className="text-gray-500 ml-2 dark:text-gray-400">
                ({car.passengers} reviews)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              className="lg:col-span-2 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={carImg}
                alt={car.name}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-xl overflow-hidden h-32 md:h-40"
                >
                  <img
                    src={carImg}
                    alt={`${car.name} ${item}`}
                    className="w-full h-full object-cover rounded-xl shadow"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specifications */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
                    <FiUsers className="text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Passengers
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.passengers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mr-3">
                    <FiDroplet className="text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Fuel Type
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full mr-3">
                    <FiSettings className="text-purple-500 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Transmission
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full mr-3">
                    <FiCalendar className="text-yellow-500 dark:text-yellow-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Year</p>
                    <p className="font-medium dark:text-white">{car.year}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {car.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold dark:text-white">
                  ${car.price}
                  <span className="text-sm font-normal"> /day</span>
                </h3>
                {car.availability ? (
                  <motion.span
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
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  >
                    Available
                  </motion.span>
                ) : (
                  <motion.span
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
                    className="rounded-full border px-3 py-1 text-xs font-semibold shadow-sm"
                  >
                    Unavailable
                  </motion.span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">
                    Mileage
                  </span>
                  <span className="font-medium dark:text-white">
                    {car.mileage}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">
                    Distance
                  </span>
                  <span className="font-medium dark:text-white">
                    {car.distance} km
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">
                    Added
                  </span>
                  <span className="font-medium dark:text-white">
                    {car.added}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={!car.availability}
                className={`w-full mt-6 py-3 rounded-lg font-semibold ${
                  car.availability
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {car.availability ? "Rent Now" : "Currently Unavailable"}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarDetails;

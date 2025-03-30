import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiStar,
  FiUsers,
  FiDroplet,
  FiCalendar,
  FiCheck,
  FiSettings,
  FiMapPin,
} from "react-icons/fi";
import carImg from "../assets/Marcedes Benz.png";

const CarDetails = () => {
  const { id } = useParams();

  // Mock car data with location
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
    availability: true,
    location: {
      address: "Miami, FL",
    },
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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >

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
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Rental Requirements",
                  items: [
                    "Valid driver's license",
                    "Minimum age 25",
                    "Credit card required",
                  ],
                },
                {
                  title: "Included Benefits",
                  items: [
                    "Unlimited mileage",
                    "24/7 support",
                    "No hidden fees",
                  ],
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm h-full"
                >
                  <h3 className="font-semibold mb-3 dark:text-white">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specifications */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
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
                {/* New Location Field */}
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mr-3">
                    <FiMapPin className="text-red-500 dark:text-red-300" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium dark:text-white">
                      {car.location.address}
                    </p>
                  </div>
                </div>
              </div>
                      </motion.div>
                      
            {/* Features */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Price Section */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
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

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Mileage
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.mileage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Distance
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.distance} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Location
                    </span>
                    <span className="font-medium dark:text-white">
                      Miami, FL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Added
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.added}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3 dark:text-white">
                  Pricing Breakdown
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Base Rate", value: `$${car.price}` },
                    { label: "Insurance", value: "Included" },
                    { label: "Taxes & Fees", value: "$85" },
                    {
                      label: "Estimated Total",
                      value: `$${car.price + 85}`,
                      highlight: true,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex justify-between py-1 ${item.highlight ? "border-t border-gray-200 dark:border-gray-700 pt-3 font-bold" : ""}`}
                    >
                      <span
                        className={`${item.highlight ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`${item.highlight ? "text-primary dark:text-blue-400" : "font-medium dark:text-white"}`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!car.availability}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    car.availability
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {car.availability ? "Book Now" : "Currently Unavailable"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CarDetails;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";
import { FiGrid, FiList } from "react-icons/fi";

const AllCar = () => {
  const [layout, setLayout] = useState("grid"); // 'grid' or 'list'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20 },
  };

  // Sample car data
  const cars = [
    {
      id: 1,
      name: "Mercedes Benz",
      type: "SUV",
      price: 1200,
      passengers: 5,
      added: "2 days ago",
      distance: 5500,
      avaibality: true,
    },
    {
      id: 2,
      name: "BMW X5",
      type: "SUV",
      price: 1100,
      passengers: 5,
      added: "1 day ago",
      distance: 500,
      avaibality: true,
    },
    {
      id: 3,
      name: "Audi Q7",
      type: "SUV",
      price: 1300,
      passengers: 7,
      added: "3 days ago",
      distance: 2000,
      avaibality: false,
    },
    {
      id: 4,
      name: "Tesla Model X",
      type: "Electric",
      price: 1500,
      passengers: 5,
      added: "5 days ago",
      distance: 1200,
      avaibality: true,
    },
    {
      id: 5,
      name: "Range Rover",
      type: "SUV",
      price: 1400,
      passengers: 5,
      added: "1 week ago",
      distance: 50,
      avaibality: false,
    },
  ];

  return (
    <div className="section-layout p-4 md:p-6">
      {/* Header with toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Available Vehicles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your perfect ride
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-all"
        >
          {layout === "grid" ? (
            <>
              <FiList className="text-lg" />
              <span>List View</span>
            </>
          ) : (
            <>
              <FiGrid className="text-lg" />
              <span>Grid View</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Content with animated layout transition */}
      <AnimatePresence mode="wait">
        {layout === "grid" ? (
          <motion.div
            key="grid"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {cars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard layout="grid" carData={car} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="space-y-4"
          >
            {cars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard layout="list" carData={car} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading more indicator */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
};

export default AllCar;

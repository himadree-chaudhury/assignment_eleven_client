import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import CarCard from "../components/utilities/CarCard";
import { FiChevronDown, FiGrid, FiList, FiSearch } from "react-icons/fi";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
import useAuth from "../hooks/useAuth.jsx";
import toast from "react-hot-toast";
import Loading from "../components/ui/Loading.jsx";

const AllCar = () => {
  const axiosSecure = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const { loading, setLoading } = useAuth();
  const [layout, setLayout] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

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

  // Load Car data
  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(`/cars`);
        setCars(data);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  // Filter cars based on search term
  const filteredCars = cars.filter((car) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.name.toLowerCase().includes(searchLower) ||
      car.type.toLowerCase().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower)
    );
  });

  // Sort cars based on selected option
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="section-layout">
      {/* Header with search and controls */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Available Vehicles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your perfect ride
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search input */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by model, brand, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Layout toggle */}
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
                      
            {/* Sort dropdown */}
            <div className="relative z-[50]">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-all"
              >
                <span>
                  {sortOptions.find((opt) => opt.value === sortOption)?.label}
                </span>
                <FiChevronDown
                  className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOption === option.value ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                      onClick={() => {
                        setSortOption(option.value);
                        setShowSortDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        {sortedCars.length} {sortedCars.length === 1 ? "vehicle" : "vehicles"}{" "}
        found
      </div>

      {/* Content with animated layout transition */}
      {loading ? (
        <Loading />
      ) : (
        <AnimatePresence mode="wait">
          {sortedCars.length > 0 ? (
            layout === "grid" ? (
              <motion.div
                key="grid"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {sortedCars.map((car) => (
                  <motion.div key={car._id} variants={itemVariants}>
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
                {sortedCars.map((car) => (
                  <motion.div key={car._id} variants={itemVariants}>
                    <CarCard layout="list" carData={car} />
                  </motion.div>
                ))}
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No vehicles found matching your search
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 text-primary hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Loading more indicator */}
      {sortedCars.length > 0 && (
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCar;
